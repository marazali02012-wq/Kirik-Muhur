// Bağımsız bir yükleyiciyle (three.js GLTFLoader) GLB açma testi. three yalnızca test aracıdır; uygulamaya girmez.
// Yerel HTTP (127.0.0.1) kullanılır; internet gerekmez.
const { chromium } = require('playwright'); const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'); const glb = process.argv[2] || 'ciktilar/ornek_savasci.glb';
const srv = http.createServer((q, r) => { const p = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])); if (!p.startsWith(ROOT) || !fs.existsSync(p)) { r.writeHead(404); return r.end(); }
  const ext = path.extname(p); r.writeHead(200, { 'Content-Type': { '.html': 'text/html', '.js': 'text/javascript', '.glb': 'model/gltf-binary' }[ext] || 'application/octet-stream' }); fs.createReadStream(p).pipe(r); });
srv.listen(0, '127.0.0.1', async () => {
  const port = srv.address().port, browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  const page = await browser.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.goto(`http://127.0.0.1:${port}/tests/threejs_test/index.html?glb=/${glb}`);
  await page.waitForFunction(() => window.RESULT && (window.RESULT.ok || window.RESULT.error), null, { timeout: 120000 });
  const R = await page.evaluate(() => window.RESULT);
  const shotDir = path.join(ROOT, 'ciktilar', 'ekran'); fs.mkdirSync(shotDir, { recursive: true });
  (R.poses || []).forEach(p => { fs.writeFileSync(path.join(shotDir, `threejs_${p.name}.png`), Buffer.from(p.png.split(',')[1], 'base64')); delete p.png; });
  const pass = R.ok && R.skinnedMeshes > 0 && R.bones === 26 && R.animations.length === 5 && new Set(R.poses.map(p => p.handR.join())).size === R.poses.length;
  fs.writeFileSync(path.join(ROOT, 'ciktilar', 'test_threejs.json'), JSON.stringify({ glb, threeVersion: JSON.parse(fs.readFileSync(path.join(__dirname, 'node_modules', 'three', 'package.json'), 'utf8')).version, pass, result: R, pageErrors: errs }, null, 1));
  console.log(JSON.stringify({ pass, skinnedMeshes: R.skinnedMeshes, bones: R.bones, animations: R.animations, poses: R.poses, error: R.error, errs }, null, 0));
  await browser.close(); srv.close(); process.exitCode = pass ? 0 : 1;
});
