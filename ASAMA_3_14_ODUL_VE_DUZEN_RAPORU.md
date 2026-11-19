# Kırık Mühür — Aşama 3.14: gerçek görev ödülü ve ekran düzeni
Tarih: 19 Kasım 2026. Bu dosya **Aşama 3** içindir; Aşama 4'e geçilmedi.

## Kullanıcı referansının çevirisi (kopyalama değil)
Bu görüşmede paylaşılan Kung Fu Saga ekranları, yalnızca **düzen/UX** için değerlendirilir:
- Üst sol: profil, seviye, güç; üst bar: mevcut oyun kaynakları; üst sağ: gerçek mini harita / bölge.
- Sol orta: takip edilen görev ve bağlamsal gerçek eylem düğmesi.
- Oyun ortası: karakter, NPC, çoklu düşman, boss, hasar sayısı; savaş görüşü kapatılmamalı.
- Alt orta: gerçek beceriler; alt sıra: çalışan karakter/çanta/beceri/görev/ayar menüleri.
- Alt sağ: joystick, etkileşim ve otomatik savaş kontrolü. HUD yoğun fakat okunaklı olmalı.
- Görev sonucu: **ayrı ödül penceresi** (gerçek XP, altın, ruh tozu; boss görevinde mevcut Ruh Tılsımı).
- Sınıf seçimi, şehir hub, karakter istatistikleri ve boss alanı ekranları bu referans kümesinin diğer parçalarıdır; henüz tamamlandı denmez.
- Dört ayrı pixel-art sahnesi renk/ışık/doku/çizim işçiliği referansıdır. Kung Fu Saga karakterleri, ikonları, haritası, grafikleri, kodu ve isimleri kopyalanmaz.

## Değişiklikler
- İzole HTML: `hud_ve_odul_test_3_14.html`, dal: `stage3-reward-ui-314`.
- 3.13 kaynak oyunu temel alındı; ayrı tasarlanmış `km-stage3-14-real-reward-popup` CSS bölümü eklendi.
- Gerçek `claim` evresinde artık anında ödül vermek yerine ödül penceresi açılıyor.
- `ÖDÜLÜ AL`: mevcut `questAward` üzerinden ödülü **bir kez** ekliyor; görev ilerlemesi sonra güncelleniyor ve kayıt alınıyor.
- `SONRA AL`: pencereyi kapatıyor; ödül ve görev ilerlemesi değişmiyor, tekrar açılabiliyor.
- Boss görevi için önceki `itemdefs.talisman` adı/ikonu kullanılıyor; yeni eşya icat edilmedi.
- `index.html`, görev motorunun diğer dalları, gömülü sahne görselleri, kayıt anahtarı ve canlı servisler değiştirilmedi.

## Yapılmış kontroller
1. Kaynak tam JavaScript sözdizimi: **GEÇTİ** (V8 `new Function`).
2. Modal iş mantığı izole testleri: **8/8 GEÇTİ**:
   - ön izlemede ödül kazanılmaması;
   - `SONRA AL` durumunda ilerlememe;
   - ödül alımında altın, XP ve tozun doğru eklenmesi;
   - yeni göreve tek ilerleme ve kayıt;
   - çift tıklamada tekrar ödül yazılmaması;
   - boss tılsımının ön izlemede görünmesi;
   - tılsımın bir kez envantere eklenmesi;
   - ödül defterinde zaten alınmış ödülün ikinci kez verilmemesi.
3. Son düzeltmeden sonra karşılaştırma: mevcut gömülü sahne verileri, `kirikMuhurQuestFlowV32` kayıt anahtarı ve tekrar-ödül koruması aynı kaldı; sözdizimi yeniden **GEÇTİ**.
4. Canva'daki önceden oluşturulmuş dikey Kırık Mühür tasarımı okundu; Figma'da çalışma dosyası oluşturuldu, ancak Figma Starter MCP limitinden dolayı katman çizimi yapılamadı.

## Canlı testte engel
- TinyFish ile `https://kirik-muhur-3-asama-test.onrender.com/hud_referans_test_3_13.html` kontrol edildi: **404 Not Found**.
- GitHub 3.14 kaynak dosyası dalda mevcut ve doğrudan GitHub API üzerinden açılıp JavaScript sözdizimi doğrulandı; **dosya yok iddiası doğru değil**.
- TinyFish ile RawGithack üzerinden 3.14 geçici HTML önizlemesi de denendi; o servis de **404** döndü. Bu, depo dosyasının silindiğini kanıtlamaz; yalnız geçici önizlemenin erişilemediğini gösterir.
- Bu nedenle 3.13 veya 3.14 için çalışan mobil render, 360×800 / 393×852 / 412×915 ekran çakışması, gerçek dokunmatik görev ve savaş testleri **YAPILMADI**.
- 8/8 iş mantığı testi **tam oyun tarayıcı testi değildir**. Testi geçmiş saymak için gerçek tarayıcıda ödül penceresi açma/kapatma/alma ve kayıt yükleme de denenmeli.

## Kabul kapıları
1. Ayrı test dosyasını gerçekten statik HTML olarak yayınla; 404 nedenini gider.
2. Portrait Android Chromium'da karakter, görev, savaş, HUD ve gerçek ödül popup'ını canlı denetle.
3. En az 3 düşman ve 1 boss için görsel HP/darbe/ölüm akışını kontrol et.
4. Kayıt/ödül/görev regresyonu ve görsel denetim başarıyla tamamlanmadan `index.html`'e taşıma.

**Durum: Aşama 3 devam ediyor. 3.14 izole uygulandı; canlı QA bekliyor.**
