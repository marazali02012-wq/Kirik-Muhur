// Forge 2.5D V12 tek dosya derleyici.
// V11.2 HTML'si (surumler/ altında, değiştirilmeden saklanır) temel alınır; yeni modüller ayrı dosyalardan (src/) eklenir.
// Telefonda file:// ile açılabilmesi için her şey tek HTML'ye gömülür. CDN veya uzaktan kod yüklemesi yoktur.
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const base = fs.readFileSync(path.join(ROOT, 'surumler', 'Forge_25D_V11_2_LocalDream_Aktar.html'), 'utf8');
const src = f => fs.readFileSync(path.join(ROOT, 'src', f), 'utf8');
let html = base;
function patch(from, to, label) {
  const n = html.split(from).length - 1;
  if (n !== 1) throw new Error(`Yama "${label}" uygulanamadı: ${n} eşleşme`);
  html = html.replace(from, to);
}
// 1) Başlık ve sürüm etiketi
patch('<title>Forge 2.5D V11.2 — Local Dream PNG Aktarımı</title>', '<title>Forge 2.5D V12 — Yerel 3B ve Yerel Rüya</title>', 'title');
patch('◈ FORGE 2.5D <span style="color:#6aeacc">V11.2</span></div><div class="sub">Savaşçı sanat çekirdeği · 8 açı · yerel PNG üretimi</div>',
  '◈ FORGE 2.5D <span style="color:#6aeacc">V12</span></div><div class="sub">V11.2 korunuyor · gerçek 3B mesh + iskelet · cihazda görsel üretimi · çevrimdışı</div>', 'brand');
patch('<span class="right">KREDİ YOK · 0 ₺</span>', '<span class="right">KREDİ YOK · 0 ₺ · İNTERNETSİZ</span>', 'badge');
// 2) V11.2 hareket notu: yeni 3B stüdyoya yönlendir (V11 paneli hâlâ 2B önizlemedir)
patch('<p class="flag">Hareketler 2D dönüşüm önizlemesidir; gerçek iskelet animasyonu değildir.</p>',
  '<p class="flag">Bu paneldeki hareketler V11.2\'nin 2D dönüşüm önizlemesidir. Gerçek 3B iskelet animasyonu için aşağıdaki <b>3B KARAKTER STÜDYOSU</b>nu kullanın.</p>', 'flag');
patch('<b>Yapay zekâ ile sıfırdan sınırsız karakter üretimi değildir.</b>', '<b>Yapay zekâ ile sıfırdan sınırsız karakter üretimi değildir</b> (bu bir renk değiştiricidir). Cihazda gerçek model ile üretim için aşağıdaki <b>YEREL RÜYA</b> bölümüne bakın.', 'v11 note');
// 3) V11 betiğine yeni modüller için kancalar (ekleme; mevcut davranış değişmez)
patch('window.ForgeV11={get state(){return {...state}},dirs,actKeys,frameCanvas,manifest,generate,renderPreview};',
  'window.ForgeV11={get state(){return {...state}},dirs,actKeys,frameCanvas,manifest,generate,renderPreview,sourceCanvas:(d)=>state.custom?customCanvas:colored(d||0,state.palette),importImage:(img,name,clean)=>importImage(img,name,clean),get ready(){return state.ready}};', 'hooks');
// 4) Yeni CSS
patch('</style></head>', fs.readFileSync(path.join(ROOT, 'src', 'ui_v12.css'), 'utf8') + '\n</style></head>', 'css');
// 5) Yeni bölümler (.app kapsayıcısının sonuna)
patch('</section></div></div>\n<script>', '</section></div>\n' + fs.readFileSync(path.join(ROOT, 'src', 'ui_v12.html'), 'utf8') + '\n</div>\n<script>', 'sections');
// 6) Modüller
const core = ['f3d_math.js', 'f3d_rig.js', 'f3d_mesh.js', 'f3d_raster.js', 'f3d_png_zip.js', 'f3d_anim.js', 'f3d_image.js', 'f3d_glb.js', 'f3d_pipeline.js'].map(src).join('\n');
const scripts = [
  `<script id="forge3d-core">\n${core}\n</script>`,
  `<script type="text/plain" id="f3d-worker-src">\n${src('f3d_worker.js')}\n</script>`,
  `<script type="text/plain" id="ld-worker-src">\n${src('ld_worker.js')}\n</script>`,
  `<script>\n${src('ld_engine.js')}\n</script>`,
  `<script>\n${src('ui_v12.js')}\n</script>`,
].join('\n');
patch('</script></body></html>', '</script>\n' + scripts + '\n</body></html>', 'scripts');
if (/https?:\/\/(cdn|unpkg|cdnjs|fonts)/.test(html)) throw new Error('Uzak kaynak bağlantısı bulundu');
const out = path.join(ROOT, 'Forge_25D_V12_Yerel3D.html');
fs.writeFileSync(out, html);
console.log('yazıldı:', out, (fs.statSync(out).size / 1048576).toFixed(2), 'MB');
