# Kırık Mühür — Aşama 3C Değişiklikler (3.32 → 3.35)

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
