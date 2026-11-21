/* Forge 2.5D V12.1 — kabuk: bölüm menüsü, başlık durumu, bildirimler, hata kaydı, öz-test, otomatik proje kaydı.
   Bölüm değiştirmek hiçbir işlemi durdurmaz: görsel üretimi ve sprite üretimi Web Worker'da sürer. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id), V11 = window.ForgeV11, F = window.Forge3D;
  const TABS = ['uret', 'duzenle', 'model', 'anim', 'aktar', 'ayar'];
  const KEY = 'forge-v121-proje';
  let current = null, bootAt = performance.now();

  // ---------------- Hata kaydı ----------------
  const ERR = [];
  function logErr(msg) {
    const t = new Date().toLocaleTimeString('tr-TR'); ERR.unshift(t + ' · ' + String(msg).slice(0, 400)); if (ERR.length > 60) ERR.pop();
    const ul = $('err-log'); if (ul) { ul.innerHTML = ERR.map(e => `<li>${e.replace(/[&<]/g, c => c === '&' ? '&amp;' : '&lt;')}</li>`).join(''); $('err-count').textContent = ERR.length; $('err-dot').hidden = !ERR.length; }
  }
  window.addEventListener('error', e => logErr('Hata: ' + (e.message || e.type) + (e.filename ? ' (' + e.filename.split('/').pop() + ':' + e.lineno + ')' : '')));
  window.addEventListener('unhandledrejection', e => logErr('Söz hatası: ' + ((e.reason && e.reason.message) || e.reason)));
  const ce = console.error.bind(console); console.error = (...a) => { logErr(a.map(String).join(' ')); ce(...a); };

  // ---------------- Bölüm geçişi ----------------
  function go(tab, noScroll) {
    if (!TABS.includes(tab)) tab = 'uret';
    current = tab;
    for (const t of TABS) { const p = $('tab-' + t); p.hidden = t !== tab; }
    document.querySelectorAll('.tab-btn').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === tab)));
    $('hdr-section').textContent = $('tab-' + tab).dataset.title;
    // Paylaşılan 3B önizleme: 3D Model veya Animasyon (3B görünüm) bölümüne taşınır
    const pv = $('pv3d');
    if (tab === 'model') $('pv3d-host-model').appendChild(pv);
    else if (tab === 'anim') $('pv3d-host-anim').appendChild(pv);
    else $('pv3d-host-model').appendChild(pv); // gizli bölümde bekler
    if (tab === 'anim') applyAnimView();
    if (tab === 'duzenle' && window.ForgeEditor) window.ForgeEditor.refresh();
    if (tab === 'ayar' && window.ForgeV12) { /* bilgi panelleri güncel kalsın */ }
    if (window.ForgeV12) { window.ForgeV12.syncButtons(); if (tab === 'model' || tab === 'anim') window.ForgeV12.draw(); }
    try { localStorage.setItem(KEY + ':tab', tab); } catch (e) { }
    if (!noScroll) window.scrollTo({ top: 0 });
  }
  function applyAnimView() {
    const S3 = window.ForgeV12.S3, two = S3.animView === '2d';
    $('pv2d').hidden = !two; $('pv3d-host-anim').hidden = two;
    document.querySelectorAll('#an-viewer .seg-b').forEach(b => { const on = b.dataset.view === S3.animView; b.classList.toggle('active', on); b.setAttribute('aria-checked', String(on)); });
    window.ForgeV12.syncButtons();
  }

  // ---------------- Bildirim (görünmeyen bölümlerden gelen sonuç/hata) ----------------
  let toastTimer = 0, lastToast = 0;
  function toast(msg, err) {
    const t = $('toast'); t.textContent = msg; t.classList.toggle('err', !!err); t.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, err ? 6000 : 3500);
  }
  function watchStatus(id) {
    const el = $(id); if (!el) return;
    new MutationObserver(() => {
      const msg = el.textContent.trim(); if (!msg) return;
      const err = el.dataset.err === '1' || (el.id === 'status' && /rgb\(255, 180, 158\)|#ffb49e/i.test(el.getAttribute('style') || ''));
      if (err) logErr($(id).closest('.page') ? $(id).closest('.page').dataset.title + ': ' + msg : msg);
      if (performance.now() - bootAt < 2500) return;               // açılış mesajlarını gösterme
      if (el.offsetParent !== null) return;                          // zaten ekranda
      const now = performance.now(), final = /Hazır|Üretildi|indirildi|İptal|Hata|hata|tamam|aktarıldı|oluşturuldu/.test(msg);
      if (final || err || now - lastToast > 2500) { lastToast = now; toast(msg, err); }
    }).observe(el, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ['style'] });
  }

  // ---------------- Başlık: proje ve arka plan işi durumu ----------------
  let savedAt = null;
  function header() {
    if (!window.ForgeV12 || !V11.ready) return;
    const S3 = window.ForgeV12.S3, LD = window.ForgeLocalDream, st = V11.state;
    const img = st.custom ? `görsel: “${st.customFileName || 'adsız'}”` : `görsel: hazır savaşçı (${st.palette})`;
    const m3 = S3.viewer === 'glb' ? '3D: GLB izleniyor' : `3D: ${S3.srcKind === 'resim' ? 'resimden' : 'tariften'}`;
    const pk = LD.pack ? (LD.ready ? 'model: hazır' : 'model: cihazda') : 'model: yok';
    $('hdr-proj').textContent = `${img} · ${m3} · ${pk}${savedAt ? ' · kaydedildi ' + savedAt : ''}`;
    const bg = [S3.busy && S3.progress ? '● ' + S3.progress + ' sürüyor' : S3.busy ? '● Sprite üretimi sürüyor' : '', LD.busy ? '● ' + (S3.ldProgress || 'Görsel üretimi') + ' sürüyor' : ''].filter(Boolean).join('   ');
    $('hdr-bg').hidden = !bg; $('hdr-bg').textContent = bg + (bg ? ' — bölüm değiştirmek durdurmaz' : '');
  }

  // ---------------- Otomatik proje kaydı ----------------
  let saveTimer = 0, imgDirty = false;
  function scheduleSave(e) { if (e && e.detail && e.detail.image) imgDirty = true; clearTimeout(saveTimer); saveTimer = setTimeout(save, 1200); }
  async function save() {
    const S3 = window.ForgeV12.S3;
    const data = { v: 1, prompt: $('prompt').value, src: S3.src, srcKind: S3.srcKind, srcLabel: S3.srcLabel, notes: S3.notes, uretMode: document.querySelector('#uret-mode .active').dataset.mode, animView: S3.animView,
      ld: { seed: $('ld-seed').value, steps: $('ld-steps').value, guid: $('ld-guid').value, size: $('ld-size').value, cool: $('ld-cool').value, memSaver: $('ld-memsaver').checked }, s3cool: $('s3-cool').value };
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { return; }
    if (imgDirty || V11.state.custom) {
      imgDirty = false;
      try {
        if (V11.state.custom) { const c = window.ForgeV12.toCanvas(V11.sourceCanvas(0)); await window.ForgeLocalDream.kvSet('proje-gorsel', { name: V11.state.customFileName, url: c.toDataURL('image/png') }); }
        else await window.ForgeLocalDream.kvDel('proje-gorsel');
      } catch (e) { }
    }
    savedAt = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }); header();
  }
  async function restore() {
    let d = null; try { d = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { }
    const U = window.ForgeV12;
    if (d) {
      if (typeof d.prompt === 'string') $('prompt').value = d.prompt;
      if (d.ld) { $('ld-seed').value = d.ld.seed || ''; $('ld-steps').value = d.ld.steps || '20'; $('ld-guid').value = d.ld.guid || '2'; $('ld-size').value = d.ld.size || '256'; $('ld-cool').value = d.ld.cool || '40'; $('ld-memsaver').checked = !!d.ld.memSaver; }
      if (d.s3cool) $('s3-cool').value = d.s3cool;
      if (d.uretMode) setMode(d.uretMode);
      if (d.animView) U.S3.animView = d.animView;
      U.ldChips();
    }
    // yüklenen/düzenlenen görsel
    try {
      const g = await window.ForgeLocalDream.kvGet('proje-gorsel');
      if (g && g.url) { const img = new Image(); await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = g.url; }); const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight; c.getContext('2d').drawImage(img, 0, 0); V11.setCustomCanvas(c, g.name || 'kayitli.png'); }
    } catch (e) { }
    if (d && d.src && d.src.body) U.setSource({ body: d.src.body, palette: d.src.palette, style: d.src.style }, d.notes || ['Kayıtlı projeden geri yüklendi.'], d.srcKind === 'resim' ? U.toCanvas(V11.sourceCanvas(0)) : null, d.srcKind, d.srcLabel || '');
    if (window.ForgeEditor) window.ForgeEditor.refresh(true);
    U.drawPreset(); U.syncButtons(); header();
    if (d) savedAt = 'önceki oturum';
  }
  function setMode(mode) {
    document.querySelectorAll('#uret-mode .seg-b').forEach(b => { const on = b.dataset.mode === mode; b.classList.toggle('active', on); b.setAttribute('aria-checked', String(on)); });
    document.querySelectorAll('#tab-uret .mode-ai').forEach(e => { e.hidden = mode !== 'ai'; });
    document.querySelectorAll('#tab-uret .mode-hazir').forEach(e => { e.hidden = mode !== 'hazir'; });
    if (mode === 'hazir' && window.ForgeV12) window.ForgeV12.drawPreset();
  }

  // ---------------- Öz-test (uygulama içinde, gerçek hesaplama) ----------------
  async function selfTest() {
    const out = $('st-out'); out.innerHTML = '<li>Çalışıyor…</li>'; await new Promise(r => setTimeout(r, 30));
    const rows = [], add = (ok, txt) => rows.push(`<li class="${ok ? 'ok' : 'bad'}">${ok ? '✓' : '✗'} ${txt}</li>`), t0 = performance.now();
    try {
      const ch = F.createCharacter({}); add(ch.mesh.vertexCount > 1000 && ch.skel.bones.length === 26, `3B mesh: ${ch.mesh.vertexCount} vertex, ${ch.skel.bones.length} kemik`);
      // yürüyüşte basan ayak kayması
      const J = ch.skel.index; let slip = 0;
      for (const side of ['L', 'R']) { let a = null; for (let i = 0; i <= 64; i++) { const t = i / 64, r = F.sampleClip(ch.skel, 'walk', t % 1), W = F.poseWorld(ch.skel, r.pose), p = W.wpos[J['foot.' + side]], z = p[2] + F.WALK.stride * t; if (r.contacts[side]) { if (!a) a = [p[0], z]; slip = Math.max(slip, Math.hypot(p[0] - a[0], z - a[1])); } else a = null; } }
      add(slip < 0.002, `Yürüyüşte ayak kayması ${(slip * 1000).toFixed(2)} mm`);
      let minY = 1e9; for (const clip of F.CLIP_KEYS) for (let i = 0; i < 8; i++) { const { skinned } = F.poseSkin(ch, clip, F.frameTime(clip, i, 8)); for (let v = 1; v < skinned.pos.length; v += 3) minY = Math.min(minY, skinned.pos[v]); }
      add(minY > -0.012, `5 hareket × 8 karede zemine girme yok (en düşük ${(minY * 100).toFixed(2)} cm)`);
      const glb = F.exportGLB(ch.skel, ch.mesh, {}), rep = F.verifyGLB(glb);
      add(rep.ok && Object.keys(rep.stats.animations).length === 5, `GLB yaz + oku: ${rep.ok ? 'geçerli' : rep.errors.join('; ')} (${(glb.length / 1024).toFixed(0)} KB, 5 animasyon)`);
      ch.framing = F.computeFraming(ch); const sh = F.renderSheet(ch, 'idle', 0, { ss: 1 }), rows8 = F.footRows(sh, 256);
      add(Math.max(...rows8) - Math.min(...rows8) <= 1, `Sprite sayfası 1024×512, ayak satırı sabit (${rows8[0]})`);
      const png = await F.encodePNGAsync(sh.rgba, sh.width, sh.height), zip = F.makeZipBytes([{ name: 'a.png', data: png }]), back = F.readZip(zip);
      add(back.length === 1 && back[0].crcOk, `PNG + ZIP yaz/oku, CRC ${back[0].crcOk ? 'tamam' : 'HATALI'}`);
      const LD = window.ForgeLocalDream; add(true, `Görsel modeli: ${LD.pack ? (LD.config() || {}).name + (LD.ready ? ' (motor çalışıyor)' : ' (cihazda kayıtlı)') : 'yüklü değil — Görsel Üret bölümünden seçin'}`);
      add(!!V11.ready, `V11.2 çekirdeği: ${V11.ready ? 'hazır' : 'yüklenmedi'} · çalışma görseli ${V11.state.custom ? 'yüklenen' : 'hazır savaşçı'}`);
    } catch (e) { add(false, 'Öz-test hatası: ' + e.message); logErr('Öz-test: ' + e.message); }
    rows.push(`<li>Süre: ${(performance.now() - t0).toFixed(0)} ms (bu cihaz)</li>`);
    out.innerHTML = rows.join('');
    return rows;
  }

  function init() {
    document.querySelectorAll('.tab-btn').forEach(b => { b.onclick = () => go(b.dataset.tab); });
    document.querySelectorAll('[data-go]').forEach(b => { b.onclick = () => go(b.dataset.go); });
    document.querySelectorAll('#uret-mode .seg-b').forEach(b => { b.onclick = () => { setMode(b.dataset.mode); scheduleSave(); }; });
    document.querySelectorAll('#an-viewer .seg-b').forEach(b => { b.onclick = () => { window.ForgeV12.S3.animView = b.dataset.view; applyAnimView(); scheduleSave(); }; });
    ['status', 'ld-status', 's3-status', 'ed-status', 'x-status'].forEach(watchStatus);
    $('toast').onclick = () => { $('toast').hidden = true; };
    $('err-clear').onclick = () => { ERR.length = 0; logErr('Kayıtlar temizlendi'); ERR.length = 0; $('err-log').innerHTML = ''; $('err-count').textContent = '0'; $('err-dot').hidden = true; };
    $('st-run').onclick = selfTest;
    $('proj-reset').onclick = async () => { try { localStorage.removeItem(KEY); localStorage.removeItem(KEY + ':tab'); await window.ForgeLocalDream.kvDel('proje-gorsel'); } catch (e) { } location.reload(); };
    document.addEventListener('forge:changed', scheduleSave);
    ['ld-seed', 'ld-steps', 'ld-guid', 'ld-size', 'ld-cool', 'ld-memsaver', 's3-cool'].forEach(id => $(id).addEventListener('change', () => scheduleSave()));
    let tab = 'uret'; try { tab = localStorage.getItem(KEY + ':tab') || 'uret'; } catch (e) { }
    setMode('ai'); go(tab, true);
    const wait = () => { if (V11.ready && window.ForgeV12) { restore().then(() => { if (current === 'anim') applyAnimView(); }); } else setTimeout(wait, 100); }; wait();
    setInterval(header, 1000);
    window.ForgeShell = { go, toast, selfTest, logErr, setMode, save, get current() { return current; } };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
