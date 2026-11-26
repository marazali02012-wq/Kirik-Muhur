# 3.204 — Çevrim içi içerik ve yerel sunucu temeli
26.11.2026. Kullanıcı kararı: İnternet/sunucu henüz hazır değil diye içerik veya mekanik listeden çıkarılmaz. Yerel işlev, ortak veri modeli ve sunucu işlemleri birlikte tasarlanır; canlı bağlantı kanıtı olmadan online kabul verilmez. 15 ana sıra, 84 P kontrolü, T01–T08, M/R/Q/V, 500 normal + 100 peri, 500 kule, dengeli ücretli yükselme korunur.

## Referanslar
- Kung Fu Saga resmi sürüm notları https://apps.apple.com/us/app/kung-fu-saga-martial-path/id1660688865 : çapraz sunucu ekipman, müzayede, ileri yarışma.
- Pearl Abyss https://www.world.blackdesertm.com/Ocean/Wiki?wikiNo=670 : lonca rolü, haftalık giriş, takım bossu, kat, ilk zafer ve lonca gelişimi. Kaynakta 20 kat, 8–10 kişi örneği; Kırık Mühür için kesin sayı değil.
- https://www.world.blackdesertm.com/Ocean/Wiki?wikiNo=42 : ortak boss, seans, hasar katkısına göre ödül, hikâye ve boss bilgisi.
- https://www.world.blackdesertm.com/Ocean/Wiki?wikiNo=27 : takım daveti, hızlı eşleşme, hikâye şartı, günlük puan ve sıralama. Kesin değerler kopyalanmadı.
- https://heroiclabs.com/docs/nakama/concepts/multiplayer/authoritative/ ve https://heroiclabs.com/docs/nakama/concepts/storage/permissions/ : sunucu otoritesi, sahiplik, oda durumu ve giriş doğrulama; Nakama kurulmadı.
- Özgün KFS 100/102/104/106/108/110/112/114/116/118 ekranları kullanıcı arşivinden tekrar açıldı. Sıralama kategorileri, oyuncu profili, turnuva listesi, ödül ve mağaza. Bunlar hesap test ekranıyla birebir tasarım karşılaştırması değildir; sonraki ilgili ekranlar için kaynak.

## Ortak içerik kaydı
16 özgün online menü kimliğinin tamamı shared/online-content.cjs ile HTML içine eşit içerikle bağlandı.
| Kimlik | İçerik | Durum / bağlantı kuralı |
|---|---|---|
| account | Hesap ve karakter | Yerel API + kontrollü UI; kayıt/oturum/sahiplik. Oyun ilerlemesi eşitlenmez. |
| friends | Arkadaş | Yerel API: istek, kabul, liste, engel. Oyun UI açık. |
| chat | Dünya sohbeti | Yerel API: gönder/listele, engel, hız sınırı. Canlı yayın ve moderasyon açık. |
| team | Takım | Yerel API: oluştur/davet/kabul/çıkış, lider devri. Ortak savaş ve UI açık. |
| mail | Sunucu postası | Sözleşme: alıcı, teslim ID, kaynak, claim. Mevcut yerel taşma postası ayrı. |
| guild | Lonca | Sözleşme: üyelik, roller, yetki, bağış. |
| guildboss | Lonca bossu | Sözleşme: rol, haftalık hak, seans/kat, ortak HP, katkı, tek ödül, yeniden giriş. |
| guildwar | Lonca savaşı | Sözleşme: takvim, üyelik, eşleşme, server sonucu, sezon. |
| arena | PvP arena | Sözleşme: gerçek oyuncu/kuyruk, combat input, server sonucu. Yerel XP Arena ayrı. |
| rank | Sıralama | Sözleşme: server skoru, sezon, sonuç. |
| worldboss | Ortak dünya bossu | Sözleşme: seans, ortak HP, katılım, katkı ve tek ödül. Mevcut yerel Kadim Kolos ayrı. |
| coopdungeon | Takım zindanı | Sözleşme: oda, hak, üyelik, gerçek dalga ve ortak sonuç, reconnect. |
| crossdungeon | Sunucular arası zindan | Sözleşme: shard, ortak hak, oda, sahiplik. |
| crosswar | Sunucular arası savaş | Sözleşme: shard, eşleşme, sezon ve sonuç. |
| market | Pazar/müzayede | Sözleşme: gerçek ilan, sahiplik, emanet, atomik para/eşya. Gerçek satın alma yok. |
| premium | Ücretli gelişim | Sözleşme: ürün/ödeme doğrulaması, tek teslim. Sürekli ödeme yok. Fiyat/ürün/eşik açık. |

## Gerçek yerel uygulama
Node.js 22.16 node:sqlite (deneysel uyarı), HTTP API v1, SQLite veri şeması ve transaction. Hesap ve karakter ayrı kimlik; scrypt rastgele salt, token hash, 24 saat oturum; sadece kendi karakterini okuma; istemciden level/altın/stat kabul edilmez. Arkadaş isteğinde tekrar engeli, yalnız alıcı kabulü, engelleme; takım davetinde lider yetkisi ve dört kişilik test sınırı, üyelik tekil, lider devri; sohbet mesajı uzunluk ve yerel hız sınırı, engellenen kullanıcı filtreleme. 4 kişilik takım ve süreler geliştirme test değerleridir, nihai tasarım eşiği değil.
Sunucu loopback ile sınırlandırıldı, canlı servis kurulmadı. TLS, üretim kimliği/kurtarma, parola deneme sınırı, dağıtık hız sınırı, moderasyon, gerçek gameplay sync, WebSocket/tick, ekonomi/ödül, pazar, lonca, satın alma ve çok oyuncu yük testi açık. Yerel oyun verisi sunucuya aktarılmaz.
HTML mevcut online detay ekranında durumları ayırır. Hesap test paneli sadece localhost HTTP'de ve gerçek health doğrulaması sonrası açılır; dosya açılışında sahte hesap/ödül yok. Sosyal UI henüz API'ye bağlanmadı.

## Kanıt
34 gerçek Node HTTP/SQLite kontrolü, üç test hesabı ve DB restart: yetkisiz erişim/tekrar reddi, arkadaş, takım, lider, mesaj, engel ve kalıcılık. 4 katalog kontrolü: tüm 16 ID, HTML/ortak modül eşit, 4 API/12 sözleşme, bilinmeyen ID. 27 önceki 3.203 erişim regresyonu (sentetik durum, bellek storage, kısmi raster). 13 kontrollü UI kontrolü: bağlantısız hesap/pazar gerçek menü tıklaması; bağlı hesap arayüzü sentetik transport ile. Chromium localhost/file navigasyonu yönetim kısıtıyla engellendi, gerçek API ve UI ayrı test edildi; uçtan uca tarayıcı/API bağlantısı iddia edilmez. 78 toplam ayrı kontrol, sayfa hatası 0. UI testinde 79 gerçek raster ve diğerleri yer tutucu; dört ekran boyutu ve kompakt panel incelendi. 29 inline JS + 8 CJS syntax ve ZIP CRC başarılı. 227 raster URI çokluğu değişmedi. 3.203 erişim/ödül değerleri korunur.
ZIP Kirik_Muhur_3_204_Icerik_Sunucu_Temeli_TEST.zip, 54.423.267 bayt, SHA256 5d8f3348cc07cb2d9647cd8a68eacabe6f4cbbd161cb6e4ccf82822014076d5f; HTML SHA256 4896e671deb30531e3c54a87dbd909fd5e41336bc5a7d3bc4362f08909fc2ec7. ZIP index.html, OKU.txt, CONTENT_PLAN.md, shared 5 CJS, server 2 kaynak, tests 2 CJS. Oyun kodu ve sunucu dosyaları ZIP'te; ana index.html ve üretim sunucusu değişmedi.
T05 ve P48/P49/P75/P77/P80 kısmi yerel altyapı. P01–84 açıkları ve 08 içerik sırası korunur. Bir sonraki temel: ortak ödül/ekonomi işlemi, sunucu karakterinin gerçek görev kazanımı ve ortak ilerleme; bütün 500/100 hikâyesi, online içeriklerin gerçek savaş/ödül ve UI akışları ayrı açık.
