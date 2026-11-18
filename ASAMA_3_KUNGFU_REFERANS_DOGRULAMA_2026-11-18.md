# Kırık Mühür — Aşama 3 Referans, Kod ve Risk Denetimi
Tarih: 18 Kasım 2026. Kod temeli: `index.html` (3.8). Savaş görsel denemesi: `savas_gorsel_test_3_9.html`. Görev kök-neden onarımı: `gorev_kok_neden_test_3_10.html`.

## Kullanıcının sabit kuralları
- **Aşama 3 bitmeden aşama 4'e geçme.**
- Kung Fu Saga'dan özgün mekanik / genel yerleşim fikri alınabilir; oyun görselleri, karakterleri, haritaları, isimleri ve kaynak kodu **Kırık Mühür'e özgün** olacak.
- **Dikey Android**. Görev tuşu: basınca durmadan hedefe git → hedef düşmanları otomatik ve aralıksız yen → oyuncunun ayrı dokunuşuyla NPC'ye dön / teslim et → ayrı dokunuşla ödül al → sonraki dokunuşla yeni görev. Oyuncu manuel hareket yaptığında kontrol kendisine geçebilmeli.
- Mevcut çalışan görev motorunu bozma, üretim sistemlerine denetlenmeden yazma.

## Dış referanslar — kaynağı ve kanıt düzeyi
1. BlueStacks, *Kung Fu Saga Beginners Guide*: https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-beginner-guide-en.html — portre MMORPG, otomatik görev / savaş, hedef kilidi, büyük alan boss, ana/yan görev, dünya haritasındaki görev noktaları, sınıf / BP / ikinci sınıf / pet / binek sistemleri. Bu rehberde **6 başlangıç sınıfı** listeleniyor; diğer tanıtım metinlerindeki sayı farklı olabilir.
2. BlueStacks, *Features Guide*: https://www.bluestacks.com/blog/game-guides/avatars-saga/avs-features-guide-en.html — otomatik ilerleme ve otomatik savaş. Otomasyonun tam kapatılabildiğine dair kaynaklar birbiriyle tutarlı değil; bunu bire bir aynı diye iddia etmiyoruz.
3. Uptodown oyun sayfası ve ekran görselleri: https://avatars-saga.en.uptodown.com/android — sol hareket, sağ saldırı/beceri ve ayrıntılı 3D görsel dünya.
4. App Store kullanıcı yorumları: https://apps.apple.com/us/app/kung-fu-saga-martial-path/id1660688865?platform=iphone&see-all=reviews — portre oyun, çok yoğun HUD, yüksek otomasyon. **Yorumlar kullanıcı gözlemidir, teknik spesifikasyon değildir.**
5. Google Play resmi liste: https://play.google.com/store/apps/details?id=com.rxsjus.an.watt — pet, binek, lonca, boss sistemleri. Görsel varlıkların hiçbiri kopyalanmayacak.

## Gerçek uygulama karşılaştırması

| Özellik | Referans | 3.8 kodunda doğrulanan | Karar |
|---|---|---|---|
| Ekran yönü | Dikey | `km-portrait-only` dokunmatik yatayı uyarıyor; masaüstü test kapısı açılıyor | Kısmen uygun; gerçek Android testi eksik |
| Otomatik görev | Hedefe rota, düşman temizleme | `questAction`, `autoMissionTick`, `findPath`, `enemyTick` | Genel akış uygun |
| Teslim ve ödül | Görev/NPC/ödül döngüsü | `ready→travel→hunt→complete→return→claim` | Kullanıcının istediği ayrı dokunma akışı uygulanmış |
| Görev sayacı güvenliği | `N` gerçek hedef yenilmeli | 3.8'de tüm hedefler ölü ama sayaç düşükken **erken bitirme hatası** | 3.10 ana oyuna alındı; eski kaydı olanlarda da sayaç alt sınırı korundu |
| Kamera | Referansta derinlikli, zengin 3D/2.5D görünüm | Sabit 2D canvas, 3 arka plan ve karakter takibi | **Eşdeğer değil**; yeniden dünya sanat/derinlik çalışması gerek |
| Dünya/harita | Çok bölge, dünya haritası, ana ve yan görev | Yalnız Fener Köyü, Ruh Ormanı, Kırık Tapınak | Eksik; tüm referans dünya yapılmış değil |
| Sınıflar | Çok sınıflı RPG, ikinci sınıf açılışı | 3 özgün sınıf; ikincil sınıf yok | Eksik |
| Savaş | Hedefe kilit, beceri/cooldown, görünür darbeler | Sayısal hasar, mana/HP, skill1/2, auto | Mekanik var; görsel okunurluk **doğrulanmadı** |
| Sprite | Akıcı yürüyüş/saldırı/hasar/ölüm | 6 özgün SVG sprite sayfasında 4 yön×4 kare; oyun içinde yürüyüş kareleri oyuncu ve gölge için değişiyor, NPC ve boss tek kare | Eksik animasyon setleri |
| Ekipman ve BP | Derin yükseltme sistemi | Çanta, dört ekipman yuvası, ilkel güç hesabı | Kısmen uygun |
| Pet ve binek | Çeşitli pet/binekler | Tek pet ve tek binek; oyun içi pet basit dörtgenlerle çiziliyor | Görsel ve içerik eksik |
| Lonca / PvP / ortak boss | Çevrim içi sistemler | Çevrim dışı tek HTML | **Yok** |
| HUD | Portre, görev alanı, savaş kontrolleri ve ilerleme menüleri | Üst bilgi, görev paneli, mini harita, joystick, beceri, çanta/karakter/menüler | Temel düzen uygun; yüksek kalite için son görsel denetim şart |

## Kök neden — erken görev bitişi
3.8 `autoMissionTick()`: canlı hedef yokken `missionKills < missionInfo().count` olsa da, `state.enemies` boş değilse `missionDone()` çağırabiliyor. Bu, daha önce görev dışında öldürülmüş veya kayıttan ölü olarak yüklenmiş hedeflerde yanlış tamamlama riski oluşturur.

3.10 test kopyasında yalnız bu dal düzeltildi: sayaç dolmadıysa eksik sayıda görev düşmanı yeniden üretiliyor; sayaç dolduysa görev bitiriliyor; üretilemezse görev bitirilmiyor.

### Gerçek çalışan kod üzerinden birim testleri
- Tüm düşmanlar ölü / sayaç 0/3 → tamamlanmadı, 3 hedef oluşturuldu — **GEÇTİ**.
- Tüm düşmanlar ölü / sayaç 2/3 → tamamlanmadı, 1 hedef oluşturuldu — **GEÇTİ**.
- Tüm düşmanlar ölü / sayaç 3/3 → tamamlandı, ek hedef oluşmadı — **GEÇTİ**.
- Normal durumda 1 canlı hedef varken sayaç 0/3 → erken tamamlama veya gereksiz yenileme yok — **GEÇTİ**.
- JavaScript sözdizimi → **GEÇTİ**.
- **TinyFish canlı tarayıcı testi:** 3.10 test kopyasında 2/3 sayaç gözlendi; yanlış erken tamamlama görülmedi, görev teslimi, +70 altın, +95 XP, seviye artışı ve yeni görev açılması doğrulandı. 3/3 anı görüntüde yakalanmadı.
- **Henüz yapılmadı:** 3.10 ana sayfa yayını sonrası son kontrol, gerçek Android cihaz testi, tüm görevleri kapsayan uzun süreli test.

## Görsel QA
Önceki canlı 3.9 tarayıcı testinde iki görev, XP, altın ve seviye yükselmesi çalıştı. Ancak görüntü yakalama anında düşman sprite'ları ve yeni vurma/ölüm efektleri gözlemlenemedi. **3.9 görsel onarımını tamamlandı sayma.**

## Aşama 3'ü bitirmek için ölçülebilir kriterler
1. 3.10 görev düzeltmesi test kopyasında tarayıcıdan doğrulandı ve ana oyuna alındı; **Android gerçek cihaz testi ve ana sayfa regresyonu bekliyor**.
2. Savaşta en az 3 düşman ve bir boss'un sprite, HP, darbe, hasar, ölüm görüntüsü **gerçek ekran çıktısıyla** doğrulanacak.
3. Dikey 360×800, 393×852, 412×915, Android tarayıcı ve kamera izlemesi test edilecek.
4. Kamera/harita perspektifindeki 2D–referans farkı kabul edilmiş özgün tasarım standardına getirilip üç bölge için çevre sanat tutarlılığı sağlanacak.
5. Oyuncu/NPC/boss için yürüyüş, saldırı, hasar ve ölüm kareleri uygulamada çalışacak; sadece sayfa dosyası bulunması yeterli değil.
6. Ana menü, envanter, görev teslimi, beceriler ve kayıt sistemi regresyon testi geçecek.

## Güvenlik ve izolasyon
- Ana `index.html` yalnızca **3.10 görev sayacı kök-neden yaması ve sürüm etiketi** için güncellendi. 3.9 görsel değişiklikleri ana oyuna alınmadı.
- 3.9 ve 3.10 dosyaları ayrı test kopyalarıdır; kullanıcı verisi ve eski kayıt anahtarı değiştirilmedi.
- Arena Forge Pro'nun Supabase / Render / PostHog sistemlerinde değişiklik yapılmadı.
- Kırık Mühür'e ilişkin PostHog canlı oyuncu kanıtı olmadığı için analitik üzerinden performans iddiası kurulamaz.

**Karar: 3. aşama DEVAM EDİYOR. 4. aşamaya geçilmedi.**
