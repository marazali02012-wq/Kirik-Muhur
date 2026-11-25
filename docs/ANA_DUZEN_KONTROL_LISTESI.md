# Kırık Mühür — Ana düzen ve işlev kontrol listesi
Yetkili temel: [Kullanıcının kesin şartnamesi](KIRIK_MUHUR_KULLANICI_KESIN_SARTNAME.md). Kung Fu Saga referans, sanat ve isimler özgün. Sabit dikey. ZIP sınırı yok; Android performansı şart. Her satırda görsel, işlev, kilit, geçiş, kayıt ve dokunmatik kontrol yapılır. [x] yalnız doğrulanmış alt kontrol, [ ] açık; cihaz ve görsel kabul tamamlanmadan sistem tamamlandı sayılmaz. Ana index.html korunur.

| Sıra | Ekran | Görsel / işlev kabulü | Durum |
|---|---|---|---|
| 1 | Açılış/kayıt | Logo, kahraman, yeni/devam, bozuk kayıt, gerçek yeniden açılış | Kısmi: 3.115, 18/18 simüle kayıt |
| 2 | Karakter | Büyük tematik önizleme, sınıf, cinsiyet, ad, ileri/geri, taslak, görünüm | Kısmi: 3.116, 24/24; 6 model, 8 yön, 3 ekran; saç özelleştirme ve sanat açık |
| 3 | Eğitim | Ekranı örtmeyen aşamalı öğretici; hareket, NPC, otomatik görev, gerçek saldırı, teslim ve ödül | Kısmi: 3.117, 15/15 Chromium; ilk NPC rotası, manuel kesinti/devam, ilk saldırı ve tek ödülle görev teslimi doğrulandı; gerçek dokunmatik ve kalıcı kayıt açık |
| 4 | Ana HUD | Üst sol profil/seviye/güç/VIP; üst kaynaklar; üst sağ bölge/koordinat/mini harita; sol orta görev; orta savaş; alt beceri, ayrı hareket ve çiçek menüsü; çakışma yok | Kısmi |
| 5 | Görev/NPC/ödül | Ana/yan görev, kabul→yol→savaş/toplama→NPC→otomatik tek ödül→sonraki görev; manuel kesinti/devam | Kısmi |
| 6 | Savaş/hareket | Joystick, basılı saldırı, beceri bekleme, isabet, ölüm, yeniden doğma, otomatik/manüel geçiş | Kısmi |
| 7 | Menü/kilitler | Kalabalık ikonlar, çiçek hızlı menüsü (joystick değil), açılır/kapanır, geri, gerçek kilit şartı, sistem açılışı | Kısmi |
| 8 | Karakter/çanta/ekipman/demirci | İstatistik, slot, nadirlik, karşılaştırma, kuşan/çıkar, yükselt, parçala, depo, maliyet, güç etkisi | Kısmi |
| 9 | Pet/binek/gelişim | Önizleme, açılma, çağır/geri al, yükseltme, pasif etki, savaşta binek | Kısmi |
| 10 | Dünya/şehir/NPC | Şehir hub, harita/geçit, özgün dekor, NPC/hedef işareti, rota, çarpışma, kayıt, dönüş | Kısmi |
| 11 | Boss/zindan/kule | Ayrı seçim, boss/kat/ödül/sayaç, hak/bilet, süre, yeniden doğma, kat, sonuç, tek ödül, dönüş | Kısmi; dünya bossu yerel |
| 12 | Günlük/süreli etkinlik | Takvim, geri sayım, hak, saat dilimi, çevrim dışı süre, ödül | Eksik |
| 13 | Sosyal/çevrim içi | Gerçek hesap, arkadaş, sohbet, takım, lonca, PvP, market, eşleşme, kopma, sunucu yetkisi | Eksik; sahte online yok |
| 14 | Teknik/görsel QA | Dikey APK, 320×568 / 360×800 / 393×873 ve şartnamedeki diğer cihaz boyutları; fiziksel Android FPS/bellek/ısınma, kalıcı kayıt, kalite ve sürüm yedeği | Açık |

## Sürüm ilerlemesi
- [x] 3.115: dört açılış durumu, kayıt uyarısı, onaysız üzerine yazmayı önleme (tarayıcı simülasyonu).
- [x] 3.116: önizleme 300×350, 6 model, 8 yön, isim ve taslak, 24 tarayıcı kontrolü (önceki yerel rapor).
- [ ] Açılış ve karakter sanat kalitesi, gerçek Android/kalıcı kayıt kabulü.
- [x] 3.117: ilk NPC’ye gerçek rota, yakında otomatik görev kabulü, manuel kesinti ve yeniden başlatma, ilk gerçek hasar, ilk görevin teslimi ve tek ödül; 15/15 Chromium kontrolü. Hızlandırılmış oyun tick ve simüle localStorage kullanıldı. Eski kayıtlar zorla eğitime alınmaz.
- [ ] 3.117 görsel açık: NPC konuşma balonu sağ menünün arkasına taşıyor; sol görev paneli ve HUD yerleşimi ana ekran aşamasında denetlenecek.
- [ ] Sıradaki: 4. ana HUD; profil, kaynaklar, görev, bölge bilgisi, sağ menü, hareket/beceri ve çiçek menüsü.
- [ ] Oyun HTML/ZIP sürüm yedeği GitHub'da doğrulanacak.

Her ilerlemede bu dosya güncellenir; kanıt türü belirtilir.