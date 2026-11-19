# Kırık Mühür — Kung Fu Saga Google Play referans denetimi
Tarih: 19 Kasım 2026. Kapsam: **sadece mekanik/oyuncu ilerleme tasarımı**; Kung Fu Saga varlık ve kodlarını kopyalama yok.

## 1. Doğrudan resmi mağaza sayfasından doğrulananlar
Kaynak: https://play.google.com/store/apps/details?id=com.rxsjus.an.watt
- Oyun: **Kung Fu Saga**; yayıncı **TTHmobi**, Android rol yapma/MMORPG ve çok oyunculu olarak listeleniyor.
- Resmî açıklama: farklı meslek/sınıflar, orman ve buzullar gibi biyomlar, evcilleştirilebilir pet/binekler, loncada arkadaşlarla boss savaşları.
- 2026 mağaza açıklamasında **5 meslek** ifadesi var. Eski BlueStacks sınıf rehberi **6 sınıf** sayıyor; sürüm/terminoloji farkı var. Doğrulamadan Kırık Mühür'e zorla yeni sınıf sayısı taşınmaz.
- Resmî sayfa, genel mekanikleri kanıtlar ama gerçek UI'nin tüm sekmelerini, belirli zindan sayısını, harita sayısını veya ilerleme matematiğini kanıtlamaz.

## 2. Üçüncü taraf oynanış rehberlerinden doğrulananlar
https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-beginner-guide-en.html
https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-classes-guide-en.html
- Ana görev ve yan görev ayrı; dünya haritasında görev noktaları; otomatik yol bulma, otomatik savaş ve deneyim/altın ilerlemesi.
- BP (güç puanı) seviye, beceri yükseltme, pet/binek, unvan ve diğer güçlendirmelerle artıyor.
- Beceri ekranında seviye koşuluna göre açılan aktif/pasif beceriler; sınıflara özgü savaş rolleri.
- 2023 rehberinde **ikinci sınıf 60. seviye** olarak veriliyor: bu eski oyun bilgisi, bugünkü sürüm kesinliği yok.
- Eski rehberde serbest ve ücretli para birimleri, günlük etkinlik ödülleri ve ekipman geliştirmenin bulunduğu açıklanıyor.
- Bazı yorumlarda otomatik görev akışının aşırı çizgisel, arayüzün kalabalık ve para harcamanın belirleyici olduğu eleştiriliyor. Bunlar kopyalanmamalı.

## 3. Kırık Mühür 3.24 gerçek koduyla fark
Kaynak: GitHub `stage3-reward-ui-314/Kirik_Muhur_3_24_Gelisim_Omurgasi_TEST.html`, blob `b70de48f729e77fdd924711001ada641cb39b2d5`.

| Sistem | Şu an | Açık kalan doğru iş |
|---|---|---|
| Dikey sahne, yürüyüş/otomatik görev | 3 bölüm/3 sınıf; 3.24 testte çalışıyor | Fiziksel Android, uzun süreli rota ve kayıt kabulü |
| Görev yapısı | 10 ana görev, 5 dönüşümlü görev, 3 yan hedef | Karakter seviye eşikleri ile bölge açılması; görev çeşitliliği ve denge |
| XP, seviye, BP | Temel XP/istatisik + hesaplanan güç ekranı | Gerçek ilerleme eğrisi, güç sıçrama dengelemesi |
| Sınıf becerileri | İki aktif beceri, şifa | Seviye ile açılma/yükseltme, özgün pasifler, görsel açıklamalar |
| Ekipman | Çanta/takma/güçlendirme, hikâye ödüllü 3 yeni eşya | Nadirlik, seviyeye bağlı ganimet, ekonomi kaynak dengesi |
| Pet/binek | Temel aç/kapat | Gerçek kazanma/eğitme, görsel hareket ve statü katkısı |
| Bölge/yaratık çeşitliliği | 3 harita, az tür | Farklı biyom/yaratık animasyonu; yeni bölge testini sonraki kabul kapısına bırak |
| Zindan/çoklu boss | 1 mevcut hikâye bossu | **3. aşama bittiğinde** ayrı zindan/boss aşaması |
| Lonca/çok oyunculu | Yok | Gerçek backend/veri tabanı ve ağ senkronizasyonu; sonraki bağımsız aşama |
| VIP, gacha, premium | Planlanmadı | Mekanik kopyası ve maliyet riski nedeniyle kapsam dışı; kullanıcı açıkça isterse ayrıca değerlendir |

## 4. Uygulama sırası — aşama kilidi
**Şu anda yalnız 3A:**
1. Fiziksel Android'de bir görev: otomatik av, farklı NPC teslimi, menüler, dönüş, karakter yürüyüşü.
2. Oyunu kapatıp aç: sınıf/XP/missionIndex/questPhase/enventory/yan ödül kaydı korunmalı. Aynı ödül ikinci kez verilmemeli.
3. Uzun rota + ölüm/yeniden başlama + görev bölgesinden çıkıp geri dönüş. Tüm 3 sınıfta regresyon.
4. Önceki 3.24 test kaydı korunmalı. Sürüm/doğrulama geçiş planı olmadan `index.html` ile birleştirme yapılmaz.

**3A kabulünden sonra aynı 3. aşama içinde:** ilerleme tablosu/level-gereken XP, beceri açılma seviyeleri, pet/binek gelişim prototipi, görsel kalite ve kaynak dengesi. Bu aşama da test edilmeden boss zindanlarına geçilmez.

## Kabul koşulu
Çalışan oynanışın görüldüğü gerçek cihaz testi + kapanış sonrası kayıt testi + otomatik/manuel tüm faz regresyonu + görsel çakışma kontrolü olmadan "tamamlandı" denmez.

Bu belge araştırma/karşılaştırma sonucudur, yeni oyun mekanikleri kodda hayata geçirildiği iddiası değildir.
