# Kırık Mühür — Boss Referans İncelemesi, Eksikler ve Altyapı Planı

**Tarih:** 19.11.2026 · **Amaç (kullanıcı talimatı):** "Boss referansı ara, oku, resim bul. Altyapı hazırlığı yapıyoruz; şu an amaç eksik olanları bulmak."
**Durum:** Bu belge **araştırma ve plan** belgesidir; oyun kodu değiştirilmedi. Boss/zindan sistemi aşama kilidine göre **Aşama 4** kapsamındadır. Çok oyunculu boss türleri (world boss, lonca bossu) ise **Aşama 5**'tir ve sunucu gerektirir.

## 1) Kaynaklar — neyi gerçekten inceledim
| Kaynak | İçerik | Güven |
|---|---|---|
| BlueStacks *Kung Fu Saga Beginners Guide* | BP'nin önemi, ikinci sınıf (Sv60), açık alanda büyük boss savaşları, ana/yan görev | Rehber metni; bölümler başka bir oyun rehberinden uyarlanmış olabilir |
| BlueStacks *Features Guide* | 6 sınıf, oto ilerleme, tab-hedefli savaş, **kaçınma (dodge)** mekaniği, saldırı alanı göstergesinin olmaması, **Kule (Floor 100+)** | Rehber metni |
| GamingonPhone *Beginners Guide* | Lonca görevleri, savaşları ve etkinlikleri; para birimleri (B-Ingot, itibar, lonca puanı) | Rehber metni |
| Web arama özeti (gamerjournalist / tryhardguides hediye kodu sayfaları) | "Individual Boss Challenge Token", "Boss Refresh Card", "Offline Grinding Card" ödülleri | Yalnız arama özeti. Sayfalar bu sunucuya 403 döndü; tam metin okunamadı. |
| YouTube `mAfrnQoz1Ic` "Kung Fu Saga First Boss Fight" | **Hikâye zindanı** "Cloaked Tian Shao": dalga paneli, süre, Çıkış düğmesi, ganimet | Gerçek oyun kareleri (kapak + %25/%50/%75) |
| YouTube `pvIUnNbHDDk` "Part 2 – … Defeat Tough Bosses" | **Dairesel boss arenası**, geri sayım, boss paneli, çok oyuncu; "Revel and Rejoice" etkinlik menüsü | Gerçek oyun kareleri |
| YouTube `MRBD02JsrH0`, `t_UH_Ki3n4A` (Avatars Saga) | Yükleme ipuçları: "Her gün 19:30 Lonca Şenlik Ateşi ve Lonca Bilmecesi", "Hazine Avı'nda ilk 6 hazine", "çevrimdışı av süresini 20 saate uzat" | Gerçek oyun kareleri |
| Uptodown ekran görüntüleri (3.31 turu) | Kalabalık yaratık sürüleri, hasar rakamları, "Gain" satırları, kuşanma kartı | Gerçek oyun içi ekranlar |

**İncelenemeyenler:** Videoların tamamı (YouTube bot doğrulaması; yalnız 4'er kare) ve kod sayfalarının tam metni (403). Kopyalanan görsel, isim veya metin yok. Referans görselleri depoda değil.

## 2) Kung Fu Saga'da gözlenen boss yapısı
1. **Hikâye zindanı bossu (tek kişilik, örneklenmiş alan):**
   - Ayrı bir zindan alanı açılıyor; solda **zindan paneli**: ad, "Zindan hedefi: canavar dalgalarını yen", **"Dalga 2/2"**, "Not: Pelerinli Adam'ı yen".
   - Üst ortada kırmızı şeritte **"Kalan süre 04:41"** geri sayımı; sağ üstte **Çıkış** düğmesi.
   - Önce **canavar dalgaları**, sonra **boss**. Boss çok büyük ve koyu siluetli.
   - Bitişte **"Gain" ganimet satırları** (başlık, cübbe…) ve **kuşanma kartı**.
2. **Açık alan / saha bossları:** Rehbere göre "büyük açık alanlarda", **düzenli** aralıklarla çıkıyor; yüksek seviye ganimetin ana kaynaklarından biri. Kalabalık oyuncu katılımı var.
3. **Kişisel boss (Individual Boss):** "Boss Challenge Token" ile giriliyor, "Boss Refresh Card" ile yenileniyor. Yani **deneme hakkı ekonomisi** var. Ayrıntı doğrulanamadı.
4. **World boss arenası:** Dairesel, katlı ("Layer") arena, süreli, çok oyunculu. Muhtemelen hasara göre sıralama ve ödül (doğrulanmadı).
5. **Lonca bossu / lonca etkinlikleri:** Belirli saatlerde (19:30) lonca alanında; arkadaşlarla birlikte kesiliyor.
6. **Kule (Tower):** Kat kat yükselen PvE (Floor 100+); yüksek katlarda saldırıdan **kaçınma** önemli.
7. **Savaş:** Tab-hedefli, beceriler otomatik nişan alıyor. Saldırı alanı göstergesi yok ("menzil göstergesi yok" eleştirisi). Güç (BP) belirleyici.

## 3) Kırık Mühür'de bugün olan (3.31)
- **Hikâye bossları:** Mühür Kolosu (Kırık Tapınak, görev 2) ve Kül Lordu (Kül Geçidi, görev 16). İkisi de **yalnız kendi hikâye görevinde** doğuyor (3.26).
- Boss çubuğu (üstte; isim, seviye, can), isim plakası, büyük hasar rakamları, sarsıntı, beceri efektleri.
- Görev ödülü tek kez ve bilgi kartıyla; Mühür Parçası (relic) bir kez.
- Ölüm → köyde yeniden doğma → görev tuşuyla devam.

## 4) EKSİKLER — boss sistemi (öncelik sırasıyla)
| # | Eksik | Referans | Kırık Mühür'de | Aşama |
|---|---|---|---|---|
| 1 | **Boss mekanikleri**: özel saldırılar, yere çizilen **uyarı alanları** (daire veya koni), aşamalar (%50'de öfke), çağırma | Kaçınma mekaniği var | Boss, sıradan yaratık gibi yaklaşıp vuruyor; özel saldırı, uyarı ya da aşama yok | **4** |
| 2 | **Örneklenmiş zindan**: ayrı alan, **dalga → boss**, **süre**, **Çıkış**, başarı/başarısızlık ekranı | Hikâye zindanı | Boss açık bölgede; dalga, süre ve çıkış yok | **4** |
| 3 | **Zindan paneli** (hedef, dalga x/y, not) ve **süre şeridi** | Var | Yok (yalnız görev paneli) | **4** |
| 4 | **Ganimet tablosu**: boss'a özel eşya havuzu, nadirlik, ilk kesim ve tekrar ödülü ayrımı, tek kez verilen kimlikler | Ganimet + "Gain" + kuşanma | Yalnız sabit relic ve görev ödülü; boss eşya havuzu yok | **3C** (nadirlik/düşüş) + **4** |
| 5 | **Deneme hakkı ekonomisi**: günlük giriş hakkı, yenileme kartı, kişisel boss listesi | Challenge Token / Refresh Card | Yok | **4** (+ **6** ekonomi) |
| 6 | **Saha bossu zamanlayıcısı**: belirli aralıkla doğma, gerçek saat, "X dk sonra doğar" bilgisi | Düzenli saha bossları | Yok | **4** (tek oyunculu yapılabilir) |
| 7 | **Kule** (kat kat zorlaşan boss ve dalga) | Floor 100+ | Yok | **4** |
| 8 | **Boss görseli**: büyük çok parçalı çizim, giriş animasyonu, aşama değişimi, ölüm sahnesi | Büyük siluet, efekt | Kolos ve Kül Lordu 64×80 sprite'ın büyütülmüşü; giriş ve aşama animasyonu yok | **3E/4** |
| 9 | **Hasar sıralaması ve katkıya göre ödül** | World boss | Yok; tek oyuncuda anlamsız | **5** (sunucu) |
| 10 | **World boss, lonca bossu, saatli lonca etkinliği** | Var | Yok; **sunucu, hesap ve eşzamanlılık gerekir**, sahtesi yapılmayacak | **5** |
| 11 | **Zorluk dengesi**: boss'un seviyeye ve güce göre ölçeklenmesi, "önerilen güç" | BP belirleyici | 26 görevde hiç ölüm yok; Kül Lordu kolay | **3C** |
| 12 | **Çevrimdışı av** (offline grinding) ve ilgili kartlar | Var | Yok | **6** (ekonomi ve tasarım kararı gerekir) |

## 5) Altyapı planı (Aşama 4'e hazırlık — veri ve motor ayrımı)
Bunlar **önerilen yapı**; 3B'deki içerik katmanı yaklaşımının devamı. Aşama 4 açılınca uygulanacak.
1. **Boss tanım verisi (`BOSS_DEFS`)**: `id, ad, sprite, ölçek, seviye, can/saldırı/savunma, aşamalar[{canYüzdesi, hızÇarpanı, yeniBeceriler}], beceriler[{tür: daire|koni|çizgi|çağırma, uyarıSüresi, hasarÇarpanı, bekleme}], öfkeSüresi, ganimetTablosu, ilkKesimÖdülü`.
2. **Karşılaşma motoru (`encounter`)**:
   - Durumlar: `giriş → dalga n → boss → zafer | yenilgi | süre doldu | çıkış`.
   - Geri dönüş noktası ve oyuncu durumu (bölge, konum, oto ayarı) **kaydedilip geri yüklenir**.
   - Ödül kimlikleri **tekil**: `boss:<id>:ilk`, `boss:<id>:<gün>`.
3. **Uyarı alanı (telegraph) çizimi**:
   - Yerde dolan kırmızı daire veya koni. Hasar yalnız süre bitince ve alan içindekilere işler.
   - **Oto savaş alandan çıkar**; manuel oyuncu kaçınabilir. Bu, referanstaki "menzil göstergesi yok" eksiğini Kırık Mühür lehine çevirir.
4. **Zindan arayüzü**: sol panel (hedef, dalga, not), üstte süre şeridi, Çıkış, sonuç ekranı (süre, ganimet "Gain" satırları, ilk kesim rozeti).
5. **Hak ekonomisi**: günlük sıfırlanan yerel sayaç (cihaz tarihi). Hile riski raporlanacak; gerçek koruma sunucu ister.
6. **Saha bossu**: bölge başına doğma zamanlayıcısı (gerçek saat damgası kayıtta); haritada ve tanıtım kutusunda "X dk sonra".
7. **Test altyapısı**: deterministik `__kmTest` kancaları (boss aşamasını zorla, uyarıyı tetikle, süreyi ilerlet). Mevcut 3A, 3B ve Android paketleri regresyon olarak koşmaya devam edecek.

## 6) Sonuç
- **Bugünkü hikâye bossları çalışıyor**, ama referanstaki boss deneyiminin çekirdeği yok: **mekanik + zindan + ganimet + hak ekonomisi**. En kritik 3 eksik:
  1. Uyarı alanlı boss becerileri ve aşamalar.
  2. Dalgalı, süreli, çıkışlı zindan.
  3. Boss'a özel ganimet tablosu.
- **Önerilen sıra (aşama kilidine uygun):**
  - **3C:** Nadirlik, düşüş ve zorluk dengesi (boss ganimetinin temeli).
  - **4:** Bu belgedeki 1–8. maddeler.
  - **5:** World boss, lonca bossu, sıralama (sunucu).
- Sahte çevrimiçi boss, sahte sıralama ya da sahte lonca etkinliği **eklenmeyecek**.
