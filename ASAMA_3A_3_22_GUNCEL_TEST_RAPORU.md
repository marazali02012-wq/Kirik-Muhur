# Kırık Mühür — 3A / 3.22 son denetim
Tarih: 19 Kasım 2026. **3A açık; 3B başlamadı.**

## Dağıtım
- Tek dosya test: `Kirik_Muhur_3_22_3A_Otomatik_Teslim_Gorsel.html`
- Kaynak commit: `de6b0e53ce4e5dcd2ded8e22aacca64242ef5798`
- GitHub blob: `967cbccade258c06b5d43731545b6121c8dc61dc`
- Render izole dağıtım `dep-dbv7hijrjlhs73b4v76g` durumu: `live`.
- Test: https://kirik-muhur-314-izole-test.onrender.com/Kirik_Muhur_3_22_3A_Otomatik_Teslim_Gorsel.html

## Otomatik görev
Tek görev dokunuşu → otomatik rota → savaş → NPC'ye dönüş → NPC yakınında **tek seferlik ödül**. Ödül popup'ı ya da ek NPC tıklaması yok. Oyuncu manuel hareketi devralırsa otomatik görev kendiliğinden devam etmez; görev düğmesinden kaldığı yerden sürer. Eski `complete`/`claim` kayıt fazları dönüşe taşınır. Sınıf portreleri ve 3.21'in üç bölgeye ait çevre görselleri korundu.

## Chromium/Playwright doğrulamaları
- 9/9 görev: üç karakter sınıfı × 360×800, 393×852, 412×915.
- 3/3 boss görevi: otomatik dönüş ve tek tılsım.
- 6/6 eski `complete`/`claim` fazı geri yükleme.
- 3/3 manuel gidiş kontrolü + görev devamı, duraklat/devam.
- 3/3 manuel **NPC dönüşü** kontrolü: oyuncu durdurdu, otomatik açılmadı; kullanıcı devam ettiğinde çift ödülsüz teslim oldu.
- Üç ekran boyutunda çiçek menü kontrolü. JavaScript sözdizimi `node --check` ile geçti. Yeni ZIP arşivi CRC testi geçti.

## Açık kabul koşulları
**Gerçek Android cihaz testi yapılmadı.** Uzun süreli gerçek zamanlı oyun, FPS/ısı ve cihaz dokunma kalitesi bilinmiyor. Gerçek site origin'inde disk destekli `localStorage` kapat-aç testi gerçekleştirilemedi; test Chromium ortamındaki URL güvenlik engeli vardı. Render `live` durumu canlı tarayıcı oynanışı kanıtı değildir; TinyFish bakiyesi yetersiz olduğundan ek canlı otomasyon başlatılamadı. Görsel kalite yüksek ayrıntılı 2.5D referans seviyesine henüz ulaşmadı.

**`index.html` değiştirilmedi; eski sürümler, Supabase, Netlify ve diğer projeler korunuyor.**
