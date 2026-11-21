/* Forge 3D — üst düzey akış: (resim analizi | tarif) -> 3B karakter -> iskelet -> animasyon -> 8 yön sprite -> ZIP / GLB.
   Sprite kuralları: her animasyon 8 kare, 4x2 sayfa, 256x256 kare, şeffaf PNG, tüm yön ve animasyonlarda AYNI ölçek ve
   AYNI ayak hizası (zemin çizgisi). Ölçek, 5 animasyonun 8 yöndeki tüm karelerine sığacak şekilde bir kez hesaplanır. */
(function (root) {
  'use strict';
  const F = root.Forge3D = root.Forge3D || {};
  const { clamp } = F;

  const DIRS = ['Ön', 'Ön-sağ', 'Sağ', 'Arka-sağ', 'Arka', 'Arka-sol', 'Sol', 'Ön-sol'];
  const DIR_KEYS = ['front', 'front_right', 'right', 'back_right', 'back', 'back_left', 'left', 'front_left'];
  const FRAME = 256, PER = 8, COLS = 4, ROWS = 2, PITCH = 0.33;

  // ---- Tariften (Türkçe metin) kural tabanlı parametreler. Yapay zekâ değildir; anahtar kelime eşlemesidir. ----
  const COLORS = [
    [/kirmizi|al |ates|kizil/, [168, 38, 34]], [/mavi|lacivert|deniz/, [44, 66, 150]], [/yesil|orman|zumrut/, [40, 120, 62]],
    [/mor|golge|eflatun/, [102, 48, 140]], [/siyah|kara|karanlik/, [34, 34, 42]], [/beyaz|ak |kutsal/, [222, 222, 230]],
    [/turuncu/, [214, 112, 34]], [/sari/, [214, 182, 40]], [/buz|don|ayaz/, [120, 190, 228]], [/kahve|toprak/, [110, 74, 46]],
  ];
  const norm = s => (s || '').toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i') + ' ';
  function parsePrompt(text) {
    const p = norm(text), style = {}, palette = {}, body = {}, found = [];
    const W = [[/kilic|pala|sword/, 'sword'], [/balta|axe/, 'axe'], [/mizrak|kargi|spear/, 'spear'], [/asa|degnek|staff|buyucu/, 'staff'], [/topuz|gurz|mace/, 'mace'], [/cekic|hammer/, 'hammer'], [/hancer|dagger/, 'dagger']];
    for (const [re, w] of W) if (re.test(p)) { style.weapon = w; found.push('silah: ' + w); break; }
    if (/kalkan|shield/.test(p)) { style.shield = true; found.push('kalkan'); }
    if (/pelerinsiz|pelerin yok/.test(p)) style.cape = false; else if (/pelerin|cape/.test(p)) { style.cape = true; found.push('pelerin'); }
    if (/migfer|kask|helmet/.test(p)) { style.helmet = 'full'; found.push('miğfer'); } else if (/tac|crown/.test(p)) style.helmet = 'circlet';
    if (/cuppe|robe|buyucu/.test(p)) { style.armor = 'robe'; style.pauldrons = 'none'; found.push('cüppe'); }
    else if (/agir zirh|sovalye|paladin/.test(p)) style.armor = 'heavy'; else if (/hafif|deri zirh|okcu|haydut/.test(p)) { style.armor = 'light'; style.pauldrons = 'small'; }
    if (/iri|dev |kalin|devasa/.test(p)) { body.bulk = 1.18; body.shoulderW = 0.52; found.push('iri'); }
    if (/zayif|ince|cevik/.test(p)) { body.bulk = 0.88; found.push('ince'); }
    if (/cuce|kisa/.test(p)) { body.height = 1.45; body.thigh = 0.33; body.shin = 0.32; found.push('kısa'); }
    if (/uzun boy|devasa|titan/.test(p)) body.height = 1.98;
    // renkler: ilk renk kumaş/pelerin, "zırh" sözcüğüne yakın olan zırh rengi
    const hits = []; for (const [re, c] of COLORS) { const m = p.match(re); if (m) hits.push([m.index, c, m[0].trim()]); }
    hits.sort((a, b) => a[0] - b[0]);
    if (hits.length) { palette.cloth = hits[0][1]; found.push('renk: ' + hits[0][2]); }
    const zi = p.search(/zirh/);
    if (zi >= 0 && hits.length) { const near = hits.slice().sort((a, b) => Math.abs(a[0] - zi) - Math.abs(b[0] - zi))[0]; if (Math.abs(near[0] - zi) < 14 && !/siyah|kara/.test(near[2])) palette.metal = mixc(near[1], [160, 165, 178], 0.55); if (/siyah|kara/.test(near[2])) palette.metal = [62, 62, 72]; }
    if (/altin|gold/.test(p)) palette.trim = [214, 172, 70]; if (/gumus|silver/.test(p)) palette.trim = [200, 205, 215];
    if (/sari sac|sarisin/.test(p)) palette.hair = [214, 182, 98]; if (/kizil sac/.test(p)) palette.hair = [150, 60, 30]; if (/beyaz sac|ak sac/.test(p)) palette.hair = [220, 220, 225];
    if (palette.cloth) palette.under = palette.cloth.map(v => Math.round(v * 0.55 + 20));
    return { style, palette, body, found };
  }
  const mixc = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

  /* Karakter oluştur. src: { analysis, prompt, body, palette, style, seed } — sonraki alanlar öncekileri ezer. */
  function createCharacter(src) {
    src = src || {};
    const body = Object.assign({}, src.analysis ? src.analysis.body : {}, src.promptParams ? src.promptParams.body : {}, src.body || {});
    const palette = Object.assign({}, src.analysis ? src.analysis.palette : {}, src.promptParams ? src.promptParams.palette : {}, src.palette || {});
    const style = Object.assign({}, F.DEFAULT_STYLE, src.analysis ? src.analysis.style : {}, src.promptParams ? src.promptParams.style : {}, src.style || {});
    const skel = F.buildSkeleton(body);
    skel.style = style;
    const mesh = F.buildWarriorMesh(skel, palette, style, src.seed || 7);
    return { skel, mesh, params: { body: skel.body, palette: mesh.palette, style }, framing: null };
  }

  function poseSkin(ch, clip, t) {
    const r = F.sampleClip(ch.skel, clip, t), W = F.poseWorld(ch.skel, r.pose);
    return { res: r, world: W, skinned: F.skinVertices(ch.mesh, F.skinMatrices(ch.skel, W)) };
  }

  // Tüm kare ve yönlere sığan tek ölçek + ortak ayak hizası
  function computeFraming(ch, opts) {
    opts = opts || {}; const margin = opts.margin == null ? 8 : opts.margin, S = opts.frame || FRAME;
    let maxX = 0, maxUp = 0, maxDown = 0;
    const P = ch.mesh.vertexCount;
    for (const clip of F.CLIP_KEYS) for (let i = 0; i < PER; i++) {
      const { skinned } = poseSkin(ch, clip, F.frameTime(clip, i, PER)), pos = skinned.pos;
      for (let d = 0; d < 8; d++) {
        const { r, u } = F.cameraBasis(d * Math.PI / 4, PITCH);
        for (let v = 0; v < P; v += 2) {
          const x = pos[v * 3], y = pos[v * 3 + 1], z = pos[v * 3 + 2];
          const sx = x * r[0] + y * r[1] + z * r[2], sy = x * u[0] + y * u[1] + z * u[2];
          if (Math.abs(sx) > maxX) maxX = Math.abs(sx); if (sy > maxUp) maxUp = sy; if (-sy > maxDown) maxDown = -sy;
        }
      }
    }
    const shadowDown = 0.06; maxDown = Math.max(maxDown, shadowDown);
    const scale = Math.min((S / 2 - margin) / maxX, (S - 2 * margin) / (maxUp + maxDown));
    const cy = Math.round(S - margin - maxDown * scale);
    return { scale: +scale.toFixed(3), cx: S / 2, cy, pitch: PITCH, frame: S, extents: { maxX, maxUp, maxDown } };
  }

  function renderFrame(ch, clip, i, dir, opts) {
    opts = opts || {};
    const fr = ch.framing || (ch.framing = computeFraming(ch));
    const { res, skinned } = poseSkin(ch, clip, F.frameTime(clip, i, PER));
    const S = fr.frame;
    const r = F.render(ch.mesh, skinned, {
      width: S, height: S, yaw: dir * Math.PI / 4, pitch: fr.pitch, scale: fr.scale, cx: fr.cx, cy: fr.cy, ss: opts.ss || 2,
      shadow: opts.shadow === false ? null : { cx: fr.cx, cy: fr.cy, rx: 0.36 * fr.scale, ry: 0.36 * fr.scale * Math.sin(fr.pitch), alpha: 0.3 },
      tint: res.tint && res.tint[3] > 0.01 ? res.tint : null, bg: opts.bg || null,
    });
    if (clip === 'attack' && opts.trail !== false) drawTrail(ch, F.frameTime(clip, i, PER), dir, r, fr);
    r.contacts = res.contacts; return r;
  }

  // Saldırı izi: kılıcın gerçek 3B yolundan (son 0,12 normalize zaman) yarı saydam şerit
  function bladeSeg(ch, clip, t) {
    const J = ch.skel.index, res = F.sampleClip(ch.skel, clip, t), W = F.poseWorld(ch.skel, res.pose);
    const wf = F.weaponFrame(ch.skel, n => ch.skel.bones[J[n]].restWorld), g = W.wpos[J.weapon], d = F.q.rotate(W.wrot[J.weapon], wf.dir);
    const reach = { sword: 0.95, dagger: 0.42, axe: 0.86, hammer: 0.78, mace: 0.84, spear: 1.25, staff: 1.08 }[(ch.skel.style || {}).weapon] || 0.95;
    return [F.v3.add(g, F.v3.scale(d, reach * 0.45)), F.v3.add(g, F.v3.scale(d, reach))];
  }
  function drawTrail(ch, t, dir, r, fr) {
    if (t < 0.3 || t > 0.6 || !(ch.skel.style && ch.skel.style.weapon !== 'none')) return;
    const N = 7, pts = [], opt = { yaw: dir * Math.PI / 4, pitch: fr.pitch, scale: fr.scale, cx: fr.cx, cy: fr.cy };
    for (let k = 0; k <= N; k++) { const seg = bladeSeg(ch, 'attack', Math.max(0.33, t - k * 0.018)); pts.push(seg.map(p => F.project(p, opt))); }
    const W = r.width, H = r.height, px = r.rgba;
    const tri = (a, b, c, al) => {
      const minX = Math.max(0, Math.floor(Math.min(a[0], b[0], c[0]))), maxX = Math.min(W - 1, Math.ceil(Math.max(a[0], b[0], c[0])));
      const minY = Math.max(0, Math.floor(Math.min(a[1], b[1], c[1]))), maxY = Math.min(H - 1, Math.ceil(Math.max(a[1], b[1], c[1])));
      const ar = (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]); if (Math.abs(ar) < 1e-6) return;
      for (let y = minY; y <= maxY; y++) for (let x = minX; x <= maxX; x++) {
        const X = x + 0.5, Y = y + 0.5;
        const w0 = ((b[0] - X) * (c[1] - Y) - (c[0] - X) * (b[1] - Y)) / ar, w1 = ((c[0] - X) * (a[1] - Y) - (a[0] - X) * (c[1] - Y)) / ar, w2 = 1 - w0 - w1;
        if (w0 < 0 || w1 < 0 || w2 < 0) continue;
        const o = (y * W + x) * 4, sa = px[o + 3] / 255, ta = al * (0.35 + 0.65 * (w1 + w2 * 0.5));
        if (sa > 0.9) continue; // karakterin önüne değil, arkasındaki boşluğa çizilir
        const na = ta + sa * (1 - ta);
        px[o] = (190 * ta + px[o] * sa * (1 - ta)) / na; px[o + 1] = (235 * ta + px[o + 1] * sa * (1 - ta)) / na; px[o + 2] = (255 * ta + px[o + 2] * sa * (1 - ta)) / na; px[o + 3] = na * 255;
      }
    };
    for (let k = 0; k < N; k++) {
      const a0 = pts[k][0], a1 = pts[k][1], b0 = pts[k + 1][0], b1 = pts[k + 1][1], al = 0.42 * (1 - k / N);
      tri(a0, a1, b1, al); tri(a0, b1, b0, al);
    }
  }

  function renderSheet(ch, clip, dir, opts) {
    const S = (ch.framing || (ch.framing = computeFraming(ch))).frame, W = S * COLS, H = S * ROWS, out = new Uint8ClampedArray(W * H * 4);
    const contacts = [];
    for (let i = 0; i < PER; i++) {
      const r = renderFrame(ch, clip, i, dir, opts), ox = (i % COLS) * S, oy = Math.floor(i / COLS) * S;
      for (let y = 0; y < S; y++) out.set(r.rgba.subarray(y * S * 4, (y + 1) * S * 4), ((oy + y) * W + ox) * 4);
      contacts.push(r.contacts);
    }
    return { rgba: out, width: W, height: H, contacts };
  }

  // Ayak hizası denetimi: her karede opak (alfa>200) en alt satır
  function footRows(sheet, S) {
    const rows = []; const W = sheet.width;
    for (let i = 0; i < PER; i++) {
      const ox = (i % COLS) * S, oy = Math.floor(i / COLS) * S; let low = -1;
      for (let y = S - 1; y >= 0 && low < 0; y--) for (let x = 0; x < S; x++) if (sheet.rgba[((oy + y) * W + ox + x) * 4 + 3] > 200) { low = y; break; }
      rows.push(low);
    }
    return rows;
  }

  function manifest(ch, extra) {
    const fr = ch.framing || computeFraming(ch);
    const clips = {};
    for (const k of F.CLIP_KEYS) { const c = F.CLIPS[k]; clips[k] = { label: c.label, frames: PER, durationSec: c.duration, fps: +(PER / c.duration).toFixed(2), loop: c.loop, lastFrameIsEnd: !!(c.holdLast || k === 'hurt') }; }
    return Object.assign({
      schema: 'forge25d.v12.true3d', generator: 'Forge 2.5D V12 — yerel CPU 3B motoru (harici servis yok)', generationMethod: 'procedural-3d-mesh + skeletal-animation + cpu-software-render',
      isTrue3D: true, isSkeletalRigged: true, animationType: '3d-skeletal-ik',
      directions: DIRS, directionKeys: DIR_KEYS, directionConvention: 'dirN: kamera karakterin etrafında N*45°; "Sağ" = karakterin sağ yanı görünür, ekranda sağa bakar (V11.2 ile aynı)',
      actions: F.CLIP_KEYS, framesPerAction: PER, atlasColumns: COLS, atlasRows: ROWS, frameWidth: fr.frame, frameHeight: fr.frame, transparent: true,
      footBaselineY: fr.cy, originX: fr.cx, pixelsPerMeter: fr.scale, cameraPitchDeg: +(fr.pitch * 180 / Math.PI).toFixed(1),
      walk: { inPlace: true, speedMetersPerSec: +F.WALK.speed.toFixed(3), speedPixelsPerSec: +(F.WALK.speed * fr.scale).toFixed(1), strideMeters: +F.WALK.stride.toFixed(3),
        note: 'Karakteri oyunda bu hızla ilerletin; basan ayak zeminde kaymaz.' },
      clips, estimatedParts: ch.mesh.estimatedParts, mesh: { vertices: ch.mesh.vertexCount, triangles: ch.mesh.triangleCount, bones: ch.skel.bones.length },
      params: ch.params, license: 'Bu proje için yerel olarak üretilmiş özgün çıktı',
    }, extra || {});
  }

  /* 40 sayfa + manifest + (isteğe bağlı) GLB içeren ZIP. encode: async (rgba,w,h)->Uint8Array PNG.
     onProgress(done,total,name), shouldCancel()->bool, resume: önceden üretilmiş dosyalar (devam etmek için). */
  async function buildSpriteZip(ch, opts) {
    opts = opts || {};
    if (!ch.framing) ch.framing = computeFraming(ch);
    const files = opts.resume ? opts.resume.slice() : [];
    const have = new Set(files.map(f => f.name)), total = 8 * F.CLIP_KEYS.length;
    const footReport = {};
    let done = files.filter(f => f.name.endsWith('.png')).length;
    for (let d = 0; d < 8; d++) for (const clip of F.CLIP_KEYS) {
      const name = `directions/dir${d}_${DIR_KEYS[d]}/${clip}.png`;
      if (have.has(name)) continue;
      if (opts.shouldCancel && opts.shouldCancel()) return { cancelled: true, files, done, total };
      const sh = renderSheet(ch, clip, d, opts.renderOpts);
      footReport[name] = footRows(sh, ch.framing.frame);
      const png = await opts.encode(sh.rgba, sh.width, sh.height);
      files.push({ name, data: png }); done++;
      if (opts.onProgress) await opts.onProgress(done, total, name);
    }
    const man = manifest(ch, { footRowsPerSheet: footReport });
    files.push({ name: 'manifest.json', data: new TextEncoder().encode(JSON.stringify(man, null, 2)) });
    if (opts.glb) files.push({ name: 'model/forge_savasci.glb', data: opts.glb });
    return { cancelled: false, zip: F.makeZipBytes(files), files, manifest: man, done, total };
  }

  F.DIRS = DIRS; F.DIR_KEYS = DIR_KEYS; F.SPRITE = { FRAME, PER, COLS, ROWS, PITCH };
  F.parsePrompt = parsePrompt; F.createCharacter = createCharacter; F.computeFraming = computeFraming; F.renderFrame = renderFrame;
  F.renderSheet = renderSheet; F.footRows = footRows; F.spriteManifest = manifest; F.buildSpriteZip = buildSpriteZip; F.poseSkin = poseSkin;
})(typeof self !== 'undefined' ? self : globalThis);
