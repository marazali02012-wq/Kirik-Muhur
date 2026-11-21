// Uçtan uca örnek üretim (Node): V11.2'deki savaşçı resmi -> analiz -> 3B karakter -> GLB -> 40 sprite sayfası -> ZIP
const { load, deflate, inflate } = require('./load.js');
const F = load(); const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, '..', 'ciktilar'); fs.mkdirSync(OUT, { recursive: true });
const inputPng = process.argv[2] || '/tmp/claude-0/out/view0_in.png';
const mem = () => +(process.memoryUsage().rss / 1048576).toFixed(1);
(async () => {
  const T = {}; let t0 = Date.now();
  const img = F.decodePNG(new Uint8Array(fs.readFileSync(inputPng)), inflate);
  const an = F.analyzeCharacterImage(img.rgba, img.width, img.height); T.analyzeMs = Date.now() - t0;
  t0 = Date.now();
  const ch = F.createCharacter({ analysis: an, seed: 11 }); T.buildMeshMs = Date.now() - t0;
  t0 = Date.now(); ch.framing = F.computeFraming(ch); T.framingMs = Date.now() - t0;
  t0 = Date.now(); const glb = F.exportGLB(ch.skel, ch.mesh, { name: 'Forge_Savasci_V11_Analiz' }); T.glbMs = Date.now() - t0;
  const ver = F.verifyGLB(glb);
  fs.writeFileSync(path.join(OUT, 'ornek_savasci.glb'), glb);
  t0 = Date.now();
  const res = await F.buildSpriteZip(ch, { encode: async (rgba, w, h) => F.encodePNG(rgba, w, h, deflate), glb });
  T.spritesAndZipMs = Date.now() - t0;
  fs.writeFileSync(path.join(OUT, 'ornek_savasci_sprite_40.zip'), res.zip);
  // önizleme: 8 yön boşta + 8 yön yürüyüş karesi
  const S = 256, prev = new Uint8ClampedArray(S * 8 * S * 2 * 4);
  for (let d = 0; d < 8; d++) for (const [row, clip, fi] of [[0, 'idle', 0], [1, 'attack', 3]]) {
    const r = F.renderFrame(ch, clip, fi, d, { bg: [58, 70, 92] });
    for (let y = 0; y < S; y++) prev.set(r.rgba.subarray(y * S * 4, (y + 1) * S * 4), ((row * S + y) * S * 8 + d * S) * 4);
  }
  fs.writeFileSync(path.join(OUT, 'onizleme_8_yon.png'), F.encodePNG(prev, S * 8, S * 2, deflate));
  const summary = { input: path.basename(inputPng), analysis: { confidence: an.confidence, ratios: an.ratios, style: an.style, notes: an.notes }, timingsMs: T, rssMB: mem(),
    mesh: { vertices: ch.mesh.vertexCount, triangles: ch.mesh.triangleCount, bones: ch.skel.bones.length }, framing: ch.framing,
    glb: { bytes: glb.length, verify: { ok: ver.ok, errors: ver.errors, stats: Object.assign({}, ver.stats, { extras: undefined }) } }, zip: { bytes: res.zip.length, files: res.files.length } };
  fs.writeFileSync(path.join(OUT, 'uretim_ozet.json'), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 1).slice(0, 2500));
})();
