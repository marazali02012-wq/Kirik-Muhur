# Kırık Mühür RPG — Ana Oyun Omurgası ve Aşama Kilidi

**Karar tarihi:** 19 Kasım 2026 · **Revizyon:** 2 · **Durum:** Onaylanan hedef tasarım; mevcut özelliklerin tamamlandığı anlamına gelmez.  
**Kapsam:** Yalnız **Kırık Mühür RPG**. Arena Forge Pro'ya dokunma. Kung Fu Saga'nın ekran/oynanış mantığını referans al; varlık, isim, kod ve ayırt edici görsel düzenini kopyalama.

> **Hedef:** Kung Fu Saga türü yoğun arayüz ve görev/savaş/gelişim akışına sahip, dikey mobil açık alan MMORPG hedefli; fakat özgün isim, karakter, dünya, ikon ve sanatla geliştirilen **Kırık Mühür**. Bugünkü oyun bir çevrimdışı HTML5 RPG prototipidir; eşzamanlı gerçek MMORPG **değildir**.

## 1) Ana oynanış döngüsü (zorunlu)
Dikey tek karakter → açık alan dolaşma → NPC'den görev / görev takip → otomatik yol bulma → otomatik savaş veya manuel devralma → yaratık/nesne/boss hedefleri → doğru NPC'ye dönme → **ödülü bir kez otomatik ekleme** → **bilgilendirici ödül popup'ı** → XP, güç ve ekipman gelişimi → bir sonraki ana/yan görevin ve bölgenin açılması.

**Kesin etkileşim kararı:** Oyuncu görevi başlatırken bir kez dokunabilir. Otomatik akış açık kalırsa tamamlayınca NPC'ye kendisi döner; ödülü otomatik verir. **ÖDÜLÜ AL / SONRA AL şeklinde ikinci onay yoktur.** Popup sadece kazanılanları (altın, XP, eşya) gösterir, ödülü verip vermemeyi sorgulamaz; uygun bir dokunuşla/sonra kapatılabilir. Oyuncu manuel kontrolü devralırsa oto hareket kendiliğinden yeniden başlamaz; görev tuşu ile sürdürür. Her ödül için idempotent/tekil kimlik gerekir.

**Görev çeşitliliği:** Tek orman/devriye döngüsü olmayacak. Hikâye, keşif, toplama, yaratık grubu, görev bossu, yazıt/etkileşim, yan görev ve bölge ilerlemesi farklı NPC'lerde ve sahalarda tamamlanacak. Devam görevleri yalnız sayıları artıran tekrarlar olmayacak.

## 2) Giriş ve karakter oluşturma
- Özgün sınıflar; **erkek/kadın görünüm seçimi**.
- Büyük, görsel kalite standardına uygun sınıfa/görünüme özel karakter önizlemesi.
- Tematik arka sahne ve adımlı **Sonraki Adım (Next Step tarzı)** akışı; seçim özeti ve oyuna giriş.
- Seçilen sınıf/görünüm kalıcı kayıtta ve oyun HUD portresinde tutarlı. Şu an yalnız 3 sınıf temel seçimi var; erkek/kadın ve büyük önizleme **henüz tamamlanmadı**.

## 3) Dikey oyun HUD'u (yerleşim şartnamesi)
| Bölüm | Hedef |
|---|---|
| Üst sol | Sınıf portresi, seviye, HP/MP, **güç** ve ileride gerçek değeri olan **VIP** |
| Üst orta / kaynak çubuğu | Altın, ruh tozu, premium kaynak (ekonomi yapılmadıysa sahte bakiyeyle sunulmaz) |
| Üst sağ | Bölge adı, koordinat ve çevrimiçi/durum bilgisi (gerçek çevrimiçi yoksa çevrimiçi etiketi konmaz) |
| Sol orta | Ana/yan görev panelleri; okunur ilerleme ve otomatik hedef işareti |
| Orta | Oyuncu, NPC, düşman, hasar sayıları, beceri efektleri; ekranın kullanılabilir alanı korunur |
| Alt orta | Saldırı, aktif beceriler, şifa ve bekleme süreleri |
| Alt sol/alt sıra | Karakter, Çanta, Beceri, Pet, Forge ve kilidi açılmış ilgili kısayollar |
| Alt sağ | Sohbet (gerçekse), hızlı menü **çiçeği** ve ayrı hareket/etkileşim kontrolü |

**Çiçek kararı:** Önceki kullanıcı kararı korunur: sağ alttaki çiçek **joystick değildir**; çevrilince/sayfa değiştirince menüleri (lonca, çanta, vb.) gösteren/gizleyen hızlı menüdür. Karakterin hareketi çiçekten bağımsız dokunmatik hareket kontrolü veya yol bulma ile yapılır. HUD yoğun fakat 360×800, 393×852, 412×915 gibi portre ekranlarda **taşma, panel üst üste binme veya savaş alanını kapatma** yapmamalı.

## 4) Savaş / yaratık / boss
- Açık alan savaşı; birden fazla düşman ve tür, hedef seçimi, saldırı ve hasar sayıları.
- Sınıf becerileri, bekleme, mana, otomatik savaş aç/kapat ve manuel devralma.
- Can, hasar, savunma ve seviyeye bağlı dengeleme; ölüm/yeniden başlama, ganimetin tek verilmesi.
- Mevcut hikâye bossu korunur. **World boss, dungeon boss ve çok oyunculu boss** mekanikleri ancak ilgili ileriki aşama kabulünden sonra geliştirilecek; sırf boss simgesi eklenmiş diye çalışan boss sistemi sayılmaz.

## 5) Gerçek işlevli menü ve sistemler
- Karakter/stat/güç puanı (BP); çanta, eşya nadirliği, kuşanma/çıkarma.
- Beceri ekranı, açılma seviyesi ve sınıfa özel aktif/pasif gelişim.
- Pet ve binek kazanma, geliştirme, hareket/çizim, stat etkisi.
- Forge/geliştirme, kaynak maliyeti ve başarının kayda yazılması.
- Görev **bilgilendirme** ödül popup'ı (ödül otomatik dağıtıldıktan sonra).
- Ana şehir/hub; satıcı, görev NPC'leri, forge/pet noktaları; haritayla gerçek bağlantı.
- Üst/yan yoğun menüler; **boş ve sahte çalışan menü yok**.

## 6) Sosyal / meta / genişleme modülleri
- Lonca, mağaza/market, hunt/dungeon/daily/event, sohbet, boss girişleri, günlük görevler ve güce bağlı içerik açılması.
- Gerçek lonca, canlı chat, eşzamanlı PvP/world boss **sunucu + kalıcı hesap verisi + yetki + ağ senkronizasyonu** gerektirir. Bağımsız HTML ekranını çevrimiçi MMORPG diye pazarlama.
- VIP / premium / satış unsurları yalnız gerçek, doğrulanabilir satın alma ve hak yönetimi kurulunca aktif olur; fiyat/ödül/kazanım uydurulmaz.

## 7) Görsel stil ve özgünlük
- **Mekanik ve ekran hissi:** Kung Fu Saga türü parlak, yoğun HUD; açık dünya ve otomatik görev/dövüş ritmi; doğu-fantastik 2.5D atmosfer.
- **İşçilik/kalite:** Kullanıcının `referanslar/` klasöründeki dört piksel-art örneği: güçlü ışık, temiz kontur, kontrollü palet, zemin/perspektif ve ayrı derinlik katmanları.
- **Özgün çizilecek:** Tüm karakter ve sınıf adları, silah/yaratık/bosslar, ikonlar, düğmeler, kostümler, şehir/harita, NPC, sahne ve UI süsleri. Referansı doğrudan kopyalama veya telifli varlıkları oyun paketine alma.
- Dikey sahne çizimlerinin hedefi sabit: karakter ve harita dengesi, büyük boş/düz kareli zemin yok; animasyon yürüyüş/dönüş/saldırı/hasar/ölüm ile tutarlı. Pikselli görünüm bir *stil tercihi*; gerçek 3D kalite tamamlanmış sayılmaz.

Görsel referans arşivi: [Dört görselin denetimi](KIRIK_MUHUR_4_GORSEL_REFERANSI.md). Mevcut izole test: `Kirik_Muhur_3_24_Gelisim_Omurgasi_TEST.html`.

## 8) Yapım sırası ve AŞAMA KİLİDİ
**Başka sistemler çekici diye aşama atlanmayacak.** Bir kabul kapısı kapanmadan sonraki kodlama başlamaz.

| Kilit | Tamamlanma şartı | Durum |
|---|---|---|
| **3A — Çekirdek motor** | Dokunmatik yürüyüş/dönüş, manuel/oto hedef, yol, savaş, NPC, tek otomatik ödül, save/restore, farklı sınıflar/Android gerçek test | **AÇIK** |
| **3B — Harita/görev** | Farklı NPC'ler, bölge geçişleri, hikâye/yan görev akışı, yaratık/nesne grubu, tekrarsız görev zinciri ve rotaların regresyonu | Taslak/deneme var; **kabul edilmedi** |
| **3C — Güçlenme/ekonomi** | Seviye/XP/güç, eşya, beceriler, forge, pet/binek ilerlemesi ve dengeli açılma | 3.24 parçaları var; **kabul edilmedi** |
| **3D — Kalıcılık/regresyon** | Eski kayıt geçişi, farklı ekranlar/uzun oyun, çökme/çift ödül/geri dönüş, cihazı kapat-aç | **Bekliyor** |
| **3E — Görsel/HUD/giriş** | Özgün 2.5D sahneler, üç sınıf/görünüm önizlemeleri, yoğun ama düzgün HUD, menüler, şehir hub ve animasyon kalitesi Android'de onay | **Bekliyor** |
| **4 — Zindan/boss** | Ancak bütün 3A–3E kriterleri sağlanınca boss zindanları, özel ganimet, giriş/çıkış ve yeni boss tipi | **Başlanmadı** |
| **5 — Gerçek çevrimiçi dünya/sosyal** | Sunucu otoritesi, hesap, gerçek chat, lonca, senkron PvP ve yetki/ölçüm testleri | **Başlanmadı** |
| **6 — Etkinlik/ekonomi** | Daily/event, mağaza, sezon, premium/VIP tasarımı ve gerçek uygulama davranışı | **Başlanmadı** |

## 9) Değişiklik güvenliği
- Bu belge **uygulama kodu değişikliği değildir**. 3.24 testinde çalışanları doğrulamadan ana `index.html`'ye taşıma.
- Testler izole dalda; kayıt anahtarlarını ve kullanıcı ilerlemesini koru. 3.23/3.24 gibi eski sürümleri yanlışlıkla ezme.
- Başarı yalnız yapılan test düzeyinde söylenir: Chromium simülasyonu ≠ gerçek Android; statik site dağıtımı ≠ oynanış başarısı; offline prototip ≠ MMO.
- Her aşama sonunda **kök neden, gerçek kod farkı, test kanıtı, açık kalan hata, kabul kararı** ayrı raporlanmalı.

### Net proje tanımı
> **Kırık Mühür:** Kung Fu Saga'nın genel görev–savaş–şehir–pet/binek–lonca omurgasından ve mobil HUD düzen prensiplerinden referans alan; görsel işçilikte kullanıcının piksel-art örneklerini hedefleyen; ancak isim, sanat, karakter, mekanik tasarımın ayrıntıları ve arayüz kimliği tamamen özgün, dikey mobil açık alan RPG ve gelecekte gerçek çok oyunculu MMORPG hedefli proje.
