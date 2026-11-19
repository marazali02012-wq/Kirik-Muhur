# Kırık Mühür — Aşama 3A / 3.22 test raporu
Tarih: 19 Kasım 2026. Durum: 3A kod ve Chromium kontrolleri geçti; gerçek Android kabulü bekliyor.

## Değişiklik
- Tek görev dokunuşuyla otomatik rota → hedefleri öldürme → otomatik NPC dönüşü → NPC yakınında tek sefer ödül. Ayrıca ÖDÜLÜ AL / SONRA AL sorusu veya NPC’ye ikinci dokunuş yok.
- Ödül kayıt defteri çift ödülü engelliyor; boss tılsımı tek bir kez ekleniyor.
- Manuel kontrol devralınırsa otomatik yola zorla dönülmüyor; görev kutusu ile isteğe bağlı sürdürülüyor.
- Eski complete / claim durumları otomatik geri dönüşe taşınıyor.
- 3.21 üç bölge çevre dekorasyonları ve sınıfa özgü portreler korundu.

## Test kanıtı (Chromium/Playwright, fiziksel cihaz değildir)
- 3 karakter × 3 dikey çözünürlük = 9/9 ilk görev, bir dokunuşla teslim ve tek ödül: GEÇTİ.
- Muhafız × 3 çözünürlük = 3/3 boss görevi, tek tılsım ve tek ödül: GEÇTİ.
- Eski complete/claim kayıt durumları 3 çözünürlükte 6/6 simüle edildi: GEÇTİ.
- Manuel kontrol iptali ve sonra otomatik devam 3/3: GEÇTİ.
- Çiçek menü 3/3, menü ve modal tıklama 36/36; üç ekran HUD çakışma denetimi: GEÇTİ.
- Üç bölgede 360×800, 393×852, 412×915 sahne çizimi, pageerror yok: GEÇTİ.

## Sınırlar
- Gerçek Android cihaz ve kalıcı origin/localStorage yeniden başlatma testi yapılmadı. Container Chromium file:// ve localhost URL'lerini engelliyor.
- TinyFish canlı tarayıcı testi bakiye yetersizliğinden başlatılamadı; Render dağıtımının LIVE olması gerçek cihaz oynanış kanıtı değildir.
- Mevcut görseller temel 2D piksel-art prototip kalitesindedir; referanstaki ayrıntılı 2.5D/MMORPG sanat standardına ulaşmış değildir.

## Dosyalar ve koruma
- Test: Kirik_Muhur_3_22_3A_Otomatik_Teslim_Gorsel.html
- Canlı izole test adresi: https://kirik-muhur-314-izole-test.onrender.com/Kirik_Muhur_3_22_3A_Otomatik_Teslim_Gorsel.html
- index.html, 3.19/3.20/3.21 ve canlı diğer projeler değişmedi; 3B'ye geçilmedi.

**KARAR: 3A devam ediyor, 3B başlamadı.**
