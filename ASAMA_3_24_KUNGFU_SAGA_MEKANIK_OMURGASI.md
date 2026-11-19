# Kırık Mühür — Kung Fu Saga mekanik analizi ve 3.24 gelişim omurgası

**Tarih:** 19 Kasım 2026. **Durum:** 3. aşama açık; 3.24 izole test. Ana `index.html` değiştirilmedi.

## Referans ile gerçek durum farkı

Kung Fu Saga'daki sistemler araştırıldı:
- Ana ve yan görevler, otomatik yürüyüş/dövüş ve dünya görev noktaları
- XP/seviye, beceri ilerlemesi, karakter güç puanı (BP)
- Ekipman, güçlendirme ve eşya düşürme
- Pet, binek, sınıf gelişimi
- Dünya boss'ları, zindanlar, lonca, PvP ve uzun süreli etkinlikler

Kaynaklar:
- https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-beginner-guide-en.html
- https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-classes-guide-en.html
- https://www.bluestacks.com/blog/game-guides/avatars-saga/how-to-play-avs-on-pc-mac-en.html
- https://play.google.com/store/apps/details?id=com.rxsjus.an.watt
- https://apps.apple.com/tr/app/kung-fu-saga-martial-path/id1660688865

Referans **yalnızca genel mekanik ve düzen**. Görseller, özel görevler ve kaynak kod kopyalanmadı. Kung Fu Saga'nın parasal zorlaması ve tekdüze oto oynanışı hedef alınmadı.

## Mevcut mekanikler

| Sistem | 3.24 durumu |
|---|---|
| 3 karakter sınıfı, oto/manuel hareket/savaş | Var; önceki test sistemi korundu |
| 10 hikâye + 5 dönüşümlü devam görevi | Var; 3.23'ten taşındı |
| 3 gerçek yan hedef | **Yeni, oynanabilir** |
| XP/seviye ve oyuncu istatistikleri | Var; tek formüllü güç puanı ekranı **yeni** |
| Çanta, ekipman takma/çıkarma | Var; 3 yeni hikâye ekipmanı **yeni** |
| Silah güçlendirme | Var; yan göreve bağlandı |
| 2 saldırı becerisi + şifa | Var; beceri gelişim ağacı yok |
| Pet/binek | Temel aç/kapat; yetiştirme yok |
| 3 harita, 1 boss | Mevcut |
| Dungeons/zindan/kule | **Yok** |
| Lonca/gerçek PvP/eşzamanlı oyuncu | **Yok; server gerekiyor** |
| Günlük/haftalık etkinlik, sezon | **Yok** |
| Fiziksel Android ve gerçek browser kalıcı kayıt | **Kabul edilmedi** |

## 3.24'te gerçekten uygulanan

- Pasif yan hedefler: **5 gölge yen**, **3 bölgeyi keşfet**, **silahı 1 defa geliştir**.
- Her yan hedef tamamlandığında altın, XP ve ruh tozu **otomatik ve yalnız bir kez** verilir. Ödül kimlikleri `side324-...` ile kaydedilir.
- Hikâye görev 3/6/9 tamamlanınca sırasıyla **Gözcü Ceketi**, **Gölgesez Çizme**, **Ay Mühür Tılsımı** gerçekten envantere girer. Takılabilir ve gerçek istatistikleri değiştirir.
- `GELİŞİM` ekranında görev/XP/seviye/güç/yan hedefler/sıradaki ekipman ve işlevli Çanta/Görev/Beceri/Harita düğmeleri.
- Çiçeğin ikinci menü sayfasındaki **GELİŞ** tuşu ekranı açar.
- Eski modalın üstüne taşan savaş HUD düğmeleri: `z-index` düzeltildi.
- Test kayıt anahtarı `kirikMuhurQuestFlowV324Test`: 3.23 verisini ilk kullanımda okuyabilir ama eski sürümlere yazmaz.

## Sıra ve kabul kapıları

1. **3A (halen açık):** otomatik/manuel yürüyüş, savaş, görev, NPC, tek ödül, rota ve kaydetme güvenliği. Gerçek Android, kalıcı browser storage ve uzun süreli test gerekiyor.
2. **3. aşamanın devamı:** hikâye/yan görev çeşitliliği, güç ve ekonomi dengesi, özgün karakter/çevre görsel kalite, harita ilerlemesi. Mevcut çalışan döngüyü kırma.
3. **3. aşama resmen kabul edildikten sonra:** zindan, boss çeşitliliği ve ganimet döngüsü.
4. **Daha sonra:** gerçek sunucu temelli lonca, arkadaş/PvP/sohbet; günlük, sezon, pet/binek yetiştirme. Hepsini bir defada eklemek mevcut yapıyı bozma riskini artırır.

**Önemli:** Bu bir sistem mimarisi ve çalışan 3.24 testidir; Kung Fu Saga kadar geniş ve çevrimiçi MMORPG tamamlandı anlamına gelmez.

## Denetlenen

- `node --check` JS: geçti.
- Chromium/Playwright: Muhafız 10 + İzci 5 + Dokumacı 5 hikâye görevi, toplam **20**: geçti.
- 3 yan hedef ödülünün tek olması, 3 yeni ekipman: geçti.
- Ekipman takınca gerçek güç puanı artışı (testte **130 → 143**): geçti.
- 360×800 ekran modal katman denetimi: geçti.
- 3.23 kayıt verisini **değiştirmeden** 3.24 deney kopyasına alma ve sahte depolamada yeniden yükleme: geçti.
- **Gerçek diskli browser localStorage:** test ortamının `ERR_BLOCKED_BY_ADMINISTRATOR` kısıtı nedeniyle yapılamadı.
- **Fiziksel Android cihaz:** test edilmedi.

**Karar:** 3A bitmedi, 3B/zindan/lonca aşamasına geçilmedi. Ana oyun `index.html` korunuyor.
