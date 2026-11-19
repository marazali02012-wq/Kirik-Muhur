# Kırık Mühür — Aşama 3C Raporu (3.32 → 3.35)

**Teslim sürümü:** `Kirik_Muhur_3_35_3C_Tamamlama_TEST.html` · **Tarih:** 19.11.2026 · **Dal:** `claude/claude-onarim-komutu-3dd6oy`

Her sürüm bir öncekinin üzerine **yama betiğiyle** üretildi:
- `testler/3C_3_32/patch332.py`
- `testler/3C_3_33/patch333.py`
- `testler/3C_3_34/patch334.py`
- `testler/3C_3_35/patch335.py`

`main/index.html`, eski sürümler, kayıt anahtarı (`kirikMuhurQuestFlowV324Test`) ve diğer projeler **değiştirilmedi**. Kayıt şeması 335; eski kayıtlar açılıyor (testli).

## 1) Yapılanlar
### 3.32 — Ekipman
- **Yuvalar ve eşya değerleri:**
  - 6 yuva: silah, kask, zırh, eldiven, çizme, tılsım.
  - 5 nadirlik: Sıradan → Kadim.
  - 4 aşama, ve aşamaya göre seviye şartı (1/6/11/16).
- **Düşüş:** Yaratıklar %~10 eşya düşürür. Boss **kesin** en az Destansı eşya düşürür, aşaması bölgeden bir üst olur. Eşya yerden toplanır ve "Kazanıldı" satırı çıkar.
- **Çanta:**
  - Izgara çanta, kapasite 40. Dolunca yerden alınan eşya otomatik eritilir.
  - Düğmeler: **DÜZENLE**, **YUT**, **TOPLU YUT** (yalnız Sıradan/Nadir ve daha kötüleri), "↑ daha iyi" oku.
  - Eşya ayrıntı kartı: SAL/SAV farkı, KUŞAN/ÇIKAR.
- **Kayıt:** Üretilen eşyalar kayda yazılır. Bozuk eşya kaydı ayıklanır.

### 3.33 — Beceri
- **Açılım:**
  - Beceri 2 **Sv3**'te, yeni Beceri 3 **Sv8**'de açılır. Beceri 3 sınıfa özel: Tapınak Çöküşü, Kül Fırtınası, Ruh Seli.
  - Kilitli yuvada "🔒 SV3 / SV8" yazar. Açılınca "YENİ BECERİ" duyurusu çıkar.
- **Seviye:** Beceriler Sv1–10 (altın + toz). Beceri seviyesi karakter seviyesini geçemez.
- **Beceri ekranı:** Açıklama, şimdiki ve sonraki seviyedeki etki, açılma seviyesi.
- **Oto beceri sırası:** Dokun = öne al, uzun dokun = kapat/aç. Gerçek oto savaş bu sırayı kullanır.

### 3.34 — Denge
- **Seviye atlama gösterisi:** Ekranın ortasında "SEVİYE ATLADIN", ışık sütunu ve **gerçek** stat farkı (CAN +19, SAL +3, SAV +1, RUH +6, GÜÇ +N). Dokunmayı engellemez.
- **Tilki ve geyik Sv1–10:**
  - Tilkinin hasarı artar, bekleme süresi kısalır.
  - Geyik hızı ve kalıcı canı artırır.
- **Önerilen güç:** Görev ekranında gösterilir. Gücün düşükse kırmızı uyarı çıkar.
- **Zorluk ölçeği:** Veriden okunur (`KM334_D`). Ayarlar simülasyonla seçildi (aşağıda).

### 3.35 — 3C tamamlama
Kullanıcının 2. tur ekranlarından çıkan maddeler:
- **Yuva güçlendirme:** Güçlendirme yuvaya işlenir, eşya değişince korunur. Eski kayıtlardaki eşya başına güçlendirme aynen kalır.
- **Eşya puanı:** Kuşanılı eşyaya göre fark gösterilir.
- **"Yuva Ustası" yan hedefi:** 2 yuvayı +5'e çıkar.
- **Tilki ek etkileri:**
  - Sv3: vuruşun yarısı 2. düşmana sıçrar.
  - Sv6: verdiği hasarın %25'i kadar can.
  - Sv9: her 3. vuruş çift hasar.
- **Binek açılış gösterisi:** "KAZANDIN – TAMAM (8)". Görev düğmesini engellemez.
- **Tek seferlik seviye ödülü:** Sv5, Sv10 ve Sv15'te; Sv10'da Destansı eşya. Eski kayda, kaçırdığı ödül yüklemede bir kez verilir.

## 2) Zorluk ve ekonomi simülasyonu
`testler/3C_3_35/denge_sim.js`: 3 sınıf × 2 oyuncu tipi × 26 hikâye görevi, oto savaş, sabit rastgelelik.
- **Pasif oyuncu:** Hiçbir şey yükseltmez.
- **Aktif oyuncu:** Her görevden sonra beceri, yuva ve yoldaşını yükseltir.

| | 3.33 (önce) | 3.35 (sonra) |
|---|---|---|
| Pasif oyuncu ölüm | 0 | Koruyucu 3, Okçu 2, Dokumacı 1 |
| Aktif oyuncu ölüm | 0 | 0 |
| Aktif en düşük can | %59–74 | %41–58 |
| 1. boss (Kolos) sonunda can | %85–94 | %52–61 |
| Görevler | 26/26 | 26/26 (her sınıf, her tip) |

- **İlk deneme çok sertti:** Pasif okçu ve dokumacı 13. görevde takıldı (50+ ölüm). Ayar yumuşatıldı.
- **Ekonomi:**
  - **Toz** sınırlayıcı kaynak; aktif oyuncu hikâye sonunda 3–6 tozla kalıyor.
  - **Altın** fazla birikiyor (~1.100–1.400). Ek harcama alanı yok; Aşama 6'da ele alınmalı.

## 3) Test sonuçları (3.35, hepsi gerçek koşum)
| Paket | Sonuç |
|---|---|
| 3.35 yeni (`suite335.js`) | **9/9 PASS** |
| 3.34 (`suite334_regresyon.js`) | **9/9 PASS** |
| 3.33 (`suite333_regresyon.js`) | **12/12 PASS** |
| 3.32 (`suite332_regresyon.js`) | **8/8 PASS** |
| 3A regresyonu | **43/43 PASS** |
| 3B regresyonu | **16/16 PASS** |
| 3.27 / 3.29 / 3.30 / 3.31 | **8/8, 9/9, 6/6, 7/7 PASS** |
| Android emülasyonu (4 cihaz, CPU kısma, dokunma) | **56/56 PASS** (gerçek zamanlı oyunda FPS medyanı 47–60) |

**Bilerek güncellenen eski testler** (davranış bilerek değişti):
1. **3.30:** Beceri 2 artık Sv3'te açıldığı için test karakteri Sv3'e çıkarıyor.
2. **3A T18 ve T21:** Yeni çantada KUŞAN düğmesi eşya seçilince çıkıyor. Testler çanta ızgarasını ve "eşya seç → KUŞAN" akışını kullanıyor.
3. **3.32 H3:** Güçlendirme artık eşyayı kopyalamıyor, yuvaya işleniyor. Test yeni kurala göre yazıldı.
4. **3B B08:** Sv≥5 eski kayda kaçırılmış Sv5 ödülü (150 altın) bir kez veriliyor. Beklenen altın buna göre güncellendi.

**Kod hatası olarak bulunup düzeltilenler:**
- TOPLU YUT, boş yuvaya gidecek eşyaları "daha iyi" sayıp hiçbir şey eritmiyordu.
- Önerilen güç tablosunda dizi parantezi düşmüştü; sayfa açılmıyordu (yayından önce yakalandı).
- Seviye atlama başlığı 320 px ekrandan taşıyordu.
- Kilitli beceri etiketi görünmüyordu.
- Binek kartı animasyon sırasında ekranın sağına kayıyordu.

## 4) Açık kalanlar (3C kapsamında yapılmadı)
- **Kritik / kaçma / isabet statları:** Bütün dengeyi değiştirir; simülasyonla ayrı paket.
- **Depo, yerel sistem postası, unvan:** Öncelik düşük.
- **Binek becerisi, yıldız/şans/hap sistemi:** Aşama 6 ekonomi kararı.
- **Binek görevle verilsin** (ahır/seyis), yukarı kaydırarak bin, öğretici balon: 3B içerik + 3E.
- **Çoklu karakter yuvası:** **Kullanıcı kararı gerekiyor** (kayıt anahtarı yapısı).
- **Gerçek Android cihaz testi:** Kullanıcıda. Buradaki testler Playwright emülasyonudur, "Android onaylandı" denmez.

Ekran referansları ve aşama eşlemesi:
- `docs/KIRIK_MUHUR_KULLANICI_EKRAN_REFERANSI_ANALIZ_2.md`
- Kule, kader ve elmas → **Aşama 4** planı.

Görsel denetim: `GORSEL_DENETIM/3C_3_32_3_35/`.
