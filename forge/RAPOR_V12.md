# Forge 2.5D V12 — Yerel 3B + Yerel Rüya · Uygulama ve Test Raporu

Tarih: 2026-11-21 · Dal: `ccr-8065385b-gkmyx1` · Tüm üretim cihazda/işlemcide; ücretli servis, API, bulut veya GPU yok.

## 0. Kısa özet

| Hedef | Durum | Kanıt |
|---|---|---|
| Eski "Local Dream" motorunu kurtar | **Kurtarılacak kod yok** (aşağıda §1). Yerine kendi motorumuz yazıldı. | 3 depo + geçmiş + yüklenen dosya tarandı |
| Cihazda gerçek görsel üretimi (CPU, PNG) | **Çalışıyor** — kendi eğittiğimiz küçük difüzyon modeliyle | §2, `ciktilar/ekran/*yerel_ruya*` |
| Forge V11.2'ye bağlama | **Yapıldı** ("Forge'a aktar", "3B karaktere çevir") | tarayıcı testi |
| Resimden gerçek 3B mesh | **Yapıldı** — şablon + silüet ölçümü; görünmeyen yüzeyler *tahmini* olarak işaretli | §3 |
| İskelet + 5 animasyon (IK) | **Yapıldı**, ayak kayması ölçümü 0,00 mm | §4 |
| 8 yön × 5 animasyon = 40 sayfa | **Yapıldı**, bağımsız ZIP denetimi geçti | §5 |
| GLB dışa aktarma + tekrar okuma | **Yapıldı**: Khronos glTF-Validator 0 hata/0 uyarı; three.js ile açıldı | §5 |
| Çevrimdışı | **Doğrulandı**: ağ kapalı Chromium, 0 uzak istek | §7 |
| V11.2 korunması | **Doğrulandı**: dosya bayt bayt aynı; V12'de tüm V11.2 işlevleri testten geçti | §8 |
| Gerçek Realme C55 ölçümü | **Yapılamadı** — bu ortamda telefon yok. CPU yavaşlatmalı emülasyon + uygulama içi ölçüm aracı verildi | §6 |

## 1. Aşama 1 — "Local Dream" motorunun kurtarılması: bulgular

- `Kirik-Muhur`, `Arena-Forge-Pro`, `Arena-Forge-Pro2` depoları ve tüm git geçmişleri, GitHub kod araması ve yüklenen
  `Forge_25D_V11_2_LocalDream_Aktar.html` tarandı. **Hiçbirinde yerel görsel üretim motoru, model ağırlığı,
  WASM veya çıkarım kodu yok.**
- V11.2 dosyasının içeriği: 8 adet gömülü boyalı WebP görsel, gömülü 512×512 "büyücü" PNG'si, renk değiştirici ve
  2D dönüşüm önizlemesi. "Local Dream" bölümü yalnızca **dışarıda üretilmiş PNG'yi içe aktarır**.
- "Local Dream", **xororz/local-dream** adlı üçüncü taraf bir Android uygulamasıdır (CPU'da MNN, Snapdragon'da NPU ile
  SD 1.5 çalıştırır). Deposu klonlanıp kontrol edildi: lisansı **CC BY-NC 4.0 (ticari kullanım yasak)**. Bu nedenle
  kodu bizim (Play Store'a çıkacak) projemize alınmadı; yalnızca mimari fikir olarak değerlendirildi.
- **Model indirme engeli:** Bu bulut ortamında `huggingface.co`, `modelscope.cn`, OpenAI CDN ve CompVis sunucuları ağ
  politikasıyla **engelli** (HTTP 403). Stable Diffusion ailesinin (SD1.5, SD-Turbo, tiny-sd, BK-SDM, SDXS) ağırlıkları
  burada indirilemedi ve test edilemedi. Erişilebilen kaynaklar: GitHub (kod + sürüm dosyaları), npm, PyPI.

**Karar:** Basit renk değiştiriciyi yapay zekâ gibi göstermemek ve ölçülebilir gerçek bir sonuç vermek için:
1. Kendi çıkarım motorumuz yazıldı: ONNX Runtime Web (MIT) WASM, Web Worker, DDIM örnekleyici, iptal/devam.
2. Kendi küçük modelimiz eğitildi: **Forge-Mini Savaşçı v1** — eğitim verisi tamamen Forge'un kendi 3B çizimleri.
   Gizli uzay çözücüsü olarak MIT lisanslı TAESD kullanıldı (GitHub'dan, SHA-256 kayıtlı).

## 2. Yerel Rüya — cihazda görsel üretimi

**Mimari:** `.forgepack` (tek dosya) → IndexedDB → Blob URL Worker → `ort.wasm.min.js` + WASM (SIMD) →
UNet (v-tahmini, DDIM 12/20/30 adım, rehberlik 1–3) → TAESD çözücü → RGBA → PNG.
512 seçeneği: 256'da üretim → gizli uzayı 2× büyütme → kısmi gürültü (0,35) → aynı modelle 64×64 gizli uzayda iyileştirme
→ 512 çözme. `navigator.deviceMemory < 4` ise 512 kapatılır.

| Bileşen | Parametre | İşlem (MAC/çağrı) | Boyut |
|---|---|---|---|
| Forge-Mini UNet | 8,12 M | 1,26 G (256) · 5,10 G (512) | 32,5 MB fp32 |
| TAESD çözücü | 1,22 M | 17,7 G (256) · 70,7 G (512) | 4,9 MB |
| ONNX Runtime Web 1.31.1 | — | — | 14,9 MB (WASM) |

**Eğitim:** 9.000 etiketli çizim (`araclar/egitim/veri_uret.js`, 4 iş parçacığı, ⟨VERI⟩ sn) → TAESD kodlama
(11 dk) → ⟨ADIM⟩ adım, toplu 32, AdamW, kosinüs öğrenme oranı, EMA (⟨EGITIM_DK⟩ dk, 3 CPU çekirdeği).
ONNX dışa aktarma doğrulaması: PyTorch ↔ ONNX Runtime en büyük fark ⟨ONNX_FARK⟩.

**Ölçümler** (Chromium, ağ kapalı, tek WASM iş parçacığı; "6× yavaş" = CDP CPU yavaşlatması, düşük güçlü telefon yaklaşımı):

⟨LD_TABLO⟩

**Sınırlar (dürüst değerlendirme):** Forge-Mini yalnızca kendi 3B tarzımızda, tek savaşçı, beyaz zemin üretir; serbest
metni anlamaz (anahtar sözcük koşulları: yön, silah, zırh, miğfer, pelerin, kalkan, kumaş rengi, metal tonu, poz);
ayrıntı düzeyi düşüktür ve V11.2'deki boyalı sanat kalitesine yaklaşmaz. Gerçek ve tamamen bize ait bir üretim
hattıdır; kalite için daha büyük/özel veriyle yeniden eğitim gerekir (betikler hazır).

### Daha büyük açık modeller (Stable Diffusion ailesi) — değerlendirme

Aşağıdaki işlem süreleri **bu oturumda ölçülen** WASM hızından (tek iş parçacığı ≈16–18 GMAC/sn masaüstü, 6×
yavaşlatmada ≈⟨GMACS6⟩ GMAC/sn) türetilmiş **tahminlerdir**; ağırlıklar indirilemediği için model kartları/lisanslar
bu ortamda **doğrulanamadı**, kurulum öncesi doğrulanmalıdır.

| Model | UNet büyüklüğü | Adım | Telefon tarayıcısında tahmini süre | Bellek (fp32 / int8) | Not |
|---|---|---|---|---|---|
| SD 1.5 | ~860 M | 20 + CFG | saatler mertebesi (UNet ~0,34 TMAC/çağrı @512) | ~3,4 GB / ~0,9 GB | Tarayıcı sekmesi için çok ağır |
| SD-Turbo | ~865 M | 1 | ~3–6 dk/görsel | ~3,5 GB / ~0,9 GB + metin kodlayıcı | Lisans: Stability topluluk lisansı (kontrol edilmeli) |
| BK-SDM-Tiny / tiny-sd | ~0,32 B | ~25 + CFG | ~1 saat | ~1,3 GB / ~0,35 GB | OpenRAIL-M |
| SDXS-512 | ~0,32 B | 1 | ~1–2 dk | ~1,3 GB / ~0,35 GB + ViT-H metin kodlayıcı | Lisans doğrulanmalı |
| **Forge-Mini (bizim)** | **8 M** | 20 + CFG | **ölçüldü** (yukarıda) | **~50 MB paket** | Tamamen bize ait |

Sonuç: Realme C55 sınıfı bir cihazda **tarayıcı içinde** SD ailesi pratik değildir. Daha güçlü üretim için önerilen yol,
aynı HTML'yi bir Android WebView uygulamasına gömüp (COOP/COEP ile çok iş parçacıklı WASM) ya da yerel C++ (MNN/ncnn,
int8, NEON) çalışma zamanı kullanmaktır; ikisi de bu ortamda derlenemedi/test edilemedi.

## 3. Resim → 3B karakter

1. **Silüet:** alfa kanalı veya kenardan taşma doldurmalı arka plan temizleme; küçük gürültü bileşenleri atılır.
2. **Ölçüm:** satır profilinden baş/boyun, omuz, kasık, ayak açıklığı, kol açısı; baş merkezli gövde ekseni.
3. **Renk:** k-ortalama (8 küme) → zırh/kumaş/altın süs/deri/ten/saç rolleri; boyalı gölgeler için aydınlatma düzeltmesi.
4. **Donanım tahmini:** pelerin (diz hizası genişlik oranı), silah (asimetrik uzantı), miğfer, zırh türü.
5. **Mesh:** prosedürel şablon bu ölçülere uydurulur — baş (yüz, göz, kaş, burun), boyun, gövde, göğüs zırhı, 2 kol,
   dirsek, eller, 2 bacak, diz kapağı, çizmeler, omuzluklar, kemer/keseler, ön/arka önlük, pelerin, silah (kılıç, balta,
   mızrak, asa, topuz, çekiç, hançer), isteğe bağlı kalkan. Varsayılan: **5.459 vertex, 8.102 üçgen, 34 parça**.
6. **Derinlik:** tek resimden bilinemez → anatomik oranlar; V11.2'nin hazır savaşçısında yan görünüşten ±%20 düzeltme.
   Sırt, pelerin, saç ve arka önlük **tahmini** olarak işaretlidir; arayüzde turuncu taramayla gösterilir.
7. **Kullanıcı düzeltmesi:** 12 anatomi kaydırıcısı, 5 donanım seçimi, 3 onay kutusu, 6 renk; "Kaynakla karşılaştır".

**Analiz doğruluğu** (`tests/test_analiz.js`, parametreleri bilinen 60 rastgele karakter):
baş yüksekliği hatası %1,7 · omuz genişliği hatası %5,3 · bacak oranı mutlak hata 0,027 · pelerin tespiti %100 ·
kumaş tonu medyan 1,4°, %90'ı 30° içinde · **ağır zırh tespiti yalnızca %55 (zayıf; kullanıcı seçimle düzeltir)**.

**Dürüst sınır:** Model şablon tabanlı ve stilize edilmiştir; V11.2'deki boyalı sanatın ince işçiliği (oyma desenler,
kumaş kıvrımları) 3B'ye aktarılmaz — resmin renkleri ve oranları aktarılır. Resimden dokunun yüzeye yansıtılması
(projeksiyon dokusu) bu sürümde yok.

## 4. İskelet ve hareket

26 kemik: kök, kalça, omurga, göğüs, boyun, baş, 2× (köprücük, üst kol, ön kol/dirsek, el), 2× (uyluk, baldır/diz,
ayak, parmak), silah, 2 pelerin kemiği, kalkan. Deri: doğrusal karışımlı (4 etki), eklem çevresinde yumuşak geçiş.

| Animasyon | Teknik |
|---|---|
| idle | nefes, ağırlık kayması; ayaklar IK ile kilitli |
| walk | prosedürel yürüyüş; basma fazında ayak zeminle aynı hızda (yerinde); kalça inişi/yalpası, kol salınımı, silah açısı sabitlenir |
| attack | bilek hedefi + kılıç yönü anahtar kareleri, sağ kol IK; kalkış → başın arkası → çapraz kesiş; 3B kılıç yolundan iz |
| hurt | geri savrulma, kızarma; ayaklar kilitli |
| death | sendeleme → dizlerin üstüne çökme (parmak ucu sabit) → öne kapanma; silah yere yatar |

Ek kısıtlar: pelerin yerçekimiyle sarkar ve gövdeye giremez; pelerin eteği, kumaş ve silahın iki ucu zeminin altına inmez.

**Ölçülen sonuçlar** (`tests/test_anim.js`, 3 farklı beden: varsayılan; kısa-iri-balta-kalkan; uzun-hafif-mızrak):

| Ölçüt | Sonuç |
|---|---|
| Yürüyüşte basan ayağın dünyadaki kayması (240 örnek/döngü) | **0,00 mm** |
| Basan ayak yüksekliği sapması | 0,00 mm |
| En düşük vertex (tüm klipler) | −0,69 cm (çizme tabanı; ≥ −1,2 cm eşiği) |
| GLB'de kırpmasız kumaş en düşük nokta (ölüm) | +3,8 cm (zeminin üstünde) |
| Kol/bacak/boyun bağlantı kayması (halka yarıçapına oran) | en kötü %73 (iri beden, saldırı) < %100 → kopma yok |
| Silah–el bağı sapması | 0,0000 mm |
| Kemik uzunluğu korunumu | < 0,00001 mm |
| Kılıç ucu en yüksek hız anı (saldırı) | t ≈ 0,31 (vuruş aralığı 0,3–0,6) |

## 5. Sprite ve GLB

- **40 sayfa:** 8 yön (Ön, Ön-sağ, Sağ, Arka-sağ, Arka, Arka-sol, Sol, Ön-sol — V11.2 ile aynı yön kuralı) × 5 hareket;
  her sayfa 1024×512 (4×2 × 256×256), RGBA şeffaf. Tek ölçek (varsayılan 102,5 px/m) tüm kare ve yönlere sığacak
  şekilde bir kez hesaplanır; **ayak çizgisi y = 228** tüm sayfalarda aynı. Yürüyüş hızı manifestte (px/sn).
- **Bağımsız ZIP denetimi** (`tests/test_zip.py`, Python zipfile + Pillow): CRC tamam, 40 PNG + manifest + GLB,
  boyut/mod doğru, köşeler şeffaf, boş kare yok, boşta animasyonunda her yönde 8 karenin alt satırı aynı (±1 px).
- **GLB:** 11 parça (malzeme başına sıkı vertex tamponu), 5.767 vertex, 8.102 üçgen, 26 eklem, 5 animasyon (60 kare/sn
  doğrusal), PBR malzemeler, kemik adları `hand_R` biçiminde, `extras.forge` içinde yürüyüş hızı ve tahmini parçalar.
  - **Khronos glTF-Validator 2.0.0-dev.3.10: 0 hata, 0 uyarı, 0 bilgi, 0 ipucu.**
  - **three.js 0.170 GLTFLoader** ile açıldı: 26 kemik, 5 animasyon; AnimationMixer ile oynatıldı (`ciktilar/ekran/threejs_4poz.png`).
  - **Gidiş-dönüş:** GLB'den yeniden kurulan iskelet motordakinden en fazla **1,23 cm** sapar; siluet IoU ≥ 0,96 (60 örnek).
  - Uygulama içinde "GLB indir + doğrula" ve "GLB dosyası aç ve doğrula" dosyayı yeniden okuyup çizer.

## 6. Performans (telefon CPU'su hedefi)

Gerçek Realme C55 (Helio G88, 2×A75 + 6×A55) bu ortamda **yok**; ölçümler Chromium'da masaüstü CPU (Xeon 2,3 GHz,
tek iş parçacığı) ve **6× CPU yavaşlatma** (düşük güçlü telefon için kaba yaklaşım) ile alınmıştır. Telefonda gerçek
değer için uygulamadaki **CİHAZ ÖLÇÜMÜ → Ölçümü kaydet (JSON)** kullanılmalıdır.

⟨PERF_TABLO⟩

Uygulanan önlemler: tüm uzun işler Web Worker'da; önizleme 15 kare/sn ve sekme gizliyken durur; sprite üretiminde
ve görsel üretiminde iptal + kaldığı yerden devam (görsel ara durumu IndexedDB'ye her 2 adımda yazılır); görsel
üretiminde adım arası "soğuma" beklemesi; "bellek tasarrufu" modunda UNet ve çözücü sırayla yüklenip serbest bırakılır;
512 yalnızca ≥4 GB bellek bildiren cihazlarda; düşük bellekli cihazda sprite süper örneklemesi 1×'e iner.
WASM SIMD: ONNX Runtime'ın SIMD derlemesi kullanılır. Çok iş parçacığı `file://` sayfada mümkün değildir
(SharedArrayBuffer için COOP/COEP gerekir).

## 7. Çevrimdışı çalışma

`tests/test_tarayici.js`: Chromium `offline: true` + **tüm** http(s) istekleri engellenir; sayfa `file://` ile açılır.
Sonuç: **0 uzak istek**, konsolda hata yok; 3B, sprite, GLB, görsel üretimi ve sayfa yeniden yüklendiğinde modelin
IndexedDB'den internetsiz geri gelmesi doğrulandı. Derleyici (`araclar/derle.js`) HTML'de CDN bağlantısı bulursa durur.

## 8. V11.2'nin korunması

`surumler/Forge_25D_V11_2_LocalDream_Aktar.html` yüklenen dosyayla **bayt bayt aynı** (SHA-256 `ac6b6908…d8e8e`).
V12'de V11.2 betiğine yalnızca kanca eklendi (`sourceCanvas`, `importImage`, `ready`). Tarayıcı testinde geçenler:
8 yön, 5 hareket önizlemesi, 6 renk paleti (renk değiştirme), seçili yön PNG, 8 yön × 5 hareket ZIP (41 dosya, CRC tamam),
örnek PNG içe aktarma, telefondan PNG seçme + beyaz arka plan temizleme. Kırık Mühür oyun dosyalarına dokunulmadı.

## 9. Test listesi (istenen 10 madde)

| # | Test | Sonuç |
|---|---|---|
| 1 | Telefon CPU'sunda resim üretimi | ⚠️ Gerçek telefon yok → masaüstü + 6× yavaşlatmalı Chromium'da üretildi; telefonda ölçüm aracı hazır |
| 2 | İnterneti kapatarak çalışma | ✅ 0 uzak istek |
| 3 | Resimden gerçek 3B mesh | ✅ 5.459 vertex / 8.102 üçgen; analiz doğruluğu §3 |
| 4 | 3B karakteri döndürme | ✅ sürükleme ile (test: yaw 0 → −1,44 rad) |
| 5 | İskelet bağlantıları | ✅ bağlantı testi, kemik uzunlukları |
| 6 | Yürüyüş ve saldırı | ✅ ayak kayması 0,00 mm; kılıç hız tepe noktası vuruşta |
| 7 | GLB dosyası açma | ✅ Khronos 0/0/0/0, three.js, uygulama içi okuma |
| 8 | 40 sprite sayfası | ✅ Node ve tarayıcıda üretildi |
| 9 | ZIP doğrulama | ✅ Python bağımsız denetim |
| 10 | Bellek, hız, hata | ✅ ölçüldü (§2, §6); konsol hatası yok |

## 10. Yapılamayanlar ve nedenleri

- **Gerçek Realme C55 testi:** cihaz bu ortama bağlı değil. Süreler emülasyondur.
- **Stable Diffusion ailesi:** ağırlıklar ağ politikası nedeniyle indirilemedi; telefon tarayıcısında zaten pratik değil (§2).
- **Serbest metinden görsel:** Forge-Mini metin kodlayıcı içermez; anahtar sözcüklerle çalışır.
- **Tek resimden görünmeyen yüzeyler:** tahmindir; işaretlenir ve elle düzeltilir.
- **Resim dokusunun 3B yüzeye yansıtılması:** yapılmadı (şablon–resim hizasızlığında lekelenme riski); renkler bölge bazlı.
- **Android APK / çok iş parçacıklı WASM:** mimari önerildi, Android SDK olmadığı için derlenip test edilemedi.
- **Ağır/orta zırh ayrımı:** otomatik tespit zayıf (%55); arayüzden seçilir.
- **IndexedDB:** Android'de bazı dosya yöneticileri sayfayı `content://` ile açar; bu durumda tarayıcı kalıcı depolamaya
  izin vermeyebilir ve paket her oturumda yeniden seçilir (uygulama bunu ekranda belirtir).
