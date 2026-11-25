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
