# Kırık Mühür — Ortak görsel sistem 3.221
Kullanıcı kararı: şimdi ortak kaliteli görsel temel, yeni sistemlerde aynı dil, oyun bitişinde bütün ekranlara son cila. Kung Fu Saga'nın gerçek oyun ekranları işlev ve sanat yönü referansı, birebir varlık kopyası değil.
## Standart
- Pencereler: sıcak parşömen içerik, koyu ahşap başlık ve çift pirinç kenar. İkonlu eşya yuvaları: nötr koyu taş, mevcut nadirlik çerçevesi korunur.
- İşlem butonu: kızıl; ikincil: ahşap; seçili sekme: altın; olumlu durum: yeşim; kilitli durum okunur ve pasif. Mavi düz web panelleri kullanılmaz.
- Renk tokenları: paper #ecdfc6, ink #3e3024, muted #6c5944, gold #bd9455, edge #8a653a, ivory #fff0d1, jade #3e6553, red #873d2d. Ortak CSS değişkenleri --km-ui-*.
- Yeni panelde aynı başlık/çerçeve, sekme, eylem, ikon yuvası ve bilgi kartı. Oyun mantığı, erişim ve kayıt güvenliği korunur; fazladan animasyon veya yük eklenmez. Çantada gerçek karakter ve yuvalar korunur.
- Her tur önce gerçek web ve kullanıcı görsel referansları, ardından gerçek render, 320/360/393/412 px taşma, kontrast ve eylem kontrolü. Orijinal kaynak erişilemiyorsa belirt. Fiziksel Android ayrı kabul. Son cila, özgün ikon çizimi ve tüm panellerin tek tek onayı sona.
## Kaynak
theme_3_221.css ve patch_3_221.py, yerel Kirik_Muhur_3_221_YAMA.zip içinde. GitHub kaydı kaynak dosyalarının yüklendiği anlamına gelmez.
