# Kırık Mühür 3.30 — Kung Fu Saga Gerçek Görsel Referans İncelemesi ve Uygulama

**Sürüm:** `Kirik_Muhur_3_30_NPC_Efekt_TEST.html` (3.29 üzerine; `testler/3E_3_30/patch330.py`) · **Tarih:** 19.11.2026
**Ağ:** Kullanıcı ortam ayarlarından izin verdi; YouTube, Google Play, Uptodown ve FoxData bu oturumda erişilebilir oldu.

## 1) Neyi gerçekten inceledim — kaynak dürüstlüğü
| Kaynak (kullanıcı önceliği) | Sonuç |
|---|---|
| **5–6. YouTube oynanış videoları** | YouTube'da "kung fu saga gameplay" araması yapıldı; 10 video seçildi. Seçilenler arasında 2023 incelemesi, 2–3 yıllık Android oynanışı, son aylardan oynanışlar ve Uptodown'ın kendi videosu var (ör. `IwKcBNmZwnI`, `qD9fP3FY5XY`, `bpV4OPBE9S8`, `Pb3uQYXuSr0`, `ntB9X57CtT0`, `_FkGe_8b5tM`, `lfwHbOe5pLg`, `PS6yqWrAihk`, `VP3nNrLODjY`, `fYStAJ1Rq6Y`). **Videoları baştan sona izleyemedim.** YouTube, bu sunucudan gelen istekte iki sayfaya bot doğrulaması (captcha) gösterdi ve zaman çizelgesi kare verisini vermedi. İncelenen: videoların kapak resmi ve %25, %50, %75 noktalarından YouTube'un ürettiği kareler, toplam **40 kare**. Bu kareler 480×360, dikey oyun alanı içinde küçük; ince yazılar okunamıyor. |
| **2. Uptodown** | `avatars-saga` / `kung-fu-saga` sayfaları **404**. Sayfa kaldırılmış ya da adresi değişmiş; görsel alınamadı. |
| **3. FoxData** | Arama ve uygulama sayfaları **404**; görsel alınamadı. |
| **1. Google Play** | Kung Fu Saga araması sonuç vermedi. Eski referans notundaki paket (`com.rxsjus.an.watt`) şu an **"Dark Wukong"** adıyla listeleniyor. 4 resmî tanıtım görselinde "KUNG FU SAGA" logosu var (Wukong sınıfı, "Kung Fu Season"). Bunlar oyun içi ekran değil, tanıtım çizimleri. Aynı oyun olduğu kesin doğrulanmadı. |

Referans görselleri **depoya ve oyun paketine konmadı.** Yalnız incelemek için geçici klasörde tutuldu. Hiçbir çizim, isim ya da metin kopyalanmadı.

## 2) Karelerde gözlenenler (gerçek)
1. **NPC konuşması:** Ekranın üst-ortasında büyük, 3D NPC portresi; altında isim etiketi ve diyalog kutusu. Kutuda **ödül ikonları** (EXP, gümüş, eşya) ve "Continue in N secs" şeklinde **otomatik geri sayımlı devam** düğmesi var. Oyuncunun ayrıca bir şey onaylaması gerekmiyor.
2. **Oyun ekranı (HUD):**
   - Üst sol: yuvarlak portre ve kırmızı/altın, belirgin "Power …" değeri.
   - Üst satır: kaynak ikonları.
   - Üst sağ: mini harita ve sayaçlar.
   - Sol: sarı renkli, alt alta görev satırları.
   - Alt: birkaç satır sistem mesajı ve **yuvarlak ikonlu** menü sırası (Ride, Backpack, Forge, Pet, Skill…).
   - Sağ alt: büyük saldırı tuşu ve beceri daireleri.
3. **Savaş:**
   - Düşmanlar kalabalık gruplar hâlinde ve başlarında isimleri var.
   - Üst üste yığılan **büyük "Crit" rakamları** çıkıyor.
   - Beceri efektleri **çok renkli** (pembe, kırmızı, beyaz, altın), ekranı dolduruyor.
4. **Boss / zindan:** Üst ortada boss adı ve kırmızı can çubuğu. Zindanda geri sayım ("Exit dungeon in 29:51").
5. **Dünya:** 3D/2.5D eğik kamera; kasaba, yollar, çatılar; karakter kameraya göre büyük.
6. **Karakter ekranı (Gear Info):** Ortada karakter, iki yanında ekipman yuvaları, güç karşılaştırması ve "Boost" düğmeleri.

## 3) Kırık Mühür ile karşılaştırma ve 3.30'da yapılanlar
| Gözlem | 3.29'da | 3.30'da (özgün uygulama) | Test |
|---|---|---|---|
| NPC konuşma kartı + ödül ikonları + otomatik devam | Yalnız ödül tablosu | Görev tesliminde: NPC'nin **büyük piksel portresi**, isim etiketi, konuşma balonu ve her ana görev için **özgün hikâye cümlesi** (16 cümle; devam görevlerinde türe göre). Altında ödül ikonları. Tek "DEVAM ✓ (6 sn)" düğmesi; geri sayım bitince **otomatik kapanıyor**. Kullanıcı kararına uygun: ikinci onay yok. Yan görev tesliminde de NPC kartı çıkıyor. | F1 |
| Görevin NPC sözüyle başlaması | Yalnız bildirim | Görev başında konuşma balonu, örneğin "[Ruh Ormanı] Gölge ×3 yen!". NPC ekrandaysa onun üstünde, değilse kahramanın üstünde, en üst katmanda. **Tek dokunuşla başlama değişmedi.** | F2 |
| Renkli, yoğun beceri efektleri | Tek renkli halka | Beceri 1 ve 2'de altın, camgöbeği ve pembe ışınlar, genişleyen zemin halkası, kısa ekran parlaması. **Hasar formülü değişmedi.** | F3 |
| Belirgin güç değeri | Küçük gri yazı | "SV n • GÜÇ n" altın renkte ve kalın | F4 |
| Yuvarlak ikonlu alt menü | Kare düğmeler | Yuvarlak, altın çerçeveli ikonlar; etiket alt kenarda | F4 |
| İsim plakaları, boss çubuğu, büyük hasar rakamları, kamera ölçeği | 3.29'da yapıldı | Korundu | E3, E4, E6 |

## 4) Bilerek yapılmayanlar
- **"Crit" (kritik vuruş) sistemi:** Ekonomi ve savaş dengesi değişikliği; 3C işi. Görsel olarak beceri vuruşları zaten büyük ve altın renkli.
- **3D kamera ve 3D karakterler:** Tek HTML piksel motorunda yok. Dikey 2D/2.5D piksel stili korunuyor.
- **Sahte sohbet / VIP / premium para:** Gerçek sistem olmadan eklenmedi (kurala uygun).
- **Zindan geri sayımı, world boss, lonca:** 4. aşama ve sonrası.
- **Beceri tuşlarının saldırı tuşu etrafında yay şeklinde dizilmesi:** Dar ekranlarda (320 px) çakışma ve dokunma alanı riski var; HUD yerleşim çalışmasında (3E) değerlendirilecek.

## 5) Test sonuçları
| Paket | Sonuç |
|---|---|
| 3.30 yeni (`suite330.js`) | **6/6 PASS** |
| 3A regresyonu | **43/43 PASS** |
| 3B regresyonu | **16/16 PASS** |
| 3.27 regresyonu | **8/8 PASS** |
| 3.29 regresyonu | **9/9 PASS** |
| Android emülasyonu | **56/56 PASS** (ilk koşuda 51/56: yuvarlak ikonların 2 px kenarlığı görünmez dokunma alanını 41 px’e düşürmüştü; alan genişletildi, yeniden koşu 56/56) |

**T03 test düzeltmesi:** Yakınlaştırma 1,45'e çıktığından "sağa yürü" dokunuşu Bilge Işın'ın dokunma alanına düşüp konuşma başlatıyordu (oyunun doğru davranışı). Hedef NPC'den uzak bir noktaya alındı.
