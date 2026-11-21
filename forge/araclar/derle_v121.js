// Forge 2.5D V12.1 (düzenli arayüz) tek dosya derleyici.
// Temel: değiştirilmemiş V11.2 HTML'si (surumler/). V11.2 betiği aynen kalır; yalnızca ekran yerleşimi (gövde HTML'si)
// yeni 6 bölümlü düzenle değiştirilir — V11.2'nin bütün öğe kimlikleri (id) korunur — ve betiğe kancalar eklenir.
// V12 dosyası (Forge_25D_V12_Yerel3D.html) DEĞİŞTİRİLMEZ; çıktı ayrı dosyadır.
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(ROOT, ...p), 'utf8');
let html = read('surumler', 'Forge_25D_V11_2_LocalDream_Aktar.html');
function patch(from, to, label) { const n = html.split(from).length - 1; if (n !== 1) throw new Error(`Yama "${label}": ${n} eşleşme`); html = html.replace(from, to); }
patch('<title>Forge 2.5D V11.2 — Local Dream PNG Aktarımı</title>', '<title>Forge 2.5D V12.1 — Düzenli Arayüz</title>', 'title');
patch('</style></head>', read('src', 'ui_v121.css') + '\n</style></head>', 'css');
// Gövde yerleşimi: <body> ile ilk <script> arası yeni düzenle değişir
const b0 = html.indexOf('<body>') + '<body>'.length, b1 = html.indexOf('\n<script>\n/* Embedded');
if (b0 < 6 || b1 < b0) throw new Error('Gövde sınırları bulunamadı');
const layout = read('src', 'ui_v121_layout.html');
// V11.2 betiğinin kullandığı her kimlik yeni düzende tam bir kez bulunmalı
const V11_IDS = ['stage', 'viewState', 'directions', 'actions', 'strip', 'importFile', 'removeBg', 'importExample', 'returnWarrior', 'prompt', 'generate', 'status', 'palettes', 'one', 'atlas', 'all', 'recipe', 'bar'];
for (const id of V11_IDS) { const n = (layout.match(new RegExp(`id="${id}"`, 'g')) || []).length; if (n !== 1) throw new Error(`V11.2 kimliği "${id}" düzende ${n} kez var`); }
html = html.slice(0, b0) + layout + html.slice(b1);
// V11.2 betiğine kancalar (ekleme; mevcut davranış değişmez)
patch('window.ForgeV11={get state(){return {...state}},dirs,actKeys,frameCanvas,manifest,generate,renderPreview};',
  'window.ForgeV11={get state(){return {...state}},dirs,actKeys,frameCanvas,manifest,generate,renderPreview,' +
  'sourceCanvas:(d)=>state.custom?customCanvas:colored(d||0,state.palette),importImage:(img,name,clean)=>importImage(img,name,clean),get ready(){return state.ready},' +
  'setCustomCanvas:(cv,name)=>{customCanvas=cv;state.custom=true;state.customFileName=name||state.customFileName||"duzenlenen.png";state.prompt="Düzenlenen görsel: "+state.customFileName;state.direction=0;state.frame=0;refreshButtons();},' +
  'setFrame:(i)=>{state.frame=((i%8)+8)%8;renderPreview(state.frame/8);},setPlaying:(b)=>{state.playing=!!b;}};', 'hooks');
const src = f => read('src', f);
const core = ['f3d_math.js', 'f3d_rig.js', 'f3d_mesh.js', 'f3d_raster.js', 'f3d_png_zip.js', 'f3d_anim.js', 'f3d_image.js', 'f3d_glb.js', 'f3d_pipeline.js'].map(src).join('\n');
const scripts = [
  `<script id="forge3d-core">\n${core}\n</script>`,
  `<script type="text/plain" id="f3d-worker-src">\n${src('f3d_worker.js')}\n</script>`,
  `<script type="text/plain" id="ld-worker-src">\n${src('ld_worker.js')}\n</script>`,
  `<script>\n${src('ld_engine.js')}\n</script>`,
  `<script>\n${src('ui_v121.js')}\n</script>`,
  `<script>\n${src('ui_v121_editor.js')}\n</script>`,
  `<script>\n${src('ui_v121_shell.js')}\n</script>`,
].join('\n');
patch('</script></body></html>', '</script>\n' + scripts + '\n</body></html>', 'scripts');
if (/https?:\/\/(cdn|unpkg|cdnjs|fonts)/.test(html)) throw new Error('Uzak kaynak bağlantısı bulundu');
const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]), dup = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dup.length) throw new Error('Yinelenen kimlik: ' + [...new Set(dup)].join(', '));
const out = path.join(ROOT, 'Forge_25D_V12_1_Duzenli.html');
fs.writeFileSync(out, html);
console.log('yazıldı:', out, (fs.statSync(out).size / 1048576).toFixed(2), 'MB · V12 dosyasına dokunulmadı');
