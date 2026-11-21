// Gerçek tarayıcı testi (Chromium, Playwright): file:// ile açılır, AĞ TAMAMEN KAPALI (offline + tüm uzak istekler engellenir).
// Telefon görünümü (412x915, dokunmatik). İsteğe bağlı CPU yavaşlatma ile düşük güçlü telefon yaklaşık emülasyonu.
// Kullanım: node test_tarayici.js [--throttle=6] [--pack=yol.forgepack] [--skip3d] [--skipv11]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'ciktilar'), SHOTS = path.join(OUT, 'ekran');
fs.mkdirSync(SHOTS, { recursive: true });
const arg = (k, d) => { const a = process.argv.find(x => x.startsWith('--' + k)); return a ? (a.includes('=') ? a.split('=')[1] : true) : d; };
const THROTTLE = +arg('throttle', 1), PACK = arg('pack', null), TAG = arg('tag', THROTTLE > 1 ? 'yavas' + THROTTLE + 'x' : 'normal');
const R = { tag: TAG, cpuThrottle: THROTTLE, startedAt: new Date().toISOString(), checks: [], timings: {}, memory: {}, errors: [] };
const ok = (c, m, extra) => { R.checks.push({ ok: !!c, check: m, ...(extra ? { detail: extra } : {}) }); console.log((c ? '  ✓ ' : '  ✗ ') + m + (extra ? ' — ' + JSON.stringify(extra).slice(0, 200) : '')); };
function chromeRssMB() { try { const out = execSync("ps -eo rss,args | grep -E 'chrom(e|ium)' | grep -v grep | awk '{s+=$1} END {print s}'").toString().trim(); return +(+out / 1024).toFixed(1); } catch (e) { return null; } }
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, offline: true, acceptDownloads: true });
  const remote = [];
  await ctx.route('**/*', route => { const u = route.request().url(); if (/^(file|blob|data):/.test(u)) return route.continue(); remote.push(u); return route.abort(); });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Performance.enable');
  if (THROTTLE > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: THROTTLE });
  const logs = []; page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') logs.push(m.type() + ': ' + m.text()); }); page.on('pageerror', e => logs.push('PAGEERROR: ' + e.message));
  const heap = async () => { const m = await cdp.send('Performance.getMetrics'); const g = k => (m.metrics.find(x => x.name === k) || {}).value; return +(g('JSHeapUsedSize') / 1048576).toFixed(1); };
  const t0 = Date.now();
  await page.goto('file://' + path.join(ROOT, 'Forge_25D_V12_Yerel3D.html'));
  await page.waitForFunction(() => window.ForgeV11 && window.ForgeV11.ready && window.ForgeV12, null, { timeout: 120000 });
  R.timings.pageReadyMs = Date.now() - t0; R.memory.heapAfterLoadMB = await heap(); R.memory.chromeRssAfterLoadMB = chromeRssMB();
  ok(true, `Sayfa çevrimdışı açıldı (${R.timings.pageReadyMs} ms)`);

  if (!arg('skipv11')) {
    console.log('V11.2 özellikleri:');
    ok(await page.locator('#directions .btn').count() === 8, 'V11.2: 8 yön düğmesi');
    ok(await page.locator('#actions .btn').count() === 5, 'V11.2: 5 hareket önizlemesi');
    ok(await page.locator('#palettes input').count() === 6, 'V11.2: 6 renk paleti (renk düzenleme)');
    await page.click('#palettes label:nth-child(2)'); await page.waitForTimeout(300);
    ok((await page.evaluate(() => ForgeV11.state.palette)) === 'red', 'V11.2: kırmızı palete geçildi (renk düzenleme çalışıyor)');
    await page.click('#palettes label:nth-child(1)');
    let dl = page.waitForEvent('download', { timeout: 120000 }); await page.click('#all'); let d = await dl;
    const v11zip = path.join(OUT, 'v11_uyumluluk_8yon_5hareket.zip'); await d.saveAs(v11zip);
    const v11n = execSync(`python3 -c "import zipfile;z=zipfile.ZipFile('${v11zip}');print(len(z.namelist()), z.testzip())"`).toString().trim();
    ok(v11n === '41 None', 'V11.2: 8 yön × 5 hareket ZIP oluşturuldu ve CRC doğrulandı', v11n);
    dl = page.waitForEvent('download'); await page.click('#one'); d = await dl; ok(/\.png$/.test(d.suggestedFilename()), 'V11.2: seçili yön PNG dışa aktarımı', d.suggestedFilename());
    await page.click('#importExample'); await page.waitForTimeout(500);
    ok(await page.evaluate(() => ForgeV11.state.custom), 'V11.2: örnek PNG içe aktarma (büyücü)');
    await page.setInputFiles('#importFile', path.join(OUT, 'onizleme_8_yon.png')); await page.waitForTimeout(600);
    ok((await page.textContent('#status')).includes('İçe aktarıldı'), 'V11.2: telefondan PNG seçme + arka plan temizleme');
    await page.click('#returnWarrior'); await page.waitForTimeout(300);
  }

  console.log('3B stüdyo:');
  let t = Date.now(); await page.click('#s3-analyze'); await page.waitForTimeout(300); R.timings.analyzeClickMs = Date.now() - t;
  const notes = await page.textContent('#s3-notes'); ok(/güven/.test(notes), 'Resimden analiz yapıldı', notes.slice(0, 120));
  const info = await page.textContent('#s3-info'); ok(/vertex/.test(info), 'Gerçek mesh üretildi', info);
  // sürükleyerek döndürme
  const box = await page.locator('#s3-view').boundingBox();
  const yaw0 = await page.evaluate(() => ForgeV12.S3.yaw);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.mouse.down(); await page.mouse.move(box.x + box.width / 2 + 120, box.y + box.height / 2, { steps: 6 }); await page.mouse.up();
  const yaw1 = await page.evaluate(() => ForgeV12.S3.yaw); ok(Math.abs(yaw1 - yaw0) > 0.5, '3B karakter sürükleyerek döndürüldü', { yaw0, yaw1: +yaw1.toFixed(2) });
  await page.check('#s3-bones'); await page.evaluate(() => { ForgeV12.S3.playing = false; ForgeV12.S3.clip = 'attack'; ForgeV12.S3.t = 0.3; ForgeV12.S3.yaw = Math.PI / 4; ForgeV12.draw(); });
  await page.locator('#s3-view').screenshot({ path: path.join(SHOTS, `${TAG}_3b_iskelet_saldiri.png`) });
  await page.check('#s3-est'); await page.evaluate(() => { ForgeV12.S3.clip = 'idle'; ForgeV12.S3.t = 0; ForgeV12.S3.yaw = Math.PI; ForgeV12.draw(); });
  await page.locator('#s3-view').screenshot({ path: path.join(SHOTS, `${TAG}_3b_tahmini_yuzeyler_arka.png`) });
  await page.uncheck('#s3-est'); await page.uncheck('#s3-bones');
  const fm = await page.evaluate(() => { const r = []; for (let i = 0; i < 5; i++) { const t = performance.now(); ForgeV12.draw(); r.push(performance.now() - t); } return r; });
  R.timings.preview320FrameMs = +(fm.reduce((a, b) => a + b) / fm.length).toFixed(1);
  ok(true, `Önizleme karesi (320×320, CPU): ${R.timings.preview320FrameMs} ms`);
  // anatomi kaydırıcısı
  await page.evaluate(() => { const i = document.querySelector('[data-body="bulk"]'); i.value = 1.2; i.dispatchEvent(new Event('input', { bubbles: true })); });
  ok((await page.evaluate(() => ForgeV12.S3.ch.params.body.bulk)) === 1.2, 'Anatomi kaydırıcısı mesh\'i yeniden kurdu (irilik 1.2)');
  await page.evaluate(() => { const i = document.querySelector('[data-body="bulk"]'); i.value = 1.05; i.dispatchEvent(new Event('input', { bubbles: true })); });

  if (!arg('skip3d')) {
    // İptal + devam
    await page.click('#s3-zip');
    await page.waitForFunction(() => ForgeV12.S3.sheets.size >= 3, null, { timeout: 300000 });
    await page.click('#s3-cancel');
    await page.waitForFunction(() => !ForgeV12.S3.busy, null, { timeout: 120000 });
    const partial = await page.evaluate(() => ForgeV12.S3.sheets.size);
    ok(partial >= 3 && partial < 40, `Sprite üretimi iptal edildi (${partial}/40 saklandı)`);
    t = Date.now(); R.memory.heapBeforeSpritesMB = await heap();
    const dl = page.waitForEvent('download', { timeout: 900000 }); await page.click('#s3-resume'); const d = await dl;
    R.timings.sprites40ResumeMs = Date.now() - t; R.memory.heapAfterSpritesMB = await heap(); R.memory.chromeRssAfterSpritesMB = chromeRssMB();
    const zp = path.join(OUT, `tarayici_${TAG}_sprite_40.zip`); await d.saveAs(zp);
    ok(true, `"Devam et" ile kalan sayfalar üretildi ve ZIP indirildi (${(R.timings.sprites40ResumeMs / 1000).toFixed(1)} sn)`, await page.textContent('#s3-status'));
    const zt = execSync(`python3 ${path.join(__dirname, 'test_zip.py')} ${zp} ${path.join(OUT, `test_zip_tarayici_${TAG}.json`)}`).toString();
    ok(/ZIP testi geçti/.test(zt), 'Tarayıcıda üretilen ZIP bağımsız Python denetiminden geçti', zt.split('\n').slice(-3, -1).join(' | '));
    const status = await page.textContent('#s3-status'); const m = status.match(/([\d.]+) sn/); if (m) R.timings.statusSeconds = +m[1];
    // GLB
    const dl2 = page.waitForEvent('download', { timeout: 300000 }); await page.click('#s3-glb'); const g = await dl2;
    const gp = path.join(OUT, `tarayici_${TAG}_savasci.glb`); await g.saveAs(gp);
    await page.waitForFunction(() => /DOĞRULANDI|HATALI/.test(document.getElementById('s3-verify-out').textContent), null, { timeout: 60000 });
    const vt = await page.textContent('#s3-verify-out'); ok(/DOĞRULANDI/.test(vt), 'GLB tarayıcıda yeniden okunup doğrulandı', vt.slice(0, 160));
    await page.locator('#s3-glbview').screenshot({ path: path.join(SHOTS, `${TAG}_glb_yeniden_kurulan.png`) });
    // GLB'yi dosya seçiciyle tekrar açma
    await page.setInputFiles('#s3-verify-file', gp); await page.waitForTimeout(800);
    ok(/geçerli GLB/.test(await page.textContent('#s3-status')), 'GLB dosyası "aç ve doğrula" ile açıldı');
  }

  if (PACK) {
    console.log('Yerel Rüya (cihazda görsel üretimi):');
    t = Date.now(); await page.setInputFiles('#ld-file', PACK);
    await page.waitForFunction(() => /Hazır:|başlatılamadı/.test(document.getElementById('ld-status').textContent), null, { timeout: 600000 });
    R.timings.ldPackLoadAndInitMs = Date.now() - t; const st = await page.textContent('#ld-status');
    ok(/Hazır:/.test(st), 'Model paketi yüklendi, ONNX Runtime WASM motoru başladı', st);
    R.memory.heapAfterLdInitMB = await heap(); R.memory.chromeRssAfterLdInitMB = chromeRssMB();
    const runs = [['Kırmızı pelerinli, miğferli, kalkanlı, baltalı savaşçı, önden', 256, 20, 2, 11], ['Mavi cüppeli asalı büyücü, sağdan', 256, 20, 2, 5], ['Yeşil pelerinli kılıçlı altın zırhlı savaşçı, saldırı', 256, 12, 1, 7]];
    if (arg('with512')) runs.push(['Mor pelerinli mızraklı savaşçı, önden', 512, 20, 2, 3]);
    R.localDream = [];
    for (const [prompt, size, steps, guid, seed] of runs) {
      await page.fill('#ld-prompt', prompt); await page.dispatchEvent('#ld-prompt', 'input');
      await page.fill('#ld-seed', String(seed)); await page.selectOption('#ld-steps', String(steps)); await page.selectOption('#ld-guid', String(guid)); await page.selectOption('#ld-size', String(size)); await page.selectOption('#ld-cool', '0');
      await page.evaluate(() => { document.getElementById('ld-status').textContent = ''; });
      t = Date.now(); await page.click('#ld-go');
      await page.waitForFunction(() => /Üretildi|Hata/.test(document.getElementById('ld-status').textContent), null, { timeout: 1800000 });
      const ms = Date.now() - t, s = await page.textContent('#ld-status');
      const shot = path.join(SHOTS, `${TAG}_yerel_ruya_${size}_${seed}.png`);
      const dataUrl = await page.evaluate(() => document.getElementById('ld-out').toDataURL('image/png'));
      fs.writeFileSync(shot, Buffer.from(dataUrl.split(',')[1], 'base64'));
      const perf = await page.evaluate(() => ForgeLocalDream.lastPerf);
      R.localDream.push({ prompt, size, steps, guidance: guid, seed, wallMs: ms, status: s, perf, file: path.basename(shot), heapMB: await heap(), chromeRssMB: chromeRssMB() });
      ok(/Üretildi/.test(s), `Cihazda ${size}×${size} PNG üretildi (${(ms / 1000).toFixed(1)} sn)`, s);
    }
    // İptal + devam
    await page.fill('#ld-seed', '99'); await page.selectOption('#ld-size', '256'); await page.selectOption('#ld-steps', '20'); await page.selectOption('#ld-cool', '150'); await page.click('#ld-go');
    await page.waitForFunction(() => /adımı [4-9]\//.test(document.getElementById('ld-status').textContent), null, { timeout: 600000 });
    await page.click('#ld-cancel'); await page.waitForFunction(() => /İptal edildi/.test(document.getElementById('ld-status').textContent), null, { timeout: 300000 });
    ok(true, 'Görsel üretimi iptal edildi');
    await page.selectOption('#ld-cool', '0'); await page.evaluate(() => { document.getElementById('ld-status').textContent = ''; }); await page.click('#ld-resume');
    await page.waitForFunction(() => /Üretildi|Hata/.test(document.getElementById('ld-status').textContent), null, { timeout: 900000 });
    ok(/Üretildi/.test(await page.textContent('#ld-status')), 'Kaydedilen adımdan "Devam et" ile tamamlandı');
    // PNG kaydet + Forge'a aktar + 3B'ye çevir
    const dl = page.waitForEvent('download'); await page.click('#ld-save'); const d = await dl; const pp = path.join(OUT, `tarayici_${TAG}_yerel_ruya.png`); await d.saveAs(pp);
    const pinfo = execSync(`python3 -c "from PIL import Image;im=Image.open('${pp}');print(im.size, im.mode)"`).toString().trim(); ok(/\(256, 256\)/.test(pinfo), 'Üretilen görsel PNG olarak kaydedildi', pinfo);
    await page.click('#ld-to-3d'); await page.waitForTimeout(800);
    ok(await page.evaluate(() => ForgeV11.state.custom), 'Üretilen görsel Forge\'a aktarıldı ve 3B analizine gönderildi', (await page.textContent('#s3-notes')).slice(0, 100));
    await page.locator('#s3-card').screenshot({ path: path.join(SHOTS, `${TAG}_yerel_ruya_to_3b.png`) });
    // Sayfayı yeniden yükle: paket IndexedDB'den çevrimdışı geri gelmeli
    await page.reload(); await page.waitForFunction(() => /Hazır:|yüklü değil|başlatılamadı/.test(document.getElementById('ld-status').textContent), null, { timeout: 600000 });
    ok(/Hazır:/.test(await page.textContent('#ld-status')), 'Yeniden açılışta model, cihaz deposundan internetsiz yüklendi', await page.textContent('#ld-status'));
  }

  ok(remote.length === 0, 'Hiçbir uzak ağ isteği yapılmadı', remote.slice(0, 5));
  const errs = logs.filter(l => /error|PAGEERROR/i.test(l)); ok(errs.length === 0, 'Konsolda hata yok', errs.slice(0, 5));
  R.consoleWarnings = logs;
  await page.screenshot({ path: path.join(SHOTS, `${TAG}_tam_sayfa.png`), fullPage: true });
  R.finishedAt = new Date().toISOString(); R.passed = R.checks.every(c => c.ok);
  fs.writeFileSync(path.join(OUT, `test_tarayici_${TAG}.json`), JSON.stringify(R, null, 2));
  console.log(R.passed ? 'SONUÇ: tarayıcı testleri geçti' : 'SONUÇ: BAŞARISIZ'); process.exitCode = R.passed ? 0 : 1;
  await browser.close();
})().catch(e => { console.error(e); process.exit(2); });
