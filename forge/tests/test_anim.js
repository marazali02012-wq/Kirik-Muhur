// Animasyon kalite testleri: ayak kayması, zemine girme, kol/parça kopması (kenar gerilmesi), silah-el bağı, IK isabeti.
const { load } = require('./load.js');
const F = load();
const assert = (c, m) => { if (!c) { console.error('BAŞARISIZ:', m); process.exitCode = 1; } else console.log('  ✓', m); };
function run(bodyOpts, style, label) {
  console.log('\n== ' + label);
  const skel = F.buildSkeleton(bodyOpts), mesh = F.buildWarriorMesh(skel, {}, style, 5), J = skel.index;
  skel.style = Object.assign({}, F.DEFAULT_STYLE, style);
  const report = {};
  // 1) Yürüyüşte ayak kayması (dünya çerçevesi: karakter hız*zaman kadar ilerler)
  const N = 240, stride = F.WALK.stride; let maxSlip = 0, maxSink = 0, stanceSamples = 0;
  for (const side of ['L', 'R']) {
    let anchor = null;
    for (let i = 0; i <= N; i++) {
      const t = i / N, r = F.sampleClip(skel, 'walk', t % 1), W = F.poseWorld(skel, r.pose);
      const p = W.wpos[J['foot.' + side]], worldZ = p[2] + stride * t;
      if (r.contacts[side]) {
        stanceSamples++;
        if (!anchor) anchor = [p[0], p[1], worldZ];
        maxSlip = Math.max(maxSlip, Math.hypot(p[0] - anchor[0], worldZ - anchor[2]));
        maxSink = Math.max(maxSink, Math.abs(p[1] - skel.body.ankleH));
      } else anchor = null;
    }
  }
  report.walkFootSlipMm = +(maxSlip * 1000).toFixed(3); report.walkStanceHeightErrMm = +(maxSink * 1000).toFixed(3);
  assert(maxSlip < 0.002, `yürüyüş: basan ayak dünyada sabit (en büyük kayma ${(maxSlip * 1000).toFixed(2)} mm, ${stanceSamples} örnek)`);
  assert(maxSink < 0.002, `yürüyüş: basan ayak zemin yüksekliğinde (sapma ${(maxSink * 1000).toFixed(2)} mm)`);
  // 2) Tüm kliplerde: zemine girme, kenar gerilmesi, silah-el mesafesi, kemik uzunlukları
  const bindEdge = [], I = mesh.index, P = mesh.position;
  for (let t = 0; t < I.length; t += 3) for (let k = 0; k < 3; k++) {
    const a = I[t + k], b = I[t + (k + 1) % 3];
    bindEdge.push([a, b, Math.hypot(P[a * 3] - P[b * 3], P[a * 3 + 1] - P[b * 3 + 1], P[a * 3 + 2] - P[b * 3 + 2])]);
  }
  const ATTACH = [['upperarm.L', 'chest'], ['upperarm.R', 'chest'], ['thigh.L', 'hips'], ['thigh.R', 'hips'], ['neck', 'chest'], ['forearm.L', 'upperarm.L'], ['forearm.R', 'upperarm.R'], ['shin.L', 'thigh.L'], ['shin.R', 'thigh.R']];
  const ringSize = { 'upperarm.L': 12, 'upperarm.R': 12, 'thigh.L': 14, 'thigh.R': 14, neck: 12, 'forearm.L': 12, 'forearm.R': 12, 'shin.L': 12, 'shin.R': 12 };
  const gripRest = F.v3.dist(skel.bones[J['hand.R']].restWorld, skel.bones[J['weapon']].restWorld);
  report.clips = {};
  for (const clip of F.CLIP_KEYS) {
    let minY = 1e9, minYRawCloth = 1e9, maxStretch = 0, maxAbs = 0, maxAbsSolid = 0, attachWorst = { ratio: 0 }, gripErr = 0, boneErr = 0, tipSpeed = [];
    let prevTip = null;
    const S = 48;
    for (let i = 0; i <= S; i++) {
      const t = i / S, r = F.sampleClip(skel, clip, Math.min(t, 0.99999)), W = F.poseWorld(skel, r.pose);
      const M = F.skinMatrices(skel, W), sk = F.skinVertices(mesh, M), raw = F.skinVertices(mesh, M, null, { noClamp: true });
      for (let v = 0; v < mesh.vertexCount; v++) {
        if (sk.pos[v * 3 + 1] < minY) minY = sk.pos[v * 3 + 1];
        if (mesh.clothPart[mesh.part[v]] && raw.pos[v * 3 + 1] < minYRawCloth) minYRawCloth = raw.pos[v * 3 + 1];
      }
      for (const [a, b, L0] of bindEdge) {
        const L = Math.hypot(sk.pos[a * 3] - sk.pos[b * 3], sk.pos[a * 3 + 1] - sk.pos[b * 3 + 1], sk.pos[a * 3 + 2] - sk.pos[b * 3 + 2]);
        if (L0 > 0.004) maxStretch = Math.max(maxStretch, L / L0);
        maxAbs = Math.max(maxAbs, L - L0);
        if (!mesh.clothPart[mesh.part[a]]) maxAbsSolid = Math.max(maxAbsSolid, L - L0);
      }
      // Bağlantı testi: parçanın ilk halkasının merkezi, kendi ağırlıklarıyla ve ebeveyn kemiğe katı bağlıyken
      // aynı yerde kalmalı. Fark halka yarıçapını aşarsa parça gövdeden ayrılmış demektir.
      for (const [pname, parentBone] of ATTACH) {
        const pi = mesh.parts.findIndex(p => p.name === pname); if (pi < 0) continue;
        const part = mesh.parts[pi], seg = 1 + ringSize[pname];
        let cx = 0, cy = 0, cz = 0, bx = 0, by = 0, bz = 0;
        for (let v = part.start; v < part.start + seg; v++) { cx += sk.pos[v * 3]; cy += sk.pos[v * 3 + 1]; cz += sk.pos[v * 3 + 2]; bx += P[v * 3]; by += P[v * 3 + 1]; bz += P[v * 3 + 2]; }
        cx /= seg; cy /= seg; cz /= seg; bx /= seg; by /= seg; bz /= seg;
        let rad = 0; for (let v = part.start; v < part.start + seg; v++) rad = Math.max(rad, Math.hypot(P[v * 3] - bx, P[v * 3 + 1] - by, P[v * 3 + 2] - bz));
        const Mp = M.subarray(J[parentBone] * 16, J[parentBone] * 16 + 16);
        const rx = Mp[0] * bx + Mp[4] * by + Mp[8] * bz + Mp[12], ry = Mp[1] * bx + Mp[5] * by + Mp[9] * bz + Mp[13], rz = Mp[2] * bx + Mp[6] * by + Mp[10] * bz + Mp[14];
        const d = Math.hypot(cx - rx, cy - ry, cz - rz);
        if (d / rad > attachWorst.ratio) attachWorst = { name: pname, d, ratio: d / rad };
      }
      gripErr = Math.max(gripErr, Math.abs(F.v3.dist(W.wpos[J['hand.R']], W.wpos[J['weapon']]) - gripRest));
      for (const b of skel.bones) if (b.parent > 0) boneErr = Math.max(boneErr, Math.abs(F.v3.dist(W.wpos[b.index], W.wpos[b.parent]) - F.v3.len(b.restLocal)));
      // kılıç ucu: silah kemiği + yön * 0.9
      const wf = F.weaponFrame(skel, n => skel.bones[J[n]].restWorld);
      const tip = F.v3.add(W.wpos[J.weapon], F.q.rotate(W.wrot[J.weapon], F.v3.scale(wf.dir, 0.9)));
      if (prevTip) tipSpeed.push([t, F.v3.dist(tip, prevTip) * S / F.CLIPS[clip].duration]);
      prevTip = tip;
    }
    const peak = tipSpeed.reduce((a, b) => b[1] > a[1] ? b : a, [0, 0]);
    report.clips[clip] = { worstAttachment: attachWorst.name, worstAttachmentCm: +(attachWorst.d * 100).toFixed(2), worstAttachmentRatio: +attachWorst.ratio.toFixed(3), maxSolidEdgeGrowth_cm: +(maxAbsSolid * 100).toFixed(2), minVertexY_cm: +(minY * 100).toFixed(2), clothRawMinY_cm_GLB: +(minYRawCloth * 100).toFixed(2), maxEdgeStretch: +maxStretch.toFixed(3), maxEdgeGrowth_cm: +(maxAbs * 100).toFixed(2), weaponGripErrMm: +(gripErr * 1000).toFixed(3), boneLenErrMm: +(boneErr * 1000).toFixed(4), bladeTipPeakSpeed: +peak[1].toFixed(2), bladeTipPeakAt: +peak[0].toFixed(3) };
    assert(minY > -0.012, `${clip}: hiçbir vertex zeminin altında değil (en düşük y = ${(minY * 100).toFixed(2)} cm)`);
    assert(maxAbsSolid < 0.07, `${clip}: gövde/zırh yüzeyi aşırı gerilmiyor (en büyük kenar uzaması ${(maxAbsSolid * 100).toFixed(1)} cm)`);
    assert(maxAbs < 0.14, `${clip}: kumaş dahil tüm yüzeyler yırtılmıyor (en büyük kenar uzaması ${(maxAbs * 100).toFixed(1)} cm, oran ${maxStretch.toFixed(2)})`);
    assert(attachWorst.ratio < 1.0, `${clip}: kollar/bacaklar/baş gövdeden kopmuyor (en kötü bağlantı: ${attachWorst.name} ${(attachWorst.d * 100).toFixed(1)} cm, yarıçapın ${(attachWorst.ratio * 100).toFixed(0)}%'i)`);
    assert(gripErr < 1e-5, `${clip}: silah ele bağlı (sapma ${(gripErr * 1000).toFixed(4)} mm)`);
    assert(boneErr < 1e-5, `${clip}: kemik uzunlukları korunuyor`);
    if (clip === 'attack') assert(peak[0] > 0.3 && peak[0] < 0.6, `attack: kılıç ucunun en yüksek hızı vuruş aralığında (t=${peak[0].toFixed(2)}, ${peak[1].toFixed(1)} m/s)`);
  }
  return report;
}
const out = {};
out.default = run({}, {}, 'Varsayılan savaşçı');
out.heavyShort = run({ height: 1.6, bulk: 1.2, shoulderW: 0.52 }, { weapon: 'axe', shield: true }, 'Kısa, iri, balta + kalkan');
out.tallLight = run({ height: 1.95, bulk: 0.85 }, { weapon: 'spear', armor: 'light', cape: false }, 'Uzun, hafif zırh, mızrak');
require('fs').writeFileSync(require('path').join(__dirname, '..', 'ciktilar', 'test_animasyon.json'), JSON.stringify(out, null, 2));
console.log(process.exitCode ? '\nSONUÇ: BAŞARISIZ' : '\nSONUÇ: tüm animasyon testleri geçti');
