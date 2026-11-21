/* Forge 3D — iskelet, ileri kinematik (FK), iki kemikli ters kinematik (IK) ve deri matrisleri.
   Dinlenme (bind) pozunda tüm kemik dönüşleri birimdir; eklem konumları vücut ölçülerinden hesaplanır.
   Koordinatlar: metre, Y yukarı, karakter +Z yönüne bakar (glTF kuralı). Karakterin sağı -X, solu +X. */
(function (root) {
  'use strict';
  const F = root.Forge3D = root.Forge3D || {};
  const { v3, q, m4, clamp } = F;

  // Varsayılan vücut ölçüleri (metre). Görsel analizi ve kullanıcı kaydırıcıları bunları değiştirir.
  const DEFAULT_BODY = {
    height: 1.80, headH: 0.265, headW: 0.20, neckLen: 0.06,
    shoulderW: 0.47, chestW: 0.40, chestD: 0.25, waistW: 0.31, waistD: 0.20, hipW: 0.35, hipD: 0.22,
    upperArm: 0.29, foreArm: 0.26, hand: 0.095, armR: 0.064, foreR: 0.053,
    thigh: 0.43, shin: 0.42, ankleH: 0.085, footL: 0.26, footW: 0.115, thighR: 0.092, shinR: 0.064,
    legGap: 0.12, armSpread: 0.30, elbowBend: 0.18, bulk: 1.0,
  };

  const BONES = [
    ['root', -1], ['hips', 0], ['spine', 1], ['chest', 2], ['neck', 3], ['head', 4],
    ['shoulder.L', 3], ['upperarm.L', 6], ['forearm.L', 7], ['hand.L', 8],
    ['shoulder.R', 3], ['upperarm.R', 10], ['forearm.R', 11], ['hand.R', 12],
    ['thigh.L', 1], ['shin.L', 14], ['foot.L', 15], ['toe.L', 16],
    ['thigh.R', 1], ['shin.R', 18], ['foot.R', 19], ['toe.R', 20],
    ['weapon', 13], ['cape.1', 3], ['cape.2', 23], ['shield', 9],
  ];

  function resolveBody(b) {
    const B = Object.assign({}, DEFAULT_BODY, b || {});
    // Toplam boy = ayak bileği + baldır + uyluk + gövde + boyun + baş. Gövde kalanı alır.
    const legs = B.ankleH + B.shin + B.thigh;
    B.hipY = legs + 0.03;                      // kalça ekleminin biraz üstü pelvis merkezi
    B.torso = Math.max(0.35, B.height - legs - B.neckLen - B.headH - 0.03);
    B.chestY = B.hipY + B.torso * 0.45;
    B.neckY = B.hipY + B.torso;
    B.headY = B.neckY + B.neckLen;
    B.shoulderY = B.neckY - 0.045;
    B.capeBottomY = Math.max(0.28, B.ankleH + B.shin * 0.45);
    return B;
  }

  function buildSkeleton(body) {
    const B = resolveBody(body);
    const P = {};
    const sx = B.shoulderW / 2;
    P.root = [0, 0, 0];
    P.hips = [0, B.hipY, 0];
    P.spine = [0, B.hipY + B.torso * 0.16, 0];
    P.chest = [0, B.chestY, 0];
    P.neck = [0, B.neckY, 0];
    P.head = [0, B.headY, 0.005];
    // Kollar A-pozunda: omuzdan aşağı ve hafif dışa; dirsek hafif bükülü (geriye).
    const spread = B.armSpread, bend = B.elbowBend;
    for (const [side, s] of [['L', 1], ['R', -1]]) {
      P['shoulder.' + side] = [s * 0.06, B.shoulderY + 0.005, -0.01];
      const sh = [s * sx, B.shoulderY - 0.02, -0.01];
      P['upperarm.' + side] = sh;
      const d1 = [s * Math.sin(spread), -Math.cos(spread), -0.04];
      const el = v3.add(sh, v3.scale(v3.norm(d1), B.upperArm));
      P['forearm.' + side] = el;
      const d2 = [s * Math.sin(spread * 0.75), -Math.cos(spread * 0.75) * Math.cos(bend), Math.sin(bend)];
      const wr = v3.add(el, v3.scale(v3.norm(d2), B.foreArm));
      P['hand.' + side] = wr;
      const hx = s * (B.legGap / 2 + B.thighR * 0.35);
      P['thigh.' + side] = [hx, B.hipY - 0.06, 0];
      P['shin.' + side] = [hx * 1.04, B.ankleH + B.shin, 0.012];
      P['foot.' + side] = [hx * 1.08, B.ankleH, 0];
      P['toe.' + side] = [hx * 1.10, 0.025, B.footL * 0.62];
    }
    const handR = P['hand.R'];
    P.weapon = v3.add(handR, v3.scale(v3.norm(v3.sub(handR, P['forearm.R'])), B.hand * 0.55));
    P['cape.1'] = [0, B.shoulderY - 0.02, -B.chestD * 0.62];
    P['cape.2'] = [0, B.hipY - 0.05, -B.chestD * 0.75];
    const handL = P['hand.L'];
    P.shield = v3.add(handL, [0.05, 0.05, 0.02]);

    const bones = BONES.map(([name, parent], i) => {
      const w = P[name];
      const pw = parent >= 0 ? P[BONES[parent][0]] : [0, 0, 0];
      return { name, parent, index: i, restWorld: w, restLocal: v3.sub(w, pw) };
    });
    const index = {}; bones.forEach(b => { index[b.name] = b.index; });
    const invBind = bones.map(b => m4.fromTRS(v3.scale(b.restWorld, -1)));
    return { body: B, bones, index, invBind };
  }

  function restPose(skel) {
    return { rot: skel.bones.map(() => [0, 0, 0, 1]), trans: skel.bones.map(() => [0, 0, 0]) };
  }

  // FK: yerel dönüş + (dinlenme ofseti + ek öteleme) -> dünya matrisleri
  function poseWorld(skel, pose) {
    const n = skel.bones.length, mats = new Array(n), wrot = new Array(n), wpos = new Array(n);
    for (let i = 0; i < n; i++) {
      const b = skel.bones[i];
      const t = v3.add(b.restLocal, pose.trans[i] || [0, 0, 0]);
      const local = m4.fromTRS(t, pose.rot[i]);
      if (b.parent < 0) { mats[i] = local; wrot[i] = pose.rot[i].slice(); }
      else { mats[i] = m4.mul(mats[b.parent], local); wrot[i] = q.norm(q.mul(wrot[b.parent], pose.rot[i])); }
      wpos[i] = m4.translation(mats[i]);
    }
    return { mats, wrot, wpos };
  }

  function skinMatrices(skel, world) {
    const n = skel.bones.length, out = new Float32Array(n * 16);
    for (let i = 0; i < n; i++) out.set(m4.mul(world.mats[i], skel.invBind[i]), i * 16);
    return out;
  }

  function mat3ToQuat(m) { // m: [xx,xy,xz, yx,yy,yz, zx,zy,zz] sütunlar x,y,z eksenleri
    const [m00, m10, m20, m01, m11, m21, m02, m12, m22] = m;
    const tr = m00 + m11 + m22; let x, y, z, w;
    if (tr > 0) { const s = Math.sqrt(tr + 1) * 2; w = 0.25 * s; x = (m21 - m12) / s; y = (m02 - m20) / s; z = (m10 - m01) / s; }
    else if (m00 > m11 && m00 > m22) { const s = Math.sqrt(1 + m00 - m11 - m22) * 2; w = (m21 - m12) / s; x = 0.25 * s; y = (m01 + m10) / s; z = (m02 + m20) / s; }
    else if (m11 > m22) { const s = Math.sqrt(1 + m11 - m00 - m22) * 2; w = (m02 - m20) / s; x = (m01 + m10) / s; y = 0.25 * s; z = (m12 + m21) / s; }
    else { const s = Math.sqrt(1 + m22 - m00 - m11) * 2; w = (m10 - m01) / s; x = (m02 + m20) / s; y = (m12 + m21) / s; z = 0.25 * s; }
    return q.norm([x, y, z, w]);
  }
  // (yAxis, zHint) ile tanımlı dik çerçeve
  function frame(yAxis, zHint) {
    const y = v3.norm(yAxis); let z = v3.sub(zHint, v3.scale(y, v3.dot(zHint, y)));
    if (v3.len(z) < 1e-6) z = Math.abs(y[2]) < 0.9 ? v3.sub([0, 0, 1], v3.scale(y, y[2])) : v3.sub([1, 0, 0], v3.scale(y, y[0]));
    z = v3.norm(z); const x = v3.cross(y, z); return [x, y, z];
  }
  function rotBetweenFrames(fa, fb) { // fb = R * fa
    // R = Fb * Fa^T
    const R = new Array(9);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
      R[c * 3 + r] = fb[0][r] * fa[0][c] + fb[1][r] * fa[1][c] + fb[2][r] * fa[2][c];
    }
    return mat3ToQuat(R);
  }

  /* İki kemikli analitik IK. a: üst kemik (uyluk/üst kol), b: alt kemik, c: uç eklem (ayak bileği/bilek).
     target: c için dünya hedefi; pole: dizin/dirseğin bükülme yönü (dünya). restPole: dinlenmedeki bükülme yönü.
     pose.rot[a] ve pose.rot[b] yerinde güncellenir. Dönüş: ulaşılan uç konumu. */
  function ik2(skel, pose, a, b, c, target, pole, restPole) {
    const bones = skel.bones;
    const pa = bones[a].restWorld, pb = bones[b].restWorld, pc = bones[c].restWorld;
    const l1 = v3.dist(pa, pb), l2 = v3.dist(pb, pc);
    const W = poseWorld(skel, pose);
    const parentRot = W.wrot[bones[a].parent];
    const A = W.wpos[a];
    let toT = v3.sub(target, A); let d = v3.len(toT);
    const maxD = (l1 + l2) * 0.9995, minD = Math.abs(l1 - l2) + 1e-4;
    d = clamp(d, minD, maxD);
    const dir = v3.norm(toT);
    const bend = frame(dir, pole)[2];
    const cosA = clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1), sinA = Math.sqrt(1 - cosA * cosA);
    const K = v3.add(A, v3.add(v3.scale(dir, l1 * cosA), v3.scale(bend, l1 * sinA)));
    const T = v3.add(A, v3.scale(dir, d));
    // Dinlenme çerçeveleri
    const restFa = frame(v3.sub(pb, pa), restPole), restFb = frame(v3.sub(pc, pb), restPole);
    const fa = frame(v3.sub(K, A), bend), fb = frame(v3.sub(T, K), bend);
    const wa = rotBetweenFrames(restFa, fa), wb = rotBetweenFrames(restFb, fb);
    pose.rot[a] = q.norm(q.mul(q.conj(parentRot), wa));
    pose.rot[b] = q.norm(q.mul(q.conj(wa), wb));
    return T;
  }

  // Bir kemiğin dünya dönüşünü doğrudan ayarla (ör. ayağı zemine paralel tut)
  function setWorldRot(skel, pose, i, worldQ) {
    const W = poseWorld(skel, pose);
    const p = skel.bones[i].parent;
    pose.rot[i] = q.norm(q.mul(q.conj(W.wrot[p]), worldQ));
  }

  F.DEFAULT_BODY = DEFAULT_BODY; F.BONES = BONES; F.resolveBody = resolveBody;
  F.buildSkeleton = buildSkeleton; F.restPose = restPose; F.poseWorld = poseWorld;
  F.skinMatrices = skinMatrices; F.ik2 = ik2; F.setWorldRot = setWorldRot; F.frame = frame; F.rotBetweenFrames = rotBetweenFrames;
})(typeof self !== 'undefined' ? self : globalThis);
