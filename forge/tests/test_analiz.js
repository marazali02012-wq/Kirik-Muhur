// Resim analizi doğruluk testi: parametreleri BİLİNEN rastgele karakterler önden çizilir, sonra analiz edilir.
// Ölçülen: omuz/bacak/baş oranı hatası, pelerin ve zırh türü tespiti, kumaş rengi ton farkı.
const { load } = require('./load.js'); const F = load(); const fs = require('fs'), path = require('path');
const N = +(process.argv[2] || 60); const res = []; let capeOk = 0, capeN = 0, armorOk = 0, hueErr = [], legErr = [], shErr = [], headErr = [];
const hueOf = c => F.rgb2hsv(c[0], c[1], c[2])[0];
const dh = (a, b) => { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; };
for (let i = 0; i < N; i++) {
  const R = F.rng(500 + i * 31);
  const hue = Math.floor(R() * 12) * 30;
  const hsvRgb = (h, s, v) => { const c = v * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = v - c; let r = 0, g = 0, b = 0; if (h < 60) [r, g] = [c, x]; else if (h < 120) [r, g] = [x, c]; else if (h < 180) [g, b] = [c, x]; else if (h < 240) [g, b] = [x, c]; else if (h < 300) [r, b] = [x, c]; else [r, b] = [c, x]; return [r + m, g + m, b + m].map(v => Math.round(v * 255)); };
  const cloth = hsvRgb(hue, 0.75, 0.7);
  const style = { cape: R() < 0.5, armor: ['heavy', 'medium', 'light'][Math.floor(R() * 3)], weapon: ['sword', 'axe', 'mace'][Math.floor(R() * 3)], tabard: true };
  const body = { height: 1.8, thigh: 0.38 + R() * 0.1, shin: 0.38 + R() * 0.08, shoulderW: 0.4 + R() * 0.12, headH: 0.23 + R() * 0.06 };
  const ch = F.createCharacter({ body, style, palette: { cloth, under: cloth.map(v => Math.round(v * 0.55 + 20)) } });
  const { skinned } = F.poseSkin(ch, 'idle', 0);
  const r = F.render(ch.mesh, skinned, { width: 384, height: 512, yaw: 0, pitch: 0, scale: 255, cx: 192, cy: 500, ss: 2, outline: true });
  const an = F.analyzeCharacterImage(r.rgba, 384, 512);
  const B = ch.params.body, legTrue = (B.ankleH + B.shin + B.thigh) / B.height;
  legErr.push(Math.abs(an.ratios.legFrac - legTrue)); headErr.push(Math.abs(an.body.headH - B.headH) / B.headH);
  shErr.push(Math.abs(an.body.shoulderW - B.shoulderW) / B.shoulderW);
  capeN++; if (an.style.cape === style.cape) capeOk++;
  if ((style.armor === 'heavy') === (an.style.armor === 'heavy')) armorOk++;
  hueErr.push(dh(hueOf(an.palette.cloth), hue));
  res.push({ i, style, true: { legFrac: +legTrue.toFixed(3), shoulderW: +B.shoulderW.toFixed(3), headH: +B.headH.toFixed(3), clothHue: hue }, found: { legFrac: an.ratios.legFrac, shoulderW: +an.body.shoulderW.toFixed(3), headH: +an.body.headH.toFixed(3), cape: an.style.cape, armor: an.style.armor, clothHue: Math.round(hueOf(an.palette.cloth)) } });
}
const mean = a => +(a.reduce((x, y) => x + y, 0) / a.length).toFixed(3), med = a => { const s = a.slice().sort((x, y) => x - y); return +s[s.length >> 1].toFixed(3); };
const summary = { samples: N, legFracAbsErr: { mean: mean(legErr), median: med(legErr) }, shoulderRelErr: { mean: mean(shErr), median: med(shErr) }, headRelErr: { mean: mean(headErr), median: med(headErr) },
  capeDetectAcc: +(capeOk / capeN).toFixed(3), heavyArmorDetectAcc: +(armorOk / N).toFixed(3), clothHueErrDeg: { mean: mean(hueErr), median: med(hueErr), within30: +(hueErr.filter(e => e <= 30).length / N).toFixed(3) } };
fs.writeFileSync(path.join(__dirname, '..', 'ciktilar', 'test_analiz.json'), JSON.stringify({ summary, samples: res }, null, 1));
console.log(JSON.stringify(summary, null, 1));
