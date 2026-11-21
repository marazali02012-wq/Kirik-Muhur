# Yerel çalışma dosyaları ve model paketi

## `ForgeMini_Savasci_v1.forgepack` içinde ne var?

| Dosya | Boyut | Kaynak / lisans |
|---|---|---|
| `ort.wasm.min.js`, `ort-wasm-simd-threaded.mjs`, `ort-wasm-simd-threaded.wasm` | ≈15 MB | ONNX Runtime Web 1.31.1 (npm), MIT — yalnızca WASM/CPU yürütücü, WebGPU yok |
| `unet.onnx` | ≈32,5 MB (fp32, 8,1 M parametre) | **Bize ait.** `araclar/egitim/egit.py` ile bu oturumda eğitildi |
| `taesd_decoder.onnx` | ≈4,9 MB (1,2 M parametre) | TAESD çözücüsü (Ollin Boer Bohan), MIT — github.com/madebyollin/taesd |
| `config.json` | 13 KB | gürültü takvimi, gizli uzay ölçeği, koşul sözlüğü |
| `lisanslar/*` | | lisans metinleri |

Biçim: `"FORGEPK1"` + 4 bayt başlık uzunluğu + JSON başlık (dosya adı, konum, uzunluk, SHA-256) + dosya baytları.
Uygulama paketi okurken bunları ayırır; hiçbir şey internetten indirilmez.

## Forge-Mini nedir, ne değildir?

- **Gerçek bir difüzyon modelidir:** rastgele gürültüden başlayıp 12–30 adımda görüntü oluşturur (DDIM, v-tahmini).
- **Eğitim verisi tamamen bizimdir:** Forge'un kendi prosedürel 3B savaşçılarından 9.000 çizim
  (rastgele beden, renk, zırh, silah, kalkan, pelerin, 8 yön, 3 poz). Dış resim veya başka bir modelin çıktısı yok.
- **Sınırları:** yalnızca bu tarzda tek savaşçı üretir; serbest metni anlamaz (anahtar sözcüklerle koşullanır:
  yön, silah, zırh, miğfer, pelerin, kalkan, kumaş rengi, metal tonu, poz). Ayrıntı seviyesi düşüktür; V11.2'deki
  boyalı sanat kalitesinde değildir. Ek bir modelle (Stable Diffusion ailesi) değiştirilebilir — bkz. `RAPOR_V12.md`.

## Yeniden üretme

```bash
# 1) eğitim verisi (Forge 3B motoru ile, 4 iş parçacığı)
node araclar/egitim/veri_uret.js /yol/veri 9000 4
# 2) TAESD ile gizli uzaya kodla, 3) eğit, 4) ONNX'e aktar
python araclar/egitim/egit.py kodla /yol/veri /yol/taesd /yol/model
python araclar/egitim/egit.py egit  /yol/model 5000 62
python araclar/egitim/egit.py aktar /yol/model /yol/taesd
# 5) tek dosyalık paket
node araclar/paket_yap.js /yol/model/paket /yol/onnxruntime-web/dist yerel-calisma/lisanslar yerel-calisma/ForgeMini_Savasci_v1.forgepack
```

Kendi boyalı çizimlerinizi eklemek için `veri/img/*.png` ve `labels.json` biçiminde etiketleyip aynı adımları
uygulayabilirsiniz (eğitim bir PC'de yapılır; telefon yalnızca çalıştırır).
