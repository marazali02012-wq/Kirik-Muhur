# Kırık Mühür — 3.23 Görev Çeşitliliği Denetimi

Tarih: 19 Kasım 2026. İzole test sürümü. **Ana `index.html` değiştirilmedi, 3. aşama kapanmadı.**

## Kök neden
3.22'nin `missionInfo()` fonksiyonu ilk iki görevi ayrı tanımlıyor; `missionIndex>=2` olan her görev `RUH ORMANI DEVRİYESİ` olarak tekrarlanıyordu. Aynı hedef bölgesi, aynı yaratık türü ve aynı Bilge Işın NPC'sine dönüş zorunluydu.

## Referans / özgünlük
Kung Fu Saga'dan genel **otomatik görev + ana görev/yan görev + dünya haritası üzerindeki görev noktaları** yaklaşımı incelendi. Kaynak: https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-beginner-guide-en.html (Questing System). Oyunun görselleri, kodu, özel isimleri ve görev metinleri kopyalanmadı.

## Uygulanan
- Önceki iki görev ve ödül kimlikleri korundu (orman gölgeleri, tapınak boss'u).
- Toplam **10 ayrı hikâye görevi** (3 savaşa dayalı ilk görev dahil; hikâye görevleri arasında **savaş, mühür toplama, iz/yazıt inceleme** türleri bulunuyor).
- İlk hikâye görevleri bitince **5 farklı devam görevi** sırayla dönüyor; önceki gibi aynı orman avı art arda yinelenmiyor.
- Görev noktaları artık üç bölgeye dağılmış: **Fener Köyü, Ruh Ormanı, Kırık Tapınak**.
- Yeni teslim NPC'leri: **Gözcü Nera** (orman), **Yazman Tara** (tapınak). Bilge Işın köyde kaldı. Yeni NPC'ler mevcut sprite'ı kullanıyor; özgün yeni karakter animasyonları henüz çizilmedi.
- Harita görünümüne iki yeni NPC konumu eklendi; inceleme/toplama hedefleri dünyada işaretleniyor.
- **Tek dokunuşlu oto görev** korunuyor: hedefe git → uygun görevi yap → ilgili bölgedeki NPC'ye dön → ödülü bir kez al. Oyuncu manuel kontrolü devralınca otomatik hareket durur.
- Eski 3.22 kayıtlarının `missionIndex>=2` devam eden devriyeleri, farklı görev şemasına hatalı bağlanmasın diye yeniden **hazır** duruma alınır; seviye, envanter, altın, XP, ödüller ve görev numarası korunur. Yarım kalan eski devriyenin sayacı sıfırlanır.

## Otomatik Chromium testleri
- **Muhafız:** 393×852 ekranında 0–14 görevleri art arda (15 tamamlandı).
- **İzci + Dokumacı:** 393×852 ekranında ilk 5'er görev.
- **Muhafız:** 360×800 ve 412×915 ekranlarında ilk 10'ar görev. Üç farklı görev tipi ve bölge teslimi bu ekranlarda geçti.
- **Üç sınıf:** toplama görevi sırasında manüel müdahale → otomatik duruş → düğmeden devam → tek ödül.
- **Muhafız:** ormanda NPC'ye dönüş sırasında manuel durdurma → devam etme → bir kez ödül.
- **Eski kayıt:** `missionIndex=4`, sınıf/seviye/altın/envanter/önceden alınmış ödüller korunarak görev sıfırlama ve devam etme.
- `node --check` JavaScript sözdizimi: **geçti**.

## Eksik kabul kriterleri
- Fiziksel Android'de oyun ve uzun süreli takılma/FPS testi yapılmadı.
- Gerçek tarayıcı `localStorage` disk kaydı-kapanma-açılma testi, test ortamının `ERR_BLOCKED_BY_ADMINISTRATOR` güvenlik kısıtı nedeniyle yapılamadı; sahte geri yükleme testi buna eşdeğer değildir.
- **Yeni harita alanı henüz eklenmedi:** Görev çeşitliliği mevcut üç bölge içinde sağlandı.
- Görev türleri tamamlandı; bu sürüm **ayrı yan görev sekmesi, yeni boss zindanları veya yeni NPC animasyonları** eklemez.
- Hikâye yazımı, güç ve XP dengesi ile görsel kalite henüz final kabul almadı.

## Dosyalar
- HTML: `Kirik_Muhur_3_23_Cesitli_Gorevler_TEST.html`
- İzole canlı test: https://kirik-muhur-314-izole-test.onrender.com/Kirik_Muhur_3_23_Cesitli_Gorevler_TEST.html
- GitHub dalı: `stage3-reward-ui-314`. Ana `index.html` ve diğer projeler değiştirilmedi.