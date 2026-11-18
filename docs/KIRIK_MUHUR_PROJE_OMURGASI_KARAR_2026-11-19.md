# Kırık Mühür RPG — Proje Omurgası ve Görsel Yön (19 Kasım 2026)

**Karar kaynağı:** Kullanıcının bu tarihte gönderdiği kesin oyun tanımı. Proje **yalnız Kırık Mühür**; Arena Forge Pro değildir. Bu doküman gereksinim kaydıdır; mevcut uygulamada tamamlanmış özellikler listesi değildir.

## 1) Ana yapı
- Dikey mobil MMORPG hedefi.
- Tek karakterle açık alan gezme.
- NPC'den görev alma.
- Otomatik yol bulma.
- Otomatik savaş.
- Görevi NPC'ye teslim etme.
- Ödül popup'ı.
- Karakterin güçlenmesiyle tekrarlanan ilerleme döngüsü.

**Görev zinciri kesin davranış:** Görevi al → otomatik olarak hedefe git → hedef yaratıkları doğru miktarda yen → görevi tamamla → oyuncunun **ayrı etkileşimiyle** NPC'ye dön/teslim et → **ayrı etkileşimle** ödül al → sonraki göreve geç. Manuel kontrol başlatıldığında oyuncu hareketi devralabilir. Otomatik savaş aç/kapat ayrı bir kontrol olarak bulunmalı.

## 2) Giriş ve karakter oluşturma
- Sınıf seçimi ekranı.
- Erkek/kadın seçimi.
- Büyük, okunaklı karakter önizlemesi.
- Arka planda sınıf/oyun temasına uygun sahne.
- Adımlı, “Next Step” benzeri ilerleme.
- Mevcut sınıfların özgün isimlerini koru; yeni sınıf ismi gerekirse özgün üret.

## 3) Dikey mobil oyun HUD'u
| Konum | İçerik |
|---|---|
| Üst sol | Profil, seviye, güç, VIP |
| Üst orta/üst bar | Altın, premium para, diğer kaynaklar |
| Üst sağ | Bölge adı, koordinatlar, durum |
| Sol orta | Görev takip paneli |
| Orta oyun alanı | Oyuncu, düşman, hasar rakamları |
| Alt orta | Beceriler |
| Alt sol/alt sıra | Karakter, çanta, beceri, pet, forge kısayolları |
| Alt sağ | Sohbet, hızlı menü, joystick / yön kontrolü |

Hedef: Kung Fu Saga türünde **yoğun ama dokunulabilir ve okunaklı** dikey HUD. Ekran, minyon/savaş alanı veya görev ile iletişimi kapatacak şekilde katmanlarla doldurulmamalı; dar Android ekranlarında çakışma testi zorunlu.

## 4) Savaş sistemi
- Normal açık alan savaşı ve çoklu yaratık grupları.
- Düşman ve boss HP, görünür hasar sayıları, beceri kullanımı.
- Boss alanı; world boss / dungeon boss mantığı.
- Otomatik savaş açma ve kapatma; manuel devralma.
- Düşman darbe/ölüm görünümü ve ödül/drop döngüsü.

## 5) Sistem ekranları ve hub
- Karakter bilgi + istatistik.
- Çanta.
- Beceri.
- Pet ve binek.
- Forge / ekipman geliştirme.
- Görev ödül popup.
- Ana şehir / hub.
- Yoğun üst/yan ikon ve menü sistemi.

## 6) Sosyal/meta
- Lonca.
- Market / mağaza.
- Hunt, dungeon, daily ve event.
- Sohbet paneli.
- Boss girişleri.
- Günlük görevler.
- Güç puanına dayalı ilerleme.

## 7) Özgünlük ve referans sınırı

**Kung Fu Saga referansı (mekanik/UX):** dikey ekran yerleşim prensipleri, NPC görev döngüsü, otomatik yol bulma/savaş, şehir-hub, pet/binek/lonca menü omurgası, yoğun HUD ve güç/ödül akışı.

**Kırık Mühür'e özgün üretilecekler:** ikonlar, karakterler, karakter ve sınıf adları, boss adları, şehir ve çevre tasarımları, UI süsleri, buton grafikleri, oyun varlıkları, kaynak kodu ve ayırt edici sahne kompozisyonları. Başka oyunun grafikleri/kodu doğrudan alınmaz.

## 8) Görsel stil kararı
- **Referans hattı 1:** Kung Fu Saga tipi parlak, yoğun mobil MMORPG HUD'u ve 3D/2.5D derinlik hissi; doğu-fantastik mekanik/atmosfer yaklaşımı.
- **Referans hattı 2:** Kullanıcının GitHub `referanslar/` klasöründeki **dört görsel** — temiz pixel-art çizgileri, renk kontrollü mimari, güçlü ışık, sahne dokusu ve atmosfer.
- **Birleşim:** Kung Fu Saga türündeki **oynanış akışı ve ekran düzeni mantığı** + dört görüntünün **görsel işçilik/atmosfer standardı** + Kırık Mühür'e özgü karakterler, mekanlar, menüler ve ikonlar.
- Pixel-art referansını otomatik olarak gerçek 3D grafik motoru zorunluluğu sanma. Mobilde 2D/2.5D katmanlarla derinlik oluşturulabilir.
- Çizimlerin her birinde kontur, ışık yönü, perspektif, piksel tutarlılığı ve doku örnekleriyle karşılaştırma yapılmalı; sadece renkleri veya arka planı değiştirerek “aynı kalite” denmemeli.

Ayrıntılı referans: [KIRIK_MUHUR_4_GORSEL_REFERANSI.md](KIRIK_MUHUR_4_GORSEL_REFERANSI.md). Görseller: [referanslar klasörü](../referanslar/).

## 9) Mevcut gerçek durum ile hedefin ayrımı
- **Mevcut:** Tarayıcıda çalışan tek dosyalı çevrimdışı 2D RPG prototipi; 3 bölge, 3 sınıf ve temel görev-savaş-çanta-pet/binek altyapısına dair önceki denetim var.
- **Gerçek çok oyunculu MMORPG:** Henüz **yok**. Canlı çok oyunculu dünya, eşzamanlı oyuncu, lonca ve sohbet için ayrı gerçek sunucu, kalıcı oyuncu verisi ve ağ senkronizasyonu gerekir. Sadece menü ekleyerek MMORPG tamamlandı denemez.
- **Bekleyen:** 3.13 dikey HUD canlı Android testi, görev akışı, boss/çoklu düşman çizim doğrulaması ve regresyon.
- **Sıra:** Mevcut **AŞAMA 3** kabul kriterlerini bitir; daha sonra bu kapsamdaki eksik modüllere aşamalı geç. **Aşama 3 doğrulanmadan Aşama 4'e atlama.**
- Bu doküman için `index.html`, savaş motoru, mevcut kayıt, ödeme ve canlı servisler **değiştirilmedi**.

## Özet tanım
> “Kung Fu Saga oynanış ve ekran akışını referans alan, dikey mobil açık alan MMORPG hedefli; otomatik görev/savaş, hub, pet/binek ve lonca sistemlerinin omurgasını içeren; fakat isim, dünya, karakter, ikon, sanat ve UI yönünden özgün **Kırık Mühür RPG**.”
