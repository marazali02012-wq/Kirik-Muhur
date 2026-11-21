/* Forge 3D — prosedürel insan biçimli savaşçı geometrisi.
   Gerçek vertex, normal, UV, renk, malzeme, kemik indeksi ve deri ağırlıkları üretir.
   Baş, boyun, gövde, iki kol, iki bacak, eller, ayaklar (çizme), zırh parçaları, pelerin, kumaş önlük ve silah.
   Görünmeyen yüzeyler (sırt, yanlar) tek resimden bilinemez: bu bölgelerin rengi TAHMİNİDİR ve
   mesh.estimatedParts listesinde işaretlenir. */
(function (root) {
  'use strict';
  const F = root.Forge3D = root.Forge3D || {};
  const { v3, q, clamp, rng } = F;

  const MAT = { skin: 0, metal: 1, cloth: 2, leather: 3, hair: 4, blade: 5, trim: 6, gem: 7, dark: 8, under: 9 };
  const MAT_NAMES = Object.keys(MAT);
  // Malzeme gölgeleme parametreleri: [parlaklık (specular), sertlik, metallik, kenar ışığı]
  const MAT_SHADE = [
    [0.10, 12, 0.0, 0.25], [0.65, 40, 0.9, 0.45], [0.06, 8, 0.0, 0.30], [0.18, 16, 0.0, 0.25], [0.12, 10, 0.0, 0.30],
    [0.95, 70, 1.0, 0.55], [0.75, 36, 1.0, 0.45], [0.60, 50, 0.2, 0.60], [0.05, 8, 0.0, 0.10], [0.08, 8, 0.0, 0.25],
  ];

  const DEFAULT_PALETTE = {
    skin: [214, 168, 138], metal: [150, 160, 182], trim: [205, 168, 92], cloth: [44, 66, 150], leather: [96, 64, 44],
    hair: [36, 40, 62], blade: [208, 220, 236], gem: [70, 150, 255], dark: [24, 22, 30], under: [54, 58, 86],
  };
  const DEFAULT_STYLE = {
    helmet: 'circlet', hair: 'spiky', cape: true, tabard: true, pauldrons: 'large', armor: 'heavy',
    weapon: 'sword', shield: false, belt: true,
  };

  function Builder() {
    this.pos = []; this.nrm = []; this.uv = []; this.col = []; this.mat = []; this.jnt = []; this.wgt = []; this.part = [];
    this.idx = []; this.parts = []; this.cur = null;
  }
  Builder.prototype.beginPart = function (name, opts) {
    this.cur = { name, start: this.pos.length / 3, istart: this.idx.length, doubleSided: !!(opts && opts.doubleSided), estimated: !!(opts && opts.estimated) };
    this.parts.push(this.cur); return this.parts.length - 1;
  };
  Builder.prototype.endPart = function () { const c = this.cur; c.end = this.pos.length / 3; c.iend = this.idx.length; this.cur = null; };
  Builder.prototype.vert = function (p, n, uv, col, mat, wts) {
    this.pos.push(p[0], p[1], p[2]); this.nrm.push(n[0], n[1], n[2]); this.uv.push(uv[0], uv[1]);
    this.col.push(col[0] / 255, col[1] / 255, col[2] / 255); this.mat.push(mat); this.part.push(this.parts.length - 1);
    const w = normWeights(wts);
    for (let k = 0; k < 4; k++) { this.jnt.push(w[k] ? w[k][0] : 0); this.wgt.push(w[k] ? w[k][1] : 0); }
    return this.pos.length / 3 - 1;
  };
  function normWeights(wts) {
    const m = new Map();
    for (const [b, w] of wts) if (w > 1e-4) m.set(b, (m.get(b) || 0) + w);
    let arr = [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4);
    const s = arr.reduce((a, x) => a + x[1], 0) || 1;
    arr = arr.map(([b, w]) => [b, w / s]);
    return arr;
  }

  /* Halkalardan tüp: rings[i] = {c, t (eksen), side (yanal referans), rx, rz, n (kareleşme), col(fn veya dizi), mat, w}
     Her halkada segs+1 vertex (UV dikişi için). Normaller merkezi farkla hesaplanır. */
  Builder.prototype.tube = function (rings, segs, opts) {
    opts = opts || {};
    const R = rings.length, base = this.pos.length / 3, grid = [];
    for (let i = 0; i < R; i++) {
      const r = rings[i];
      const t = v3.norm(r.t);
      let sideRef = r.side || [1, 0, 0];
      let ax = v3.norm(v3.sub(sideRef, v3.scale(t, v3.dot(sideRef, t))));
      const az = v3.cross(ax, t); // sağ el: ax x t
      const row = [];
      for (let j = 0; j <= segs; j++) {
        const th = (j / segs) * Math.PI * 2 + (opts.phase || 0);
        const c = Math.cos(th), s = Math.sin(th), n = r.n || 2;
        const cx = Math.sign(c) * Math.pow(Math.abs(c), 2 / n), sz = Math.sign(s) * Math.pow(Math.abs(s), 2 / n);
        const off = (r.offFn ? r.offFn(th) : 0);
        const p = v3.add(r.c, v3.add(v3.scale(ax, cx * r.rx * (1 + off)), v3.scale(az, sz * r.rz * (1 + off))));
        row.push(p);
      }
      grid.push({ row, r, ax, az, t });
    }
    // Normaller
    for (let i = 0; i < R; i++) {
      for (let j = 0; j <= segs; j++) {
        const jj = j % segs;
        const pPrev = grid[i].row[(jj - 1 + segs) % segs], pNext = grid[i].row[(jj + 1) % segs];
        const iPrev = Math.max(0, i - 1), iNext = Math.min(R - 1, i + 1);
        let along = v3.sub(grid[iNext].row[jj], grid[iPrev].row[jj]);
        if (v3.len(along) < 1e-7) along = grid[i].t;
        const around = v3.sub(pNext, pPrev);
        let n = v3.norm(v3.cross(around, along));
        const out = v3.sub(grid[i].row[jj], grid[i].r.c);
        if (v3.len(out) > 1e-7 && v3.dot(n, out) < 0) n = v3.scale(n, -1);
        if (v3.len(out) < 1e-7) n = i === 0 ? v3.scale(grid[i].t, -1) : grid[i].t;
        const r = grid[i].r;
        const col = typeof r.col === 'function' ? r.col(j / segs, i / (R - 1)) : r.col;
        const mat = typeof r.mat === 'function' ? r.mat(j / segs, i / (R - 1)) : r.mat;
        this.vert(grid[i].row[j], n, [j / segs, i / (R - 1)], col, mat, r.w);
      }
    }
    for (let i = 0; i < R - 1; i++) for (let j = 0; j < segs; j++) {
      const a = base + i * (segs + 1) + j, b = a + 1, c = a + (segs + 1), d = c + 1;
      this.idx.push(a, c, b, b, c, d);
    }
    const cap = (i, flip) => {
      const g = grid[i], r = g.r; let ctr = r.c;
      const n = flip ? v3.scale(g.t, -1) : g.t;
      if (opts.capBulge) ctr = v3.add(ctr, v3.scale(n, opts.capBulge * Math.min(r.rx, r.rz)));
      const col = typeof r.col === 'function' ? r.col(0.5, i / (R - 1)) : r.col;
      const mat = typeof r.mat === 'function' ? r.mat(0.5, i / (R - 1)) : r.mat;
      const ci = this.vert(ctr, n, [0.5, 0.5], col, mat, r.w);
      const rs = this.pos.length / 3;
      for (let j = 0; j <= segs; j++) this.vert(g.row[j], n, [j / segs, i / (R - 1)], col, mat, r.w);
      for (let j = 0; j < segs; j++) { if (flip) this.idx.push(ci, rs + j, rs + j + 1); else this.idx.push(ci, rs + j + 1, rs + j); }
    };
    if (opts.capStart) cap(0, true);
    if (opts.capEnd) cap(R - 1, false);
    return base;
  };

  // Düz bölümlü eksen boyunca halka listesi oluşturucu
  function ringsAlong(a, b, profile, side, steps) {
    const t = v3.sub(b, a), out = [];
    for (let i = 0; i <= steps; i++) {
      const s = i / steps, pr = profile(s);
      out.push(Object.assign({ c: v3.lerp(a, b, s), t, side }, pr));
    }
    return out;
  }

  // Elipsoid (kutuplarda dejenere değil, küçük yarıçap)
  Builder.prototype.ellipsoid = function (c, rad, axisY, side, segs, rings, col, mat, w, opts) {
    opts = opts || {};
    const t = v3.norm(axisY), list = [];
    const from = opts.from != null ? opts.from : -1, to = opts.to != null ? opts.to : 1;
    for (let i = 0; i <= rings; i++) {
      const s = from + (to - from) * (i / rings);
      const k = Math.sqrt(Math.max(0.0004, 1 - s * s));
      list.push({ c: v3.add(c, v3.scale(t, s * rad[1])), t, side, rx: rad[0] * k, rz: rad[2] * k, n: opts.n || 2, col, mat, w, offFn: opts.offFn });
    }
    return this.tube(list, segs, { capStart: opts.capStart, capEnd: opts.capEnd });
  };

  // Ekstrüde edilmiş 2B çokgen (silah başları, kalkan, toka). poly: [[u,v],...] (dışbükey olmayabilir), düzlem: uAxis, vAxis; kalınlık normal yönünde
  Builder.prototype.extrude = function (poly, origin, uAxis, vAxis, thick, col, mat, w, bevel) {
    const nrm = v3.norm(v3.cross(uAxis, vAxis));
    const P = (p, h) => v3.add(origin, v3.add(v3.add(v3.scale(uAxis, p[0]), v3.scale(vAxis, p[1])), v3.scale(nrm, h)));
    const N = poly.length, b = bevel || 0;
    // ön / arka yüz (fan, kulak kırpma basit: çokgen yıldız-biçimli kabul edilir; merkez noktası kullanılır)
    const cen = poly.reduce((a, p) => [a[0] + p[0] / N, a[1] + p[1] / N], [0, 0]);
    for (const side of [1, -1]) {
      const h = side * thick / 2, ci = this.vert(P(cen, h + side * b), v3.scale(nrm, side), [0.5, 0.5], col, mat, w);
      const s0 = this.pos.length / 3;
      for (let i = 0; i < N; i++) this.vert(P(poly[i], h), v3.scale(nrm, side), [i / N, side > 0 ? 0 : 1], col, mat, w);
      for (let i = 0; i < N; i++) { const a = s0 + i, bb = s0 + (i + 1) % N; if (side > 0) this.idx.push(ci, a, bb); else this.idx.push(ci, bb, a); }
    }
    // kenarlar
    for (let i = 0; i < N; i++) {
      const p0 = poly[i], p1 = poly[(i + 1) % N];
      const e = v3.norm(v3.sub(P(p1, 0), P(p0, 0)));
      const sn = v3.norm(v3.cross(e, nrm));
      const s0 = this.pos.length / 3;
      this.vert(P(p0, thick / 2), sn, [i / N, 0], col, mat, w); this.vert(P(p1, thick / 2), sn, [(i + 1) / N, 0], col, mat, w);
      this.vert(P(p0, -thick / 2), sn, [i / N, 1], col, mat, w); this.vert(P(p1, -thick / 2), sn, [(i + 1) / N, 1], col, mat, w);
      this.idx.push(s0, s0 + 2, s0 + 1, s0 + 1, s0 + 2, s0 + 3);
    }
  };

  function finalizeOrientation(B) {
    // Üçgen sarımını vertex normallerine göre dışa bakacak şekilde düzelt (CCW = ön yüz)
    const P = B.pos, N = B.nrm, I = B.idx;
    for (let t = 0; t < I.length; t += 3) {
      const a = I[t] * 3, b = I[t + 1] * 3, c = I[t + 2] * 3;
      const e1 = [P[b] - P[a], P[b + 1] - P[a + 1], P[b + 2] - P[a + 2]], e2 = [P[c] - P[a], P[c + 1] - P[a + 1], P[c + 2] - P[a + 2]];
      const fn = v3.cross(e1, e2);
      const vn = [N[a] + N[b] + N[c], N[a + 1] + N[b + 1] + N[c + 1], N[a + 2] + N[b + 2] + N[c + 2]];
      if (v3.dot(fn, vn) < 0) { const tmp = I[t + 1]; I[t + 1] = I[t + 2]; I[t + 2] = tmp; }
    }
  }

  const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  const shade = (c, k) => [clamp(c[0] * k, 0, 255), clamp(c[1] * k, 0, 255), clamp(c[2] * k, 0, 255)];

  /* Ana üretici. skel: buildSkeleton çıktısı. pal: renkler. st: stil. */
  function buildWarriorMesh(skel, palIn, stIn, seed) {
    const pal = Object.assign({}, DEFAULT_PALETTE, palIn || {});
    const st = Object.assign({}, DEFAULT_STYLE, stIn || {});
    const Bd = skel.body, J = skel.index, P = name => skel.bones[J[name]].restWorld;
    const bk = Bd.bulk, heavy = st.armor === 'heavy' ? 1 : st.armor === 'medium' ? 0.6 : st.armor === 'light' ? 0.25 : 0;
    const robe = st.armor === 'robe';
    const R = rng(seed || 7);
    const B = new Builder();
    const W = (...pairs) => { const o = []; for (let i = 0; i < pairs.length; i += 2) o.push([J[pairs[i]], pairs[i + 1]]); return o; };
    const metal = pal.metal, trim = pal.trim, cloth = pal.cloth, under = pal.under;

    // ---------- GÖVDE ----------
    B.beginPart('torso');
    const yC = Bd.hipY - 0.11, yH = Bd.hipY, yW = Bd.hipY + Bd.torso * 0.28, yLc = Bd.hipY + Bd.torso * 0.55, yCh = Bd.hipY + Bd.torso * 0.75, yS = Bd.shoulderY, yN = Bd.neckY + 0.01;
    const torsoCol = robe ? cloth : (heavy > 0.3 ? metal : under);
    const torsoMat = robe ? MAT.cloth : (heavy > 0.3 ? MAT.metal : MAT.under);
    const tr = [
      { y: yC, rx: Bd.hipW * 0.30, rz: Bd.hipD * 0.35, w: W('hips', 1), col: under, mat: MAT.under },
      { y: yC + 0.04, rx: Bd.hipW * 0.46, rz: Bd.hipD * 0.47, w: W('hips', 1), col: under, mat: MAT.under },
      { y: yH, rx: Bd.hipW * 0.52 * bk, rz: Bd.hipD * 0.52 * bk, w: W('hips', 1), col: under, mat: MAT.under },
      { y: (yH + yW) / 2, rx: Bd.waistW * 0.52 * bk, rz: Bd.waistD * 0.52 * bk, w: W('hips', 0.6, 'spine', 0.4), col: torsoCol, mat: torsoMat },
      { y: yW, rx: Bd.waistW * 0.5 * bk, rz: Bd.waistD * 0.5 * bk, w: W('spine', 0.8, 'hips', 0.2), col: torsoCol, mat: torsoMat },
      { y: yLc, rx: Bd.chestW * 0.5 * bk, rz: Bd.chestD * 0.5 * bk, w: W('spine', 0.5, 'chest', 0.5), col: torsoCol, mat: torsoMat },
      { y: yCh, rx: Bd.chestW * 0.55 * bk, rz: Bd.chestD * 0.55 * bk, w: W('chest', 1), col: torsoCol, mat: torsoMat },
      { y: (yCh + yS) / 2, rx: Bd.shoulderW * 0.47 * bk, rz: Bd.chestD * 0.5 * bk, w: W('chest', 1), col: torsoCol, mat: torsoMat },
      { y: yS, rx: Bd.shoulderW * 0.36, rz: Bd.chestD * 0.40, w: W('chest', 1), col: torsoCol, mat: torsoMat },
      { y: yN - 0.02, rx: 0.075, rz: 0.07, w: W('chest', 0.6, 'neck', 0.4), col: under, mat: MAT.under },
    ].map(r => ({ c: [0, r.y, r.y > yLc ? -0.012 : 0], t: [0, 1, 0], side: [1, 0, 0], rx: r.rx, rz: r.rz, n: 2.6, col: r.col, mat: r.mat, w: r.w }));
    B.tube(tr, 20, { capStart: true });
    B.endPart();

    // Göğüs zırhı plakası (ön kabuk) + altın kenar
    if (heavy > 0.3 && !robe) {
      B.beginPart('breastplate');
      const rows = [];
      const n = 7;
      for (let i = 0; i <= n; i++) {
        const s = i / n, y = yW + (yS - 0.02 - yW) * s;
        const wdt = (Bd.waistW + (Bd.chestW * 1.08 - Bd.waistW) * Math.min(1, s * 1.5)) * 0.5 * bk * 1.07;
        const dep = (Bd.waistD + (Bd.chestD * 1.06 - Bd.waistD) * Math.min(1, s * 1.5)) * 0.5 * bk * 1.12;
        const edge = i === 0 || i === n;
        rows.push({ c: [0, y, y > yLc ? -0.006 : 0.004], t: [0, 1, 0], side: [1, 0, 0], rx: wdt, rz: dep * (s > 0.85 ? 0.92 : 1), n: 2.4,
          col: (u) => edge ? trim : (Math.abs(u - 0.75) < 0.02 ? trim : shade(metal, 1.0 + 0.08 * Math.cos(u * 12.5))),
          mat: (u) => edge || Math.abs(u - 0.75) < 0.02 ? MAT.trim : MAT.metal,
          w: s < 0.3 ? W('spine', 0.8, 'hips', 0.2) : s < 0.6 ? W('spine', 0.5, 'chest', 0.5) : W('chest', 1) });
      }
      B.tube(rows, 24);
      B.endPart();
      // Göğüs mücevheri
      B.beginPart('chest_gem');
      B.ellipsoid([0, yCh + 0.02, Bd.chestD * 0.62 * bk + 0.012], [0.022, 0.03, 0.012], [0, 1, 0], [1, 0, 0], 8, 5, pal.gem, MAT.gem, W('chest', 1));
      B.endPart();
    }

    // ---------- BOYUN & BAŞ ----------
    B.beginPart('neck');
    B.tube(ringsAlong([0, Bd.neckY - 0.03, -0.005], [0, Bd.headY + 0.04, 0.0], s => ({ rx: 0.055, rz: 0.058, col: pal.skin, mat: MAT.skin, w: s < 0.5 ? W('neck', 1) : W('neck', 0.5, 'head', 0.5) }), [1, 0, 0], 3), 12);
    B.endPart();

    const hc = [0, Bd.headY + Bd.headH * 0.47, 0.012];
    const hr = [Bd.headW * 0.5, Bd.headH * 0.52, Bd.headW * 0.56];
    B.beginPart('head');
    B.ellipsoid(hc, hr, [0, 1, 0], [1, 0, 0], 18, 12, pal.skin, MAT.skin, W('head', 1), {
      offFn: null,
    });
    B.endPart();
    // Çene (alt yüz daha dar): küçük ek elipsoid
    B.beginPart('jaw');
    B.ellipsoid([0, hc[1] - hr[1] * 0.45, hc[2] + hr[2] * 0.18], [hr[0] * 0.72, hr[1] * 0.42, hr[2] * 0.72], [0, 1, 0], [1, 0, 0], 12, 6, shade(pal.skin, 0.96), MAT.skin, W('head', 1));
    B.endPart();
    // Gözler, kaşlar, burun
    B.beginPart('face');
    const eyeY = hc[1] + hr[1] * 0.02, eyeZ = hc[2] + hr[2] * 0.90;
    for (const s of [1, -1]) {
      B.ellipsoid([s * hr[0] * 0.38, eyeY, eyeZ - 0.004], [0.017, 0.010, 0.008], [0, 1, 0], [1, 0, 0], 8, 4, [235, 235, 240], MAT.skin, W('head', 1));
      B.ellipsoid([s * hr[0] * 0.38, eyeY, eyeZ + 0.003], [0.008, 0.008, 0.005], [0, 1, 0], [1, 0, 0], 6, 4, pal.dark, MAT.dark, W('head', 1));
      B.ellipsoid([s * hr[0] * 0.40, eyeY + 0.024, eyeZ - 0.001], [0.025, 0.006, 0.008], [0, 1, 0], [1, 0, 0], 6, 3, shade(pal.hair, 0.8), MAT.hair, W('head', 1));
    }
    B.ellipsoid([0, eyeY - 0.032, hc[2] + hr[2] * 0.96], [0.012, 0.024, 0.014], [0, 1, 0], [1, 0, 0], 6, 4, shade(pal.skin, 0.92), MAT.skin, W('head', 1));
    B.ellipsoid([0, eyeY - 0.075, hc[2] + hr[2] * 0.82], [0.024, 0.005, 0.006], [0, 1, 0], [1, 0, 0], 6, 3, shade(pal.skin, 0.6), MAT.skin, W('head', 1));
    B.endPart();

    // Saç
    if (st.hair !== 'none') {
      B.beginPart('hair', { estimated: true });
      B.ellipsoid([hc[0], hc[1] + hr[1] * 0.16, hc[2] - hr[2] * 0.16], [hr[0] * 1.09, hr[1] * 0.98, hr[2] * 1.02], [0, 1, 0], [1, 0, 0], 18, 9, pal.hair, MAT.hair, W('head', 1), { from: 0.12, to: 1, capStart: false });
      // ense saçı (arka-alt)
      B.ellipsoid([hc[0], hc[1] - hr[1] * 0.05, hc[2] - hr[2] * 0.42], [hr[0] * 0.98, hr[1] * 0.62, hr[2] * 0.62], [0, 1, 0], [1, 0, 0], 14, 7, shade(pal.hair, 0.92), MAT.hair, W('head', 1));
      if (st.hair === 'spiky' || st.hair === 'long') {
        const count = st.hair === 'long' ? 9 : 13;
        for (let k = 0; k < count; k++) {
          const a = (k / count) * Math.PI * 1.6 - Math.PI * 0.8 + Math.PI; // arka ve yanlar
          const up = st.hair === 'long' ? -0.55 : 0.35 + R() * 0.4;
          const base = [hc[0] + Math.sin(a) * hr[0] * 0.95, hc[1] + hr[1] * (0.35 + R() * 0.25), hc[2] + Math.cos(a) * hr[2] * 0.95];
          const dir = v3.norm([Math.sin(a) * 0.8, up, Math.cos(a) * 0.8]);
          const len = st.hair === 'long' ? 0.16 + R() * 0.06 : 0.06 + R() * 0.05;
          B.tube(ringsAlong(base, v3.add(base, v3.scale(dir, len)), s => ({ rx: 0.026 * (1 - s) + 0.002, rz: 0.018 * (1 - s) + 0.002, col: shade(pal.hair, 0.9 + 0.2 * (1 - s)), mat: MAT.hair, w: W('head', 1) }), [1, 0, 0], 2), 6, { capStart: true });
        }
        // alın perçemi
        for (let k = 0; k < 4; k++) {
          const x = (k - 1.5) * hr[0] * 0.42;
          const base = [x, hc[1] + hr[1] * 0.62, hc[2] + hr[2] * 0.55];
          const tip = [x * 1.15 + (R() - 0.5) * 0.02, hc[1] + hr[1] * 0.25, hc[2] + hr[2] * 0.98];
          B.tube(ringsAlong(base, tip, s => ({ rx: 0.022 * (1 - s) + 0.002, rz: 0.012 * (1 - s) + 0.002, col: pal.hair, mat: MAT.hair, w: W('head', 1) }), [1, 0, 0], 2), 6, { capStart: true });
        }
      }
      B.endPart();
    }
    // Miğfer / taç
    if (st.helmet === 'circlet' || st.helmet === 'full') {
      B.beginPart('helmet');
      const band = [];
      const by = hc[1] + hr[1] * 0.36;
      for (let i = 0; i <= 1; i++) band.push({ c: [0, by + i * 0.035, hc[2] - 0.004], t: [0, 1, 0], side: [1, 0, 0], rx: hr[0] * 1.13, rz: hr[2] * 1.12, col: trim, mat: MAT.trim, w: W('head', 1) });
      B.tube(band, 22);
      // ön taç plakası ve mücevher
      B.extrude([[-0.05, 0], [0.05, 0], [0.035, 0.05], [0, 0.085], [-0.035, 0.05]], [0, by + 0.005, hc[2] + hr[2] * 1.08], [1, 0, 0], [0, 1, 0], 0.012, trim, MAT.trim, W('head', 1));
      B.ellipsoid([0, by + 0.035, hc[2] + hr[2] * 1.11], [0.012, 0.016, 0.008], [0, 1, 0], [1, 0, 0], 8, 4, pal.gem, MAT.gem, W('head', 1));
      if (st.helmet === 'full') {
        B.ellipsoid([hc[0], hc[1] + hr[1] * 0.1, hc[2] - 0.005], [hr[0] * 1.15, hr[1] * 1.04, hr[2] * 1.14], [0, 1, 0], [1, 0, 0], 18, 10, metal, MAT.metal, W('head', 1), { from: 0.05, to: 1 });
        // yanak koruyucular
        for (const s of [1, -1]) B.extrude([[0, 0], [0.05, 0], [0.04, -0.09], [0, -0.07]], [s * hr[0] * 0.9, hc[1] + hr[1] * 0.1, hc[2] + hr[2] * 0.35], [0, 0, s], [0, 1, 0], 0.012, metal, MAT.metal, W('head', 1));
      }
      B.endPart();
    }

    // ---------- KOLLAR ----------
    for (const [S, s] of [['L', 1], ['R', -1]]) {
      const sh = P('upperarm.' + S), el = P('forearm.' + S), wr = P('hand.' + S);
      const shIn = v3.add(sh, [-s * 0.05, 0.01, 0]);
      B.beginPart('upperarm.' + S);
      const armCol = heavy > 0.5 ? shade(metal, 0.92) : (robe ? cloth : under), armMat = heavy > 0.5 ? MAT.metal : (robe ? MAT.cloth : MAT.under);
      B.tube(ringsAlong(shIn, el, t => ({ rx: Bd.armR * bk * (1.12 - 0.22 * t), rz: Bd.armR * bk * (1.12 - 0.18 * t), col: armCol, mat: armMat,
        w: t < 0.2 ? W('upperarm.' + S, 0.7 + t * 1.5, 'chest', 0.3 - t * 1.5) : t > 0.85 ? W('upperarm.' + S, 1 - (t - 0.85) * 3, 'forearm.' + S, (t - 0.85) * 3) : W('upperarm.' + S, 1) }), [0, 0, 1], 5), 12, { capStart: true });
      B.endPart();
      // Dirsek kapağı
      B.beginPart('elbow.' + S);
      B.ellipsoid(el, [Bd.armR * 0.95 * bk, Bd.armR * 0.95 * bk, Bd.armR * 0.95 * bk], v3.sub(wr, el), [0, 0, 1], 10, 6, heavy > 0.3 ? metal : armCol, heavy > 0.3 ? MAT.metal : armMat, W('forearm.' + S, 0.6, 'upperarm.' + S, 0.4));
      B.endPart();
      B.beginPart('forearm.' + S);
      B.tube(ringsAlong(el, wr, t => {
        const g = heavy > 0.2 && t > 0.25; // eldiven/bilek zırhı
        const rr = Bd.foreR * bk * (g ? 1.25 + 0.2 * t : 1.05 - 0.1 * t);
        const edge = g && (t > 0.93 || Math.abs(t - 0.3) < 0.06);
        return { rx: rr, rz: rr, n: g ? 2.4 : 2, col: edge ? trim : (g ? metal : armCol), mat: edge ? MAT.trim : (g ? MAT.metal : armMat), w: W('forearm.' + S, 1) };
      }, [0, 0, 1], 6), 12, { capEnd: true });
      B.endPart();
      // El (yumruk): yuvarlatılmış kutu, el kemiğine bağlı
      B.beginPart('hand.' + S);
      const hdir = v3.norm(v3.sub(wr, el));
      const hc2 = v3.add(wr, v3.scale(hdir, Bd.hand * 0.55));
      B.ellipsoid(hc2, [Bd.hand * 0.42, Bd.hand * 0.55, Bd.hand * 0.5], hdir, [0, 0, 1], 10, 6, heavy > 0.4 ? shade(metal, 0.8) : pal.leather, heavy > 0.4 ? MAT.metal : MAT.leather, W('hand.' + S, 1), { n: 3 });
      B.endPart();
      // Omuzluk (çok katmanlı kubbe)
      if (st.pauldrons !== 'none' && !robe) {
        B.beginPart('pauldron.' + S);
        const big = st.pauldrons === 'large' ? 1 : 0.7;
        for (let k = 0; k < 3; k++) {
          const c = v3.add(sh, [s * (0.01 + k * 0.012), 0.035 - k * 0.045, -0.005]);
          const rad = [0.105 * big * bk - k * 0.012, 0.075 * big - k * 0.008, 0.105 * big * bk - k * 0.01];
          B.ellipsoid(c, rad, [s * 0.35, 1, 0], [0, 0, 1], 16, 6, (u, v) => v < 0.18 ? trim : shade(metal, 1.05 - k * 0.07), (u, v) => v < 0.18 ? MAT.trim : MAT.metal,
            W('upperarm.' + S, 0.85, 'chest', 0.15), { from: 0.0, to: 1 });
        }
        B.endPart();
      }
    }

    // ---------- BACAKLAR ----------
    for (const [S, s] of [['L', 1], ['R', -1]]) {
      const hp = P('thigh.' + S), kn = P('shin.' + S), an = P('foot.' + S), toe = P('toe.' + S);
      const hpIn = v3.add(hp, [0, 0.07, 0]);
      B.beginPart('thigh.' + S);
      const legMetal = heavy > 0.5;
      B.tube(ringsAlong(hpIn, kn, t => ({ rx: Bd.thighR * bk * (1.05 - 0.28 * t), rz: Bd.thighR * bk * (1.1 - 0.3 * t),
        col: legMetal && t > 0.35 ? shade(metal, 0.95) : under, mat: legMetal && t > 0.35 ? MAT.metal : MAT.under,
        w: t < 0.15 ? W('thigh.' + S, 0.55 + t * 3, 'hips', 0.45 - t * 3) : t > 0.88 ? W('thigh.' + S, 1 - (t - 0.88) * 3.5, 'shin.' + S, (t - 0.88) * 3.5) : W('thigh.' + S, 1) }), [1, 0, 0], 6), 14);
      B.endPart();
      // Diz kapağı (metal)
      B.beginPart('knee.' + S);
      B.ellipsoid(v3.add(kn, [0, 0.01, Bd.shinR * 0.75]), [Bd.shinR * 1.15 * bk, Bd.shinR * 1.25, Bd.shinR * 0.8], [0, 1, 0], [1, 0, 0], 12, 6, (u, v) => v > 0.85 || v < 0.15 ? trim : metal, (u, v) => v > 0.85 || v < 0.15 ? MAT.trim : MAT.metal, W('shin.' + S, 0.75, 'thigh.' + S, 0.25));
      B.endPart();
      B.beginPart('shin.' + S);
      B.tube(ringsAlong(kn, v3.add(an, [0, 0.02, 0]), t => {
        const g = heavy > 0.15; const rr = Bd.shinR * bk * (g ? 1.28 - 0.18 * t : 1.05 - 0.2 * t);
        const edge = g && Math.abs(t - 0.08) < 0.06;
        return { rx: rr, rz: rr * 1.08, n: g ? 2.3 : 2, col: edge ? trim : (g ? metal : under), mat: edge ? MAT.trim : (g ? MAT.metal : MAT.under), w: t < 0.1 ? W('shin.' + S, 0.8, 'thigh.' + S, 0.2) : W('shin.' + S, 1) };
      }, [1, 0, 0], 6), 12);
      B.endPart();
      // Çizme: ayak bileğinden parmak ucuna
      B.beginPart('boot.' + S);
      const heel = [an[0], 0.0, an[2] - Bd.footL * 0.32];
      const bootCol = heavy > 0.5 ? shade(metal, 0.85) : pal.leather, bootMat = heavy > 0.5 ? MAT.metal : MAT.leather;
      const rows = [];
      const steps = 7;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const z = heel[2] + (toe[2] + Bd.footL * 0.06 - heel[2]) * t;
        const hTop = t < 0.45 ? Bd.ankleH * 1.25 : Bd.ankleH * (1.25 - (t - 0.45) * 1.6);
        const h = Math.max(0.03, hTop);
        rows.push({ c: [an[0], h / 2, z], t: [0, 0, 1], side: [1, 0, 0], rx: Bd.footW * 0.5 * bk * (t > 0.8 ? 1 - (t - 0.8) * 2.2 : 1), rz: h / 2, n: 3.2,
          col: t < 0.08 ? shade(bootCol, 0.6) : bootCol, mat: bootMat, w: t < 0.62 ? W('foot.' + S, 1) : W('toe.' + S, (t - 0.62) * 2.6, 'foot.' + S, 1 - (t - 0.62) * 2.6) });
      }
      B.tube(rows, 12, { capStart: true, capEnd: true });
      // çizme ağzı (manşet)
      B.tube(ringsAlong(v3.add(an, [0, 0.03, -0.005]), v3.add(an, [0, 0.10, -0.005]), t => ({ rx: Bd.shinR * 1.45 * bk, rz: Bd.shinR * 1.5 * bk, col: t > 0.6 ? trim : bootCol, mat: t > 0.6 ? MAT.trim : bootMat, w: W('shin.' + S, 0.6, 'foot.' + S, 0.4) }), [1, 0, 0], 2), 12);
      B.endPart();
    }

    // ---------- KEMER, ÖNLÜK, BELLİK ----------
    if (st.belt) {
      B.beginPart('belt');
      const by = Bd.hipY + 0.035;
      B.tube([0, 1].map(i => ({ c: [0, by + i * 0.05, 0.0], t: [0, 1, 0], side: [1, 0, 0], rx: Bd.waistW * 0.56 * bk + 0.012, rz: Bd.waistD * 0.56 * bk + 0.012, n: 2.4, col: pal.leather, mat: MAT.leather, w: W('hips', 0.7, 'spine', 0.3) })), 22);
      B.extrude([[-0.035, -0.03], [0.035, -0.03], [0.035, 0.03], [-0.035, 0.03]], [0, by + 0.025, Bd.waistD * 0.56 * bk + 0.02], [1, 0, 0], [0, 1, 0], 0.014, trim, MAT.trim, W('hips', 0.7, 'spine', 0.3));
      B.ellipsoid([0, by + 0.025, Bd.waistD * 0.56 * bk + 0.03], [0.011, 0.014, 0.006], [0, 1, 0], [1, 0, 0], 8, 4, pal.gem, MAT.gem, W('hips', 1));
      // keseler
      for (const s of [1, -1]) B.ellipsoid([s * Bd.waistW * 0.5, by - 0.01, Bd.waistD * 0.38], [0.03, 0.036, 0.024], [0, 1, 0], [1, 0, 0], 8, 5, shade(pal.leather, 0.9), MAT.leather, W('hips', 1), { n: 3 });
      B.endPart();
    }
    if (st.tabard) {
      // Ön ve arka kumaş paneli (kalçadan dize kadar). Alt kısımlar uyluklarla yarı yarıya hareket eder: bacak içine girmez.
      for (const side of [1, -1]) {
        B.beginPart(side > 0 ? 'tabard.front' : 'tabard.back', { doubleSided: true, estimated: side < 0 });
        const yTop = Bd.hipY + 0.03, yBot = side > 0 ? P('shin.L')[1] + 0.05 : Bd.hipY - (Bd.hipY - P('shin.L')[1]) * 0.55, rows = [];
        const n = 6;
        for (let i = 0; i <= n; i++) {
          const t = i / n, y = yTop + (yBot - yTop) * t;
          const wdt = Bd.waistW * (0.30 + 0.06 * t);
          const z = side * (Bd.waistD * 0.56 * bk + 0.02 + t * 0.06 * bk);
          const w = t < 0.25 ? W('hips', 1) : W('hips', 1 - t * 0.8, 'thigh.L', t * 0.4, 'thigh.R', t * 0.4);
          rows.push({ y, wdt, z, w, t });
        }
        const base = B.pos.length / 3, cols = 4;
        for (const r of rows) for (let c = 0; c <= cols; c++) {
          const u = c / cols, x = (u - 0.5) * 2 * r.wdt;
          const edge = c === 0 || c === cols || r.t > 0.95;
          const emblem = Math.abs(x) < r.wdt * 0.3 && r.t > 0.35 && r.t < 0.8;
          const col = edge ? trim : emblem ? mix(cloth, trim, 0.55) : cloth;
          B.vert([x, r.y, r.z + side * (1 - (2 * u - 1) ** 2) * 0.012], [0, 0, side], [u, r.t], col, MAT.cloth /* nakış: metal değil */, r.w);
        }
        for (let i = 0; i < n; i++) for (let c = 0; c < cols; c++) {
          const a = base + i * (cols + 1) + c, b = a + 1, d = a + cols + 1, e = d + 1;
          if (side > 0) B.idx.push(a, d, b, b, d, e); else B.idx.push(a, b, d, b, e, d);
        }
        B.endPart();
      }
      // Yan bel plakaları (tasset)
      if (heavy > 0.3) for (const [S, s] of [['L', 1], ['R', -1]]) {
        B.beginPart('tasset.' + S);
        const tp = [s * Bd.hipW * 0.5 * bk, Bd.hipY + 0.0, 0.02];
        B.ellipsoid(v3.add(tp, [s * 0.015, -0.07, 0]), [0.06 * bk, 0.09, 0.085 * bk], [s * 0.25, 1, 0], [0, 0, 1], 12, 6, (u, v) => v < 0.15 ? trim : metal, (u, v) => v < 0.15 ? MAT.trim : MAT.metal, W('hips', 0.5, 'thigh.' + S, 0.5), { from: -1, to: 0.6, n: 2.5 });
        B.endPart();
      }
    }

    // ---------- PELERİN ----------
    if (st.cape) {
      B.beginPart('cape', { doubleSided: true, estimated: true });
      const yTop = Bd.shoulderY + 0.01, yBot = Bd.capeBottomY;
      const rowsN = 12, colsN = 14, base = B.pos.length / 3;
      for (let i = 0; i <= rowsN; i++) {
        const t = i / rowsN, y = yTop + (yBot - yTop) * t;
        const rad = Bd.shoulderW * (0.50 + 0.22 * t) * bk;
        const depth = Bd.chestD * (0.62 + 0.55 * t) * bk;
        const arc = Math.PI * (0.92 + 0.22 * t);
        const w = t < 0.1 ? W('chest', 1) : t < 0.3 ? W('chest', 1 - (t - 0.1) * 5, 'cape.1', (t - 0.1) * 5) : t < 0.5 ? W('cape.1', 1) : t < 0.66 ? W('cape.1', 1 - (t - 0.5) / 0.16, 'cape.2', (t - 0.5) / 0.16) : W('cape.2', 1);
        for (let c = 0; c <= colsN; c++) {
          const u = c / colsN, a = -arc / 2 + arc * u; // a=0 arka orta
          const x = Math.sin(a) * rad, z = -Math.cos(a) * depth - 0.03 + (t < 0.08 ? 0.03 : 0);
          const fold = 1 + 0.035 * Math.sin(u * Math.PI * 7) * t;
          const edge = t > 0.94 || c === 0 || c === colsN;
          const emblem = Math.abs(u - 0.5) < 0.09 && t > 0.2 && t < 0.55;
          const col = edge ? trim : emblem ? mix(cloth, trim, 0.6) : shade(cloth, 0.9 + 0.1 * Math.sin(u * Math.PI * 7));
          B.vert([x * fold, y, z * fold], v3.norm([Math.sin(a), 0, -Math.cos(a)]), [u, t], col, MAT.cloth /* nakış: metal değil */, w);
        }
      }
      for (let i = 0; i < rowsN; i++) for (let c = 0; c < colsN; c++) {
        const a = base + i * (colsN + 1) + c, b = a + 1, d = a + colsN + 1, e = d + 1;
        B.idx.push(a, b, d, b, e, d);
      }
      // yaka (pelerin boyun kısmı)
      B.tube([0, 1, 2].map(i => ({ c: [0, Bd.shoulderY + 0.02 + i * 0.025, -0.01], t: [0, 1, 0], side: [1, 0, 0], rx: 0.12 - i * 0.022, rz: 0.11 - i * 0.02, col: cloth, mat: MAT.cloth, w: W('chest', 0.8, 'neck', 0.2) })), 16);
      B.endPart();
    }

    // ---------- SİLAH ----------
    buildWeapon(B, skel, st, pal, W, P);
    if (st.shield) buildShield(B, skel, pal, W, P);

    finalizeOrientation(B);
    const mesh = packMesh(B, skel);
    mesh.palette = pal; mesh.style = st;
    return mesh;
  }

  function weaponFrame(skel, P) {
    const wr = P('hand.R'), el = P('forearm.R'), grip = P('weapon');
    const fore = v3.norm(v3.sub(wr, el));
    // Bıçak dinlenme yönü: yumruktan ileri-aşağı ve hafif içe
    const dir = v3.norm([0.18, -0.62, 0.76]);
    const side = v3.norm(v3.cross(dir, fore)); // yassı yüzeyin normali
    return { grip, dir, side, fore };
  }

  function buildWeapon(B, skel, st, pal, W, P) {
    const type = st.weapon; if (!type || type === 'none') return;
    const { grip, dir, side } = weaponFrame(skel, P);
    const w = W('weapon', 1);
    B.beginPart('weapon.' + type);
    const at = (d) => v3.add(grip, v3.scale(dir, d));
    const flat = v3.norm(v3.cross(side, dir));
    if (type === 'sword' || type === 'dagger') {
      const L = type === 'sword' ? 0.86 : 0.34, Wd = type === 'sword' ? 0.034 : 0.028;
      // kabza
      B.tube(ringsAlong(at(-0.12), at(0.05), t => ({ rx: 0.017, rz: 0.017, col: t < 0.12 ? pal.trim : pal.leather, mat: t < 0.12 ? MAT.trim : MAT.leather, w }), side, 3), 8, { capStart: true });
      B.ellipsoid(at(-0.13), [0.024, 0.024, 0.024], dir, side, 8, 5, pal.trim, MAT.trim, w);
      // balçak (crossguard)
      B.tube(ringsAlong(v3.add(at(0.06), v3.scale(side, -0.13)), v3.add(at(0.06), v3.scale(side, 0.13)), t => ({ rx: 0.02 + 0.012 * Math.abs(Math.sin(t * Math.PI * 2)), rz: 0.016, col: pal.trim, mat: MAT.trim, w }), dir, 6), 8, { capStart: true, capEnd: true });
      B.ellipsoid(at(0.065), [0.014, 0.014, 0.008], dir, side, 8, 4, pal.gem, MAT.gem, w);
      // bıçak: yassı elmas kesit, uca doğru incelir
      const rows = [];
      for (let i = 0; i <= 8; i++) {
        const t = i / 8, d = 0.075 + L * t;
        const taper = t < 0.82 ? 1 - t * 0.25 : (1 - 0.82 * 0.25) * (1 - (t - 0.82) / 0.18);
        rows.push({ c: at(d), t: dir, side, rx: Math.max(0.002, Wd * taper), rz: 0.007 * Math.max(0.3, taper), n: 1.3,
          col: (u) => Math.abs(Math.cos(u * Math.PI * 2)) < 0.25 ? shade(pal.blade, 1.08) : pal.blade, mat: MAT.blade, w });
      }
      B.tube(rows, 8, {});
      // oluk (fuller) – mavi parıltı çizgisi
      B.tube(ringsAlong(at(0.09), at(0.09 + L * 0.6), () => ({ rx: 0.006, rz: 0.0075, col: mix(pal.blade, pal.gem, 0.6), mat: MAT.gem, w }), side, 1), 6, {});
    } else if (type === 'axe' || type === 'hammer' || type === 'mace') {
      const L = type === 'axe' ? 0.78 : 0.72;
      B.tube(ringsAlong(at(-0.14), at(L), t => ({ rx: 0.018, rz: 0.018, col: t < 0.25 ? pal.leather : shade(pal.leather, 1.2), mat: MAT.leather, w }), side, 4), 8, { capStart: true, capEnd: true });
      const head = at(L - 0.06);
      if (type === 'axe') {
        const poly = [[0, -0.06], [0.08, -0.08], [0.2, -0.14], [0.24, -0.02], [0.24, 0.06], [0.2, 0.14], [0.08, 0.07], [0, 0.05]];
        B.extrude(poly, head, flat, dir, 0.022, pal.blade, MAT.blade, w);
        B.extrude([[0, -0.04], [-0.07, -0.03], [-0.07, 0.03], [0, 0.04]], head, flat, dir, 0.03, pal.metal, MAT.metal, w);
      } else if (type === 'hammer') {
        B.tube(ringsAlong(v3.add(head, v3.scale(flat, -0.1)), v3.add(head, v3.scale(flat, 0.1)), () => ({ rx: 0.05, rz: 0.05, n: 4, col: pal.metal, mat: MAT.metal, w }), dir, 2), 8, { capStart: true, capEnd: true });
      } else {
        B.ellipsoid(head, [0.065, 0.075, 0.065], dir, side, 12, 7, pal.metal, MAT.metal, w);
        for (let k = 0; k < 6; k++) {
          const a = k / 6 * Math.PI * 2, o = v3.add(v3.scale(flat, Math.cos(a)), v3.scale(side, Math.sin(a)));
          B.tube(ringsAlong(head, v3.add(head, v3.scale(o, 0.1)), t => ({ rx: 0.014 * (1 - t) + 0.002, rz: 0.03 * (1 - t) + 0.002, col: pal.trim, mat: MAT.trim, w }), dir, 2), 6, { capStart: true });
        }
      }
    } else if (type === 'spear' || type === 'staff') {
      const L = type === 'spear' ? 1.55 : 1.45;
      // Mızrak/asa tutuşu: kabza ortalarından tutulur
      const back = -0.55;
      B.tube(ringsAlong(at(back), at(L + back), t => ({ rx: 0.016, rz: 0.016, col: shade(pal.leather, 1.15), mat: MAT.leather, w }), side, 6), 8, { capStart: true, capEnd: true });
      const tip = at(L + back);
      if (type === 'spear') {
        B.extrude([[-0.035, 0], [0, 0.26], [0.035, 0], [0, -0.05]], tip, flat, dir, 0.016, pal.blade, MAT.blade, w);
        B.tube(ringsAlong(at(L + back - 0.05), tip, () => ({ rx: 0.024, rz: 0.024, col: pal.trim, mat: MAT.trim, w }), side, 1), 8, {});
      } else {
        B.ellipsoid(v3.add(tip, v3.scale(dir, 0.06)), [0.055, 0.055, 0.055], dir, side, 12, 8, pal.gem, MAT.gem, w);
        for (let k = 0; k < 4; k++) {
          const a = k / 4 * Math.PI * 2, o = v3.add(v3.scale(flat, Math.cos(a) * 0.06), v3.scale(side, Math.sin(a) * 0.06));
          B.tube(ringsAlong(v3.add(tip, v3.scale(o, 0.3)), v3.add(v3.add(tip, o), v3.scale(dir, 0.12)), t => ({ rx: 0.008, rz: 0.008, col: pal.trim, mat: MAT.trim, w }), dir, 2), 5, {});
        }
      }
    }
    B.endPart();
  }

  function buildShield(B, skel, pal, W, P) {
    const el = P('forearm.L'), wr = P('hand.L');
    const c = v3.add(v3.lerp(el, wr, 0.55), [0.075, 0, 0.02]);
    const w = W('forearm.L', 1);
    B.beginPart('shield');
    const poly = []; const N = 18;
    for (let i = 0; i < N; i++) { const a = i / N * Math.PI * 2; const r = 0.22 * (1 + (Math.sin(a) < 0 ? 0.25 * -Math.sin(a) : 0)); poly.push([Math.cos(a) * 0.19, Math.sin(a) * r]); }
    B.extrude(poly, c, [0, 0, 1], [0, 1, 0], 0.03, pal.metal, MAT.metal, w);
    B.ellipsoid(v3.add(c, [0.02, 0, 0]), [0.012, 0.05, 0.05], [0, 1, 0], [1, 0, 0], 10, 5, pal.trim, MAT.trim, w);
    B.endPart();
  }

  function packMesh(B, skel) {
    const n = B.pos.length / 3;
    const mesh = {
      vertexCount: n, triangleCount: B.idx.length / 3,
      position: new Float32Array(B.pos), normal: new Float32Array(B.nrm), uv: new Float32Array(B.uv), color: new Float32Array(B.col),
      material: new Uint8Array(B.mat), joints: new Uint8Array(B.jnt), weights: new Float32Array(B.wgt), part: new Uint16Array(B.part),
      index: n > 65535 ? new Uint32Array(B.idx) : new Uint16Array(B.idx), parts: B.parts.map(p => ({ name: p.name, start: p.start, end: p.end, istart: p.istart, iend: p.iend, doubleSided: p.doubleSided, estimated: p.estimated })),
      boneCount: skel.bones.length,
    };
    mesh.doubleSidedPart = new Uint8Array(B.parts.length);
    B.parts.forEach((p, i) => { mesh.doubleSidedPart[i] = p.doubleSided ? 1 : 0; });
    mesh.estimatedParts = B.parts.filter(p => p.estimated).map(p => p.name);
    // Kumaş parçaları (pelerin, önlük) için zemin çarpışması: vertex zeminin altına inmez
    mesh.clothPart = new Uint8Array(B.parts.length);
    B.parts.forEach((p, i) => { mesh.clothPart[i] = /^(cape|tabard)/.test(p.name) ? 1 : 0; });
    // sınırlar
    let mn = [1e9, 1e9, 1e9], mx = [-1e9, -1e9, -1e9];
    for (let i = 0; i < n; i++) for (let k = 0; k < 3; k++) { const v = mesh.position[i * 3 + k]; if (v < mn[k]) mn[k] = v; if (v > mx[k]) mx[k] = v; }
    mesh.bounds = { min: mn, max: mx };
    return mesh;
  }

  F.MAT = MAT; F.MAT_NAMES = MAT_NAMES; F.MAT_SHADE = MAT_SHADE; F.DEFAULT_PALETTE = DEFAULT_PALETTE; F.DEFAULT_STYLE = DEFAULT_STYLE;
  F.buildWarriorMesh = buildWarriorMesh; F.weaponFrame = weaponFrame;
})(typeof self !== 'undefined' ? self : globalThis);
