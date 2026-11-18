# Kırık Mühür — Aşama 3.12 Kung Fu Saga Ekran Yerleşimi Karşılaştırması

Tarih: 18 Kasım 2026. Kaynak: kullanıcının bu görüşmedeki Kung Fu Saga ekran görüntüleri + BlueStacks ve MuMuPlayer inceleme yazıları.

## Gerçek referanslar
- https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-beginner-guide-en.html
- https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-features-guide-en.html
- https://www.mumuplayer.com/blog/avatars-saga-beginner-guide.html
- https://avatars-saga.en.uptodown.com/android
- Kullanıcı gönderimi: 14 farklı telefon ekran görüntüsü (18.11.2026).

## Ortak yerleşim ilkeleri (görseli kopyalamadan)
1. Karakter durumu sol üstte kompakt, kaynak şeridi üstte.
2. Küçük, tıklanabilir görev listesi sol-alt/sol-orta.
3. Kahraman/düşman/NPC'ler sahnenin ortasında görünür; HUD dövüşü kapatmaz.
4. Beceriler alt-ortada yatay sırada.
5. Karakter / Çanta / Beceri / Görev / Menü gibi gerçek işlevler alt sırada.
6. Sağ-alt parmak hareket alanı (kullanıcının gönderdiği ekran referansında). Kaynaklarda sol joystick de bulunuyor; önemli olan el ergonomisidir.
7. Canlı sohbet taklidi yok; mevcut sunuculu sohbet sistemi olmadığı için gerçek oyun olaylarının yerel günlüğü gösterilir.
8. VIP / mağaza / sandık / lonca / tıklanmayan ikonlar sırf referansta var diye sahte olarak oluşturulmaz.

## 3.12 DEĞİŞİKLİKLERİ
- `hud_referans_test_3_12.html`, 3.11 görsel test kaynağından üretilmiştir.
- Portrait CSS: karakter sol üst, gerçek altın/toz kaynak göstergesi, küçük solda görev paneli, alt beceri bandı, alt menü şeridi, sağ hareket kontrolü.
- Gerçek `notify()` olaylarından oluşan kısa oyun günlüğü, sahte çevrim içi oyuncu sohbeti yok.
- Canlı `syncUI()` altın/toz değerlerini gösterir.
- Kamera yakınlaştırması ile dokunarak hedefe gitme koordinatları aynı `getCameraZoom()` fonksiyonunu kullanır.
- Joystick'in yön hesabının bozulmaması için döndürülmüş tuş tasarımından vazgeçildi.
- `index.html` 3.10 **değişmedi**. 3.12 sadece izole test.

## Test ve kanıt düzeyi
- JavaScript sözdizimi: geçerli.
- Render: 3.12 test HTML'si `live`; HTML başlığı doğrulandı.
- TinyFish: 1920×1080 masaüstü tarayıcı testi. Görev, otomatik yürüyüş/savaş, altın-toz güncellemesi, oyun olay günlüğü ve karakter menüsü çalıştı. JavaScript hatası gözlenmedi.
- Sınırlama: TinyFish'in kullandığı masaüstü test tarayıcısı portrait ölçüsüne alınamadı. Test edilen **1920×1080 masaüstü arayüzü, 360×800 mobil CSS'yi test etmez**.
- 3.11 kaynak oynanış testi: ilk üç gölge yaratığı görev döngüsü ve boss görevi/takibi tamamlandı, ancak boss sağlık çubuğu, darbe ve ölüm efektlerinin görsel kalitesi tam doğrulanamadı.
- Orijinal oyun 3D/2.5D sinematik çevre, Kırık Mühür şu an 2D canvas/sprite; yeni CSS görsel kalite farkını ortadan kaldırmaz.

## Yayına terfi koşulları
- 360×800, 393×852, 412×915 portrait gerçek tarayıcı görüntülerinde menü/joystick/skill/quest alanlarının çakışmadığını görsel olarak kanıtla.
- Görev düğmesi, karakter, çanta, beceriler, harita, joystick, saldırı, şifa gerçekten dokunarak test edilsin.
- 3 bölgenin sprite/çevre tutarlılığı, hasar alma/ölme animasyonları ve boss HP barı gerçek oyun görüntüsünde doğrulansın.
- Mevcut tek dosya oyunun kaydı/ödül motoru bozulmasın.

**Karar: aşama 3 bitmedi, 3.12 `index.html` sürümüne terfi ettirilmedi.**
