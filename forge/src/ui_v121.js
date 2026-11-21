/* Forge 2.5D V12.1 — çekirdek arayüz: 3B stüdyo, animasyon, yerel görsel üretimi, dışa aktarma.
   V12'deki işlevlerin tamamı korunur; yalnızca düğmeler bölümlere dağıtılır. Yön/hareket seçimi tek yerdedir
   ve hem 3B önizlemeyi hem V11.2'nin 2B önizlemesini (ve "Seçili yön PNG" dışa aktarımını) birlikte yönetir. */
(() => {
  'use strict';
  const F = window.Forge3D, LD = window.ForgeLocalDream, V11 = window.ForgeV11;
  const $ = id => document.getElementById(id);
  const fmtMB = b => (b / 1048576).toFixed(1) + ' MB';
  const download = (data, name, type) => { const url = URL.createObjectURL(data instanceof Blob ? data : new Blob([data], { type: type || 'application/octet-stream' })); const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 15000); };
  // err: true = hata (kırmızı, hata kaydına düşer) · 'warn' = bilgi/uyarı (sarı, hata sayılmaz)
  const status = (id, msg, err) => { const e = $(id); if (!e) return; e.textContent = msg; e.style.color = err === 'warn' ? '#ffd99a' : err ? '#ffb49e' : '#9aefcf'; e.dataset.err = err === true ? '1' : ''; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------------- Cihaz bilgisi ----------------
  const simdOk = (() => { try { return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11])); } catch (e) { return false; } })();
  const DEV = { cores: navigator.hardwareConcurrency || 0, memGB: navigator.deviceMemory || null, simd: simdOk, offscreen: typeof OffscreenCanvas !== 'undefined', compression: typeof CompressionStream !== 'undefined', isolated: !!window.crossOriginIsolated, protocol: location.protocol, ua: navigator.userAgent };
  const allow512 = !DEV.memGB || DEV.memGB >= 4;

  // ---------------- 3B STÜDYO ----------------
  const S3 = { src: null, srcKind: 'tarif', srcLabel: '', ch: null, yaw: 0, pitch: 0.33, clip: 'idle', dir: 0, frameIdx: 0, t: 0, playing: true, last: 0, bones: false, est: false, overlay: false, srcImg: null,
    viewer: 'forge', glbChar: null, glbName: '', animView: '3d', ldHasImage: false,
    sheets: new Map(), manifest: null, glb: null, worker: null, busy: false, perf: {}, progress: '' };
  const SLIDERS = [
    ['height', 'Boy (m)', 1.4, 2.1, 0.01], ['headH', 'Baş', 0.2, 0.34, 0.005], ['shoulderW', 'Omuz', 0.36, 0.6, 0.005], ['chestW', 'Göğüs', 0.3, 0.5, 0.005],
    ['waistW', 'Bel', 0.24, 0.42, 0.005], ['hipW', 'Kalça', 0.26, 0.45, 0.005], ['upperArm', 'Üst kol', 0.22, 0.36, 0.005], ['foreArm', 'Ön kol', 0.2, 0.32, 0.005],
    ['thigh', 'Uyluk', 0.32, 0.5, 0.005], ['shin', 'Baldır', 0.32, 0.5, 0.005], ['bulk', 'İrilik', 0.8, 1.3, 0.01], ['armSpread', 'Kol açısı', 0.1, 0.6, 0.01],
  ];
  const STYLES = [
    ['weapon', 'Silah', [['sword', 'Kılıç'], ['axe', 'Balta'], ['spear', 'Mızrak'], ['staff', 'Asa'], ['mace', 'Topuz'], ['hammer', 'Çekiç'], ['dagger', 'Hançer'], ['none', 'Yok']]],
    ['armor', 'Zırh', [['heavy', 'Ağır'], ['medium', 'Orta'], ['light', 'Hafif'], ['robe', 'Cüppe']]],
    ['helmet', 'Baş', [['circlet', 'Taç'], ['full', 'Miğfer'], ['nohelm', 'Açık']]],
    ['hair', 'Saç', [['spiky', 'Dikenli'], ['long', 'Uzun'], ['none', 'Yok']]],
    ['pauldrons', 'Omuzluk', [['large', 'Büyük'], ['small', 'Küçük'], ['none', 'Yok']]],
  ];
  const CHECKS = [['cape', 'Pelerin'], ['shield', 'Kalkan'], ['tabard', 'Önlük']];
  const COLORS = [['metal', 'Zırh'], ['trim', 'Süs'], ['cloth', 'Kumaş'], ['leather', 'Deri'], ['skin', 'Ten'], ['hair', 'Saç']];
  const hex = c => '#' + c.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
  const unhex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const changed = () => document.dispatchEvent(new CustomEvent('forge:changed'));

  function buildControls() {
    const sl = $('s3-sliders');
    for (const [k, label, mn, mx, st] of SLIDERS) {
      const w = document.createElement('label'); w.className = 's3-sl';
      w.innerHTML = `<span>${label}</span><input type="range" min="${mn}" max="${mx}" step="${st}" data-body="${k}" aria-label="${label}"><b></b>`;
      sl.appendChild(w);
    }
    const ss = $('s3-styles');
    for (const [k, label, opts] of STYLES) {
      const w = document.createElement('label'); w.className = 's3-sel';
      w.innerHTML = `<span>${label}</span><select data-style="${k}">${opts.map(([v, t]) => `<option value="${v}">${t}</option>`).join('')}</select>`;
      ss.appendChild(w);
    }
    for (const [k, label] of CHECKS) { const w = document.createElement('label'); w.className = 's3-chk'; w.innerHTML = `<input type="checkbox" data-style="${k}"> ${label}`; ss.appendChild(w); }
    const cs = $('s3-colors');
    for (const [k, label] of COLORS) { const w = document.createElement('label'); w.className = 's3-col'; w.innerHTML = `<input type="color" data-pal="${k}" aria-label="${label} rengi"><span>${label}</span>`; cs.appendChild(w); }
    sl.addEventListener('input', e => { const k = e.target.dataset.body; if (!k) return; S3.src.body[k] = +e.target.value; e.target.nextElementSibling.textContent = (+e.target.value).toFixed(2); rebuild(); changed(); });
    ss.addEventListener('change', e => { const k = e.target.dataset.style; if (!k) return; S3.src.style[k] = e.target.type === 'checkbox' ? e.target.checked : e.target.value; rebuild(); changed(); });
    cs.addEventListener('input', e => { const k = e.target.dataset.pal; if (!k) return; S3.src.palette[k] = unhex(e.target.value); if (k === 'cloth') S3.src.palette.under = S3.src.palette.cloth.map(v => Math.round(v * 0.55 + 20)); rebuild(); changed(); });
    // Tek yön / hareket denetimi (Animasyon bölümü)
    const cl = $('an-clips');
    F.CLIP_KEYS.forEach(k => { const b = document.createElement('button'); b.className = 'btn'; b.textContent = F.CLIPS[k].label; b.dataset.clip = k; b.onclick = () => selectClip(k); cl.appendChild(b); });
    const dr = $('an-dirs');
    F.DIRS.forEach((d, i) => { const b = document.createElement('button'); b.className = 'btn'; b.textContent = d; b.dataset.d = i; b.onclick = () => selectDir(i); dr.appendChild(b); });
  }
  function v11Click(sel) { const b = document.querySelector(sel); if (b && !b.disabled) b.click(); }
  function selectClip(k) {
    S3.clip = k; S3.t = 0; S3.frameIdx = 0; S3.playing = true; V11.setPlaying(true);
    v11Click(`#actions [data-act="${k}"]`); syncButtons(); draw();
  }
  function selectDir(i) {
    S3.dir = i; S3.yaw = i * Math.PI / 4; v11Click(`#directions [data-dir="${i}"]`); syncButtons(); draw();
  }
  function setFrame(i) {
    S3.frameIdx = (i + 8) % 8; S3.playing = false; V11.setPlaying(false);
    S3.t = F.frameTime(S3.clip, S3.frameIdx, 8); V11.setFrame(S3.frameIdx); syncButtons(); draw();
  }
  function syncControls() {
    const B = S3.ch.params.body, st = S3.ch.params.style, P = S3.ch.params.palette;
    document.querySelectorAll('[data-body]').forEach(i => { i.value = B[i.dataset.body]; i.nextElementSibling.textContent = (+B[i.dataset.body]).toFixed(2); });
    document.querySelectorAll('select[data-style]').forEach(i => { i.value = st[i.dataset.style]; });
    document.querySelectorAll('input[type=checkbox][data-style]').forEach(i => { i.checked = !!st[i.dataset.style]; });
    document.querySelectorAll('[data-pal]').forEach(i => { i.value = hex(P[i.dataset.pal]); });
  }
  function syncButtons() {
    document.querySelectorAll('#an-clips [data-clip]').forEach(b => b.classList.toggle('active', b.dataset.clip === S3.clip));
    const custom2d = S3.animView === '2d' && V11.state.custom;
    document.querySelectorAll('#an-dirs [data-d]').forEach(b => { const i = +b.dataset.d; b.classList.toggle('active', i === S3.dir); b.disabled = custom2d && i !== 0; });
    $('an-play').textContent = S3.playing ? '❚❚ Durdur' : '▶ Oynat';
    $('an-frame').value = S3.frameIdx + 1; $('an-frame-lbl').textContent = `${S3.frameIdx + 1} / 8`;
  }

  function rebuild(keepSheets) {
    const t0 = performance.now();
    S3.ch = F.createCharacter({ body: S3.src.body, palette: S3.src.palette, style: S3.src.style, seed: S3.src.seed || 7 });
    S3.perf.buildMs = performance.now() - t0;
    if (!keepSheets) { S3.sheets.clear(); S3.glb = null; S3.manifest = null; updateResume(); loadStoredSheets().then(n => { if (n > 0 && n < 40) status('x-status', `Bu karakter için önceki oturumdan ${n}/40 sayfa bulundu. "Devam et" ile tamamlayın.`); }); }
    const est = new Uint8Array(S3.ch.mesh.parts.length); S3.ch.mesh.parts.forEach((p, i) => { est[i] = p.estimated ? 1 : 0; }); S3.est8 = est;
    const m = S3.ch.mesh;
    $('s3-info').textContent = `${m.vertexCount} vertex · ${m.triangleCount} üçgen · ${S3.ch.skel.bones.length} kemik · ${m.parts.length} parça · kurulum ${S3.perf.buildMs.toFixed(0)} ms`;
    draw();
  }

  function setSource(src, notes, srcImg, kind, label) {
    S3.src = { body: Object.assign({}, src.body), palette: Object.assign({}, src.palette), style: Object.assign({}, src.style), seed: 7 };
    S3.srcImg = srcImg || null; S3.srcKind = kind || 'tarif'; S3.srcLabel = label || '';
    S3.notes = notes || [];
    $('s3-notes').innerHTML = S3.notes.map(n => '• ' + esc(n)).join('<br>');
    $('s3-srcline').textContent = 'Kaynak: ' + (S3.srcKind === 'resim' ? 'Resim — ' : 'Tarif — ') + S3.srcLabel;
    $('s3-overlay').disabled = !S3.srcImg;
    closeGLBView(true);
    rebuild(); syncControls(); changed();
  }

  function toCanvas(src) { if (src.getContext) return src; const c = document.createElement('canvas'); c.width = src.naturalWidth || src.width; c.height = src.naturalHeight || src.height; c.getContext('2d').drawImage(src, 0, 0); return c; }
  function canvasRGBA(src) { const cv = toCanvas(src), c = cv.getContext('2d', { willReadFrequently: true }); return c.getImageData(0, 0, cv.width, cv.height); }
  function workingLabel() { const st = V11.state; return st.custom ? `Yüklenen görsel “${st.customFileName || 'adsız'}” (tek yön)` : `Hazır savaşçı (${st.palette}, 8 yön)`; }
  function analyzeCurrent() {
    const st = V11.state; let front, side = null;
    front = V11.sourceCanvas(0); if (!st.custom) side = V11.sourceCanvas(2);
    const t0 = performance.now(), id = canvasRGBA(front);
    const an = F.analyzeCharacterImage(id.data, id.width, id.height);
    if (!an.ok) { status('s3-status', an.error, true); return false; }
    if (side) { const sd = canvasRGBA(side), d = F.analyzeSideDepth(sd.data, sd.width, sd.height, an); if (d) Object.assign(an.body, d), an.notes.push('Derinlik yan görünüşten ±%20 sınırla düzeltildi.'); }
    S3.perf.analyzeMs = performance.now() - t0;
    setSource(an, ['Güven ' + Math.round(an.confidence * 100) + '% · analiz ' + S3.perf.analyzeMs.toFixed(0) + ' ms', ...an.notes, 'Turuncu tarama (Tahmini yüzeyler) sırt, pelerin ve arka önlük gibi resimde görünmeyen bölgeleri gösterir.'],
      toCanvas(front), 'resim', workingLabel() + (side ? ' — ön + yan görünüş' : ''));
    status('s3-status', 'Resimden 3B karakter oluşturuldu. Anatomi panelinden düzeltebilirsiniz.');
    return true;
  }
  function fromPrompt() {
    const text = $('prompt').value; const pp = F.parsePrompt(text);
    setSource({ body: pp.body, palette: Object.assign({}, F.DEFAULT_PALETTE, pp.palette), style: Object.assign({}, F.DEFAULT_STYLE, pp.style) },
      ['Tarif kuralları (yapay zekâ değil): ' + (pp.found.join(', ') || 'tanınan sözcük yok, varsayılan savaşçı')], null, 'tarif', '“' + text.trim().slice(0, 60) + '”');
    status('s3-status', 'Tariften prosedürel 3B savaşçı oluşturuldu.');
  }

  // ---- Önizleme (CPU) ----
  const cv = () => $('s3-view');
  function draw() {
    if (!S3.ch) return;
    const c = cv(), W = c.width, H = c.height, t0 = performance.now();
    let mesh, skel, Wd, res = { tint: null };
    if (S3.viewer === 'glb' && S3.glbChar) {
      const g = S3.glbChar, clip = g.anim[S3.clip] ? S3.clip : Object.keys(g.anim)[0];
      const pose = g.samplePose(clip, Math.min(0.9999, S3.t) * g.anim[clip].duration); mesh = g.mesh; skel = g.skel; Wd = F.poseWorld(skel, pose);
    } else { res = F.sampleClip(S3.ch.skel, S3.clip, S3.t); mesh = S3.ch.mesh; skel = S3.ch.skel; Wd = F.poseWorld(skel, res.pose); }
    const sk = F.skinVertices(mesh, F.skinMatrices(skel, Wd));
    const scale = H / 2.45, cx = W / 2, cy = H * 0.9;
    // yavaş cihazda (kare > 60 ms) oynatma sırasında süper örnekleme 1x'e iner; durunca 2x net kare çizilir
    const ss = S3.dragging || (S3.playing && (S3.perf.frameMs || 0) > 60) ? 1 : 2;
    const r = F.render(mesh, sk, { width: W, height: H, yaw: S3.yaw, pitch: S3.pitch, scale, cx, cy, ss, highlight: S3.est && S3.viewer === 'forge' ? S3.est8 : null,
      shadow: { cx, cy, rx: 0.36 * scale, ry: 0.36 * scale * Math.sin(S3.pitch), alpha: 0.3 }, tint: res.tint && res.tint[3] > 0.01 ? res.tint : null });
    const ctx = c.getContext('2d'); ctx.clearRect(0, 0, W, H);
    const overlay = S3.overlay && S3.srcImg && S3.viewer === 'forge';
    if (overlay) { ctx.globalAlpha = 0.45; const s = S3.srcImg, k = Math.min(W / s.width, H / s.height); ctx.drawImage(s, (W - s.width * k) / 2, (H - s.height * k) / 2, s.width * k, s.height * k); ctx.globalAlpha = 1; }
    const off = document.createElement('canvas'); off.width = W; off.height = H; off.getContext('2d').putImageData(new ImageData(r.rgba, W, H), 0, 0);
    if (overlay) ctx.globalAlpha = 0.7; ctx.drawImage(off, 0, 0); ctx.globalAlpha = 1;
    if (S3.bones) {
      ctx.lineWidth = 2; ctx.strokeStyle = '#ffd25a'; ctx.fillStyle = '#ff6b5a';
      const opt = { yaw: S3.yaw, pitch: S3.pitch, scale, cx, cy };
      for (const b of skel.bones) { if (b.parent <= 0) continue; const a = F.project(Wd.wpos[b.parent], opt), p = F.project(Wd.wpos[b.index], opt); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); }
      for (const b of skel.bones) { const p = F.project(Wd.wpos[b.index], opt); ctx.beginPath(); ctx.arc(p[0], p[1], 3, 0, 7); ctx.fill(); }
    }
    const ms = performance.now() - t0; S3.perf.frameMs = ms;
    const deg = Math.round(((S3.yaw * 180 / Math.PI) % 360 + 360) % 360);
    $('s3-fps').textContent = `${F.CLIPS[S3.clip].label} · ${S3.playing ? 'oynuyor' : 'kare ' + (S3.frameIdx + 1) + '/8'} · açı ${deg}° · ${ms.toFixed(0)} ms (CPU)`;
    $('pv-label').innerHTML = S3.viewer === 'glb' ? `İzlenen: <b>GLB dosyası</b> “${esc(S3.glbName)}” (yalnızca görüntüleme)` : `İzlenen: <b>3B karakter</b> · ${S3.srcKind === 'resim' ? 'resimden' : 'tariften'} · ${S3.ch.skel.bones.length} kemik`;
  }
  function loop(now) {
    const visible = !document.hidden && cv().offsetParent !== null;
    if (S3.ch && S3.playing && visible) {
      if (now - (S3.lastDraw || 0) > 1000 / 15) { // telefonu ısıtmamak için 15 kare/sn önizleme
        const C = F.CLIPS[S3.clip]; S3.t += Math.min(0.2, (now - (S3.lastDraw || now)) / 1000) / C.duration;
        if (S3.t >= 1) S3.t = C.loop ? S3.t % 1 : (C.holdLast ? 0.9999 : 0);
        S3.frameIdx = Math.min(7, Math.floor(S3.t * 8));
        S3.lastDraw = now; draw(); $('an-frame').value = S3.frameIdx + 1; $('an-frame-lbl').textContent = `${S3.frameIdx + 1} / 8`;
      }
    } else S3.lastDraw = now;
    requestAnimationFrame(loop);
  }
  function bindView() {
    const c = cv(); let sx = 0, sy = 0, yaw0 = 0, p0 = 0;
    c.addEventListener('pointerdown', e => { S3.dragging = true; sx = e.clientX; sy = e.clientY; yaw0 = S3.yaw; p0 = S3.pitch; c.setPointerCapture(e.pointerId); });
    c.addEventListener('pointermove', e => { if (!S3.dragging) return; S3.yaw = yaw0 - (e.clientX - sx) * 0.012; S3.pitch = Math.max(-0.2, Math.min(1.2, p0 + (e.clientY - sy) * 0.006)); draw(); });
    const up = () => { if (S3.dragging) { S3.dragging = false; draw(); } };
    c.addEventListener('pointerup', up); c.addEventListener('pointercancel', up);
  }

  // ---- GLB içe aktarma (görüntüleme) ----
  function closeGLBView(silent) {
    S3.viewer = 'forge'; S3.glbChar = null; S3.glbName = ''; $('s3-glb-close').hidden = true;
    if (!silent) { status('s3-status', 'Forge karakterine dönüldü.'); draw(); }
  }
  async function importGLB(file) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const rep = F.verifyGLB(bytes);
    $('s3-import-out').innerHTML = glbReportHTML(rep);
    if (!rep.ok) { status('s3-status', file.name + ': hatalı GLB — görüntülenemedi', true); return rep; }
    try {
      S3.glbChar = F.characterFromGLB(bytes); S3.viewer = 'glb'; S3.glbName = file.name; $('s3-glb-close').hidden = false;
      status('s3-status', file.name + ': geçerli GLB — önizlemede ve Animasyon bölümünde izleniyor.'); draw();
    } catch (e) { status('s3-status', 'GLB okunamadı: ' + e.message, true); }
    return rep;
  }
  function glbReportHTML(rep) {
    const s = rep.stats || {}, an = s.animations || {};
    return (rep.ok ? '<b style="color:#8ff0c4">GLB DOĞRULANDI</b>' : '<b style="color:#ffb49e">GLB HATALI</b>') +
      ` · ${s.vertices || 0} vertex · ${s.triangles || 0} üçgen · ${s.joints || 0} kemik · ${s.primitives || 0} parça · ${fmtMB(s.bytes || 0)}<br>Animasyonlar: ` +
      (Object.entries(an).map(([k, v]) => `${esc(k)} ${v.duration} sn`).join(', ') || 'yok') + (rep.errors.length ? '<br>Hatalar: ' + esc(rep.errors.join('; ')) : '');
  }

  // ---- 3B işçi ve dışa aktarma ----
  function f3dWorker() {
    if (S3.worker) return S3.worker;
    const src = $('forge3d-core').textContent + '\n' + $('f3d-worker-src').textContent;
    S3.worker = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
    return S3.worker;
  }
  function srcForWorker() { return { body: S3.ch.params.body, palette: S3.ch.params.palette, style: S3.ch.params.style, seed: S3.src.seed || 7 }; }
  function charKey() { const j = JSON.stringify(srcForWorker()); let h = 2166136261; for (let i = 0; i < j.length; i++) { h ^= j.charCodeAt(i); h = Math.imul(h, 16777619); } return 'sp:' + (h >>> 0).toString(16); }
  async function storeSheet(name, data) { try { const k = charKey(), idx = (await LD.kvGet(k)) || []; if (!idx.includes(name)) idx.push(name); await LD.kvSet(k + ':' + name, data); await LD.kvSet(k, idx); } catch (e) { } }
  async function loadStoredSheets() { try { const k = charKey(), idx = (await LD.kvGet(k)) || []; for (const n of idx) { const d = await LD.kvGet(k + ':' + n); if (d) S3.sheets.set(n, d); } } catch (e) { } updateResume(); return S3.sheets.size; }
  async function clearStoredSheets() { try { const k = charKey(), idx = (await LD.kvGet(k)) || []; for (const n of idx) await LD.kvDel(k + ':' + n); await LD.kvDel(k); } catch (e) { } }
  function updateResume() { $('s3-resume').disabled = S3.busy || !(S3.sheets.size > 0 && S3.sheets.size < 40); }
  function runSprites(resume) {
    if (!S3.ch || S3.busy) return;
    S3.busy = true; $('s3-zip').disabled = true; $('s3-cancel').disabled = false; $('s3-resume').disabled = true;
    const w = f3dWorker(), t0 = performance.now(), have = resume ? [...S3.sheets.keys()] : [];
    if (!resume) S3.sheets.clear();
    let rSum = 0, eSum = 0;
    const end = () => { S3.busy = false; S3.progress = ''; $('s3-zip').disabled = false; $('s3-cancel').disabled = true; updateResume(); };
    w.onmessage = async ev => {
      const m = ev.data;
      if (m.type === 'framing') { S3.manifest = m.manifest; }
      else if (m.type === 'sheet') { S3.sheets.set(m.name, m.data); storeSheet(m.name, m.data); rSum += m.renderMs; eSum += m.encodeMs; S3.progress = `Sprite ${m.done}/40`; $('s3-bar').style.width = (m.done / m.total * 100).toFixed(1) + '%'; status('x-status', `Sprite sayfası ${m.done}/40 · ${m.name.split('/').slice(1).join(' / ')}`); }
      else if (m.type === 'cancelled') { end(); status('x-status', `İptal edildi: ${S3.sheets.size}/40 sayfa saklandı. "Devam et" ile kalanlar üretilir.`); }
      else if (m.type === 'error') { end(); status('x-status', 'Hata: ' + m.message, true); }
      else if (m.type === 'sprites-done') {
        status('x-status', 'GLB hazırlanıyor…');
        const glb = await makeGLB();
        const files = [...S3.sheets.entries()].sort().map(([name, data]) => ({ name, data }));
        const man = Object.assign({}, S3.manifest, { glbVerify: S3.lastVerify ? { ok: S3.lastVerify.ok, errors: S3.lastVerify.errors, stats: Object.assign({}, S3.lastVerify.stats, { extras: undefined }) } : null, device: DEV,
          timingsMs: { total: Math.round(performance.now() - t0), render: Math.round(rSum), pngEncode: Math.round(eSum) } });
        files.push({ name: 'manifest.json', data: new TextEncoder().encode(JSON.stringify(man, null, 2)) });
        if (glb) files.push({ name: 'model/forge_savasci.glb', data: glb });
        const zip = F.makeZipBytes(files);
        const back = F.readZip(zip), bad = back.filter(f => !f.crcOk).length;
        S3.lastZip = zip; S3.perf.spritesMs = performance.now() - t0;
        download(new Blob([zip], { type: 'application/zip' }), 'forge_v12_3d_8yon_5hareket.zip'); clearStoredSheets();
        $('s3-bar').style.width = '100%'; end();
        status('x-status', `Hazır: ${back.length} dosya (40 sayfa + manifest + GLB) · ZIP ${fmtMB(zip.length)} · CRC ${bad ? bad + ' HATALI' : 'tamam'} · ${(S3.perf.spritesMs / 1000).toFixed(1)} sn`);
        perfPanel();
      }
    };
    w.postMessage({ type: 'sprites', src: srcForWorker(), have, coolMs: +$('s3-cool').value, ss: DEV.cores && DEV.cores <= 4 && DEV.memGB && DEV.memGB < 3 ? 1 : 2 });
  }
  function makeGLB() {
    return new Promise(res => {
      const w = f3dWorker(), prev = w.onmessage;
      w.onmessage = ev => { const m = ev.data; if (m.type === 'glb') { S3.glb = m.data; S3.lastVerify = m.verify; S3.perf.glbMs = m.ms; w.onmessage = prev; res(m.data); } else if (m.type === 'error') { w.onmessage = prev; status('x-status', 'GLB hatası: ' + m.message, true); res(null); } else if (prev) prev(ev); };
      w.postMessage({ type: 'glb', src: srcForWorker() });
    });
  }
  function verifyGLBUI(bytes) {
    const rep = F.verifyGLB(bytes);
    $('s3-verify-out').innerHTML = glbReportHTML(rep) + '<br>Kemikler: ' + esc((rep.stats.jointNames || []).join(', '));
    try {
      const g = F.characterFromGLB(bytes), clip = S3.clip in g.anim ? S3.clip : 'idle';
      const pose = g.samplePose(clip, g.anim[clip].duration * 0.4), W = F.poseWorld(g.skel, pose);
      const sk = F.skinVertices(g.mesh, F.skinMatrices(g.skel, W)), c = $('s3-glbview'), sc = c.height / 2.45;
      const r = F.render(g.mesh, sk, { width: c.width, height: c.height, yaw: S3.yaw, pitch: S3.pitch, scale: sc, cx: c.width / 2, cy: c.height * 0.9, ss: 2 });
      c.getContext('2d').putImageData(new ImageData(r.rgba, c.width, c.height), 0, 0); c.hidden = false;
    } catch (e) { $('s3-verify-out').innerHTML += '<br>Yeniden kurma hatası: ' + esc(e.message); }
    return rep;
  }
  // Dışa aktarılan dosyayı kontrol et (GLB veya ZIP)
  async function checkFile(file) {
    const buf = new Uint8Array(await file.arrayBuffer()), out = $('x-check-out');
    const isGLB = buf[0] === 0x67 && buf[1] === 0x6C && buf[2] === 0x54 && buf[3] === 0x46;
    if (isGLB) { const rep = F.verifyGLB(buf); out.innerHTML = esc(file.name) + ': ' + glbReportHTML(rep); return { kind: 'glb', ok: rep.ok }; }
    try {
      const files = F.readZip(buf), bad = files.filter(f => f.crcOk === false).length, pngs = files.filter(f => /\.png$/i.test(f.name));
      const sizes = {}; let alpha = 0;
      for (const p of pngs) { const d = p.data; if (d.length > 26 && d[12] === 73 && d[13] === 72) { const w = (d[16] << 24 | d[17] << 16 | d[18] << 8 | d[19]) >>> 0, h = (d[20] << 24 | d[21] << 16 | d[22] << 8 | d[23]) >>> 0; sizes[w + '×' + h] = (sizes[w + '×' + h] || 0) + 1; if (d[25] === 6) alpha++; } }
      const man = files.find(f => f.name === 'manifest.json'), glb = files.find(f => /\.glb$/i.test(f.name));
      let glbOk = null; if (glb) glbOk = F.verifyGLB(glb.data).ok;
      const ok = bad === 0 && pngs.length > 0;
      out.innerHTML = `${esc(file.name)}: <b style="color:${ok ? '#8ff0c4' : '#ffb49e'}">${ok ? 'ZIP SAĞLAM' : 'ZIP SORUNLU'}</b> · ${files.length} dosya · ${pngs.length} PNG (${Object.entries(sizes).map(([k, v]) => v + '× ' + k).join(', ') || '—'}, ${alpha} şeffaf) · CRC hatası ${bad} · manifest ${man ? 'var' : 'yok'}` + (glb ? ` · GLB ${glbOk ? 'geçerli' : 'HATALI'}` : '');
      return { kind: 'zip', ok, pngs: pngs.length };
    } catch (e) { out.innerHTML = esc(file.name) + ': <b style="color:#ffb49e">tanınmadı</b> — ' + esc(e.message); return { kind: '?', ok: false }; }
  }
  function perfPanel() {
    const p = S3.perf, ld = LD.lastPerf || {};
    $('perf-out').textContent = JSON.stringify({ cihaz: { çekirdek: DEV.cores, bellekGB: DEV.memGB, wasmSIMD: DEV.simd, offscreenCanvas: DEV.offscreen, compressionStream: DEV.compression, crossOriginIsolated: DEV.isolated, protokol: DEV.protocol },
      ölçümler_ms: { analiz: p.analyzeMs && Math.round(p.analyzeMs), meshKurulum: p.buildMs && Math.round(p.buildMs), önizlemeKaresi: p.frameMs && Math.round(p.frameMs), sprite40: p.spritesMs && Math.round(p.spritesMs), glb: p.glbMs && Math.round(p.glbMs) },
      yerelRüya: ld, jsHeapMB: performance.memory ? +(performance.memory.usedJSHeapSize / 1048576).toFixed(1) : 'tarayıcı bildirmiyor', zaman: new Date().toISOString(), ua: DEV.ua }, null, 1);
    $('set-cpu-info').textContent = `${DEV.cores || '?'} çekirdek · bellek ${DEV.memGB ? DEV.memGB + ' GB' : 'bilinmiyor'} · WASM SIMD ${DEV.simd ? 'var' : 'yok'} · görsel motoru ${DEV.isolated ? 'çok' : 'tek'} iş parçacığı${DEV.isolated ? '' : ' (dosyadan açılan sayfada çoklu iş parçacığı kullanılamaz)'}`;
  }

  // ---------------- YEREL RÜYA (görsel üretimi) ----------------
  function packInfo(msg) { $('set-pack-info').textContent = msg; }
  async function ldShowPack(p, lazy) {
    if (!p) { status('ld-status', 'Model paketi yok. Bir kez “Model paketi seç” ile .forgepack dosyasını seçin; sonra internet gerekmez.', 'warn'); packInfo('Yüklü paket yok.'); $('ld-go').disabled = true; $('ld-file-lbl').hidden = false; return; }
    const cfg = LD.config(); $('ld-file-lbl').hidden = true;
    packInfo(`${cfg.name} · ${fmtMB(p.bytes || 0)} · ${p.saved === false ? 'yalnızca bu oturumda' : 'cihazda kayıtlı (çevrimdışı)'}`);
    if (lazy) {
      status('ld-status', `Model hazır: ${cfg.name} (${fmtMB(p.bytes || 0)}, cihazda). Motor ilk üretimde başlar.`);
      $('ld-go').disabled = false; LD.needStart = true; const st = await LD.savedState(); $('ld-resume').disabled = !st; return;
    }
    LD.needStart = false;
    status('ld-status', `Paket: ${cfg.name} · ${fmtMB(p.bytes || 0)} · motor başlatılıyor…`);
    try {
      const t0 = performance.now();
      const info = await LD.start({ threads: DEV.isolated ? Math.min(4, DEV.cores || 1) : 1, memSaver: $('ld-memsaver').checked });
      LD.lastPerf = Object.assign(LD.lastPerf || {}, { motorBaşlatmaMs: Math.round(performance.now() - t0), iş_parçacığı: info.threads });
      status('ld-status', `Hazır: ${cfg.name} · ONNX Runtime WASM (CPU, ${info.threads} iş parçacığı) · başlatma ${Math.round(performance.now() - t0)} ms`);
      $('ld-go').disabled = false;
      const st = await LD.savedState(); $('ld-resume').disabled = !st;
    } catch (e) { status('ld-status', 'Motor başlatılamadı: ' + e.message, true); }
  }
  function ldChips() {
    const cfg = LD.pack ? LD.config() : null, r = LD.promptToCond($('prompt').value, cfg);
    const names = ['yön', 'silah', 'zırh', 'baş', 'pelerin', 'kalkan', 'kumaş', 'metal', 'poz'];
    const vals = cfg ? r.cond.map((v, i) => { const k = cfg.attrKeys[i], vs = cfg.attrValues[k]; return names[i] + ': ' + (k === 'dir' ? F.DIRS[v] : vs ? vs[v] : v); }) : [];
    $('ld-chips').innerHTML = vals.map(v => `<span class="chip">${esc(v)}</span>`).join('') + (r.unknown.length ? `<span class="chip warn">anlaşılmayan: ${esc(r.unknown.slice(0, 6).join(', '))}</span>` : '');
    return r;
  }
  function useLDImage(then) { const img = new Image(); img.onload = () => { V11.importImage(img, 'YerelRuya_' + (LD.lastSeed || 0) + '.png', true); changed(); then && then(); }; img.src = $('ld-out').toDataURL('image/png'); }
  function ldBind() {
    $('ld-size').querySelector('option[value="512"]').disabled = !allow512;
    if (!allow512) $('ld-size-note').textContent = 'Bu cihaz ' + DEV.memGB + ' GB bildiriyor: 512 kapalı.';
    $('ld-file').onchange = async e => { const f = e.target.files[0]; if (!f) return; try { status('ld-status', 'Paket okunuyor…'); await ldShowPack(await LD.loadPackFile(f)); } catch (err) { status('ld-status', err.message, true); } };
    $('ld-files').onchange = async e => { if (!e.target.files.length) return; try { await ldShowPack(await LD.loadLoose(e.target.files)); } catch (err) { status('ld-status', err.message, true); } };
    $('ld-url').hidden = !/^https?:/.test(location.protocol);
    $('ld-url').onclick = async () => { try { status('ld-status', 'Paket bu klasörden yükleniyor (yalnızca kurulum)…'); await ldShowPack(await LD.loadFromUrl('yerel-calisma/ForgeMini_Savasci_v1.forgepack')); } catch (err) { status('ld-status', err.message, true); } };
    $('ld-forget').onclick = async () => { await LD.forget(); ldShowPack(null); };
    $('prompt').addEventListener('input', () => { ldChips(); changed(); });
    $('ld-go').onclick = () => ldRun(false);
    $('ld-resume').onclick = () => ldRun(true);
    $('ld-cancel').onclick = () => { LD.cancel(); status('ld-status', 'İptal istendi…'); };
    $('ld-save').onclick = () => { $('ld-out').toBlob(b => download(b, 'yerel_ruya_' + (LD.lastSeed || 0) + '.png'), 'image/png'); };
    $('ld-to-forge').onclick = () => useLDImage(() => status('ld-status', 'Görsel çalışma karakteri yapıldı (beyaz zemin temizlendi). Görsel Düzenle bölümünde düzenleyebilirsiniz.'));
    $('ld-to-3d').onclick = () => useLDImage(() => { if (analyzeCurrent()) window.ForgeShell && window.ForgeShell.go('model'); });
    LD.onMessage = m => {
      if (m.type === 'progress') {
        const tot = m.total, frac = m.phase === 'decode' ? 0.97 : 0.95 * m.step / tot;
        $('ld-bar').style.width = (frac * 100).toFixed(1) + '%';
        const el = (performance.now() - LD.t0) / 1000; S3.ldProgress = m.phase === 'decode' ? 'Görsel çözülüyor' : `Görsel ${m.step}/${tot}`;
        status('ld-status', m.phase === 'decode' ? 'Görüntü çözülüyor…' : `Gürültü giderme adımı ${m.step}/${tot} · ${el.toFixed(1)} sn`);
      } else if (m.type === 'done') {
        const c = $('ld-out'); c.width = m.width; c.height = m.height; c.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(m.rgba), m.width, m.height), 0, 0);
        $('ld-empty').hidden = true; S3.ldHasImage = true; $('ld-save').disabled = false;
        $('ld-bar').style.width = '100%'; LD.busy = false; S3.ldProgress = ''; ldButtons();
        LD.lastPerf = Object.assign(LD.lastPerf || {}, { sonÜretim: { boyut: m.width, toplamMs: Math.round(m.totalMs), unetMs: Math.round(m.timings.unetMs), çözücüMs: Math.round(m.timings.decodeMs), unetAdım: m.timings.steps } });
        status('ld-status', `Üretildi: ${m.width}×${m.height}${m.width > 256 ? ' (256 üretim + 2× büyütme)' : ''} · ${(m.totalMs / 1000).toFixed(1)} sn · tamamen bu cihazda`);
        $('ld-result').hidden = false; perfPanel();
      } else if (m.type === 'cancelled') { LD.busy = false; S3.ldProgress = ''; ldButtons(); $('ld-resume').disabled = false; status('ld-status', 'İptal edildi. "Devam et" kaydedilen adımdan sürdürür.'); }
      else if (m.type === 'error') { LD.busy = false; S3.ldProgress = ''; ldButtons(); status('ld-status', 'Hata: ' + m.message, true); }
    };
  }
  function ldButtons() { $('ld-go').disabled = LD.busy || !(LD.ready || LD.pack); $('ld-cancel').disabled = !LD.busy; }
  async function ldRun(resume) {
    if (LD.busy) return;
    if (!LD.ready && LD.pack) { $('ld-go').disabled = true; await ldShowPack(LD.pack); if (!LD.ready) { ldButtons(); return; } }
    if (!LD.ready) return;
    const r = ldChips(), seed = $('ld-seed').value === '' ? Math.floor(Math.random() * 1e9) : +$('ld-seed').value;
    LD.lastSeed = seed; LD.busy = true; LD.t0 = performance.now(); ldButtons(); $('ld-bar').style.width = '0%';
    const req = { cond: r.cond, seed, steps: +$('ld-steps').value, guidance: +$('ld-guid').value, size: +$('ld-size').value, coolMs: +$('ld-cool').value };
    try { if (resume) await LD.resume(); else LD.generate(req); } catch (e) { LD.busy = false; ldButtons(); status('ld-status', e.message, true); }
  }

  // ---------------- Hazır savaşçı önizlemesi (V11.2) ----------------
  function drawPreset() {
    if (!V11.ready) return;
    const c = $('hz-preview'), ctx = c.getContext('2d'); ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(V11.frameCanvas(0, 'idle', 0, 256, true), 0, 0, c.width, c.height);
  }

  // ---------------- Başlat ----------------
  function init() {
    buildControls(); bindView(); ldBind();
    $('s3-analyze').onclick = () => { if (analyzeCurrent()) status('s3-status', 'Resimden 3B karakter oluşturuldu. Anatomi panelinden düzeltebilirsiniz.'); };
    $('s3-prompt').onclick = fromPrompt;
    $('an-play').onclick = () => { S3.playing = !S3.playing; V11.setPlaying(S3.playing); syncButtons(); };
    $('an-prev').onclick = () => setFrame(S3.frameIdx - 1);
    $('an-next').onclick = () => setFrame(S3.frameIdx + 1);
    $('an-frame').oninput = e => setFrame(+e.target.value - 1);
    $('s3-bones').onchange = e => { S3.bones = e.target.checked; draw(); };
    $('s3-est').onchange = e => { S3.est = e.target.checked; draw(); };
    $('s3-overlay').onchange = e => { S3.overlay = e.target.checked; if (S3.overlay) { selectDir(0); selectClip('idle'); setFrame(0); } draw(); };
    $('s3-zip').onclick = () => runSprites(false); $('s3-resume').onclick = async () => { if (!S3.sheets.size) await loadStoredSheets(); runSprites(true); };
    $('s3-cancel').onclick = () => { if (S3.worker) S3.worker.postMessage({ type: 'cancel' }); };
    $('s3-glb').onclick = async () => { status('x-status', 'GLB üretiliyor…'); const g = await makeGLB(); if (g) { download(new Blob([g], { type: 'model/gltf-binary' }), 'forge_v12_savasci.glb'); const rep = verifyGLBUI(g); status('x-status', `GLB indirildi (${fmtMB(g.length)}) ve tekrar okunarak ${rep.ok ? 'doğrulandı' : 'HATALI bulundu'}.`, !rep.ok); perfPanel(); } };
    $('s3-verify-file').onchange = async e => { const f = e.target.files[0]; if (f) await importGLB(f); e.target.value = ''; };
    $('s3-glb-close').onclick = () => closeGLBView(false);
    $('x-check').onchange = async e => { const f = e.target.files[0]; if (f) await checkFile(f); e.target.value = ''; };
    $('perf-run').onclick = perfPanel; $('perf-save').onclick = () => { perfPanel(); download(new Blob([$('perf-out').textContent], { type: 'application/json' }), 'forge_v12_cihaz_olcum.json'); };
    $('generate').addEventListener('click', () => setTimeout(() => { drawPreset(); changed(); }, 30));
    // V11.2 çalışma görseli değişince (dönüş, örnek, yükleme, düzenleme) yön düğmelerinin etkinliği yeniden eşitlenir
    ['returnWarrior', 'importExample', 'generate'].forEach(id => $(id).addEventListener('click', () => setTimeout(syncButtons, 40)));
    $('importFile').addEventListener('change', () => { setTimeout(syncButtons, 300); setTimeout(syncButtons, 1200); });
    document.addEventListener('forge:changed', () => syncButtons());
    $('palettes').addEventListener('change', () => setTimeout(() => { drawPreset(); changed(); }, 30));
    fromPrompt();
    syncButtons();
    requestAnimationFrame(loop);
    LD.restore().then(p => ldShowPack(p, true)).catch(() => ldShowPack(null));
    ldChips(); perfPanel();
    const waitV11 = () => { if (V11.ready) { drawPreset(); syncButtons(); } else setTimeout(waitV11, 100); }; waitV11();
    window.ForgeV12 = { S3, LD, DEV, analyzeCurrent, fromPrompt, setSource, runSprites, makeGLB, verifyGLBUI, importGLB, checkFile, draw, drawPreset, selectClip, selectDir, setFrame, syncButtons, workingLabel, toCanvas, download, status, ldChips, rebuild, syncControls };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
