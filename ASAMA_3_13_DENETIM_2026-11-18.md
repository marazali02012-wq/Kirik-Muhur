# Kırık Mühür — Aşama 3.13 doğrulama ve devam kararı
Tarih: 18 Kasım 2026. **Proje yalnızca Kırık Mühür; Arena Forge Pro değil.**

## Kaynak ve değişiklik
- Esas ana oyun: `index.html` (3.10 görev sayacı yaması). Dokunulmadı.
- Kaynak test: `hud_referans_test_3_12.html`.
- Yeni izolasyon: `hud_referans_test_3_13.html` (commit `831542eb332b04c032f177d8776be3f14cf0fbb1`).
- 3.13 yalnız yeni bir CSS bloğu ve test sayfası başlığını değiştirdi. GitHub üzerinden 3.13'ten bu ikisi çıkarıldığında 3.12 kaynak metniyle **birebir aynı** olduğu yeniden hesaplandı.
- Üstte altın/toz şeridi daraltıldı ve mini haritadan uzaklaştırıldı.
- Açılan hızlı ayarlar paneli sağ üstte mini haritanın altına taşındı; savaş tuşlarının üzerinde açılmaması hedeflendi.
- İlgili düğmelerin `touch-action: manipulation` özelliği eklendi.
- Görev motoru, savaşa ilişkin JS, kayıt anahtarı, ödüller, görseller, ana oyun, Render/Supabase ve diğer oyunların dosyaları değiştirilmedi.

## Kanıt düzeyi
- **GEÇTİ — kaynak statik kontrolü:** 3.12 -> 3.13 farkı yalnız başlık ve ek CSS bloğu. Mevcut görev, saldırı, joystick, kaydetme tanımları korunuyor.
- **GEÇMEDİ / YAPILMADI — çalışan tarayıcı oyunu testi:** TinyFish 3.13 sayfasını GitHub/raw HTML olarak okuyabildi; fakat gerçek HTML uygulaması olarak açıp karakter seçimi, savaş, harita veya menüleri **tıklayarak oynayamadı**.
- **YAPILMADI — mobil ekran görsel testi:** 360×800 / 393×852 / 412×915 portrait ekran görüntüsü veya Android dokunmatik testi yok.
- **YAPILMADI — savaş sanat/animasyon QA:** üç düşman, boss, HP/darbe/ölüm kareleri ve üç bölge görselleri henüz tamamıyla doğrulanmadı.
- CSS geometrisi üzerine çıkarım **görsel veya çalışma kanıtı değildir**. Çakışma çözüldü iddiası için çalışır mobil render zorunlu.

## Kalan aşama 3 kapıları
1. 3.13'ü çalışan HTML olarak gerçek Android/dikey Chrome'da aç ve 360×800, 393×852, 412×915 boyutlarında çakışma kanıtı oluştur.
2. Görev → yürüyüş → dövüş → ayrı görev teslimi → ödül, ve tüm gerçek HUD düğmelerini manuel tıklayarak doğrula.
3. Üç bölgede savaş, NPC, boss HP/ölüm/hasar, 3+ düşman görselleri ve kamera takibini görsel olarak denetle.
4. Anormal sonuçları izole kopyada düzelt; doğrulanmayan görsel değişikliği ana oyuna aktarma.
5. `index.html`'e geçmeden önce kayıt/ödül/görev regresyonu geçsin.

**Karar: AŞAMA 3 DEVAM EDİYOR. Aşama 4'e geçilmedi.**
