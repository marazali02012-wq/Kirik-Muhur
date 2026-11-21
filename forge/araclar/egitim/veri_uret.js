// Forge-Mini eğitim verisi: Forge'un kendi prosedürel 3B savaşçılarından etiketli görüntüler üretir.
// Kullanım: node veri_uret.js <çıktı_klasörü> <adet> [iş_parçacığı]
// Dış veri seti, internetten resim veya başka bir modelin çıktısı KULLANILMAZ.
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const path = require('path'), fs = require('fs');
const ATTR = {
  dir: 8, weapon: ['sword', 'axe', 'spear', 'staff', 'mace', 'hammer', 'dagger', 'none'], armor: ['heavy', 'medium', 'light', 'robe'],
  helmet: ['circlet', 'full', 'none'], cape: [1, 0], shield: [0, 1], clothHue: 15, metal: ['steel', 'dark', 'gold', 'bronze'], pose: ['idle', 'walk', 'attack'],
};
const METALS = { steel: [150, 160, 182], dark: [62, 62, 74], gold: [196, 160, 78], bronze: [156, 104, 64] };
function hsv(h, s, v) { const c = v * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = v - c; let r = 0, g = 0, b = 0; if (h < 60) [r, g] = [c, x]; else if (h < 120) [r, g] = [x, c]; else if (h < 180) [g, b] = [c, x]; else if (h < 240) [g, b] = [x, c]; else if (h < 300) [r, b] = [x, c]; else [r, b] = [c, x]; return [r + m, g + m, b + m].map(v => Math.round(v * 255)); }
function clothFromBin(bin, R) {
  if (bin < 12) return hsv(bin * 30 + (R() - 0.5) * 18, 0.55 + R() * 0.35, 0.45 + R() * 0.4);
  if (bin === 12) return hsv(R() * 360, 0.1, 0.12 + R() * 0.08); // siyah
  if (bin === 13) return hsv(R() * 360, 0.05, 0.85 + R() * 0.1); // beyaz
  return hsv(R() * 360, 0.06, 0.4 + R() * 0.2); // gri
}
if (isMainThread) {
  const out = process.argv[2] || 'veri', N = +(process.argv[3] || 1000), T = +(process.argv[4] || 4);
  fs.mkdirSync(path.join(out, 'img'), { recursive: true });
  let done = 0; const labels = new Array(N); const t0 = Date.now();
  const per = Math.ceil(N / T);
  for (let w = 0; w < T; w++) {
    const wk = new Worker(__filename, { workerData: { out, from: w * per, to: Math.min(N, (w + 1) * per) } });
    wk.on('message', m => { labels[m.i] = m.label; done++; if (done % 500 === 0) console.log(done, '/', N, ((Date.now() - t0) / 1000).toFixed(0) + 's'); if (done === N) { fs.writeFileSync(path.join(out, 'labels.json'), JSON.stringify({ attrs: ATTR, labels })); console.log('bitti', ((Date.now() - t0) / 1000).toFixed(1), 's'); } });
  }
} else {
  const { load, deflate } = require(path.join(__dirname, '..', '..', 'tests', 'load.js'));
  const F = load();
  const { out, from, to } = workerData;
  for (let i = from; i < to; i++) {
    const R = F.rng(1000 + i * 7919), pick = a => a[Math.floor(R() * a.length)];
    const lab = {
      dir: Math.floor(R() * 8), weapon: Math.floor(R() * 8), armor: R() < 0.45 ? 0 : Math.floor(R() * 4), helmet: Math.floor(R() * 3), cape: R() < 0.6 ? 0 : 1,
      shield: R() < 0.25 ? 1 : 0, clothHue: Math.floor(R() * 15), metal: R() < 0.5 ? 0 : Math.floor(R() * 4), pose: R() < 0.5 ? 0 : R() < 0.6 ? 1 : 2,
    };
    const style = { weapon: ATTR.weapon[lab.weapon], armor: ATTR.armor[lab.armor], helmet: ATTR.helmet[lab.helmet], cape: !!ATTR.cape[lab.cape], shield: !!ATTR.shield[lab.shield], hair: pick(['spiky', 'spiky', 'long', 'none']), pauldrons: ATTR.armor[lab.armor] === 'robe' ? 'none' : pick(['large', 'small']), tabard: R() < 0.8 };
    if (style.helmet === 'none') style.helmet = 'nohelm';
    const cloth = clothFromBin(lab.clothHue, R);
    const metal = METALS[ATTR.metal[lab.metal]].map(v => Math.max(0, Math.min(255, v + (R() - 0.5) * 30)));
    const skin = hsv(18 + R() * 14, 0.25 + R() * 0.35, 0.45 + R() * 0.45);
    const hair = R() < 0.5 ? hsv(R() * 50, 0.4 + R() * 0.4, 0.1 + R() * 0.35) : hsv(R() * 360, 0.3 + R() * 0.5, 0.2 + R() * 0.7);
    const palette = { cloth, under: cloth.map(v => Math.round(v * 0.55 + 20)), metal, trim: R() < 0.7 ? [205, 168, 92] : [200, 205, 215], skin, hair, leather: hsv(20 + R() * 15, 0.5, 0.25 + R() * 0.2), gem: hsv(R() * 360, 0.7, 0.95) };
    const body = { height: 1.62 + R() * 0.32, bulk: 0.88 + R() * 0.3, shoulderW: 0.42 + R() * 0.1, headH: 0.24 + R() * 0.05 };
    const ch = F.createCharacter({ body, palette, style, seed: i });
    const clip = ATTR.pose[lab.pose], fi = Math.floor(R() * 8);
    const { res, skinned } = F.poseSkin(ch, clip, F.frameTime(clip, fi, 8));
    const r = F.render(ch.mesh, skinned, { width: 256, height: 256, yaw: lab.dir * Math.PI / 4, pitch: 0.33, scale: 100, cx: 128, cy: 232, ss: 2, bg: [255, 255, 255] });
    const rgb = new Uint8ClampedArray(256 * 256 * 4); rgb.set(r.rgba);
    fs.writeFileSync(path.join(out, 'img', String(i).padStart(6, '0') + '.png'), F.encodePNG(rgb, 256, 256, deflate));
    parentPort.postMessage({ i, label: lab });
  }
}
