/* Forge Yerel Rüya (Local Dream) motoru — Web Worker tarafı.
   ONNX Runtime Web (WASM, yalnızca CPU) ile difüzyon örneklemesi. İnternet, GPU, uzak sunucu kullanmaz.
   Ana iş parçacığı bu dosyayı Blob URL ile çalıştırır; çalışma zamanı ve model baytları mesajla gelir.
   Mesajlar:
     {type:'init', ortJs, glueMjs, wasm, files:{unet, decoder}, config, threads}
     {type:'generate', id, cond, seed, steps, guidance, size(256|512), resume?}
     {type:'cancel'}  {type:'release'}
   Yanıtlar: progress, done(rgba), state(ara durum, devam için), error, ready */
'use strict';
let ORT = null, cfg = null, unet = null, dec = null, files = null, cancelFlag = false, busy = false, memSaver = false;

function post(m, tr) { self.postMessage(m, tr || []); }
function rng(seed) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function gauss(n, seed) { const R = rng(seed), out = new Float32Array(n); for (let i = 0; i < n; i += 2) { const u = Math.max(1e-12, R()), v = R(), r = Math.sqrt(-2 * Math.log(u)); out[i] = r * Math.cos(2 * Math.PI * v); if (i + 1 < n) out[i + 1] = r * Math.sin(2 * Math.PI * v); } return out; }

async function ensureUnet() { if (!unet) unet = await ORT.InferenceSession.create(files.unet, { executionProviders: ['wasm'], graphOptimizationLevel: 'all' }); }
async function ensureDec() { if (!dec) dec = await ORT.InferenceSession.create(files.decoder, { executionProviders: ['wasm'], graphOptimizationLevel: 'all' }); }

async function init(m) {
  const t0 = performance.now();
  const blobUrl = (data, type) => URL.createObjectURL(new Blob([data], { type }));
  importScripts(blobUrl(m.ortJs, 'text/javascript'));
  ORT = self.ort;
  ORT.env.wasm.numThreads = Math.max(1, Math.min(m.threads || 1, self.crossOriginIsolated ? 4 : 1));
  ORT.env.wasm.wasmBinary = m.wasm;
  ORT.env.wasm.wasmPaths = { mjs: blobUrl(m.glueMjs, 'text/javascript') };
  ORT.env.wasm.proxy = false;
  cfg = m.config; files = m.files; memSaver = !!m.memSaver;
  await ensureUnet();
  if (!memSaver) await ensureDec();
  post({ type: 'ready', ms: performance.now() - t0, threads: ORT.env.wasm.numThreads, isolated: !!self.crossOriginIsolated });
}

// DDIM (v-tahmini) — eğitimdeki alphas_cumprod ile birebir aynı
async function sample(m) {
  const C = cfg.latentChannels, S0 = cfg.latentSize, size = m.size === 512 ? 512 : 256;
  const ab = cfg.alphasCumprod, T = cfg.trainSteps;
  const steps = Math.max(2, Math.min(60, m.steps || 20)), g = m.guidance || 1;
  const nullCond = cfg.attrSizes.slice();
  const timings = { unetMs: 0, decodeMs: 0, steps: 0 };
  let x, startStep = 0, S = S0, phase = 'base';
  const ks = []; for (let i = 0; i < steps; i++) ks.push(Math.round((T - 1) * (1 - i / (steps - 1))));
  if (m.resume) { x = new Float32Array(m.resume.latent); startStep = m.resume.step; S = m.resume.S; phase = m.resume.phase || 'base'; }
  else x = gauss(C * S * S, m.seed >>> 0);
  await ensureUnet();
  async function denoise(sched, from, Scur, ph) {
    for (let i = from; i < sched.length; i++) {
      if (cancelFlag) return { cancelled: true, step: i };
      const k = sched[i], a = ab[k], ap = i + 1 < sched.length ? ab[sched[i + 1]] : 1;
      const B = g !== 1 ? 2 : 1, n = C * Scur * Scur;
      const lat = new Float32Array(n * B); lat.set(x); if (B === 2) lat.set(x, n);
      const cond = new BigInt64Array(cfg.attrKeys.length * B);
      m.cond.forEach((v, j) => { cond[j] = BigInt(v); if (B === 2) cond[cfg.attrKeys.length + j] = BigInt(nullCond[j]); });
      const tt = new Float32Array(B).fill((k + 1) / T);
      const t0 = performance.now();
      const out = await unet.run({ latent: new ORT.Tensor('float32', lat, [B, C, Scur, Scur]), timestep: new ORT.Tensor('float32', tt, [B]), cond: new ORT.Tensor('int64', cond, [B, cfg.attrKeys.length]) });
      timings.unetMs += performance.now() - t0; timings.steps++;
      const vAll = out.v.data;
      const sa = Math.sqrt(a), s1 = Math.sqrt(1 - a), spa = Math.sqrt(ap), sp1 = Math.sqrt(1 - ap);
      for (let e = 0; e < n; e++) {
        const v = B === 2 ? vAll[n + e] + g * (vAll[e] - vAll[n + e]) : vAll[e];
        const x0 = sa * x[e] - s1 * v, eps = s1 * x[e] + sa * v;
        x[e] = spa * x0 + sp1 * eps;
      }
      post({ type: 'progress', id: m.id, phase: ph, step: i + 1, total: sched.length, ms: timings.unetMs });
      if ((i + 1) % 2 === 0 || i + 1 === sched.length) post({ type: 'state', id: m.id, state: { latent: x.slice().buffer, step: i + 1, S: Scur, phase: ph } });
      if (m.coolMs) await new Promise(r => setTimeout(r, m.coolMs)); else await new Promise(r => setTimeout(r, 0));
    }
    return { cancelled: false };
  }
  if (phase === 'base') {
    const r = await denoise(ks, startStep, S, 'base'); if (r.cancelled) return { cancelled: true };
    startStep = 0;
    if (size === 512) {
      // 512: gizli uzayı 2x büyüt, kısmi gürültü ekle, aynı model ile 64x64 gizli uzayda iyileştir (hires)
      const S2 = S * 2, up = new Float32Array(C * S2 * S2);
      for (let c = 0; c < C; c++) for (let y = 0; y < S2; y++) for (let xx = 0; xx < S2; xx++) {
        const fy = Math.min(S - 1, Math.max(0, (y + 0.5) / 2 - 0.5)), fx = Math.min(S - 1, Math.max(0, (xx + 0.5) / 2 - 0.5));
        const y0 = Math.floor(fy), x0 = Math.floor(fx), y1 = Math.min(S - 1, y0 + 1), x1 = Math.min(S - 1, x0 + 1), wy = fy - y0, wx = fx - x0;
        const b = c * S * S;
        up[c * S2 * S2 + y * S2 + xx] = (x[b + y0 * S + x0] * (1 - wx) + x[b + y0 * S + x1] * wx) * (1 - wy) + (x[b + y1 * S + x0] * (1 - wx) + x[b + y1 * S + x1] * wx) * wy;
      }
      const strength = m.hiresStrength || 0.35, kStart = Math.round((T - 1) * strength), hs = Math.max(3, Math.round(steps * 0.4));
      const nz = gauss(up.length, (m.seed + 17) >>> 0), a = ab[kStart];
      for (let e = 0; e < up.length; e++) up[e] = Math.sqrt(a) * up[e] + Math.sqrt(1 - a) * nz[e];
      x = up; S = S2; phase = 'hires';
      m.hiresSched = []; for (let i = 0; i < hs; i++) m.hiresSched.push(Math.round(kStart * (1 - i / (hs - 1))));
    }
  }
  if (phase === 'hires') {
    const hs = m.hiresSched || (() => { const kStart = Math.round((T - 1) * (m.hiresStrength || 0.35)), n = Math.max(3, Math.round(steps * 0.4)); const a = []; for (let i = 0; i < n; i++) a.push(Math.round(kStart * (1 - i / (n - 1)))); return a; })();
    const r = await denoise(hs, startStep, S, 'hires'); if (r.cancelled) return { cancelled: true };
  }
  // Çözümleme
  if (memSaver && unet) { await unet.release(); unet = null; }
  await ensureDec();
  const z = new Float32Array(x.length); for (let e = 0; e < x.length; e++) z[e] = x[e] / cfg.latentScale;
  post({ type: 'progress', id: m.id, phase: 'decode', step: 0, total: 1 });
  const t0 = performance.now();
  const out = await dec.run({ latent: new ORT.Tensor('float32', z, [1, C, S, S]) });
  timings.decodeMs = performance.now() - t0;
  if (memSaver && dec) { await dec.release(); dec = null; }
  const img = out.image.data, H = out.image.dims[2], W = out.image.dims[3], rgba = new Uint8ClampedArray(W * H * 4);
  for (let i = 0; i < W * H; i++) { rgba[i * 4] = img[i] * 255; rgba[i * 4 + 1] = img[W * H + i] * 255; rgba[i * 4 + 2] = img[2 * W * H + i] * 255; rgba[i * 4 + 3] = 255; }
  return { rgba, width: W, height: H, timings };
}

self.onmessage = async ev => {
  const m = ev.data;
  try {
    if (m.type === 'init') await init(m);
    else if (m.type === 'cancel') cancelFlag = true;
    else if (m.type === 'release') { if (unet) await unet.release(); if (dec) await dec.release(); unet = dec = null; post({ type: 'released' }); }
    else if (m.type === 'generate') {
      if (busy) { post({ type: 'error', id: m.id, message: 'Motor meşgul' }); return; }
      busy = true; cancelFlag = false;
      const t0 = performance.now();
      const r = await sample(m);
      busy = false;
      if (r.cancelled) post({ type: 'cancelled', id: m.id });
      else post({ type: 'done', id: m.id, rgba: r.rgba.buffer, width: r.width, height: r.height, totalMs: performance.now() - t0, timings: r.timings }, [r.rgba.buffer]);
    }
  } catch (e) { busy = false; post({ type: 'error', id: m.id, message: (e && e.message) || String(e) }); }
};
