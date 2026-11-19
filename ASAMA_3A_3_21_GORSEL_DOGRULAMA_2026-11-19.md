# Kırık Mühür — Aşama 3A / 3.21 görsel ve hareket denetimi
Tarih: 19 Kasım 2026. Durum: 3A açık, 3B başlamadı.

## Yapılan
- Üç ayrı bölgeye (Fener Köyü, Ruh Ormanı, Kırık Tapınak) dünya-koordinatlı özgün 2D piksel-art çevre dekorasyonları eklendi. Çarpışma/portal/görev konumları değişmedi.
- Sol üst karakter profili genel sembol yerine gerçek oyun sprite'ından sınıfa özgü baş/omuz portresini gösteriyor; sprite yüklenmesi gecikirse portre otomatik tazeleniyor.
- Yalnız 3.21 izole test dosyası değiştirildi. Ana index.html ve önceki sürümler korunuyor.

## Chromium/Playwright testleri
- 360×800, 393×852, 412×915: her ekranda köy, orman ve tapınak çizildi; JavaScript sayfa hatası çıkmadı.
- Muhafız/İzci/Dokumacı × üç ekran = **9 ilk görev testi**: yaratıklar, dönüş, NPC'ye ayrı dokunuş, ödül tek sefer.
- Muhafız × üç ekran = **3 boss testi**: boss yenildi, NPC ödülü, tek tılsım.
- **3 çiçek menü**, **36 modal/araç** dokunma denemesi; ekrandaki ana paneller arasında ölçülebilir çakışma görülmedi.
- Üç sınıfın profil Canvas'ına sınıfa özgü piksel portresi çizildi.

## Doğrulanmayanlar
- Fiziksel Android cihaz, uzun süreli FPS/ısı/dokunmatik.
- Gerçek browser origin ile localStorage diske kaydet/kapat/aç. Test ortamı file:// ve localhost erişimini ERR_BLOCKED_BY_ADMINISTRATOR ile engelledi.
- Render izole statik servisinin deployment sonucu LIVE; TinyFish canlı görsel testi ödeme bakiyesi yetersizliğinden başlatılamadı. Canlı site oynanış testi yapılmış değildir.
- Görsel kalite hâlâ ayrıntılı 2.5D MMORPG referansının altında. Tamamlandı veya AAA olarak adlandırılmaz.

## Dağıtım
GitHub izole dal: stage3-reward-ui-314
Canlı test adresi: https://kirik-muhur-314-izole-test.onrender.com/Kirik_Muhur_3_21_3A_Gorsel_Sahne_Test.html
Ana oyun index.html değiştirilmedi; Supabase, Netlify, diğer sistemler değiştirilmedi.
