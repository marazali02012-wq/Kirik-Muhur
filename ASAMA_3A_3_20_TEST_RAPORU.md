# Kırık Mühür — Aşama 3A / 3.20 test denetimi

**Durum:** 3A teknik tarayıcı testleri geçti; **gerçek Android kabulü bekleniyor**. 3B'ye geçilmedi.

## Kaynak ve değişiklikler

- Korunan kaynak: `Kirik_Muhur_3_19_Otomatik_Gorev_Cicek_Menu.html`.
- İzole düzeltme: `Kirik_Muhur_3_20_3A_Gorev_Rota_Test.html`.
- Ana oyun `index.html` değişmedi. Sunucu, mağaza, veri tabanı, çizimler veya başka projeler değiştirilmedi.

### Doğrulanan kök nedenler

1. **İzinsiz otomatik ödül:** 3.19'da `missionDone()` ile dönüş başlıyor; oyuncu NPC'ye yaklaşınca `autoMissionTick()`/`tick()` doğrudan `deliverMissionAtNPC()` çalıştırıyordu. 3.20'de hedefler bittiğinde `complete`, kullanıcı görev düğmesine dokununca `return`, NPC'ye gelince `claim`; ödül ancak NPC'ye ayrı dokunma/etkileşim sonucunda veriliyor.
2. **Yanlış bölgede av görevinin takılması:** Av (`hunt`) durumunda hedef bölge dışındayken rota bulunmasına rağmen portal yalnız `travel`/`return` durumlarında geçiliyordu. 3.20 yanlış bölgedeki `hunt` için hedefe dönüş portalını açtı.
3. **Manuel dokunuşta otomatik yönün devam etmesi:** Saha dokunuşları manuel kontrolü devralacak şekilde otomatik yol/savaşı kapatıyor. NPC'ye dokunmak yalnız yürümek yerine NPC etkileşimini çalıştırıyor. Joystick müdahalesinde mevcut iptal korunuyor.
4. **Kayıt sonrası teslim durumunun bozulması:** `complete` ve `claim` geri yüklemede doğrudan `return` olmuyor; bekleyen ödül otomatik verilmiyor.

## Chromium / Playwright testleri

- **GEÇTİ:** Muhafız, İzci ve Dokumacı sınıflarında ilk görev: üç hedef, `complete`, bekleyen teslim, ayrı NPC etkileşimi ve ödülün bir kez verilmesi.
- **GEÇTİ:** Muhafız boss görevi: ormana ve arenaya rota, boss ölümü, ayrı dönüş, NPC ödülü, mührün bir defa envantere alınması.
- **GEÇTİ:** Av sırasında köye dönülmüşken otomatik rota yeniden doğru arenaya gidiyor.
- **GEÇTİ:** Gerçek DOM düğmesiyle görev başlatma ve ayrı tuşla dönüş; oyun alanındaki NPC'ye fare tıklamasıyla ödül alma; saha tıklamasıyla manuel kontrol.
- **GEÇTİ:** `complete`, `claim`, `return` durumlarını geri yükleme; sahte `localStorage` üzerinde kaydetme/geri yükleme ve tek ödül testi.
- **GEÇTİ:** 360×800, 393×852, 412×915 dikey Chromium başlangıç ekranlarında JS hata kaydı yok; ekran görüntüleri yerel denetlendi. Bu, tüm HUD ekranlarının hatasız olduğu anlamına gelmez.

## Henüz yapılmayanlar — 3A kabul kapısı

- **Gerçek Android** ekran/dokunma ve uzun süreli oynanış.
- Tarayıcının gerçek kalıcı `localStorage` verisiyle uygulamayı kapatıp yeniden açma. Test tarayıcısı yerel HTML'yi `about:blank` içeriği olarak yüklediği için bu kontrol sahte depolama ile yapıldı.
- Farklı ekranlardaki tüm butonlar ve nadir yol bulma engelleri için uzun süreli regresyon.

**Karar:** 3A'nın teknik düzeltmeleri ayrı sürümde hazır. Android kabulü olmadan 3A tamamlandı denmeyecek; 3B başlamayacak.