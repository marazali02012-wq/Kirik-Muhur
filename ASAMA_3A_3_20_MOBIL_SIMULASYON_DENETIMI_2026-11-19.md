# Kırık Mühür — Aşama 3A / 3.20 mobil dokunmatik denetimi

**Tarih:** 19 Kasım 2026
**Kaynak:** `Kirik_Muhur_3_20_3A_Gorev_Rota_Test.html`, GitHub blob SHA `3d9ee708db5031da19f56267406ec00aa81c4e09`.
**Sonuç:** Dokunmatik simülasyon testleri geçti. **3A gerçek Android kabulü bekleniyor; 3B açılmadı.**

## Test ortamı
- Linux üzerinde Chromium/Playwright; `is_mobile=true`, `has_touch=true`, DPR=3.
- Ekranlar: **360×800, 393×852, 412×915** (dikey).
- Dokunuşlar gerçek Playwright `.tap()` ve `touchscreen.tap()` olaylarıyla uygulandı.
- Oyun zamanı, mevcut `__kmTest.step()` tanılama yordamıyla hızlandırıldı. Bu fiziksel bir Android cihaz, APK veya gerçek zamanlı uzun oynanış testi **değildir**.

## Geçen kontroller
1. **9 görev testi:** Muhafız / İzci / Dokumacı × 3 ekran; göreve dokunma, 3 yaratık, ayrı dönüş, NPC'ye dokunarak teslim ve ödülün ikinci kez verilmemesi.
2. **3 boss görevi:** Muhafızla her ekranda boss öldürme, NPC dönüşü, tek ödül ve envanterde **yalnız bir tılsım**.
3. **3 çiçek menü testi:** Ana menü → ek araçlar → gizli menü → ana menü dokunmatik çevrimi.
4. **36 panel ve araç testi:** Her ekran boyutunda 6 ana modal (karakter, çanta, beceri, görev, duraklatma, harita) ve 6 ek araç (harita, sadık, binek, yol, oto savaş, ayarlar). Açılışlar ve ilgili kapanışlar kontrol edildi.
5. **3 manuel müdahale testi:** Savaş alanına dokununca oto yol ve savaş durdu; görev düğmesiyle sürdü; oyun duraklatılıp devam ettirildi.
6. **Ekran çakışma denetimi:** Üç ekran boyutunda görev paneli, savaş eylemleri, olay günlüğü, alt menü, çiçek düğmesi ve üst kaynak panellerinde karşılaştırılan görünür dikdörtgenler arasında çakışma tespit edilmedi.
7. İncelenen test akışlarında JavaScript `pageerror` görülmedi.

## Açık kalan kabul koşulları
- **Gerçek Android telefon / gerçek APK dokunma, ekran, FPS ve uzun oynanış:** Yapılmadı; bu test ortamında Android cihaz/emülatör mevcut değil.
- **Disk destekli gerçek tarayıcı `localStorage` kapanış/açılış testi:** Yapılamadı. Chromium'un güvenlik politikası yerel ve dış URL'lere `ERR_BLOCKED_BY_ADMINISTRATOR` ile engel koyduğu için kalıcı origin açılamadı. Önceki rapordaki sahte depolama testi gerçek kalıcılıkla karıştırılmamalı.
- **Metin tutarlılığı:** 3.20'nin bazı başlangıç metinleri hâlâ eski 3.18/3.19 sürümünü ve *otomatik NPC teslimini* anlatıyor; gerçek davranış oyuncunun NPC'ye ayrıca dokunması. Yalnızca görsel metin düzeltmesi olarak ayrıca ele alınmalı.
- Bu rapor uzun süreli tüm engel/yol bulma kombinasyonlarının tarandığı anlamına gelmez.

## Kaynak korunması
`index.html`, 3.19 sürümü, Supabase, Render, Netlify ve diğer canlı sistemler değiştirilmedi. Bu çalışma test/raporlama odaklıdır.
