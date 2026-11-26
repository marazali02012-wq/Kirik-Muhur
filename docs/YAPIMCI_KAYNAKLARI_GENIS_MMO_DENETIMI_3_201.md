# Kırık Mühür 3.201 — Yapımcı kaynakları, bütün oyun eksik denetimi
2026-11-26. Kullanıcı kararı: depo/çanta tek örnek; oyunun tamamını seviye, hikâye, gerçek açılma, ekonomi ve çevrim içi altyapıyla birlikte kur. Ana 15 sıra, M/R/Q/V kimlikleri, özgün KayKit sanatı ve isimleri korunur. Bu genişletilmiş kabul listesi önceki kontrollü testleri silmez; yeni açıklar ilgili maddelere eklenir. Kodda yalnız katalog/menü adı bulunması işlev kabulü değildir. Tamamlanmış 01–07 yalnız temel kabul, nihai oyun kabulü değil.

> **Güncel kullanıcı kararı:** 26.11.2026 — Kullanıcının güncel ve önceki ücretli yükselme kararını açıklayan son talimatı: Ödeme sürekli olmayacak; ücretsiz oynanış ve doğal gelişim ile belirli aşamalardaki ücretli yükselme arasında denge kurulacak. Tamamen ücretsiz yükselme garantisi yoktur; ancak her seviye, görev, ekipman geliştirme veya sistem açılışına ödeme şartı konulmayacaktır. Ücretli eşikler, sıklık, fiyat, ürün ve VIP/abonelik henüz belirlenmedi. Kabul ölçütü: seviye bantları boyunca doğal kaynak, kazanım hızı, ödeme noktası sıklığı ve toplam maliyet, güç farkı ve içerik erişimi birlikte ölçülür; tekrar tekrar ödeme gerektiren zincirler ve gereksiz ödeme duvarları önlenir. Ücret koşulları önceden açık gösterilir; gerçek ödeme doğrulaması ve güvenli teslim gerekir. 500+100 seviye, hikâye, mevcut sistemler ve diğer kabul koşulları korunur.

## Birincil kaynaklar ve sınırlar
- S01 Watt Games, Kung Fu Saga resmi App Store sürüm geçmişi: https://apps.apple.com/us/app/kung-fu-saga-martial-path/id1660688865 — özellikle 2023–2024 sürüm notları: sınıf terfileri, ruh çeşitleri, ekipman birleşimi, ileri setler, dönüşüm ve onun özel beceri/seti, farklı uçurum katları, savaş/ödül değişimleri, meridyenin boss kaynağı, seviyeden yetenek puanı, çapraz sunucu ekipman ganimeti ve müzayede. Yeni mücevher tavanı örneği 12. Bunlar özellik kanıtıdır, KFS'nin gizli formülü veya bizim kesin eşiklerimiz değil.
- S02 Pearl Abyss resmi macera rehberi: https://www.world.blackdesertm.com/Ocean/Wiki?wikiNo=2009 — hikâyeyle açılan beceri ve birleşim sistemleri, bölgeye özgü kaynaklar, keşif süresi/giriş malzemesi, güçlendirme aktarımı, pet becerileri, işçi/kamp, ticaret, peri keşfi.
- S03 Pearl Abyss rehber kataloğu: https://www.world.blackdesertm.com/Ocean/Wiki — meslek, katkı, dostluk, zindan, lonca, pazar, olasılık açıklamaları. Katalogdaki tüm alt sayfalar henüz tek tek okunmadı.
- S04 Unvanlar: https://www.world.blackdesertm.com/Ocean/Wiki?wikiNo=36 — farklı kazanım kategorileri, koşul ipucu, görünür/gizli unvan ve koleksiyon.
- S05 Keşif bilgisi: https://www.world.blackdesertm.com/Ocean/Wiki?wikiNo=11 — koşula bağlı bilgi edinme, kategori ve eksik bilgi ipucu.
- S06 Blizzard resmi Diablo Immortal güncellemesi: https://news.blizzard.com/en-gb/article/24096019/command-wind-and-sea-as-the-tempest — birbirini açan yetenek dalları, zorluk ve seviye bağı, boss kademesi, ilerleme göçü ve eski ödülün tekrar verilmemesi. Bu 2024 tarihli tasarım örneğidir, güncel Diablo seviyesi iddiası değildir.
- S07 https://news.blizzard.com/en-us/article/24130176/temper-yourself-in-the-crucible-of-justice — ana hikâye devamı ve önceki bölüm önkoşulu, co-op ve ekipman çeşitliliği.
- S08 https://news.blizzard.com/en-gb/article/24206338/come-to-sharvals-aid-in-our-next-major-update — ekipman kazanım bölgeleri/kaynakları, kodex, zorlukla eşlenen üretim malzemeleri.
- S09 Heroic Labs ilerleme ve meta oyun dokümantasyonu: https://heroiclabs.com/docs/hiro/concepts/ — ilerleme, ekonomi, envanter, başarı, takım, posta ve istatistik. Hiro'nun kendisinin lisanslı bir ürün olabileceği dikkate alınır; kurulduğu varsayılmaz.
- S10 Başarı/görev: https://heroiclabs.com/docs/hiro/concepts/achievements/ — bağımlı hedefler, alt hedefler, günlük/haftalık ve tek seferlik ödül, süre penceresi; alınmamış ödülün yenilemede korunması.
- S11 Ödül: https://heroiclabs.com/docs/hiro/concepts/economy/rewards/ — ödül tanımı, sunucuda çekiliş/hesaplama, verme, posta ve takım ödülü ayrı.
- S12 https://heroiclabs.com/docs/nakama/server-framework/introduction/best-practices/ — sunucuda ilerleme ve envanter birlikte işlem, sürüm çakışması kontrolü, sınırlı sıcak kayıt ve arşiv, toplu yazma, savaş tick'inde veritabanı sorgusundan kaçınma.
- S13 https://heroiclabs.com/docs/nakama/concepts/multiplayer/authoritative/ — sunucuda girdileri doğrulama, durum yayını, oturum ve yeniden bağlanma.
- S14 https://www.world.blackdesertm.com/Ocean/News/Detail?boardNo=3612 — ana görevle içerik açılması, görev arayüzünde açılacak içerik ve ödül, eski ilerlemenin yeni göreve taşınması.
- 154 kullanıcı görseli, 24 önceki web referansı, 157 metin denetimi ve ana şartname birincil proje girdileridir; bu denetimde tüm görseller yeniden tek tek açılmadı. 135–138 önceki gerçek füzyon gözlemleri korunur. Bilinmeyen formül, kesin maliyet, drop oranı veya açılma seviyesi uydurulmaz. Özgün oyun kararları ayrıca işaretlenir. Ücretli yükselme kullanıcı kararıdır; kaynaklardaki VIP ve ürün tarifleri otomatik kopyalanmaz.

## Yeni ana kural: tek ilerleme grafiği
Her işlevde: kalıcı sistem kimliği + hikâye bölümü + ön görev teslim anahtarı + seviye/güç + gerekiyorsa kaynak/zafer + gerçek işlem + ödül kaydı + UI açılma eğitimi + test. Ayrı ayrı menülerde çelişkili kilit yok. Açık sistem, günlük giriş hakkı ve sahip olunan donanım ayrı durumdur. Bir sistemin gerçek çalışması ve menüsü birbirinden ayrılmaz; bilinen fakat kodlanmamış özellik oyuncuya oynanabilir gösterilmez.
Mevcut 46 görev ve 12 yan görev korunur. 3.201 bunları yedi anlatı bölümüne bağlar, yeni ileri görev eklemez. Özgün devam hikâyesi: Demir Mahzen'deki mühür parçaları eski muhafızların bıraktığı geçitleri uyandırır; oyuncu bölgelerdeki mühür zincirini yeniden kurar, ileri tarikat sınavları ve ruh gelişimiyle 500 normal seviyeye ulaşır, peri yolu 100 seviyelik ayrı gelişimdir. Bu anlatı yönü taslaktır, bölüm ve seviyeler denge testinden sonra bağlanacak; yüzlerce kopya görev üretip tamamlandı denmeyecek.

## Ayrıntılı açık kabul kuyruğu
Durum K=kısmi/yeniden denetim, E=eksik veya yalnız plan, D=ayrıntı/kanıt doğrulaması bekliyor. Her satır açık; mevcut mekanikler silinmez. Durumlar 3.201 kodu, mevcut test kayıtları ve katalog karşılaştırmasından; her satır için tam uçtan uca kanıt henüz alınmadı.

| ID / ana sıra | Eksik veya kısmi işlev | Kabul şartı / kaynak | Durum |
|---|---|---|---|
| P01 / 01–02 | Hesap ve sunucu/karakter seçimi | Gerçek kimlik, karakter sahipliği, güvenli kayıt göçü ve yeniden bağlanma; S12–13 | E |
| P02 / 02 | Sınıf kimliği ve terfi önizlemesi | Mevcut üç sınıfı koru, kazanılmış görünüm/terfi ile stat ve beceri değişimi; S01 | K |
| P03 / 03–07 | Ortak seviye/görev bağımlılık grafiği | Menü/öğretici/oyun motoru aynı koşulu kullanır; S10,S14 | K |
| P04 / 05 | 46. görev sonrası ana hikâye | Yeni bölge, NPC, özgün konuşma, amaç, savaş, teslim, ödül ve sonraki bölüm; 500 normal seviyeye ulaşılabilir ekonomi; S07,S14 | E |
| P05 / 05 | Hikâye günlüğü ve bölüm arşivi | Tamamlanmış/kilitli/aktif, ödül ve açılan içerik; S14 | K |
| P06 / 05,12 | Yan görevler ve günlük 20 tur | 12 mevcut yan görevi koru; günlük tur ayrı, sonraki gün yeni anahtar ve ödül; S10 | K |
| P07 / 05,13 | Tarikat ilerlemesi | Gerçek DEF100/200/300/400 referans örnekleri; her sınav, bir kez ödül, beceri/yazma açılımı; 075/077 | K |
| P08 / 06 | Sınıf savaş/aktif pasif/yetenek ağacı | Mevcut beceri ve 12 öğrenme hakkı, ileri ağaçlar ve gerçek kaynaklar; S01,S06 | K |
| P09 / 06,11 | Savaş dengesi | Sınıf/menzil/çoklu hedef, hasar ve savunma, boss aşaması, gerçek süre/ölüm/dirilme; S06 | K |
| P10 / 07 | Açılma önizlemesi ve ilk kullanım | Gerçek kaynağı göster, geri dönüş, ilk kullanım öğreticisi, tek hak tüketimi; S10,S14 | K |
| P11 / 08 | Çanta/depo kapasite yolu | 42/42 başlangıç, altışar açılma, 84/72 toplam; eski fazla kayıt ve dolu çanta korunur; 3.200 | K |
| P12 / 08,14 | Ödül postası | Yerel taşma postası var; tüm ödül tipleri, benzersiz kimlik, kaynak/teslim tarihi, çevrim içi sunucu teslimi; S11 | K |
| P13 / 08 | Rol modeli ve üst düzey nitelikler | Kazanılan kostüm/kanat/silah, gerçek stat, temel/üstün ayrımı; 152 ve S01 | K |
| P14 / 08 | Unvan ve ad kartı | Savaş/keşif/meslek/lonca kazanımı, koşul, seç/gizle, tek bonus; S04 | E |
| P15 / 08 | Görünüm koleksiyonu | Sahiplik, önizleme, kuşan/gizle, stat ile görünüm ayrı; S03 | K |
| P16 / 08 | Üretim ve ekipman ekonomisi | Kaynak/üretim tarifleri, stat aralığı, nadirlik/kademe/yıldız/+ ayrı, güvenli aktarım, tüm maliyet ve doğal ganimet; S01,S02,S08 | K |
| P17 / 08 | Füzyon ve gem/set | Mevcut 54 test korunsun; gerçek kazanım, ileri set türü/olasılık, kaynak gösterimi; 135–138/S01 | K |
| P18 / 08 | Eşya kilitleme/filtre/sıralama | Değerli malzeme korunması, toplu eylem önizleme, kayıt işlemi; S09,S12 | K |
| P19 / 09 | Pet gelişimi ve gerçek ekipman | Pet kazanım, beceri, evrim, ekipman/eritme ve savaş etkisi; S01,S02 | K |
| P20 / 09 | Binek gelişimi | Sınıfa uygun gerçek oturuş, görünüm, hız, seviye/evrim, savaş geçişi; 051/S02 | K |
| P21 / 09 | Kanat seti ve şekli | 151: ayrı koleksiyon, beceri yuvası, yıldız/malzeme, gerçek stat; kısmi | K |
| P22 / 09,13 | İlahi yaratıklar | Kazanım, beceri, evrim, bağımsız ekipman, gerçek savaş etkisi; S01 | E |
| P23 / 10 | Keşif bilgisi | Bölge, NPC, canavar, boss kayıtları ve keşif ödülü; S05 | E |
| P24 / 10 | Bölgeye özgü dünya | İleri bölgeler, şehirlere bağlanan yollar, teleport, güvenli alan, kaynak ve düşman çeşitleri; S02 | K |
| P25 / 10 | Toplama ve meslekler | Madencilik, bitki, odun, balık, üretim; özgün meslek XP, süre, kapasite ve ekonomi; S02,S03 | E |
| P26 / 10 | Dostluk/itibar ve katkı | NPC görev/kazanım, itibar eşiği, gerçek ödül ve açılım; S03 | E |
| P27 / 10 | Kamp/işçi sistemi | S02 örneği; ana hikâyeye katkısı ve mobil maliyeti tasarlanıp kararlaştırılmadan oyuncuya eklenmez | D |
| P28 / 11 | Ayrı zindan türleri | XP/ekipman/kaynak/ruh/pet/binek/kanat/kader; özgün harita, giriş hakkı, gerçek dalga ve sonuç; 123–130/S02,S08 | K |
| P29 / 11 | 500 kule katı | Sıralı gerçek zafer, her 5. kat büyük boss, ilk zafer ve kader açılımı, ileri ekonomi; S06/063 | K |
| P30 / 11 | Kader taşı döngüsü | Yuvalar, işle/erit/füzyon/çıkar; kaynak ve gerçek stat; 063–065 | K |
| P31 / 11 | Dünya/kişisel/elit boss | Ayrı haritalar, ganimet tablosu, hedefler, kat, süre, yeniden doğuş ve hak; S01,S06 | K |
| P32 / 11 | Uçurum, kesintisiz ve zorluk katmanları | Önceki kat/level/güç şartı; farklı düşman, boss ve ganimet; S01,S06 | E |
| P33 / 11,14 | Takım zindanları ve ortak dünya bossu | Gerçek oda/ortak can/sunucu zaman/katılım/tek ödül; S13 | E |
| P34 / 11,14 | Solo ve gerçek PvP arena | Yerel PvE XP Arena mevcut, ayrı solo/PvP kuralları ve gerçek eşleşme; S13 | K |
| P35 / 12 | Günlük ve haftalık görev hedefleri | Sunucu zamanı, alınıp alınmayan ödül, görev/saat penceresi; S10 | K |
| P36 / 12 | Giriş takvimi ve aktivite sandıkları | 2/7/14/21/28 ve aktivite örnek eşikleri, telafi, tek ödül, gerçek sayaç; 032–044/S10 | K |
| P37 / 12 | Etkinlik takvimi ve sezon | Başlangıç/bitiş, hak, katılım, süre sonu ödülü; gerçek zaman, ücretli yükselme koşullarıyla uyum; S10 | E |
| P38 / 12 | Çevrim dışı eğitim | Geçen süre üst sınırı, gerçek sunucu saati, güvenli tek ödül, sahte diğer oyuncu yok; S03,S12 | E |
| P39 / 12 | Ödül geçmişi, boss ganimet günlüğü | Kaynak, eşya, zaman, ödül kimliği, alınma durumu; 150/S11 | K |
| P40 / 13 | İlahi silah dört parça | Gerçek ana görev/boss malzemesi, farklı parça ve beceri; 001/S01 | K |
| P41 / 13 | Meridyen ve yetenek noktası | Boss özü, düğüm bağımlılığı, özel nitelik ve gerçek savaş etkisi; S01 | K |
| P42 / 13 | Savaş ruhları ve ileri ruh ekipmanı | Ayrı ruh çeşitleri, kaynak, set, yıldız, özel etki; S01 | K |
| P43 / 13 | Gizli silah ve ilahi enstrüman | Ayrı ekran/edinim/kapasite/beceri; S01 | E |
| P44 / 13 | İç zırh, canavar ekipmanı, antik hazine | Sahiplik ile tüketim ayrımı, kazanım, füzyon, kademe ve bonus; 001/S01 | E |
| P45 / 13 | Dönüşüm biçimi/beceri/set | Ayrı kazanım ve kaynak, süre/etki/geri dönüş; S01 | E |
| P46 / 13 | Dokuz terfiye kadar sınıf gelişimi | Her terfi özgün görev ve seviye, yetenek değişimi; S01 | K |
| P47 / 13 | 500 normal + 100 peri | XP eğrisi, bölge/görev ve zorluk uyumu; tavan geçişi ve 100 peri seviyesi gerçek kazanım; S06 | K |
| P48 / 14 | Sunucu hesap/karakter otoritesi | Yetkilendirme, sunucu kimliği, sahiplik, sürüm kontrolü, kayıp bağlantı; S12–13 | E |
| P49 / 14 | Arkadaş, sohbet, posta, takım | Gerçek istek/kabul, engelleme/raporlama, sunucu mesajı, ortak oyun; S09,S13 | E |
| P50 / 14 | Lonca | Üye/rol/yetki, bağış, lonca görevleri, boss ve savaş, takım ödülü; S09,S11 | E |
| P51 / 14 | Pazar ve müzayede | Sahiplik, ilan/iptal/satış, emanet, tek işlem, denetim kaydı; S01,S09,S12 | E |
| P52 / 14 | Çapraz sunucu ve sıralamalar | Gerçek shard/grup, dönem kapanış, sunucu sonucu ve ödül; S01,S13 | E |
| P53 / 14 | Sunucu ekonomi defteri | Ödül/işlem kimliği, idempotency, atomik görev/envanter, kaynak kontrolü, eşzamanlılık ve hile engeli; S11,S12 | E |
| P54 / 14 | Sunucu savaş otoritesi | İstemci komut gönderir; sunucu menzil, hasar, cooldown ve ödül hesaplar; yeniden bağlanma ve tekrar gönderim; S13 | E |
| P55 / 15 | Operasyon ve QA | FPS/bellek/ısı, gerçek Android, yük testi, yedek/kurtarma, kayıt göçü, hata/ekonomi izleme; S12,S13 | E |
| P56 / 04,15 | Gerçek ses ve dil | Müzik/efekt ayrı kontrol, çeviri/taşma, gerçek kullanıcı tercihi; 154 | E |

## Uygulama yönü
08 mevcut ekipman ve ekonomi düzeninin hikâyeye bağlanması ve güvenliği ile sürer. 09–14 her sistemin kendi gerçek mekanikleri, açılışı, hikâyesi ve kaynakları birlikte tamamlanır; P03/P04/P47 tüm sıraların bağımlılığı olarak sürekli büyütülür. 500/100'e ulaşıldığı gerçek ilerleme ile kanıtlanmadan hikâye tamamlandı sayılmaz. Sunucu bağımlı modüllerde veri sözleşmesi ve testleri geliştirme sırasında oluşturulur; gerçek bağlantı, yetki ve sunucu testleri olmadan çevrim içi kabul verilmez. Genel test sayısı, tamamlanan içerik yüzdesinin yerine geçmez.

## 3.200–3.201 bu çalışmanın gerçek değişikliği
- 3.200 42 açık başlangıç yuvası her iki alanda; 84/72 toplam, altışar artış. Çanta görev/seviye: 3/3,8/5,16/12,22/16,28/20,40/30,46/36; depo: 4/3,10/8,22/16,34/25,40/30. Önceki sıralı teslim ödül anahtarları da gerekir. Bu özgün eşikler deneme kararıdır. Fazla eski eşya korunur, dolu çantaya yeni uygun ekipman ödül postasına gider. 25/25 kontrollü.
- 3.201 mevcut 46 görevi yedi bölüme bağlayan yeni başlangıç/bitiş anlatıları, mevcut açılma yolunda 54 gerçek hedef ve mevcut koşullar, 12 pasif kitap/yazma, yerel dünya bossu ve çevrim içi ayrımı. Hikâye sonu yalnız mevcut 46 görevin sonudur. Yeni 500 seviyelik bölüm içeriği yok. 41/41 toplam kontrollü test (25 önceki kapasite + 16 hikâye/yol). 29 script syntax, 227 raster birebir, ZIP CRC. Testler taklit depolama, kontrollü ileri durum, kısmi gerçek raster; fiziksel Android/uzun doğal denge değil. shared/inventory-progression.cjs ve shared/story.cjs sunucuya taşınabilecek yerel kurallar; sunucu henüz çalıştırılmadı.
- 08 açık. Ana index.html GitHub'da değiştirilmedi. ZIP yerelde. Fiziksel doğrulama sona bırakılır.
