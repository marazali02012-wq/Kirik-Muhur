/* Forge 2.5D V12 — arayüz: 3B Karakter Stüdyosu + Yerel Rüya (Local Dream) motoru.
   V11.2 arayüzü olduğu gibi çalışır; bu modül yalnızca yeni bölümleri yönetir. */
(() => {
  'use strict';
  const F = window.Forge3D, LD = window.ForgeLocalDream, V11 = window.ForgeV11;
  const $ = id => document.getElementById(id);
  const fmtMB = b => (b / 1048576).toFixed(1) + ' MB';
  const download = (data, name, type) => { const url = URL.createObjectURL(data instanceof Blob ? data : new Blob([data], { type: type || 'application/octet-stream' })); const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 15000); };
  const status = (id, msg, err) => { const e = $(id); e.textContent = msg; e.style.color = err ? '#ffb49e' : '#9aefcf'; };

  // ---------------- Cihaz bilgisi ----------------
  const simdOk = (() => { try { return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11])); } catch (e) { return false; } })();
  const DEV = { cores: navigator.hardwareConcurrency || 0, memGB: navigator.deviceMemory || null, simd: simdOk, offscreen: typeof OffscreenCanvas !== 'undefined', compression: typeof CompressionStream !== 'undefined', isolated: !!window.crossOriginIsolated, protocol: location.protocol, ua: navigator.userAgent };
  const allow512 = !DEV.memGB || DEV.memGB >= 4;

  // ---------------- 3B STÜDYO ----------------
  const S3 = { src: null, ch: null, yaw: 0, pitch: 0.33, clip: 'idle', t: 0, playing: true, last: 0, bones: false, est: false, overlay: false, srcImg: null,
    sheets: new Map(), manifest: null, glb: null, worker: null, busy: false, perf: {} };
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

  function buildControls() {
    const sl = $('s3-sliders');
    for (const [k, label, mn, mx, st] of SLIDERS) {
      const w = document.createElement('label'); w.className = 's3-sl';
      w.innerHTML = `<span>${label}</span><input type="range" min="${mn}" max="${mx}" step="${st}" data-body="${k}"><b></b>`;
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
    for (const [k, label] of COLORS) { const w = document.createElement('label'); w.className = 's3-col'; w.innerHTML = `<input type="color" data-pal="${k}"><span>${label}</span>`; cs.appendChild(w); }
    sl.addEventListener('input', e => { const k = e.target.dataset.body; if (!k) return; S3.src.body[k] = +e.target.value; e.target.nextElementSibling.textContent = (+e.target.value).toFixed(2); rebuild(); });
    ss.addEventListener('change', e => { const k = e.target.dataset.style; if (!k) return; S3.src.style[k] = e.target.type === 'checkbox' ? e.target.checked : e.target.value; rebuild(); });
    cs.addEventListener('input', e => { const k = e.target.dataset.pal; if (!k) return; S3.src.palette[k] = unhex(e.target.value); if (k === 'cloth') S3.src.palette.under = S3.src.palette.cloth.map(v => Math.round(v * 0.55 + 20)); rebuild(); });
    const cl = $('s3-clips');
    F.CLIP_KEYS.forEach(k => { const b = document.createElement('button'); b.className = 'btn'; b.textContent = F.CLIPS[k].label; b.dataset.clip = k; b.onclick = () => { S3.clip = k; S3.t = 0; S3.playing = true; syncButtons(); }; cl.appendChild(b); });
    const dr = $('s3-dirs');
    F.DIRS.forEach((d, i) => { const b = document.createElement('button'); b.className = 'btn'; b.textContent = d; b.onclick = () => { S3.yaw = i * Math.PI / 4; draw(); }; dr.appendChild(b); });
  }
  function syncControls() {
    const B = S3.ch.params.body, st = S3.ch.params.style, P = S3.ch.params.palette;
    document.querySelectorAll('[data-body]').forEach(i => { i.value = B[i.dataset.body]; i.nextElementSibling.textContent = (+B[i.dataset.body]).toFixed(2); });
    document.querySelectorAll('select[data-style]').forEach(i => { i.value = st[i.dataset.style]; });
    document.querySelectorAll('input[type=checkbox][data-style]').forEach(i => { i.checked = !!st[i.dataset.style]; });
    document.querySelectorAll('[data-pal]').forEach(i => { i.value = hex(P[i.dataset.pal]); });
  }
  function syncButtons() { document.querySelectorAll('#s3-clips [data-clip]').forEach(b => b.classList.toggle('active', b.dataset.clip === S3.clip)); $('s3-play').textContent = S3.playing ? '❚❚ Durdur' : '▶ Oynat'; }

  function rebuild(keepSheets) {
    const t0 = performance.now();
    S3.ch = F.createCharacter({ body: S3.src.body, palette: S3.src.palette, style: S3.src.style, seed: S3.src.seed || 7 });
    S3.perf.buildMs = performance.now() - t0;
    if (!keepSheets) { S3.sheets.clear(); S3.glb = null; S3.manifest = null; updateResume(); loadStoredSheets().then(n => { if (n > 0 && n < 40) status('s3-status', `Bu karakter için önceki oturumdan ${n}/40 sayfa bulundu. "Devam et" ile tamamlayın.`); }); }
    const est = new Uint8Array(S3.ch.mesh.parts.length); S3.ch.mesh.parts.forEach((p, i) => { est[i] = p.estimated ? 1 : 0; }); S3.est8 = est;
    const m = S3.ch.mesh;
    $('s3-info').textContent = `${m.vertexCount} vertex · ${m.triangleCount} üçgen · ${S3.ch.skel.bones.length} kemik · ${m.parts.length} parça · kurulum ${S3.perf.buildMs.toFixed(0)} ms`;
    draw();
  }

  function setSource(src, notes, srcImg) {
    S3.src = { body: Object.assign({}, src.body), palette: Object.assign({}, src.palette), style: Object.assign({}, src.style), seed: 7 };
    S3.srcImg = srcImg || null;
    $('s3-notes').innerHTML = (notes || []).map(n => '• ' + n).join('<br>');
    rebuild(); syncControls(); $('s3-editor').hidden = false;
  }

  function toCanvas(src) { if (src.getContext) return src; const c = document.createElement('canvas'); c.width = src.naturalWidth || src.width; c.height = src.naturalHeight || src.height; c.getContext('2d').drawImage(src, 0, 0); return c; }
  function canvasRGBA(src) { const cv = toCanvas(src), c = cv.getContext('2d', { willReadFrequently: true }); return c.getImageData(0, 0, cv.width, cv.height); }
  function analyzeCurrent() {
    const st = V11.state; let front, side = null, label;
    if (st.custom) { front = V11.sourceCanvas(0); label = 'İçe aktarılan PNG (tek yön)'; }
    else { front = V11.sourceCanvas(0); side = V11.sourceCanvas(2); label = 'V11.2 boyalı savaşçı (ön + yan görünüş)'; }
    const t0 = performance.now(), id = canvasRGBA(front);
    const an = F.analyzeCharacterImage(id.data, id.width, id.height);
    if (!an.ok) { status('s3-status', an.error, true); return; }
    if (side) { const sd = canvasRGBA(side), d = F.analyzeSideDepth(sd.data, sd.width, sd.height, an); if (d) Object.assign(an.body, d), an.notes.push('Derinlik yan görünüşten ±%20 sınırla düzeltildi.'); }
    S3.perf.analyzeMs = performance.now() - t0;
    setSource(an, [label + ' · güven ' + Math.round(an.confidence * 100) + '% · analiz ' + S3.perf.analyzeMs.toFixed(0) + ' ms', ...an.notes, 'Turuncu tarama (✓ Tahmini yüzeyler) sırt/pelerin/arka önlük gibi resimde görünmeyen bölgeleri gösterir.'], toCanvas(front));
    status('s3-status', 'Resimden 3B karakter oluşturuldu. Kaydırıcılarla anatomiyi düzeltebilirsiniz.');
  }
  function fromPrompt() {
    const text = $('prompt').value; const pp = F.parsePrompt(text);
    setSource({ body: pp.body, palette: Object.assign({}, F.DEFAULT_PALETTE, pp.palette), style: Object.assign({}, F.DEFAULT_STYLE, pp.style) }, ['Tarif kuralları (yapay zekâ değil): ' + (pp.found.join(', ') || 'tanınan sözcük yok, varsayılan savaşçı')]);
    status('s3-status', 'Tariften prosedürel 3B savaşçı oluşturuldu.');
  }

  // ---- Önizleme (CPU) ----
  const cv = () => $('s3-view');
  function draw() {
    if (!S3.ch) return;
    const c = cv(), W = c.width, H = c.height, t0 = performance.now();
    const res = F.sampleClip(S3.ch.skel, S3.clip, S3.t), Wd = F.poseWorld(S3.ch.skel, res.pose);
    const sk = F.skinVertices(S3.ch.mesh, F.skinMatrices(S3.ch.skel, Wd));
    const scale = H / 2.45, cx = W / 2, cy = H * 0.9;
    const r = F.render(S3.ch.mesh, sk, { width: W, height: H, yaw: S3.yaw, pitch: S3.pitch, scale, cx, cy, ss: S3.dragging ? 1 : 2, highlight: S3.est ? S3.est8 : null,
      shadow: { cx, cy, rx: 0.36 * scale, ry: 0.36 * scale * Math.sin(S3.pitch), alpha: 0.3 }, tint: res.tint && res.tint[3] > 0.01 ? res.tint : null });
    const ctx = c.getContext('2d'); ctx.clearRect(0, 0, W, H);
    if (S3.overlay && S3.srcImg) { ctx.globalAlpha = 0.45; const s = S3.srcImg, k = Math.min(W / s.width, H / s.height); ctx.drawImage(s, (W - s.width * k) / 2, (H - s.height * k) / 2, s.width * k, s.height * k); ctx.globalAlpha = 1; }
    const tmp = new ImageData(r.rgba, W, H), off = document.createElement('canvas'); off.width = W; off.height = H; off.getContext('2d').putImageData(tmp, 0, 0);
    if (S3.overlay) ctx.globalAlpha = 0.7; ctx.drawImage(off, 0, 0); ctx.globalAlpha = 1;
    if (S3.bones) {
      ctx.lineWidth = 2; ctx.strokeStyle = '#ffd25a'; ctx.fillStyle = '#ff6b5a';
      const opt = { yaw: S3.yaw, pitch: S3.pitch, scale, cx, cy };
      for (const b of S3.ch.skel.bones) { if (b.parent <= 0) continue; const a = F.project(Wd.wpos[b.parent], opt), p = F.project(Wd.wpos[b.index], opt); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); }
      for (const b of S3.ch.skel.bones) { const p = F.project(Wd.wpos[b.index], opt); ctx.beginPath(); ctx.arc(p[0], p[1], 3, 0, 7); ctx.fill(); }
    }
    const ms = performance.now() - t0; S3.perf.frameMs = ms;
    $('s3-fps').textContent = `${F.CLIPS[S3.clip].label} · açı ${Math.round(((S3.yaw * 180 / Math.PI) % 360 + 360) % 360)}° · kare ${ms.toFixed(0)} ms (CPU)`;
  }
  function loop(now) {
    if (S3.ch && S3.playing && !document.hidden) {
      const dt = Math.min(0.1, (now - (S3.last || now)) / 1000);
      if (now - (S3.lastDraw || 0) > 1000 / 15) { // telefonu ısıtmamak için 15 kare/sn önizleme
        const C = F.CLIPS[S3.clip]; S3.t += (now - (S3.lastDraw || now)) / 1000 / C.duration;
        if (S3.t >= 1) S3.t = C.loop ? S3.t % 1 : (C.holdLast ? 0.9999 : 0);
        S3.lastDraw = now; draw();
      }
      S3.last = now;
    }
    requestAnimationFrame(loop);
  }
  function bindView() {
    const c = cv(); let sx = 0, sy = 0, yaw0 = 0, p0 = 0;
    c.addEventListener('pointerdown', e => { S3.dragging = true; sx = e.clientX; sy = e.clientY; yaw0 = S3.yaw; p0 = S3.pitch; c.setPointerCapture(e.pointerId); });
    c.addEventListener('pointermove', e => { if (!S3.dragging) return; S3.yaw = yaw0 - (e.clientX - sx) * 0.012; S3.pitch = Math.max(-0.2, Math.min(1.2, p0 + (e.clientY - sy) * 0.006)); draw(); });
    const up = () => { if (S3.dragging) { S3.dragging = false; draw(); } };
    c.addEventListener('pointerup', up); c.addEventListener('pointercancel', up);
  }

  // ---- 3B işçi ----
  function f3dWorker() {
    if (S3.worker) return S3.worker;
    const src = $('forge3d-core').textContent + '\n' + $('f3d-worker-src').textContent;
    S3.worker = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
    return S3.worker;
  }
  function srcForWorker() { return { body: S3.ch.params.body, palette: S3.ch.params.palette, style: S3.ch.params.style, seed: S3.src.seed || 7 }; }
  // Sekme kapanırsa (telefon belleği) tamamlanan sayfalar kaybolmasın: IndexedDB'de karakter özetine göre saklanır
  function charKey() { const j = JSON.stringify(srcForWorker()); let h = 2166136261; for (let i = 0; i < j.length; i++) { h ^= j.charCodeAt(i); h = Math.imul(h, 16777619); } return 'sp:' + (h >>> 0).toString(16); }
  async function storeSheet(name, data) { try { const k = charKey(), idx = (await LD.kvGet(k)) || []; if (!idx.includes(name)) idx.push(name); await LD.kvSet(k + ':' + name, data); await LD.kvSet(k, idx); } catch (e) { } }
  async function loadStoredSheets() { try { const k = charKey(), idx = (await LD.kvGet(k)) || []; for (const n of idx) { const d = await LD.kvGet(k + ':' + n); if (d) S3.sheets.set(n, d); } } catch (e) { } updateResume(); return S3.sheets.size; }
  async function clearStoredSheets() { try { const k = charKey(), idx = (await LD.kvGet(k)) || []; for (const n of idx) await LD.kvDel(k + ':' + n); await LD.kvDel(k); } catch (e) { } }
  function updateResume() { $('s3-resume').disabled = !(S3.sheets.size > 0 && S3.sheets.size < 40); }
  function runSprites(resume) {
    if (!S3.ch || S3.busy) return;
    S3.busy = true; $('s3-zip').disabled = true; $('s3-cancel').disabled = false; $('s3-resume').disabled = true;
    const w = f3dWorker(), t0 = performance.now(), have = resume ? [...S3.sheets.keys()] : [];
    if (!resume) S3.sheets.clear();
    let rSum = 0, eSum = 0;
    w.onmessage = async ev => {
      const m = ev.data;
      if (m.type === 'framing') { S3.manifest = m.manifest; }
      else if (m.type === 'sheet') { S3.sheets.set(m.name, m.data); storeSheet(m.name, m.data); rSum += m.renderMs; eSum += m.encodeMs; $('s3-bar').style.width = (m.done / m.total * 100).toFixed(1) + '%'; status('s3-status', `Sprite sayfası ${m.done}/40 · ${m.name.split('/').slice(1).join(' / ')}`); }
      else if (m.type === 'cancelled') { S3.busy = false; $('s3-zip').disabled = false; $('s3-cancel').disabled = true; updateResume(); status('s3-status', `İptal edildi: ${S3.sheets.size}/40 sayfa saklandı. "Devam et" ile kalanlar üretilir.`); }
      else if (m.type === 'error') { S3.busy = false; $('s3-zip').disabled = false; $('s3-cancel').disabled = true; updateResume(); status('s3-status', 'Hata: ' + m.message, true); }
      else if (m.type === 'sprites-done') {
        status('s3-status', 'GLB hazırlanıyor…');
        const glb = await makeGLB();
        const files = [...S3.sheets.entries()].sort().map(([name, data]) => ({ name, data }));
        const man = Object.assign({}, S3.manifest, { glbVerify: S3.lastVerify ? { ok: S3.lastVerify.ok, errors: S3.lastVerify.errors, stats: Object.assign({}, S3.lastVerify.stats, { extras: undefined }) } : null, device: DEV,
          timingsMs: { total: Math.round(performance.now() - t0), render: Math.round(rSum), pngEncode: Math.round(eSum) } });
        files.push({ name: 'manifest.json', data: new TextEncoder().encode(JSON.stringify(man, null, 2)) });
        if (glb) files.push({ name: 'model/forge_savasci.glb', data: glb });
        const zip = F.makeZipBytes(files);
        // ZIP'i hemen geri okuyup doğrula
        const back = F.readZip(zip), bad = back.filter(f => !f.crcOk).length;
        S3.lastZip = zip; S3.perf.spritesMs = performance.now() - t0;
        download(new Blob([zip], { type: 'application/zip' }), 'forge_v12_3d_8yon_5hareket.zip'); clearStoredSheets();
        $('s3-bar').style.width = '100%'; S3.busy = false; $('s3-zip').disabled = false; $('s3-cancel').disabled = true; updateResume();
        status('s3-status', `Hazır: ${back.length} dosya (40 sayfa + manifest + GLB) · ZIP ${fmtMB(zip.length)} · CRC ${bad ? bad + ' HATALI' : 'tamam'} · ${(S3.perf.spritesMs / 1000).toFixed(1)} sn`);
        perfPanel();
      }
    };
    w.postMessage({ type: 'sprites', src: srcForWorker(), have, coolMs: +$('s3-cool').value, ss: DEV.cores && DEV.cores <= 4 && DEV.memGB && DEV.memGB < 3 ? 1 : 2 });
  }
  function makeGLB() {
    return new Promise(res => {
      const w = f3dWorker(), prev = w.onmessage;
      w.onmessage = ev => { const m = ev.data; if (m.type === 'glb') { S3.glb = m.data; S3.lastVerify = m.verify; S3.perf.glbMs = m.ms; w.onmessage = prev; res(m.data); } else if (m.type === 'error') { w.onmessage = prev; status('s3-status', 'GLB hatası: ' + m.message, true); res(null); } else if (prev) prev(ev); };
      w.postMessage({ type: 'glb', src: srcForWorker() });
    });
  }
  async function verifyGLBUI(bytes) {
    const rep = F.verifyGLB(bytes);
    const s = rep.stats || {}, an = s.animations || {};
    $('s3-verify-out').innerHTML = (rep.ok ? '<b style="color:#8ff0c4">GLB DOĞRULANDI</b>' : '<b style="color:#ffb49e">GLB HATALI</b>') +
      ` · ${s.vertices} vertex · ${s.triangles} üçgen · ${s.joints} kemik · ${s.primitives} parça · ${fmtMB(s.bytes || 0)}<br>Animasyonlar: ` + Object.entries(an).map(([k, v]) => `${k} ${v.duration}s (${v.channels} kanal)`).join(', ') +
      (rep.errors.length ? '<br>Hatalar: ' + rep.errors.join('; ') : '') + '<br>Kemikler: ' + (s.jointNames || []).join(', ');
    // GLB'den kurulan karakteri önizlemede çiz (dosyanın kendisi okunarak)
    try {
      const g = F.characterFromGLB(bytes), clip = S3.clip in g.anim ? S3.clip : 'idle';
      const pose = g.samplePose(clip, g.anim[clip].duration * 0.4), W = F.poseWorld(g.skel, pose);
      const sk = F.skinVertices(g.mesh, F.skinMatrices(g.skel, W)), c = $('s3-glbview'), sc = c.height / 2.45;
      const r = F.render(g.mesh, sk, { width: c.width, height: c.height, yaw: S3.yaw, pitch: S3.pitch, scale: sc, cx: c.width / 2, cy: c.height * 0.9, ss: 2 });
      c.getContext('2d').putImageData(new ImageData(r.rgba, c.width, c.height), 0, 0); c.hidden = false;
    } catch (e) { $('s3-verify-out').innerHTML += '<br>Yeniden kurma hatası: ' + e.message; }
    return rep;
  }
  function perfPanel() {
    const p = S3.perf, ld = LD.lastPerf || {};
    $('perf-out').textContent = JSON.stringify({ cihaz: { çekirdek: DEV.cores, bellekGB: DEV.memGB, wasmSIMD: DEV.simd, offscreenCanvas: DEV.offscreen, compressionStream: DEV.compression, crossOriginIsolated: DEV.isolated, protokol: DEV.protocol },
      ölçümler_ms: { analiz: p.analyzeMs && Math.round(p.analyzeMs), meshKurulum: p.buildMs && Math.round(p.buildMs), önizlemeKaresi: p.frameMs && Math.round(p.frameMs), sprite40: p.spritesMs && Math.round(p.spritesMs), glb: p.glbMs && Math.round(p.glbMs) },
      yerelRüya: ld, jsHeapMB: performance.memory ? +(performance.memory.usedJSHeapSize / 1048576).toFixed(1) : 'tarayıcı bildirmiyor', zaman: new Date().toISOString(), ua: DEV.ua }, null, 1);
  }

  // ---------------- YEREL RÜYA (Local Dream) ----------------
  async function ldShowPack(p) {
    if (!p) { status('ld-status', 'Model paketi yüklü değil. Kurulum: .forgepack dosyasını bir kez seçin; sonra internet gerekmez.', true); $('ld-go').disabled = true; return; }
    const cfg = LD.config();
    status('ld-status', `Paket: ${cfg.name} · ${fmtMB(p.bytes || 0)} · ${p.saved ? 'cihaza kaydedildi (çevrimdışı)' : 'bu oturumda yüklü (tarayıcı depolamaya izin vermedi)'} · motor başlatılıyor…`);
    try {
      const t0 = performance.now();
      const info = await LD.start({ threads: DEV.isolated ? Math.min(4, DEV.cores || 1) : 1, memSaver: $('ld-memsaver').checked });
      LD.lastPerf = Object.assign(LD.lastPerf || {}, { motorBaşlatmaMs: Math.round(performance.now() - t0), iş_parçacığı: info.threads });
      status('ld-status', `Hazır: ${cfg.name} · ${fmtMB(p.bytes || 0)} · ONNX Runtime WASM (CPU, ${info.threads} iş parçacığı) · başlatma ${Math.round(performance.now() - t0)} ms`);
      $('ld-go').disabled = false;
      const st = await LD.savedState(); $('ld-resume').disabled = !st;
    } catch (e) { status('ld-status', 'Motor başlatılamadı: ' + e.message, true); }
  }
  function ldChips() {
    const cfg = LD.pack ? LD.config() : null, r = LD.promptToCond($('ld-prompt').value, cfg);
    const names = ['yön', 'silah', 'zırh', 'baş', 'pelerin', 'kalkan', 'kumaş', 'metal', 'poz'];
    const vals = cfg ? r.cond.map((v, i) => { const k = cfg.attrKeys[i], vs = cfg.attrValues[k]; return names[i] + ': ' + (k === 'dir' ? F.DIRS[v] : vs ? vs[v] : v); }) : [];
    $('ld-chips').innerHTML = vals.map(v => `<span class="chip">${v}</span>`).join('') + (r.unknown.length ? `<span class="chip warn">anlaşılmayan: ${r.unknown.slice(0, 6).join(', ')}</span>` : '');
    return r;
  }
  function ldBind() {
    $('ld-size').querySelector('option[value="512"]').disabled = !allow512;
    if (!allow512) $('ld-size-note').textContent = 'Bu cihaz ' + DEV.memGB + ' GB bildiriyor: 512 kapalı.';
    $('ld-file').onchange = async e => { const f = e.target.files[0]; if (!f) return; try { status('ld-status', 'Paket okunuyor…'); await ldShowPack(await LD.loadPackFile(f)); } catch (err) { status('ld-status', err.message, true); } };
    $('ld-files').onchange = async e => { if (!e.target.files.length) return; try { await ldShowPack(await LD.loadLoose(e.target.files)); } catch (err) { status('ld-status', err.message, true); } };
    $('ld-url').hidden = !/^https?:/.test(location.protocol);
    $('ld-url').onclick = async () => { try { status('ld-status', 'Paket bu klasörden yükleniyor (yalnızca kurulum)…'); await ldShowPack(await LD.loadFromUrl('yerel-calisma/ForgeMini_Savasci_v1.forgepack')); } catch (err) { status('ld-status', err.message, true); } };
    $('ld-forget').onclick = async () => { await LD.forget(); ldShowPack(null); };
    $('ld-prompt').oninput = ldChips;
    $('ld-go').onclick = () => ldRun(false);
    $('ld-resume').onclick = () => ldRun(true);
    $('ld-cancel').onclick = () => { LD.cancel(); status('ld-status', 'İptal istendi…'); };
    $('ld-save').onclick = () => { $('ld-out').toBlob(b => download(b, 'yerel_ruya_' + (LD.lastSeed || 0) + '.png'), 'image/png'); };
    $('ld-to-forge').onclick = () => { const img = new Image(); img.onload = () => { V11.importImage(img, 'YerelRuya_' + (LD.lastSeed || 0) + '.png', true); status('ld-status', 'Görsel Forge\'a aktarıldı (beyaz arka plan temizlendi). Yukarıdaki önizlemede tek yön olarak görünür.'); }; img.src = $('ld-out').toDataURL('image/png'); };
    $('ld-to-3d').onclick = () => { const img = new Image(); img.onload = () => { V11.importImage(img, 'YerelRuya_' + (LD.lastSeed || 0) + '.png', true); analyzeCurrent(); $('s3-card').scrollIntoView({ behavior: 'smooth' }); }; img.src = $('ld-out').toDataURL('image/png'); };
    LD.onMessage = m => {
      if (m.type === 'progress') {
        const tot = m.total, frac = m.phase === 'decode' ? 0.97 : m.phase === 'hires' ? 0.6 + 0.35 * m.step / tot : (($('ld-size').value === '512' ? 0.6 : 0.95) * m.step / tot);
        $('ld-bar').style.width = (frac * 100).toFixed(1) + '%';
        const el = (performance.now() - LD.t0) / 1000;
        status('ld-status', m.phase === 'decode' ? 'Görüntü çözülüyor (TAESD)…' : `${m.phase === 'hires' ? '512 iyileştirme' : 'Gürültü giderme'} adımı ${m.step}/${tot} · ${el.toFixed(1)} sn`);
      } else if (m.type === 'done') {
        const c = $('ld-out'); c.width = m.width; c.height = m.height; c.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(m.rgba), m.width, m.height), 0, 0);
        $('ld-bar').style.width = '100%'; LD.busy = false; ldButtons();
        LD.lastPerf = Object.assign(LD.lastPerf || {}, { sonÜretim: { boyut: m.width, toplamMs: Math.round(m.totalMs), unetMs: Math.round(m.timings.unetMs), çözücüMs: Math.round(m.timings.decodeMs), unetAdım: m.timings.steps } });
        status('ld-status', `Üretildi: ${m.width}×${m.height} · ${(m.totalMs / 1000).toFixed(1)} sn (UNet ${(m.timings.unetMs / 1000).toFixed(1)} sn, çözücü ${(m.timings.decodeMs / 1000).toFixed(1)} sn) · tamamen bu cihazda`);
        $('ld-result').hidden = false; perfPanel();
      } else if (m.type === 'cancelled') { LD.busy = false; ldButtons(); $('ld-resume').disabled = false; status('ld-status', 'İptal edildi. "Devam et" kaydedilen adımdan sürdürür.'); }
      else if (m.type === 'error') { LD.busy = false; ldButtons(); status('ld-status', 'Hata: ' + m.message, true); }
    };
  }
  function ldButtons() { $('ld-go').disabled = LD.busy || !LD.ready; $('ld-cancel').disabled = !LD.busy; }
  async function ldRun(resume) {
    if (!LD.ready || LD.busy) return;
    const r = ldChips(), seed = $('ld-seed').value === '' ? Math.floor(Math.random() * 1e9) : +$('ld-seed').value;
    LD.lastSeed = seed; LD.busy = true; LD.t0 = performance.now(); ldButtons(); $('ld-bar').style.width = '0%';
    const req = { cond: r.cond, seed, steps: +$('ld-steps').value, guidance: +$('ld-guid').value, size: +$('ld-size').value, coolMs: +$('ld-cool').value };
    try { if (resume) await LD.resume(); else LD.generate(req); } catch (e) { LD.busy = false; ldButtons(); status('ld-status', e.message, true); }
  }

  // ---------------- Başlat ----------------
  function init() {
    buildControls(); bindView(); ldBind(); syncButtons();
    $('s3-analyze').onclick = analyzeCurrent; $('s3-prompt').onclick = fromPrompt;
    $('s3-play').onclick = () => { S3.playing = !S3.playing; syncButtons(); };
    $('s3-bones').onchange = e => { S3.bones = e.target.checked; draw(); };
    $('s3-est').onchange = e => { S3.est = e.target.checked; draw(); };
    $('s3-overlay').onchange = e => { S3.overlay = e.target.checked; if (S3.overlay) { S3.yaw = 0; S3.clip = 'idle'; S3.t = 0; S3.playing = false; syncButtons(); } draw(); };
    $('s3-zip').onclick = () => runSprites(false); $('s3-resume').onclick = async () => { if (!S3.sheets.size) await loadStoredSheets(); runSprites(true); };
    $('s3-cancel').onclick = () => { if (S3.worker) S3.worker.postMessage({ type: 'cancel' }); };
    $('s3-glb').onclick = async () => { status('s3-status', 'GLB üretiliyor…'); const g = await makeGLB(); if (g) { download(new Blob([g], { type: 'model/gltf-binary' }), 'forge_v12_savasci.glb'); await verifyGLBUI(g); status('s3-status', `GLB indirildi (${fmtMB(g.length)}) ve tekrar okunarak doğrulandı.`); perfPanel(); } };
    $('s3-verify-file').onchange = async e => { const f = e.target.files[0]; if (!f) return; const rep = await verifyGLBUI(new Uint8Array(await f.arrayBuffer())); status('s3-status', f.name + ': ' + (rep.ok ? 'geçerli GLB' : 'hatalı GLB'), !rep.ok); };
    $('perf-run').onclick = perfPanel; $('perf-save').onclick = () => { perfPanel(); download(new Blob([$('perf-out').textContent], { type: 'application/json' }), 'forge_v12_cihaz_olcum.json'); };
    // varsayılan: tarif kutusundaki metinle başla (analiz düğmesiyle resme geçilir)
    fromPrompt();
    requestAnimationFrame(loop);
    LD.restore().then(p => ldShowPack(p)).catch(() => ldShowPack(null));
    ldChips(); perfPanel();
    window.ForgeV12 = { S3, LD, DEV, analyzeCurrent, fromPrompt, runSprites, makeGLB, verifyGLBUI, draw };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
