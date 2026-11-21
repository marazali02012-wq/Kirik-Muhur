# Forge 2.5D V12 — Yerel 3B + Yerel Rüya (tamamen cihazda, internetsiz)

Bu klasör Kırık Mühür oyunundan **ayrı** bir araçtır. Oyun dosyalarına dokunulmadı.
V11.2 dosyası `surumler/` altında **bayt bayt aynı** saklanır (SHA-256 `ac6b6908…d8e8e`).

## Hangi dosyayı açmalıyım?

| Dosya | Ne işe yarar |
|---|---|
| `Forge_25D_V12_Yerel3D.html` | **Ana uygulama.** Telefonda dosya yöneticisinden veya Chrome'da açın. Tek dosya, 1,2 MB, internet istemez. |
| `yerel-calisma/ForgeMini_Savasci_v1.forgepack` | Cihazda görsel üretimi için **model paketi** (ONNX Runtime WASM + model + lisanslar). Uygulamada "Model paketi seç" ile **bir kez** seçilir. |
| `surumler/Forge_25D_V11_2_LocalDream_Aktar.html` | Değiştirilmemiş eski sürüm. |
| `ciktilar/` | Örnek GLB (`ornek_savasci.glb`), 40 sayfalık sprite ZIP, `hareket_onizleme.gif`, üretilen görseller, test sonuçları (JSON). |
| `RAPOR_V12.md` | Ne yapıldı, ne ölçüldü, neler yapılamadı (gerekçeleriyle). |

## Uygulamadaki bölümler

1. **V11.2 bölümleri (aynen korundu):** PNG içe aktarma, beyaz arka plan temizleme, 8 yön, 5 hareket önizlemesi,
   zırh rengi değiştirme, sprite/atlas dışa aktarma, ZIP. (Bu panelin hareketleri hâlâ 2D dönüşümdür; ekranda yazar.)
2. **YEREL RÜYA — cihazda görsel üretimi:** `.forgepack` seçilir → model telefonda ONNX Runtime Web (WASM, yalnızca
   işlemci) ile çalışır → 256×256 (veya donanım uygunsa 512×512) PNG. İptal, ilerleme, kaldığı adımdan devam,
   bellek tasarrufu, soğuma beklemesi. Üretilen görsel tek dokunuşla Forge'a veya 3B stüdyoya aktarılır.
   *Dürüst not:* paketteki Forge-Mini modeli bu çalışmada 58 dakikada eğitilen küçük bir modeldir; görseller tanınır ama
   bulanık/düşük ayrıntılıdır. 512 seçeneği 256 üretimin 2× büyütülmesidir.
3. **3B KARAKTER STÜDYOSU:** Resim → silüet/oran/renk analizi → gerçek mesh (≈5.500 vertex, ≈8.100 üçgen) →
   26 kemikli iskelet → 5 iskelet animasyonu (IK) → 8 yön × 5 hareket sprite → GLB. Kaydırıcılarla anatomi,
   donanım ve renk düzeltme. "Tahmini yüzeyler" resimde görünmeyen bölgeleri turuncu taramayla gösterir.
4. **CİHAZ ÖLÇÜMÜ:** Telefonda gerçek süre/bellek ölçümünü JSON olarak kaydeder.

## Telefonda kullanım (Realme C55 / Android Chrome)

1. `Forge_25D_V12_Yerel3D.html` ve `yerel-calisma/ForgeMini_Savasci_v1.forgepack` dosyalarını telefona kopyalayın.
2. HTML'yi Chrome ile açın. 3B stüdyo hemen çalışır (model gerekmez).
3. Yerel Rüya için "Model paketi seç (.forgepack)" → dosyayı seçin. Tarayıcı izin verirse paket cihaza (IndexedDB)
   kaydedilir; sonraki açılışlarda yeniden seçmeden, **internet kapalıyken** çalışır. İzin vermezse her oturumda
   dosyayı yeniden seçmek gerekir (yine internetsiz).
4. "40 sprite + GLB ZIP" → indirilen ZIP oyuna aktarılır. `manifest.json` içindeki `walk.speedPixelsPerSec` hızında
   ilerletilen karakterin ayakları kaymaz; `footBaselineY` tüm karelerde aynı zemin çizgisidir.

## Mimari (neden böyle?)

- **Tek HTML:** Android'de `file://` ile açılan sayfa yan dosyaları `fetch` edemez ve normal Worker başlatamaz.
  Bu yüzden 3B motor HTML'ye gömülü; Worker'lar `Blob` URL ile başlatılır.
- **Model paketi ayrı:** Model ve WASM çalışma zamanı (~50 MB) HTML'ye gömülseydi sayfa çok ağırlaşırdı.
  Kullanıcı dosyayı bir kez seçer; bayt dizileri IndexedDB'de saklanır. Ağ isteği yapılmaz.
- **GPU yok:** 3B çizim yazılım rasterleştiricisiyle, görsel üretimi WASM (SIMD) ile işlemcide yapılır.
- **Ayrı modüller:** `src/` altında her özellik ayrı dosyadır; `araclar/derle.js` bunları V11.2'nin üzerine ekleyip tek
  HTML üretir (V11.2 betiğine yalnızca 3 kanca eklenir; davranışı değişmez).
- **İsteğe bağlı Android uygulaması (öneri):** Aynı HTML bir WebView'a gömülür, paket `assets/` içine konur ve
  `WebViewAssetLoader` ile COOP/COEP başlıkları verilirse WASM çok iş parçacıklı çalışır (2–4 kat hız beklenir).
  Bu ortamda Android SDK olmadığı için APK derlenmedi/test edilmedi.

## Kaynak kodu

```
src/f3d_math.js      vektör, kuaterniyon, matris
src/f3d_rig.js       iskelet, FK, iki kemikli IK, deri matrisleri
src/f3d_mesh.js      prosedürel savaşçı mesh'i (baş, gövde, kollar, bacaklar, eller, çizmeler, zırh, pelerin, silahlar)
src/f3d_raster.js    CPU yazılım rasterleştirici (z-tampon, cel gölgeleme, dış hat, kenar yumuşatma)
src/f3d_anim.js      idle / walk / attack / hurt / death; ayak kilitleme, silah–zemin ve pelerin–zemin kısıtları
src/f3d_image.js     resimden silüet, oran ve renk analizi
src/f3d_glb.js       GLB dışa aktarma, okuma, doğrulama, GLB'den yeniden kurma
src/f3d_pipeline.js  tarif kuralları, ortak ölçek/ayak hizası, 40 sayfa ZIP, manifest
src/f3d_worker.js    3B Web Worker
src/ld_worker.js     Yerel Rüya Web Worker (ONNX Runtime WASM, DDIM örnekleyici)
src/ld_engine.js     paket okuma, IndexedDB, metin→koşul, devam etme
src/ui_v12.*         yeni arayüz bölümleri
araclar/derle.js     tek HTML derleyici            araclar/paket_yap.js   .forgepack oluşturucu
araclar/egitim/      Forge-Mini eğitim verisi üretimi ve eğitim betiği (PyTorch)
tests/               Node + Python + Chromium testleri
```

Yeniden derleme: `node araclar/derle.js`. Tüm testler tek komutla: `bash tests/hepsini_calistir.sh`. Tek tek: `node tests/test_anim.js`, `node tests/uretim_ornek.js`,
`cd tests && npm install && node test_glb_validator.js && node test_threejs.js`, `python3 tests/test_zip.py`,
`node tests/test_analiz.js`, `node tests/test_tarayici.js --pack=yerel-calisma/ForgeMini_Savasci_v1.forgepack`,
`node tests/test_sekme_kapanma.js`, `node tests/test_bellek.js`.
