# Kırık Mühür — Ana düzen ve işlev kontrol listesi
Yetkili temel: [Kullanıcının kesin şartnamesi](KIRIK_MUHUR_KULLANICI_KESIN_SARTNAME.md). Kung Fu Saga referans, sanat ve isimler özgün. Sabit dikey. ZIP sınırı yok; Android performansı şart. Her satırda görsel, işlev, kilit, geçiş, kayıt ve dokunmatik kontrol yapılır. [x] yalnız doğrulanmış alt kontrol, [ ] açık; cihaz ve görsel kabul tamamlanmadan sistem tamamlandı sayılmaz. Ana index.html korunur.

| Sıra | Ekran | Görsel / işlev kabulü | Durum |
|---|---|---|---|
| 1 | Açılış/kayıt | Logo, kahraman, yeni/devam, bozuk kayıt, gerçek yeniden açılış | Kısmi: 3.115, 18/18 simüle kayıt |
| 2 | Karakter | Büyük tematik önizleme, sınıf, cinsiyet, ad, ileri/geri, taslak, görünüm | Kısmi: 3.116, 24/24; 6 model, 8 yön, 3 ekran; saç özelleştirme ve sanat açık |
| 3 | Eğitim | Ekranı örtmeyen aşamalı öğretici; hareket, NPC, otomatik görev, gerçek saldırı, teslim ve ödül | Kısmi: 3.117, 15/15 Chromium; ilk NPC rotası, manuel kesinti/devam, ilk saldırı ve tek ödülle görev teslimi doğrulandı; gerçek dokunmatik ve kalıcı kayıt açık |
| 4 | Ana HUD | Üst sol profil/seviye/güç/VIP; üst kaynaklar; üst sağ bölge/koordinat/mini harita; sol orta görev; orta savaş; alt beceri, ayrı hareket ve çiçek menüsü; çakışma yok | Kısmi |
| 5 | Görev/NPC/ödül | Ana/yan görev, kabul→yol→savaş/toplama→NPC→otomatik tek ödül→sonraki görev; manuel kesinti/devam | Kısmi |
| 6 | Savaş/hareket | Joystick, basılı saldırı, beceri bekleme, isabet, ölüm, yeniden doğma, otomatik/manüel geçiş | Kısmi |
| 7 | Menü/kilitler | Kalabalık ikonlar, çiçek hızlı menüsü (joystick değil), açılır/kapanır, geri, gerçek kilit şartı, sistem açılışı | Kısmi |
| 8 | Karakter/çanta/ekipman/demirci | İstatistik, slot, nadirlik, karşılaştırma, kuşan/çıkar, yükselt, parçala, depo, maliyet, güç etkisi | Kısmi |
| 9 | Pet/binek/gelişim | Önizleme, açılma, çağır/geri al, yükseltme, pasif etki, savaşta binek | Kısmi |
| 10 | Dünya/şehir/NPC | Şehir hub, harita/geçit, özgün dekor, NPC/hedef işareti, rota, çarpışma, kayıt, dönüş | Kısmi |
| 11 | Boss/zindan/kule | Ayrı seçim, boss/kat/ödül/sayaç, hak/bilet, süre, yeniden doğma, kat, sonuç, tek ödül, dönüş | Kısmi; dünya bossu yerel |
| 12 | Günlük/süreli etkinlik | Takvim, geri sayım, hak, saat dilimi, çevrim dışı süre, ödül | Eksik |
| 13 | Sosyal/çevrim içi | Gerçek hesap, arkadaş, sohbet, takım, lonca, PvP, market, eşleşme, kopma, sunucu yetkisi | Eksik; sahte online yok |
| 14 | Teknik/görsel QA | Dikey APK, 320×568 / 360×800 / 393×873 ve şartnamedeki diğer cihaz boyutları; fiziksel Android FPS/bellek/ısınma, kalıcı kayıt, kalite ve sürüm yedeği | Açık |

## Sürüm ilerlemesi
- [x] 3.115: dört açılış durumu, kayıt uyarısı, onaysız üzerine yazmayı önleme (tarayıcı simülasyonu).
- [x] 3.116: önizleme 300×350, 6 model, 8 yön, isim ve taslak, 24 tarayıcı kontrolü (önceki yerel rapor).
- [ ] Açılış ve karakter sanat kalitesi, gerçek Android/kalıcı kayıt kabulü.
- [x] 3.117: ilk NPC’ye gerçek rota, yakında otomatik görev kabulü, manuel kesinti ve yeniden başlatma, ilk gerçek hasar, ilk görevin teslimi ve tek ödül; 15/15 Chromium kontrolü. Hızlandırılmış oyun tick ve simüle localStorage kullanıldı. Eski kayıtlar zorla eğitime alınmaz.
- [ ] 3.117 görsel açık: NPC konuşma balonu sağ menünün arkasına taşıyor; sol görev paneli ve HUD yerleşimi ana ekran aşamasında denetlenecek.
- [ ] Sıradaki: 4. ana HUD; profil, kaynaklar, görev, bölge bilgisi, sağ menü, hareket/beceri ve çiçek menüsü.
- [ ] Oyun HTML/ZIP sürüm yedeği GitHub'da doğrulanacak.

Her ilerlemede bu dosya güncellenir; kanıt türü belirtilir.

## 3.118 — Kung Fu Saga referans denetimi (yeniden çalışma)
Kaynaklar: [BlueStacks başlangıç rehberi](https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-beginner-guide-en.html), [sınıf ekranı](https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-classes-guide-en.html), [MuMu oyun içi ekran](https://www.mumuplayer.com/blog/avatars-saga-beginner-guide.html), [çanta ekranı](https://www.malavida.com/en/soft/avatars-saga/android/). Bunlar farklı sürümlere ait; kesin açılma seviyeleri ve giriş ekranı sırası bütünüyle doğrulanmadı.
- [ ] Açılış: özgün tematik görsel, kayıtlı karakter seçimi; çoklu karakter kayıt mimarisi gerekiyorsa ayrı karar ve güvenli geçiş. Gerçek hesap/sunucu yok.
- [ ] Karakter: referansta sol sınıf ikonları, sağ cinsiyet, merkez büyük model, sahne arka planı, alt ilerleme. Bizde hâlâ kart/panel hissi ve üç sınıf; 3.118'de cinsiyet aynı seçim adımında da gösteriliyor. Sanat kabulü açık.
- [ ] Ana HUD: üst sol karakter adı/seviye/güç/HP; üst kaynaklar; sağ konum; sol görev listesi, açılır başlık; sağ içerik erişimi; alt beceri ve sohbet/günlük, bağımsız hareket kontrolü ve çiçek menüsü. Premium/VIP/sosyal öğeler gerçek altyapı olmadan sahte gösterilmez.
- [ ] İlk görevde erişim kısayolları: boss/kule tekrarını kaldır, zindan merkezine yönlendir; ilk görev sonrası erişim Kırık Mühür'e özgü geçici tasarım, referansın doğrulanmış seviyesi değil.
- [ ] NPC konuşması: sabit okunabilir şerit, HUD çakışması yok; görev satırı tek dokunuş→rota→savaş→teslim→otomatik tek ödül. Daraltma görevi başlatmamalı.
- [ ] Çanta/karakter: merkezi model, iki yanında donanım yuvaları, alt eşya ızgarası, kategori sekmeleri, gerçek tak/çıkar ve güç değişimi; görünüş kontrolü.
- [ ] Demirci/beceri/pet/binek: gerçek maliyet, seviye, önizleme, kilit, iyileştirme ve kayıt; alt gelişim menüsünden erişim.
- [ ] Sağ içerik: lonca, günlük etkinlik ve zindan ayrı gerçek ekranlar; sunucu/etkinlik motoru olmadan boş düğme yok. Zindan içinde boss üst bilgisi, sayaç, sol hedef/ödül ve çıkış.
- [ ] Kamera, dekor ve karakter ölçeği: savaş sahnesi ortada, 2.5D derinlik, 320×568 / 360×800 / 393×873 / 412×915 taşma, gerçek Android FPS.
- [x] 3.118 test HTML: 201 gömülü görsel birebir korundu, JS sözdizimi ve ZIP bütünlüğü doğrulandı. Son revizyonda 22/22 Chromium kontrolü geçti: sınıf+cinsiyet aynı ekran, görev daraltma/açma, hareket çubuğu görünürlüğü, ilk NPC rotası ve klavye ile manuel kesinti, ilk gerçek hasar ve tek ödül, zindan erişimi, eski kayıt uyumu. Simüle depolama ve hızlandırılmış oyun tick. 360×800 ekran görüntülerinde sınıf sol/cinsiyet sağ; hareket ve oto savaş tuşu ayrı; NPC şeridi ve toast çakışması giderildi. Diğer ekran boyutları, gerçek joystick dokunma testi, görsel kalite, koordinat ve gerçek Android açık. Oyun dosyası yerelde; GitHub'a sadece liste yazıldı.


## 3.119 — Ana HUD düzeni ve dokunma denetimi
- [x] Üst profil ve gerçek HP/MP/güç bilgileri, ayrı kaynak alanı; harita büyütüldü, bölge adı ve gerçek dünya X/Y koordinatları ayrı satıra alındı.
- [x] Mini harita gerçek NPC konumlarını ve ilk görev/teslim hedefini gösteriyor.
- [x] Görev panelinin daraltılması, küçük ekran kaydırma alanı ve başlık tıklamasının görev başlatmaması.
- [x] Hareket çubuğu bırakma, pointer capture kaybı ve arka plana geçişte sıfırlama kodu; Chromium CDP dokunma başlangıcı/bitişi ile hareket ve sıfırlama doğrulandı.
- [x] Çiçek menüsü temel → ek araçlar → gizli → temel; harita açma/kapatma.
- [x] 34/34 Chromium kontrolü; 320×568, 360×800, 393×873, 412×915 geometri testleri, ilk NPC rotası, manuel kesinti, ilk hasar, tek ödül ve eski kayıt regresyonu. JS hata yok; 201 gömülü görsel birebir, ZIP bütünlüğü doğrulandı. Depolama simüle, görev zamanı hızlandırılmış; fiziksel Android testi değil.
- [ ] Görsel açık: 320×568 ekranında görev paneli karakter kenarını kısmen örtebiliyor; ikonların hedef sanat kalitesi ve küçük dokunma hedefleri açık. Zindan HUD'ı ayrıca görsel ve işlevsel regresyon testine alınmalı.
- [ ] Sıradaki: küçük ekran görev paneli/karakter çakışması, alt ikon erişimi ve ana HUD kabulü; ardından görev/menü ekranları. Gerçek Android ve kalıcı kayıt bekliyor. HTML/ZIP yerel, GitHub'a sadece takip listesi yazıldı.


## 3.120 — Küçük ekran, karakter görünürlüğü ve alt menü erişimi
- [x] Ana dünyada kamera odağı ekran genişliğine göre sağa alındı; zindan kamerası, savaş ve görev değerleri korunuyor. Görev paneli küçük ekranda 115px ile sınırlandı.
- [x] Yedi alt ikonun sıkışması giderildi: çiçek menüsü temel araçlar (karakter/çanta/beceri/görev) → gelişim (demirci/yoldaş/ayarlar) → ek araçlar → gizli. Mevcut düğme kimlikleri ve olay bağları korundu. Alt menüde 46×46 CSS piksel hedef boyutu.
- [x] 46/46 Chromium kontrolü; dört dikey boyutta (320×568, 360×800, 393×873, 412×915) başlangıç karakteri/görev paneli ayrımı ve temel ikon boyutları; çiçek geçişleri, gelişim ikonlarının görünürlüğü, dokunma simülasyonunda joystick hareketi ve bırakma, mini harita, ilk görev ve tek ödül regresyonu. JavaScript hatası yok.
- [x] Ekran görüntülerinde 320×568 başlangıç sahnesinde karakter-panel çakışması giderildi; 360×800 gelişim sayfası kontrol edildi. 201 gömülü görsel birebir; JS sözdizimi ve ZIP bütünlüğü doğrulandı.
- [ ] Açık: harita kenarlarında ve tüm savaş/kalabalık sahnelerinde karakter görünürlüğü; gelişim/ek araçların tüm işlevleri ve zindan HUD regresyonu; gerçek cihaz FPS, kalıcı kayıt (testte simüle depolama ve hızlandırılmış tick), hedef sanat kalitesi. Ana HUD nihai kabulü verilmedi.
- [ ] Sıradaki: ana HUD harita kenarı ve zindan regresyonu, ardından görev/menü ekranlarının gerçek işlevsel ve görsel denetimi. HTML/ZIP yerel; GitHub'a takip listesi yazıldı, ana index.html değiştirilmedi.


## 3.121 — HUD kenar ve menü regresyonu
- [x] Görev kutusu normalde solda; karakterle çakışınca 100 ms aralıkla güvenli konuma geçer, karakter uzaklaşınca asıl konuma döner. Dokunma sürerken konumu değiştirmez. Harita/kamera sınırları değiştirilmedi.
- [x] Menü açılışında basılı saldırı, hareket tuşları ve joystick sıfırlanır. Harita paneli biçiminin diğer menülere taşınması giderildi.
- [x] 39/39 Chromium kontrolü: dört dikey boyutta kontrollü sol kenar konumu ve geri dönüş; karakter→çanta, beceri, görev, demirci, yoldaş, ayarlar, çiçek menüsü; zindan merkezi→kule→geri→boss, giriş, sayaç, boss HUD, ana dünyaya dönüş. JS hata yok.
- [x] 201 gömülü görsel birebir; JS sözdizimi ve ZIP bütünlüğü doğrulandı. 320×568 kenar ve 360×800 zindan ekran görüntüleri incelendi.
- [ ] Açık: karakter adı uç sol kenarda kesilebiliyor; zindan başlangıç bildirimi boss başını kısmen örtüyor; kalabalık sahneler ve bütün harita kenarları doğrulanmadı. Menülerin açılması içeriklerinin eksiksiz çalıştığı anlamına gelmez. Depolama simüle; fiziksel Android, kalıcı kayıt, sanat kabulü açık.
- [ ] Sıradaki: karakter/isim görünürlüğü ve zindan bildirim alanı; ardından görev ve sistem ekranlarının görsel+işlevsel kabulü. HTML/ZIP yerelde, GitHub'a liste yazıldı; ana index.html korunuyor.


## 3.122 — Erken/orta/ileri seviye mimarisi (öncelik değişikliği)
Kullanıcı talebi: yalnız HUD ve boss yamaları değil, Kung Fu Saga'nın bütün gelişim döngüsü ve ekran düzeni. Ana şartname korunur. Referansın isimleri/görselleri kopyalanmaz. ZIP sınırı yok; gerçek Android performansı şart.
Kaynaklar: [resmi sürüm geçmişi](https://apps.apple.com/tr/app/kung-fu-saga-martial-path/id1660688865), [başlangıç ve sınıf/güç rehberi](https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-beginner-guide-en.html), [kule/kader/demirci gözlemi](https://medium.com/@anonnftgroup/kung-fu-saga-beginner-guide-part-3-first-skytower-fate-chest-and-the-forge-80b5d3f8a05a), [hikâye/kanat/günlük görev gözlemi](https://medium.com/@anonnftgroup/part-4-of-the-kung-fu-saga-beginner-series-2fe77ab0b97a). Kaynaklar farklı sürümler; rehberde ikinci sınıf Sv60 + ön görev olarak geçer, ilk kule 43–46 aralığında gözlemlenmiştir; kanat 46–55 aralığında hikâye ödülü. Bunlar bizim oyunun kesin eşikleri DEĞİL. İleri seviye gerçek ekranların tamamı ve kesin saat/hak değerleri henüz doğrudan görülmedi.

### Sabit ekran mimarisi ve içerik bağımlılıkları
| Grup | Görsel yerleşim ve fonksiyon | Durum |
|---|---|---|
| Giriş | Açılış, hesap/sunucu seçimi (sunucu kurulunca), kayıtlı kahraman, sınıf/cinsiyet/ad, büyük model, geri/ileri | Kısmi |
| Erken dünya | Üst profil/kaynak/harita, solda ana+yan görev, sağda açılan içerikler, alt gelişim/çiçek, ayrı joystick, beceri, sohbet/günlük | Kısmi |
| Sistem açılışı | Hikâye/level/ön koşul, açılma bildirimi, öğretici, gerçek menü, ilk kullanım ve kayıt; tüm erişim yollarında ortak koşul | Kısmi; 3.122 merkez başlangıcı |
| Karakter | Model ortada, istatistik, güç değişimi, sınıf becerileri, ilerleme, ikinci sınıf ve sınıf terfileri | Temel kısmi; ileri eksik |
| Beceri | Aktif/pasif sekmeler, seviye, maliyet, bekleme, gerçek hasar, yetenek puanı ağacı ve sıfırlama kuralları | Temel kısmi; ileri eksik |
| Çanta/ekipman | Model ve iki yan slot, eşya ızgarası, filtre, kuşan/karşılaştır, depo; nadirlik, yıldız, set, mücevher, birleştirme, parçalama | Temel kısmi; ileri eksik |
| Demirci | Eşya seçimi, önce/sonra istatistik, altın/malzeme, dereceye bağlı tavan, güvenli yükseltme ve kayıt | Kısmi |
| Yoldaş/binek | Model, açılma görevi, toplama, çağırma, gelişim, evrim, pasif etki, pet ekipmanı ve parçalama | Temel kısmi; ileri eksik |
| Kader | Kule ödülü, kader sandığı, yuvalar, taş güçlendirme, açılan yuva, istatistik etkisi | Eksik |
| Kanat/ilahi donanım | Hikâyeden açılma, görünüm, seviye, kaynak, pasif güç; ilahi silah, gizli silah, enstrüman | Eksik |
| İleri ruh sistemi | Ruh ekipmanı, ruh geliştirme, akupunktur/meridyen (boss Anima kaynağı), özel nitelikler, savaş ruhları, ilahi yaratıklar | Eksik |
| Dönüşüm | Dönüşüm, özel beceri ve set, ayrı geliştirme kaynakları | Eksik |
| İçerik | Boss bireysel/elit/dünya, katmanlı kule, hikâye zindanı, günlük deneyim dalgaları, ekipman/set zindanı, katmanlı uçurum, kesintisiz mücadele, ilk zafer ve sandık | Temel boss/kule kısmi; ileri eksik |
| Zaman ve ödül | Günlük av, etkinlik takvimi, hak/bilet/yeniden doğma, çevrim dışı eğitim, giriş ödülleri, posta, başarı, unvan, ödül merkezi | Kısmi/eksik |
| Ekonomi | Gerçek altın/malzeme, dükkan, kazanılabilir kaynak, alış/satış/maliyet; premium/VIP ve ödeme ayrı kullanıcı kararı, sahte bakiye yok | Kısmi |
| Sosyal/son oyun | Gerçek sunucu hesapları, sohbet, arkadaş, takım, lonca, lonca bossu, arena, sıralama, pazar/müzayede, sunucular arası savaş ve zindan | Eksik; sunucu gerekir |
| Kabul | Ekran başına akış, tüm düğme ve maliyetler, kayıt, görsel ve fiziksel Android denetimi | Açık |

### 3.122 uygulama ve test
- [x] Sağ tarafta Gelişim düğmesi, mevcut gerçek ekranlara giden beş gruplu merkez: Kahraman, Ekipman, Yoldaşlar, Mücadele, Hikâye/keşif. 11 giriş; gerçek seviye, güç, hikâye sayısı. İlk görev sonrasında mevcut içerik rayı açılır; pet 4. görev ve binek 8. görev mevcut bayraklarına bağlı, kule 10. görev şartına bağlı. Yeni denge eşiği uydurulmadı.
- [x] 35/35 Chromium kontrolü: ilk dünya, erken kilitli pet/binek/kule, 8 mevcut hedef ekranına gerçek tıklama, dönüş, ileri durum simülasyonunda açılma, kule ve yoldaş ekranı, 4 dikey geometri (320×568,360×800,393×873,412×915), JS hatası yok. İleri seviye durum testte doğrudan ayarlandı; doğal hikâye ilerlemesi veya gerçek cihaz testi değildir. 201 gömülü görsel birebir, JS sözdizimi ve ZIP bütünlüğü geçti.
- [x] 360×800 erken/ileri ekran görüntüleri görsel olarak incelendi; taşma görülmedi.
- [ ] Açık: merkez uzun ve sade, gelişim ekranlarının içerik ve sanat kalitesi hedefte değil. Ortak açılma kuralını tüm mevcut kısayollara uygulamak, açılma bildirimi ve gerçek doğal ilerleme testleri, ileri sistemlerin kendisi, fiziksel Android/kalıcı kayıt. Önceki 3.121 isim ve bildirim hataları açık. HTML/ZIP yerel; GitHub'a kontrol listesi yazıldı.
- [ ] Sıradaki: ortak sistem açılış motoru ve kategori düzeni, ilk açılma öğreticisi/gerçek hikâye testi; ardından mevcut karakter/ekipman/demirci ekranlarını hedef yerleşimde tamamlama ve ileri sistemleri bağımlılık sırasıyla kurma. Ana index.html değiştirilmez.


## 3.123 — Tüm planlanan sistemlerin menüye eklenmesi
Kullanıcı kararı: çevrim içi içerikler de şimdi görünür olsun, internet/sunucu altyapısı hazır olunca çalıştırılsın. İnternet bağlantısı tek başına aktivasyon değildir; gerçek sunucu ve doğrulanmış uygulama gerekir.
- [x] Gelişim merkezinde üç kategori: Mevcut (11 gerçek giriş), İleri seviye (29 planlanan yerel sistem), Çevrim içi (16 sunucu gerektiren sistem). Toplam 56 giriş.
- [x] İleri seviye: ikinci sınıf/terfi, yetenek ağacı, kader, unvan, dönüşüm, mücevher, set, üretim, kanat, ilahi ve gizli silah, enstrüman, ruh, meridyen, savaş ruhu, ilahi yaratık, pet ve binek evrimi, hikâye/deneyim/ekipman/kaynak zindanları, uçurum, kesintisiz mücadele, günlük görev, takvim, çevrim dışı eğitim, ödül merkezi, dükkan.
- [x] Çevrim içi: hesap/sunucu, arkadaş, sohbet, posta, takım, lonca, lonca bossu ve savaşı, PvP, sıralama, ortak dünya bossu, takım zindanı, sunucular arası zindan ve savaş, pazar/müzayede, premium/VIP (ayrı onay gerektirir).
- [x] 45 yeni giriş açıklama ekranına açılır; gerçek mekanik yokken kaynak, ödül, oyuncu, sohbet veya bağlantı taklit edilmez. Mevcut 11 giriş ve mevcut hikâye şartları korunur.
- [x] 46/46 Chromium kontrolü; 4 dikey boyutta menü yatay geometri ve dokunma hedefi, mevcut girişler, kilitler, kategori/geri dönüş, örnek planlanan kader/lonca ekranı ve kaynakların değişmemesi. 201 gömülü görsel birebir, JS sözdizimi ve ZIP bütünlüğü geçti. Testte simüle depolama ve doğrudan ayarlanmış ileri hikâye durumu kullanıldı.
- [ ] Görsel kalite ve uzun kaydırmalı katalog düzeni iyileştirilmeli. 45 yeni giriş yalnızca menü/ayrıntı kabuğu; asıl mekanikler, ortak açılma motoru, gerçek sunucu protokolü ve Android testleri açık. HTML/ZIP yerel; GitHub'a liste yazıldı, ana index.html değiştirilmedi.
- [ ] Sıradaki: ortak açılma koşulları ve gerçek karakter/ekipman ekranları; çevrim içi işlevler sunucu kurulduktan sonra tek tek doğrulanıp etkinleştirilecek.


## 3.124–3.125 — Kategorili menüler ve tam otomatik oyun
Kullanıcı kesin kararı: joystick, yön tuşları ve sahaya sürükleyerek hareket yok. Tam otomatik oyun; oyuncu hedef, içerik, ekipman ve gelişim seçer. Kung Fu Saga yanında farklı dikey RPG'ler de referans, özgün tasarım şart. Ayrıntılı referanslar: [Immortal Hero](https://www.taptap.io/jp/app/231222), [Journey of Monarch](https://about.ncsoft.com/en/news/article/journey_update2_241205). Bu kaynaklar otomatik savaş ve gelişim ilkelerini destekler; tüm gerçek ekran dizilimleri doğrulanmadı.
- [x] 57 sistem kimliğinin her biri tam bir kategoriye ait: kahraman, ekipman, gelişim, boss, zindan, arena, etkinlik, sosyal, lonca, pazar, hesap, görev. Sağda Boss/Zindan/Arena/Etkinlik. Mevcut 11 gerçek giriş korunuyor; Solo Arena yeni planlanan giriş. Çevrim içi olanlar sunucu gerektirir. 46 planlanan giriş mekanikleri tamamlanmadı.
- [x] Boss ve zindan seçim ekranları, kategorilerine dönüş, Solo Arena ve PvP ayrımı; gizlenen eski Boss düğmesi düzeltildi.
- [x] Joystick DOM'u, yön tuşları, saha sürükleme ve manuel saldırı/beceri tuşları kaldırıldı veya devre dışı bırakıldı. Çiçek menüsü bağımsız. Otomatik ilk NPC rotası, görev, tek ödül, yeni görev, seçilmiş yan görev, boss saldırısı/şifa/kaçınma uygulandı. Ücretli veya biletli içerik girişi otomatik başlamaz.
- [x] Son 3.125 Chromium testi 24/24: ilk görev otomatik kabul/teslim/tek ödül, sonraki göreve geçiş, 57 benzersiz menü sahipliği, dört sağ düğme, Boss/Zindan/Arena geçişleri, boss otomatik gerçek hasarı ve dairesel tehlike alanından kaçınma, ana dünyaya dönüş, Fener Yağı yan görevi otomatik toplama/teslim; JS hatası yok. Boss canı kontrollü testte 10000'e çıkarıldı; hızlandırılmış tick, simüle kayıt ve doğrudan ayarlanmış ileri hikâye seviyesi kullanıldı. 201 görsel birebir, JS sözdizimi ve ZIP bütünlüğü geçti.
- [ ] Görsel denetim 360×800: joystick ve manuel saldırı kontrolleri yok; seviye atlama yazısı menüye ve savaş üst bilgisine taşabiliyor. Görev kutusu tehlike alanını kısmen örtüyor. Özgün kart/ikon tasarımı, farklı referansların gerçek ekran bazlı incelemesi ve diğer cihaz boyutları açık.
- [ ] İleri görevler, av yan görevleri, üç boss tehlike biçimi ve tüm sınıflarda otomatik savaş, otomatik rotanın kalıcı kayıttan devamı, fiziksel Android ve çevrim içi sistemler doğrulanacak. Seçilen yan görev oturum durumu kayıttan geri yüklenmiyor. HTML/ZIP yerelde; GitHub'a şartname ve takip listesi yazıldı, ana index.html değişmedi.
- [ ] Sıradaki: özgün kategorili ekranların gerçek görsel tasarımı, boss/zindan/arena giriş ve sonuç şablonları, otomatik savaşın tam regresyonu.


## 3.126 — Ayrı mücadele ekranları
- [x] Boss kategorisinde Bireysel/Elit/Yerel Dünya ayrı portreli seçim kartları; gerçek model, seviye, süre, günlük hak veya yeniden doğma, altın/toz önizlemesi. Ortak bosslar ayrı sekme. Boss seçimi bilet tüketmez; gerçek mücadele düğmesi mevcut motoru çağırır. Ayrıntıdan doğru kategoriye dönüş.
- [x] Zindan kategorisinde tek oyuncu, kule/dalga ve takım sekmeleri; iki sütunlu içerik kartları, gerçek kule girişine bağlantı, kilitli/planlanan içerikte kapalı giriş ve açıklama.
- [x] Arena kategorisinde Solo, PvP ve Sıralama ayrı sekmeler; tek seçenek varsa geniş tek kart, tekrarlı kart yok. Solo Arena henüz oynanabilir değil; PvP ve sıralama gerçek sunucu gerektirir.
- [x] Son dosyada 35/35 Chromium kontrolü (dört dikey boyutta üç menü yatay taşma ve düğme genişliği; 57 benzersiz kategori kimliği; üç boss seçimi ve geri dönüşü; kule dönüşü, çevrim içi giriş engeli, arena sekmeleri; gerçek boss giriş/otomatik hasar/ana dünyaya dönüş). JS hatası yok. 202 gömülü data:image eşleşmesi önceki sürümle birebir; JS sözdizimi ve ZIP bütünlüğü doğrulandı. Depolama simüle, ileri hikâye durumu ve boss canı kontrollü ayarlandı, tick hızlandırıldı.
- [x] 360×800 Boss, Zindan ve Arena ekran görüntüleri incelendi; Solo Arena kart tekrarı ve boş yarım sütun giderildi.
- [ ] Açık: özgün içerik resimleri ve ikon sanatı; etkinlik ve gelişim ekranlarına ayrı tasarım; Solo Arena ve diğer zindan mekanikleri; sonuç ekranı kalitesi; gerçek Android ve kalıcı kayıt. HTML/ZIP yerelde; GitHub'a yalnız kontrol listesi yazıldı. Ana index.html değiştirilmedi.
- [ ] Sıradaki: etkinlik ekranı ve karakter/ekipman/gelişim kategorilerine özgü düzen, gerçek fonksiyonlar ve geri dönüşler. Önceki otomatik savaş açıkları korunur.


## 3.127 — Kahraman, ekipman, gelişim ve etkinlik ekranları
- [x] Kahraman: mevcut model önizlemesi ve gerçek güç, saldırı, savunma, can, mana; sınıf ve beceri/kader sekmeleri.
- [x] Ekipman: altı gerçek yuvanın doluluk durumu, mevcut model, altın/toz/çanta kapasitesi; gerçek çanta ve demirci ekranına giriş ve kategoriye dönüş.
- [x] Gelişim: mevcut hikâye/seviye/güç, gelişim yolu ve ayrı yoldaş sekmesi; mevcut pet kilidinin korunması.
- [x] Etkinlik: gerçek bireysel boss bilet sayısı, günlük hak durumu ve saniyelik Türkiye saati 00.00 yenilenme sayacı; boss menüsüne bağlantı. Günlük av, takvim, çevrim dışı eğitim ve ödül merkezi henüz işlevsel değil; ödül/saat uydurulmuyor.
- [x] Binek açılınca artık geçersiz olan manuel yukarı kaydırma eğitimini başlatmama.
- [x] 41/41 Chromium kontrolü: 57 benzersiz kategori sahipliği, dört yeni menü, mevcut karakter/beceri/çanta/demirci/pet girişleri ve kategori dönüşleri, kilitli pet ve takvim engeli, gerçek bilet ve canlı sayaç, boss menüsü, 320×568 / 360×800 / 393×873 / 412×915 yatay geometri ve düğme genişliği, joystick yokluğu, eski kaydırma öğreticisinin kaldırılması. JavaScript hatası yok. 202 gömülü görsel eşleşmesi birebir; JS sözdizimi ve ZIP bütünlüğü geçti. Testte ileri hikâye durumu doğrudan ayarlandı ve depolama simüle edildi.
- [x] Dört 360×800 menü ekran görüntüsü görsel olarak incelendi.
- [ ] Açık: karakter önizlemesi küçük, mevcut çanta/karakter ekranına fazladan giriş adımı var. Özgün sanat/ikonlar, tam ekran içeriği, gerçek ekipman ve beceri değişikliklerinin regresyonu, etkinlik motoru, diğer ileri sistemler, doğal hikâye ve Android/kalıcı kayıt testleri. HTML/ZIP yerel; GitHub'a liste yazıldı, ana index.html değişmedi.
- [ ] Sıradaki: karakter ve çanta ekranlarında gereksiz ara menüleri kaldırıp doğrudan gerçek işlemleri özgün ekranlara bağlama; gelişim ve etkinlik mekaniklerini sırasıyla geliştirme.


## 3.128 — Doğrudan işlevsel karakter, çanta, demirci ve beceri
- [x] Kahraman ekranındaki tekrarlı karakter girişi kaldırıldı; büyük model, altı gerçek istatistik, ekipman ve beceri bağlantıları. Görsel denetim sonrası istatistikler 3 sütun × 2 sıra.
- [x] Ekipman kategorisi doğrudan mevcut gerçek çanta/altı yuva ve depo motorunu açıyor. Demirci sekmesi doğrudan yükseltme motoruna bağlı; kategori sekmeleri eşya işlemleri sonrası korunuyor. İleri donanım kategorisi ve planlanan mücevher/set/üretim erişimleri korunuyor.
- [x] Eşya ayrıntısında mevcut ekipmana göre saldırı/savunma farkı ve kuşanma koşulu; sınıf/seviye engeli gerçek kuralı kullanıyor. Kuşanılmış eşya ve mevcut yuva yükseltmesi korunuyor.
- [x] Beceri sekmesi doğrudan gerçek yükseltme ve otomatik kullanım önceliğini açıyor. Manuel kullan düğmesi kaldırıldı (tam otomatik oyun şartı). İleri yetenek ağacı henüz mekanik değil.
- [x] Son HTML 43/43 Chromium kontrolü: 57 benzersiz kategori, kahraman/çanta/demirci/beceri, kuşan/çıkar ve istatistik, depo aktar ve geri al, maliyetli yuva ve beceri yükseltmesi, otomatik öncelik, kilitli mücevher, geri dönüş ve dört dikey boyutta yatay geometri. İlk testte yükseltme ile yan görev ödülü aynı anda tetiklendi; kontrollü maliyet testinde yan ödüller önceden alınmış olarak işaretlendi ve fark doğru çıktı. Son test 43/43, JS hatası yok. Test ekipmanı/para/ileri hikâye doğrudan ayarlandı, depolama simüle. 202 gömülü görsel birebir, JS sözdizimi ve ZIP bütünlüğü geçti.
- [x] 360×800 kahraman, çanta, karşılaştırma, beceri ve demirci ekran görüntüleri alındı; kahraman istatistik sıkışması giderildi.
- [ ] Açık: özgün model ve ikon sanatı, daha kapsamlı gerçek güç karşılaştırması, diğer ileri mekanikler, fiziksel Android ve kalıcı kayıt, doğal hikâye ilerlemesi. HTML/ZIP yerelde; GitHub'a takip listesi yazıldı, ana index.html değiştirilmedi.
- [ ] Sıradaki: pet ve binek ekranlarını ayrı gerçek gelişim işlevlerine bağla; ardından günlük etkinlikler, mücevher/set ve ileri gelişim sistemleri bağımlılık sırasıyla. 


## 3.129 — Ayrı pet ve binek ekranları
- [x] Gelişim menüsü Gelişim yolu / Pet / Binek olarak ayrıldı; 57 sistem kimliği benzersiz kaldı. Eski yoldaş kısayolu doğrudan pet ekranına açılır.
- [x] Ruh Tilkisi: 4. ana görev kilidi, mevcut seviye, kaynak maliyeti, saldırı/hasar aralığı/kalıcı can, sonraki seviyenin gerçek değerleri, çağır/dinlendir, 3/6/9. seviyedeki özel yetenek durumları.
- [x] Ay Işığı Geyiği: 8. ana görev kilidi, hız/can/savunma ve sonraki seviye değerleri, otomatik biniş aç/dinlendir, gerçek yükseltme. 10 seviye ve karakter seviyesi tavanları korunuyor.
- [x] 34/34 Chromium kontrolü: kilitli başlangıç ekranları, benzersiz menüler, gerçek pet ve binek yükseltmelerinde kaynak düşümü ve istatistik değişimi, simüle kayıt, çağır/dinlendir, evrim kilidi ve doğru geri dönüş, kaynak/seviye/tavan engeli, kontrollü otomatik inme/binme, dört dikey ekran boyutunda yatay geometri ve dokunma hedefleri. JS hatası yok; 202 gömülü görsel birebir, JS sözdizimi ve ZIP bütünlüğü geçti.
- [x] 360×800 pet/binek ekran görüntüleri incelendi; ana işlemler görünür, alt içerik kaydırılabilir.
- [ ] Açık: mevcut pet ve binek önizlemeleri çok basit piksel çizimleri; özgün detaylı modeller, animasyonlar, evrim, pet ekipmanı ve gerçek pet özel saldırılarının tamamının savaş testi henüz yapılmadı. İleri hikâye ve kaynaklar testte doğrudan ayarlandı; kayıt simüle edildi. Fiziksel Android ve doğal hikâye ilerlemesi açık. HTML/ZIP yerel, ana index.html korunuyor.
- [ ] Sıradaki: gerçek günlük etkinlik ve ödül motoru, ardından mücevher/set ve ileri gelişim mekanikleri. 


## Kullanıcı ek talebi — Kostüm ve kanat koleksiyonları (3.129 sonrası)
Kostüm ve kanat düzenleri ana oyun mimarisine alınacak. Özgün modeller ileride üretilecek; şu an model üretimi yapılmış sayılmaz. Tek genel katalogda birleştirilmez; Gelişim kategorisinde Pet / Binek / Kostüm / Kanat ayrı erişimler, ortak kahraman görünüm sistemiyle bağlantılı olacak. Aşağıdaki yerleşim ve model sınıfları uygulama planıdır, henüz kesin model sayısı veya ekonomi değerleri belirlenmedi.

### Kostüm
- [ ] Ayrı koleksiyon ekranı: büyük karakter önizlemesi, sahip olunan/kilitli kostüm kartları, kaynak/açılma bilgisi, önizle ve giy/çıkar; mevcut zırh ve silah istatistikleri korunur.
- [ ] Erkek/kadın ve üç sınıfla uyumlu kostüm modelleri; başlık, gövde, pelerin ve aksesuar katmanları, sekiz yön, yürüyüş/saldırı/hasar/ölüm animasyonları, çakışma ve renk kontrolü.
- [ ] Özgün model üretim listesi (aday temalar): gezgin, savaşçı, ruh muhafızı, gölge, kraliyet ve efsanevi mühür kostümleri. Sayı ve açılma şartları model aşamasında netleştirilecek.
- [ ] Görünüm seçimi ve koleksiyon kaydı, görev/ödül bağlantısı, tek ödül ve gerçek sahiplik kontrolü.

### Kanat
- [ ] Ayrı kanat ekranı: karakter üzerinde büyük önizleme, koleksiyon, sahip olunan/kilitli, açılma bilgisi, tak/çıkar ve gelişim alanı; işlevsel kaynak/maliyet/istatistik yalnız mekanik kurulduğunda gösterilir.
- [ ] Özgün model üretim listesi (aday temalar): tüy, kristal, alev, buz, gölge ve ilahi mühür kanatları. Sayı ve güç dengesi daha sonra belirlenir.
- [ ] Sırt bağlantı noktası, sekiz yön, doğru ön/arka katman, açılma/kapanma ve hareket/saldırı animasyonları; kostüm, silah, binek ve pet ile çakışma kontrolü. Kanat uçuşu zorunlu değildir.
- [ ] Sahiplik, seçili kanat, gelişim ve kayıt; eski kayıt uyumluluğu; otomatik savaş davranışı korunur.

### Kabul
- [ ] Dikey ekran ve menü geçişleri, gerçek tak/çıkar, kilit ve kayıt, özgün sanat, dört ekran boyutu, fiziksel Android FPS/bellek. Kozmetik güç bonusları, fiyatlar ve model sayıları kullanıcı onayı/denge planıyla belirlenir. Çalışmayan fonksiyonlara sahte ödül verilmez.
- [ ] Kod ve modeller henüz uygulanmadı; bu kayıt plan kapsamı eklemesidir. 3.130 günlük etkinlik çalışması ve mevcut açık işler korunur.


## 3.130 — Görev kilitleri ve günlük seferler
- [x] Mevcut 16 ana görev ve kayıt indeksleri korunuyor. 4 gelişim kapısı (görev indeksleri 3/7/10/13; Sv4/7/9/11; son ikisinde ayrıca güç 220/300) gerçek durumdan hesaplanıyor. Bu eşikler geçici denge değerleridir.
- [x] Yan görev sayısı 6→12. Kilitliyken oyuncu yan görev veya Ruh Ormanı gelişim avını seçebilir; gerçek XP ile şart karşılanınca otomatik ana göreve dönülür.
- [x] Hikâye sonrasındaki tekrar seferleri günlük 3 hakla sınırlı; Türkiye saati 00.00 yenilenir. Hak kaydı, geri saat değişiminde sıfırlanmama ve tek ödül kontrol edildi.
- [x] Son yerel test kaydı 31/31 Chromium; dört dikey boyut, gerçek hasar/XP ile kilit açılması, kontrollü görev teslimi, simüle depolama ve tarih ilerletme. JS sözdizimi ve ZIP bütünlüğü doğrulandı. KM3130_Bekleme.png görseli incelendi.
- [ ] Tam doğal hikâye ilerleyişi, gerçek Android/kayıt, sunucu saati doğrulaması ve ileri seviye denge açık. HTML/ZIP yerel, ana index.html korunuyor.
- [ ] Mevcut sıradaki öncelik: günlük etkinlik/ödül motorunun kalanları, sonra mücevher/set, kostüm/kanat ve mevcut sıradaki ileri gelişim işleri.

## İleri seviye görev ve zorluk mimarisi — kullanıcı ek kararı (2026-11-26)
Kullanıcı: 300, 400, 500 seviyelerine uzanan, gittikçe zorlaşan görev ve gelişim sistemi. Mevcut geliştirme sırası bozulmaz; başa dönülmez, bu ileri içerikler bağımlılıkları tamamlanınca uygulanır. 500 başlangıç kapsam hedefidir, nihai seviye tavanı kararı değildir.
Kaynaklar: [MU Online resmi sınıf görevleri](https://muonline.webzen.com/en/gameinfo/guide/detail/92) (150/220/380–400 sınıf görevleri), [MU Online resmi tekrarlanabilir 301–400 ve usta görevleri](https://muonline.webzen.com/en/events/EX700Guide/pop_guild), [Black Desert Mobile ilerleme](https://www.world.blackdesertm.com/Ocean/Wiki?wikiNo=550) (hikâye, güç ve sistem kullanımı), [Kung Fu Saga başlangıç rehberi](https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-beginner-guide-en.html) (Sv60 + ön görevle ikinci sınıf). Aşağıdaki seviye bantları özgün taslak, referansın birebir değerleri değil.
| Seviye | Özgün içerik ve ilerleme kapısı |
|---|---|
| 1–50 | Başlangıç, ana/yan görevler, ekipman ve yoldaşların öğretimi |
| 51–100 | Bölüm bossları, günlük deneyim, ilk sınıf terfisi/ön görev |
| 101–200 | Mücevher/set, kader, daha zor bölgeler, kule ve kaynak görevleri |
| 201–299 | Kanat/ruh gelişimi, özel bosslar, daha uzun görev zincirleri |
| 300–399 | Ustalık ön koşulları, üst seviye ekipman, elit zindan ve boss sınavı |
| 400–499 | İleri terfi, ruh/kanat ve ekipman sınavları, katmanlı zindanlar, daha ağır XP gereksinimi |
| 500+ | Son oyun: bölüm sınavları, haftalık mücadeleler, ileri ekipman ve tekrar döngüsü; çevrim içi içerikler sunucu kurulunca |
- [ ] Veri tabanlı görev/bölüm tanımları: kalıcı benzersiz ID, ön görev, seviye, güç, sistem açılma şartı, bölge, hedef, ödül, tekrar hakkı, yenilenme, kilit nedeni ve alternatif etkinlik. Eski kayıt indeksleri geçişte korunur.
- [ ] Mevcut XP gereksinimi level*95 (doğrulandı); kayıt seviyesi 1–999 arasında temizleniyor, XP kazanım döngüsünde açık bir üst seviye tavanı yok. 1–500+ eğrisi, XP ödülleri, ekonomik kaynaklar, düşman can/hasar ve güç hesapları birlikte yeniden dengelenecek; sırf seviye sayısını büyütmek yeterli değil.
- [ ] 300/400/500 sınavlarında seviye + gerçek güç + önceki bölüm + terfi/boss gibi uygulanmış ön koşullar. Kilitli ana görev otomatik durur, nedeni ve kalan şart görünür. Alternatif av, yan görev, ekipman ve günlük içerik erişilebilir; haklar dolduğunda gerçek sayaç. Seviye ve güç arttıkça görev süreleri ve zorluk artar, çözümsüz kilit ve zorunlu satın alma yok.
- [ ] Görev çeşitliliği: keşif, teslim, toplama, çok dalga, elit/boss, ekipman geliştirme, terfi, zindan, kule, günlük/haftalık. Çevrim içi görevler yerel ilerlemeyi kilitlemez.
- [ ] Denge ve kabul: doğal ilerleme simülasyonu 1/50/100/200/299/300/399/400/499/500 ve eski kayıt; XP kaynaklarının erişilebilirliği, çift ödül, saat değişimi, boşta bekleme, yeniden açılma, ölüm, uygulama kapanışı, Android FPS. Gerçek süre hedefleri ölçümden sonra belirlenir. İleri seviye mekanikleri henüz kodlanmadı.


## Karakter XP ekonomisi — kullanıcı ek talebi (2026-11-26)
Kullanıcı: her içerikten XP alınmamalı; XP Arena, XP Zindanı ve görevler ayrı kaynaklar olarak tasarlanacak. Mevcut öncelik sırası korunur, başa dönülmez. Bu tablo Kırık Mühür'e özgü denge taslağıdır; Kung Fu Saga'daki kesin XP oranları veya tüm arena/boss ödülleri olarak sunulmaz.
Referanslar: [Kung Fu Saga görevler](https://gamingonphone.com/guides/avatars-saga-beginners-guide-and-tips/), [Daily Trial Dungeon ve dalga XP](https://medium.com/@anonnftgroup/kung-fu-saga-beginner-guide-part-1-best-class-for-beginners-and-your-first-7-days-cc0ca4986f42), [ana görev örnekleri](https://medium.com/@anonnftgroup/part-2-of-the-kung-fu-saga-beginner-series-e61cf774daeb), [otomatik gelişim](https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-beginner-guide-en.html), [XP iksiri, çevrim dışı kartı, ayrı kanat özü](https://www.dudcode.com/game/kung-fu-saga/).
| İçerik | Karakter XP | Ayrı ödül/işlev |
|---|---|---|
| Ana hikâye | Yüksek; bir defa | Hikâye, açılma, altın |
| Yan görev | Orta; bir defa | Görev kaynakları |
| XP Zindanı | Çok yüksek; hak sınırlı | Dalga performansı |
| XP Arena | Yüksek; hak sınırlı | Ayrı otomatik PvE deneyim arenası; normal Solo/PvP ile karıştırılmaz |
| Günlük av görevi | Orta; hak sınırlı | Günlük ilerleme |
| Haftalık XP görevi | Yüksek; hak sınırlı | Haftalık ilerleme |
| Normal açık dünya avı | Düşük ve sınırlı | Seviye farkı ve günlük XP bütçesi; normal loot devam edebilir |
| Çevrim dışı eğitim | Düşük, süre/bütçe sınırlı | Çevrim içi avla aynı süre için çift XP yok |
| Bireysel/elit/dünya/lonca bossu | 0 | Ekipman ve özel boss kaynakları |
| Normal Solo Arena/PvP | 0 | Arena parası, sıralama |
| Ekipman/altın zindanı | 0 | Ekipman/altın |
| Mühür Kulesi | 0 | Kader ve ilk kat ödülleri |
| Pet/binek/kanat/kostüm/demirci/diğer geliştirmeler | 0 | İlgili sistemin kendi gelişim puanı ve materyali |
- [ ] XP Arena ayrı Arena alt sekmesi; XP Zindanı Zindan alt sekmesi. Giriş şartı, kalan hak, süre, ödül önizlemesi, otomatik mücadele, sonuç ve doğru kategoriye dönüş.
- [ ] Önerilen başlangıç denge değerleri (henüz kodlanmadı): XP Zindanı günde 2, XP Arena günde 3; günlük haklar Türkiye saati 00.00 yenilenir. Haftalık yenilenme ve av/çevrim dışı süre sınırları 1–500+ doğal ilerleme ölçümüyle belirlenecek.
- [ ] XP yalnız merkezi izinli kaynak fonksiyonundan geçer; kaynak kimliği, tekil ödül/oturum kimliği, hak, seviye farkı, bütçe kontrolü. İzin verilmeyen kaynaklara varsayılan 0. Boss veya kule görevi XP veriyorsa yalnız bir defalık görev teslimi ödülü; boss öldürmesi ayrıca XP vermez. XP zindanı/arena dalgaları ile sonuç ödülü çift sayılmaz.
- [ ] İlerleyen 300/400/500 seviyelerinde XP eğrisi ve kaynak ödülleri birlikte dengelenir. Haklar dolunca gerçek bekleme ve geri sayım; kilitli hikâye için erişilebilir alternatif XP kaynağı kalması veya bir sonraki günlük yenilenmede açılması garanti edilir. Düşük seviyeli sonsuz farm ve saat geri alma açığı önlenir. XP iksiri eklenirse yalnız izinli kaynaklara etki eder; hak ve bütçe sınırını aşamaz.
- [ ] Mevcut 3.130 görev/av XP yollarını kaynak bazlı denetle ve eski kayıtları koru. Yeni XP planı, arena/zindan kodu ve merkezi dağıtım henüz uygulanmadı; günlük etkinlik motoru mevcut öncelik, bu plan ilgili aşamalara eklenir. Android ve 1–500+ doğal ilerleme testleri zorunlu.


## MMORPG kapsam genişletmesi — çoklu referans eksik analizi (2026-11-26)
Kullanıcı talebi: RPG/MMORPG'lerdeki yararlı, eksik veya yeterince tanımlanmamış sistemleri ana listeye ekle; tam bir oyun hedefle. Mevcut öncelik sırası değişmez; 3.130 sonrası günlük etkinlik/ödül motorunun kalanları, mücevher/set, kostüm/kanat, ileri gelişim, mücadele, sanat, online ve genel kabul. Bu bölüm ilgili grupların alt iş kuyruğudur, baştan başlama talimatı değildir. 3.130 kodunun her fonksiyonu bu incelemede yeniden doğrulanmadı: açık maddeler mevcut takip dokümanında tamamlandığı kanıtlanmamış kapsam/iyileştirmelerdir; kesin kod yokluğu iddiası değil. Yeni özelliklerin mekanikleri, modelleri ve testleri henüz uygulanmadı. Her birinin uygulanabilirliği, bağımlılıkları ve ekonomi dengesi ilgili aşamada değerlendirilecek.
Kesin kurallar: sabit dikey, joystick yok, tam otomatik hareket/savaş; oyuncu içerik ve gelişim kararlarını verir. Ayrı kategorili özgün UI; gerçek çevrim içi işlevler sunucu kurulunca. ZIP sınırı yok; fiziksel Android performansı şart. Önceki 1–500+ ilerleme ve izinli XP kaynak tablosu geçerli; meslek, koleksiyon, ustalık ve lonca puanları karakter XP'sine otomatik dönüşmez. Her içerik ayrı amaç/ödül taşır; zorunlu ödeme, sahte oyuncu, zorunlu online ilerleme veya çözümsüz kilit yok. Premium/ücretli sistemler ayrı onay ister.

### Referans kaynaklar ve uyarlama
- [Kung Fu Saga](https://play.google.com/store/apps/details?id=com.rxsjus.an.watt): mevcut mobil otomatik görev/gelişim referansı; önceki araştırma kaynakları korunur.
- [Black Desert Mobile resmi rehber](https://www.world.blackdesertm.com/Ocean/Wiki), [dünya ve yaşam sistemleri](https://www.world.blackdesertm.com/Ocean/ArchiveOverview/): bilgi/koleksiyon, aile, kamp, meslek, ticaret.
- [MU Online element sistemi](https://muonline.webzen.com/en/gameinfo/guide/detail/170): element donanımı ve rünler; mevcut sınıf terfisi ve ustalık planını derinleştirme.
- [Diablo Immortal resmi içerik](https://news.blizzard.com/en-us/article/24189528/discover-secrets-hidden-in-the-sharval-wilds), [zorluk/yarıklar](https://news.blizzard.com/en-gb/article/24140118/regale-in-the-winds-of-fortune): eşya özleri, zorluk ve mücadele döngüsü.
- [World of Warcraft](https://worldofwarcraft.blizzard.com/en-us/news/24107633/world-of-warcraft-the-war-within%E2%84%A2-sera-disponible-le-27-ao%C3%BBt), [Delves](https://worldofwarcraft.blizzard.com/en-us/news/24104270/), [üretim siparişleri](https://worldofwarcraft.blizzard.com/en-gb/news/23785116/world-of-warcraft-dragonflight-deep-dive): hesap koleksiyonu, itibar, NPC yoldaşlı solo mücadele, meslek.
- [Final Fantasy XIV oyun kılavuzu](https://na.finalfantasyxiv.com/game_manual/view/): görev ve içerik bulucu, NPC desteği, konut, koleksiyon, hazine avı.
- [Albion Online](https://albiononline.com/guides/), [üretim](https://albiononline.com/news/guide-crafting): toplama, işleme, üretim, fraksiyon. Zorunlu açık dünya PvP ve eşya kaybı aynen alınmaz.
- [Lost Ark](https://www.playlostark.com/en-us/game/releases/abyssal-assault), [engraving](https://www.playlostark.com/en-gb/game/releases/welcome-to-paradise): kartlar, set pasifleri, özel pasifler, üs görevlendirmesi.
- [RuneScape](https://www.runescape.com/game-guide/skills): bağımsız meslek seviyesi ve beceriye bağlı açılmalar.
- [Journey of Monarch](https://about.ncsoft.com/en/news/article/journey_update2_241205), [lonca baskını](https://about.ncsoft.com/en/news/article/journeyofmonarch-update-250410), [kuşatma](https://about.ncsoft.com/en/news/article/jm_update_250808_2): otomatik ilerleme, ayrı gelişim kaynakları ve lonca faaliyetleri.
Aşağıdaki önerilerin hepsi aynı oyunda bulunmaz; farklı referanslardan uyarlanan özgün tasarım ve üretim gereksinimleridir.

### A. Görev, dünya ve keşif (mevcut görev aşamasını genişlet)
- [ ] A01 Bölüm/epizot arşivi, görev günlüğü (aktif, kilitli, tamamlanan, tekrar), hikâye özeti ve ödül geçmişi.
- [ ] A02 Hikâye, yan, günlük, haftalık, bölge, sınıf, meslek, keşif, zincir, gizli ve açılış görevleri; her tür ayrı kural ve ödül.
- [ ] A03 Otomatik eskort/koruma, savunma dalgası, hedef arama, teslimat, toplama, nadir yaratık avı, çok hedefli görev ve NPC diyalogları.
- [ ] A04 Görev seçimi/öncelik, geçici duraklatma, güvenli iptal ve kayıt sonrası devam; ana görev kilidinde uygun alternatif öner.
- [ ] A05 Bölge itibar/şöhret ve NPC dostluk seviyesi; özgün açılan mağaza/görev; ayrı puan, karakter XP yok.
- [ ] A06 Keşif yüzdesi, görülen bölge/NPC/canavar bilgi kitabı, nadir düşman ve gizli hazine; bölgesel koleksiyon ödülleri.
- [ ] A07 Dünya haritası bölgeler/önerilen güç/loot, hızlı seyahat noktaları ve güvenli şehir dönüşü; otomatik rota, manuel joystick yok.
- [ ] A08 Gündüz/gece, hava, bölgeye özgü canavar ve ortam; oynanışa etkisi yalnız dengelenmiş ve test edilmişse.
- [ ] A09 Açık dünya dinamik etkinlikleri: kervan koruma, istila, bölge savunma, nadir av ve hazine; gerçek zaman penceresi.
- [ ] A10 Bölge başına hikâye, şehir, NPC, canavar türü, boss ve özgün sanat üretim şablonu; 1–500+ bantları için veri tabanlı içerik.

### B. Karakter ve otomatik savaş derinliği
- [ ] B01 Sınıfa göre farklı saldırı döngüsü, aktif/pasif, otomatik beceri koşulu (can, mana, menzil, hedef sayısı, boss aşaması), beceri önceliği ve bekleme.
- [ ] B02 Beceri/ekipman hazır kombinasyonları (boss, av, arena, savunma); kaydet, seç, sınırlı ve güvenli geçiş.
- [ ] B03 Fiziksel/büyüsel/element hasarı ve direnç; kritik, isabet, kaçınma, delme, blok, can çalma, şifa ve durum direnci formülleri.
- [ ] B04 Zehir/yanma/donma/yavaşlatma/sersemletme, güçlendirme/zayıflatma; süre, yenileme ve istif kuralları, boss bağışıklığı.
- [ ] B05 Otomatik hedef önceliği ve tehlike kaçınması; saldırı alanı, isabet anı, hareket/animasyon senkronu; bütün sınıflar.
- [ ] B06 Can/mana iksirleri, otomatik kullanım eşiği, stok ve bekleme; gerçek tüketim, sınırsız şifa yok.
- [ ] B07 Ölüm, güvenli doğuş, yenilgi nedeni, tekrar giriş/ücret/hak ve bağlantı kopması kuralları; eşya kaybı varsayılan yok.
- [ ] B08 Ustalık/terfi (300/400/500), özel ustalık ağacı ve ilgili puan; karakter XP kaynakları korunur.
- [ ] B09 Eğitim kuklası, gerçek hasar ölçümü, savaş özeti, hasar/şifa/kaçınma istatistikleri ve güç karşılaştırması.
- [ ] B10 Ayrıntılı karakter sayfası: özellik açıklamaları, nereden güçleneceği, eşya/etki kaynağı; hesaplanan güç gerçek istatistiklerden.
- [ ] B11 Birden fazla kayıtlı karakter ve hesap koleksiyonları; mevcut kayda güvenli geçiş; server gerektiren hesap işlevleri daha sonra.

### C. Ekipman ve ileri ekonomi (mücevher/set sırasında)
- [ ] C01 Kademe/rarity, yıldız, kalite, özellik aralıkları ve rastgele ek nitelikler; gerçek loot tablosu ve kaynak bilgisi.
- [ ] C02 Mücevher yuvası, tak/çıkar, birleştir, yükselt; set 2/4/6 parça bonusu ve gerçek savaş etkisi.
- [ ] C03 Element rünü, tılsım, mühür, takı ve kalıntılar; sınıf uyumu, ayrı yuva/puan, gereksiz para birimi çoğaltma yok.
- [ ] C04 Efsanevi eşya özünü çıkarma/aktarma, özel beceri değiştirici nitelik; tekil sahiplik ve güvenli aktarım.
- [ ] C05 Nitelik yeniden şekillendirme ve kilitleme, yükseltme aktarımı, üretim tarifleri; maliyet ve sonuç önizlemesi, kayıp önleme.
- [ ] C06 Üretim/işleme/eritme, ekipman birleştirme ve geri dönüşüm; otomatik toplama/çöp filtresi oyuncu tercihine bağlı.
- [ ] C07 Eşya kilitleme, favori, sıralama/filtre, toplu parçalama, yığın, kapasite ve depo; değerli ekipmanı onaysız silme yok.
- [ ] C08 Ekipman kaynağı rehberi, nadir drop olasılığı ve uygun zindan; şansa bağlı ödüllerde görünür kurallar, ücretsiz garanti ilerleme.
- [ ] C09 Ekonomi denetimi: kaynak giriş/çıkışı, enflasyon, maliyet eğrisi, sınır/taşma, işlem günlüğü; online takas için sunucu doğrulaması.
- [ ] C10 Eşya dayanıklılığı/tamir, bağlanmış ve ticarete uygun eşya ayrımı yalnız denge uygun olursa; zorunlu ödeme veya cezalandırıcı kayıp yok.

### D. Koleksiyon, görünüm ve yoldaşlar
- [ ] D01 Kostüm/kanat planının yanında silah görünümü, başlık, pelerin, aura, iz efekti, portre çerçevesi ve unvan koleksiyonları.
- [ ] D02 Görünüm ve ekipman gücü ayrı; önizleme, giy/çıkar, koleksiyon kaydı, renk seçenekleri, kombinasyon kaydı; sekiz yön ve animasyon.
- [ ] D03 Pet/binek koleksiyonu, birden çok tür, seçme, evrim, özel yetenek, donanım; otomatik hareket ve savaşla uyum.
- [ ] D04 Yardımcı ruh/yoldaş (NPC savaş desteği), pasif/aktif rol, geliştirme, çağırma; mevcut petin gereksiz kopyası olmasın.
- [ ] D05 Kart/canavar kitabı, keşif koleksiyonu ve koleksiyon set bonusları; ayrı kaynak ve gerçek stat etkisi.
- [ ] D06 Kader, meridyen, ruh ekipmanı, ilahi silah, dönüşüm, kanat gelişimi; mevcut planın her alt sistemine gerçek kaynak, kilit, seviye, kayıt ve savaş testi.
- [ ] D07 Başarı, unvan, koleksiyon tamamlanma yüzdesi ve ödül arşivi; ödül bir defa, karakter XP yalnız izinli kaynak ise.

### E. Meslek ve yaşam (ana sistemler sonrası)
- [ ] E01 Madencilik, odunculuk, bitki toplama, balıkçılık; otomatik rota ve süre, ayrı meslek tecrübesi.
- [ ] E02 Demircilik, simya, yemek, işleme ve zanaat uzmanlığı; tarif, malzeme, çıktı ve meslek kilidi; karakter XP yok.
- [ ] E03 Kişisel kamp/konut: dekorasyon, depolama ve kaynak istasyonları; özgün ekran.
- [ ] E04 NPC işçi/görevlendirme ve keşif seferleri: gerçek süre, malzeme, teslim, çevrim dışı güvenli hesap.
- [ ] E05 Üretim siparişleri, NPC ticareti, kervan ve bölge kaynakları; gerçek oyuncu siparişleri sunucu sonrası.
- [ ] E06 Meslek ve keşif için özel koleksiyon, tarif defteri, ayrı ödül; zorunlu yan meslek grind'ı ile ana hikâye kilitlenmez.

### F. Mücadele ve son oyun
- [ ] F01 XP zindanı, XP arenası, ekipman, altın, materyal, pet/binek/kanat ve kader zindanları; mevcut XP izin tablosu geçerli.
- [ ] F02 Normal/zor/elit/ustalık kademeleri, bölüm ve güç şartı, giriş önizlemesi, ödül/ilk zafer, başarısızlık ve tekrar.
- [ ] F03 Dalga savunması, hayatta kalma, süreli av, sonsuz kule, boss zinciri, zindan rotası, hazine labirenti, nadir boss, bölge istilası.
- [ ] F04 Haftalık baskın ve son oyun bossları: çok aşama, tehlike alanı, taktik koşulu, hak ve katkı; solo NPC desteği ile online raid ayrı.
- [ ] F05 Değişen zindan kuralları (element, ek düşman, iyileşme, süre), performans dereceleri ve adil ödüller.
- [ ] F06 Solo arena, AI rakipler açıkça bot; XP Arena ayrı; PvP, takım arena, sezon sıralaması ve eşleşme gerçek sunucu.
- [ ] F07 Dünya bossu katkı/ödül hakkı, lonca bossu ve grup zindanı; aynı katılım iki ödül üretmez, kopma sonrası kayıt.
- [ ] F08 Son oyun 300/400/500+ bölümleri; ustalık ve ekipman sınavları, haftalık zorluklar, sezon hedefleri; mevcut seviyeyi silen zorunlu sıfırlama yok.
- [ ] F09 Her mücadele için seçim→koşul/hak→onay→yükleme→otomatik savaş→sonuç→ödül→doğru kategori/şehre dönüş; içeriklere özel ekran.
- [ ] F10 Daha önce tamamlanmış kolay içeriğin hızlı tamamlama özelliği yalnız gerçek zafer ve hak tüketimiyle; XP/ödül açığı yok.

### G. Günlük ve süreli sistemler (mevcut sıradaki iş)
- [ ] G01 Günlük/haftalık görev puanı ve basamak ödülleri; gerçek etkinlik takvimi, açılma, bitiş, geri sayım.
- [ ] G02 Günlük giriş takvimi ve kaçırılmış gün davranışı; haftalık ödüller, aylık/özel dönem etkinlikleri.
- [ ] G03 Hak, bilet, yenilenme, çevrim dışı süre, saat geri alma, tek ödül ve kayıt; online olunca yetkili sunucu saati.
- [ ] G04 Ödül merkezi: hazır/alınmış/süresi geçmiş; otomatik görev ödülünü tekrar alma yok.
- [ ] G05 Geri dönen oyuncu ve yeni başlayan telafi/rehberleri; bedava kaynakların kötüye kullanımına karşı kayıt ve hak.
- [ ] G06 Sezon hedefleri, ücretsiz ilerleme yolu, dönemsel koleksiyon; ücretli pass/VIP varsa ayrı kullanıcı onayı.
- [ ] G07 Kısıtlı XP dağıtımı ve 1–500+ doğal ilerleme ölçümleri; karakter, meslek, pet, binek ve lonca puanları ayrı.

### H. Gerçek MMORPG ve operasyon (sunucu aşaması)
- [ ] H01 Hesap, güvenli oturum, karakter seçimi, sunucu/bölge/kanal, bulut kayıt ve cihazlar arası devam, hesap kurtarma.
- [ ] H02 Arkadaş, engelleme, özel/dünya/takım/lonca sohbeti, bildirim ve posta; spam ve raporlama.
- [ ] H03 Takım/rol, içerik bulucu, eşleşme, bekleme, hazır onayı, bağlantı kopması/geri giriş ve ödül hakkı.
- [ ] H04 Lonca: kur/katıl/ayrıl, rütbe/yetki, duyuru, bağış, lonca puanı, görev, mağaza, lonca bossu ve turnuva.
- [ ] H05 Fraksiyon/bölge mücadelesi, lonca kuşatması, sezon sıralaması; yalnız isteğe bağlı içerik, başlangıç ve solo ilerleme korunur.
- [ ] H06 Pazar/müzayede/takas/üretim siparişi, fiyat geçmişi, işlem ücreti, yetkili envanter ve sahte eşya engeli.
- [ ] H07 Gerçek PvP/MMR, lig, sezon, dengeli eşleşme, sonuç ve yeniden bağlanma; ödül idempotent.
- [ ] H08 Sunucu yetkili savaş, loot, XP, ekonomi, hak ve saat; istemci doğrulaması, hız/tekrar/dupe açığı ve bot/istismar denetimi.
- [ ] H09 Operasyon: yönetim paneli, olay kayıtları, hata raporu, destek, moderasyon, yedekleme/geri yükleme, bakım/versiyon uyumu.
- [ ] H10 Sunucu yük, gecikme, iki cihaz eşleşmesi, çökme/kopma ve veri güvenliği testleri; gerçek altyapı yokken menü kilitli.

### I. Görsel, ses, kullanım ve teslim
- [ ] I01 Ayrı özgün menü aileleri (boss/zindan/arena/etkinlik, karakter, ekipman, koleksiyon, meslek, sosyal); ikon sözlüğü, geri ve kategori hafızası.
- [ ] I02 Her ekran için açılış, yükleniyor, boş, kilitli, başarısız, bağlantı yok, tamamlandı durumları; gerçek koşul ve anlaşılır açıklama.
- [ ] I03 Açılan sistem öğreticisi, yardım/terimler, kaynak nereden bulunur, içerik önerisi; bildirimler çakışmaz.
- [ ] I04 Karakter/NPC/boss/pet/binek/kanat/kostüm ve çevre sanat envanteri, özgün 2.5D katmanlar, sekiz yön, animasyon ve efekt.
- [ ] I05 Ses/müzik, ses düzeyi, kapatma ve arka plana geçiş, özgün/lisanslı varlıklar.
- [ ] I06 Dikey ekran, ölçek/yazı okunurluğu, dokunma hedefi, renk körlüğü için yalnız renge bağlı olmayan göstergeler, efekt azaltma.
- [ ] I07 Android fiziksel test, FPS/kare süresi, bellek, sıcaklık, pil, dokunma, kalıcı kayıt, çevrim dışı/yeniden açılış; 30 FPS hedef, 60 opsiyon.
- [ ] I08 Uzun oynanış ve 1–500+ denge testleri; eski kayıt göçü, veri yedeği, çift ödül ve ekonomi regresyonu; sürüm başına kanıt.
- [ ] I09 APK imzalama, sabit dikey manifest, Play dağıtımı, gizlilik/izinler, çökme raporu, güncelleme/geri dönüş, sürüm yedeği.
- [ ] I10 İçerik üretim araçları: görev/bölge/boss/eşya veri şablonları ve doğrulayıcı; tek tek kod kopyalamak yerine tutarlı genişletilebilir yapı.

Toplam 81 numaralı açık kapsam/iyileştirme kontrolü (A10+B11+C10+D7+E6+F10+G7+H10+I10 = 81). Bunların bir kısmı önceki planların ayrıntılandırılmasıdır, 81 tamamen yeni bağımsız mekanik değildir. Sıradaki kod sürümü 3.131: günlük etkinlik ve ödül motoru; mevcut çalışma sırası korunacak. Bu eklemede oyun kodu veya görseller değiştirilmedi.


## Kung Fu Saga ana referans denetimi — başlangıçtan son oyuna (2026-11-26)
Kullanıcının önceliği: Kung Fu Saga ana içerik/mekanik referansıdır; diğer MMORPG'ler yardımcı referans. 3.130 sonrası mevcut sıra korunur: 3.131 günlük etkinlik/ödül motoru, mücevher/set, kostüm/kanat ve devamındaki bağımlılık sırası. Bu bölüm önceki 81 kapsam maddesinin referansa özel ayrıntılandırmasıdır; yeni baştan başlama veya her maddeyi hemen kodlama talimatı değildir. Sabit dikey, tam otomatik, joystick yok, ayrı kategoriler, özgün sanat; izinli karakter XP ekonomisi; çevrim içi içerikler gerçek sunucu olmadan çalıştırılmaz.

### Referans kanıtları / seviye sınırı
- [Watt Games resmi sürüm geçmişi](https://apps.apple.com/tr/app/kung-fu-saga-martial-path/id1660688865): 2023 sürümünde dokuzuncu sınıf değişimi, sunucular arası savaş ve ileri donanımlar; 2024 sürümlerinde sekizinci Demonic Abyss katmanı, daha yüksek ruh ekipmanı kademeleri, pet donanımı parçalama, dönüşüm beceri/setleri. Son listelenen güncellemelerde mücevher tavanı 12, 16 sunuculu boss ödül/müzayede iyileştirmeleri. Incessant Battle, Dominus Palace (12 parçalı ekipman), Warlord's Tomb (iki seri/dört savaş ruhu), Vessel (boss Anima/meridyen) ve Talent (seviye puanları) belgelenmiş. Mücevher seviyesi 12, karakter tavanı değildir.
- [Resmi Google Play](https://play.google.com/store/apps/details?hl=en_GB&id=com.rxsjus.an.watt): çeşitli sınıflar, binek/pet toplama, lonca ve ortak boss. [BlueStacks başlangıç rehberi](https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-beginner-guide-en.html): Sv60 ve ön hikâye ile ikinci sınıf, otomatik ilerleme, güç gelişimi; sürüm farkları vardır. [Sınıf ekranı ve beceri rehberi](https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-classes-guide-en.html): sınıf/cinsiyet/model ve beceri açılma seviyeleri. [MuMu HUD](https://www.mumuplayer.com/blog/avatars-saga-beginner-guide.html), [çanta ekranı](https://www.malavida.com/en/soft/avatars-saga/android/): sağ içerik girişleri, sol görevler, üst kaynak/ödül girişleri, büyük model ve çevresinde ekipman slotları. [Skytower kaydı](https://medium.com/@anonnftgroup/kung-fu-saga-beginner-guide-part-3-first-skytower-fate-chest-and-the-forge-80b5d3f8a05a): kat seçimi, ilk zafer, yaklaşık 1 dk ilk kat, 5. katta kader açılışı, sandık ve demirci. [Hikâye/kanat/günlük av kaydı](https://medium.com/@anonnftgroup/part-4-of-the-kung-fu-saga-beginner-series-2fe77ab0b97a): erken kanat ödülü, 5 dk hikâye zindanları, güçlendirme hedefleri, günlük av; Sv180 koşulu görülen bir hızlı tamamlama seçeneği. [Eşya kayıtları](https://www.dudcode.com/game/kung-fu-saga/): XP iksiri, çevrim dışı kart, bireysel boss bileti, ayrı kanat/yetenek/Protoss kaynağı ve çeşitli boss haritalarında yenileme kartı. [Ödül/posta rehberi](https://gamerjournalist.com/avatars-saga-codes-kung-fu-saga-codes/): üst ödül merkezi, aktivasyon kodu, posta ve günlük kule ödülü.
- Kesin maksimum karakter seviyesi, tüm geç oyun ekranları, açılma seviyeleri, etkinlik saatleri ve hak miktarları kamu kaynaklarında doğrulanamadı. Canlı yüksek seviyeli hesapla doğrudan menü denetimi yapılmadı. Sonsuz karakter seviyesi iddia edilmez; kanıtlanan şey tekrar içerikleri, çoklu terfi ve güncellemelerle genişleyen son oyun. 500+ Kırık Mühür hedefidir, Kung Fu Saga'nın tavanı değildir. Başlangıç, orta ve ileri seviye gerçek ekran kanıtları bulununca tablo güncellenecek.

### 3.130 kaynak dosyasından doğrulanan yapısal açıklar (statik inceleme; istismar testi değil)
- [ ] K01 `earnXP(n)`: doğrudan XP topluyor, kaynak kimliği/günlük bütçe yok. `questAward` tekil görev kontrolü yapıyor; açık dünya öldürme yolu `earnXP(cr.xp)` çağırıyor. Merkezi izin listesi ve boss/normal av ayrımı gerekli; XP Arena henüz kategori kimliği değil, XP Zindanı yalnız planlanan giriş. Önceki XP kuralları uygulanacak.
- [ ] K02 `earnXP` gereksinimi level*95; çalışma anında tavan kontrolü yok, kayıt normalizasyonu seviyeyi 1–999, XP'yi 0–10^7 aralığına sıkıştırıyor. Uzun vadede tutarlı, sürümlenebilir seviye/XP sınırı, taşma ve yeniden yükleme testi gerekli; 999 gerçek oyun tavanı olarak kabul edilmez.
- [ ] K03 `KM323_STORY` 16 ana görev; `missionInfo()` aynı tekrar görev listesini döndürüyor, yalnız coin+18*tier ve xp+20*tier büyüyor. 3.130 dört erken gelişim kapısı ve günlük üç tekrar hakkı var; bölüm, yeni bölge, terfi ve farklı zorluk zinciri yok. İleri seviyede sadece sayıları büyütme.
- [ ] K04 `KM334_D.kMax=12`: açık dünya düşman ölçeklendirmesi hikâye indeksine göre en fazla 12 kademeye çıkıyor. 300/400/500+ için bölge ve zorluk temelli düşman HP/ATK/DEF ve ödül tablosu, düşük seviye farm kontrolü.
- [ ] K05 `KM3105_TOWER` 5 sabit kat (Sv10–18), sonraki kat bitince null; ayrı kader ödülü ve günlük kule toplama motoru yok. Mevcut boss ve kule ödülü `km3107Loot` sabit altın/toz/ekipman. Uzun vadeli kat verisi, hedef, günlük ödül ve açılan kader yuvaları gerekli.
- [ ] K06 `KM326_GATES` dört ana bölge; `KM3124_GROUPS` 12 kategori, ileri sistemlerin çoğu `KM3123_PLANNED` açıklama kabuğunda. Sadece menü var diye tamamlandı işaretlenmeyecek; gerçek mekanik, kayıt, giriş şartı ve ödül gerekli. Kostüm planı henüz kategoriye bağlanmadı. Mevcut yerel dünya bossu gerçek multiplayer değil.
- [ ] K07 Menü/işlev erişiminde tek ortak sistem koşulu ve sunucu yetkisi: doğrudan çağrı, geri, yeniden giriş, eski kayıt, sayaç, çift ödül testleri; yerel saatin ileri/geri alınması ve kayıt manipülasyonu güvenlik sınırıdır, sunucuya taşınmalı. Bu inceleme statiktir, gerçek açık sömürüsü veya tüm fonksiyonların E2E doğrulaması yapılmadı.

### Menü denetimi — referans ekranları ve özgün uygulama
- [ ] K08 Açılış/karakter: tematik büyük model, solda sınıf seçimi, sağ cinsiyet, önizleme ve sonraki adım; daha fazla özgün sınıf/terfi görünümü, ikinci sınıf/terfi ekranı, gerçek hesap/sunucu seçimi online aşamada. Kaynaklar farklı sınıf sayıları gösterir, birebir sayı zorunlu değil.
- [ ] K09 HUD: sol görev satırlarında ayrı ana/yan/günlük ve güçlendirme hedefleri; kilit nedeni, ilerleme sayacı, tek dokunuşla otomatik rota; sağ Boss/Zindan/Arena/Etkinlik; üstte kaynak, ödül, posta kısayolları; alt gelişim ve çiçek. Referanstaki reklam/premium kalabalığı kopyalanmaz. 3.130 görev ekranında ana ve yan görevlerin uzun tek liste olarak yığılması ve büyük kilit kartının çok yer tutması gözlemlendi; ayrı kompakt sekmeler, karakter görüşü ve dokunma güvenliği.
- [ ] K10 Çanta/karakter: büyük model, iki yanda donanım yuvaları, kademe/yıldız, gerçek eşya karşılaştırması, alt ızgara/filtre/depo; ileri donanım ayrı. 3.128 ekipman görüntüsünde 6 yuva ve ızgara mevcut; özgün ikon, eksik ileri slot, set/mücevher, güç artış bildirimi ve sanat açık.
- [ ] K11 Beceri/terfi: temel saldırı, seviyeye göre kilitli beceriler, büyük ikon/etki açıklaması, aktif/pasif, ikinci sınıf ve çoklu terfi ön görevleri; oyuncu manuel hareket etmez.
- [ ] K12 Demirci: kademe tavanı, mevcut/sonraki istatistik, tüm ekipman güçlendirme kilometre taşları (referansta Road of Enhancement), mücevher/set, birleştirme/özellik. Gelişim görevi sonucu gerçek güç etkisi; ham karakter XP yalnız izinli görevden.
- [ ] K13 Gelişim: Pet, Binek, Kostüm, Kanat, İlahi Donanım, Ruh, Kader, Meridyen ve Dönüşüm ayrı görsel koleksiyon/yuva/özellik sayfaları; kaynak nereden düşer, kilit, gelişim, önizleme, kuşan/çıkar. Pet yakalama ve evcilleştirme, yakalama malzemesi, tür/yetenek/yıldız ve pet donanımı parçalama; binek çeşitliliği.
- [ ] K14 Boss seçimi: bireysel, dünya, cehennem/üst katman, boss merkezi, ortak/sunucular arası gibi ayrı alt gruplar; boss listesi, harita, canlı/ölü, kalan hak, yeniden doğma, bilet/kart, ödül/katkı, giriş ve çıkış. Referanstaki harita/kart uyumluluğu araştırılıp özgün eşdeğerler uygulanır; tüm gerçek süre ve haklar doğrulanmadı.
- [ ] K15 Zindan: XP, hikâye, ekipman/set, kaynak, kule/kader, katmanlı uçurum, ileri dönüşüm ve takım/sunucular arası ayrı içerik türleri. İçeriğe özel görsel, önerilen güç, kat/dalga, hak, ilk zafer ve sonuç; XP sadece izin verilen modlar. Arena: Solo, XP Arena (bizim özgün plan), PvP, kesintisiz mücadele ve sıralama ayrı.
- [ ] K16 Etkinlik ve ödül: günlük av, günlük deneme, günlük/haftalık takvim, giriş ödülü, seviye ödülü, koleksiyon sandığı, posta, toplu alma/tekil hak, çevrim dışı eğitim kartı ve XP iksiri. Hızlı tamamlama yalnız gerçek uygun koşul/önceki zafer ve hakla; referanstaki VIP ödeme şartı birebir alınmaz.
- [ ] K17 Savaş HUD: üst boss portre/can/sayaç, sol hedef ve ödül, sağ çıkış; sonuçta gerçek kazanç ve çanta, tekrar/sonraki kat/şehir dönüşü. Dört dikey boyut + gerçek cihaz; otomatik kaçınma, normal/özel saldırı ve bütün sınıflar regresyonu.

### Son oyun sistemleri — referansta belgelenen derinliklerin özgün karşılıkları
- [ ] K18 Dokuzuncu terfiye kadar genişletilebilir terfi veri yapısı (Kırık Mühür'de kesin sayı/eşik dengeyle), 300/400/500+ bölüm ve ustalık sınavları, ikinci sınıf ve yeni pasifler; seviye artışından yetenek puanı, ayrı ustalık kaynağı karakter XP'ye karışmaz.
- [ ] K19 Kader/Skytower: kat, ilk temizleme, günlük sandık, kader özü ve yeni yuva açılması; tamamlanan katı tekrar ödüllendirme yok. Meridyen: her harita bossundan özel öz, düğüm/kanal ve eşik bonusları.
- [ ] K20 İmparator seti benzeri ileri ekipman: çok parçalı koleksiyon, set bonusu ve özel nitelik. Referans 12 parça; bizde slot sayısı mevcut 6 temel yuvayı bozmayacak şekilde ayrıca tasarlanır.
- [ ] K21 Ruh donanımı: kademeli yıldız/kalite, ruh koleksiyonları, savaş ruhu serileri ve farklı pasifler; Warlord's Tomb benzeri ayrı kaynak zindanı, birleştirme/parçalama. Bagua/Rahi/element setleri için özgün modüler set kuralları.
- [ ] K22 Dönüşüm: ayrı biçim/karakter modeli, dönüşüm yetenekleri, set ve kaynak, otomatik tetikleme şartları, animasyon ve normal biçime güvenli dönüş. Abyss of Devil benzeri özel zindan.
- [ ] K23 İlahi silah, gizli silah, enstrüman, ilahi yaratıklar (Protoss): ayrı görsel/işlev ve yıldız/kademe, ilgili kaynak, savaş etkisi. Pet veya kanatla aynı XP havuzu kullanılmaz.
- [ ] K24 Kesintisiz mücadele: kademeli rakipler, kendi mücadele parası ve unvan/koruyucu ödülü; yüksek seviye kaynak, adil süre/hak. Katmanlı uçurum en az veri ile genişletilebilir, referans 8. katmana kadar güncellenmiş; sınırsız kat iddiası yok.
- [ ] K25 Online son oyun: sunucu yaşı/uygunluk, grup, lonca ve ortak boss; sunucular arası katmanlar, 16 sunucu tipi geniş ölçek hedefi (gerçek kapasite ölçülmeden garanti değil), katkı ödülü, müzayede, sezon sıralaması ve hak; yerel oyuncuya sahte rakip/ödül yok.
- [ ] K26 Sonsuzluk mimarisi: mevcut bölüm bitse de günlük/haftalık içerik, artan kat ve zorluk, yeni terfi/set/kozmetik koleksiyonu, sezon ve yeni bölge veri paketleri. Seviye tavanı sürümlenebilir; tavanda harcanan XP/ödül davranışı açık; karakter ilerlemesi sıfırlanmadan yeni içerik. Matematiksel sınırsız XP, otomatik sonsuz hikâye veya sınırsız ödül yok.
- [ ] K27 Denge ve genişletme kabulü: 1/50/60/100/180/200/299/300/399/400/499/500 ve gelecekteki seviye tavanında doğal ilerleme, hakların bitişi, gerçek kilit/açılma, erişilebilir alternatifler; yüksek seviye kayıt göçü, tavan aşımı, düşük seviye farm, tekrarlı ödül, saat ve sunucu kontrolü. Fiziksel Android ve uzun oyun testi.

27 referansa özel kontrol maddesi; önceki maddelerle ilişkili, 27 bağımsız yeni özellik olarak sayılmaz. Bu turda kaynak kod ve yerel ekran görüntüleri incelendi, doküman güncellendi; oyun kodu, sanat ve test sürümü değiştirilmedi. Sıradaki 3.131 günlük etkinlik ve ödül motoru; K16/G01-G04 ve mevcut XP kaynak denetimi ilgili sırada ele alınır.


## 3.131 TEST — günlük etkinlik ve ödül motoru (2026-11-26)
- 3.130 ZIP tabanı korunarak tek HTML test paketi oluşturuldu: Kirik_Muhur_3_131_Gunluk_Etkinlik_Odul_TEST.zip (40.645.825 bayt, SHA256 5e89cdf9190a7bd40e5cffdc716e48bd9ab2e699d4d4c08bdf5edd2fedb6e4f3). Oyun ZIP'i bu commit'e yüklenmedi, sadece ilerleme kaydı.
- Günlük av 12 normal düşman/40 puan, 2 görev teslimi/40 puan, boss veya kule zaferi/20 puan; 40/80/100 günlük ve 3/5 giriş, 240 puan haftalık ödül. Ödüller altın/ruh tozu, karakter XP yok. Bunlar test denge değerleri.
- Günlük Türkiye 00.00, haftalık pazartesi 00.00 yenilenme; kaçan ödüller sona erer. Yerel saat geriye alındığında yeni etkinlik ödülleri kilitlenir; sunucu saati ve ileri saat manipülasyonuna dayanıklılık henüz yok.
- Etkinlik altında Günlük/Takvim/Ödüller ayrı işlevsel görünümler. Hak ve ödül aynı kayıt nesnesinde; başarısız yerel yazma durumunda ödül iptal edilir. Mevcut kayıt anahtarı korunur; boss snapshot üzerinden sayılır.
- JS sözdizimi, ZIP CRC/bütünlüğü, gerçek kaynak fonksiyonlarının kontrollü bağımlılıklarla 12 birim/entegrasyon testi geçti (görev, öldürme ve boss ödül hook'ları dahil). Tarayıcı yerel dosya erişimi yönetici politikasıyla engellendi; gerçek oyun E2E, ekran görüntüsü ve fiziksel Android doğrulaması yapılmadı.
- G01–G04/K16 kısmi uygulama; görsel kabul, saatli özel etkinlikler, çevrim dışı eğitim, tam XP kaynak motoru ve sunucu güvenliği açık. Tamamlandı işareti konulmadı. Önce 3.131 gerçek ekran/oyun testi, sonra mevcut sıraya göre ilerleme.


## 3.132 TEST — XP ekonomisi, XP Arena ve XP Zindanı (2026-11-26)
- 3.131 tek HTML tabanı korundu. Paket: Kirik_Muhur_3_132_XP_Ekonomisi_Arena_Zindan_TEST.zip; 40.649.009 bayt; SHA256 4f042ad99056e29ff2567fd373fd35a43a470c118c2b3b50630e1717d2cd1910. Bu commit yalnız kontrol listesi; oyun ZIP'i depoya yüklenmedi.
- Merkezi karakter XP izin listesi: ana/yan görev, günlük sınırlı normal av, XP Arena ve XP Zindanı. Boss öldürme, normal arena, gelişim kaynakları XP vermez. Normal av bütçesi gün başındaki seviyenin XP gereksiniminin %75'i (en az 95); UTC+3 00.00 yenilenir; saat geri alma kontrolü var. Seviye 999 teknik tavanı kayıtla uyumlu; tavanda XP taşmaz. Bu değerler denge taslağıdır.
- XP Arena: 2. seviye ve 1 tamamlanmış ana görev; günde 3 giriş, 90 sn, tek PvE nöbetçi, zafer XP'si giriş seviyesinin gereksiniminin %45'i. XP Zindanı: Sv4 ve 3 tamamlanmış ana görev; günde 2 giriş, 150 sn, 2/3/4 düşmanlı üç dalga, tüm dalgalar bitince %80 XP. İkisi ayrı kayıt hakları; kaybedilen/yarım bırakılan giriş geri verilmez. Boss bileti ve boss etkinlik puanı vermez. Giriş ayrıntı ekranı, hak, sonuç ve ilgili menüye dönüş mevcut. Görev gelişim kilidine XP içerik kısayolları ve normal av bütçesi eklendi.
- JS sözdizimi, ZIP CRC ve 13 kontrollü kaynak fonksiyon testi geçti: izin listesi, sayı kontrolü, günlük bütçe/yenilenme, saat geri alma, seviye tavanı, ayrı haklar, açılma, arena ödülü, üç dalga, yenilgi/süre, çift ödül, kayıt hatası rollback ve seviye/kayıt. Bunlar bağımlılıkları mock edilmiş kod testleridir; gerçek otomatik savaşın bütün akışı test edilmedi.
- Tarayıcı yerel HTTP erişimi de ERR_BLOCKED_BY_ADMINISTRATOR ile engellendi. Gerçek ekran görüntüsü, fiziksel Android, doğal savaş dengesi, 1–500+ doğal ilerleme ve sunucu güvenliği doğrulanmadı. G01–G04/K16 ve K01/F06/G07/K15 kısmi; nihai kabul işareti konulmadı. 3.131 ve 3.132 görsel/oynanış kabulü açık; sonraki içerik sırası mücevher/set, kostüm/kanat.


## 3.133 TEST — Mücevher, set bonusları ve görsel denetim (2026-11-26)
- 3.132 HTML tabanından Kirik_Muhur_3_133_Mucevher_Set_TEST.zip (40.652.952 bayt, SHA256 8a64a37a4ffeb7c295f8d9d802ba02ac8e010ddc594983d3d3cc7902573ea36f). ZIP CRC ve JS sözdizimi başarılı. ZIP bu commit'e yüklenmedi.
- Demirci mevcut yükseltme ekranı ve ana HUD korunarak üstte iki görünür kısayol eklendi. Mücevher ve Setler ayrı alt ekranlar. Eski manuel yön çubuğu talimatı otomatik görev talimatıyla düzeltildi.
- Sv4 test açılışı: 6 donanım yuvasına bir taş, Yakut saldırı/Safir savunma/Zümrüt can; Sv1 taş 60 altın+6 toz; 3 aynı taş → üst kademe, tavan 12. Yuvaya bağlı taş, ekipman takılıysa bonus. Nadir ve üstü aynı kademedeki 2/4/6 parça set bonusları birikimli. Bu denge değerleri öneri/test değerleridir; uzun seviye dengesi doğrulanmadı.
- Gerçek Chromium render ve UI tıklamaları, HTML set_content üzerinden; yerel dosya/HTTP gezinme engeli sürdüğü için localStorage bellek test taklidi kullanıldı. Taş üretim/birleştirme/takma/çıkarma, gerçek saldırı farkı, kayda yazılan alan, set bonusu, geçersiz işlem, tavan ve yazma hatasında kaynak geri alma kontrolleri geçti. JS çalışma zamanı hatası gözlenmedi.
- 360×800, 393×852, 412×915 mücevher ve set DOM ölçümlerinde yatay taşma yok. HUD, Demirci, mücevher, set, etkinlik, XP arena ve XP zindanı ekran görüntüleri alındı; küçük ekranlarda dikey kaydırma var. Gerçek Android, doğal savaş akışı, kalıcı depolama ve uzun dönem denge testleri bekliyor. K12/ilgili ekipman maddeleri kısmi; nihai kabul yok.
- Sonraki sıra kostüm ve kanat koleksiyonları; mevcut düzen, kayıt ve performans şartları korunacak.


## 3.134 TEST — Kostüm ve kanat koleksiyonu (2026-11-26)
- 3.133 üzerinden tek HTML paket: Kirik_Muhur_3_134_Kostum_Kanat_TEST.zip (41.554.340 bayt; SHA256 ae33b76ed246a4fb6f6479817c1efc085afeb75ca5216e2ec6ede1d362336e19). JS sözdizimi ve ZIP CRC başarılı. ZIP depoya yüklenmedi.
- Gelişimde ayrı Kostüm/Kanat sekmeleri; 2 özgün vektör pelerin, 2 kanat katmanı; sahiplik, önizleme döndürme, satın alma, kuşan/çıkar, kanat Sv1–10 yükseltme. Takılı kanat başına kademe +2 ATK/+1 DEF/+8 HP, kostüm yalnız görünüm. Mevcut zırh ve XP kuralları korunur. Seviye/maliyetler test denge değerleridir.
- Gerçek Chromium set_content tıklamaları: sahiplik, izinsiz kuşanma, kilit, çift satın alma, geçersiz kimlik, normalizasyon, yükseltme, gerçek saldırı farkı, kayıt yazımı, başarısız yazma rollback, çıkar/yeniden tak. Konsol çalışma zamanı hatası gözlenmedi. localStorage test taklidi; fiziksel Android/kalıcı kayıt doğrulanmadı.
- 360×800, 393×852, 412×915 ekranlarında iki yeni menü taşma ölçümü başarılı. Gerçek oyun HUD, karakter ve koleksiyon görselleri; 6 sınıf/cinsiyet varyantının 0/90/180 derecede 18 önizlemesi alındı ve görsel incelendi. İlk pelerin ve kanat katmanları basit; mevcut pelerinlerle arka görünümde üst üste gelebilir. Tam kostüm modelleri, tüm yönlerde savaş/ölüm animasyonu, binek çakışması ve uzun doğal oyun performansı açık. Nihai tamamlandı işareti yok.
- Sıradaki ileri gelişim önceliği: sınıf terfileri / yetenek sistemi ve ardından kader/kule, meridyen, ruh ve ilahi donanım; mevcut listede tanımlı bağımlılık sırası ve görsel kabul korunacak. Gerçek sunucu gerektiren sistemler yerel sahte olarak etkinleştirilmez.


## 3.135 TEST — Sınıf terfileri ve yetenek ağacı (2026-11-26)
- 3.134 üzerinden tek HTML ZIP: Kirik_Muhur_3_135_Sinif_Terfi_Yetenek_TEST.zip (40.659.434 bayt, SHA256 3f2f3708a87d65ee0a5149a3f579b18c52eae5c9338ecc1175ae15ee8afed3ef). JS sözdizimi ve ZIP CRC başarılı; ZIP depoya yüklenmedi.
- Kahraman/Karakter üstünde terfi kısayolu, Beceri üstünde yetenek ağacı kısayolu. Ayrı terfi ve yetenek ekranı, mevcut HUD korunur. Dokuz sıra: Sv15/30/60/100/150/200/300/400/500; ilk üçünde 6/10/16 ana görev, sonrakilerde mevcut 16 görev tamamlanmalı. Her terfi +6 saldırı/+4 savunma/+30 can. Sınıf isimleri üç aşamalı, temel sınıf/animasyon ve silah kimliği değişmez.
- Her 5 seviyede bir puan, toplam 45; üç pasif dal, her biri en fazla 15 puan, terfiyle açılan dal kapasitesi; puan başına +3 saldırı/+2 savunma/+15 can. Onaylı ücretsiz puan iadesi; karakter XP veya para harcamaz. Mevcut kayıt anahtarına master135 eklenir; eski kayda varsayılanlar, sınır normalizasyonu, yazma hatasında rollback.
- Gerçek Chromium UI tıklamaları: kilitli terfi, ilk terfi, gerçek stat artışı, sonraki terfi kilidi, üç puan dağıtımı/iade, kayıt alanı, geçersiz kimlik, rollback, Sv500 kontrollü 9/9 terfi ve 45/45 puan, XP değişmemesi. Konsol hatası yok. 360x800/393x852/412x915 ekranlarında yatay taşma yok; terfi listesi dikey kaydırmalı. Görseller gerçek render, localStorage bellek taklidi; Sv500 doğal oynanış testi değil. Fiziksel Android, gerçek kayıt, yeni terfi modelleri/özel becerileri, ileri hikaye/ustalık sınavları ve denge açık. K11/K18 kısmi; tamamlandı işareti yok.
- Sıradaki öncelik: kader/kule, sonrasında meridyen, ruh ekipmanı ve ilahi donanım; mevcut sıra korunacak.


## Kullanıcı kararı — 3.136 sonrası öncelikli görsel revizyon
Kung Fu Saga ana görsel referans; özgün Kırık Mühür sanat dili. Önce mevcut ekranları olgunlaştır, ardından ileri mekaniklere dön. Çalışan oyun motoru, dinamik joystick, kayıt ve otomatik görev korunur. Kaynak ekranlar: https://www.malavida.com/en/soft/avatars-saga/android/ ; https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-beginner-guide-en.html ; https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-classes-guide-en.html .
- [ ] V01 HUD, portre, görev, alt menü, simge ailesi ve kahraman sahnesi. 3.137 ilk CSS görsel geçişi; 20 özgün SVG ikon, altın/yeşim çerçeve, görev ve harita, temalı kahraman önizlemesi. Gerçek Chromium ekranları 360x800/393x852/412x915, joystick bas/sürükle/bırak/iptal, otomatik rota dönüşü, menü geçişleri ve yatay sınırlar test edildi; konsol hatası yok. Kahraman ekranında dikey kaydırma var. JS blokları 3.136 ile birebir aynı; fiziksel Android ve gerçek kalıcı kayıt testi açık. Nihai sanat kabulü yok.
- [ ] V02 Köy, orman, tapınak, zemin, dekor, derinlik ve ışık. Yeni temalı özgün dünya varlıkları; gerçek ekran/performance kontrolü.
- [ ] V03 Karakter, silah, kostüm, kanat ve terfi görünümü. Altı varyant, yön ve animasyon çakışması kontrolü.
- [ ] V04 Çanta, Demirci, mücevher/set, pet/binek, kostüm/kanat, beceri/terfi ekranlarının ortak sanat dili ve ayrı içerik sunumu.
- [ ] V05 Boss/zindan/arena/etkinlik ekranları ve savaş/ödül görselleri. Mevcut mekanik regresyonu.
- [ ] V06 Android cihaz, FPS, taşma, dokunma ve kayıt testi; ardından kader/kule, meridyen, ruh ve ilahi donanım sırasına dön.
3.137 ZIP: Kirik_Muhur_3_137_Gorsel_HUD_Kahraman_TEST.zip, 40.664.317 bayt, SHA256 d6b164a6b8cacc476d8c81dbdb9d008acec55d3c49cd2f378f504bfefca05e66; ZIP CRC başarılı. Bu commit yalnız liste ve test kayıtları; ZIP depoya yüklenmedi. Dünya ve model varlıkları bu aşamada değişmedi.


## Görsel çizgi koruma — bağlayıcı kullanıcı kararı (2026-11-26)
- Kırık Mühür için depodaki mevcut, kullanıcı tarafından kabul edilmiş görseller birincil sanat referansıdır. Her yeni karakter, çevre, dekor, kostüm, kanat, silah, ikon, HUD ve panel önce ilgili mevcut varlıklar ve gerçek oyun ekranları ile karşılaştırılır.
- Mevcut 2.5D/piksel sanat dili, perspektif, oran, siluet, çizgi/kenar karakteri, renk paleti, ışık-gölge, malzeme ve süsleme dili korunur. Kalite, detay, netlik ve kompozisyon artırılır; farklı bir sanat stiline geçilmez. Mevcut onaylı varlıklar izinsiz değiştirilmez/silinmez.
- Kung Fu Saga mekanik, menü düzeni, içerik ve kalite standardı için referanstır; görsel stil kopyalanmaz, Kırık Mühür'ün özgün kimliği korunur. Kaynak görsel yolu ve önce/sonra gerçek render kanıtı her görsel değişiklikte kaydedilir.
- /GÖRSEL-DENETİM: Stil uyumu, taşma, hizalama, renk, karakter/dekor ölçeği, animasyon, katman ve performans kontrolü zorunludur. Uyum kanıtlanmazsa nihai kabul verilmez; ana sürüm değiştirilmez. Gerçek cihaz testi yoksa açıkça belirtilir.
- Güncel hareket kararı: 3.136 dinamik joystick, sol boş oyun alanında dokunulan noktada belirir, bırakınca kaybolur; otomatik görev rotası devam eder. Bu hüküm 14. bölümdeki manuel hareket yasağının yalnız joystick kısmını günceller; çiçek menüsü ayrı, diğer otomatik kurallar geçerli.


## 3.138 TEST — Mevcut sanat çizgisinde çevre detayları (2026-11-26)
- 3.137 ZIP'teki mevcut KayKit KM369 (köy), KM354 (orman), KM356 (tapınak/kül) modelleri yeniden kullanıldı; yeni stil, doku veya model üretilmedi. Depodaki kaykit-archive/assets/kaykit-archive/README.md kaynak envanteri var ancak orijinal kaynak ZIP'leri arşiv dalında bulunmuyor.
- Kaynak zemin rengi, geçit/NPC mesafesi, mevcut dekor ve çarpışma sınırı gözetilerek yalnız görsel katmana 136 köy, 195 orman, 31 tapınak, 24 kül geçidi dekor örneği eklendi. Sabit önbellek; bölge değişiminde eski katman serbest bırakılır. Oyun mekanikleri, çarpışma verileri, kayıt ve HUD aynı.
- Dört bölge gerçek Chromium önizlemesi alındı; aynı sahnede yalnız ek katman kapatılarak önce/sonra kıyaslandı. Görsel fark kademeli, özellikle tapınak ve kül geçidinde sınırlı. V02 nihai kabul değil. Dinamik joystick ilk bölge geçişi testinde örnek dokunma noktası kabul edilmedi; temiz başlangıç regresyonunda 360x800, 393x852, 412x915, bas/sürükle/bırak/iptal, otomatik rota dönüşü ve modal açılışı geçti, JS konsol hatası yok. Fiziksel Android/FPS/kalıcı kayıt ölçülmedi.
- Paket: Kirik_Muhur_3_138_Cevre_Stil_Koruma_TEST.zip, 40.665.240 bayt, SHA256 8c360bcef087f4621f66168fbeccdf17d28b538c20d09de31366a9749329765e. ZIP CRC ve JS sözdizimi başarılı. ZIP depoya yüklenmedi. Sonraki: V02 çevre kompozisyonu ve yapı/ışık derinliği; V03 mevcut sanat çizgisinde karakter/ekipman kalitesi.


## 3.139 TEST — Görevlerin kategori ve otomatik rota ayrımı (2026-11-26)
- Kullanıcı kararı: tüm içerikler otomatik görev menüsüne yığılmayacak. Kung Fu Saga ana/yan görev ayrımı referans: https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-beginner-guide-en.html ; https://gamingonphone.com/guides/avatars-saga-beginners-guide-and-tips/ .
- Ana görev ve NPC yan görevleri ayrı sekmeler; HUD tek aktif rota ve kompakt yan görev kısayolu. Gelişim avı Gelişimde, günlük sefer Etkinlik > Sefer sekmesinde, XP içerikleri kendi mücadele kategorilerinde. Ana hikâye otomatik, yan görev seçilince ana rota duraklar. Hikâye sonrası her sefer açıkça seçilir; mevcut başlamış sefer korunur. Günlük 3 hak ve ödüller değişmedi. Görsel stil ve kayıt anahtarı korunur.
- Gerçek Chromium: ana/yan sekmeler, yan rota seçimi ve ana rotaya dönüş, gelişim kilidi, günlük sefer onayı, kontrollü NPC teslimi ve sonraki seferin otomatik başlamaması, günlük hak sınırı; 360×800/393×852/412×915 yatay taşma ölçümü geçti, konsol hatası yok. Görsel denetimde Sefer kartı ayrı sekmeye taşındı. Joystick regresyonu süre aşımı nedeniyle tamamlanamadı; fiziksel Android ve kalıcı kayıt testi açık. Tam doğal hikâye/yan görev akışı yeniden oynanmadı. K09/K16 kısmi, nihai kabul değil.
- Paket: Kirik_Muhur_3_139_Gorev_Kategori_Duzeni_TEST.zip; 40.668.444 bayt; SHA256 e907176a43e1e18bf96debf6a96e5e39de54364d0bd696da319d19e0d854f37e. ZIP CRC ve JS sözdizimi başarılı. ZIP depoya yüklenmedi. Sonraki görsel ve mekanik denetimde görev kategorileri korunacak.


## 3.140 TEST — Görev takip motoru, fonksiyon ayrımı ve görsel denetim (2026-11-26)
- Kullanıcı talebi: Kung Fu Saga görev fonksiyonları ve düzeni referans alınacak, içerik kategorileri ayrılacak, mevcut görsel çizgi korunacak. Referans: https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-beginner-guide-en.html ; https://gamingonphone.com/guides/avatars-saga-beginners-guide-and-tips/ ; https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-features-guide-en.html .
- Kök neden: ana görev progress/kill/collect/deliver fonksiyonları yan görev sırasında da çalışıyordu; seçili yan görev kayıt alanı yoktu. Ana ilerleme yan görev, gelişim avı ve manuel harita rotası sırasında duraklatılır. Otomatik yan görev sayaçları yalnız seçili göreve aittir; NPC kabul/teslim mesafesi 62 birim; seçili görev track140 alanında mevcut kayıt anahtarıyla saklanır ve doğrulanarak geri yüklenir. Ana görev/yan görev hedefi mini harita ve dünya haritasında aynı veriden gösterilir. Eski ana görev balonu ve gelişim önerisi yan rota sırasında gizlenir. Ödül ekranında üst üste binen seviye bildirimi kapatılır; ödüldeki seviye ve güç bilgisi korunur.
- Test: Chromium set_content, kontrollü hızlandırılmış gerçek tick motoru ile ilk ana görev (NPC, ormana geçiş, savaş, geri dönüş, tek ödül, sonraki görev başlangıcı) ve Fener Yağı yan görevi (kabul, iki toplama, NPC teslimi, tek ödül) tamamlandı; ana ilerleme korundu. Seçili yan görev kaydet/restore, iki ortak toplama noktasının ayrımı, yanlış NPC mesafesi, geçersiz takip, harita işareti, 360x800/393x852/412x915 yatay taşma, dinamik joystick bas/sürükle/bırak/iptal ve rota dönüşü geçti. Son görsel düzeltme sonrası ilk ana görev tekrar geçti; yan görev tekrar koşusu süre aşımı nedeniyle tamamlanmadı (önceki aynı sürüm kodunda geçti). localStorage bellek taklidi, fiziksel Android ve kalıcı gerçek depolama açık.
- Paket: Kirik_Muhur_3_140_Gorev_Takip_Motoru_TEST.zip, 40.669.550 bayt, SHA256 5d6b6ee71c1f3ab2755c94c665186dbb36f23e92440fa768662110888a09d4b7. JS sözdizimi ve ZIP CRC başarılı. ZIP depoya yüklenmedi.
- [ ] Q01 16 ana ve 12 NPC yan görevin tamamını doğal oynanışta ayrı ayrı doğrula; kilitler, bölge geçişleri, görev türleri, savaş, teslim, kayıt/yeniden giriş.
- [ ] Q02 Görev ödülü ve seviye/gelişim açılışları, aynı anda modal/uyarı çakışması; tüm görev türlerinde tek ödül.
- [ ] Q03 Görev takip işaretleri, doğru hedef/NPC, ölüm/dirilme, joystick ve zindan/arena sonrası doğru göreve dönüş; gerçek Android.
- [ ] Q04 İleri hikaye ve 1–500+ doğal ilerleme, XP kaynakları ve kilit dengesi; mevcut liste sırasını koru. Q01–Q03 nihai kabulü olmadan görev motorunu tamamlandı sayma; görsel V02–V06 ve kader/kule, meridyen, ruh, ilahi donanım işleri listede açık kalır.


## 3.140 derin referans denetimi — görsel ve işlevsel kabul kuyruğu (2026-11-26)
Kullanıcı: Kung Fu Saga'nın gerçek düzenine ve fonksiyonlarına derin bak; kendi mevcut KayKit/2.5D çizgisinden çıkma. Kaynak ekranları: https://cdn-www.bluestacks.com/bs-images/AvatarsSaga_Guide_BeginnersGuide_EN4.jpg (pet), https://cdn-www.bluestacks.com/bs-images/AvatarsSaga_Guide_BeginnersGuide_EN5.jpg (savaş/kule), https://cdn-www.bluestacks.com/bs-images/AvatarsSaga_Guide_BeginnersGuide_EN6.jpg (görev), https://cdn-www.bluestacks.com/bs-images/AvatarsSaga_Guide_ClassesGuide_EN7.jpg (beceri). Kaynak işlev: https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-beginner-guide-en.html ; https://medium.com/@anonnftgroup/kung-fu-saga-beginner-guide-part-3-first-skytower-fate-chest-and-the-forge-80b5d3f8a05a ; https://medium.com/@anonnftgroup/part-4-of-the-kung-fu-saga-beginner-series-2fe77ab0b97a . Referans ekranı aynen kopyalanmaz; ücretli/VIP sistemleri eklenmez. 
- Gerçek 3.140 Chromium, 360×800, kontrollü Sv18/hikâye11, localStorage bellek taklidi. 10 ekran açıldı (karakter, çanta, beceri, pet, demirci, boss, zindan, arena, etkinlik, gelişim); konsol hatası ve yatay taşma yok. Karakter 1051/776, beceri 1116/776, pet 1000/776, etkinlik 838/776 içerik/viewport yüksekliği. Bu ekran denetimidir, gerçek oyun fonksiyonlarının tamamının testi değildir.
- [ ] R01 HUD: aynı görev metni üst uyarı/sol takip/günlük alanında tekrar ediyor. Tek etkin takip kartı, kısa süreli bildirimler, açılır günlük, mevcut çiçek ve dinamik joystick korunur. Gerçek XP göstergesi, savaşta hedef/HP/beceri hazır-bekleme durumunun doğrulanması; kilitli beceri göstergeleri anlaşılır. Üç mobil boyut ve tüm rota durumları. Q01–Q03 ile birlikte.
- [ ] R02 Görev: seçilen hedef, NPC, gerçek sayaç, ödül ikonları, git/teslim/takip ve tamamlandı durumu; ana/yan/sefer kategorileri ayrı. Görevler sadece av/toplama değil, mevcut ekipman geliştirme, pet/binek açılışı, kule ve hikâye zindanı gibi gerçek işlevleri başarı koşulu olarak kullanmalı; tek ödül, otomatik savaş ve giriş onayı. Mevcut 16+12 görev testi, sonra genişleme; önceki XP izin tablosu korunur. 
- [ ] R03 Kahraman ve çanta: mevcut altı yuva/84 çanta/depo ve yuva yükseltme fonksiyonları korunur; karakter model alanı, ikonlu ekipman, karşılaştırma, seçili eşya ve gerçek güç farkı; sahte bonus yok. Sık kullanılan demirci/pet erişimi ve sabit geri dönüş; uzun listeyi böl. 
- [ ] R04 Beceri: mevcut 4 beceri, gerçek mana/cooldown, yükseltme ve 3 saldırı becerisinin otomatik sırası var. Seçili beceri büyük ikon/etki, açık-kilitli durum, kullanım sırası ilk ekranda görünür, dokunma/uzun basma anlaşılır; fonksiyonlar sınıf bazında savaşta test edilir. Yetenek ağacı korunur. 
- [ ] R05 Pet/binek: ayrı sekmeler zaten var; Sv18 pet ekranında blok piksel prototip ikon görünüyor. Depodaki mevcut görsel çizgiyle gerçek model/animasyon önizleme, sahiplik, çağır/bin/çıkar, mevcut-sonraki stat, beceri açılışı, kaynak ve upgrade tıklaması. 32px prototip çizimleri yerine mevcut oyun varlıkları; yeni stil veya sahte koleksiyon yok. Kostüm ve kanat aynı kalite standardına alınır.
- [ ] R06 Mücadele: boss, zindan, arena ve etkinlik ayrı kalır. Gerçek denetimde Solo Arena, hikâye/ekipman/kaynak zindanı hazırlanıyor; oynanabilir XP içerikleri ve bosslar mevcut. Yerel dünya bossu gerçek çevrim içi değildir. Oynanabilir kartları öne al, kilitli ve planlananı açık ayır. Gerçek giriş, hedef, süre, ödül, savaş sonucu ve doğru kategoriye dönüş. Kule/kader işlevi, ilerideki zindanlar liste sırasına göre; sunucu yoksa PvP/lonca işlevi etkinleşmez.
- [ ] R07 Uzun oyun: 16 ana görevle biten hikâye kapsamı yetersiz; mevcut seviye 999 teknik sınırı içerik değildir. Erken/orta/ileri seviyelerde açılışlar, bölüm görevleri, gerçek ödül kaynakları, yeni bölgeler, kule/kader, meridyen, ruh, ilahi donanım; 1–500+ doğal ilerleme ve kaynak ekonomisi doğrulanmalı. Kung Fu Saga'nın kesin son seviye sınırı teyit edilmedi.
- Uygulama sırası: R01–R02/Q01–Q03 ilk; R03–R05 görsel ve işlevsel menü yenilemesi; R06 mücadele; R07 ileri içerik. V02–V06 ve eski tüm açık maddeler korunur. Her adım gerçek render ve işlev testi, fiziksel Android kabulü ayrı. Bu kayıt denetim ve öncelik güncellemesidir; 3.140 oyun kodu/ZIP değiştirilmedi.


## Dış ve iç düzen birlikte referans alınacak — kesin kullanıcı kararı (2026-11-26)
Kung Fu Saga'nın hem açık dünya/HUD yerleşimi hem açılan ekranların iç organizasyonu gerçek ekran görüntülerinden incelenir. Yalnız dış ikonları veya çerçeveleri değiştirerek görev tamamlandı sayılmaz. Kaynaklar: https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-beginner-guide-en.html ; https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-classes-guide-en.html ; https://www.malavida.com/en/soft/avatars-saga/android/ ; https://avatars-saga.en.uptodown.com/android .
- Dış düzen: dikey sahne, portre/seviye/can ve kaynaklar, harita, tek etkin görev takip alanı, mücadele/gelişim girişleri, beceri/durum göstergeleri ve dinamik joystick; sahne merkezi açık kalacak. Çiçek hızlı menüsü korunur. Görev bilgisi tekrar edilmez; sohbet ve etkinlik içerikleri kendi kategorisinde.
- İç düzen: her kategoride başlık/geri dönüş, uygun alt sekmeler, büyük gerçek karakter/pet/binek önizlemesi, ikonlu ekipman yuvaları ve çanta ızgarası, seçili beceri ayrıntısı ve otomatik kullanım sırası, gerçek mevcut/sonraki özellikler, kaynak/maliyet, kilit/açılma şartı ve görünür eylem. Boss/zindan/arena girişleri ayrı; süre, hak, ödül, sonuç ve dönüş. Her ekranda gereksiz dikey kaydırma ve tekrar azaltılır; aktif işlevler öncelikli, hazırlananlar açıkça belirtilir.
- R01–R07 ve Q01–Q04 mevcut sıra ve açık durumları korunur. Her ekran için dış giriş → iç alt sekme → gerçek işlev → sonuç → doğru geri dönüş zinciri test edilir. 360×800, 393×852, 412×915 gerçek render, dokunma, taşma, katman, görev/otomatik rota ve kayıt regresyonu; fiziksel Android kabulü ayrı. Mevcut GitHub sanat çizgisi birincil; Kung Fu Saga görselleri kopyalanmaz. Bu kayıt bir tasarım ve kabul kuralıdır, kod değişikliği değildir.


## 3.141 — Tam oyun referans matrisi ve ilk dış/iç düzen uygulaması (2026-11-26)
Kullanıcı: Kung Fu Saga bütün oyun için ana referans; gerçek ekranlar ve fonksiyonlar tek tek incelenecek. Mevcut özgün KayKit/2.5D çizgisi, otomatik görev, dinamik joystick, çiçek ve kayıt korunur. Bu matris R/Q/V ve önceki listenin alt kabul kuyruğudur; eski işler silinmez. Kaynaklar: https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-beginner-guide-en.html ; https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-classes-guide-en.html ; https://www.malavida.com/en/soft/avatars-saga/android/ ; https://medium.com/@anonnftgroup/kung-fu-saga-beginner-guide-part-3-first-skytower-fate-chest-and-the-forge-80b5d3f8a05a ; https://medium.com/@anonnftgroup/part-4-of-the-kung-fu-saga-beginner-series-2fe77ab0b97a ; https://apps.apple.com/tr/app/kung-fu-saga-martial-path/id1660688865 . Erken oyun kaynaklarında ekipman yükseltme görevleri, hikaye zindanı, kanat ödülü ve kule/kader bağlantısı doğrulanıyor. Resmi sürüm geçmişinde ileri boss setleri, savaş ruhu, meridyen ve yetenek sistemleri var; bütün ileri ekranların iç düzeni ve canlı fonksiyonları doğrudan oynanarak doğrulanmadı. Kesin son seviye bilinmiyor.
- [ ] M01 Karakter seçimi: mevcut 3 sınıf/6 varyant; model, cinsiyet, silah, isim, önizleme, giriş/kayıt. Referans görselde büyük model, sınıf seçim ikonları; sınıf sayısını otomatik kopyalama.
- [ ] M02 Dış HUD: portre, HP/MP/XP, para, harita, bölge, tek görev takip kartı, açılır günlük, geçici bildirim, açılır menü; savaş/görev anında örtüşme, parmak hedefleri.
- [ ] M03 Dünya/harita: kamera, yakın/uzak dekor, yollar, NPC, hedef işareti, bölge geçişi; doğru rota, kilit, çarpışma, FPS.
- [ ] M04 Ana/yan görev: kabul, takip, savaş/toplama, NPC teslim, ödül ve sonraki görev; 16+12 gerçek zincir; günlük/sefer ayrı.
- [ ] M05 Görev içerik çeşitliliği: gerçek ekipman yükseltme adedi, pet/binek, kanat ödülü, hikaye zindanı ve kule başarısı; mevcut veri üzerinden başarı, sahte sayaç yok.
- [ ] M06 Kahraman: büyük mevcut model, ekipman yuvaları ve güç; seçili eşya ve karşılaştırma, terfi/özellik ayrı.
- [ ] M07 Çanta/depo: ızgara, doluluk, tür sekmeleri, düzenle, kuşan, parçala, depoya aktar ve geri al; eşya kaybı/çift ödül yok.
- [ ] M08 Demirci: ekipman ikonları, mevcut/sonraki istatistik, maliyet, kademe sınırı, tek/çok geliştirme yalnız gerçek mekanik varsa; yuva kaydı korunur.
- [ ] M09 Mücevher/set: seçili yuva, taş stoğu, birleştirme, tak/çıkar, 2/4/6 bonus gerçek stat; ayrı sekme.
- [ ] M10 Beceriler: seçili ikon/büyük ayrıntı, kilit, mana, cooldown, gerçek yükseltme, oto sıra/aç-kapat; savaşta sınıf bazında tekrar test.
- [ ] M11 Terfi/yetenek: koşul ve gerçek bonus, puan dağıtım/iade, uzun ilerleme dengesi.
- [ ] M12 Pet: gerçek mevcut model, sahiplik/çağır/çıkar, geliştirme, beceri, stat, malzeme, savaş etkisi.
- [ ] M13 Binek: gerçek model, bin/in, hız, geliştirme, görünüm, karakter katman çakışması.
- [ ] M14 Kostüm/kanat: ayrı koleksiyon, sahiplik, kuşan/çıkar, gerçek görünüm, gelişim ve animasyon; kendi sanat çizgisi.
- [ ] M15 Boss: tür, kilit, hak, süre, ödül, savaş/sonuç/dönüş. Gerçek sunucu olmadan ortak dünya bossu iddiası yok.
- [ ] M16 Zindan: hikaye, XP, kaynak, ekipman; açık olanlar önde, giriş onayı, dalga/süre, tek ödül, dönüş.
- [ ] M17 Arena: XP PvE ayrı, normal PvP gerçek sunucu gerektirir; süre, sonuç, hak ve sıralama.
- [ ] M18 Kule/kader: kat seçimi, güç, süre, ilk zafer, gerçek kader parçası/yuvası ve bonus; ilerleyen katlar.
- [ ] M19 Etkinlik: günlük, takvim, sefer, haftalık, giriş ve ödül; günlük reset, hak, tek ödül; gerçek zamanlı olanlar ayrı.
- [ ] M20 İleri gelişim: meridyen, ruh, ilahi silah, koleksiyon, ileri boss seti ve bunların gerçek kaynak döngüsü; önceki liste sırası.
- [ ] M21 Sosyal/lonca/pazar/hesap: menü düzeni, sunucu gerektiren işlevler açıkça kilitli; sahte kullanıcı veya online simülasyon yok.
- [ ] M22 Uzun oyun: 1–500+ plan, görev zinciri, yeni bölgeler, XP kaynakları, ekonomi ve tekrar oynama; seviye sınırı içerik değildir.
- [ ] M23 Sistem/cihaz: ölüm, dirilme, ara verme, geri dönüş, kayıt/yükleme, offline, ekran ve FPS; gerçek Android kabulü.
3.141 uygulaması: dış HUD'da sürekli açık günlük başlıktan açılır/kapanır hale geldi; kalıcı açılış önerisi teaser HUD'dan gizlendi, mevcut görev/gelişim koşulları korunuyor. İç beceri ekranında dört ikonlu seçim, seçili tek kart, otomatik sıralama ve ayrı aç/kapat, üstte mevcut geri dönüş düğmesi; eski upgrade/auto/save fonksiyonları kullanıldı. 360x800 eski beceri içeriği 1116/776, yeni 826/776; 393x852 ve 412x915 içerik 799, tamamen sığdı; tüm üçünde sıra kontrolleri görünür, yatay taşma yok. Gerçek Chromium dokunma testinde günlük aç/kapat, dört seçim, şifa yükseltme, otomatik beceri aç/kapat, sırayı öne alma ve kategori dönüşü geçti; konsol hatası yok. localStorage bellek taklidi, savaş ve joystick regresyonu ve fiziksel Android tekrar test edilmedi. M02/M10 kısmi, diğerleri önceki durumunda; nihai kabul yok. ZIP: Kirik_Muhur_3_141_Dis_Ic_Duzen_Beceri_TEST.zip, 40.674.673 bayt, SHA256 0981be254b199561f5a0bc9fc9ff264040592e3c9f0129ac82cb5469aa0bee4b. CRC ve JS syntax başarılı. ZIP depoya yüklenmedi. Sıradaki M02/M04 ve R02/Q01-Q03, ardından M06–M09, M12–M14; ileri işler unutulmaz.
