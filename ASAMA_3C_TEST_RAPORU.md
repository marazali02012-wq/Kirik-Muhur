# Kırık Mühür — Aşama 3C Test Raporu (3.32 → 3.35)

**Teslim sürümü:** `Kirik_Muhur_3_35_3C_Tamamlama_TEST.html` · **Tarih:** 19.11.2026 · **Dal:** `claude/claude-onarim-komutu-3dd6oy`

Her sürüm bir öncekinin üzerine **yama betiğiyle** üretildi:
- `testler/3C_3_32/patch332.py`
- `testler/3C_3_33/patch333.py`
- `testler/3C_3_34/patch334.py`
- `testler/3C_3_35/patch335.py`

`main/index.html`, eski sürümler, kayıt anahtarı (`kirikMuhurQuestFlowV324Test`) ve diğer projeler **değiştirilmedi**. Kayıt şeması 335; eski kayıtlar açılıyor (testli).

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


**3C kabul sonucu:** 3C kapsamındaki bütün maddeler yapıldı ve testlerden geçti (bkz. tablo). Açık kalanlar raporun 4. bölümünde. Gerçek Android cihaz testi kullanıcıdadır.
