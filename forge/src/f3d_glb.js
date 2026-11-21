/* Forge 3D — glTF 2.0 ikili (GLB) dışa aktarma, okuma ve doğrulama.
   Dışa aktarım: mesh (konum, normal, renk, eklem, ağırlık), deri (skin) + ters bağlama matrisleri, kemik düğümleri,
   5 animasyon (dönüş + kalça ötelemesi), malzemeler (PBR metal/pürüzlülük).
   Okuma: GLB tekrar ayrıştırılır, yapısal denetimler yapılır, iskelet ve animasyon GLB verisinden yeniden kurulur
   ve aynı yazılım rasterleştiricisiyle çizilebilir (gidiş-dönüş doğrulaması). */
(function (root) {
  'use strict';
  const F = root.Forge3D = root.Forge3D || {};
  const { q, m4 } = F;

  const MAT_PBR = { // [metallic, roughness, emissiveStrength]
    skin: [0, 0.7, 0], metal: [0.7, 0.38, 0], cloth: [0, 0.9, 0], leather: [0, 0.75, 0], hair: [0, 0.8, 0],
    blade: [1, 0.2, 0], trim: [1, 0.3, 0], gem: [0.2, 0.15, 0.6], dark: [0, 0.9, 0], under: [0, 0.85, 0],
  };

  function exportGLB(skel, mesh, opts) {
    opts = opts || {};
    const fps = opts.fps || 60, clips = opts.clips || F.CLIP_KEYS;
    const chunks = []; let binLen = 0;
    const bufferViews = [], accessors = [];
    function addView(arr, target) {
      const bytes = new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
      const pad = (4 - (binLen % 4)) % 4; if (pad) { chunks.push(new Uint8Array(pad)); binLen += pad; }
      const bv = { buffer: 0, byteOffset: binLen, byteLength: bytes.length }; if (target) bv.target = target;
      chunks.push(bytes.slice()); binLen += bytes.length; bufferViews.push(bv); return bufferViews.length - 1;
    }
    function addAccessor(arr, type, componentType, target, extra) {
      const comps = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 }[type];
      const acc = Object.assign({ bufferView: addView(arr, target), componentType, count: arr.length / comps, type }, extra || {});
      accessors.push(acc); return accessors.length - 1;
    }
    const minmax = (arr, c) => { const mn = new Array(c).fill(Infinity), mx = new Array(c).fill(-Infinity); for (let i = 0; i < arr.length; i++) { const k = i % c; if (arr[i] < mn[k]) mn[k] = arr[i]; if (arr[i] > mx[k]) mx[k] = arr[i]; } return { min: mn.map(v => Math.fround(v)), max: mx.map(v => Math.fround(v)) }; };

    const n = mesh.vertexCount;
    // Malzeme/çift yüz gruplarına göre üçgenleri ayır; her grup kendi sıkı vertex tamponunu alır (içe aktarımda şişme olmaz)
    const groups = new Map(), I = mesh.index;
    for (let t = 0; t < I.length; t += 3) {
      const mat = mesh.material[I[t]], ds = mesh.doubleSidedPart[mesh.part[I[t]]] ? 1 : 0, key = mat * 2 + ds;
      if (!groups.has(key)) groups.set(key, []); groups.get(key).push(I[t], I[t + 1], I[t + 2]);
    }
    const materials = [], primitives = [];
    for (const [key, idx] of [...groups.entries()].sort((a, b) => a[0] - b[0])) {
      const mat = key >> 1, ds = key & 1, name = F.MAT_NAMES[mat], pbr = MAT_PBR[name] || [0, 0.8, 0];
      const m = { name: name + (ds ? '_iki_yuz' : ''), pbrMetallicRoughness: { baseColorFactor: [1, 1, 1, 1], metallicFactor: pbr[0], roughnessFactor: pbr[1] }, doubleSided: !!ds };
      if (pbr[2]) { m.emissiveFactor = [0.25 * pbr[2], 0.55 * pbr[2], pbr[2]]; }
      materials.push(m);
      const remap = new Map(), used = [];
      const li = idx.map(v => { let r = remap.get(v); if (r === undefined) { r = used.length; remap.set(v, r); used.push(v); } return r; });
      const nv = used.length, P = new Float32Array(nv * 3), N = new Float32Array(nv * 3), C = new Float32Array(nv * 3), Jn = new Uint8Array(nv * 4), Wt = new Float32Array(nv * 4);
      // glTF COLOR_0 doğrusal renk uzayındadır: sRGB -> doğrusal
      const lin = c => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      used.forEach((v, k) => { for (let e = 0; e < 3; e++) { P[k * 3 + e] = mesh.position[v * 3 + e]; N[k * 3 + e] = mesh.normal[v * 3 + e]; C[k * 3 + e] = lin(mesh.color[v * 3 + e]); } for (let e = 0; e < 4; e++) { Jn[k * 4 + e] = mesh.joints[v * 4 + e]; Wt[k * 4 + e] = mesh.weights[v * 4 + e]; } });
      const attributes = { POSITION: addAccessor(P, 'VEC3', 5126, 34962, minmax(P, 3)), NORMAL: addAccessor(N, 'VEC3', 5126, 34962), COLOR_0: addAccessor(C, 'VEC3', 5126, 34962), JOINTS_0: addAccessor(Jn, 'VEC4', 5121, 34962), WEIGHTS_0: addAccessor(Wt, 'VEC4', 5126, 34962) };
      const arr = nv > 65535 ? new Uint32Array(li) : new Uint16Array(li);
      const aIdx = addAccessor(arr, 'SCALAR', nv > 65535 ? 5125 : 5123, 34963);
      primitives.push({ attributes, indices: aIdx, material: materials.length - 1, mode: 4 });
    }
    // Kemik düğümleri
    // Düğüm adlarında nokta yok (three.js vb. bazı yükleyiciler noktayı siler): hand.R -> hand_R
    const nodes = skel.bones.map(b => ({ name: b.name.replace(/\./g, '_'), translation: b.restLocal.map(v => +v.toFixed(6)), children: [] }));
    skel.bones.forEach(b => { if (b.parent >= 0) nodes[b.parent].children.push(b.index); });
    nodes.forEach(nd => { if (!nd.children.length) delete nd.children; });
    const meshNode = nodes.length;
    nodes.push({ name: opts.name || 'Forge_Savasci', mesh: 0, skin: 0 });
    const ibm = new Float32Array(skel.bones.length * 16); skel.invBind.forEach((m, i) => ibm.set(m, i * 16));
    const aIbm = addAccessor(ibm, 'MAT4', 5126);
    const skins = [{ name: 'iskelet', joints: skel.bones.map(b => b.index), inverseBindMatrices: aIbm, skeleton: 0 }];
    // Animasyonlar
    const animations = [], clipInfo = {};
    const hipsI = skel.index.hips;
    for (const clip of clips) {
      const C = F.CLIPS[clip], cfps = (opts.clipFps && opts.clipFps[clip]) || (clip === 'attack' || clip === 'hurt' ? Math.max(fps, 60) : fps), K = Math.max(2, Math.round(C.duration * cfps));
      const times = new Float32Array(K + 1), rots = skel.bones.map(() => new Float32Array((K + 1) * 4)), hipT = new Float32Array((K + 1) * 3);
      for (let k = 0; k <= K; k++) {
        const tn = k / K, tt = C.loop ? (tn >= 1 ? 0 : tn) : Math.min(tn, 1);
        times[k] = +(tn * C.duration).toFixed(5);
        const r = F.sampleClip(skel, clip, tt);
        r.pose.rot.forEach((qq, i) => { let qn = q.norm(qq); if (k > 0) { const pv = rots[i].subarray((k - 1) * 4, k * 4); if (pv[0] * qn[0] + pv[1] * qn[1] + pv[2] * qn[2] + pv[3] * qn[3] < 0) qn = qn.map(v => -v); } rots[i].set(qn, k * 4); });
        const tr = r.pose.trans[hipsI] || [0, 0, 0], rl = skel.bones[hipsI].restLocal;
        hipT.set([rl[0] + tr[0], rl[1] + tr[1], rl[2] + tr[2]], k * 3);
      }
      const aT = addAccessor(times, 'SCALAR', 5126, null, { min: [times[0]], max: [times[K]] });
      const samplers = [], channels = [];
      skel.bones.forEach((b, i) => {
        let moving = false; for (let k = 0; k <= K && !moving; k++) if (Math.abs(rots[i][k * 4 + 3]) < 0.99999) moving = true;
        if (!moving) return;
        samplers.push({ input: aT, output: addAccessor(rots[i], 'VEC4', 5126), interpolation: 'LINEAR' });
        channels.push({ sampler: samplers.length - 1, target: { node: i, path: 'rotation' } });
      });
      samplers.push({ input: aT, output: addAccessor(hipT, 'VEC3', 5126), interpolation: 'LINEAR' });
      channels.push({ sampler: samplers.length - 1, target: { node: hipsI, path: 'translation' } });
      animations.push({ name: clip, samplers, channels });
      clipInfo[clip] = { duration: C.duration, loop: C.loop, keys: K + 1, fps: cfps };
    }
    const json = {
      asset: { version: '2.0', generator: 'Forge 2.5D V12 — yerel CPU üretimi (harici servis yok)' },
      scene: 0, scenes: [{ name: 'Sahne', nodes: [0, meshNode] }], nodes, meshes: [{ name: 'savasci_mesh', primitives }], skins, materials, animations,
      accessors, bufferViews, buffers: [{ byteLength: 0 }],
      extras: { forge: Object.assign({ units: 'metre', up: '+Y', facing: '+Z', walkSpeedMps: F.WALK.speed, walkStrideM: F.WALK.stride, clips: clipInfo, estimatedParts: mesh.estimatedParts, inPlace: true,
        note: 'Yürüyüş yerinde (in-place) oynatılır; oyun karakteri walkSpeedMps hızında ilerletilirse ayaklar kaymaz. Sırt/yan renkler tek resimden tahmin edilmiştir.' }, opts.extras || {}) },
    };
    // BIN
    const pad = (4 - (binLen % 4)) % 4; if (pad) { chunks.push(new Uint8Array(pad)); binLen += pad; }
    json.buffers[0].byteLength = binLen;
    let jsonBytes = new TextEncoder().encode(JSON.stringify(json));
    const jpad = (4 - (jsonBytes.length % 4)) % 4;
    if (jpad) { const t = new Uint8Array(jsonBytes.length + jpad); t.set(jsonBytes); t.fill(0x20, jsonBytes.length); jsonBytes = t; }
    const total = 12 + 8 + jsonBytes.length + 8 + binLen, out = new Uint8Array(total), dv = new DataView(out.buffer);
    dv.setUint32(0, 0x46546C67, true); dv.setUint32(4, 2, true); dv.setUint32(8, total, true);
    dv.setUint32(12, jsonBytes.length, true); dv.setUint32(16, 0x4E4F534A, true); out.set(jsonBytes, 20);
    let o = 20 + jsonBytes.length; dv.setUint32(o, binLen, true); dv.setUint32(o + 4, 0x004E4942, true); o += 8;
    for (const c of chunks) { out.set(c, o); o += c.length; }
    return out;
  }

  // ---------------- OKUMA ----------------
  function parseGLB(buf) {
    const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    if (dv.getUint32(0, true) !== 0x46546C67) throw new Error('GLB imzası yok');
    const version = dv.getUint32(4, true), length = dv.getUint32(8, true);
    if (version !== 2) throw new Error('glTF sürümü 2 değil'); if (length !== buf.byteLength) throw new Error('GLB uzunluğu tutarsız');
    let o = 12, json = null, bin = null;
    while (o < length) {
      const cl = dv.getUint32(o, true), ct = dv.getUint32(o + 4, true), data = buf.subarray(o + 8, o + 8 + cl);
      if (ct === 0x4E4F534A) json = JSON.parse(new TextDecoder().decode(data)); else if (ct === 0x004E4942) bin = data;
      o += 8 + cl;
    }
    if (!json || !bin) throw new Error('JSON veya BIN parçası eksik');
    const CT = { 5120: Int8Array, 5121: Uint8Array, 5122: Int16Array, 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array };
    const NC = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };
    function read(i) {
      const a = json.accessors[i], bv = json.bufferViews[a.bufferView], T = CT[a.componentType], nc = NC[a.type];
      const off = (bv.byteOffset || 0) + (a.byteOffset || 0), len = a.count * nc;
      if (off + len * T.BYTES_PER_ELEMENT > bin.length) throw new Error('Erişimci ' + i + ' tampon dışına taşıyor');
      const copy = new Uint8Array(len * T.BYTES_PER_ELEMENT); copy.set(bin.subarray(off, off + copy.length));
      return new T(copy.buffer);
    }
    return { json, bin, read };
  }

  // Yapısal doğrulama + iskelet/animasyon/mesh özet raporu
  function verifyGLB(buf) {
    const rep = { ok: true, errors: [], warnings: [], stats: {} };
    const err = m => { rep.ok = false; rep.errors.push(m); };
    let P; try { P = parseGLB(buf); } catch (e) { return { ok: false, errors: [e.message], warnings: [], stats: {} }; }
    const { json, read } = P;
    const skin = json.skins && json.skins[0]; if (!skin) err('Deri (skin) yok');
    const nJ = skin ? skin.joints.length : 0;
    let verts = 0, tris = 0, weightErr = 0, normErr = 0, jointErr = 0;
    const prims = json.meshes[0].primitives;
    for (const p of prims) {
      const pos = read(p.attributes.POSITION), nrm = read(p.attributes.NORMAL), jnt = read(p.attributes.JOINTS_0), wgt = read(p.attributes.WEIGHTS_0);
      const nv = pos.length / 3; verts += nv;
      for (let i = 0; i < nv; i++) {
        const s = wgt[i * 4] + wgt[i * 4 + 1] + wgt[i * 4 + 2] + wgt[i * 4 + 3]; weightErr = Math.max(weightErr, Math.abs(1 - s));
        normErr = Math.max(normErr, Math.abs(1 - Math.hypot(nrm[i * 3], nrm[i * 3 + 1], nrm[i * 3 + 2])));
        for (let k = 0; k < 4; k++) if (wgt[i * 4 + k] > 0 && jnt[i * 4 + k] >= nJ) jointErr++;
      }
      const idx = read(p.indices); tris += idx.length / 3;
      for (let i = 0; i < idx.length; i++) if (idx[i] >= nv) { err('İndeks aralık dışı'); break; }
    }
    if (weightErr > 1e-3) err('Ağırlık toplamı 1 değil (sapma ' + weightErr.toExponential(2) + ')');
    if (normErr > 1e-3) err('Normal birim değil');
    if (jointErr) err(jointErr + ' vertex geçersiz ekleme bağlı');
    // Ters bağlama matrisleri: dinlenme dünya matrisi ile çarpımı birim olmalı
    let ibmErr = 0;
    if (skin) {
      const ibm = read(skin.inverseBindMatrices), parent = new Array(json.nodes.length).fill(-1);
      json.nodes.forEach((nd, i) => (nd.children || []).forEach(c => { parent[c] = i; }));
      const world = i => { let m = m4.fromTRS(json.nodes[i].translation || [0, 0, 0], json.nodes[i].rotation || [0, 0, 0, 1]); let p = parent[i]; while (p >= 0) { m = m4.mul(m4.fromTRS(json.nodes[p].translation || [0, 0, 0], json.nodes[p].rotation || [0, 0, 0, 1]), m); p = parent[p]; } return m; };
      skin.joints.forEach((j, k) => { const m = m4.mul(world(j), Array.from(ibm.subarray(k * 16, k * 16 + 16))); const I = m4.id(); for (let e = 0; e < 16; e++) ibmErr = Math.max(ibmErr, Math.abs(m[e] - I[e])); });
      if (ibmErr > 1e-4) err('Ters bağlama matrisleri iskeletle tutarsız (' + ibmErr.toExponential(2) + ')');
    }
    // Animasyonlar
    const anims = {};
    for (const a of json.animations || []) {
      let qErr = 0, mono = true, dur = 0;
      for (const ch of a.channels) {
        const s = a.samplers[ch.sampler], tIn = read(s.input), out = read(s.output);
        for (let i = 1; i < tIn.length; i++) if (!(tIn[i] > tIn[i - 1])) mono = false;
        dur = Math.max(dur, tIn[tIn.length - 1]);
        if (ch.target.path === 'rotation') for (let i = 0; i < out.length; i += 4) qErr = Math.max(qErr, Math.abs(1 - Math.hypot(out[i], out[i + 1], out[i + 2], out[i + 3])));
        if (ch.target.node >= json.nodes.length) err('Animasyon geçersiz düğüm hedefliyor');
      }
      if (!mono) err(a.name + ': zaman anahtarları artan değil');
      if (qErr > 1e-3) err(a.name + ': birim olmayan kuaterniyon');
      anims[a.name] = { channels: a.channels.length, duration: +dur.toFixed(3) };
    }
    rep.stats = { vertices: verts, triangles: tris, primitives: prims.length, materials: (json.materials || []).length, joints: nJ, nodes: json.nodes.length, animations: anims, bytes: buf.byteLength,
      jointNames: skin ? skin.joints.map(j => json.nodes[j].name) : [], maxWeightSumError: weightErr, maxIBMError: ibmErr, extras: json.extras || null };
    return rep;
  }

  /* GLB verisinden çizilebilir karakter kur: iskelet (düğüm ötelemeleri), mesh ve animasyon örnekleyici.
     Böylece "dışa aktarılan dosya" yeniden okunup aynı motorla çizilir. */
  function characterFromGLB(buf) {
    const { json, read } = parseGLB(buf);
    const skin = json.skins[0], joints = skin.joints, nJ = joints.length;
    const parent = new Array(json.nodes.length).fill(-1); json.nodes.forEach((nd, i) => (nd.children || []).forEach(c => { parent[c] = i; }));
    const jIndex = new Map(joints.map((j, k) => [j, k]));
    const bones = joints.map((j, k) => ({ name: json.nodes[j].name.replace(/_(L|R|1|2)$/, '.$1'), index: k, parent: parent[j] >= 0 ? jIndex.get(parent[j]) : -1, restLocal: json.nodes[j].translation || [0, 0, 0] }));
    const ibm = read(skin.inverseBindMatrices);
    const skel = { bones, index: Object.fromEntries(bones.map(b => [b.name, b.index])), invBind: bones.map((b, k) => Array.from(ibm.subarray(k * 16, k * 16 + 16))) };
    const prims = json.meshes[0].primitives;
    const all = prims.map(p => ({ P: read(p.attributes.POSITION), N: read(p.attributes.NORMAL), C: read(p.attributes.COLOR_0), J: read(p.attributes.JOINTS_0), W: read(p.attributes.WEIGHTS_0), I: read(p.indices), m: F.MAT_NAMES.indexOf(json.materials[p.material].name.replace('_iki_yuz', '')) }));
    const n = all.reduce((a, x) => a + x.P.length / 3, 0);
    const position = new Float32Array(n * 3), normal = new Float32Array(n * 3), color = new Float32Array(n * 3), jointsA = new Uint8Array(n * 4), weightsA = new Float32Array(n * 4), material = new Uint8Array(n), part = new Uint16Array(n), idxAll = [];
    let base = 0;
    const srgb = c => c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    all.forEach((x, pi) => { const nv = x.P.length / 3; position.set(x.P, base * 3); normal.set(x.N, base * 3); color.set(x.C.map(srgb), base * 3); jointsA.set(x.J, base * 4); weightsA.set(x.W, base * 4); material.fill(x.m, base, base + nv); part.fill(pi, base, base + nv); for (const v of x.I) idxAll.push(v + base); base += nv; });
    const mesh = {
      vertexCount: n, position, normal, color, joints: jointsA, weights: weightsA,
      material, part, index: n > 65535 ? new Uint32Array(idxAll) : new Uint16Array(idxAll), doubleSidedPart: new Uint8Array(prims.map(p => json.materials[p.material].doubleSided ? 1 : 0)), clothPart: null, parts: prims.map((p, i) => ({ name: 'prim' + i })),
    };
    const anim = {};
    for (const a of json.animations) {
      const ch = a.channels.map(c => { const s = a.samplers[c.sampler]; return { k: jIndex.get(c.target.node), path: c.target.path, t: read(s.input), v: read(s.output) }; });
      anim[a.name] = { duration: Math.max(...ch.map(c => c.t[c.t.length - 1])), channels: ch };
    }
    function samplePose(name, time) {
      const pose = { rot: bones.map(() => [0, 0, 0, 1]), trans: bones.map(() => [0, 0, 0]) };
      for (const c of anim[name].channels) {
        const T = c.t; let i = 0; while (i < T.length - 2 && time > T[i + 1]) i++;
        const s = Math.max(0, Math.min(1, (time - T[i]) / ((T[i + 1] - T[i]) || 1)));
        if (c.path === 'rotation') pose.rot[c.k] = q.slerp(Array.from(c.v.subarray(i * 4, i * 4 + 4)), Array.from(c.v.subarray(i * 4 + 4, i * 4 + 8)), s);
        else if (c.path === 'translation') { const a0 = c.v.subarray(i * 3, i * 3 + 3), a1 = c.v.subarray(i * 3 + 3, i * 3 + 6); const rl = bones[c.k].restLocal; pose.trans[c.k] = [0, 1, 2].map(e => a0[e] + (a1[e] - a0[e]) * s - rl[e]); }
      }
      return pose;
    }
    return { skel, mesh, anim, samplePose, json };
  }

  F.exportGLB = exportGLB; F.parseGLB = parseGLB; F.verifyGLB = verifyGLB; F.characterFromGLB = characterFromGLB;
})(typeof self !== 'undefined' ? self : globalThis);
