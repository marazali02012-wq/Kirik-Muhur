// Tek dosyalık çevrimdışı model paketi (.forgepack) oluşturur: ONNX Runtime Web (WASM) + model + yapılandırma + lisanslar.
// Kullanım: node paket_yap.js <model_klasörü> <ort_dist_klasörü> <lisans_klasörü> <çıktı.forgepack>
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const [modelDir, ortDir, licDir, out] = process.argv.slice(2);
const entries = [
  ['config.json', path.join(modelDir, 'config.json')], ['unet.onnx', path.join(modelDir, 'unet.onnx')], ['taesd_decoder.onnx', path.join(modelDir, 'taesd_decoder.onnx')],
  ['ort.wasm.min.js', path.join(ortDir, 'ort.wasm.min.js')], ['ort-wasm-simd-threaded.mjs', path.join(ortDir, 'ort-wasm-simd-threaded.mjs')], ['ort-wasm-simd-threaded.wasm', path.join(ortDir, 'ort-wasm-simd-threaded.wasm')],
  ...fs.readdirSync(licDir).map(f => ['lisanslar/' + f, path.join(licDir, f)]),
];
let off = 0; const files = [], bufs = [];
for (const [name, p] of entries) { const b = fs.readFileSync(p); files.push({ name, offset: off, length: b.length, sha256: crypto.createHash('sha256').update(b).digest('hex') }); bufs.push(b); off += b.length; }
const cfg = JSON.parse(fs.readFileSync(path.join(modelDir, 'config.json'), 'utf8'));
const head = Buffer.from(JSON.stringify({ format: 'FORGEPK1', name: cfg.name, created: new Date().toISOString(), runtime: 'onnxruntime-web 1.31.1 (MIT) — WASM, CPU', files }));
const hl = Buffer.alloc(4); hl.writeUInt32LE(head.length);
fs.writeFileSync(out, Buffer.concat([Buffer.from('FORGEPK1'), hl, head, ...bufs]));
console.log('paket:', out, (fs.statSync(out).size / 1048576).toFixed(2), 'MB', files.length, 'dosya');
