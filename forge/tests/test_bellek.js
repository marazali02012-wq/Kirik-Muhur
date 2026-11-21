// Yerel Rüya bellek ölçümü: Chromium süreçlerinin RSS toplamı (ps) — paket seçimi, motor başlatma ve üretim sırasındaki tepe.
// Ağ kapalı, file://. Bellek tasarrufu kapalı/açık iki ölçüm.
const { chromium } = require('playwright'); const { execSync } = require('child_process'); const path = require('path'), fs = require('fs');
const PACK = process.argv[2] || path.join(__dirname, '..', 'yerel-calisma', 'ForgeMini_Savasci_v1.forgepack');
const rss = () => { const o = execSync("ps -eo rss,args | grep -E 'chrom(e|ium)' | grep -v grep").toString().trim().split('\n'); let tot = 0, maxp = 0; for (const l of o) { const v = +l.trim().split(/\s+/)[0]; tot += v; if (v > maxp) maxp = v; } return { totalMB: +(tot / 1024).toFixed(1), largestProcMB: +(maxp / 1024).toFixed(1) }; };
(async () => {
  const out = {};
  for (const memSaver of [false, true]) {
    const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 412, height: 915 }, isMobile: true, offline: true }); const page = await ctx.newPage();
    await page.goto('file://' + path.join(__dirname, '..', 'Forge_25D_V12_Yerel3D.html')); await page.waitForFunction(() => window.ForgeV12, null, { timeout: 60000 });
    await page.evaluate(() => { ForgeV12.S3.playing = false; }); await page.waitForTimeout(500);
    const r = { base: rss() };
    if (memSaver) await page.check('#ld-memsaver');
    await page.setInputFiles('#ld-file', PACK); await page.waitForFunction(() => /Hazır:/.test(document.getElementById('ld-status').textContent), null, { timeout: 300000 });
    await page.waitForTimeout(800); r.afterInit = rss();
    await page.selectOption('#ld-steps', '20'); await page.selectOption('#ld-guid', '2'); await page.fill('#ld-seed', '1');
    await page.evaluate(() => { document.getElementById('ld-status').textContent = ''; }); await page.click('#ld-go');
    let peak = { totalMB: 0, largestProcMB: 0 }; const t0 = Date.now();
    while (!/Üretildi|Hata/.test(await page.textContent('#ld-status')) && Date.now() - t0 < 300000) { const m = rss(); if (m.totalMB > peak.totalMB) peak = m; await page.waitForTimeout(150); }
    r.peakDuringGeneration = peak; await page.waitForTimeout(500); r.afterGeneration = rss();
    r.deltaInitMB = +(r.afterInit.totalMB - r.base.totalMB).toFixed(1); r.deltaPeakMB = +(peak.totalMB - r.base.totalMB).toFixed(1);
    out[memSaver ? 'bellekTasarrufuAcik' : 'bellekTasarrufuKapali'] = r; await b.close();
  }
  fs.writeFileSync(path.join(__dirname, '..', 'ciktilar', 'test_bellek.json'), JSON.stringify(out, null, 1)); console.log(JSON.stringify(out, null, 1));
})();
