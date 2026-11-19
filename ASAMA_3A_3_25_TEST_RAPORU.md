# Kırık Mühür 3.25 — Aşama 3A Test Raporu

**Sürüm:** `Kirik_Muhur_3_25_3A_Onarim_TEST.html` · **Dal:** `claude/claude-onarim-komutu-3dd6oy` · **Tarih:** 19.11.2026
**Kaynak:** 3.24 izole test (blob `b70de48f729e77fdd924711001ada641cb39b2d5` — SHA doğrulandı, kaynak değiştirilmedi)
**Test ortamı:** Linux bulut konteyneri; Chromium (Playwright, headless); mobil emülasyon `isMobile + hasTouch`, deviceScaleFactor 2, Android Chrome kullanıcı aracısı; yerel HTTPS sunucusu (`https://127.0.0.1:8443`, kendinden imzalı sertifika) ve `file://`.
**Android cihaz:** YOK — fiziksel cihaz testi **YAPILAMADI**.

> Bu rapor yalnız gerçekten çalıştırılan testleri PASS sayar. Chromium emülasyonu ≠ gerçek Android. Yerel HTTPS ≠ canlı site (GitHub Pages) origin'i.

## Test türleri
- **Otomatik tarayıcı testi (`testler/3A_3_25/suite.js`):** 43 kontrol. Gerçek DOM, gerçek dokunma olayları (`page.tap`, `touchscreen.tap`), gerçek `localStorage`. Oyun zamanı, deterministik olması için `__kmTest.step(dt)` ile ilerletilir (aynı `tick()` işlevi; ayrıca gerçek `requestAnimationFrame` döngüsü de çalışır).
- **Gerçek diskli kalıcılık (T21):** Playwright kalıcı Chromium profili (diskte klasör). Tarayıcı **süreci kapatıldı**, aynı profil yeni süreçle açıldı. Sahte/mock `localStorage` kullanılmadı.
- **Uzun oturum (`longrun.js`):** gerçek zamanlı (hızlandırma yok) 30 dakika, aşağıda.
- **Hata yeniden üretimi (`bugs.js`):** aynı senaryolar hem 3.24 hem 3.25'te: `hata_yeniden_uretim_3_24.json` / `_3_25.json`.

## PASS / FAIL / BLOKELİ matrisi

| Kontrol | Beklenen | Sonuç | Kanıt |
|---|---|---|---|
| Kaynak JS | `node --check` hatasız | **PASS** | 3.24 ve 3.25 betikleri `node --check` geçti; tüm testlerde `pageerror`/console error = 0 |
| 3 sınıf | Muhafız, İzci, Dokumacı oyun açar | **PASS** | T01 ×3 (6/6 sprite yüklendi) |
| Portre ekran | 320×568, 360×800, 393×852, 412×915 taşma yok | **PASS** (emülasyon) | T02 ×4: 17 HUD öğesinde ekran dışı=0, üst üste binme=0, yatay kaydırma yok, düğme merkezinde yanlış hedef=0. Önce/sonra: `GORSEL_DENETIM/3A_3_25/portre_*` |
| Dokunmatik yürüme | Sağ/sol/çapraz, dönüş yönü ve animasyon tutarlı | **PASS** (emülasyon) | T03: sağ/sol/aşağı/yukarı/çapraz için doğru son yön, A→B→A salınımı yok, yürüme fazı artıyor; hedefe varışta 30 kare boyunca konum sabit (titreme yok) |
| Tek dokunuş görev | Hedef → savaş/toplama → ilgili NPC'ye otomatik dönüş | **PASS** | T04 ×3: tek dokunuş → `travel→hunt→return→ready`; T22 ×3: 15/15 görev |
| Manuel devralma | Hareket/oto savaş kapanır, kendiliğinden açılmaz | **PASS** | T08 ×3: sahaya dokunuş → oto yol+savaş kapalı, 10 sn sonra hâlâ kapalı |
| Dönüş devamı | Görev düğmesiyle kaldığı yerden sürer | **PASS** | T08 ×3 (aynı faz/görev ile devam), T12, T13 |
| Görev ödülü | Altın/XP/toz/eşya **tek kez** | **PASS** | T06 ×3: tekrar `deliverMissionAtNPC`, NPC konuşma, sayfa yenileme → altın 133'te sabit; T20: 50 yükleme, tekrar eden ödül kimliği yok |
| Bilgi popup | Otomatik ödülden sonra kazanım gösterir, onay istemez | **PASS** | T05 ×3: tek düğme "DEVAM ✓", "ÖDÜLÜ AL/SONRA AL" yok; +70 altın, +95 XP, +2 toz, güç 100→115, seviye 1→2. `odul_popup_*.png` |
| Yan görevler | 3 yan hedef doğru sayım, tek ödül | **PASS** | T11: `side324-regions/shadows/forge` birer kez; 9 gölge (hedef 5) ve 2 geliştirme (hedef 1) sonrası tekrar ödül yok; 3 popup |
| Ana/devam görevleri | 10 ana + 5 devam takılmadan | **PASS** | T22 ×3 sınıf: 15/15, her görevde doğru `mission-N` popup'ı; görev türleri hunt/inspect/collect; hikâye ekipmanları (tılsım, ceket, çizme, ay tılsımı) birer kez |
| Harita rotası | Yanlış bölge / portal / NPC dönüşü takılmaz | **PASS** | T12: görevi durdur → harita ile tapınağa git (11 sn) → görev tuşu → köy→orman portalları → teslim (15 sn) |
| Düşman/ölüm | Ölme, yeniden doğma, beceri, boss, hasar | **PASS** | T13 ×3: gerçek ölüm, köyde tam canla doğma, görev sayacı korunur (1), görev tuşuyla tamamlanır. T07 ×3: boss'a 260 hasar, ikinci ana görev tek ödül + tek tılsım |
| Çiçek hızlı menü | Menüleri değiştirir/gizler, joystick değil | **PASS** | T14: dokunuş 3 sayfa (`utilities→hidden→main`), kaydırma ile sayfa değişimi; karakter 0 birim hareket, `#pad` gizli |
| Duraklatma/envanter | Oto av sırasında çanta açılınca oyun durur | **PASS** | T15: konum ve HP sabit, kapanınca oto devam |
| Android geri tuşu | Oyundan çıkmaz | **PASS** (yalnız Chromium geçmiş simülasyonu) | T16: geri → duraklatma; tekrar geri → kapanır; URL aynı. **Fiziksel geri tuşu test edilmedi** |
| Bozuk kayıt | Çökme yok, bildirim, asıl veri silinmez | **PASS** | T17: ham veri `kirikMuhurQuestFlowV324Test_bozukYedek`'te birebir; T18: geçersiz alanlar onarıldı, çanta açılıyor, görev kilitlenmiyor |
| Tarayıcı kayıt | HTTPS'te kapat/aç/geri yükle gerçek `localStorage` | **PASS** (yerel HTTPS) / **BLOKELİ** (canlı site) | T21: `https://127.0.0.1:8443`, `isSecureContext=true`, tarayıcı süreci kapat/aç → görev, faz, altın, toz, eşya, kuşanım, saldırı/savunma/can, HP, konum, oto durumu, ödül kimlikleri **birebir**. T20: 50 yeniden yükleme, diskteki kayıt ile durum birebir. Canlı GitHub Pages origin'i test edilmedi |
| Eski kayıt | Önceki sürüm verisi bozulmadan geçer | **PASS** | T19: 3.23 test kaydı (Sv4, 612 altın, görev 3, yarım av) geçti; eski anahtar **bayt-bayt aynı**; ödüller yeniden işlenmedi |
| Android cihaz | Fiziksel telefonda dokunma/geri tuşu/uzun oturum | **BLOKELİ** | **YAPILAMADI — kullanıcı Android kabulü gerekli** (cihaza erişim yok) |
| Değişiklik güvenliği | main/index.html, eski HTML, eski kayıt anahtarları korunur | **PASS** | `git status`: yalnız yeni dosyalar; `index.html` ve 3.19–3.22 HTML'leri değişmedi; eski kayıt anahtarlarına yazan kod yok (T19) |

**Toplam otomatik:** 43/43 PASS (`testler/3A_3_25/test_sonuclari.json`, `suite.log`).

## Uzun oturum (gerçek zamanlı)
**Ortam:** Headless Chromium, 393×852 dokunmatik emülasyon, yerel HTTPS, hızlandırma yok, **30 dakika**. Betik insan gibi gerçek dokunuşla görev kutusuna basar ve popup'ta "DEVAM"a dokunur; her 5 dakikada sayfa yenilenir.

| Ölçüm | Sonuç |
|---|---|
| Süre | 30 dk gerçek zaman |
| Tamamlanan görev | 162 (10 ana + 152 devam döngüsü) |
| Ödül kimlikleri | 164, hepsi tekil (çift ödül yok) |
| Gösterilen/kapatılan ödül popup'ı | 164 |
| JS hatası / console error | 0 |
| FPS (5 sn pencereler, 96 örnek) | 59–60 |
| JS heap | 2.2–4.2 MB (bellek büyümesi yok) |
| 5 yeniden yükleme | 5/5 görev, altın, ödül sayısı birebir |
| Ölüm | 0 (İzci, oto savaş) |

Not: Bu, konteynerdeki masaüstü Chromium ölçümüdür; telefon FPS'i/ısınması **ölçülmedi**.

## Önemli bulgu: `file://` ile açılışta kayıt güvenilir değil
`file://` ile açılan sayfada Chromium'da yeniden yüklemeden sonra `localStorage` zaman zaman **tamamen boş** okundu (12 döngüde 1–12 kayıp). Aynı durum **3.24 kaynakta da** oluşuyor (oyun koduna ait değil). Aynı test yerel **HTTPS origin'de 12/12 ve 50/50 kayıpsız**. Öneri: oyunu dosya yöneticisinden açmak yerine HTTPS adresinden (ör. GitHub Pages) oynayın; Android'de `content://`/dosya açılışı için kayıt kalıcılığı ayrıca doğrulanmalı.

## Not edilen ama 3A dışında bırakılanlar
- Boss canı, savaş sırasında sayfa yenilenirse 260'a döner (karşılaşma sıfırlanır; görev ilerlemesi ve ödüller korunur).
- Görsel kalite, HUD yeniden tasarımı, karakter oluşturma (3E); yeni bölge/görev çeşitliliği (3B); ekonomi dengesi (3C) — kapsam kilidi gereği dokunulmadı.

## AŞAMA 3A KABUL DURUMU
**AÇIK — tarayıcıda test edilebilen tüm 3A maddeleri PASS; tek açık kapı fiziksel Android cihaz kabulü (dokunma, geri tuşu, FPS, uzun oturum) ve canlı HTTPS site origin'inde kapat/aç denemesi.** Bu iki madde kullanıcı tarafından doğrulanmadan 3A "kabul edildi" sayılmaz.
**Sıradaki aşamaya (3B) geçiş izni:** HAYIR — 3A kullanıcı Android kabulü bekleniyor.

### Kullanıcı Android kabul adımları (öneri, ~10 dk)
1. Dosyayı HTTPS üzerinden açın (GitHub Pages veya benzeri), telefonu dik tutun.
2. Bir sınıf seçin → görev kutusuna **bir kez** dokunun → karakter ormana gidip 3 gölgeyi yener, Bilge Işın'a döner, "GÖREV TAMAMLANDI" penceresi açılır (tek "DEVAM" düğmesi).
3. Görev yolunda sahaya dokunun → oto durur; görev kutusuna dokunun → devam eder.
4. Sağ alttaki çiçeğe dokunun/kaydırın → üst menüler değişir, karakter yürümez.
5. Geri tuşuna basın → duraklatma açılır, oyundan çıkmaz.
6. Tarayıcıyı tamamen kapatıp açın → seviye, altın, görev, konum aynı.
7. 30 dk oynayın; takılma, siyah ekran, ısınma/FPS düşüşü olursa ekran görüntüsüyle bildirin.
