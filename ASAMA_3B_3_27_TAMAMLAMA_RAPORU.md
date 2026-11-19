# Kırık Mühür 3.27 — Aşama 3B Tamamlama: Değişiklikler ve Test Raporu

**Kaynak:** `Kirik_Muhur_3_26_3B_Harita_Gorev_TEST.html` (değiştirilmedi).
**Yeni dosya:** `Kirik_Muhur_3_27_3B_Tamamlama_TEST.html`. Tek dosya, tek `<script>`.
**Uygulama:** `testler/3B_3_27/patch327.py`. Her değişiklik "tam 1 kez geçen eski metin → yeni metin" kuralıyla uygulanıyor.
**Tarih:** 19.11.2026. **Ortam:** Chromium (Playwright) mobil dokunmatik emülasyon; fiziksel Android cihaz yok.
**Kullanıcı talimatı:** "B3 bitince yaz eksikleri tamamla". 3.26 raporunda açık kalan 3B maddeleri tamamlandı.

**Korunanlar:**
- `index.html`, 3.19–3.26 HTML dosyaları, kayıt anahtarı (şema 327)
- 16 hikâye, 10 devam ve 3 istatistik yan hedefi
- 3A ve 3.26 davranışları
- XP, altın ve hasar formülleri

## 1) Mevcut üç haritada çizim = çarpışma
3.26'da ağaçlar, sütunlar, sunak ve tezgâhın içinden geçilebiliyordu. Bunlar artık engel:

| Harita | Eklenen engel | Yöntem |
|---|---|---|
| Ruh Ormanı | 22 ağaç gövdesi | Gövde rengi (111,79,69) **görüntü piksellerinden** bileşen analiziyle bulundu. Yalnız gövde bloklanıyor, taç arkasından geçilebiliyor. |
| Fener Köyü | 4 ağaç gövdesi, kırmızı tezgâh, 4 sandık | Gövdeler pikselden, diğerleri harita üstüne ızgara bindirilerek ölçüldü. |
| Kırık Tapınak | 4 köşe sütunu, kuzey sunağı, 2 fener direği | Izgara bindirmesiyle ölçüldü. Kül Geçidi kapısının önü açık bırakıldı. |

**Test C01:** 26 gövde engelinin 26'sında gövde pikseli var. Bütün engellerin merkezi bloklu. 41 içerik noktası (NPC, doğma, geçit ve varış, yan görev noktaları) yürünebilir.

**Bilinçli istisna:** Orman ve tapınaktaki alçak taş halkası yürünebilir zemin süsü olarak bırakıldı. Bloklansa taşlar arası boşluklar kapanıyor ve gölgelerin alanı duvara dönüyor. Görsel netleştirmesi 3E'de yapılacak.

## 2) Yol bulma kök neden düzeltmeleri
Yeni engeller **3.24'ten beri var olan iki yol bulma hatasını** görünür kıldı:

**a) Engel sınırında kilitlenme**
- Belirti: Karakter tezgâhın köşesinde sonsuza kadar duruyordu ("Köydeki Kayıp İz" görevi takıldı).
- Kök neden: A* ızgara hücre merkezleri tam engel sınırına (y=735) denk geliyordu. Hareket bir eksende engellenip öbüründe neredeyse sıfır ilerliyordu.
- Düzeltme: Yol bulucu sınıra 6 birimden yakın hücreleri ara nokta yapmıyor (hedef hücresi hariç).
- Emniyet: Yol varken 0,45 sn ilerleme olmazsa rota yeniden hesaplanıyor ve karakter engelden 6 birim uzaklaştırılıyor.

**b) Engel kenarındaki hedefe yol yok**
- Belirti: Hedef noktası yürünebilir olsa da içinde bulunduğu hücrenin merkezi engeldeyse A* hiç yol döndürmüyordu.
- Düzeltme: Hedef hücresi bloklu ise en yakın açık hücre hedef alınıyor, son adım doğrudan hedefe yürünüyor.

**c) İstem dışı bölge değişimi**
- Belirti: Aynı bölgede bir yere dokunup yürürken rota bir geçidin yanından geçerse oyuncu başka bölgeye ışınlanıyordu.
- Düzeltme: Dokunarak yürürken geçit yalnız hedef o geçidin kendisiyse kullanılıyor. Joystick ve klavyeyle serbest yürüyüşte, otomatik görevde ve harita rotasında davranış değişmedi.

**Test C02, rota regresyonu:** 4 bölgede 480 rastgele yürünebilir hedefe gerçek yürüyüş yapıldı.
- Sonuç: **479/480** ulaştı (köy 120, orman 119, tapınak 120, Kül Geçidi 120); ortalama 3,5 sn.
- Kalan tek hedef: ormanda ağaçlarla çevrili bir köşe; 65 birim yakına kadar ulaşıldı.
- Bu testin ilk koşularındaki başarısızlıkların çoğu test betiğinden kaynaklanıyordu: betik ödül penceresini kapatmıyor, bölge değişince yaratıkları yeniden canlandırıyordu. Betik düzeltildikten sonra %96'da kalan farkı (b) ve (c) hataları açıkladı; ikisi de giderildi.

## 3) NPC yan görev akışı (yeni)
- 6 yan görev, farklı NPC'lerde ve bölgelerde:

| NPC | Yan görev | Hedef | Açılma |
|---|---|---|---|
| Bilge Işın | Fener Yağı | Köyde 2 yağ küpü topla | Baştan |
| Otacı Lin | Şifalı Yosun | Ormanda 3 yosun topla | Görev 1'den sonra |
| Yazman Tara | Kayıp Sayfalar | Tapınakta 2 sayfa bul | Görev 2'den sonra |
| Demirci Oran | Nöbetçi Çekirdeği | 2 taş nöbetçi yen | Görev 3'ten sonra |
| Gözcü Nera | Diken Sürüsü | 3 diken kurdu yen | Görev 10'dan sonra |
| Münzevi Sela | Kıvılcım Özü | 4 kül kıvılcımı yen | Görev 11'den sonra |

- **Alma:** NPC'ye dokunarak veya ✦ tuşuyla. NPC'nin üstünde alınabilir görev için `!`, teslim için `?` işareti var.
- **Ana görevle paralel ilerliyor.** Yaratık sayımı ve toplama noktaları işaretleniyor.
- **Teslim:** NPC'nin yanına dönünce otomatik oluyor. Ödül **tek kez** veriliyor (`side327-*`) ve "YAN GÖREV TAMAMLANDI" bilgi penceresi açılıyor; onay sorusu yok.
- **Görev ekranındaki "YAN GÖREVLER" bölümü:**
  - Kilitli görevler gösterilmiyor; yalnız "N yan görev hikâye ilerledikçe açılacak" yazıyor.
  - "YOL" düğmesi NPC'ye ya da sıradaki hedefe yürütüyor. Ana oto görev bu sırada duraklıyor; görev kutusuyla devam ediyor.
- **Kayıt:**
  - Yan görev durumu ve ilerlemesi (`sq`) kaydediliyor.
  - Bozuk alanlar onarılıyor.
  - Ödülü verilmiş bir görev her zaman "tamamlandı" sayılıyor.

## 4) Yaratık grupları
- **Sürüler:** Diken kurdu sürüsü (3), taş nöbetçi çifti, iki kül kıvılcımı sürüsü (2 ve 3; kıvılcım sayısı 3'ten 5'e çıktı).
- **Sürü davranışı:** Bir üye vurulunca ya da saldırıya geçince sürünün geri kalanı da oyuncuya yöneliyor.
- **Değişmeyen:** Hikâyedeki gölge konumları aynı kaldı.

## Test sonuçları
| Paket | Sonuç |
|---|---|
| 3.27 tamamlama (`suite327.js`) | **8/8 PASS**: C01 çizim/çarpışma, C02 rota 479/480, C03 6 yan görevin tam akışı (gerçek dokunuşla alma, tek ödül + popup, ikinci teslimde değişiklik yok, yeniden yüklemede durum korunuyor), C04 YOL düğmesi, C05 sürü, C06 ×2 kayıt geçişi, C07 görsel denetim |
| 3B regresyonu (`suite_3B_regresyon.js`) | REG3B |
| 3A regresyonu (`suite_3A_regresyon.js`) | REG3A |
| 26 görev zinciri ×3 sınıf | 26/26 (B06 içinde) |

## AŞAMA 3B KABUL DURUMU
**3B kapsamındaki bütün maddeler tamamlandı ve tarayıcıda test edildi:**
- Bölge kilitleri
- 7 NPC
- Savaş, toplama, keşif, yazıt ve konuşma görevleri
- Yan görev akışı
- Yaratık türleri ve grupları
- Hikâyeye bağlı bosslar
- Çizim = çarpışma
- İçerik katmanının motordan ayrılması
- Rota regresyonu

**Açık kalanlar:**
- Fiziksel Android kabulü (3A'dan taşınıyor).
- Zorluk dengesi: 26 görevde ölüm yok. Bu 3C'nin kapsamı.

**3C'ye geçiş:** Kullanıcı onayıyla.
