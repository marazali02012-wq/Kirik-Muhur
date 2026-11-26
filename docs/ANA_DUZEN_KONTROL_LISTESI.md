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


## Kung Fu Saga — Web ve sosyal medya görsel kaynak kataloğu (2026-11-26)
Kullanıcı talebi: Facebook, Instagram ve web'deki gerçek oyun ekranları dış/iç düzen için taranacak. Aşağıdaki bağlantılar araştırma referansı; üçüncü taraf görselleri oyun varlığı olarak kopyalanmayacak. Mevcut KayKit/2.5D çizgisi ve M01–M23 öncelikleri korunur.
| Kontrol | Doğrudan görsel / kaynak | Uygulanacak düzen |
|---|---|---|
| M02/M15/M18 | https://cdn-www.bluestacks.com/bs-images/AvatarsSaga_Guide_BeginnersGuide_EN5.jpg | Üst portre/kaynaklar ve hedef canı, kenarda hedef/ödül, merkez savaş, süre/çıkış, alt beceri hazır-bekleme ve menüler |
| M04/M05 | https://cdn-www.bluestacks.com/bs-images/AvatarsSaga_Guide_BeginnersGuide_EN6.jpg | Tek görev ayrıntısı, hedef sayacı, ikonlu ödül, git, ana/yan sekmesi; görev seçimi gerçek rotayı değiştirmeli |
| M12/M13 | https://cdn-www.bluestacks.com/bs-images/AvatarsSaga_Guide_BeginnersGuide_EN4.jpg | Büyük pet modeli, derece/yıldız, beceri ikonları, malzeme stoku, mevcut-sonraki stat, görünüm/çağırma ve geliştirme, ayrı pet/binek sekmeleri |
| M06/M07 | https://imag.malavida.com/mvimgbig/download-fs/avatars-saga-36977-10.jpg | Ortada model, çevresinde gerçek donanım yuvaları, güç, çanta/depo ayrımı, mevcut yuva sayısı korunur |
| M10 | https://cdn-www.bluestacks.com/bs-images/AvatarsSaga_Guide_ClassesGuide_EN7.jpg | Seçili beceri ve etkisi, ikonlu açılış seviyeleri, otomatik sıra, pasif/aktif ayrımı |
| M01 | https://cdn-www.bluestacks.com/bs-images/AvatarsSaga_Guide_ClassesGuide_EN8.jpg | Büyük sınıf modeli, sınıf/cinsiyet seçimi ve temalı önizleme |
- Görsel kaynak sayfaları: https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-beginner-guide-en.html ; https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-classes-guide-en.html ; https://www.malavida.com/en/soft/avatars-saga/android/ ; https://foxdata.com/en/app-marketing-analytics/com.rxsjus.an.watt/gp/RU/ (21 mağaza görseli listeleniyor; tümü incelenmiş veya gerçek UI olarak kabul edilmiş değil).
- Türkçe oynanış video kaynakları (sayfaları bulundu, tüm kareleri izlenmedi): https://www.youtube.com/watch?v=u8qcm1qmMCs ; https://www.youtube.com/watch?v=mUYj-jBDk3E . Resmi kanal: https://www.youtube.com/channel/UCXexQM1YskUwveV3fBsSSxA .
- 2026 Kasım oyuncu kayıtlarına dayalı işlev kaynakları: https://medium.com/@anonnftgroup/part-2-of-the-kung-fu-saga-beginner-series-e61cf774daeb ; https://medium.com/@anonnftgroup/kung-fu-saga-beginner-guide-part-3-first-skytower-fate-chest-and-the-forge-80b5d3f8a05a ; https://medium.com/@anonnftgroup/part-4-of-the-kung-fu-saga-beginner-series-2fe77ab0b97a . Kule ilk zafer→kader ödülü, gerçek demirci geliştirme→görev koşulu, süreli hikaye zindanı ve hikaye kanat ödülü doğrulanabilir işlev örnekleri. Referans oranları ve seviyeleri aynen alınmaz.
- Resmi Facebook bağlantısı Google Play'den doğrulandı: https://www.facebook.com/112163175117111 ; doğrudan içerik erişimi başarısız. Instagram araması yapıldı, doğrulanabilir gerçek UI gönderisi bulunmadı. Bu platformların görselleri incelenmiş sayılmayacak. Reklam çizimleri yalnız atmosfer referansı, UI veya fonksiyon kanıtı değil.
- [ ] Eksik gerçek ekran kanıtları: ayrı Demirci detayları, kader yuvası, meridyen, ruh, kostüm/kanat koleksiyonu, binek, lonca, pazar, ileri boss ve arena; bulunmadan kesin referans düzeni iddiası yok. Her yeni kanıtta ilgili M/R/Q maddesi, gerçek ekran ve fonksiyon ayrı kaydedilecek. Bu güncelleme kaynak kataloğudur; oyun kodu değişmedi.


## Sosyal topluluk taraması — ileri sistem adayları (2026-11-26)
- Açık Reddit topluluğu https://www.reddit.com/r/AvatarSaga/ eski Avatars Saga adıyla bulundu. Oyuncu bildirimleri: Sv260 yeşim açılışı, Sv200 üçüncü sınıf değişimi, Evil Sovereign etkinliği, Peak Duel, Merit/Valiant Token, kanat dönüşümü geri alma, etkinlik eşyalarının sonraki etkinliklerde kullanımı, sunucu birleşimi. Bunlar güncel kesin oyun kuralları değil, doğrulanacak referans adaylarıdır. Kader birleştirme/sıfırlama tartışması: https://www.reddit.com/r/AvatarSaga/comments/14q3ylp/fates_reset/ . Yeşim erişim tartışması: https://www.reddit.com/r/AvatarSaga/comments/1l8g0y8/level_260_unlock/ .
- M18/M20/M22: kader birleştirme ve güvenli sıfırlama, yeşim gelişimi, liyakat ve kendi jeton kaynağı; kanat görünümünü geri alma M14; etkinlik zaman/ödül/nesne süreleri M19; Peak Duel ve Evil Sovereign M15/M17; gerçek sunucu birleşimi M21 yalnız altyapı kurulduğunda değerlendirilir. Mevcut M01–M23 ve R/Q/V öncelikleri değişmez. Önce mevcut işlevlerin doğrulanması; gereksiz yeni mekanik eklenmez.
- Oyuncu şikayetleri (tekil deneyimler): açılan sistemin nereden erişileceğinin belirsizliği, terfi malzemesi kıtlığı, kader sıfırlamanın bulunamaması, dönüşümden geri dönme zorluğu, boş sunucular. Tasarım kontrolü: açılan menüye yönlendirme, açık kaynak bilgisi, çözümsüz kilit olmaması, geri dönüş işlevleri. https://www.reddit.com/r/AvatarSaga/ ve https://www.taptap.io/app/292129 .
- Resmi Discord https://discord.gg/KDRAzCd4kS davet sayfası açıldı ancak kanal içerikleri okunamadı. Facebook https://www.facebook.com/KFsagaglobal ve https://www.facebook.com/avatarsagaglobal erişim engeli; kapalı gruplar incelenmedi. Bu araştırmada yeni sosyal medya UI ekran görüntüsü doğrulanmadı. Oyun kodu/ZIP değiştirilmedi.


## Kullanıcının doğrudan Kung Fu Saga ekran arşivi (2026-11-26)
150 ekran görüntüsü, orijinal ZIP 177.146.168 bayt, CRC başarılı. Orijinal JPEG'ler korunarak 7 ayrı ZIP hazırlandı; tümü 29 MB altında. [Arşiv ana dalı ve bağlı 7 parça](https://github.com/marazali02012-wq/Kirik-Muhur/tree/referans/kung-fu-saga/referanslar/kung-fu-saga) ve [ilk detay/fonksiyon incelemesi](https://github.com/marazali02012-wq/Kirik-Muhur/blob/referans/kung-fu-saga/referanslar/kung-fu-saga/EKRAN_INCELEMESI.md). Dallarda indeks, dosya adları, görsel aralığı ve SHA256 kayıtlı; ikili ZIP aktarımı henüz yapılmadı (bağlantı yerel dosya kabul etmiyor). Depo herkese açık; hesap ve sohbet bilgileri yüklemeden önce kontrol edilmeli. 150 önizleme tarandı, tüm küçük yazıların birebir okunması ve işlevlerin canlı doğrulanması henüz tamamlanmadı. Özellikle M02/M04/M05, M06–M09, M18/M19 için ekran kanıtları mevcut. Oyun kodu değiştirilmedi; mevcut 3.141 ve özgün sanat çizgisi korunur.


## 3.142 — Kullanıcının 150 ekran referansı ve gerçek gelişim hedefleri (2026-11-26)
[001–150 tek tek ekran incelemesi, dış/iç düzen ve ileri sistem listesi](https://github.com/marazali02012-wq/Kirik-Muhur/blob/referans/kung-fu-saga/referanslar/kung-fu-saga/150_EKRAN_TAM_INCELEME_VE_UYGULAMA.md). Tüm 150 görsel numaralı önizlemelerde yeniden incelendi; küçük yazıların birebir transkripsiyonu ve ileri ekranların canlı testleri bitmedi. 001 duyuru iç zırh 17. aşama, renkli 5 yıldız canavar ekipmanı, kutsal silah 7. aşama, ruh/kostüm ve antik hazine gibi ileri sistemlere doğrudan kanıt sağlar; karakter maksimum seviyesi değildir. Resmi sürüm geçmişi https://apps.apple.com/tr/app/kung-fu-saga-martial-path/id1660688865 ileri boss seti, meridyen benzeri acupoint, Warsoul, 9. sınıf değişimi, dönüşüm ve özel zindanı doğrular. Açılış seviyeleri/ekranları henüz kesin değil. M01–M23/Q/R/V öncelikleri ve kendi KayKit/2.5D çizgisi korunur.
- 3.142: 073/074/075 referansından ana görev gerçek hedef ilerleme çubuğu, ayrı üç ödül kutusu; yan görevde tekrar başlık kaldırıldı. Gelişim > Gelişim hedefleri ayrı, ana görev zincirine veya günlük görev sayacına eklenmez. 2 kuşanılmış yuva +3 ve +10, gerçek DEF 100 olmak üzere 3 isteğe bağlı hedef; test ödülleri 90/8,300/20,150/12 altın/toz. XP verilmez. Gerçek yuva/stat okunur; eski kayıt anahtarı ve questRewards içinde goal3142 kimliği; strict save, başarısızlık rollback, tekrar ödül engeli. Bunlar Kırık Mühür test değerleri, referansın birebir ödülleri değil.
- Chromium set_content, localStorage bellek taklidi: görev ana/yan, Demirci geçişi, gerçek km332Enhance ile iki +3 yuva, koşul yokken ödül engeli, kayıt hatası rollback, kaynak farkı, XP ve ana görev değişmemesi, tek ödül, kayıt anahtarı ve dönüş kontrolü başarılı. 360×800/393×852/412×915 hedef ekranı yatay taşma ve dikey içerik/viewport 719/719,704/704,704/704; konsol hatası yok. JS syntax ve CRC başarılı. +10/DEF100 doğal ödül akışı, 16+12 görev, gerçek cihaz/kalıcı kayıt, savaş regresyonu yeniden test edilmedi. M04/M05 kısmi; tamamlandı işareti yok.
- Paket Kirik_Muhur_3_142_Gorev_Gelisim_Hedefleri_TEST.zip, 40.673.936 bayt; SHA256 bf39dba000f4b58f7d473bf09b517866a4ed66d87c0782c1b19eadd686a1f64e. ZIP ve referans ikili dosyalar GitHub'a yüklenmedi; belgeler güncellendi. Sonraki: M02/Q01–Q03 ardından M06–M09, M12–M14. İleri kademeler araştırma listesi içinde açık.


## 3.143 TEST — Kahraman, Çanta, Depo, Demirci (2026-11-26)
- Kullanıcının 008, 013, 030 numaralı orijinal Kung Fu Saga görüntüleri doğrudan açılıp incelendi. Rol/karakter ve çanta ayrı işlevler; mevcut KayKit/2.5D varlıkları ve altı ekipman yuvası korundu. 3.142 üzerine yalnız CSS ve mevcut UI fonksiyonlarını saran düzen değişiklikleri eklendi. Motor, kayıt anahtarı ve mevcut kaynak ekonomisi değiştirilmedi.
- Kahramanda ad/savaş gücü üstte, model, gerçek XP/seviye çubuğu, üç gelişim bağlantısı (terfi/kostüm/kanat), mevcut özellikler ve ekipman/beceri erişimi; unvan/dönüşüm plan bilgileri korunuyor. Çanta 84 ve depo 72 yuva; iç ızgara kaydırması, işlem düğmeleri ve kapasite görünür. Ekipman seçimi, detay ve karşılaştırma mevcut işlev. Demirci mevcut/sonraki kademe, gerçek karşılanabilir çoklu yükseltme sayısı/toplam maliyet, yatay ekipman seçim şeridi, mücevher/set erişimi. Hazırlanan işlevler bilgi durumunda.
- Chromium set_content gerçek render, localStorage bellek taklidi, kontrollü Sv18: terfi/kostüm/kanat geçişleri, XP 350/1710, 84/72 yuva, eşya detay, kuşanılmış zırh, depoya aktar/geri al, tek ve çoklu yükseltme, +10 tavan, kayıt alanı ve görev ekranı regresyonu geçti. İlk yükseltmenin eski 65 altın/1 toz başarı ödülü maliyet testinde ayrıca hesaba katıldı (10000→10045, 1000 toz aynı). Üç ekran boyutunda yatay taşma yok; 360×800 kahramanda 19 piksel ve demirci iç alanında 17 piksel dikey kaydırma kaldı; 393×852/412×915 sığdı. JS konsol hatası yok, node syntax ve ZIP CRC başarılı.
- Paket: Kirik_Muhur_3_143_Kahraman_Canta_Demirci_TEST.zip, 40.675.824 bayt, SHA256 6dde3e53531e91e684b25c73e558e01ed10af4ea503afeee67071a8d444753f2. Oyun ZIP'i GitHub'a yüklenmedi. Fiziksel Android, kalıcı gerçek depolama, tüm sınıf/animasyon ve doğal görev/savaş regresyonu henüz yapılmadı. M06/M07/M08 kısmi; nihai kabul değil. M02/M04/Q01–Q03 açık öncelikler, ardından mücevher/set, pet/binek ve gerçek kule/kader; 150 görselin ayrıntı listesi ve ileri oyun planı korunur.


## 3.144 TEST — Kanat modeli, görünüm ve bonus düzeni (2026-11-26)
[151–154 ek kullanıcı ekranı ve web araştırması](https://github.com/marazali02012-wq/Kirik-Muhur/blob/referans/kung-fu-saga/referanslar/kung-fu-saga/151_154_EK_REFERANSLAR.md); dört ek görsel yerelde açıldı, ilk 150 liste korunuyor. M14/M06/M23/M21 alt maddeleri eklendi. Referans ekranlarında kanat set/şekil, beceri, gelişim, rol temel/üstün özellik, ayarlar sekmeleri ve çapraz sunucu haritası/saatleri var. Gerçek sunucu, hesap, PvP farm, set ve beceri mekanikleri, ayarlar yenilemesi açık; sahte kontroller eklenmedi.
- 3.144: mevcut iki kanat ve eski ekonomi/bonuslar korunarak kanat modeli / karakter üzeri önizleme, Kahraman / Kanatlar / Gelişim bağlantıları, mevcut/sonraki gerçek ATK/DEF/HP; görünüm gizleme (wingHidden) kaydı, bonus değişmez. Kayıt başarısızlığı rollback kodu mevcut; bu sürümde hata senaryosu ayrıca çalıştırılmadı. Var olan KayKit/2.5D çizgisi korunuyor; kanat çizimleri prototip seviyesinde, referans kalitesi henüz yok.
- Chromium set_content, localStorage bellek taklidi, Sv18: aç/kuşan/ gizle/göster, gizleme sırasında gerçek atk/def/maxHP eşitliği, kayıt JSON alanı, yükseltme Sv2 ve +4/+2/+16 bonus, sonraki kademe gösterimi, model/karakter sekmeleri, Kahramana dönüş geçti. Son render üç viewport 360×800/393×852/412×915 ölçümleri içerik/viewport 756/756, yatay taşma yok; konsol hatası yok. Node syntax, ZIP CRC başarılı. Gerçek Android, kalıcı depolama, savaş ve tüm sınıf yön animasyonu test edilmedi. M14 kısmi.
- ZIP: Kirik_Muhur_3_144_Kanat_Gelisim_TEST.zip, 40.677.061 bayt, SHA256 027f3780f98048b35cd0469ba812fd62775355b8ec778e0237578fbaa6402585. ZIP ve ek görseller GitHub'a ikili olarak aktarılmadı; belge eklendi. Önceki M/Q/R/V öncelikleri korunur.


## 3.145 TEST — Seviye/görev açılış yolu (2026-11-26)
Kaynak: kullanıcı arşivi orijinal 072 (Sv48 ana görev → kanat), 079 (Sv70 ana görev → ilahi silah), 123 (Sv60 → Deneme Alanı, 180 sn, 10 dalgaya kadar, 2 hak) tekrar açılıp okundu. https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-beginner-guide-en.html Sv60 ve ön hikâye → ikinci sınıf; https://medium.com/@anonnftgroup/kung-fu-saga-beginner-guide-part-3-first-skytower-fate-chest-and-the-forge-80b5d3f8a05a erken kule → kader ve Demirci; https://apps.apple.com/tr/app/kung-fu-saga-martial-path/id1660688865 ileri içerik: meridyen/bölge bossu kaynağı, Warsoul, gizli silah, 9. sınıf değişimi, dönüşüm/set, ilahi silah, mücevher tavanı 12. Bunların kesin ileri açılma seviyeleri teyit edilmedi. 150+4 ekran listesi ve özgün KayKit/2.5D çizgisi korunur.
### Mevcut çalışan Kırık Mühür eşikleri (referansın birebir seviyeleri değil)
- Başlangıç: Rol, Çanta, Demirci, temel beceri/şifa.
- Sv2 + 1. ana görev: XP Arena; Sv3: ikinci aktif beceri; Sv4 + 3. ana görev: XP Zindanı; Sv4: Mücevher/Set.
- 4. ana görev ödülü: Ruh Tilkisi; 8. ana görev ödülü: Binek; gerçek sahiplik bayrakları kontrol edilir.
- Sv5/Sv10: iki mevcut kanat için edinme uygunluğu (maliyet ve sahiplik ayrıca); Sv8: üçüncü saldırı becerisi.
- 10. ana görev: Mühür Kulesi ve ileri bosslar; kat sırası/hak/önerilen seviye mevcut motor tarafından kontrol edilir.
- Terfiler: Sv15+6 görev, Sv30+10 görev, Sv60/100/150/200/300/400/500+16 görev ve önceki terfi. Bu mevcut prototip eşiklerdir; 16 görev sonrası doğal içerik eksik, ileri seviyeler oynanışla dengelenmedi.
- Plan: kule zaferi→kader, hikâye→ilahi silah, bölge bossu→meridyen, ganimet→ruh donanımı, ileri sınav→dönüşüm, tarif→füzyon, gerçek sunucu→lonca/çapraz sunucu. Sahte açılma yok, kesin eşik henüz atanmadı.
### 3.145 kod ve kabul
Gelişim > Açılış Yolu, Sıradaki/Açık/İleri plan sekmeleri; 22 mevcut hedef gerçek level/missionIndex/petOpen/mountOpen/terfi verisinden, 7 plan ayrı. Açık hedefler ilgili menüye gider, kilitli/plan düğmeleri pasif. HUD Arena düğmesi Sv2 + birinci ana görev ve XP tavanı kontrolüne bağlı. Eski eşikler, ekonomi, kayıt ve ödüller değiştirilmedi. Sıralama pratik başlangıç önceliğidir, seviye ve görev birbirinden bağımsız.
Chromium set_content, bellek localStorage, kontrollü Sv1/4/18 durumları: iki koşullu XP zindanı kilidi, mücevher açılışı, pet/kule ve ilk terfi durumu, HUD Arena gizle/göster, gerçek Mücevher ekranına geçiş, plan düğmelerinin kilidi, gelişime dönüş, üç viewport 360×800/393×852/412×915 yatay taşma yok; konsol hatası yok. Görsel render incelendi; uzun liste dikey kaydırmalı. JS syntax ve ZIP CRC geçti. Doğal 1–500+ ilerleme, fiziksel Android, görev/savaş ve gerçek kalıcı kayıt yeniden test edilmedi. Açılış yolu kısmi, bütün oyun tamamlanmadı. ZIP: Kirik_Muhur_3_145_Acilis_Yolu_TEST.zip 40.679.504 bayt SHA256 ef694432dc6627b5c799025adf4217b768296acc6894968701c9d31643a85487; GitHub'a ikili ZIP aktarılmadı. Sıradaki: gerçek kule→kader ödülü/yuva ve tüm Q01–Q03, ardından yeni doğal hikâye bölümleri. Mevcut M/R/Q/V listeleri silinmez.


## 3.146 TEST — Mühür Kulesi → Kader (2026-11-26)
- Kullanıcının 063 ve 065 numaralı orijinal ekranları yeniden açıldı: dairesel yuvalar, kule şartı, seçili kader mevcut/sonraki stat ve maliyet, değiştir/yükselt; erit/füzyon ayrı ileri işler. Özgün KayKit/2.5D ve koyu altın/yeşim arayüz korunur.
- Mevcut 5 katlı kule ve 10. ana görev şartı değişmedi. Her ardışık ilk kat zaferi bir benzersiz kader taşına hak kazandırır. 1/3/5. katlarda 1/2/3 yuva açılır. Keskin Mühür ATK +6, Kaya DEF +4, Yaşam HP +30, Fırtına ATK +8, Kadim HP +45; taş seviyeleri 1–5, yükseltme 70*sv altın ve 6*sv ruh tozu. Bunlar özgün test denge değerleri, Kung Fu Saga birebir değerleri değil. XP/ek para ödülü yok. Kader hakkı mevcut bossLife zafer kaydından türetilir, eski kule zaferleri de korunur; aynı taş iki yuvaya takılamaz. Yeni fate146 kayıt alanı, yeni karakter sıfırlama, kaydetme hatasında geri alma. Mevcut stat hesaplamasına gerçek atk/def/maxHp eklenir. Kule lobisi/zafer ekranı/Gelişim/Açılış Yolu ile bağlantılar.
- Chromium set_content, localStorage bellek taklidi: Sv18/10 görev kontrollü başlangıç, ilk yenilgi ödülsüz, beş gerçek zindan giriş fonksiyonu ve kontrollü HP=0 ile kill handler/zafer/ödül/çıkış, tekrar finish engeli, 1/3/5 kat yuvaları, tak/çıkar/değiştir, +6→+8 ATK, maliyet, kayıt hatası rollback, yinelenen taş engeli, save/restore, eski kayıt varsayılanı, yeni karakter sıfırlama başarılı. 360×800/393×852/412×915 panel 731/731, yatay taşma yok; konsol hatası yok; Node syntax ve ZIP CRC başarılı. Ölüm animasyonu testte kontrollü atlandı. Doğal boss savaşı ve denge, gerçek Android, gerçek kalıcı depolama, tüm görevler tekrar test edilmedi. Kule zaferindeki eski save davranışı değişmedi.
- Paket Kirik_Muhur_3_146_Kule_Kader_TEST.zip 40.682.362 bayt; SHA256 aef041a352d79a7df1237ddfd44ef1af5561fc561bd7298e74acb0da9137a495. ZIP GitHub'a yüklenmedi. M18 kısmi: erit/füzyon, ileri katlar, taş kalitesi ve kendi kaynak ekonomisi açık. Sonraki: mevcut görevler Q01–Q03, ilave doğal hikâye bölümleri ve ilgili sistem açılışları; kader ileri mekanikleri için önce gerçek tekrar edilebilir kaynak tasarımı. M/R/Q/V ve 154 ekran referans listesi korunur.


## 3.147 TEST — Bölüm III: Külün Ardından (2026-11-26)
- Ana hikâye 16→22 görev; 17–22: Külün Ardından (NPC), Sönmeyen İzler (2 toplama), Kırılan Denge (4 düşman), Kaderin Yazıtı (inceleme), Yazıtın Muhafızları (3 düşman), Yeni Mühür (3 toplama/teslim). Mevcut köy/orman/tapınak/kül geçidi ve onaylı varlıklar kullanıldı; yeni bölge veya yeni düşman modeli eklenmedi. Bölüm I/II/III ilerleme çubukları. 17. görev Sv14, 21. görev Sv16 geçici denge şartı. Kule/kader ve önceki mekanikler değişmedi.
- Eski kayıt: story147:1 işareti, eski 16 sonrası sefer ödül kimlikleri legacy-sefer olarak korunur; kaynaklar ve günlük kullanılmış haklar korunur. Eski yarım sefer yeniden başlatılır ve 16 sonrası yeni hikâye açılır; eski sefer döngü sırası sıfırlanır. Ana hikâye ve yan görev/sefer kategorileri ayrı kalır.
- Chromium set_content, bellek localStorage, kontrollü Sv25 ve +400 saldırıyla altı yeni görev gerçek tick, yürüyüş, bölge geçişi, NPC konuşma, toplama/inceleme, savaş, teslim, tek ödül ve 22/22 tamamlanma geçti. Normal güçte doğal ilerleme dengesi test edilmedi. Eski kayıt göçü, 14 seviye kilidi, günlük 3 kullanım korunması, yeniden kayıt/yükleme, üç ekran 360×800/393×852/412×915 yatay taşma yok, JS çalışma hatası yok. İlk göç testlerinde eski seviye ödülü/otomatik güncelleme nedeniyle doğrulama başarısız oldu; son deterministik testte önceden alınan seviye ödülleri işaretlenerek ve RAF durdurularak geçti. JS syntax ve ZIP CRC başarılı. Gerçek Android, eski 16+12 görevin tamamı, normal denge, kule/kader ve diğer mekaniklerin yeniden regresyonu açık.
- Paket: Kirik_Muhur_3_147_Bolum_III_TEST.zip, 40.683.590 bayt, SHA256 106676509dadaf10f0fd05ca903f700681981fc1450503f040f796e9f27a3740. ZIP GitHub'a ikili aktarılmadı. Sıradaki: gerçek açılış zinciri ve yeni bölge/ileri hikâye, ilahi donanımın gerçek hikâye koşulu, Q01–Q03 ve M/R/V işleri açık. 154 kullanıcı ekran referansı korunur.


## 3.148–3.149 TEST — İlahi Mühür ve Meridyen Yolu (2026-11-26)
- 3.148 Bölüm IV: 23–28. görev, Sv18/Sv20 geçici eşikleri, 28. görev ödülü İlahi Mühür; 5 kademe, ilk ATK/DEF/HP +10/+5/+40, sonraki +3/+2/+15. 3.147 kayıt göçü, önceki kaynaklar ve günlük haklar korunur. 3.148 bağımsız ödül testi zamanlama yüzünden başarısız olmuştu; 3.149'da aynı teslim fonksiyonu ve ödül kuyruğu tek kontrollü çağrıda doğrulandı. Gerçek ödül ekranında İlahi Mühür ve güç artışı 455→491 görüntülendi.
- 3.149: 28. ana görev ve İlahi Mühür şartı; Gelişim, Açılış Yolu ve boss zaferi ekranından Meridyen. Mevcut Kül Lordu ve yerel Kadim Kolos zaferlerinin kayıtlı wins toplamı ruh özü hakkıdır; önceki geçerli zaferler de dahil. Çift ödül için ayrı sayaç yok, tüketim açılmış düğüm maliyetlerinden türetilir. Altı sıralı düğüm: HP35/DEF4/ATK7/HP55/DEF6/ATK10, maliyet 1/1/2/2/3/3. Bunlar özgün test dengesi. Bonus gerçek baseStats hesaplamasına bağlı. meridian149 kayıt alanı, eski kayıt varsayılanı, yeni karakter sıfırlama, kayıt hatasında rollback.
- Chromium kontrollü Sv25: son görev teslim ve ödül penceresi, kilit, kaynak yetersizliği, gerçek boss giriş fonksiyonu, yenilgi ödülsüz, iki boss kontrollü HP=0 ile zafer, tekrar finish engeli, zafer ekranı→Meridyen, ilk iki düğüm ve gerçek stat değişimi, kayıt hatası rollback, restore, üst dört düğüm sentetik yüksek zafer kaydıyla ve 6/6 sınırı, yeni karakter reset başarılı. Üç viewport 360×800/393×852/412×915 içerik 656/656, yatay taşma yok, konsol hatası yok. Gerçek ekran görüntüleri incelendi. JS syntax ve ZIP CRC başarılı.
- ZIP: Kirik_Muhur_3_149_Meridyen_Yolu_TEST.zip, 40.686.615 bayt, SHA256 00c6a7819242bb7c69e4484ace4b7d81a4338f053428803423447d505d7a119d. ZIP GitHub'a ikili aktarılmadı. Doğal boss savaşı, gerçek Android, gerçek kalıcı depolama, bütün görev ve savaş regresyonu açık. Meridyen görseli ilk işlevsel prototip. Yeni bölge henüz kurulmadı. M20 kısmi, Q/R/V ve 154 referans listesi açık; sıradaki yeni bölge/çarpışma ve ruh donanımı, önceki görev motorunun doğal denge testleri korunacak.


## 3.150 TEST — Bölüm V: Sisli Vadi (2026-11-26)
- 3.149 devamı. Beşinci dünya bölgesi mistvale, mevcut orijinal KM354_CLEAN 1440×960 orman zemininin yatay aynalanmış ve ölçülü renk dönüşümlü sürümü; KM354_MODELS mevcut KayKit dekorları, 16 çarpışmalı ağaç/kalıntı, küçük çarpışmasız dekorlar, 2 NPC (Gözcü Eren, Yazman Mira), 8 mevcut tür düşman (3 gölge, 3 nöbetçi, 2 diken kurdu). Yeni düşman modeli oluşturulmadı. Yeni alanın kompozisyonu ilk prototip, bağımsız özgün zemin çizimi değil.
- 28. ana görev sonrası Kül Geçidi ↔ Sisli Vadi gerçek iki yönlü geçit, rota grafiği, mini/dünya haritası, kilit, kayıt güvenli dönüş. Bölüm V, 29–34: NPC, iki keşif, 3 gölge, 3 öz, 3 nöbetçi, mühür incelemesi. Sv22/Sv24 geçici özgün eşikleri. 154 referans görselinin ve mevcut M/R/Q/V listenin çizgisi korunur. Kader/İlahi Mühür/Meridyen kodu korunur. Eski sefer görev ödülleri legacy150-sefer kimliğine taşınır, kaynak ve günlük haklar korunur; sefer sırası sıfırlanır.
- Chromium set_content, localStorage bellek taklidi: kilitli geçit, rota grafiği, iki yönlü geçit, 16 engelin çarpışması, NPC/düşman/görev hedeflerinin yürünebilir olması, pathfinding, yeni bölgede save/restore, üç viewport harita yatay taşma, altı görev gerçek tick motoru Sv25 +400 ATK ile tamamlandı. Konsol hatası yok. Harita alt rota açıklaması düzeltildi ve NPC adları kısaltıldı; sonra ayrı tekrar testinde eski sefer kaydı, kaynak 12345/234, 2 günlük hak, İlahi Mühür kademe3, Sv22 kilidi, Kül Geçidi→Sisli Vadi otomatik yürüme ve ilk teslim geçti. İlk göç deneyi hazırlama/restore arası kayıt güncellemesiyle başarısız; tek çağrıda tekrar geçti. Tam altı görev testi son metin düzeltmesinden önce yapıldı. Görselde mevcut HUD/ganimet bildiriminin dünya etiketi üzerine gelmesi hâlâ görülebiliyor. Doğal savaş dengesi, tüm eski görevler, gerçek Android/kalıcı depolama açık. 
- ZIP Kirik_Muhur_3_150_Sisli_Vadi_Bolum_V_TEST.zip 42.008.402 bayt, SHA256 ce6ec681e8e853000a0767dfd2a42e8683825da4349cfd1352b236148bfdaffd; JS syntax ve CRC başarılı. ZIP GitHub'a yüklenmedi. M03/M04/M22 kısmi. Sıradaki öncelik gerçek ruh donanımı kaynak→ganimet→kuşanma zinciri, bölge görsel kalitesi ve Q01–Q03 doğal ilerleme. Eski liste silinmez.


## 3.151 TEST — Ruh Donanımı (2026-11-26)
- Temel: kütüphanedeki 3.150 ZIP (42.008.402 bayt, SHA256 ce6ec681e8e853000a0767dfd2a42e8683825da4349cfd1352b236148bfdaffd doğrulandı). Eski GitHub index.html temel alınmadı. Kesin şartname ve 150+4 referans kayıtları okundu; 001, 144–147, 149–150 ekranları arşivden tekrar görsel incelendi. Resmi https://apps.apple.com/us/app/kung-fu-saga-martial-path/id1660688865 sürüm notu Warsoul için iki seri/dört tür ve boss ganimeti doğruluyor. Kesin açılma, maliyet ve tam ruh ekranı doğrulanmadı.
- 34. ana görev ödülü (mission-33) ve İlahi Mühür sonrası yeni geçerli Kül Lordu/Kadim Kolos zaferleri: ilk ve ikinci zaferde sırasıyla Kor Pençesi (+8 ATK), Kül Siperi (+5 DEF), Kolos Kalbi (+55 HP), Kadim Mühür (+10 ATK); her uygun zafer +1 ruh parçası. Eski zaferlere geriye dönük ruh donanımı verilmez; eski meridyen özü korunur. Dört benzersiz yuva, kuşan/çıkar, 1–5 kademe; artışlar +3/+2/+18/+3; maliyet mevcut kademe kadar parça, 100*kademe altın, 5*kademe ruh tozu. Bunlar özgün geçici denge değerleri. Parça tüketimi seviyelerden türetilir, ayrı duplike sayaç yok; kazanım zafer defteriyle sınırlandırılır; normal yenilgi ve tekrar finish ödülsüz. Yerel istemci güvenliği sunucu otoritesi değildir.
- spirit151 kayıt alanı, yeni karakter sıfırlama, yükseltme/kuşanma kaydetme hatasında rollback; gerçek baseStats/deal bağlantısı. Gelişim, Açılış Yolu, boss detay/ganimet ve zafer ekranından gerçek bağlantılar. Mevcut KayKit karakteri ve 202 gömülü data:image eşleşmesi birebir. Dört yeni özgün vektör eşya ikonu, mevcut koyu yeşim/altın çizgisi; sanat kalite kabulü açık.
- Chromium set_content, bellek localStorage taklidi; yerel HTTP ve yönlendirilmiş origin tarayıcı politikasıyla engellendi. 28/28 kontrol: kilit, eski zafer/varsayılan, gerçek boss giriş fonksiyonu, yenilgi, 4 kontrollü zafer (kill handler; doğal savaş değil), tekrar finish, gerçek deal hasar formülü, dört parça ve üç stat, maliyet, yetersiz kaynak, kayıt hatası rollback, kuşan/çıkar, geçersiz kayıt sınırı, gelişim/ganimet/zafer geçişi, JSON save/restore, yeni karakter reset, üç viewport 360×800/393×852/412×915 yatay taşma yok. Ekran görüntüleri incelendi; dört yuva 83px hizalı, aksiyon düğmeleri 44px. Konsol hata yok, Node syntax ve ZIP CRC geçti. Doğal ilerleme/savaş, bütün eski görevler ve gerçek Android/kalıcı depolama, fiziksel dokunma ve FPS açık.
- ZIP: Kirik_Muhur_3_151_Ruh_Donanimi_TEST.zip, 42.013.963 bayt, SHA256 f1745bc2d4fdda4955bdd4df39721f169285ed52f9d1a601c532615704fabe5b. ZIP ikili olarak GitHub'a aktarılmadı, ana index.html korunuyor. M20 kısmi; ruh dönüşümü/savaş ruhu, ileri bölümler, Q/R/V ve tüm önceki M listesi açık. Sıradaki: altıncı hikâye bölümü ve özgün çevre/düşman modeli; doğal ilerleme regresyonu. 154 ekranın tam transkripsiyonu ve ZIP referans aktarımı açık.


## 3.152 TEST — Bölüm VI: Kristal Harabeler (2026-11-26)
- 3.151 ZIP SHA256 f1745bc2d4fdda4955bdd4df39721f169285ed52f9d1a601c532615704fabe5b doğrulandı, eski GitHub index.html temel alınmadı. Kesin şartname ve 3.151 kontrol kaydı okundu; kullanıcı arşivinin 005,006,007,010,013,016 numaralı önizlemeleri yeniden açıldı (görev/NPC/ödül/HUD akışı). KayKit mevcut varlıkları ve 224 eski data:image eşleşmesinin tamamı birebir korundu.
- 34→40 ana görev, 5→6 dünya bölgesi: crystalruins. 34. görev sonrası Sisli Vadi ile çift yönlü gerçek geçit; 2 NPC, 4 Yankı Muhafızı ve 3 Kristal Bekçisi. İki yeni özgün piksel model (2.5D prototip, gerçek 3D değil), yön/animasyon gerçek durumdan ve önbellekli çizim, özgün taş yolu zemin PNG ve 9 kristal kümesi + 9 mevcut KayKit çarpışmalı dekor. Görsel kalite mevcut KayKit modeline göre zayıf; nihai kabul yok. M03/M04 kısmi. 35–40 görev: konuşma, keşif, av, toplama, av, inceleme. Sv26/Sv28 eşikleri özgün geçici denge, referanstan kopyalanmadı.
- story152:1 göçü; eski 34 sonrası sefer ödül kimlikleri legacy152-sefer-* olarak ayrılır, sefer sırası yeniden başlar; eski altın/toz/hak ve ruh ekipmanı bonusları korunur. Açılış Yolu, dünya haritası, altıncı bölüm ilerleme çubuğu, gerçek görev ve kayıt motoru bağlantısı. Mevcut 3.151 ruh, meridyen, İlahi Mühür ve diğer sistemlere kapsam dışı değişiklik yapılmadı.
- Chromium set_content, bellek localStorage, RAF devre dışı ve kontrollü tick: 16 boolean kontrol + altı gerçek görev akışı = 22/22. Sv30/+400 ATK kontrollü başlangıç; gerçek yürüme, iki yönlü geçit, av ve diğer hedefler, NPC teslimi, tek ödül, 40/40, iki yeni tür, 18 engel, görev/seviye kilidi, mevcut ruh bonusu +11 ATK/+5 DEF korunması, kayıt/restore ve eski sefer göçü (12345 altın/234 toz, iki günlük hak). İlk seviye kilidi testi otomatik RAF zamanlaması nedeniyle başarısız oldu; deterministik yeniden test geçti. Üç viewport 360×800/393×852/412×915 haritada yatay taşma yok; gerçek dünya ve harita ekran görüntüleri incelendi. Önceki HUD/eşya önerisi karakterleri örtebiliyor. Gerçek Android, kalıcı depolama, doğal ilerleme, tam animasyon ve dokunma/FPS testleri açık. Konsol hata yok; Node syntax ve ZIP CRC geçti.
- ZIP: Kirik_Muhur_3_152_Kristal_Harabeler_Bolum_VI_TEST.zip, 42.321.292 bayt, SHA256 e44426022cab054d19ea5400cbfaaa7775d9826404498e5e3d8d28692082db70. İkili ZIP GitHub'a yüklenmedi; ana index.html değişmedi. M/R/Q/V ve 154 ekran referans listesi korunur. Sonraki öncelik: yeni bölgeler/özgün düşman sanat kalitesi ve dış HUD iyileştirme, ardından pet/binek gerçek model sunumu. Doğal ilerleme regresyonu açık.


## 3.153 TEST — KayKit görsel uyumu (2026-11-26)
- Kullanıcının kesin görsel talebi: KayKit çizgisinden çıkma; orantısız veya absürt görünen yeni sanat üretme. Temel 3.152 ZIP SHA256 e44426022cab054d19ea5400cbfaaa7775d9826404498e5e3d8d28692082db70 doğrulandı. Mevcut sanat kaynaklarının gerçek önizlemeleri karşılaştırıldı.
- Kristal Harabeler'deki düz poligon düşman çizimleri kaldırıldı. echoGuard mevcut KayKit Skeleton Rogue, crystalGolem mevcut Skeleton Warrior 16 yönlü atlaslarını kullanıyor; idle/walk/attack/hit/death, gerçek yön ve mevcut savaş animasyonu durumundan. Yeni bağımsız 3D modeller değil. NPC kimlikleri değişmeden ranger/smith render aliasları. Kristal kümeleri mevcut Rock_1/2/3 kaynaklarının ölçülü yeşim tonlu önbellekli kompozisyonu; yeni bölge zemini eski orman ve dungeon dokularıyla harmanlandı. 224/225 eski gömülü görsel eşleşmesi korunuyor; yalnız kristalruins türetilmiş zemin değişti. Eski haritalar, görev/ekonomi/savaş değerleri, kayıt şeması, ruh donanımı ve çarpışmalar değişmedi.
- 25/25 kontrollü Chromium testleri (19 boolean ve 6 görev akışı): önceki 3.152 regresyonu, iki düşmanın gerçek atlas yüklenmesi, her iki modelin 16 yön × 5 aksiyon çizim çağrısı, kristal önbelleği, NPC art eşlemesi, altı görev/tek ödül, ruh bonusları, geçit, kayıt göçü ve harita taşma kontrolü. Sv30/+400 ATK, hızlandırılmış tick, bellek localStorage, set_content; doğal ilerleme ve gerçek Android değildir. JS syntax, ZIP CRC ve konsol hata yok. 360×800/393×852/412×915 gerçek ekran görüntüleri incelendi. HUD görev kutusu bazı düşmanları örtüyor ve ekipman önerisi paneli sahneye giriyor; dış HUD iyileştirmesi açık. Düşmanların özgün yeni KayKit uyumlu modelleri ve nihai sanat kabulü açık.
- ZIP Kirik_Muhur_3_153_KayKit_Gorsel_Uyum_TEST.zip, 42.858.621 bayt, SHA256 aea73f057df34715ff28c749bb74bb75e5c282d2d599d121c3e2048fbea034ea. ZIP GitHub'a aktarılmadı; ana index.html ve önceki kontrol listeleri korunuyor. Sıradaki 3.154: dış HUD görev/ganimet paneli çakışmalarını gider; ardından pet/binek gerçek model sunumu. M/R/Q/V ve 154 referanslar açık.


## 3.155 TEST — Özgün pet ve binek modelleri (2026-11-26)
- 3.154 ZIP SHA256 506a04b270e91c3467923e34a184bfd6c2d5a29b75567067c793d16225619669 CRC doğrulandı; eski GitHub HTML temel alınmadı. 3.154'teki HUD ve bölge kaplamaları korundu; önceki 3.154 tam test raporu bu oturumda doğrulanmadı. Referans 022–024,048–053 arşivden tekrar görsel olarak açıldı. Kazanım → model → gelişim → gerçek etkiler → dünya bağlantısı. Mevcut KayKit çizgisinde yeni özgün içerik şartı.
- Ruh Tilkisi ve Ay Işığı Geyiği sıfırdan düşük poligonlu geometriden ortografik olarak önceden render edildi. Her biri 8 yön × 8 kare, iki 1152×1152 kayıpsız WebP atlas; duruş, 6 yürüyüş karesi ve tilki saldırı pozu. Mevcut 237 gömülü görsel birebir korunup iki atlas eklendi. Gerçek zamanlı 3D değil; oyun içinde hafif atlas çizimi. Petin görsel takibi ve depth sort, mevcut pet hasarı değişmedi; binek modelinin üzerinde kırpılmış/yükseltilmiş kahraman üst gövdesi geçici çözüm, gerçek oturma animasyonu yok. Önizleme 8 yönde döndürme, gerçek seviye yıldızları, kazanım popup ve ahır modeli. 4/8 görev ödülleri, fiyatlar, bonuslar, seviye limitleri değişmedi. 40 görev/6 bölge/ruh donanımı korundu.
- 24/24 Chromium kontrollü test: görev ödülü hook (doğal görev akışı değil), kilit/tek kazanım, 128 çizim çağrısı, model döndürme, çağır/dinlendir, gerçek maliyet ve stat, yetersiz kaynak, 3 viewport×2 menü geometri, pet takip, gerçek tick hasarı, otomatik biniş ve iniş, bölge geçişinde görsel reset, ruh bonusu, bellek localStorage kayıt/restore, yeni karakter reset. İlk pet hasarı testi farklı yakın hedef ve pause nedeniyle başarısız; tek hedefli aktif tick yeniden testi geçti. RAF durdurulmuş, kontrollü Sv12, doğrudan ileri hikâye kaydı. JS syntax/ZIP CRC ve konsol hatası yok. 360×800/393×852/412×915 ekran görüntüleri incelendi; gerçek oturma rig'i ve bazı HUD örtüşmeleri, fiziksel Android/FPS, kalıcı depolama ve doğal ilerleme açık. Pet/binek sanat kabulü kısmi, yeni evrim/yetenek eklenmedi.
- ZIP Kirik_Muhur_3_155_Pet_Binek_TEST.zip, 52.008.977 bayt SHA256 50802bf62a7a15c74fe5cdf2cd29fb9a2d5bf711f6c700d5603ba9e898cb2722. ZIP ikili olarak GitHub'a yüklenmedi; ana index.html ve eski kontrol listeleri korunur. Sıradaki: kanat setleri/şekilleri ve gerçek beceri bağlantıları; M/R/Q/V ve 154 ekran listesi açık.


## 3.156 TEST — Sabit şeffaf görev paneli ve manuel joystick (2026-11-26)
- Kullanıcı talebi: hareket eden görev paneli sabitlensin, şeffaflık geri gelsin, joystick'e dokununca görev hareketi dursun ve oyuncu kontrolü alsın. 3.155 ZIP SHA256 50802bf62a7a15c74fe5cdf2cd29fb9a2d5bf711f6c700d5603ba9e898cb2722 doğrulandı. Referans 005,006,046,061,067,090,114,129,148 görsel olarak tekrar açıldı. KayKit ve bütün gömülü görseller değişmedi. Kanat geliştirmesi bu hata onarımı için ertelendi.
- Kök neden: 3.154 km3121QuestDock çevredeki aktörlere göre paneli taşıyordu; üst üste CSS opak arka plan veriyordu. Dock kaldırıldı, NPC konuşma güncellemesi korundu; panel sabit sol konum, arka plan alfa .28, yazı gölgesi, gerçek görev ve daraltma düğmeleri korunur. Joystick bırakılınca km3125Auto görev rotasını tekrar başlatıyordu. manual156 kalıcı tercih alanı ile otomatik rota/av ve otomatik görev teslimi kullanıcı yeniden başlatana kadar duraklatılır; manuel hareket, petin bağımsız saldırısı ve düşman motoru korunur. Görev/yan görev/harita hedefi veya gelişim avının açıkça seçilmesi otomasyonu yeniden etkinleştirir. Zindan joystick tutulurken oto hareket/saldırı kesilir, bırakınca mevcut zindan davranışı sürer. Eski kayıt varsayılanı otomatik; yeni karakter reset. Bu dünya manuel duraklatma kararı kullanıcının son talebinin uygulamasıdır.
- Son Chromium 17/17: gerçek CDP dokunma basış/sürükleme/bırakma, nötr joystickte hareketsizlik, 100 tick bırakma sonrası manuel, menü dönüşü, simüle localStorage restore, açık görev tıklamasıyla yeniden hareket, kontrollü 35. görev tesliminde duraklatma ve tek ödül, 360×800/393×852/412×915 sabit koordinat/arka plan alfa, hareketsiz geçit yanında otomatik geçmeme, yeni karakter reset. Konsol hatası yok. Üç ekran görüntüsü incelendi; Node syntax ve ZIP CRC geçti. Gerçek Android, doğal bütün görevler, yan görev ve zindan için ayrı dokunma regresyonu, kalıcı depolama ve FPS testleri açık. Binici oturma animasyonu önceki geçici çözüm olarak kaldı. 40 görev, altı bölge ve eski görseller korunur.
- ZIP Kirik_Muhur_3_156_Sabit_Gorev_Joystick_TEST.zip, 52.008.745 bayt, SHA256 21aa63595ae28986b9455f27b6eb9ddb03885e923fecc32b87c1d469cf27c50f. Ana index.html değiştirilmedi, ikili ZIP GitHub'a yüklenmedi. Önceki M/R/Q/V ve 154 ekran listesi korunur. Sıradaki: doğal görev/joystick regresyonu, ardından 3.157 kanat seti/şekli/beceri.


## 3.157 TEST — Kanat seti, şekil ve savaş pasifi (2026-11-26)
- 3.156 ZIP SHA256 21aa63595ae28986b9455f27b6eb9ddb03885e923fecc32b87c1d469cf27c50f doğrulandı; kesin şartname ve kontrol listesi okundu. Referans 072/078/079 görsel olarak açıldı; 151 ek ekranın önceki GitHub inceleme kaydı mevcut, orijinal JPEG bu oturumda bulunmadı. Referans seviyeleri birebir alınmadı.
- Şafak/Kristal kanat edinme ve yükseltme değerleri korundu. Kor Kanatları Sv18, 620 altın/45 ruh tozu; yeni özgün vektör kanat katmanı (3D model değil). İki farklı kanat Sv3 ve uygun takılı kanat ile Gök Muhafızları seti +3 ATK/+2 DEF/+16 HP; Sv3 şekil tercihi temel/taçlı, yalnız görünüm ve mevcut look134 içinde doğrulamalı kayıt; Sv5 takılı kanat Mühür Darbesi boss hasar formülüne 1.05 çarpanı (savunma düşülmeden önce). Gizleme bonusu değiştirmez. Yeni değerler geçici özgün denge. Eski 239 gömülü görsel dahil tüm data:image eşleşmeleri korunuyor. 3.156 sabit şeffaf görev paneli ve manuel joystick kodu değişmedi.
- İlk revizyonda 33/33 Chromium kontrollü test (17 önceki joystick/regresyon + 16 kanat kontrolü): kilit/tek edinme/maliyet, setin gerçek ATK DEF HP, şekil kilidi/özellik değişmemesi, boss ve normal deal hasarı, gizleme, restore, çıkarma, üç viewport 360×800/393×852/412×915 yatay taşma yok. Konsol hatası yok. Bellek localStorage, kontrollü Sv20 ve kaynaklar, RAF durdurulmuş; doğal boss dövüşü değil. İlk render incelendi; Kor temel ve taçlı benzerliği için son geometrik düzeltme yapıldı. Son revizyon yeniden testinde ilk 12 kontrol geçti, süre sınırı nedeniyle kalan test ve son kanat ekran görüntüsü tamamlanmadı. Node syntax ve ZIP CRC geçti. Kanat sanat kalitesi prototip, fiziksel Android, kalıcı kayıt, doğal ilerleme ve tam son görsel denetim açık.
- ZIP Kirik_Muhur_3_157_Kanat_Setleri_TEST.zip, 52.010.253 bayt, SHA256 6ab6709604ceab9775d5f4d978899547bfef54384cc1463a75564c0bdece2843. Ana index.html değiştirilmedi; ikili ZIP GitHub'a yüklenmedi. M14 kısmi; sıradaki önce son revizyon regresyonu, sonra 093–095 referanslı kader eritme/füzyon. M/R/Q/V listeleri korunur.
