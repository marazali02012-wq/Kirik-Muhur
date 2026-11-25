# KIRIK MÜHÜR — KULLANICININ KESİN OYUN ŞARTNAMESİ
**Durum:** Onaylanan hedef kapsam. **Referans:** Kung Fu Saga mekanik ve ekran düzeni; oyun sanatı, isimleri ve UI özgün.  
**Kural:** Bu doküman hedef gereksinimleri kaydeder. Listelenmesi, oyunda şu anda çalıştığı anlamına gelmez. Aşama kabulü yapılmadan sonraki aşamanın koduna geçilmez.

## 1) Ana yapı
- Dikey mobil MMORPG
- Tek karakterle açık alan gezme
- NPC görev alma
- Otomatik yol bulma
- Otomatik savaş
- Görev teslimi
- Ödül popup
- Karakter güçlenme döngüsü

## 2) Giriş / karakter oluşturma
- Sınıf seçimi ekranı
- Erkek / kadın seçimi
- Büyük karakter önizleme
- Arka planda tematik sahne
- “Next Step” tipi ilerleme akışı

## 3) Oyun içi ana HUD
- **Üst sol:** profil, seviye, güç, VIP
- **Üst orta / üst bar:** altın / premium para / diğer kaynaklar
- **Üst sağ:** bölge adı, koordinat, durum bilgisi
- **Sol orta:** görev paneli
- **Orta alan:** karakter + düşman + hasar sayıları
- **Alt orta:** beceri tuşları
- **Alt sol / alt sıra:** karakter, çanta, skill, pet, forge benzeri kısayollar
- **Alt sağ:** sohbet, hızlı menü, joystick / yön kontrol alanı

## 4) Savaş sistemi
- Normal açık alan savaşı
- Çoklu yaratık grupları
- Hasar rakamları
- Beceri kullanımı
- Boss alanı
- World boss / dungeon boss mantığı
- Otomatik savaş aç/kapat

## 5) Sistem ekranları
- Karakter bilgi ekranı
- İstatistik ekranı
- Çanta
- Beceri
- Pet / binek
- Forge / geliştirme
- Görev ödülü popup
- Ana şehir / hub ekranı
- Kalabalık ikonlu üst-yan menü sistemi

## 6) Sosyal / meta sistem
- Lonca
- Market / shop
- Hunt / dungeon / daily / event
- Chat paneli
- Boss girişleri
- Günlük görevler
- Güç puanı odaklı ilerleme

## 7) Direkt kopyalamayacağız
**Aynı mantıkta fakat özgün yapılacak:**
- İkonlar
- Karakter isimleri
- UI süsleri
- Buton grafikleri
- Şehir arka planları
- Sınıf isimleri
- Boss isimleri

## 8) Aynı his korunacak
**Yakın tutulacak tasarım prensipleri:**
- Ekran yerleşimi
- Görev akışı
- Otomatik savaş mantığı
- Açık dünya mobil MMORPG hissi
- Çok ikonlu, yoğun HUD yapısı
- Ödül / görev / güç artışı döngüsü

## 9) Kuracağımız yeni oyun omurgası — çekirdek modüller
- Karakter oluşturma
- Ana açık dünya sahnesi
- Görev sistemi
- Otomatik yol bulma
- Otomatik savaş
- Yaratık / boss sistemi
- Ödül ve drop sistemi
- Karakter ekranı
- Çanta
- Skill ekranı
- Pet / mount sistemi
- Forge / geliştirme
- Şehir hub ekranı
- Sohbet
- Etkinlik / günlük görev / dungeon menüleri

## 10) Görsel stil kararı
**Hat 1 — Kung Fu Saga tipi:**
- Parlak
- 3D / 2.5D karakter hissi
- Yoğun HUD
- Mobil MMORPG arayüzü
- Doğu-fantastik tema

**Hat 2 — Kullanıcının verdiği piksel kalite örnekleri:**
- Sahne kalitesi yüksek
- Atmosfer güçlü
- Keskin sanat dili

**Doğru birleşim:**
- Mekanik ve ekran düzeni: Kung Fu Saga tipi
- Kalite standardı ve sahne özeni: yüksek kaliteli piksel örnekleri
- Sonuç: **özgün oyun**

## 11) Net proje tanımı
> “Kung Fu Saga referanslı, dikey mobil açık dünya MMORPG; aynı görev-savaş-hub-mount-pet-lonca omurgasına sahip; fakat özgün isimler, özgün sanat ve özgün UI ile kurulacak.”

---

## 12) Önceki kesin çalışma kararları — yukarıdaki kapsamın uygulanması
Bu bölüm yukarıdaki kullanıcı hedeflerine **ek yorumdur**; onları değiştirmez:
- Görev: bir kez başlat → hedefe git → savaş / inceleme / toplama → ilgili NPC'ye dön → ödül **otomatik bir kez** hesaba geçsin.
- **Ödül popup** olacak, ama “ÖDÜLÜ AL / SONRA AL” biçiminde ikinci sorgu olmayacak; yalnız ne kazanıldığını gösterecek.
- Sağ alttaki **çiçek** joystick değil, döndürülüp menüleri değiştiren/gizleyen hızlı menüdür. Hareket kontrolü ayrı olacak. Listede geçen “joystick / yön kontrol alanı” hareket için ayrılan yerin genel tarifidir.
- Oyun başta **tek oyunculu HTML prototipi**; gerçek MMORPG niteliği için sunucu ve eşzamanlı çok oyunculu sistemler ayrıca kurulmalı. Tamamlanmayan özellikler çalışıyormuş gibi gösterilmez.
- **Aşama kilidi:** 3A hareket / görev / otomatik savaş / kayıt → 3B harita ve görevler → 3C gelişim ve ekonomi → 3D regresyon ve kalıcı kayıt → 3E görsel kalite, HUD, karakter oluşturma. Bu aşamaların tamamı kabul edilmeden yeni boss/zindan, lonca ve canlı PvP geliştirmesine geçilmez.
- Kırık Mühür ile **Arena Forge Pro** karıştırılmaz. Mevcut `index.html`, kayıtlar, çalışan sürümler ve sunucular doğrulama olmadan bozulmaz.
- **Değişiklik denetimi:** Her yeni GitHub güncellemesini bu şartnameye karşı değerlendir; çelişirse kodu otomatik değiştirmek yerine sapmayı açıkça raporla. Kullanıcının yeni açık talimatı olmadan kapsamı genişletme.


## 13) Zorunlu mobil grafik performansı ve FPS standardı
**Kullanıcının kesin kararı:** Oyunun dikey mobil sürümü ayrı ekran kartı olmayan, dahili grafik birimli Android telefonlarda da akıcı kalmalı. Yüksek kaliteli özgün görseller eklenecek ama çalışan oynanış, kayıt ve dokunmatik kontroller feda edilmeyecek.

- **Performans hedefi:** Önce yoğun sahnelerde **kararlı 30 FPS** hedefle; cihazın işlemci/grafik kapasitesi ve sıcaklık izin veriyorsa **60 FPS isteğe bağlı yüksek kalite modu** olsun. Bunlar *hedef*, ölçülmüş/garanti edilmiş cihaz FPS değeri değildir.
- **Uyarlanabilir kalite:** Cihaz zorlandığında ilk olarak arka plan çizim çözünürlüğü, parçacık sayısı, ışık/gölge, ekran efektleri ve eşzamanlı animasyon maliyetini kademeli azalt; karakter/NPC/düşmanların konturunu, HUD yazı netliğini, dokunmatik hedeflerini ve temel oynanışı öncelikli koru.
- **Canvas çözünürlüğü:** `devicePixelRatio` değerini kontrolsüz biçimde doğrudan tüm ekran çizimine uygulatma. Çözünürlük ölçeğini ekrana ve ölçülen performansa göre sınırlandır; orijinal görsel oranını ve 2D/piksel-art keskinliğini koru.
- **Görsel üretim ve varlık optimizasyonu:** Harita arka planlarını uygun çözünürlükte sıkıştırılmış görüntü/katmanlarla önceden hazırla; değişmeyen dekoru her kare yeniden üretme. Mobil uyumlu animasyon kareleri/spritesheet ve önbellek kullan; gereksiz büyük dokular, fazla GIF/video, gerçek zamanlı ağır ışık/gölge ve gereksiz tam ekran filtrelerden kaçın. Tekrarlı nesne oluşturma/bellek sızıntılarını denetle.
- **Gerçek oyun motoru:** `requestAnimationFrame` çizimi, fizik/savaş ilerleme süresi ve animasyon süreleri tutarlı olmalı; 30/60 FPS ayarı saldırı hızını, hasarı, görev sayacını, yürüyüşü veya kayıt güvenliğini değiştirmemeli.
- **Görsel kalite sırası:** Önce özgün, net 2D/2.5D sınıf karakteri, yaratık, NPC, çevre ve HUD. Tam 3D/yoğun gerçek zamanlı efekt **zorunlu değil**; yeterli kanıt olmadan tüm oyuna ağır bir 3D motoru taşıma.
- **Zorunlu cihaz testi:** 360×800, 393×852, 412×915 gibi dikey ekranlarda açılış, görev, NPC dönüşü, envanter, yoğun çoklu düşman ve boss sahnelerini incele; **fiziksel Android telefonda** en az 10–15 dakika yoğun oynanışta FPS/kare süreleri, donma, ısınma, bellek, pil ve dokunmatik tepkisini kontrol et. Düşük/orta/yüksek kalite karşılaştırması yap. Bu testler yapılmadan “60 FPS sabit”, “kasmaz” veya “performans tamamlandı” deme.
- **Değişiklik kilidi:** Önce test HTML/ayrı dal, ölçüm ve görsel karşılaştırma; ardından kabul. Ana `index.html`, kayıt anahtarları, çalışan savaş/görev sistemi ve mevcut kullanıcı ilerlemesi onaysız değiştirilmez.
- **Aşama bağlılığı:** Bu performans kuralı **her aşamada geçerli**; 3A çekirdek motor regresyonunu bozma. Görsel yoğunluğu ve otomatik kalite özellikle **3E görsel/HUD kabulünün zorunlu şartıdır**. “Görseller eklendi” tek başına kabul değildir; gerçek cihaz performansı da gerekir.

**Mevcut 3.24 tespiti:** Oyun Canvas ile her kare çiziliyor; sahnede önceden oluşturulan katmanlar var; `resize()` tam `devicePixelRatio` ile çizim çözünürlüğünü ayarlıyor. Bu risk analizi FPS ölçümü değildir. Fiziksel telefon testleri bekliyor.

**Kod ve kabul durumu için detay:** [Ana proje omurgası](KIRIK_MUHUR_PROJE_OMURGASI_KARAR_2026-11-19.md).


## 14) Kullanıcının güncel kesin kararı — tam otomatik oyun ve kategorili özgün UI (2026-11-26)
Bu karar önceki joystick/manuel hareket şartlarının yerine geçer. Sabit dikey; joystick, klavye yön tuşu ve sahaya sürükleyerek manuel hareket yok. Karakter hedefe kendisi yürür; görev, normal saldırı, seçili otomatik beceriler, şifa, boss takibi ve görev ödülü otomatik yürütülür. Çiçek menüsü sadece menü kontrolüdür. Oyuncu içerik, hedef, ekipman ve gelişim kararlarını verir. Biletli boss/arena girişleri oyuncu onayı olmadan başlatılmaz. Menü, ölüm ve arka plan güvenliği korunur. Çevrim içi sistemlerin gerçek altyapısı yoksa işlevleri etkinleştirilmez.
Kung Fu Saga tek referans değildir: diğer dikey MMORPG'lerin iyi ekran ve akış ilkeleri de incelenir; birebir görsel/isim/UI kopyası yapılmaz. Tek katalogda her şeyi sıkıştırmak yasak. Boss, zindan, arena, etkinlik ayrı içerik girişleri; kendi alt kategorileri, giriş koşulları, ödül, süre ve geri dönüşleri; karakter, ekipman, gelişim, sosyal, lonca, pazar ve hesap kendi alanlarında. Her ilerleme ana kontrol listesinde işaretlenir; gerçek test ve görsel denetim şarttır.
