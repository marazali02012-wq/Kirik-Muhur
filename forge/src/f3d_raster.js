/* Forge 3D — CPU yazılım rasterleştirici. GPU / WebGL gerektirmez.
   Deri (skinning) CPU'da yapılır, z-tamponu, iki taraflı yüzeyler, çizgi-film (cel) gölgeleme, metal parlaması,
   kenar ışığı, dış hat (outline), süper örnekleme ile kenar yumuşatma. Çıktı: şeffaf RGBA. */
(function (root) {
  'use strict';
  const F = root.Forge3D = root.Forge3D || {};
  const { v3, clamp } = F;

  function cameraBasis(yaw, pitch) {
    const d = [-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch)]; // kameraya doğru
    const f = v3.scale(d, -1);
    const r = v3.norm(v3.cross(f, [0, 1, 0]));
    const u = v3.cross(r, f);
    return { d, r, u };
  }

  // Tüm vertexleri derile (Linear Blend Skinning)
  function skinVertices(mesh, skinMats, out, opt) {
    const clampCloth = !(opt && opt.noClamp) && mesh.clothPart;
    const n = mesh.vertexCount, P = mesh.position, N = mesh.normal, J = mesh.joints, Wt = mesh.weights, M = skinMats;
    const pos = out && out.pos || new Float32Array(n * 3), nrm = out && out.nrm || new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const px = P[i * 3], py = P[i * 3 + 1], pz = P[i * 3 + 2], nx = N[i * 3], ny = N[i * 3 + 1], nz = N[i * 3 + 2];
      let ox = 0, oy = 0, oz = 0, qx = 0, qy = 0, qz = 0;
      for (let k = 0; k < 4; k++) {
        const w = Wt[i * 4 + k]; if (w === 0) continue;
        const o = J[i * 4 + k] * 16;
        ox += w * (M[o] * px + M[o + 4] * py + M[o + 8] * pz + M[o + 12]);
        oy += w * (M[o + 1] * px + M[o + 5] * py + M[o + 9] * pz + M[o + 13]);
        oz += w * (M[o + 2] * px + M[o + 6] * py + M[o + 10] * pz + M[o + 14]);
        qx += w * (M[o] * nx + M[o + 4] * ny + M[o + 8] * nz);
        qy += w * (M[o + 1] * nx + M[o + 5] * ny + M[o + 9] * nz);
        qz += w * (M[o + 2] * nx + M[o + 6] * ny + M[o + 10] * nz);
      }
      if (clampCloth && mesh.clothPart[mesh.part[i]] && oy < 0.006) oy = 0.006; // kumaş-zemin çarpışması
      pos[i * 3] = ox; pos[i * 3 + 1] = oy; pos[i * 3 + 2] = oz;
      const l = Math.hypot(qx, qy, qz) || 1; nrm[i * 3] = qx / l; nrm[i * 3 + 1] = qy / l; nrm[i * 3 + 2] = qz / l;
    }
    return { pos, nrm };
  }

  /* opts: {width,height,yaw,pitch,scale,cx,cy,ss (süper örnekleme),outline,shadow,bg (null=şeffaf),wire,partFilter}
     skinned: skinVertices çıktısı. */
  function render(mesh, skinned, opts) {
    const ss = opts.ss || 2, Wd = opts.width * ss, Ht = opts.height * ss, npx = Wd * Ht;
    const col = new Float32Array(npx * 3), alpha = new Uint8Array(npx), depth = new Float32Array(npx).fill(-1e9), part = new Int16Array(npx).fill(-1);
    const { d, r, u } = cameraBasis(opts.yaw || 0, opts.pitch == null ? 0.33 : opts.pitch);
    const scale = opts.scale * ss, cx = opts.cx * ss, cy = opts.cy * ss;
    const n = mesh.vertexCount, P = skinned.pos, N = skinned.nrm;
    const sx = new Float32Array(n), sy = new Float32Array(n), sz = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = P[i * 3], y = P[i * 3 + 1], z = P[i * 3 + 2];
      sx[i] = cx + (x * r[0] + y * r[1] + z * r[2]) * scale;
      sy[i] = cy - (x * u[0] + y * u[1] + z * u[2]) * scale;
      sz[i] = x * d[0] + y * d[1] + z * d[2];
    }
    // Işık kameraya göre sabit: sol-üst-ön
    const L = v3.norm(v3.add(v3.add(v3.scale(r, -0.55), v3.scale(u, 0.75)), v3.scale(d, 0.62)));
    const H = v3.norm(v3.add(L, d));
    const Lf = v3.norm(v3.add(v3.add(v3.scale(r, 0.8), v3.scale(u, 0.1)), v3.scale(d, -0.3))); // arka dolgu (soğuk)
    const C = mesh.color, MAT = mesh.material, PARTI = mesh.part, DS = mesh.doubleSidedPart, SH = F.MAT_SHADE;
    const I = mesh.index, triCount = I.length / 3;
    const filt = opts.partFilter || null;
    const tint = opts.tint || null; // [r,g,b,amount] (darbe kızarması)
    const hl = opts.highlight || null; // parça başına 1: tahmini yüzey (turuncu taramayla gösterilir)

    for (let t = 0; t < triCount; t++) {
      const a = I[t * 3], b = I[t * 3 + 1], c = I[t * 3 + 2];
      const pi = PARTI[a]; if (filt && !filt[pi]) continue;
      const x0 = sx[a], y0 = sy[a], x1 = sx[b], y1 = sy[b], x2 = sx[c], y2 = sy[c];
      const area = (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0);
      if (area === 0) continue;
      const front = area < 0;
      const ds = DS[pi] === 1;
      if (!front && !ds) continue;
      const flip = !front ? -1 : 1;
      let minX = Math.max(0, Math.floor(Math.min(x0, x1, x2))), maxX = Math.min(Wd - 1, Math.ceil(Math.max(x0, x1, x2)));
      let minY = Math.max(0, Math.floor(Math.min(y0, y1, y2))), maxY = Math.min(Ht - 1, Math.ceil(Math.max(y0, y1, y2)));
      if (minX > maxX || minY > maxY) continue;
      const inv = 1 / area;
      const mat = MAT[a], shp = SH[mat] || SH[0];
      for (let py = minY; py <= maxY; py++) {
        const yy = py + 0.5;
        for (let px = minX; px <= maxX; px++) {
          const xx = px + 0.5;
          let w0 = ((x1 - xx) * (y2 - yy) - (x2 - xx) * (y1 - yy)) * inv;
          let w1 = ((x2 - xx) * (y0 - yy) - (x0 - xx) * (y2 - yy)) * inv;
          let w2 = 1 - w0 - w1;
          if (w0 < -1e-6 || w1 < -1e-6 || w2 < -1e-6) continue;
          const z = w0 * sz[a] + w1 * sz[b] + w2 * sz[c];
          const o = py * Wd + px;
          if (z <= depth[o]) continue;
          depth[o] = z; part[o] = pi; alpha[o] = 255;
          // normal
          let nx = (w0 * N[a * 3] + w1 * N[b * 3] + w2 * N[c * 3]) * flip;
          let ny = (w0 * N[a * 3 + 1] + w1 * N[b * 3 + 1] + w2 * N[c * 3 + 1]) * flip;
          let nz = (w0 * N[a * 3 + 2] + w1 * N[b * 3 + 2] + w2 * N[c * 3 + 2]) * flip;
          const nl = Math.hypot(nx, ny, nz) || 1; nx /= nl; ny /= nl; nz /= nl;
          let cr = w0 * C[a * 3] + w1 * C[b * 3] + w2 * C[c * 3];
          let cg = w0 * C[a * 3 + 1] + w1 * C[b * 3 + 1] + w2 * C[c * 3 + 1];
          let cb = w0 * C[a * 3 + 2] + w1 * C[b * 3 + 2] + w2 * C[c * 3 + 2];
          const ndl = nx * L[0] + ny * L[1] + nz * L[2];
          const ndv = nx * d[0] + ny * d[1] + nz * d[2];
          // Çizgi-film tonlama: iki yumuşak basamak
          const s1 = clamp((ndl + 0.15) / 0.3, 0, 1), s2 = clamp((ndl - 0.42) / 0.18, 0, 1);
          const diff = s1 * s1 * (3 - 2 * s1) * 0.52 + s2 * s2 * (3 - 2 * s2) * 0.22;
          const hemi = 0.36 + 0.10 * ny;
          const fill = Math.max(0, nx * Lf[0] + ny * Lf[1] + nz * Lf[2]) * 0.12;
          let k = hemi + diff;
          const ndh = Math.max(0, nx * H[0] + ny * H[1] + nz * H[2]);
          let spec = Math.pow(ndh, shp[1]) * shp[0];
          if (shp[2] > 0.5) { spec = spec > 0.18 ? spec * 1.15 + 0.12 : spec * 0.6; k = k * 0.92 + 0.05; }
          const rim = Math.pow(1 - Math.max(0, ndv), 3) * shp[3] * (0.4 + 0.6 * clamp(ndl + 0.4, 0, 1));
          let R = cr * k + fill * 0.55 + spec + rim * 0.55 * (0.6 + cr * 0.4);
          let G = cg * k + fill * 0.65 + spec + rim * 0.55 * (0.6 + cg * 0.4);
          let Bc = cb * k + fill * 0.95 + spec * 1.02 + rim * 0.6 * (0.6 + cb * 0.4);
          if (mat === 7) { R = cr * 0.55 + R * 0.6; G = cg * 0.55 + G * 0.6; Bc = cb * 0.55 + Bc * 0.6; } // mücevher: öz ışık
          if (tint) { R += (tint[0] - R) * tint[3]; G += (tint[1] - G) * tint[3]; Bc += (tint[2] - Bc) * tint[3]; }
          if (hl && hl[pi] && ((px + py) >> 2) % 2 === 0) { R = R * 0.45 + 0.55; G = G * 0.45 + 0.3; Bc = Bc * 0.45; }
          col[o * 3] = R; col[o * 3 + 1] = G; col[o * 3 + 2] = Bc;
        }
      }
    }

    // İç çizgiler: derinlik süreksizliği olan pikselleri koyulaştır
    if (opts.outline !== false) {
      const thr = 0.06;
      for (let y = 1; y < Ht - 1; y++) for (let x = 1; x < Wd - 1; x++) {
        const o = y * Wd + x; if (!alpha[o]) continue;
        const z = depth[o];
        const zl = depth[o - 1], zr = depth[o + 1], zu = depth[o - Wd], zd = depth[o + Wd];
        if ((alpha[o - 1] && zl - z > thr) || (alpha[o + 1] && zr - z > thr) || (alpha[o - Wd] && zu - z > thr) || (alpha[o + Wd] && zd - z > thr)) {
          col[o * 3] *= 0.35; col[o * 3 + 1] *= 0.35; col[o * 3 + 2] *= 0.42;
        }
      }
    }
    // Dış hat: şeffaf olup opak komşusu olan pikseller (ss kalınlığında)
    const outA = new Uint8Array(npx);
    const OL = opts.outlineColor || [0.07, 0.06, 0.1];
    if (opts.outline !== false) {
      const rad = Math.max(1, Math.round(ss * (opts.outlineWidth || 1)));
      for (let y = 0; y < Ht; y++) for (let x = 0; x < Wd; x++) {
        const o = y * Wd + x; if (alpha[o]) continue;
        let hit = false;
        for (let dy = -rad; dy <= rad && !hit; dy++) {
          const yy = y + dy; if (yy < 0 || yy >= Ht) continue;
          for (let dx = -rad; dx <= rad; dx++) {
            const xx = x + dx; if (xx < 0 || xx >= Wd) continue;
            if (dx * dx + dy * dy > rad * rad + 0.5) continue;
            if (alpha[yy * Wd + xx]) { hit = true; break; }
          }
        }
        if (hit) outA[o] = 1;
      }
    }

    // Aşağı örnekleme (ss x ss kutu filtresi), gölge ve arka plan
    const W0 = opts.width, H0 = opts.height, rgba = new Uint8ClampedArray(W0 * H0 * 4);
    const ids = new Int16Array(W0 * H0).fill(-1);
    const sh = opts.shadow;
    for (let y = 0; y < H0; y++) for (let x = 0; x < W0; x++) {
      let R = 0, G = 0, Bc = 0, A = 0; let pid = -1;
      for (let j = 0; j < ss; j++) for (let i = 0; i < ss; i++) {
        const o = (y * ss + j) * Wd + (x * ss + i);
        if (alpha[o]) { R += col[o * 3]; G += col[o * 3 + 1]; Bc += col[o * 3 + 2]; A += 1; pid = part[o]; }
        else if (outA[o]) { R += OL[0]; G += OL[1]; Bc += OL[2]; A += 1; }
      }
      const q = ss * ss, o4 = (y * W0 + x) * 4;
      let a = A / q;
      let cr = A ? R / A : 0, cg = A ? G / A : 0, cb = A ? Bc / A : 0;
      if (sh) { // zemin gölgesi (yarı saydam elips)
        const ex = (x + 0.5 - sh.cx) / sh.rx, ey = (y + 0.5 - sh.cy) / sh.ry, e = ex * ex + ey * ey;
        if (e < 1) {
          const sa = sh.alpha * (1 - e) * (1 - e);
          const na = a + sa * (1 - a);
          if (na > 0) { cr = (cr * a + 0.02 * sa * (1 - a)) / na; cg = (cg * a + 0.03 * sa * (1 - a)) / na; cb = (cb * a + 0.07 * sa * (1 - a)) / na; }
          a = na;
        }
      }
      if (opts.bg) { const bgc = opts.bg; cr = cr * a + bgc[0] / 255 * (1 - a); cg = cg * a + bgc[1] / 255 * (1 - a); cb = cb * a + bgc[2] / 255 * (1 - a); a = 1; }
      rgba[o4] = cr * 255; rgba[o4 + 1] = cg * 255; rgba[o4 + 2] = cb * 255; rgba[o4 + 3] = a * 255;
      ids[y * W0 + x] = pid;
    }
    return { rgba, width: W0, height: H0, partIds: ids, cam: { d, r, u } };
  }

  // Dünya noktasını ekran koordinatına çevir (iskelet çizimi ve testler için)
  function project(p, opts) {
    const { d, r, u } = cameraBasis(opts.yaw || 0, opts.pitch == null ? 0.33 : opts.pitch);
    return [opts.cx + v3.dot(p, r) * opts.scale, opts.cy - v3.dot(p, u) * opts.scale, v3.dot(p, d)];
  }

  F.cameraBasis = cameraBasis; F.skinVertices = skinVertices; F.render = render; F.project = project;
})(typeof self !== 'undefined' ? self : globalThis);
