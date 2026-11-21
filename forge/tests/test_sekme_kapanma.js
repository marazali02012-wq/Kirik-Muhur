// Sekme kapanması (telefonun belleği yetmeyip sayfayı öldürmesi) benzetimi: sprite üretimi ortasında sayfa yeniden
// yüklenir; tamamlanan sayfalar IndexedDB'den geri gelmeli ve "Devam et" ile 40'a tamamlanmalı. Ağ kapalı.
const { chromium } = require('playwright'); const path = require('path'), fs = require('fs');
(async () => {
  const browser = await chromium.launch(); const ctx = await browser.newContext({ viewport: { width: 412, height: 915 }, isMobile: true, offline: true, acceptDownloads: true });
  const page = await ctx.newPage(); const url = 'file://' + path.join(__dirname, '..', 'Forge_25D_V12_Yerel3D.html');
  await page.goto(url); await page.waitForFunction(() => window.ForgeV12 && window.ForgeV12.S3.ch, null, { timeout: 60000 });
  await page.selectOption('#s3-cool', '250'); await page.click('#s3-zip');
  await page.waitForFunction(() => ForgeV12.S3.sheets.size >= 6, null, { timeout: 300000 });
  const before = await page.evaluate(() => ForgeV12.S3.sheets.size);
  await page.waitForTimeout(300); // son yazımın IndexedDB'ye düşmesi için
  await page.reload(); await page.waitForFunction(() => window.ForgeV12 && /önceki oturumdan/.test(document.getElementById('s3-status').textContent), null, { timeout: 60000 });
  const msg = await page.textContent('#s3-status'), restored = await page.evaluate(() => ForgeV12.S3.sheets.size);
  await page.selectOption('#s3-cool', '0');
  const dl = page.waitForEvent('download', { timeout: 600000 }); await page.click('#s3-resume'); const d = await dl;
  const out = path.join(__dirname, '..', 'ciktilar', 'tarayici_sekme_kapanma_sprite_40.zip'); await d.saveAs(out);
  const n = require('child_process').execSync(`python3 -c "import zipfile;z=zipfile.ZipFile('${out}');print(sum(1 for x in z.namelist() if x.endswith('.png')), z.testzip())"`).toString().trim();
  const pass = restored >= before - 1 && restored > 0 && n === '40 None';
  const R = { pass, sheetsBeforeReload: before, restoredAfterReload: restored, message: msg, zipPngs: n };
  fs.writeFileSync(path.join(__dirname, '..', 'ciktilar', 'test_sekme_kapanma.json'), JSON.stringify(R, null, 1)); fs.unlinkSync(out);
  console.log(JSON.stringify(R)); await browser.close(); process.exitCode = pass ? 0 : 1;
})();
