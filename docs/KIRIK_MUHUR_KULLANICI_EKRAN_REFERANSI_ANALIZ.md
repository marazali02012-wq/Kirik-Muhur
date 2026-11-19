# Kırık Mühür — Kullanıcının Gönderdiği Kung Fu Saga Ekranlarının Analizi

**Tarih:** 19.11.2026 · **Kaynak:** Kullanıcının kendi telefonunda (Türkçe arayüz) aldığı ekran görüntüleri. 20 dosya gönderildi; 11'i birbirinden farklı.
**Not:** Görüntüler yalnız referans olarak incelendi. Depoya ve oyuna **konmadı**; görsel, isim ve metin kopyalanmadı.

## 1) Ekran ekran gözlemler
| # | Ekran | Gözlenen yapı |
|---|---|---|
| 1 | **Sunucu girişi** | Göl ve dağ manzaralı giriş; "Sunucu seç" (EU-EN-1680); "Oyuna Gir"; "Hesap Değiş"; "Duyuru" ve destek ikonları; bölge açılır listesi (Global, EU-TR, RU…) |
| 2 | **Sunucu seç** | Önerilen alan / Sunucum / bölge grupları; durum renkleri: İyi, Meşgul, Bakım |
| 3 | **Duyuru** | Parşömen pencerede maddeli **güncelleme notları**; "Onayla" |
| 4 | **Bölüm giriş kartı** | Yelpaze biçimli kart, kahraman çizimi, 4 satır şiirsel hikâye metni, **"Gir"** düğmesi. Görev zindanına giriş öncesi. |
| 5 | **Oyun HUD'u (Sv5)** | Portrede **seviye rozeti**; **"Savaş Gücü: 2250"** (kırmızı-altın, büyük); para birimleri (+); "Barış" modu; "EXP+0%"; çerçeveli bölge ve koordinat kutusu; **"Sv. 15 Ana Görevi Bitir"** açılım tanıtımı. Yaratık plakası: **"Yaban Kedisi (4. Seviye)"** (yeşil); sürü hâlinde kediler. Hedefin altında kırmızı **hedef halkası**. Görev: "[Ana] Vahşi kediyi evcilleştir – (2/5)". Beceri sırasında **kilitli yuvalar** ("6. Seviye kilidi aç", "11.", "30.") ve **Farm / İptal et** (oto av). Sistem sohbeti, posta ikonu (kırmızı nokta), ayarlar, Rol / Çanta / Beceri, alt EXP çubuğu, nilüfer düğmesi. |
| 6 | **Seviye atlama** | Ekran ortasında büyük, parlak **"Seviye Atladın"** yazısı; altın ışık sütunu; **"Savaş Gücü"** ateşli efekt; **"HP+80 ATK+4"** stat artışı yazısı; **"EXP +1200(+0%)"**; "Al Gümüş×20000 / Al İsimsiz Kaftan×1" satırları. Üstte kırmızı **"(10. Seviye girebilin)"** sonraki hedef ipucu. |
| 7 | **NPC teslim konuşması** | "Geri"; büyük NPC (Usta Wang); isim kurdelesi; cümle; ödül ikonları (EXP 1200, gümüş 20.0K, kaftan "1Aşama"); **"Ödül Topla"**; **"1 sn sonra devam ediniz"** |
| 8 | **Çanta** | Üstte seviye, isim ve **Savaş Gücü**; ortada kaide üstünde karakter; **10 ekipman yuvası** (sol: kask, zırh, eldiven, kemer, bot, silah; sağ: kanat, kolye, muska, yüzük, kilitli, kabak). Altta sekmeler **Eşya / Dekor / Set Taşı**; ızgara envanter; eşyada **"1Aşama"** etiketi ve **yeşil ↑ (daha iyi) oku**; **"Çantası Kapasitesi: 2/84"**; **Düzenle** (sırala) ve **Yut** (eritme). Altta yuvarlak sekmeler: **Çanta / Depo**. |
| 9 | **Depo** | Ayrı depo ızgarası ("Depo / Açık Depo"), "Depo Kapasitesi: 0/72"; altında çanta; "hızlı koymak için eşyaya dokun" notu |
| 10 | **E-posta** | Sistem postası: gönderen, metin, **eşya listesi** (sandık ×1000), **"Al"**; posta listesi (tarih, hediye ikonu, kırmızı nokta); **Hızlı Sil / Hızlı Topla**; "Postalar 20 gün saklanır" |
| 11 | **Beceri** | Seçili becerinin büyük ikonu ve **"Beceri Tanımı / Beceri Etkisi"**; beceri kartları (Normal ATK, Gök Kıyıcı, Kasırga **"11. Seviye kilidi aç"**, İblis Gölgesi **"30. Seviye kilidi aç"**, Potansiyel Motivasyon **"2. Dönüş Açıldı"**); **Beceri Ayarları**: "Bu pozisyona sürüklenen beceriler sırayla kullanılır" (6 yuvalı oto beceri sırası); sekmeler **Savaş Sanatı / Çigong** |

**Ortak pencere dili:** Parşömen ve kâğıt dokulu açık zemin, üstte sol başlık ve çiçek süsü, sağ üstte fener biçimli **✕**, sol altta nilüfer **"Geri"**, altta yuvarlak **sekme düğmeleri**.

## 2) Kırık Mühür 3.31 ile karşılaştırma — eksikler
| # | Eksik | Referans | 3.31'de | Aşama |
|---|---|---|---|---|
| 1 | **Seviye atlama gösterisi**: ortada büyük yazı, ışık sütunu, "Savaş Gücü" efekti, **"HP+N ATK+N" stat artışı** | Ekran 6 | Halka ve "SEVİYE N!" yazısı var; stat artışı ve büyük gösteri yok | **3E** (görsel) — hemen yapılabilir |
| 2 | **Yaratık plakasında seviye** ("(4. Seviye)") ve **hedef halkası** | Ekran 5 | "Ad Sv11" ve sarı elips var; biçim farklı | **3E** — küçük |
| 3 | **Beceri yuvalarında kilit**: "N. Seviye kilidi aç" | Ekran 5, 11 | 3 beceri baştan açık; kilit yok | **3C** (beceri açılımı) |
| 4 | **Beceri ekranı**: tanım ve etki, açılma seviyesi, **oto beceri sırası** (6 yuva) | Ekran 11 | Basit liste ve "KULLAN" | **3C** |
| 5 | **Çanta ekranı**: karakter + **10 yuva**, ızgara, sekmeler, **kapasite**, **Düzenle**, **Yut (eritme)**, "↑ daha iyi" oku, **aşama (tier)** etiketi | Ekran 8 | 4 yuva (silah, zırh, tılsım, bot); liste; geliştirme düğmesi; kapasite, sıralama ve eritme yok | **3C** (eşya/ekonomi) + **3E** (görünüm) |
| 6 | **Depo** | Ekran 9 | Yok | **3C** |
| 7 | **Posta (sistem postası)**: ödül ekli mesajlar, Al / Hızlı Topla, süre | Ekran 10 | Yok. Tek oyunculuda **yerel sistem postası** yapılabilir (hoş geldin, bölüm ödülü, telafi). Oyuncular arası posta sunucu ister. | Yerel: **3C/3E**; oyuncular arası: **5** |
| 8 | **Bölüm giriş kartı** ("Gir") | Ekran 4 | Yok; zindan da yok | **4** (zindan girişi); hikâye kartı olarak **3E** |
| 9 | **Sonraki hedef ipucu** ("(10. Seviye girebilin)") | Ekran 6 | 3.31 tanıtım kutusu benzer işi görüyor | Var (geliştirilebilir) |
| 10 | **Oto av "Farm / İptal et"** düğmesi beceri satırında | Ekran 5 | Oto savaş düğmesi ayrı yerde | **3E** — yerleşim |
| 11 | **Ortak pencere dili**: parşömen zemin, fener ✕, nilüfer Geri, yuvarlak sekmeler | Tüm menüler | Koyu mavi paneller; her menü farklı | **3E** — özgün tema |
| 12 | **Giriş ekranı, duyuru, sunucu seçimi, hesap** | Ekran 1–3 | Yok. Sunucu ve hesap **gerçek backend ister** (sahtesi yapılmaz). **Yerel "Duyuru / Güncelleme notları"** penceresi yapılabilir (sürüm notları gerçek). | Duyuru: **3E**; sunucu/hesap: **5** |
| 13 | **Barış/PK modu, sistem sohbeti, VIP, premium para** | Ekran 5 | Yok; çevrimiçi ve gerçek ekonomi olmadan **eklenmeyecek** | **5–6** |

## 3) Öneri — sıradaki iş paketi
**A) Hemen yapılabilir, aşama ihlali yok (3E görsel ve yerleşim):**
1. Seviye atlama gösterisi: büyük yazı, ışık sütunu, **"CAN +19 SAL +3 SAV +1"** gerçek stat farkı, güç artışı.
2. Yaratık plakası "(4. Seviye)" biçimi ve kırmızı hedef halkası.
3. Ortak özgün **parşömen pencere teması**: bütün menüler aynı çerçeve, ✕, Geri ve yuvarlak sekmeler.
4. Yerel **Duyuru** penceresi: oyunun gerçek sürüm notları.
5. **Bölüm hikâye kartı**: Kül Geçidi'ne ilk girişte yelpaze kartı ve "Gir".

**B) 3C kapsamı (onayınla):**
- Beceri açılma seviyeleri ve kilitli yuvalar.
- Beceri ekranı ve oto beceri sırası.
- 10 yuvalı çanta, ızgara, kapasite, sırala ve eritme; eşya aşaması ve "↑ daha iyi".
- Depo.
- Yerel sistem postası.
- Zorluk ve ekonomi dengesi.

**C) 4 ve sonrası:** Zindan ("Gir" kartından giriş), boss mekanikleri. **5:** Sunucu, hesap, sohbet, PK, oyuncular arası posta.
