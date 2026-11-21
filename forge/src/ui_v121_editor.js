/* Forge 2.5D V12.1 — Görsel Düzenle: çalışma görseli üzerinde gerçek araçlar.
   Arka plan kaldırma (kenardan taşma doldurma), renge dokunup saydam yapma, otomatik/elle kırpma, silgi,
   ton/doygunluk/parlaklık (yüklenen görsel) veya hazır savaşçı paletleri, önce/sonra, geri al.
   Her işlem V11.2'nin çalışma görseline (customCanvas) hemen uygulanır; 2B önizleme, 3B analiz ve dışa aktarma aynı görseli kullanır. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id), V11 = window.ForgeV11;
  const ED = { cur: null, orig: null, hist: [], tool: null, sel: null, lastCommitted: null, compare: false, colorPreview: null, stroke: null };
  const status = (m, err) => { const e = $('ed-status'); e.textContent = m; e.style.color = err ? '#ffb49e' : '#9aefcf'; e.dataset.err = err ? '1' : ''; };
  const copy = src => { const c = document.createElement('canvas'); c.width = src.naturalWidth || src.width; c.height = src.naturalHeight || src.height; c.getContext('2d').drawImage(src, 0, 0); return c; };
  const ctx2 = c => c.getContext('2d', { willReadFrequently: true });

  function srcLabel() { const st = V11.state; return st.custom ? `Çalışma görseli: “${st.customFileName || 'adsız'}” (tek yön)` : `Çalışma görseli: hazır savaşçı (${st.palette}, 8 yön). İlk düzenlemede tek yönlü görsele dönüşür.`; }
  // Dışarıdan (yükleme, hazır savaşçı, yerel üretim) değiştiyse düzenleyiciyi yeniden yükle
  function refresh(force) {
    if (!V11.ready) return;
    const src = V11.sourceCanvas(0);
    if (force || src !== ED.lastCommitted) { ED.cur = copy(src); ED.orig = copy(src); ED.hist = []; ED.lastCommitted = src; ED.sel = null; ED.compare = false; $('ed-compare').setAttribute('aria-pressed', 'false'); }
    $('ed-src').textContent = srcLabel();
    showColorPanel(); render(); syncUndo();
  }
  function syncUndo() { $('ed-undo').disabled = !ED.hist.length; }
  function render() {
    const c = $('ed-canvas'), img = ED.compare ? ED.orig : (ED.colorPreview || ED.cur);
    if (!img) return;
    if (c.width !== img.width || c.height !== img.height) { c.width = img.width; c.height = img.height; }
    const x = c.getContext('2d'); x.clearRect(0, 0, c.width, c.height); x.drawImage(img, 0, 0);
    if (ED.sel && ED.tool === 'crop') { const s = norm(ED.sel); x.save(); x.fillStyle = 'rgba(0,0,0,.45)'; x.fillRect(0, 0, c.width, c.height); x.clearRect(s.x, s.y, s.w, s.h); x.drawImage(img, s.x, s.y, s.w, s.h, s.x, s.y, s.w, s.h); x.strokeStyle = '#6ff5d1'; x.lineWidth = 2; x.setLineDash([6, 4]); x.strokeRect(s.x + 1, s.y + 1, s.w - 2, s.h - 2); x.restore(); }
  }
  const norm = s => ({ x: Math.round(Math.min(s.x0, s.x1)), y: Math.round(Math.min(s.y0, s.y1)), w: Math.round(Math.abs(s.x1 - s.x0)), h: Math.round(Math.abs(s.y1 - s.y0)) });
  // V11.2 ile aynı yerleşim: 384x512 çerçeveye en-boy korunarak sığdır
  function fit384(src) { const out = document.createElement('canvas'); out.width = 384; out.height = 512; const k = Math.min(376 / src.width, 504 / src.height); const w = src.width * k, h = src.height * k; out.getContext('2d').drawImage(src, (384 - w) / 2, (512 - h) / 2, w, h); return out; }
  function commit(next, msg, prevSnapshot) {
    ED.hist.push(prevSnapshot || ED.cur); if (ED.hist.length > 15) ED.hist.shift();
    const wasPreset = !V11.state.custom;
    ED.cur = next; ED.colorPreview = null; ED.lastCommitted = next;
    V11.setCustomCanvas(next, V11.state.custom ? V11.state.customFileName : 'duzenlenen_savasci.png');
    ED.lastCommitted = V11.sourceCanvas(0);
    $('ed-src').textContent = srcLabel(); showColorPanel(); render(); syncUndo();
    status(msg + (wasPreset ? ' Hazır savaşçı tek yönlü düzenlenebilir görsele dönüştü.' : ''));
    document.dispatchEvent(new CustomEvent('forge:changed', { detail: { image: true } }));
  }
  function undo() {
    if (!ED.hist.length) return;
    const prev = ED.hist.pop(); ED.cur = prev; ED.colorPreview = null;
    V11.setCustomCanvas(prev, V11.state.customFileName); ED.lastCommitted = V11.sourceCanvas(0);
    render(); syncUndo(); status('Geri alındı.'); document.dispatchEvent(new CustomEvent('forge:changed', { detail: { image: true } }));
  }

  // ---- Araçlar ----
  const close = (d, r, g, b, tol) => { const dr = d[0] - r, dg = d[1] - g, db = d[2] - b; return dr * dr + dg * dg + db * db <= tol * tol; };
  // passTransparent: saydam pikseller geçilebilir (görsel kenarındaki boş paydan zemine ulaşmak için), silinmiş sayılmaz
  function floodClear(c, seeds, tol, refColor, passTransparent) {
    const W = c.width, H = c.height, x = ctx2(c), id = x.getImageData(0, 0, W, H), p = id.data, seen = new Uint8Array(W * H), q = new Int32Array(W * H);
    let head = 0, tail = 0, n = 0;
    const ok = i => p[i * 4 + 3] > 0 ? close([p[i * 4], p[i * 4 + 1], p[i * 4 + 2]], refColor[0], refColor[1], refColor[2], tol) : !!passTransparent;
    for (const s of seeds) if (!seen[s] && ok(s)) { seen[s] = 1; q[tail++] = s; }
    while (head < tail) {
      const k = q[head++], xx = k % W, yy = (k / W) | 0; if (p[k * 4 + 3]) { p[k * 4 + 3] = 0; n++; }
      if (xx > 0 && !seen[k - 1] && ok(k - 1)) { seen[k - 1] = 1; q[tail++] = k - 1; }
      if (xx < W - 1 && !seen[k + 1] && ok(k + 1)) { seen[k + 1] = 1; q[tail++] = k + 1; }
      if (yy > 0 && !seen[k - W] && ok(k - W)) { seen[k - W] = 1; q[tail++] = k - W; }
      if (yy < H - 1 && !seen[k + W] && ok(k + W)) { seen[k + W] = 1; q[tail++] = k + W; }
    }
    // kenar yumuşatma: silinen bölgeye komşu, referans renge yakın pikseller yarı saydam
    for (let i = 0; i < W * H; i++) { if (!p[i * 4 + 3] || seen[i]) continue; const xx = i % W, yy = (i / W) | 0; const nb = (xx > 0 && seen[i - 1]) || (xx < W - 1 && seen[i + 1]) || (yy > 0 && seen[i - W]) || (yy < H - 1 && seen[i + W]); if (nb && close([p[i * 4], p[i * 4 + 1], p[i * 4 + 2]], refColor[0], refColor[1], refColor[2], tol * 1.8)) p[i * 4 + 3] = Math.min(p[i * 4 + 3], 110); }
    x.putImageData(id, 0, 0); return n;
  }
  function removeBackground() {
    const c = copy(ED.cur), W = c.width, H = c.height, p = ctx2(c).getImageData(0, 0, W, H).data, tol = +$('ed-tol').value;
    const border = []; for (let x = 0; x < W; x++) border.push(x, (H - 1) * W + x); for (let y = 0; y < H; y++) border.push(y * W, y * W + W - 1);
    // zemin rengi: her satır/sütunda kenardan içeri ilk opak piksel (saydam pay atlanır)
    const edge = [];
    for (let y = 0; y < H; y += 2) { for (let x = 0; x < W; x++) if (p[(y * W + x) * 4 + 3] > 200) { edge.push(y * W + x); break; } for (let x = W - 1; x >= 0; x--) if (p[(y * W + x) * 4 + 3] > 200) { edge.push(y * W + x); break; } }
    for (let x = 0; x < W; x += 2) { for (let y = 0; y < H; y++) if (p[(y * W + x) * 4 + 3] > 200) { edge.push(y * W + x); break; } for (let y = H - 1; y >= 0; y--) if (p[(y * W + x) * 4 + 3] > 200) { edge.push(y * W + x); break; } }
    if (edge.length < 20) { status('Kenarlarda arka plan bulunamadı (görsel zaten saydam zeminli).'); return; }
    const med = k => { const a = edge.map(i => p[i * 4 + k]).sort((m, n) => m - n); return a[a.length >> 1]; };
    const ref = [med(0), med(1), med(2)], n = floodClear(c, border, tol, ref, true);
    if (!n) { status('Silinecek arka plan bulunamadı; eşiği artırın.', true); return; }
    commit(c, `Arka plan kaldırıldı (${n.toLocaleString('tr-TR')} piksel, zemin rengi rgb(${ref.join(',')})).`);
  }
  function pickTransparent(px, py) {
    const c = copy(ED.cur), W = c.width, d = ctx2(c).getImageData(px, py, 1, 1).data;
    if (!d[3]) { status('Dokunulan nokta zaten saydam.'); return; }
    const n = floodClear(c, [py * W + px], +$('ed-tol2').value, [d[0], d[1], d[2]]);
    commit(c, `Dokunulan bölge saydam yapıldı (${n.toLocaleString('tr-TR')} piksel).`);
  }
  function bbox(c) { const W = c.width, H = c.height, p = ctx2(c).getImageData(0, 0, W, H).data; let x0 = W, y0 = H, x1 = -1, y1 = -1; for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (p[(y * W + x) * 4 + 3] > 16) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; } return x1 < 0 ? null : { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 }; }
  function cropTo(r, label) {
    if (!r || r.w < 8 || r.h < 8) { status('Kırpma alanı çok küçük.', true); return; }
    const t = document.createElement('canvas'); t.width = r.w; t.height = r.h; t.getContext('2d').drawImage(ED.cur, r.x, r.y, r.w, r.h, 0, 0, r.w, r.h);
    ED.sel = null; $('ed-crop-run').disabled = true; commit(fit384(t), label + ` (${r.w}×${r.h} → 384×512 çerçeve).`);
  }
  function autoCrop() { const b = bbox(ED.cur); if (!b) { status('Görselde opak piksel yok.', true); return; } const pad = 6; cropTo({ x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), w: Math.min(ED.cur.width - Math.max(0, b.x - pad), b.w + pad * 2), h: Math.min(ED.cur.height - Math.max(0, b.y - pad), b.h + pad * 2) }, 'Boş kenarlar kırpıldı'); }
  function hsvAdjust(src, dh, ks, kv) {
    const c = copy(src), x = ctx2(c), id = x.getImageData(0, 0, c.width, c.height), p = id.data;
    for (let i = 0; i < p.length; i += 4) {
      if (!p[i + 3]) continue; let r = p[i] / 255, g = p[i + 1] / 255, b = p[i + 2] / 255;
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0;
      if (d) { h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; }
      let s = mx ? d / mx : 0, v = mx; h = ((h + dh) % 360 + 360) % 360; s = Math.min(1, s * ks); v = Math.min(1, v * kv);
      const C = v * s, X = C * (1 - Math.abs((h / 60) % 2 - 1)), m = v - C; let R = 0, G = 0, B = 0;
      if (h < 60) [R, G] = [C, X]; else if (h < 120) [R, G] = [X, C]; else if (h < 180) [G, B] = [C, X]; else if (h < 240) [G, B] = [X, C]; else if (h < 300) [R, B] = [X, C]; else [R, B] = [C, X];
      p[i] = (R + m) * 255; p[i + 1] = (G + m) * 255; p[i + 2] = (B + m) * 255;
    }
    x.putImageData(id, 0, 0); return c;
  }
  function colorVals() { return [+$('ed-hue').value, +$('ed-sat').value / 100, +$('ed-bri').value / 100]; }
  function previewColor() { const [h, s, v] = colorVals(); ED.colorPreview = (h || s !== 1 || v !== 1) ? hsvAdjust(ED.cur, h, s, v) : null; render(); }
  function resetColor() { $('ed-hue').value = 0; $('ed-sat').value = 100; $('ed-bri').value = 100; ED.colorPreview = null; render(); }
  function showColorPanel() { const custom = V11.state.custom; $('ed-color-preset').hidden = custom; $('ed-color-custom').hidden = !custom; }

  function setTool(t) {
    ED.tool = ED.tool === t ? null : t; ED.sel = null; ED.colorPreview = null; $('ed-crop-run').disabled = true;
    document.querySelectorAll('#tab-duzenle .tool').forEach(b => b.classList.toggle('active', b.dataset.tool === ED.tool));
    document.querySelectorAll('#ed-opts [data-opt]').forEach(d => { d.hidden = d.dataset.opt !== ED.tool; });
    $('ed-canvas').style.touchAction = ['pick', 'crop', 'erase'].includes(ED.tool) ? 'none' : 'pan-y';
    if (ED.tool === 'color') { showColorPanel(); resetColor(); }
    render();
  }
  function toImg(e) { const c = $('ed-canvas'), r = c.getBoundingClientRect(); const k = Math.min(r.width / c.width, r.height / c.height), ox = (r.width - c.width * k) / 2, oy = (r.height - c.height * k) / 2; return [Math.max(0, Math.min(c.width - 1, Math.floor((e.clientX - r.left - ox) / k))), Math.max(0, Math.min(c.height - 1, Math.floor((e.clientY - r.top - oy) / k)))]; }
  function eraseAt(x, y) { const g = ED.cur.getContext('2d'); g.save(); g.globalCompositeOperation = 'destination-out'; g.beginPath(); g.arc(x, y, +$('ed-brush').value / 2, 0, Math.PI * 2); g.fill(); g.restore(); }
  function bindCanvas() {
    const c = $('ed-canvas');
    c.addEventListener('pointerdown', e => {
      if (!ED.cur || ED.compare) return; const [x, y] = toImg(e);
      if (ED.tool === 'pick') pickTransparent(x, y);
      else if (ED.tool === 'crop') { ED.sel = { x0: x, y0: y, x1: x, y1: y }; c.setPointerCapture(e.pointerId); }
      else if (ED.tool === 'erase') { ED.stroke = copy(ED.cur); ED.last = [x, y]; eraseAt(x, y); render(); c.setPointerCapture(e.pointerId); }
    });
    c.addEventListener('pointermove', e => {
      if (ED.tool === 'crop' && ED.sel && e.buttons) { const [x, y] = toImg(e); ED.sel.x1 = x; ED.sel.y1 = y; render(); }
      else if (ED.tool === 'erase' && ED.stroke && e.buttons) { const [x, y] = toImg(e), [lx, ly] = ED.last, n = Math.max(1, Math.ceil(Math.hypot(x - lx, y - ly) / 3)); for (let i = 1; i <= n; i++) eraseAt(lx + (x - lx) * i / n, ly + (y - ly) * i / n); ED.last = [x, y]; render(); }
    });
    const up = () => {
      if (ED.tool === 'crop' && ED.sel) { const s = norm(ED.sel); $('ed-crop-run').disabled = s.w < 8 || s.h < 8; render(); }
      if (ED.tool === 'erase' && ED.stroke) { const snap = ED.stroke; ED.stroke = null; commit(ED.cur, 'Silgi uygulandı.', snap); }
    };
    c.addEventListener('pointerup', up); c.addEventListener('pointercancel', up);
  }

  function init() {
    document.querySelectorAll('#tab-duzenle .tool').forEach(b => { b.onclick = () => setTool(b.dataset.tool); });
    $('ed-bg-run').onclick = removeBackground;
    $('ed-autocrop').onclick = autoCrop;
    $('ed-crop-run').onclick = () => { if (ED.sel) cropTo(norm(ED.sel), 'Seçilen alan kırpıldı'); };
    ['ed-hue', 'ed-sat', 'ed-bri'].forEach(id => { $(id).oninput = previewColor; });
    $('ed-color-apply').onclick = () => { const [h, s, v] = colorVals(); if (!h && s === 1 && v === 1) { status('Renk değişmedi.'); return; } const out = hsvAdjust(ED.cur, h, s, v); resetColor(); commit(out, `Renk uygulandı (ton ${h}°, doygunluk ×${s.toFixed(2)}, parlaklık ×${v.toFixed(2)}).`); };
    $('ed-color-reset').onclick = resetColor;
    $('ed-compare').onclick = () => { ED.compare = !ED.compare; $('ed-compare').setAttribute('aria-pressed', String(ED.compare)); $('ed-compare').classList.toggle('active', ED.compare); render(); status(ED.compare ? 'Gösterilen: ÖNCE (düzenleme başlamadan önceki hali).' : 'Gösterilen: SONRA (şimdiki hali).'); };
    $('ed-undo').onclick = undo;
    $('ed-save').onclick = () => { if (!V11.ready) return; copy(V11.sourceCanvas(0)).toBlob(b => window.ForgeV12.download(b, (V11.state.custom ? (V11.state.customFileName || 'gorsel').replace(/\.\w+$/, '') : 'hazir_savasci_' + V11.state.palette) + '_calisma.png'), 'image/png'); };
    // V11.2 içe aktarma / örnek / hazır savaşçıya dönüş / palet değişimi -> düzenleyiciyi yenile
    ['importExample', 'returnWarrior', 'generate'].forEach(id => $(id).addEventListener('click', () => setTimeout(() => refresh(), 60)));
    $('importFile').addEventListener('change', () => setTimeout(() => refresh(), 400));
    $('palettes').addEventListener('change', () => setTimeout(() => refresh(), 60));
    bindCanvas();
    const wait = () => { if (V11.ready) refresh(true); else setTimeout(wait, 100); }; wait();
    window.ForgeEditor = { refresh, ED, setTool, removeBackground, autoCrop, undo, pickTransparent, cropTo };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
