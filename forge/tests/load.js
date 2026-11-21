// Node test yükleyici: tarayıcı modüllerini aynı global ad alanına yükler.
const fs = require('fs'), path = require('path'), vm = require('vm'), zlib = require('zlib');
const SRC = path.join(__dirname, '..', 'src');
const ORDER = ['f3d_math.js', 'f3d_rig.js', 'f3d_mesh.js', 'f3d_raster.js', 'f3d_png_zip.js', 'f3d_anim.js', 'f3d_image.js', 'f3d_glb.js', 'f3d_pipeline.js'];
function load() {
  for (const f of ORDER) { const p = path.join(SRC, f); if (fs.existsSync(p)) vm.runInThisContext(fs.readFileSync(p, 'utf8'), { filename: p }); }
  return globalThis.Forge3D;
}
const deflate = b => new Uint8Array(zlib.deflateSync(b, { level: 9 }));
const inflate = b => new Uint8Array(zlib.inflateSync(b));
module.exports = { load, deflate, inflate };
