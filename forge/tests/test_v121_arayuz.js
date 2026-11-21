// Forge 2.5D V12.1 (düzenli arayüz) — zorunlu test listesi. Chromium, file://, AĞ KAPALI, telefon görünümü.
// 1 menüler · 2 bütün düğmeler (görünürlük, boyut, yazı kesilmesi, olay bağlantısı) · 3 PNG yükleme + düzenleme araçları
// 4 model paketi · 5 gerçek modelle görsel üretimi · 6 3D oluşturma · 7 anatomi · 8 animasyon/kare/yön
// 9 PNG/ZIP/GLB çıktıları + bağımsız denetim · 10 üç ekran boyutunda yerleşim (taşma, çakışma, kesilme) + ekran görüntüleri
// Ek: sekme değiştirince işlemlerin sürmesi, otomatik proje kaydının geri gelmesi.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const { load, deflate } = require('./load.js'); const F = load();
const ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'ciktilar'), SHOT = path.join(OUT, 'ekran_v121'), TMP = path.join('/tmp', 'v121test');
fs.mkdirSync(SHOT, { recursive: true }); fs.mkdirSync(TMP, { recursive: true });
const HTML = 'file://' + path.join(ROOT, 'Forge_25D_V12_1_Duzenli.html');
const PACK = process.argv.find(a => a.startsWith('--pack=')) ? process.argv.find(a => a.startsWith('--pack=')).split('=')[1] : path.join(ROOT, 'yerel-calisma', 'ForgeMini_Savasci_v1.forgepack');
const R = { file: path.basename(HTML), startedAt: new Date().toISOString(), checks: [], layout: {}, buttons: {}, timings: {} };
const ok = (c, m, d) => { R.checks.push({ ok: !!c, check: m, ...(d !== undefined ? { detail: d } : {}) }); console.log((c ? '  ✓ ' : '  ✗ ') + m + (d !== undefined ? ' — ' + JSON.stringify(d).slice(0, 220) : '')); };
const TABS = ['uret', 'duzenle', 'model', 'anim', 'aktar', 'ayar'];

// Opak, renkli zeminli bir test PNG'si (arka plan kaldırma aracını sınamak için)
function makeInput() {
  const ch = F.createCharacter({ style: { weapon: 'axe', cape: true } }), { skinned } = F.poseSkin(ch, 'idle', 0);
  const r = F.render(ch.mesh, skinned, { width: 384, height: 512, yaw: 0, pitch: 0.1, scale: 240, cx: 192, cy: 490, ss: 2, bg: [70, 120, 90] });
  const p = path.join(TMP, 'yesil_zeminli_karakter.png'); fs.writeFileSync(p, F.encodePNG(new Uint8ClampedArray(r.rgba), 384, 512, deflate)); return p;
}
async function go(page, tab) { await page.click(`.tab-btn[data-tab="${tab}"]`); await page.waitForTimeout(120); }
async function alphaStats(page) { return page.evaluate(() => { const s = ForgeV11.sourceCanvas(0), c = document.createElement('canvas'); c.width = s.naturalWidth || s.width; c.height = s.naturalHeight || s.height; const x = c.getContext('2d'); x.drawImage(s, 0, 0); const d = x.getImageData(0, 0, c.width, c.height).data; let t = 0; for (let i = 3; i < d.length; i += 4) if (d[i] < 16) t++; return { w: c.width, h: c.height, transparent: t, custom: ForgeV11.state.custom }; }); }

// Her bölümde görünen bütün düğmeleri denetle
async function auditButtons(page, cdp, tab, vp) {
  await page.evaluate(() => document.querySelectorAll('.page:not([hidden]) details.acc').forEach(d => { d.open = true; }));
  await page.waitForTimeout(60);
  const list = await page.evaluate(() => {
    const vis = e => e.offsetParent !== null && getComputedStyle(e).visibility !== 'hidden';
    document.querySelectorAll('[data-audit-id]').forEach(e => e.removeAttribute('data-audit-id'));
    const els = [...document.querySelectorAll('.page:not([hidden]) button, .page:not([hidden]) .filebtn, .page:not([hidden]) summary, .page:not([hidden]) select, .page:not([hidden]) .toggles label, .page:not([hidden]) .chk, .tab-btn')].filter(vis);
    return els.map((e, i) => { e.dataset.auditId = 'a' + i; const r = e.getBoundingClientRect(), t = (e.innerText || e.getAttribute('aria-label') || '').trim();
      const cs = getComputedStyle(e), clipped = ((e.scrollWidth > e.clientWidth + 1 || e.scrollHeight > e.clientHeight + 2) && cs.overflow !== 'visible');
      // kelime bölünmesi: en uzun sözcük içerik genişliğine sığmıyorsa sözcük ortadan kırılır
      const mc = (window.__mc || (window.__mc = document.createElement('canvas').getContext('2d'))); mc.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const inner = e.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight), longest = Math.max(0, ...t.split(/\s+/).map(w => mc.measureText(w).width));
      const wordBreak = e.tagName !== 'SUMMARY' && longest > inner + 1;
      return { k: 'a' + i, tag: e.tagName, id: e.id || (e.dataset.tab ? 'tab:' + e.dataset.tab : e.dataset.tool ? 'tool:' + e.dataset.tool : e.dataset.clip ? 'clip:' + e.dataset.clip : e.dataset.d ? 'dir:' + e.dataset.d : e.dataset.mode ? 'mode:' + e.dataset.mode : e.dataset.view ? 'view:' + e.dataset.view : e.dataset.go ? 'go:' + e.dataset.go : (e.querySelector('input') || {}).id || t.slice(0, 20)),
        text: t.slice(0, 40), w: Math.round(r.width), h: Math.round(r.height), clipped: clipped || wordBreak, wordBreak, x: r.left, y: r.top, disabled: !!e.disabled }; });
  });
  const res = [];
  for (const b of list) {
    let bound = true;
    if (b.tag === 'BUTTON') {
      const { result } = await cdp.send('Runtime.evaluate', { expression: `document.querySelector('[data-audit-id="${b.k}"]')` });
      const { listeners } = await cdp.send('DOMDebugger.getEventListeners', { objectId: result.objectId });
      const prop = await page.evaluate(k => !!document.querySelector(`[data-audit-id="${k}"]`).onclick, b.k);
      bound = prop || listeners.some(l => l.type === 'click');
    }
    res.push(Object.assign(b, { bound, smallTouch: b.h < 40 && b.tag !== 'SUMMARY' }));
  }
  return res;
}
// Yerleşim: yatay taşma, kardeş öğelerin çakışması, sayfanın menünün altında kalmaması
async function auditLayout(page) {
  return page.evaluate(() => {
    const overflowX = document.documentElement.scrollWidth - innerWidth;
    const overlaps = [];
    document.querySelectorAll('.page:not([hidden]) .row, .page:not([hidden]) .export, .page:not([hidden]) .tools, .page:not([hidden]) .actions, .page:not([hidden]) .directions, .page:not([hidden]) .grid2, .page:not([hidden]) .s3-styles, .page:not([hidden]) .frame-ctl, .tabs').forEach(g => {
      const kids = [...g.children].filter(e => e.offsetParent !== null).map(e => [e, e.getBoundingClientRect()]);
      for (let i = 0; i < kids.length; i++) for (let j = i + 1; j < kids.length; j++) { const a = kids[i][1], b = kids[j][1]; const ix = Math.min(a.right, b.right) - Math.max(a.left, b.left), iy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ix > 1 && iy > 1) overlaps.push((g.id || g.className) + ': ' + (kids[i][0].id || kids[i][0].textContent.trim().slice(0, 12)) + ' × ' + (kids[j][0].id || kids[j][0].textContent.trim().slice(0, 12))); }
    });
    const textClip = [...document.querySelectorAll('.page:not([hidden]) .label, .page:not([hidden]) h2, .page:not([hidden]) h3, .page:not([hidden]) .lead, .tb-where, .tab-btn .tl')].filter(e => e.offsetParent !== null && e.scrollWidth > e.clientWidth + 1).map(e => e.textContent.trim().slice(0, 30));
    const nav = document.querySelector('.tabs').getBoundingClientRect(), app = document.getElementById('app'), pb = parseFloat(getComputedStyle(app).paddingBottom), pl = parseFloat(getComputedStyle(app).paddingLeft);
    const navClear = nav.width >= innerWidth - 2 ? pb >= nav.height - 2 : pl >= nav.width;
    return { overflowX, overlaps, textClip, navClear, nav: { w: Math.round(nav.width), h: Math.round(nav.height) } };
  });
}

(async () => {
  const input = makeInput();
  const browser = await chromium.launch();
  // ---------------- 10) Üç ekran boyutunda yerleşim ----------------
  for (const [w, h] of [[360, 740], [740, 360], [667, 375]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true, offline: true });
    const page = await ctx.newPage(), cdp = await ctx.newCDPSession(page); const errs = []; page.on('pageerror', e => errs.push(e.message));
    await page.goto(HTML); await page.waitForFunction(() => window.ForgeV11 && ForgeV11.ready && window.ForgeShell, null, { timeout: 60000 }); await page.waitForTimeout(500);
    const key = w + 'x' + h; R.layout[key] = {}; R.buttons[key] = {};
    for (const t of TABS) {
      await go(page, t);
      if (t === 'anim') { await page.click('#an-viewer [data-view="3d"]'); }
      await page.screenshot({ path: path.join(SHOT, `${key}_${t}.png`) });
      const L = await auditLayout(page), B = await auditButtons(page, cdp, t, key);
      await page.screenshot({ path: path.join(SHOT, `${key}_${t}_paneller_acik.png`), fullPage: true });
      await page.evaluate(() => document.querySelectorAll('details.acc').forEach(d => { d.open = false; }));
      R.layout[key][t] = L; R.buttons[key][t] = B.map(b => ({ id: b.id, text: b.text, w: b.w, h: b.h, clipped: b.clipped, bound: b.bound, smallTouch: b.smallTouch, disabled: b.disabled }));
      const bad = B.filter(b => b.clipped || !b.bound || b.smallTouch);
      ok(L.overflowX <= 0 && !L.overlaps.length && !L.textClip.length && L.navClear && !bad.length, `${key} · ${t}: taşma yok, çakışma yok, yazı kesilmiyor, ${B.length} denetim öğesi bağlı ve ≥40 px`,
        bad.length || L.overlaps.length || L.textClip.length || L.overflowX > 0 ? { overflowX: L.overflowX, overlaps: L.overlaps.slice(0, 4), textClip: L.textClip, bad: bad.slice(0, 6).map(b => [b.id, b.text, b.w + 'x' + b.h, b.clipped ? 'kesik' : '', b.bound ? '' : 'BAĞSIZ', b.smallTouch ? 'küçük' : '']) } : undefined);
    }
    if (key !== '360x740') { ok(!errs.length, `${key}: sayfa hatası yok`, errs); await ctx.close(); continue; }

    // ---------------- İşlev testleri (360x740) ----------------
    console.log('İşlev testleri (360×740):');
    // 3) PNG yükleme + düzenleme araçları
    await go(page, 'duzenle');
    await page.uncheck('#removeBg'); await page.setInputFiles('#importFile', input); await page.waitForTimeout(700);
    let a0 = await alphaStats(page); ok(a0.custom && a0.w === 384, 'PNG yüklendi (çalışma görseli oldu)', a0);
    await page.click('[data-tool="bg"]'); await page.click('#ed-bg-run'); await page.waitForTimeout(200);
    let a1 = await alphaStats(page); ok(a1.transparent > a0.transparent + 20000, 'Arka plan kaldırma: yeşil zemin saydam oldu', { önce: a0.transparent, sonra: a1.transparent });
    await page.click('#ed-undo'); await page.waitForTimeout(150); let a2 = await alphaStats(page); ok(a2.transparent === a0.transparent, 'Geri al: önceki hale döndü', a2.transparent);
    await page.click('#ed-bg-run'); await page.waitForTimeout(150);
    await page.click('[data-tool="pick"]'); await page.locator('#ed-canvas').scrollIntoViewIfNeeded(); let box = await page.locator('#ed-canvas').boundingBox();
    const a3 = await alphaStats(page); await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.42); await page.waitForTimeout(200);
    const a4 = await alphaStats(page); ok(a4.transparent > a3.transparent, 'Renge dokunarak saydam yapma çalıştı', { önce: a3.transparent, sonra: a4.transparent }); await page.click('#ed-undo');
    await page.click('[data-tool="erase"]'); await page.locator('#ed-canvas').scrollIntoViewIfNeeded(); box = await page.locator('#ed-canvas').boundingBox(); const a5 = await alphaStats(page);
    await page.mouse.move(box.x + box.width * 0.4, box.y + box.height * 0.3); await page.mouse.down(); await page.mouse.move(box.x + box.width * 0.6, box.y + box.height * 0.35, { steps: 8 }); await page.mouse.up(); await page.waitForTimeout(150);
    const a6 = await alphaStats(page); ok(a6.transparent > a5.transparent, 'Silgi çalıştı', { önce: a5.transparent, sonra: a6.transparent }); await page.click('#ed-undo');
    await page.click('[data-tool="crop"]'); await page.locator('#ed-canvas').scrollIntoViewIfNeeded(); box = await page.locator('#ed-canvas').boundingBox(); await page.mouse.move(box.x + box.width * 0.15, box.y + box.height * 0.05); await page.mouse.down(); await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.98, { steps: 6 }); await page.mouse.up();
    ok(!(await page.isDisabled('#ed-crop-run')), 'Kırpma alanı çizildi'); await page.click('#ed-crop-run'); await page.waitForTimeout(150);
    const a7 = await alphaStats(page); ok(a7.w === 384 && a7.h === 512, 'Seçimi kırp: sonuç 384×512 çerçevede', a7); await page.click('#ed-autocrop'); await page.waitForTimeout(150); ok(true, 'Otomatik kırp çalıştı', await page.textContent('#ed-status'));
    await page.click('[data-tool="color"]'); await page.evaluate(() => { const i = document.getElementById('ed-hue'); i.value = 90; i.dispatchEvent(new Event('input')); }); await page.click('#ed-color-apply'); await page.waitForTimeout(150);
    ok(/Renk uygulandı/.test(await page.textContent('#ed-status')), 'Renk (ton) uygulandı', await page.textContent('#ed-status'));
    await page.click('#ed-compare'); ok(/ÖNCE/.test(await page.textContent('#ed-status')), 'Önce/Sonra karşılaştırma açıldı'); await page.screenshot({ path: path.join(SHOT, '360x740_duzenle_once_sonra.png') }); await page.click('#ed-compare');
    // 6) 3D oluştur (düzenlenen görselden) + 7) anatomi
    await go(page, 'model'); await page.click('#s3-analyze'); await page.waitForTimeout(300);
    ok(/Resim/.test(await page.textContent('#s3-srcline')), '3D: çalışma görselinden oluşturuldu', await page.textContent('#s3-srcline'));
    await page.click('#s3-prompt'); await page.waitForTimeout(200); ok(/Tarif/.test(await page.textContent('#s3-srcline')), '3D: tariften oluşturuldu');
    await page.evaluate(() => { document.querySelectorAll('details.acc').forEach(d => d.open = true); const i = document.querySelector('[data-body="bulk"]'); i.value = 1.2; i.dispatchEvent(new Event('input', { bubbles: true })); });
    ok(await page.evaluate(() => ForgeV12.S3.ch.params.body.bulk === 1.2), 'Anatomi: irilik 1.2 uygulandı');
    await page.selectOption('select[data-style="weapon"]', 'axe'); ok(await page.evaluate(() => ForgeV12.S3.ch.params.style.weapon === 'axe'), 'Donanım: silah baltaya çevrildi');
    await page.screenshot({ path: path.join(SHOT, '360x740_model_paneller.png'), fullPage: true });
    // 8) Animasyon
    await go(page, 'anim'); await page.click('#an-clips [data-clip="walk"]'); await page.click('#an-dirs [data-d="2"]');
    let st = await page.evaluate(() => ({ clip: ForgeV12.S3.clip, dir: ForgeV12.S3.dir, v11dir: ForgeV11.state.direction, v11act: ForgeV11.state.action, custom: ForgeV11.state.custom }));
    ok(st.clip === 'walk' && st.dir === 2 && st.v11act === 'walk', 'Tek denetim: hareket + yön hem 3B hem 2B (V11.2) durumunu değiştirdi', st);
    await page.click('#an-play'); const p1 = await page.evaluate(() => ForgeV12.S3.playing), f0 = await page.evaluate(() => ForgeV12.S3.frameIdx); await page.click('#an-next'); await page.click('#an-next');
    const fr = await page.evaluate(() => ForgeV12.S3.frameIdx); ok(p1 === false && fr === (f0 + 2) % 8, `Durdur + 2 kare ileri (${f0 + 1} → ${fr + 1})`, { playing: p1 });
    await page.evaluate(() => { const i = document.getElementById('an-frame'); i.value = 6; i.dispatchEvent(new Event('input')); }); ok((await page.evaluate(() => ForgeV12.S3.frameIdx)) === 5 && /6 \/ 8/.test(await page.textContent('#an-frame-lbl')), 'Kare kaydırıcısı: kare 6/8');
    await page.click('#an-viewer [data-view="2d"]'); await page.waitForTimeout(150);
    ok(await page.isVisible('#stage') && !(await page.isVisible('#s3-view')), '2B görünüme geçildi (V11.2 önizlemesi, iskelet yok)', await page.textContent('#pv2d .pv-label'));
    await page.evaluate(() => document.getElementById('returnWarrior').click()); await page.click('#an-dirs [data-d="3"]');
    st = await page.evaluate(() => ({ v11dir: ForgeV11.state.direction, custom: ForgeV11.state.custom })); ok(st.v11dir === 3 && !st.custom, 'Hazır savaşçıda 2B yön değişti (Arka-sağ)', st);
    await page.screenshot({ path: path.join(SHOT, '360x740_anim_2b.png') });
    await page.click('#an-viewer [data-view="3d"]'); await page.click('#an-play');
    // 4) + 5) Model paketi ve gerçek üretim; üretim sürerken bölüm değiştirmek iptal etmez
    await go(page, 'uret');
    ok(/Model paketi yok/.test(await page.textContent('#ld-status')), 'Paket yokken açık bilgi gösterildi', await page.textContent('#ld-status'));
    let t0 = Date.now(); await page.setInputFiles('#ld-file', PACK);
    await page.waitForFunction(() => /Hazır:|başlatılamadı/.test(document.getElementById('ld-status').textContent), null, { timeout: 300000 });
    ok(/Hazır:/.test(await page.textContent('#ld-status')), `Model paketi yüklendi, motor başladı (${Date.now() - t0} ms)`, await page.textContent('#ld-status'));
    await page.fill('#prompt', 'Mor pelerinli kalkanlı kılıçlı savaşçı, önden'); await page.dispatchEvent('#prompt', 'input');
    await page.evaluate(() => { document.querySelector('#tab-uret details.acc').open = true; }); await page.fill('#ld-seed', '7'); await page.selectOption('#ld-steps', '20');
    t0 = Date.now(); await page.click('#ld-go');
    await page.waitForFunction(() => /adımı [3-9]/.test(document.getElementById('ld-status').textContent), null, { timeout: 120000 });
    await go(page, 'aktar'); await page.waitForTimeout(150); await go(page, 'ayar');
    const hdr = await page.textContent('#hdr-bg'); await page.waitForFunction(() => /Üretildi|Hata/.test(document.getElementById('ld-status').textContent), null, { timeout: 600000 });
    ok(/Üretildi/.test(await page.textContent('#ld-status')), `Gerçek modelle cihazda görsel üretildi; üretim sırasında bölüm değiştirildi, durmadı (${Date.now() - t0} ms)`, { başlıkta: hdr });
    await go(page, 'uret'); await page.locator('#ld-out').screenshot({ path: path.join(SHOT, 'yerel_ruya_v121.png') });
    await page.click('#ld-to-3d'); await page.waitForTimeout(400);
    ok(await page.evaluate(() => ForgeShell.current === 'model' && ForgeV11.state.custom && ForgeV12.S3.srcKind === 'resim'), 'Üretilen görsel → karakter → 3D (akış kaybolmadan sürdü)');
    // 9) Dışa aktarma
    await go(page, 'aktar');
    const dl = async (sel, name) => { const p = page.waitForEvent('download', { timeout: 600000 }); await page.click(sel); const d = await p; const f = path.join(TMP, name || d.suggestedFilename()); await d.saveAs(f); return f; };
    const pngLd = await dl('#ld-save'); ok(/PNG image data/.test(execSync(`file "${pngLd}"`).toString()), 'Üretilen görsel PNG indirildi', path.basename(pngLd));
    const pngEd = await dl('#ed-save'); ok(/PNG image data, 384 x 512/.test(execSync(`file "${pngEd}"`).toString()), 'Çalışma görseli PNG indirildi (384×512)', execSync(`file -b "${pngEd}"`).toString().trim());
    const one = await dl('#one'); ok(/PNG image data/.test(execSync(`file "${one}"`).toString()), 'V11.2: seçili yön PNG');
    const atlas = await dl('#atlas'); ok(/PNG image data/.test(execSync(`file "${atlas}"`).toString()), 'V11.2: atlas PNG', execSync(`file -b "${atlas}"`).toString().trim());
    const recipe = await dl('#recipe'); ok(JSON.parse(fs.readFileSync(recipe, 'utf8')).framesPerAction === 8, 'V11.2: tarif JSON');
    // 2B ZIP yalnızca hazır savaşçıda; çalışma görseli yüklenen olduğu için düğme kapalı olmalı (V11.2 kuralı)
    ok(await page.isDisabled('#all'), 'V11.2 kuralı korundu: yüklenen tek yönlü görselde 8 yön ZIP kapalı');
    await page.evaluate(() => document.getElementById('returnWarrior').click()); await page.waitForTimeout(100);
    const v11zip = await dl('#all'); const zc = execSync(`python3 -c "import zipfile;z=zipfile.ZipFile('${v11zip}');print(len(z.namelist()), z.testzip())"`).toString().trim();
    ok(zc === '41 None', 'V11.2: 8 yön × 5 hareket ZIP (41 dosya, CRC tamam)', zc);
    await go(page, 'model'); await page.click('#s3-prompt'); await go(page, 'aktar');
    t0 = Date.now(); const zp = page.waitForEvent('download', { timeout: 900000 }); await page.click('#s3-zip');
    await page.waitForFunction(() => ForgeV12.S3.sheets.size >= 4, null, { timeout: 300000 }); await go(page, 'anim'); await page.waitForTimeout(300); await go(page, 'duzenle');
    const zd = await zp; const zf = path.join(TMP, 'v121_sprite_40.zip'); await zd.saveAs(zf); R.timings.sprites40Ms = Date.now() - t0;
    const zt = execSync(`python3 ${path.join(__dirname, 'test_zip.py')} ${zf} ${path.join(TMP, 'zip.json')}`).toString();
    ok(/ZIP testi geçti/.test(zt), `40 sprite + GLB ZIP: bölüm değiştirilirken üretim sürdü, bağımsız denetim geçti (${R.timings.sprites40Ms} ms)`);
    await go(page, 'aktar'); const glb = await dl('#s3-glb'); await page.waitForTimeout(300);
    ok(/GLB DOĞRULANDI/.test(await page.textContent('#s3-verify-out')), 'GLB indirildi ve uygulamada yeniden okunarak doğrulandı');
    const kv = execSync(`node -e "require('gltf-validator').validateBytes(new Uint8Array(require('fs').readFileSync('${glb}'))).then(r=>console.log(r.issues.numErrors, r.issues.numWarnings))"`, { cwd: __dirname }).toString().trim();
    ok(kv === '0 0', 'GLB Khronos glTF-Validator: 0 hata, 0 uyarı', kv);
    await page.setInputFiles('#x-check', zf); await page.waitForTimeout(500); const ck = await page.textContent('#x-check-out');
    ok(/ZIP SAĞLAM/.test(ck) && /40 PNG/.test(ck) && /GLB geçerli/.test(ck), '"Dosyayı kontrol et": ZIP sağlam, 40 PNG, GLB geçerli', ck.slice(0, 160));
    await page.setInputFiles('#x-check', glb); await page.waitForTimeout(300); ok(/GLB DOĞRULANDI/.test(await page.textContent('#x-check-out')), '"Dosyayı kontrol et": GLB doğrulandı');
    await page.screenshot({ path: path.join(SHOT, '360x740_aktar_sonuc.png'), fullPage: true });
    // GLB içe aktarma (3D Model bölümünde görüntüleme)
    await go(page, 'model'); await page.evaluate(() => document.querySelectorAll('#tab-model details.acc').forEach(d => d.open = true)); await page.setInputFiles('#s3-verify-file', glb); await page.waitForTimeout(400);
    ok(await page.evaluate(() => ForgeV12.S3.viewer === 'glb') && /GLB dosyası/.test(await page.textContent('#pv-label')), 'GLB içe aktarıldı ve izlenen model açıkça yazıyor', await page.textContent('#pv-label'));
    await page.click('#s3-glb-close'); ok(await page.evaluate(() => ForgeV12.S3.viewer === 'forge'), 'Forge karakterine dönüldü');
    // Ayarlar: öz-test, ölçüm, hata kaydı
    await go(page, 'ayar'); await page.evaluate(() => document.querySelectorAll('#tab-ayar details.acc').forEach(d => d.open = true));
    await page.click('#st-run'); await page.waitForFunction(() => /Süre/.test(document.getElementById('st-out').textContent), null, { timeout: 120000 });
    const stx = await page.textContent('#st-out'), stBad = await page.locator('#st-out li.bad').count(); ok(stBad === 0, 'Öz-test: tüm maddeler geçti', stx.slice(0, 200));
    const perf = await dl('#perf-save'); ok(!!JSON.parse(fs.readFileSync(perf, 'utf8')).cihaz, 'Performans ölçümü JSON kaydedildi');
    const errCount = await page.textContent('#err-count'); ok(errCount === '0', 'Hata kaydında hata yok', errCount);
    // Otomatik proje kaydı: yeniden yükleyince tarif, görsel ve 3D ayarları geri gelir
    await go(page, 'model'); await page.evaluate(() => { const i = document.querySelector('[data-body="height"]'); i.value = 1.95; i.dispatchEvent(new Event('input', { bubbles: true })); });
    await go(page, 'uret'); await page.fill('#prompt', 'Yeşil pelerinli mızraklı savaşçı'); await page.dispatchEvent('#prompt', 'input'); await go(page, 'model'); await page.waitForTimeout(1800);
    await page.reload(); await page.waitForFunction(() => window.ForgeShell && ForgeV11.ready && ForgeV12.S3.ch, null, { timeout: 60000 }); await page.waitForTimeout(1500);
    const rs = await page.evaluate(() => ({ prompt: document.getElementById('prompt').value, h: ForgeV12.S3.ch.params.body.height, tab: ForgeShell.current, pack: /Model hazır|Hazır/.test(document.getElementById('ld-status').textContent) }));
    ok(rs.prompt.startsWith('Yeşil') && Math.abs(rs.h - 1.95) < 1e-6 && rs.tab === 'model' && rs.pack, 'Yeniden açılışta proje (tarif, 3D ayarı, bölüm, model paketi) geri geldi', rs);
    ok(!errs.length, '360x740: sayfa hatası yok', errs);
    await ctx.close();
  }
  await browser.close();
  R.passed = R.checks.every(c => c.ok); R.finishedAt = new Date().toISOString();
  fs.writeFileSync(path.join(OUT, 'test_v121_arayuz.json'), JSON.stringify(R, null, 1));
  console.log(R.passed ? `SONUÇ: ${R.checks.length} kontrolün hepsi geçti` : `SONUÇ: BAŞARISIZ (${R.checks.filter(c => !c.ok).length}/${R.checks.length})`);
  process.exitCode = R.passed ? 0 : 1;
})().catch(e => { console.error(e); process.exit(2); });
