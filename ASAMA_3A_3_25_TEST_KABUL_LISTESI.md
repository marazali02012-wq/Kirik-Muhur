# 3A test/kanıt listesi — DOLDURULDU (3.25)

**Sürüm / commit / test ortamı / tarayıcı / Android cihaz modeli / tarih:** 3.25 (`Kirik_Muhur_3_25_3A_Onarim_TEST.html`) / dal `claude/claude-onarim-komutu-3dd6oy` / Linux bulut konteyneri / Chromium headless (Playwright) mobil dokunmatik emülasyon / Android cihaz: YOK / 19.11.2026

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


**AŞAMA 3A KABUL DURUMU:** [ ] KABUL EDİLDİ / [x] AÇIK — neden: Tarayıcıda test edilebilen tüm maddeler PASS (43/43 + 30 dk gerçek zamanlı oturum); fiziksel Android cihaz kabulü ve canlı HTTPS site origin'inde kapat/aç denemesi kullanıcı tarafından yapılmalı.
**Sıradaki aşamaya geçiş izni:** 3A kabul edilmeden HAYIR.
