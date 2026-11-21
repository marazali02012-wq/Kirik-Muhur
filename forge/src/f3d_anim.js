/* Forge 3D — 3B iskelet üzerinde prosedürel animasyonlar.
   idle (bekleme), walk (yürüyüş), attack (saldırı), hurt (darbe alma), death (ölüm).
   - Bacaklar iki kemikli IK ile çözülür. Basan ayak, zeminle aynı hızda geriye kayar (yerinde yürüyüş);
     oyun karakteri bu hızla ilerlettiğinde ayak dünyada sabit kalır (kayma yok). Hız manifestte verilir.
   - Saldırıda bilek hedefi + kılıç yönü anahtar kareleri, sağ kol IK; silah ele bağlıdır, kolla birlikte hareket eder.
   - Ölüm: dizlerin üzerine çöküp öne kapanma; ayak parmakları zeminde sabit, hiçbir eklem zeminin altına inmez. */
(function (root) {
  'use strict';
  const F = root.Forge3D = root.Forge3D || {};
  const { v3, q, clamp } = F;

  // Düzensiz aralıklı Catmull-Rom (Hermite) iz takibi. keys: [[t, değer], ...] değer sayı veya dizi
  function track(keys, t) {
    const n = keys.length; if (t <= keys[0][0]) return clone(keys[0][1]); if (t >= keys[n - 1][0]) return clone(keys[n - 1][1]);
    let k = 0; while (k < n - 2 && t > keys[k + 1][0]) k++;
    const [t0, v0] = keys[k], [t1, v1] = keys[k + 1], h = t1 - t0, s = (t - t0) / h;
    // Aşmasız (monoton) teğetler: komşu eğimler zıt işaretliyse teğet 0 — topuk zemine girmez, eklem geri tepmez
    const tan = i => {
      if (i <= 0 || i >= n - 1) return null;
      const [ta, va] = keys[i - 1], [tm, vm] = keys[i], [tb, vb] = keys[i + 1];
      const one = (a, m, b) => { const d0 = (m - a) / (tm - ta), d1 = (b - m) / (tb - tm); if (d0 * d1 <= 0) return 0; const tt = (b - a) / (tb - ta); const lim = 3 * Math.min(Math.abs(d0), Math.abs(d1)); return Math.sign(tt) * Math.min(Math.abs(tt), lim); };
      return typeof va === 'number' ? one(va, vm, vb) : va.map((_, k) => one(va[k], vm[k], vb[k]));
    };
    const m0 = tan(k), m1 = tan(k + 1);
    const h00 = 2 * s * s * s - 3 * s * s + 1, h10 = s * s * s - 2 * s * s + s, h01 = -2 * s * s * s + 3 * s * s, h11 = s * s * s - s * s;
    if (typeof v0 === 'number') return h00 * v0 + h01 * v1 + (m0 == null ? 0 : h10 * h * m0) + (m1 == null ? 0 : h11 * h * m1);
    return v0.map((_, i) => h00 * v0[i] + h01 * v1[i] + (m0 == null ? 0 : h10 * h * m0[i]) + (m1 == null ? 0 : h11 * h * m1[i]));
  }
  function sub(a, b, s) { return typeof a === 'number' ? (a - b) * s : a.map((x, i) => (x - b[i]) * s); }
  function clone(v) { return typeof v === 'number' ? v : v.slice(); }

  const TAU = Math.PI * 2;

  function makeCtx(skel) {
    const J = skel.index, Pr = n => skel.bones[J[n]].restWorld;
    const pose = F.restPose(skel);
    const ctx = {
      skel, J, pose, Pr,
      E(name, x, y, z) { pose.rot[J[name]] = q.euler(x || 0, y || 0, z || 0); },
      T(name, t) { pose.trans[J[name]] = t; },
      leg(side, ankle, pitch, poleOut) {
        const s = side === 'L' ? 1 : -1;
        F.ik2(skel, pose, J['thigh.' + side], J['shin.' + side], J['foot.' + side], ankle, poleOut || [0.12 * s, -0.05, 1], [0, 0, 1]);
        F.setWorldRot(skel, pose, J['foot.' + side], q.axisAngle([1, 0, 0], pitch || 0));
      },
      arm(side, wrist, handWorld, pole) {
        const s = side === 'L' ? 1 : -1;
        F.ik2(skel, pose, J['upperarm.' + side], J['forearm.' + side], J['hand.' + side], wrist, pole || [0.5 * s, -0.25, -1], v3.norm([0.2 * s, -0.1, -1]));
        if (handWorld) F.setWorldRot(skel, pose, J['hand.' + side], handWorld);
      },
      // Pelerin: yerçekimine göre sarkar, gövdenin içine giremez (göğüs çerçevesinde daima sırtın arkasında kalır)
      cape(fl1, fl2, sway) {
        const W = F.poseWorld(skel, pose), Wc = W.wrot[J.chest];
        const j1 = J['cape.1'], j2 = J['cape.2'];
        const d1 = v3.norm(v3.sub(Pr('cape.2'), Pr('cape.1')));
        const gl = q.rotate(q.conj(Wc), [0, -1, 0]);
        const solve = fl => { const g = q.rotate(q.axisAngle([1, 0, 0], fl), gl); return v3.norm([g[0] + (sway || 0), g[1], Math.min(g[2], -0.12)]); };
        pose.rot[j1] = q.fromTo(d1, solve(fl1));
        const W1 = q.mul(Wc, pose.rot[j1]);
        // alt parça kalça çerçevesinde sınırlanır: gövde öne kapansa da pelerin kalçanın arkasından aşağı sarkar
        const Wh = W.wrot[J.hips], gh = q.rotate(q.conj(Wh), [0, -1, 0]);
        const g2 = q.rotate(q.axisAngle([1, 0, 0], fl2), gh), D2h = v3.norm([g2[0] + (sway || 0), g2[1], Math.min(g2[2], -0.18)]);
        let D2 = q.rotate(Wh, D2h);
        const D1w = q.rotate(W1, d1);
        // iki parça arasındaki kıvrım en fazla ~60°: deri gerilmesini sınırlar
        const maxBend = 1.05, ang = Math.acos(clamp(v3.dot(D1w, D2), -1, 1));
        if (ang > maxBend) { const k = maxBend / ang; D2 = q.rotate(q.slerp([0, 0, 0, 1], q.fromTo(D1w, D2), k), D1w); }
        // zemin çarpışması: etek ucu zeminin üstünde kalır (geriye doğru yatar)
        pose.rot[j2] = q.fromTo(d1, q.rotate(q.conj(W1), D2));
        // zemin çarpışması: eteğin en derin noktası (orta-arka) zeminin üstünde kalana dek etek geriye yatırılır
        const Bd = skel.body, c2 = Pr('cape.2');
        const hem = [0, Bd.capeBottomY - c2[1] - 0.02, -(Bd.chestD * 1.17 * Bd.bulk) - 0.03 - c2[2]];
        const p2 = F.poseWorld(skel, pose).wpos[j2];
        const hemY = () => p2[1] + q.rotate(q.mul(W1, pose.rot[j2]), hem)[1];
        if (hemY() < 0.025) {
          let hz = [D2[0], 0, D2[2]]; if (v3.len(hz) < 0.1) hz = q.rotate(Wh, [0, 0, -1]); hz = v3.norm([hz[0], 0, hz[2]]);
          for (let beta = Math.asin(clamp(-D2[1], -1, 1)); beta > -0.9; beta -= 0.04) {
            const Dn = v3.norm([hz[0] * Math.cos(beta), -Math.sin(beta), hz[2] * Math.cos(beta)]);
            pose.rot[j2] = q.fromTo(d1, q.rotate(q.conj(W1), Dn));
            if (hemY() >= 0.025) break;
          }
        }
      },
      bladeRot(dir, flatHint) { // el kemiği için dünya dönüşü: kılıç dinlenme yönü -> dir
        const wf = F.weaponFrame(skel, Pr);
        return F.rotBetweenFrames(F.frame(wf.dir, wf.side), F.frame(dir, flatHint || [0, 1, 0]));
      },
    };
    return ctx;
  }

  // ---------------- IDLE ----------------
  function idle(skel, t) {
    const c = makeCtx(skel), B = skel.body, ph = t * TAU;
    c.T('hips', [0.006 * Math.sin(ph), -0.014 - 0.007 * Math.sin(ph), 0]);
    c.E('spine', 0.02 + 0.01 * Math.sin(ph), 0, 0);
    c.E('chest', -0.025 * Math.sin(ph), 0, 0.005 * Math.sin(ph));
    c.E('neck', 0.02, 0, 0); c.E('head', 0.03 * Math.sin(ph + 1), 0.06 * Math.sin(ph * 0.5 + 0.5), 0);
    c.E('upperarm.L', 0.04 * Math.sin(ph + 0.5), 0, 0.03 * Math.sin(ph));
    c.E('forearm.L', -0.12 - 0.04 * Math.sin(ph + 0.8), 0, 0);
    c.E('upperarm.R', 0.03 * Math.sin(ph + 0.5), 0, -0.03 * Math.sin(ph));
    c.E('forearm.R', -0.10 - 0.04 * Math.sin(ph + 0.8), 0, 0);
    for (const s of ['L', 'R']) c.leg(s, c.Pr('foot.' + s), 0);
    c.cape(0.02 + 0.02 * Math.sin(ph), 0.03 + 0.03 * Math.sin(ph + 1), 0);
    return { pose: c.pose, contacts: { L: 1, R: 1 } };
  }

  // ---------------- WALK ----------------
  const WALK = { half: 0.22, duty: 0.6, lift: 0.11, duration: 0.9 };
  WALK.stride = (2 * WALK.half) / WALK.duty; // döngü başına zemin mesafesi (m)
  WALK.speed = WALK.stride / WALK.duration;  // m/s
  function footTrack(ph, B) {
    const { half, duty, lift } = WALK;
    if (ph < duty) { const s = ph / duty; return { z: half - 2 * half * s, y: B.ankleH, pitch: 0, stance: 1 }; }
    const s = (ph - duty) / (1 - duty), e = (1 - Math.cos(Math.PI * s)) / 2;
    const pitch = 0.7 * Math.sin(Math.PI * Math.min(1, s * 1.6)) * (1 - s) - 0.28 * Math.sin(Math.PI * s) * s;
    return { z: -half + 2 * half * e, y: B.ankleH + lift * Math.pow(Math.sin(Math.PI * s), 0.85), pitch, stance: 0, s };
  }
  function walk(skel, t) {
    const c = makeCtx(skel), B = skel.body, ph = t * TAU;
    c.T('hips', [0.02 * Math.sin(ph), -0.05 - 0.018 * Math.cos(2 * ph), 0.0]);
    c.E('hips', 0, -0.09 * Math.cos(ph), 0.03 * Math.sin(ph));
    c.E('spine', 0.06, 0.05 * Math.cos(ph), -0.015 * Math.sin(ph));
    c.E('chest', 0.0, 0.09 * Math.cos(ph), -0.015 * Math.sin(ph));
    c.E('neck', -0.02, -0.03 * Math.cos(ph), 0); c.E('head', -0.03 + 0.02 * Math.cos(2 * ph), 0, 0);
    const swing = Math.cos(ph); // + : sol bacak önde
    c.E('upperarm.L', 0.38 * swing, 0, 0.04);
    c.E('forearm.L', -0.25 - 0.22 * Math.max(0, -swing), 0, 0);
    c.E('upperarm.R', -0.22 * swing, 0, -0.04);
    c.E('forearm.R', -0.2 - 0.15 * Math.max(0, swing), 0, 0);
        const contacts = {};
    for (const [s, off] of [['L', 0], ['R', 0.5]]) {
      const p = (t + off) % 1, f = footTrack(p, B);
      const x = c.Pr('foot.' + s)[0] * 0.92 + (f.stance ? 0 : (s === 'L' ? 1 : -1) * 0.015 * Math.sin(Math.PI * f.s));
      c.leg(s, [x, f.y, f.z], f.pitch);
      contacts[s] = f.stance;
    }
    // silahı yürürken sabit açıda tut (uzun silahlar zemine çarpmaz)
    const wf = F.weaponFrame(skel, c.Pr);
    F.setWorldRot(skel, c.pose, c.J['hand.R'], c.bladeRot(v3.norm([wf.dir[0], wf.dir[1] * 0.85 + 0.12, wf.dir[2]]), [0, 1, 0]));
    c.cape(0.12 + 0.04 * Math.cos(2 * ph), 0.2 + 0.06 * Math.sin(2 * ph), 0.05 * Math.sin(ph));
    return { pose: c.pose, contacts };
  }

  // ---------------- ATTACK ----------------
  function attack(skel, t) {
    const c = makeCtx(skel), B = skel.body;
    const wr0 = c.Pr('hand.R'), wf = F.weaponFrame(skel, c.Pr);
    const K = [0, 0.28, 0.40, 0.52, 0.72, 1.0];
    const wrist = track([[0, wr0], [0.14, [-0.44, 1.18, 0.1]], [0.28, [-0.33, 1.52, -0.12]], [0.34, [-0.24, 1.56, 0.14]], [0.40, [-0.14, 1.30, 0.30]], [0.52, [0.16, 0.98, 0.30]], [0.72, [-0.25, 0.97, 0.18]], [1, wr0]], t);
    const blade = v3.norm(track([[0, wf.dir], [0.14, v3.norm([-0.3, 0.55, 0.78])], [0.21, v3.norm([-0.38, 0.92, -0.05])], [0.28, v3.norm([-0.3, 0.42, -0.86])], [0.34, v3.norm([0.0, 0.97, 0.25])], [0.40, v3.norm([0.72, 0.08, 0.69])], [0.52, v3.norm([0.78, -0.52, 0.34])], [0.72, v3.norm([0.25, -0.6, 0.76])], [1, wf.dir]], t));
    const flat = v3.norm(track([[0, [0, 1, 0]], [0.14, [0.1, 0.6, -0.6]], [0.21, [0.15, 0.2, 0.95]], [0.28, [0.2, 0.3, 0.9]], [0.34, [0.9, 0.0, 0.4]], [0.40, [0, 1, 0.1]], [0.52, [0.3, 0.7, -0.2]], [0.72, [0, 1, 0]], [1, [0, 1, 0]]], t));
    const yaw = track([[0, 0], [0.28, -0.42], [0.40, 0.08], [0.52, 0.36], [0.72, 0.12], [1, 0]], t);
    const lean = track([[0, 0], [0.28, -0.06], [0.40, 0.14], [0.52, 0.2], [0.72, 0.07], [1, 0]], t);
    const hip = track([[0, [0, -0.01, 0]], [0.28, [0, -0.03, -0.04]], [0.40, [0, -0.07, 0.05]], [0.52, [0, -0.08, 0.07]], [0.72, [0, -0.04, 0.02]], [1, [0, -0.01, 0]]], t);
    c.T('hips', hip);
    c.E('hips', 0, yaw * 0.35, 0);
    c.E('spine', lean * 0.5, yaw * 0.35, 0);
    c.E('chest', lean * 0.5, yaw * 0.3, 0);
    c.E('neck', 0, -yaw * 0.4, 0); c.E('head', -lean * 0.4, -yaw * 0.35, 0);
    const la = track([[0, [0, 0, 0]], [0.28, [-0.35, 0, 0.18]], [0.40, [0.2, 0, 0.3]], [0.52, [0.45, 0, 0.38]], [0.72, [0.15, 0, 0.12]], [1, [0, 0, 0]]], t);
    c.E('upperarm.L', la[0], la[1], la[2]); c.E('forearm.L', -0.35 - 0.3 * Math.abs(la[0]), 0, 0);
    for (const s of ['L', 'R']) c.leg(s, c.Pr('foot.' + s), 0);
    c.arm('R', wrist, c.bladeRot(blade, flat), [-0.6, -0.2, -0.8]);
    c.cape(0.06 + 0.2 * Math.abs(yaw), 0.1 + 0.3 * Math.abs(yaw), -yaw * 0.25);
    return { pose: c.pose, contacts: { L: 1, R: 1 }, strike: t > 0.3 && t < 0.56 };
  }

  // ---------------- HURT ----------------
  function hurt(skel, t) {
    const c = makeCtx(skel);
    const k = t < 0.16 ? Math.sin((t / 0.16) * Math.PI / 2) : Math.exp(-(t - 0.16) * 4.2) * (1 - (t - 0.16) / 0.84 * 0.15);
    const w = clamp(k, 0, 1) * (t > 0.95 ? (1 - t) / 0.05 : 1);
    c.T('hips', [0, -0.012 - 0.04 * w, -0.07 * w]);
    c.E('hips', -0.05 * w, 0.06 * w, 0);
    c.E('spine', -0.16 * w, 0.05 * w, 0.03 * w); c.E('chest', -0.14 * w, 0.06 * w, 0);
    c.E('neck', -0.12 * w, 0, 0); c.E('head', -0.28 * w, -0.1 * w, 0.06 * w);
    c.E('upperarm.L', -0.35 * w, 0, 0.42 * w); c.E('forearm.L', -0.12 - 0.5 * w, 0, 0);
    c.E('upperarm.R', -0.25 * w, 0, -0.35 * w); c.E('forearm.R', -0.1 - 0.4 * w, 0, 0);
    for (const s of ['L', 'R']) c.leg(s, c.Pr('foot.' + s), 0);
    c.cape(0.05 + 0.1 * w, 0.08 + 0.25 * w, 0);
    return { pose: c.pose, contacts: { L: 1, R: 1 }, tint: [1, 0.2, 0.14, 0.24 * clamp(k * 1.2, 0, 1) * (t < 0.45 ? 1 : 0)] };
  }

  // ---------------- DEATH ----------------
  function death(skel, t) {
    const c = makeCtx(skel), B = skel.body;
    const l1 = v3.dist(c.Pr('thigh.L'), c.Pr('shin.L')), l2 = v3.dist(c.Pr('shin.L'), c.Pr('foot.L'));
    // Ayak, parmak ucu (top) etrafında döner: topuk kalkar, parmak zeminde sabit
    const footPitch = track([[0, 0], [0.2, 0], [0.42, 0.55], [0.6, 0.95], [1, 0.95]], t);
    const ankles = {};
    for (const s of ['L', 'R']) {
      const toe = c.Pr('toe.' + s), an = c.Pr('foot.' + s), off = v3.sub(an, toe);
      const r = q.rotate(q.axisAngle([1, 0, 0], footPitch), off);
      ankles[s] = v3.add(toe, r);
    }
    // Diz yere değdiğinde: diz = bilek + (0, -(ay-0.08), +ileri)
    const aY = ankles.L[1], aZ = ankles.L[2];
    const KY = Math.max(0.105, B.shinR * B.bulk * 1.38 + 0.015); // diz eklemi yüksekliği: diz kapağı/baldır zırhı zeminin üstünde
    const kneeZ = aZ + Math.sqrt(Math.max(0, l2 * l2 - (aY - KY) ** 2));
    const hipOff = B.hipY - c.Pr('thigh.L')[1]; // kalça eklemi -> pelvis merkezi
    const kneelHip = ang => [0, KY + l1 * Math.sin(ang) + hipOff, kneeZ - l1 * Math.cos(ang)];
    const up = kneelHip(Math.PI / 2 - 0.05), sit = kneelHip(0.72);
    const hipAbs = t < 0.62 ? track([[0, [0, B.hipY - 0.01, 0]], [0.18, [0, B.hipY - 0.04, -0.05]], [0.42, [0, (B.hipY + up[1]) / 2 - 0.05, up[2] * 0.6]], [0.62, up]], t)
      : kneelHip(track([[0.62, Math.PI / 2 - 0.05], [0.8, 1.05], [1, 0.72]], t)); // diz yerde kalır: uyluk açısı döndürülür
    c.T('hips', v3.sub(hipAbs, c.Pr('hips')));
    const sp = track([[0, 0], [0.18, -0.22], [0.42, 0.05], [0.62, 0.12], [0.8, 0.5], [1, 0.78]], t);
    const ch = track([[0, 0], [0.18, -0.18], [0.42, 0.0], [0.62, 0.1], [0.8, 0.38], [1, 0.52]], t);
    c.E('spine', sp, 0.04 * Math.sin(t * 9), 0.05 * t); c.E('chest', ch, 0, 0.04 * t);
    c.E('neck', track([[0, 0], [0.18, -0.2], [0.5, 0.2], [1, 0.35]], t), 0, 0);
    c.E('head', track([[0, 0], [0.18, -0.4], [0.5, 0.25], [1, 0.3]], t), 0.15 * t, 0.12 * t);
    for (const s of ['L', 'R']) c.leg(s, ankles[s], footPitch, [0, -0.2, 1]);
    // Kollar: önce savrulur, sonra eller yere
    const sh = skel.style && skel.style.shield;
    const wrL = track([[0, c.Pr('hand.L')], [0.18, [0.42, 1.0, 0.12]], [0.45, [0.38, 0.66, 0.3]], [0.7, sh ? [0.42, 0.42, 0.5] : [0.32, 0.34, 0.55]], [1, sh ? [0.42, 0.3, 0.56] : [0.3, 0.11, 0.62]]], t);
    const wrR = track([[0, c.Pr('hand.R')], [0.18, [-0.44, 1.02, 0.1]], [0.45, [-0.38, 0.66, 0.32]], [0.7, [-0.34, 0.34, 0.55]], [1, [-0.34, 0.11, 0.6]]], t);
    const wf = F.weaponFrame(skel, c.Pr);
    const blade = v3.norm(track([[0, wf.dir], [0.18, v3.norm([-0.35, -0.5, 0.79])], [0.45, v3.norm([-0.7, -0.2, 0.35])], [0.7, v3.norm([-0.8, -0.1, -0.2])], [1, v3.norm([-0.62, 0.0, -0.78])]], t));
    const flat = v3.norm(track([[0, [0, 1, 0]], [0.6, [0.2, 0.9, 0.1]], [1, [0, 1, 0]]], t));
    c.arm('L', wrL, null, [0.6, 0.2, -0.8]);
    c.arm('R', wrR, c.bladeRot(blade, flat), [-0.6, 0.2, -0.8]);
    c.cape(track([[0, 0.03], [0.18, 0.25], [0.6, 0.1], [1, 0.0]], t), track([[0, 0.05], [0.18, 0.4], [0.6, 0.15], [1, 0.0]], t), 0);
    return { pose: c.pose, contacts: { L: 1, R: 1 } };
  }

  const CLIPS = {
    idle: { fn: idle, duration: 1.6, loop: true, label: 'Bekleme' },
    walk: { fn: walk, duration: WALK.duration, loop: true, label: 'Yürüyüş', speed: WALK.speed, stride: WALK.stride },
    attack: { fn: attack, duration: 0.8, loop: false, label: 'Saldırı' },
    hurt: { fn: hurt, duration: 0.5, loop: false, label: 'Darbe' },
    death: { fn: death, duration: 1.4, loop: false, label: 'Ölüm', holdLast: true },
  };
  const CLIP_KEYS = ['idle', 'walk', 'attack', 'hurt', 'death'];

  // Sprite karesi zamanı: döngülü ve saldırı için i/8; ölüm & darbe için son kare animasyonun sonu
  function frameTime(clip, i, n) { const c = CLIPS[clip]; return c.holdLast || clip === 'hurt' ? i / (n - 1) : i / n; }
  function sample(skel, clip, t) { return CLIPS[clip].fn(skel, t); }

  F.track = track; F.CLIPS = CLIPS; F.CLIP_KEYS = CLIP_KEYS; F.WALK = WALK; F.sampleClip = sample; F.frameTime = frameTime;
})(typeof self !== 'undefined' ? self : globalThis);
