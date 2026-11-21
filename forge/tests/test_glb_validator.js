// GLB testi: (1) Khronos resmi glTF-Validator, (2) kendi okuyucumuzla yapısal denetim,
// (3) gidiş-dönüş: GLB'den kurulan karakteri çizip özgün motor çizimiyle siluet örtüşmesi (IoU) karşılaştırması.
const fs = require('fs'), path = require('path');
const validator = require('gltf-validator');
const { load } = require('./load.js'); const F = load();
const OUT = path.join(__dirname, '..', 'ciktilar');
async function khronos(data) {
  const rep = await validator.validateBytes(data, { maxIssues: 200, writeTimestamp: false });
  return rep;
}
function iou(a, b) { let i = 0, u = 0; for (let k = 3; k < a.length; k += 4) { const x = a[k] > 128, y = b[k] > 128; if (x && y) i++; if (x || y) u++; } return u ? i / u : 1; }
(async () => {
  const results = {};
  const files = process.argv.slice(2).length ? process.argv.slice(2) : [path.join(OUT, 'ornek_savasci.glb')];
  for (const f of files) {
    const data = new Uint8Array(fs.readFileSync(f));
    const rep = await khronos(data), is = rep.issues;
    console.log(path.basename(f), '| Khronos glTF-Validator', rep.validatorVersion, '| hata', is.numErrors, 'uyarı', is.numWarnings, 'bilgi', is.numInfos, 'ipucu', is.numHints, '| vertex', rep.info.totalVertexCount, 'üçgen', rep.info.totalTriangleCount, 'animasyon', rep.info.animationCount);
    for (const m of is.messages.slice(0, 20)) console.log('   ', m.severity, m.code, m.pointer || '', m.message);
    const own = F.verifyGLB(data);
    console.log('   kendi doğrulayıcı:', own.ok ? 'GEÇTİ' : 'HATA ' + own.errors.join('; '));
    results[path.basename(f)] = { khronos: { version: rep.validatorVersion, errors: is.numErrors, warnings: is.numWarnings, infos: is.numInfos, hints: is.numHints, messages: is.messages, info: rep.info }, own: { ok: own.ok, errors: own.errors, stats: Object.assign({}, own.stats, { extras: undefined }) } };
  }
  // Gidiş-dönüş: yeni bir karakter üret, GLB'ye yaz, geri oku, aynı kareleri iki yoldan çiz
  const ch = F.createCharacter({ seed: 3 }); ch.framing = F.computeFraming(ch);
  const glb = F.exportGLB(ch.skel, ch.mesh, {}), g = F.characterFromGLB(glb), fr = ch.framing;
  const rt = []; let minIoU = 1, maxJoint = 0;
  for (const clip of F.CLIP_KEYS) for (const tn of [0.1, 0.37, 0.62, 0.9]) for (const dir of [0, 3, 6]) {
    const C = F.CLIPS[clip];
    const a = F.poseSkin(ch, clip, tn);
    const ra = F.render(ch.mesh, F.skinVertices(ch.mesh, F.skinMatrices(ch.skel, a.world), null, { noClamp: true }), { width: 256, height: 256, yaw: dir * Math.PI / 4, pitch: fr.pitch, scale: fr.scale, cx: fr.cx, cy: fr.cy, ss: 1, outline: false });
    const pose = g.samplePose(clip, tn * C.duration), W = F.poseWorld(g.skel, pose);
    const rb = F.render(g.mesh, F.skinVertices(g.mesh, F.skinMatrices(g.skel, W)), { width: 256, height: 256, yaw: dir * Math.PI / 4, pitch: fr.pitch, scale: fr.scale, cx: fr.cx, cy: fr.cy, ss: 1, outline: false });
    const v = iou(ra.rgba, rb.rgba); minIoU = Math.min(minIoU, v);
    let jd = 0; for (let i = 0; i < W.wpos.length; i++) jd = Math.max(jd, F.v3.dist(W.wpos[i], a.world.wpos[i])); maxJoint = Math.max(maxJoint, jd);
    rt.push({ clip, t: tn, dir, iou: +v.toFixed(4), maxJointDiffCm: +(jd * 100).toFixed(2) });
  }
  console.log('Gidiş-dönüş: GLB\'den yeniden kurulan iskelet, motordaki iskeletten en fazla', (maxJoint * 100).toFixed(2), 'cm sapıyor; en düşük siluet IoU', minIoU.toFixed(4), '(', rt.length, 'örnek )');
  results.roundTrip = { samples: rt.length, minIoU: +minIoU.toFixed(4), maxJointDiffCm: +(maxJoint * 100).toFixed(2), detail: rt, note: 'GLB 30 kare/sn doğrusal anahtarlarla örneklenir; küçük fark ara değerlemeden kaynaklanır.' };
  fs.writeFileSync(path.join(OUT, 'test_glb.json'), JSON.stringify(results, null, 2));
  const bad = Object.values(results).some(r => r.khronos && (r.khronos.errors || !r.own.ok)) || minIoU < 0.9 || maxJoint > 0.015;
  console.log(bad ? 'SONUÇ: BAŞARISIZ' : 'SONUÇ: GLB testleri geçti'); process.exitCode = bad ? 1 : 0;
})();
