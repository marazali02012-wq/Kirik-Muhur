/* Forge 3D — tek resimden karakter analizi (yapay zekâ değil, ölçüme dayalı görüntü işleme).
   1) Silüet maskesi (alfa kanalı veya kenardan taşma doldurmalı arka plan temizleme)
   2) Satır profili ile baş/boyun/omuz/kasık/ayak ölçüleri, kol açıklığı
   3) k-ortalamalar ile renk paleti ve malzeme rollerine atama (zırh, kumaş, altın süs, deri, ten, saç)
   4) Pelerin / miğfer / silah yönü tahmini
   Çıktı tahmindir: güven değerleri döner, kullanıcı kaydırıcılarla düzeltebilir.
   Görünmeyen yüzeyler (sırt, yanlar) tek resimden bilinemez; derinlikler anatomik oranlarla TAHMİN edilir. */
(function (root) {
  'use strict';
  const F = root.Forge3D = root.Forge3D || {};
  const clamp = (x, a, b) => x < a ? a : x > b ? b : x;

  function rgb2hsv(r, g, b) {
    r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0;
    if (d) { if (mx === r) h = ((g - b) / d) % 6; else if (mx === g) h = (b - r) / d + 2; else h = (r - g) / d + 4; h *= 60; if (h < 0) h += 360; }
    return [h, mx ? d / mx : 0, mx];
  }

  function buildMask(rgba, w, h) {
    const n = w * h, mask = new Uint8Array(n);
    let transparent = 0; for (let i = 0; i < n; i++) if (rgba[i * 4 + 3] < 20) transparent++;
    let method;
    if (transparent > n * 0.05) { method = 'alpha'; for (let i = 0; i < n; i++) mask[i] = rgba[i * 4 + 3] > 110 ? 1 : 0; }
    else {
      method = 'border-flood';
      // kenar piksellerinin medyan rengi = arka plan
      const bs = []; for (let x = 0; x < w; x++) { bs.push(x, (h - 1) * w + x); } for (let y = 0; y < h; y++) { bs.push(y * w, y * w + w - 1); }
      const med = k => { const a = bs.map(i => rgba[i * 4 + k]).sort((p, q) => p - q); return a[a.length >> 1]; };
      const bg = [med(0), med(1), med(2)];
      const isBg = i => { const r = rgba[i * 4] - bg[0], g = rgba[i * 4 + 1] - bg[1], b = rgba[i * 4 + 2] - bg[2]; return r * r + g * g + b * b < 42 * 42; };
      const seen = new Uint8Array(n), qq = new Int32Array(n); let head = 0, tail = 0;
      for (const i of bs) if (!seen[i] && isBg(i)) { seen[i] = 1; qq[tail++] = i; }
      while (head < tail) {
        const k = qq[head++], x = k % w, y = (k / w) | 0;
        if (x > 0 && !seen[k - 1] && isBg(k - 1)) { seen[k - 1] = 1; qq[tail++] = k - 1; }
        if (x < w - 1 && !seen[k + 1] && isBg(k + 1)) { seen[k + 1] = 1; qq[tail++] = k + 1; }
        if (y > 0 && !seen[k - w] && isBg(k - w)) { seen[k - w] = 1; qq[tail++] = k - w; }
        if (y < h - 1 && !seen[k + w] && isBg(k + w)) { seen[k + w] = 1; qq[tail++] = k + w; }
      }
      for (let i = 0; i < n; i++) mask[i] = seen[i] ? 0 : 1;
    }
    // Bağlı bileşenler: küçük gürültüleri at, ana gövdeyi ve anlamlı parçaları (silah) tut
    const lab = new Int32Array(n).fill(-1), sizes = [], q = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      if (!mask[i] || lab[i] >= 0) continue;
      const id = sizes.length; let head = 0, tail = 0; q[tail++] = i; lab[i] = id;
      while (head < tail) {
        const k = q[head++], x = k % w, y = (k / w) | 0;
        const nb = [x > 0 ? k - 1 : -1, x < w - 1 ? k + 1 : -1, y > 0 ? k - w : -1, y < h - 1 ? k + w : -1];
        for (const m of nb) if (m >= 0 && mask[m] && lab[m] < 0) { lab[m] = id; q[tail++] = m; }
      }
      sizes.push(tail);
    }
    const big = Math.max(0, ...sizes);
    let kept = 0;
    for (let i = 0; i < n; i++) { if (mask[i] && sizes[lab[i]] < big * 0.004) mask[i] = 0; else if (mask[i]) kept++; }
    return { mask, method, components: sizes.filter(s => s >= big * 0.004).length, area: kept };
  }

  function kmeans(samples, k, iters) {
    const n = samples.length / 3; if (!n) return [];
    const cent = []; for (let i = 0; i < k; i++) { const j = Math.floor((i + 0.5) / k * n) * 3; cent.push([samples[j], samples[j + 1], samples[j + 2]]); }
    const asg = new Int32Array(n);
    for (let it = 0; it < iters; it++) {
      for (let i = 0; i < n; i++) {
        let best = 0, bd = 1e18;
        for (let c = 0; c < k; c++) { const dr = samples[i * 3] - cent[c][0], dg = samples[i * 3 + 1] - cent[c][1], db = samples[i * 3 + 2] - cent[c][2], d = dr * dr + dg * dg + db * db; if (d < bd) { bd = d; best = c; } }
        asg[i] = best;
      }
      const sum = cent.map(() => [0, 0, 0, 0]);
      for (let i = 0; i < n; i++) { const s = sum[asg[i]]; s[0] += samples[i * 3]; s[1] += samples[i * 3 + 1]; s[2] += samples[i * 3 + 2]; s[3]++; }
      for (let c = 0; c < k; c++) if (sum[c][3]) cent[c] = [sum[c][0] / sum[c][3], sum[c][1] / sum[c][3], sum[c][2] / sum[c][3]];
    }
    const cnt = new Array(k).fill(0); for (let i = 0; i < n; i++) cnt[asg[i]]++;
    return cent.map((c, i) => ({ rgb: c.map(Math.round), share: cnt[i] / n, hsv: rgb2hsv(c[0], c[1], c[2]) })).filter(c => c.share > 0.005).sort((a, b) => b.share - a.share);
  }

  function regionMedian(rgba, mask, w, x0, y0, x1, y1) {
    const R = [], G = [], B = [];
    for (let y = Math.max(0, y0 | 0); y < y1; y++) for (let x = Math.max(0, x0 | 0); x < x1; x++) { const i = y * w + x; if (!mask[i]) continue; R.push(rgba[i * 4]); G.push(rgba[i * 4 + 1]); B.push(rgba[i * 4 + 2]); }
    if (!R.length) return null; const m = a => a.sort((p, q) => p - q)[a.length >> 1]; return [m(R), m(G), m(B)];
  }

  /* Ana analiz. Dönüş: { ok, body, palette, style, confidence, landmarks, notes } */
  function analyzeCharacterImage(rgba, w, h, opts) {
    opts = opts || {};
    const { mask, method, components, area } = buildMask(rgba, w, h);
    const notes = [];
    if (area < 200) return { ok: false, error: 'Resimde karakter silüeti bulunamadı' };
    let top = h, bot = -1, left = w, right = -1;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (mask[y * w + x]) { if (y < top) top = y; if (y > bot) bot = y; if (x < left) left = x; if (x > right) right = x; }
    const H = bot - top + 1;
    // Satır profilleri
    const rows = [];
    for (let y = top; y <= bot; y++) {
      let l = -1, r = -1, cnt = 0, runs = []; let inRun = false, rs = 0;
      for (let x = left; x <= right + 1; x++) {
        const on = x <= right && mask[y * w + x];
        if (on) { cnt++; if (l < 0) l = x; r = x; if (!inRun) { inRun = true; rs = x; } }
        else if (inRun) { inRun = false; runs.push([rs, x - 1]); }
      }
      rows.push({ y, l, r, cnt, runs });
    }
    const R = f => rows[clamp(Math.round(f * (H - 1)), 0, H - 1)];
    // Gövde merkez sütunu: gövde bandındaki sütun yoğunluğunun tepe noktası
    const colHist = new Float32Array(w);
    for (let y = top + Math.round(H * 0.25); y < top + Math.round(H * 0.55); y++) for (let x = left; x <= right; x++) if (mask[y * w + x]) colHist[x]++;
    let cx = left, best = -1; for (let x = left; x <= right; x++) { let s = 0; for (let d = -3; d <= 3; d++) s += colHist[clamp(x + d, 0, w - 1)]; if (s > best) { best = s; cx = x; } }
    // Baş genellikle gövde eksenindedir: üst %10'un medyan x'i daha güvenilir (silah/kol yoğunluğu ekseni kaydırmaz)
    { const xs = []; for (let y = top; y < top + Math.round(H * 0.1); y++) for (let x = left; x <= right; x++) if (mask[y * w + x]) xs.push(x); if (xs.length > 20) { xs.sort((a, b) => a - b); cx = xs[xs.length >> 1]; } }
    const runAt = (row, x) => row.runs.find(r => r[0] <= x && r[1] >= x) || null;
    // Baş ve boyun
    let headW = 0, neckIdx = Math.round(H * 0.13), minW = 1e9;
    for (let i = 0; i < Math.round(H * 0.12); i++) { const ru = runAt(rows[i], cx); if (ru) headW = Math.max(headW, ru[1] - ru[0] + 1); }
    for (let i = Math.round(H * 0.08); i < Math.round(H * 0.2); i++) { const ru = runAt(rows[i], cx); const wd = ru ? ru[1] - ru[0] + 1 : 0; if (wd > 0 && wd < minW) { minW = wd; neckIdx = i; } }
    const headFrac = clamp(neckIdx / H, 0.105, 0.19);
    // Omuz genişliği (omuzluklar dahil dış hat)
    let shoulderPx = 0, shoulderIdx = neckIdx;
    for (let i = neckIdx; i < Math.min(H, neckIdx + Math.round(H * 0.12)); i++) { const wd = rows[i].r - rows[i].l + 1; if (wd > shoulderPx) { shoulderPx = wd; shoulderIdx = i; } }
    // Kasık: alttan yukarı, merkez sütun boş ve iki yanda doluluk varken
    let crotchIdx = -1;
    for (let i = H - 1; i > H * 0.35; i--) {
      const row = rows[i]; const centerOn = mask[row.y * w + cx] || mask[row.y * w + cx - 1] || mask[row.y * w + cx + 1];
      const leftOn = row.runs.some(r => r[1] < cx - 1), rightOn = row.runs.some(r => r[0] > cx + 1);
      if (!centerOn && leftOn && rightOn) crotchIdx = i; else if (crotchIdx >= 0 && centerOn) break;
    }
    let legFrac = crotchIdx > 0 ? (H - crotchIdx) / H : 0.47;
    if (crotchIdx < 0) notes.push('Kasık açıklığı görülmedi (önlük/cüppe olabilir); bacak boyu ortalama oranla tahmin edildi.');
    if (legFrac < 0.43) { notes.push('Bacak arası açıklık diz hizasında başlıyor (önlük/etek örtüyor); bacak oranı 0.49 kabul edildi (düzeltilebilir).'); legFrac = 0.49; }
    legFrac = clamp(legFrac, 0.40, 0.52);
    // Kollar: gövde bandında merkezden ayrı koşular
    let armSamples = [];
    for (let i = shoulderIdx + Math.round(H * 0.06); i < Math.min(H, Math.round(H * 0.55)); i++) {
      const row = rows[i]; if (row.runs.length >= 3) {
        const core = runAt(row, cx); if (!core) continue;
        const lr = row.runs.filter(r => r[1] < core[0]), rr = row.runs.filter(r => r[0] > core[1]);
        if (lr.length && rr.length) armSamples.push({ i, lx: (lr[lr.length - 1][0] + lr[lr.length - 1][1]) / 2, rx: (rr[0][0] + rr[0][1]) / 2 });
      }
    }
    let armSpread = 0.3;
    if (armSamples.length > 4) {
      const a = armSamples[armSamples.length - 1], dy = (a.i - shoulderIdx) || 1, half = shoulderPx / 2 * 0.8;
      const off = ((cx - a.lx) + (a.rx - cx)) / 2 - half;
      armSpread = clamp(Math.atan2(Math.max(0, off) + half * 0.15, dy), 0.12, 0.6);
    } else notes.push('Kollar gövdeden ayrık görünmüyor; kol açısı varsayılan.');
    // Ayak açıklığı
    const fr = R(0.985);
    const stance = fr.runs.length >= 2 ? (fr.runs[fr.runs.length - 1][0] + fr.runs[fr.runs.length - 1][1] - fr.runs[0][0] - fr.runs[0][1]) / 2 / H : 0.12;
    // Gövde genişlikleri
    const widthAt = f => { const row = R(f), ru = runAt(row, cx); return ru ? (ru[1] - ru[0] + 1) / H : 0; };
    const chestFrac = widthAt(headFrac + 0.13), waistFrac = widthAt(1 - legFrac - 0.1), hipFrac = widthAt(1 - legFrac - 0.02);
    // Asimetrik uzantı: silah / kalkan
    let leftExt = 0, rightExt = 0, aboveHead = false;
    for (let i = Math.round(H * 0.3); i < H; i++) { leftExt = Math.max(leftExt, cx - rows[i].l); rightExt = Math.max(rightExt, rows[i].r - cx); }
    for (let i = 0; i < Math.round(H * 0.06); i++) { const row = rows[i]; if (row.runs.length && (row.l < cx - H * 0.14 || row.r > cx + H * 0.14)) aboveHead = true; }
    const asym = (leftExt - rightExt) / H;
    let weaponGuess = null;
    if (aboveHead) weaponGuess = 'staff'; else if (Math.abs(asym) > 0.07) weaponGuess = 'sword';
    // Renk paleti (k-ortalama)
    const samp = []; const step = Math.max(1, Math.floor(Math.sqrt(area / 5000)));
    for (let y = top; y <= bot; y += step) for (let x = left; x <= right; x += step) { const i = y * w + x; if (mask[i]) samp.push(rgba[i * 4], rgba[i * 4 + 1], rgba[i * 4 + 2]); }
    const clusters = kmeans(samp, 8, 12);
    const hw = Math.max(4, headW);
    const hair = regionMedian(rgba, mask, w, cx - hw * 0.35, top, cx + hw * 0.35, top + H * 0.035);
    const skin = regionMedian(rgba, mask, w, cx - hw * 0.14, top + H * headFrac * 0.45, cx + hw * 0.14, top + H * headFrac * 0.75);
    const chest = regionMedian(rgba, mask, w, cx - H * 0.04, top + H * (headFrac + 0.08), cx + H * 0.04, top + H * (headFrac + 0.16));
    const pick = (fn, fallback) => { const c = clusters.filter(fn).sort((a, b) => b.share - a.share)[0]; return c ? c.rgb : fallback; };
    const isGold = c => c.hsv[0] > 25 && c.hsv[0] < 60 && c.hsv[1] > 0.3 && c.hsv[2] > 0.45;
    const isMetal = c => c.hsv[1] < 0.28 && c.hsv[2] > 0.35;
    const isLeather = c => c.hsv[0] >= 8 && c.hsv[0] < 40 && c.hsv[1] > 0.3 && c.hsv[2] < 0.5 && c.hsv[2] > 0.15;
    const isCloth = c => c.hsv[1] > 0.3 && c.hsv[2] > 0.2 && !isGold(c) && !isLeather(c) && !(c.hsv[0] > 10 && c.hsv[0] < 35 && c.hsv[2] > 0.6);
    const D = F.DEFAULT_PALETTE;
    // Boyalı resimdeki gölgeler modele ayrıca uygulanacağı için temsilci renkler aydınlatılır
    const lift = (rgb, minV, desat) => { const hv = rgb2hsv(...rgb), k = hv[2] < minV ? minV / Math.max(0.05, hv[2]) : 1; const g = (rgb[0] + rgb[1] + rgb[2]) / 3; return rgb.map(v => Math.round(clamp((v + (g - v) * (desat || 0)) * k, 0, 255))); };
    const clothC = clusters.filter(isCloth).sort((a, b) => b.share * b.hsv[1] - a.share * a.hsv[1])[0];
    const metalC = clusters.filter(c => c.hsv[2] > 0.3 && c.hsv[2] < 0.8 && c.hsv[1] < 0.32 && c.share > 0.03).sort((a, b) => b.share - a.share)[0];
    const palette = {
      metal: metalC ? lift(metalC.rgb, 0.52, 0.6) : D.metal, trim: lift(pick(isGold, D.trim), 0.75), cloth: clothC ? lift(clothC.rgb, 0.55) : D.cloth, leather: pick(isLeather, D.leather),
      skin: skin && rgb2hsv(...skin)[1] > 0.12 && rgb2hsv(...skin)[0] < 50 ? skin : D.skin, hair: hair || D.hair,
    };
    palette.under = palette.cloth.map(v => Math.round(v * 0.55 + 20));
    palette.gem = (() => { const c = clusters.filter(c => c.hsv[1] > 0.55 && c.hsv[2] > 0.6).sort((a, b) => b.hsv[1] - a.hsv[1])[0]; return c ? c.rgb : D.gem; })();
    const metalShare = clusters.filter(isMetal).reduce((a, c) => a + c.share, 0), clothShare = clusters.filter(isCloth).reduce((a, c) => a + c.share, 0);
    // Pelerin: kol hizasının dışında, kumaş renginde piksel
    let capeVotes = 0, capeTot = 0;
    for (let i = Math.round(H * 0.35); i < Math.round(H * 0.75); i += 2) {
      const row = rows[i]; for (const x of [row.l + 1, row.r - 1]) { const k = row.y * w + x; if (!mask[k]) continue; capeTot++; const hv = rgb2hsv(rgba[k * 4], rgba[k * 4 + 1], rgba[k * 4 + 2]); const cc = rgb2hsv(...palette.cloth); if (Math.abs(hv[0] - cc[0]) < 25 && hv[1] > 0.25) capeVotes++; }
    }
    // Pelerin: diz hizasında (0.72H) gövde eksenine yakın, kalın (ince bıçak değil) parçaların genişliği / omuz genişliği.
    // Pelerin arkadan iki yana taşar; pelerinsiz karakterde bu oran bacak genişliği kadardır. (Sentetik testte ayrım: ≤0.71 / ≥0.88)
    const capeRow = R(0.72), thick = H * 0.03;
    const near = capeRow.runs.filter(r => r[1] - r[0] + 1 >= thick && Math.abs((r[0] + r[1]) / 2 - cx) < shoulderPx * 0.62);
    const capeWidthRatio = near.length ? (Math.max(...near.map(r => r[1])) - Math.min(...near.map(r => r[0])) + 1) / Math.max(1, shoulderPx) : 0;
    const style = {
      cape: capeWidthRatio > 0.8 || (capeWidthRatio > 0.74 && capeTot > 0 && capeVotes / capeTot > 0.5),
      armor: metalShare > 0.28 ? 'heavy' : metalShare > 0.14 ? 'medium' : clothShare > 0.45 ? 'robe' : 'light',
      helmet: hair && rgb2hsv(...hair)[1] < 0.25 && rgb2hsv(...hair)[2] > 0.55 ? 'full' : 'circlet',
      weapon: weaponGuess || 'sword',
      pauldrons: shoulderPx / H > 0.3 ? 'large' : 'small',
    };
    // Gövde ölçülerine çevir (kanonik 1.80 m)
    const Hm = opts.heightMeters || 1.8, base = F.DEFAULT_BODY;
    const legM = legFrac * Hm;
    // Kollar gövdeye değiyorsa ölçülen satır genişliği kolları da içerir: o zaman omuz genişliğinden oranla türetilir
    const shoulderW = clamp(shoulderPx / H * Hm * 0.62, 0.36, 0.56);
    const armsSeparate = armSamples.length > 4;
    const fromShoulder = { chestW: shoulderW * 0.82, waistW: shoulderW * 0.64, hipW: shoulderW * 0.72 };
    const body = {
      height: Hm, headH: clamp(headFrac * Hm * 0.95, 0.2, 0.33), headW: clamp(headW / H * Hm * 0.9, 0.16, 0.26), shoulderW,
      chestW: clamp(armsSeparate && chestFrac ? Math.min(chestFrac * Hm * 0.9, fromShoulder.chestW * 1.1) : fromShoulder.chestW, 0.3, 0.5),
      waistW: clamp(armsSeparate && waistFrac ? Math.min(waistFrac * Hm * 0.85, fromShoulder.waistW * 1.15) : fromShoulder.waistW, 0.24, 0.42),
      hipW: clamp(armsSeparate && hipFrac ? Math.min(hipFrac * Hm * 0.85, fromShoulder.hipW * 1.15) : fromShoulder.hipW, 0.26, 0.45),
      thigh: clamp((legM - base.ankleH) * 0.505, 0.33, 0.5), shin: clamp((legM - base.ankleH) * 0.495, 0.32, 0.5),
      armSpread, legGap: clamp(stance * Hm * 0.7, 0.08, 0.22),
    };
    // Derinlikler: tek resimden bilinemez — anatomik oranla tahmin
    body.chestD = body.chestW * 0.62; body.waistD = body.waistW * 0.65; body.hipD = body.hipW * 0.63;
    body.bulk = clamp(0.9 + (style.armor === 'heavy' ? 0.1 : 0) + (shoulderPx / H - 0.3) * 0.5, 0.85, 1.2);
    notes.push('Derinlik (göğüs/bel/kalça kalınlığı) ve sırt/yan renkler tek resimden kesin bilinemez; anatomik oranlarla tahmin edildi.');
    const confidence = clamp(0.35 + (crotchIdx > 0 ? 0.2 : 0) + (armSamples.length > 4 ? 0.2 : 0) + (method === 'alpha' ? 0.15 : 0.05) + (components <= 3 ? 0.1 : 0), 0, 1);
    return {
      ok: true, method, confidence, body, palette, style, notes,
      clusters: clusters.map(c => ({ rgb: c.rgb, share: +c.share.toFixed(3) })),
      landmarks: { top, bot, left, right, cx, neckY: top + neckIdx, shoulderY: top + shoulderIdx, crotchY: crotchIdx >= 0 ? top + crotchIdx : null, H },
      ratios: { headFrac: +headFrac.toFixed(3), legFrac: +legFrac.toFixed(3), shoulderFrac: +(shoulderPx / H).toFixed(3), asym: +asym.toFixed(3), capeWidthRatio: +capeWidthRatio.toFixed(3) },
    };
  }

  // Yan görünüşten derinlik (varsa): satır genişlikleri göğüs/bel/kalça derinliğine çevrilir
  function analyzeSideDepth(rgba, w, h, frontResult) {
    const { mask } = buildMask(rgba, w, h);
    let top = h, bot = -1; for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (mask[y * w + x]) { if (y < top) top = y; if (y > bot) bot = y; }
    if (bot < 0) return null; const H = bot - top + 1, Hm = frontResult.body.height;
    const core = f => { const y = top + Math.round(f * (H - 1)); let best = 0, run = 0; for (let x = 0; x < w; x++) { if (mask[y * w + x]) { run++; best = Math.max(best, run); } else run = 0; } return best / H * Hm; };
    const hf = frontResult.ratios.headFrac, lf = frontResult.ratios.legFrac;
    // Pelerin yan görünüşte kalınlığa eklenir: %35 düşülür (tahmin)
    const b = frontResult.body, lim = (v, ref) => clamp(v, ref * 0.8, ref * 1.2);
    return { chestD: lim(core(hf + 0.13) * 0.62, b.chestD), waistD: lim(core(1 - lf - 0.1) * 0.6, b.waistD), hipD: lim(core(1 - lf - 0.02) * 0.6, b.hipD) };
  }

  F.buildMask = buildMask; F.analyzeCharacterImage = analyzeCharacterImage; F.analyzeSideDepth = analyzeSideDepth; F.rgb2hsv = rgb2hsv; F.kmeans = kmeans;
})(typeof self !== 'undefined' ? self : globalThis);
