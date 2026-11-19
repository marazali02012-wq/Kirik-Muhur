# Kırık Mühür 3.28 — Android Emülasyon Testi ve Açık Kapatma Raporu

**Sürüm:** `Kirik_Muhur_3_28_Android_Uyum_TEST.html` (3.27 üzerine; `testler/3B_3_28/patch328.py`)
**Tarih:** 19.11.2026 · **Kullanıcı talimatı:** "Açıkları tamamlamadan başka aşamaya geçme; testi ben yapıyorum ama sen de Android'de yapılmış gibi test et."

## Bu test ne, ne değil
- **Gerçek Android cihaz değil.** Bu konteynerde KVM yok, gerçek Android emülatörü (AVD) çalışamıyor.
- **Gerçeğe en yakın kurulum:**
  - **Cihaz profilleri:** Playwright'ın Android profilleri (Moto G4, Galaxy S8, Pixel 7, Galaxy A55, Galaxy S24). Ekran boyutu, piksel yoğunluğu (dpr 2.25–3), Android Chrome kullanıcı aracısı, `isMobile` ve dokunmatik giriş bu profillerden geliyor.
  - **İşlemci yavaşlatma:** CDP ile 2–6 kat (Moto G4 6 kat, orta seviye cihazlar 4 kat, S24 2 kat).
  - **Dokunma:** CDP `Input.dispatchTouchEvent` ile gerçek dokunma olayları: dokunma, sürükleme, iki parmak, çift dokunma, uzun basma.
  - **Zaman:** Oyun **gerçek zamanlı** aktı, hızlandırma yok.
  - **Sistem senaryoları:** geri tuşu (tarayıcı geçmişi), yatay/dikey döndürme, **tarayıcı sürecinin aniden öldürülmesi (SIGKILL)**.
  - **Origin:** Yerel HTTPS.
- Kullanıcının kendi telefonundaki test bu testin yerine geçmez; ikisi birbirini tamamlar.

## Emülasyonun bulduğu gerçek sorunlar (masaüstü testleri görmemişti) ve düzeltmeler

| # | Bulgu (3.27, ilk koşu) | Kök neden | Düzeltme (3.28) | Sonuç |
|---|---|---|---|---|
| 1 | **Performans:** 4–6 kat yavaşlatmada 15–19 FPS; 75 sn'de ~1000 uzun görev | Tuval cihazın tam piksel yoğunluğunda (Pixel 7: 1081×2202) her kare baştan çiziliyordu. Varyant ölçümü: HUD ve metin güncellemeleri etkisiz; çözünürlük 1,5'e sınırlanınca 19 → 45 FPS | Tuval çözünürlüğü en fazla 1,5. Ölçülen FPS 38'in altına düşerse çözünürlük 0,25'lik adımlarla 1,0'a kadar iniyor (`km328Adapt`). Piksel sanatında görsel fark yok (karşılaştırma görüntüsü var). | **52–55 FPS** (4–6 kat), S24'te 60. Uzun görev 4–9. |
| 2 | **Ani kapanmada kayıp:** SIGKILL sonrası görev 1 / 133 altın → görev 0 / 51 altın | Chrome `localStorage`'ı diske gecikmeli yazıyor ve sık kayıtları kısıyor. Süreç öldürülünce bekleyen yazma kayboluyordu; `pagehide` bu durumda hiç çalışmıyor. | Her kayıt aynı anahtarla **IndexedDB'ye de** yazılıyor. Açılışta `savedAt` damgası daha yeni olan kayıt seçiliyor. "Yeni oyun" IndexedDB kopyasını da siliyor. Bozuk localStorage yedeklenip IndexedDB'den kurtarılıyor. Eski anahtarlar değişmedi. | Görev, altın ve konum **birebir** korunuyor. |
| 3 | **Küçük dokunma hedefleri:** beceri tuşları 35, ✦ tuşu 33, görev düğmesi yüksekliği 28, oto savaş 21, harita 19 px | HUD sıkışıklığı | Görünmez dokunma alanları (`::before`; bekleme göstergesi `:after`'ı korunuyor). Beceri tuşları 39 px ve 8 px aralık, saldırı tuşu 46 px, görev düğmesi en az 34 px. Mini haritanın tamamı haritayı açıyor. | Ölçülen **gerçek dokunulabilir alan her düğmede ≥43 px** (`elementFromPoint` ile). |

## Son koşu: 56/56 PASS (5 cihaz profili)
| Kontrol | Moto G4 (CPU 6x) | Galaxy S8 (4x) | Pixel 7 (4x) | Galaxy A55 (4x) | Galaxy S24 (2x) |
|---|---|---|---|---|---|
| A1 Açılış, siyah ekran yok (sınıf seçiminden sonra ilk kare) | PASS | PASS | PASS | PASS | PASS |
| A2 Dokunarak yürüme, doğru yön | PASS | PASS | PASS | PASS | PASS |
| A3 Parmakla sürükleyerek yürüme | PASS | PASS | PASS | PASS | PASS |
| A4 İki parmak ve çift dokunma sayfayı yakınlaştırmaz | PASS | PASS | PASS | PASS | PASS |
| A5 Çiçeği kaydırma menüyü değiştirir, karakter yürümez | PASS | PASS | PASS | PASS | PASS |
| A6 Saldırı tuşuna basılı tutunca art arda vuruş | PASS | PASS | PASS | PASS | PASS |
| A7 Görev tuşuna hızlı çift dokunma tek başlatma yapar | PASS | PASS | PASS | PASS | PASS |
| A8 Gerçek zamanlı oyun, parmakla görev ve popup | PASS | PASS | PASS | PASS | PASS |
| A9 Geri tuşu duraklatma açar ve kapatır | PASS | PASS | PASS | PASS | PASS |
| A10 Yatayda "dik tut" uyarısı, dikeyde HUD düzgün | PASS | PASS | PASS | PASS | PASS |
| A11 Dokunulabilir alan ≥43 px | PASS | PASS | PASS | PASS | PASS |
| A12 SIGKILL sonrası kayıt korunur (Galaxy S8) | PASS | | | | |

**A13, uzun oturum (bir önceki koşuda, aynı performans koduyla):** Moto G4 profili, CPU 6 kat yavaş, 10 dakika gerçek zamanlı, parmakla oynanış. Sonuç: 39 görev, 41 popup, 0 ölüm, 0 hata, ortanca 53 FPS, en düşük 29 FPS, bellek 9,5 MB'de sabit.

**Test düzeltmesi (A9, yalnız Moto G4):** Geri tuşuna basıldığında açık bir ödül penceresi vardı. Geri tuşu önce onu kapattı, bu doğru davranış. Test artık ölçüme açık pencere olmadan başlıyor.

## Regresyon (3.28)
| Paket | Sonuç |
|---|---|
| 3A (`suite_3A_regresyon.js`) | **43/43 PASS** |
| 3B (`suite_3B_regresyon.js`, 26 görev × 3 sınıf dahil) | **16/16 PASS** |
| 3.27 tamamlama (`suite_327_regresyon.js`, rota 480 hedef dahil) | **8/8 PASS** |
| Android emülasyonu (`android_emulasyon.js`) | **56/56 PASS** (+ A13 uzun oturum PASS) |

## Durum ve sıradaki adım
- 3A ve 3B'nin tarayıcıda ve emülasyonda test edilebilen bütün maddeleri kapandı.
- **Kullanıcının fiziksel telefon testi bekleniyor.** Sorun çıkarsa ekran görüntüsü ve cihaz modeliyle bildirilmeli.
- 3C'ye kullanıcı onayı olmadan geçilmeyecek.
