# Kırık Mühür 3.31 — İkinci Referans Turu: Gerçek Kung Fu Saga Oyun İçi Ekranları

**Sürüm:** `Kirik_Muhur_3_31_Referans_Arayuz_TEST.html` (3.30 üzerine; `testler/3E_3_31/patch331.py`) · **Tarih:** 19.11.2026

## 1) Kaynaklar — neyi gerçekten inceledim
| Kaynak | Sonuç |
|---|---|
| **Uptodown** (`avatars-saga.en.uptodown.com/android`) | Sayfa başlığı "Kung Fu Saga for Android" olarak **doğrulandı**. İlk denemedeki 404'ün sebebi tarayıcı kimliği gönderilmemesiydi. **12 dikey oyun içi ekran görüntüsü (360×800)** ve 5 yatay tanıtım görseli incelendi. Bu turun asıl kaynağı bunlar. |
| YouTube | Bir önceki turdaki 40 kare kullanıldı. Video karelerini YouTube'un iç arayüzünden almayı denedim; otomatik izin kontrolü bunu reddetti ve etrafından dolanmadım. Videoların tamamı hâlâ izlenmedi. |
| Google Play | Önceki turdaki 4 tanıtım görseli kullanıldı. Sayfa "Dark Wukong" adıyla listeleniyor. |
| FoxData | Önceki turda 404 döndü. |

Referans görselleri depoya ve oyuna **konmadı.** Hiçbir görsel, isim veya metin kopyalanmadı.

## 2) Uptodown ekranlarında gözlenenler
- **Üst sol:** Yuvarlak portre ve altında **seviye rozeti**; kırmızı "Power:1950"; can çubuğu; VIP etiketi.
- **Portrenin altında:** Sonraki açılımın **tanıtım kutusu** ("Unlocks at Lv.15", pet ikonuyla).
- **Üst satır:** Para birimleri (+ düğmeleriyle), saat ve pil. **Üst sağ:** "Peace" PK modu, "EXP+0%", çerçeveli kutuda bölge adı ve koordinat ("West Suburb of (218,218)").
- **Ortada:** İki satırlık sistem duyurusu (diğer oyuncuların başarıları; çevrimiçi).
- **Sol:** "Quest" sekmesi altında altın çerçeveli tek görev satırı ("[Main] Fox Fur / Gather Fox Hide (1/5)") ve öğretici el işareti.
- **Alt:**
  - Ortada küçük beceri daireleri; kilitlilerde "Unlocked at Lv.X"; "Grinding" (oto av) düğmesi.
  - Altında büyük sohbet/sistem kutusu.
  - En altta Role, Backpack ve Skill ikonları; boydan boya ince **EXP çubuğu**.
  - Sağ altta nilüfer biçimli menü düğmesi.
- **Savaş:**
  - Büyük turuncu hasar rakamları.
  - Kahramanın üstünde **beceri adı afişi** ("Storm Chop").
  - Ateş efektleri ve sürüyle tilkiler; isimli ve can çubuklu oyuncular.
- **Ödül:**
  - Sağ ortada üst üste kayan "**Gain** Silver×20000 / Gain Common Robe×1 / Gain EXP×1200" satırları.
  - Yanında **hızlı kuşanma kartı** ("Common Robe [ikon] put on 9", geri sayımlı).
- **NPC konuşması:** Büyük NPC figürü, isim kurdelesi, geniş diyalog kutusu, ödül ikonları, "Collect Rewards" ve "Continue 1 secs later". 3.30'daki kartımız bu yapıya uyuyor.
- **Karakter oluşturma:**
  - Solda yuvarlak ikonlu 6 sınıf.
  - Sağ üstte ♂ ve ♀ düğmeleri, sağda yüz seçenekleri.
  - **"Choose hair" 6 renk**.
  - İsim alanı ve yanında **rastgele isim** düğmesi.
  - "Launch Game" düğmesi.
  - Ay ışıklı gece sahnesi.

## 3) 3.31'de uygulananlar (özgün)
| Gözlem | Uygulama | Test |
|---|---|---|
| Saç rengi seçimi, rastgele isim | Görünüm adımında **7 saç rengi** (sınıf rengi, gece siyahı, kestane, buğday, kızıl, gümüş, ruh mavisi). Sprite sayfası oyun içinde piksel piksel yeniden boyanıyor; önizlemede, oyunda ve portrede kullanılıyor. İsim adımında **🎲 zar**: 14 özgün Türkçe isimden biri. Kaydediliyor. | G1 |
| "Gain" ödül satırları | Görev, yan görev ödülü ve yeni eşya gelince sağ ortada kayarak giren **"Altın ×78 / XP ×100 / Ruh tozu ×2 / Gözcü Ceketi ×1"** satırları; 3 sn sonra kayboluyor. Dokunmayı engellemiyor. | G2 |
| Hızlı kuşanma kartı | Yeni eşya kuşanılı olandan daha iyiyse kart çıkıyor: eşya adı, ikon, +SAL / +SAV ve **"KUŞAN (8)"**. Dokununca hemen kuşanılıyor, **8 sn sonra otomatik** kuşanılıyor, ✕ ile reddedilebiliyor. Oyun duraklatılınca sayaç duruyor. | G2, G4 |
| Beceri adı afişi | Beceri kullanınca kahramanın üstünde altın renkli, büyüyerek beliren ad: "KESKİN MÜHÜR", "KÜL OKU", "RUH DALGASI" ve ikinci beceriler. | G3 |
| Portre seviye rozeti | Portrenin altında altın seviye rozeti. | G3 |
| Sonraki açılım tanıtımı | "♞ Binek • Sv2'de açılır", sonra "🔒 Kırık Tapınak • 1. görev sonrası", "🔒 Kül Geçidi • 10. görev sonrası". **Gerçek kilit verisinden** üretiliyor. Boss çubuğu açıkken gizleniyor. | G3 |
| Tam genişlik EXP çubuğu | Ekranın en altında ince altın EXP çubuğu. | G3 |
| Kuşanma kartının yeri | İlk sürümde ✕ düğmesi sağdaki ✦ etkileşim tuşunun altında kalıyordu. Kart ✦'in soluna, beceri satırının üstüne taşındı. 4 ekran ölçüsünde çakışma yok. | G4 |

**Bilerek eklenmeyenler:**
- **Sistem duyuruları ve sohbet:** Diğer oyuncular yok; sahte olur.
- **"Peace" PK modu:** Çevrimiçi sistem gerektirir.
- **VIP ve premium para:** Gerçek ekonomi yok.
- **"Downloading resources" ve Facebook düğmeleri:** Oyunla ilgisiz.
- **Yüz seçenekleri:** Piksel karakterde yüz 4–6 pikselden oluşuyor; anlamlı fark için 3E çizim turu gerekiyor.
- **6 sınıf:** Bizde 3 özgün sınıf var; yeni sınıf 3C/3E kapsamında.

## 4) Test sonuçları
| Paket | Sonuç |
|---|---|
| 3.31 yeni (`suite331.js`) | **7/7 PASS** |
| 3A regresyonu | R3A |
| 3B regresyonu | R3B |
| 3.27 regresyonu | R327 |
| 3.29 regresyonu | R329 |
| 3.30 regresyonu | R330 |
| Android emülasyonu | RAND |
