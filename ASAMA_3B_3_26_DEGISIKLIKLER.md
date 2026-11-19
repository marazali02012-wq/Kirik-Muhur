# Kırık Mühür 3.26 — Aşama 3B: Harita ve Görev — Değişiklikler

**Kaynak:** `Kirik_Muhur_3_25_3A_Onarim_TEST.html` (değiştirilmedi).
**Yeni dosya:** `Kirik_Muhur_3_26_3B_Harita_Gorev_TEST.html`. Tek dosya, tek `<script>`.
**Uygulama:** `testler/3B_3_26/patch326.py`. Her değişiklik "tam 1 kez geçen eski metin → yeni metin" kuralıyla uygulanıyor; eşleşme tutmazsa betik duruyor.
**Aşama geçişi:** 3A, kullanıcı kararıyla kapatıldı (19.11.2026, "3A bitir 3B'ye geç"). Fiziksel Android kabulü ve canlı HTTPS kapat/aç denemesi açık madde olarak duruyor.

**Korunanlar:**
- `index.html` ve 3.19–3.25 HTML dosyaları
- Kayıt anahtarı `kirikMuhurQuestFlowV324Test`; eski anahtarlar yalnız okunuyor
- 3.24'ün 10 ana görevi (sıra, ödül, ekipman aynı), 5 devam görevi (havuzun ilk 5'i) ve 3 yan hedefi
- 3A düzeltmelerinin tamamı
- XP, altın ve hasar formülleri değişmedi (3C kapsamı)

## 1) İçerik katmanı motordan ayrıldı
Bütün içerik tek bir veri bloğunda tanımlanıyor (`// ===== 3.26 İÇERİK KATMANI`); görev motoru bu veriyi okuyor:
- `KM326_UNLOCK`, `KM326_UNLOCK_TEXT`: bölge kilitleri
- `KM326_GATES`: geçitler, varış noktaları, etiketler
- `KM326_NPCS`: 7 NPC, her birinin görünümü ve konuşma satırı
- `KM326_CREATURES`: 6 yaratık türü (ad, ölçek, ödül, menzil, boss/hikâye bayrağı)
- `KM326_SPAWNS`: bölge başına doğma noktaları ve hangi görevden sonra çıkacakları (`from`)
- `KM323_STORY` (16 görev) ve `KM323_REPEAT` (10 görevlik devam havuzu)

Daha önce sabit kodlanmış olan şunlar artık bu veriden üretiliyor:
- `enemiesFor`, `questTarget`, `portalLocation`, `portal`
- tick içindeki geçit tetikleyicisi, `mapRoutePortal`
- mini harita geçitleri, geçit çizimi, NPC çizimi
- harita ekranındaki görev işaretleri

## 2) Yeni bölge: Kül Geçidi (04)
- Kırık Tapınak'ın kuzeyinde **zaten çizili olan ışıklı kapıdan** giriliyor.
- Sahne özgün ve prosedürel (`km326MakeAshpass`): kül dokulu zemin, patika, lav çatlakları, bazalt sütunlu kayalar, lav havuzları, ölü ağaçlar.
- **Kaya ve lav çizimleri doğrudan `obstacles.ashpass` dikdörtgenlerinden çiziliyor**; çizim ile çarpışma aynı veriden geliyor. Test B03: 7 engelin her birinde alanın %72–100'ü kaya/lav paletinde, merkezleri bloklu.
- Mini harita, dünya haritası, dikey dünya süsü (KM317) ve ışık noktaları (WORLD_GLOW) bu bölgeye eklendi.

## 3) Gerçek bölge kilitleri ve rota
| Bölge | Açılma koşulu |
|---|---|
| Fener Köyü, Ruh Ormanı | Baştan açık |
| Kırık Tapınak | 1. görev ("Ormanın Gölgeleri") teslim edilince |
| Kül Geçidi | 10. görev ("Mührün Kaynağı") teslim edilince |

- Kilitli geçide yürüyünce oyuncu geri itiliyor, nedeni bildirimle yazılıyor.
- Harita rotası kilitli bölgeye kurulamıyor; haritada `🔒 KİLİTLİ` gösteriliyor; mini haritada kilitli geçit kırmızı.
- Bölge açılınca bildirim çıkıyor ve ödül penceresinde "🔓 Yeni bölge açıldı" satırı görünüyor.
- `km326NextGate`, açık bölgeler üzerinde en kısa geçit zincirini hesaplıyor (köy → orman → tapınak → Kül Geçidi; dönüşte tapınak → köy). Oto görev yalnız bu zincirdeki geçidi kullanıyor, manuel harita rotası da öyle. Serbest yürüyüşte her açık geçit kullanılabiliyor.

## 4) NPC'ler (4 yeni, toplam 7, her biri ayrı görünümde)
- **Fener Köyü:** Bilge Işın; **Demirci Oran** (yeni).
- **Ruh Ormanı:** Gözcü Nera; **Otacı Lin** (yeni).
- **Kırık Tapınak:** Yazman Tara.
- **Kül Geçidi:** **Geçit Bekçisi Varan** (yeni), **Münzevi Sela** (yeni).
- Her NPC'nin kendine ait konuşma satırı var.

## 5) Yaratıklar (4 yeni tür, özgün çizim üreticisi)
- **Diken Kurdu:** ormanda, dört ayaklı yeni silüet. 10. görevden sonra çıkıyor.
- **Taş Nöbetçi:** tapınakta, 2. görevden sonra çıkıyor. Boss görevini zorlaştırmamak için daha önce çıkmıyor.
- **Kül Kıvılcımı:** Kül Geçidi.
- **Kül Lordu:** Kül Geçidi'nin hikâye bossu.

Boss kuralı: **Mühür Kolosu ve Kül Lordu yalnız kendi hikâye av görevi sürerken doğuyor.** 3.25'te Kolos görev öncesinde de tapınakta duruyordu.

Oto savaşa öz savunma eklendi: görev hedefi önceliği korunuyor, ama menzildeki saldırgan yaratığa karşılık veriliyor. Önceden başka türden bir yaratık saldırınca oyuncu karşılık vermiyordu.

## 6) Görevler
- **2. bölüm, Kül Geçidi (görev 11–16):**
  - Konuşma: Kül Geçidi'ne Çağrı
  - Av: Kül Kıvılcımları
  - Keşif: Kül Tepesi ve Yıkık Köprü
  - Av (orman): Dikenli Tehdit
  - Av (tapınak): Uyanan Nöbetçiler
  - Boss: Kül Lordu
- **Yeni görev türleri:**
  - `explore` (keşif): bir noktaya ulaşma.
  - `talk` (konuşma): bir NPC'ye gidip başka bir NPC'ye dönme.
  - Bu iki türün oto rotası, manuel sayımı, görev metni ve yer işareti çalışıyor.
- **Devam havuzu 10 görev:**
  - Eski 5 görev korunuyor.
  - 5 yeni: Diken Kurdu Avı, Kıvılcım Söndürme, Nöbetçi Taşları, Kül Tepesi Gözcülüğü, Demircinin Siparişi.
  - Havuz 4 bölge, 5 tür ve 7 teslim NPC'sine dağılıyor. Aynı görev arka arkaya gelmiyor.
- **Kök neden düzeltmesi:** oto görev motoru nokta tabanlı görevleri yalnız `inspect`/`collect` olarak tanıyordu. Yeni türler av dalına düşüp "Hedef bulunamadı" ile takılıyordu; dal "av olmayan her tür" olarak genelleştirildi.

## 7) Kayıt geçişi (3.25 → 3.26)
3.25'te 10. ve sonraki sıralar 5'li devam döngüsüydü; 3.26'da bu sıralar 2. bölüm oldu. Bir defalık geçiş kuralı:
- Eski devam görevi **bitmiş ama teslim edilmemişse**: eski tanımın ödülü (`km326LegacyMission`) aynı `mission-N` kimliğiyle **bir kez** veriliyor, görev sırası 1 ilerliyor.
- **Yarımsa**: görev aynı sırada baştan başlıyor; ödül verilmemiş olduğu için kayıp yok.
- **Kilitli bir bölgede kaydedilmişse**: oyuncu köyde başlıyor.
- Kayıt şeması `questSchema:326`. Eski anahtarlara yazılmıyor.
- Bilinen etki: 3.25'te 11. sıranın ötesine geçmiş oyuncular 2. bölümün baştaki görevlerini atlıyor, çünkü o sıraların ödül kimlikleri eski devam görevlerinde kullanıldı.

## 8) Küçük düzeltmeler
- Harita alt başlığı bölge sayısını veriden alıyor ("4 bölge").
- Hedef bildirimi yaratık adını gösteriyor.
- Boss can çubuğu artık `boss` bayrağına bağlı.

## Bilinçli olarak YAPILMAYANLAR (aşama kilidi)
- Ekonomi ve XP dengesi, yeni ekipman, beceri ağacı, pet/binek gelişimi (3C). Kül Lordu dahil 26 görevde ölüm olmadı; zorluk dengesi 3C'de ele alınacak.
- Mevcut üç haritadaki çizim/çarpışma uyumsuzlukları: ormandaki ağaçlar ve köydeki kırmızı tezgâh çarpışmasız. Mevcut görev noktaları ağaçların arasında olduğu için bunlara dokunulmadı; 3E görsel geçişinde ele alınmalı.
- Şehir/hub, karakter oluşturma, HUD yeniden tasarımı (3E); zindan, lonca, çevrimiçi özellikler (4+).
