# Kırık Mühür 3.26 — Aşama 3B Test Raporu

**Sürüm:** `Kirik_Muhur_3_26_3B_Harita_Gorev_TEST.html` · **Dal:** `claude/claude-onarim-komutu-3dd6oy` · **Tarih:** 19.11.2026
**Ortam:** Linux bulut konteyneri, Chromium (Playwright, headless). Mobil dokunmatik emülasyon, deviceScaleFactor 2. `file://` ve yerel HTTPS (`https://127.0.0.1:8443`) üzerinden açıldı.
**Android cihaz:** Yok; fiziksel cihaz testi yapılamadı.

> Testlerin hepsi Chromium emülasyonunda yapıldı; gerçek Android değildir. Oyun zamanı `__kmTest.step(dt)` ile, gerçek `tick()` işlevi üzerinden ilerletildi. Dokunuşlar ve `localStorage` gerçektir.

## A) 3B testleri — `testler/3B_3_26/suite326.js` — **16/16 PASS**

| # | Kontrol | Sonuç | Kanıt |
|---|---|---|---|
| B01 | Bölge kilitleri | **PASS** | Görev 0'da yalnız köy ve orman açık. Kilitli tapınak geçidine yürüyen oyuncu ormanda kalıyor ve şu bildirimi alıyor: "🔒 Kırık Tapınak kilitli: “Ormanın Gölgeleri” görevini teslim et". Kilitli bölgeye harita rotası kurulamıyor; haritada 2 bölge `🔒 KİLİTLİ` görünüyor. Görev 1'de tapınak açılıyor, Kül Geçidi kapalı kalıyor; görev 10'da Kül Geçidi'ne geçiliyor. |
| B02 | Rota grafiği | **PASS** | Görev 10'da köyden başlayan oto yolculuk köy → orman → tapınak → Kül Geçidi zincirini izledi ve görevi 18 sn'de teslim etti. Dönüş zinciri tapınak → köy. |
| B03 | Çizim = çarpışma (Kül Geçidi) | **PASS** | 7 engelin merkezi bloklu; alanın %72–100'ü kaya/lav paletinde çizili. 32 nokta (7 NPC, 16 doğma, 4 bölgenin geçit + varış noktaları) yürünebilir. |
| B04 | Hikâye bossları | **PASS** | Kolos: görev öncesinde yok, görevde var, öldükten sonra yok. Kül Lordu: başka görevde yok, görev "hazır" iken yok, av sırasında var. Nöbetçiler görev 0'da 0, ilerleyen görevlerde 2. |
| B05 | Yeni çizimler ve çeşitlilik | **PASS** | Sprite sayfaları yüklendi: 4 yaratık (diken kurdu, taş nöbetçi, kül kıvılcımı, Kül Lordu) ve 6 NPC görünümü. Görev 16'da yaratık türleri: orman gölge + diken kurdu, tapınak taş nöbetçi, Kül Geçidi kül kıvılcımı. Toplam 7 NPC. |
| B06 ×3 | 26 görev zinciri (Muhafız, İzci, Dokumacı) | **PASS** | 3 sınıfta da 26/26 görev tamamlandı (16 hikâye + 10 devam). Her görevde ödül penceresi açıldı (`mission-N`); ödül kimlikleri tekil. 5 görev türü, 7 teslim NPC'si, 4 bölge kullanıldı. 10 devam görevinin 10'u farklı; aynı görev arka arkaya gelmedi. Ölüm 0, JS hatası 0. |
| B07 | Manuel oyun ve öz savunma | **PASS** | Oto kapalıyken konuşma (1/1), keşif (2/2) ve diken kurdu avı (2/2) sayıldı. Diken kurdu görevindeyken yakındaki gölgeye oto savaşla karşılık verildi (gölgenin canı 59 → 21). |
| B08 ×3 | 3.25 → 3.26 kayıt geçişi | **PASS** | **Bitmiş eski devam görevi (sıra 12):** eski ödül bir kez verildi (+129 altın), sıra 13 oldu. **Yarım kalan (sıra 11):** aynı sırada baştan başladı, altın değişmedi. **Kilitli bölgede kayıt:** oyuncu köyde başladı. Yeni şema 326, çift ödül yok. |
| B09 ×4 | Kül Geçidi portre ölçüleri | **PASS** | 320×568, 360×800, 393×852 ve 412×915'te ekran dışına taşan, üst üste binen düğme ya da yatay kaydırma yok. Görüntüler: `GORSEL_DENETIM/3B_3_26/kul_gecidi_*.png` |

## B) 3A regresyonu 3.26 üzerinde — `suite_3A_regresyon.js` — **43/43 PASS**

3A'nın 43 testi 3.26'ya karşı yeniden çalıştırıldı. Tek senaryo uyarlaması T12'de yapıldı: görev 0'da tapınak artık kilitli olduğu için yanlış bölge senaryosu görev 2 ile kuruldu.

**Test düzeltmesi:** T20'de, ödül listesini diskteki kayıtla değil, yeniden yüklemeden sonraki canlı durumla karşılaştıran eski bir kontrol kalmıştı. Yeniden yüklemeden sonraki 120 ms'de oyun gerçek zamanlı sürdüğü için yan ödül araya girip yanlış FAIL üretiyordu. Kontrol kaldırıldı; diskteki kayıtla birebir karşılaştırma duruyor (50 döngü, 0 fark). Aynı düzeltme 3.25 test dosyasına da işlendi.

## C) Görsel denetim
`GORSEL_DENETIM/3B_3_26/`:
- Kül Geçidi: giriş, kıvılcım savaşı, Kül Lordu
- Ormanda diken kurtları ve Otacı Lin
- Tapınakta taş nöbetçiler ve Kül Geçidi kapısı
- Köyde Demirci Oran
- Kilitli ve açık dünya haritası
- 4 portre ölçüsü

## Açık maddeler (3B kapsamı dışında, raporlandı)
- **Zorluk:** 26 görevde hiç ölüm olmadı, Kül Lordu dahil; denge 3C'de ele alınacak.
- **Çizim/çarpışma:** mevcut üç haritada (ormandaki ağaçlar, köydeki tezgâh) çizim ile çarpışma uyuşmuyor; 3E'de ele alınacak.
- **Taşınan 3A maddeleri:** fiziksel Android kabulü ve canlı HTTPS origin'inde kapat/aç denemesi (kullanıcı kararıyla ertelendi).

## AŞAMA 3B KABUL DURUMU
**Tarayıcı testlerinde tamam:** 3B 16/16, 3A regresyonu 43/43.
Kullanıcı onayı bekleniyor: yeni bölge, görev zinciri ve görseller oyunda denenmeli.
**3C'ye geçiş:** kullanıcı onayıyla.
