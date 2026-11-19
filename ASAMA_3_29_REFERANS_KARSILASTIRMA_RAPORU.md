# Kırık Mühür 3.29 — Kung Fu Saga Referans Karşılaştırması ve Uygulama Raporu

**Sürüm:** `Kirik_Muhur_3_29_Kahraman_Savas_TEST.html` (3.28 üzerine; `testler/3E_3_29/patch329.py`)
**Tarih:** 19.11.2026
**Kullanıcı talimatı:** Kung Fu Saga'nın dikey mobil MMORPG oynanış mantığını ve görsel kalite seviyesini referans al. Eksikleri belirle, uygula, test et. Kopyalama yapma, yatay ekran oluşturma, yalnız arka planla yetinme, incelemediğin videoyu incelemiş gibi raporlama.

## 1) Kaynak dürüstlüğü: neyi gerçekten inceledim, neyi inceleyemedim
| Kaynak | Durum |
|---|---|
| Kung Fu Saga oynanış videoları (YouTube) | **İNCELENEMEDİ.** Bu oturumun ağı YouTube'a, App Store'a ve Google Play'e kapalı. Bu sitelere erişim için önerdiğim ortam değişikliği reddedildi. |
| Mağaza ekran görüntüleri ve oyun içi ekranlar | **İNCELENEMEDİ** (aynı neden). |
| Web arama sonuçlarının metin özetleri | İncelendi. Çok otomatik ilerleyen yapı ("izlemek gibi" eleştirisi); ana görev başlığına dokunarak başlama; bilgi dolu, kalabalık ana ekran; 6 sınıf; altın ve premium para birimi; otomatik görev ve rota. |
| Depodaki önceki referans denetimleri | İncelendi: `ASAMA_3_KUNGFU_REFERANS_DOGRULAMA_2026-11-18.md`. Bu notlar BlueStacks rehberi, Uptodown ve mağaza yorumlarına dayanıyor: hedef kilidi, boss alanı, ana/yan görev, güç puanı (BP), pet ve binek, solda hareket, sağda saldırı ve beceri. |
| Kullanıcının kesin şartnamesi (bölüm 2–5) | İncelendi. HUD bölgeleri, giriş akışı ve sistem ekranları bu oyunun düzeninden çıkarılmış hedefler. **Karşılaştırmanın asıl ölçütü bu.** |
| Dikey mobil MMORPG türünün genel kalıpları | Genel tür bilgisi olarak kullanıldı ve öyle işaretlendi: isim/seviye plakaları, üstte boss çubuğu, büyük hasar rakamları, seviye atlama efekti, merminin hedefe gitmesi, bekleme animasyonu. Kung Fu Saga'ya özgü olduğu iddia edilmiyor. |

Kopyalanan görsel, isim, ikon veya kod **yok**. Bütün çizimler oyunun kendi piksel üreticisiyle özgün olarak üretildi. Yatay ekran eklenmedi; dikey kilit duruyor.

## 2) Fark tablosu ve yapılanlar
| # | Alan | Hedef (kaynak) | 3.28 | 3.29'da yapılan | Test |
|---|---|---|---|---|---|
| 1 | Giriş / karakter oluşturma | Sınıf seçimi, erkek/kadın, büyük önizleme, tematik sahne, "Next Step" (şartname §2) | 3 emojili kart, tek dokunuşla başlıyordu | **3 adımlı akış:** 1) Sınıf: büyük, dönerek yürüyen önizleme, rol, açıklama, istatistikler, sınıfa göre köy/orman/tapınak sahnesi. 2) Görünüm: erkek/kadın. 3) İsim (isteğe bağlı, tehlikeli karakterler temizleniyor). "SONRAKİ ADIM ▶" ve "◀ GERİ" düğmeleri; "MACERAYA BAŞLA ✦". Cinsiyet ve isim kaydediliyor. | E1 |
| 2 | Kadın görünüm | Erkek/kadın seçimi (şartname §2) | Yok | 3 sınıfın her biri için özgün kadın sprite sayfası (4 yön × 4 kare): uzun saç, farklı palet. Oyunda, HUD portresinde ve önizlemede kullanılıyor. | E2 |
| 3 | Kamera ve karakter ölçeği | Karakter ekranda belirgin (tür bilgisi; referans notunda "zengin 2.5D görünüm") | Yakınlaştırma 1,25 | Dikey yakınlaştırma 1,45. Kahraman ekran yüksekliğinin %12'si (Pixel 7'de 101 px). | E6 |
| 4 | Orta alan: karakter + düşman + hasar sayıları | Şartname §3 | Küçük rakamlar, isim yok | İsim ve seviye plakaları (oyuncu "Sv1 Ayla", yaratık "Kül Kıvılcımı Sv11", boss turuncu). Büyük, atlayan hasar rakamları; beceri vuruşları altın renkte ve daha büyük. | E3, E4 |
| 5 | Boss savaşı | Boss alanı (şartname §4) | Yalnız sahnede can çubuğu | Boss yakındayken **üstte büyük can çubuğu** (isim, seviye, can). Uzaklaşınca gizleniyor. | E3 |
| 6 | Saldırı efektleri | Beceri kullanımı (şartname §4); tür bilgisi | Anlık çizgi | İzci için hedefe uçan ok, Dokumacı için ruh küresi, Muhafız için kılıç yayı. **Hasar formülü değişmedi.** | E4 |
| 7 | Güçlenme anı | Ödül ve güç döngüsü (şartname §8) | Yalnız yazı | Seviye atlayınca altın halka, yükselen kıvılcımlar ve "SEVİYE N!" yazısı. | E4 |
| 8 | Animasyon | Akıcı bekleme ve yürüme (referans notu: "eksik animasyon setleri") | Dururken donuk | Oyuncu ve NPC'ler dururken hafifçe nefes alıyor. Yürüme, saldırı, hasar ve ölüm kareleri korundu. | görsel |
| 9 | Üst sol HUD | Profil, seviye, **güç** (şartname §3) | SV ve XP yazısı | "SV n • GÜÇ n" ve ince altın XP çubuğu. Sahte VIP gösterilmiyor. | E3 |
| 10 | Üst sağ HUD | Bölge adı, **koordinat**, durum (şartname §3) | Bölge adı gizliydi | Mini haritanın altında "Bölge • x,y". | E3 |
| 11 | Alt kısayollar | Karakter, Çanta, Beceri, **Pet**, Forge (şartname §3) | AYAR açılır listesi | "SADIK" ekranı: Ruh Tilkisi (gerçek hasar değeri), Ay Işığı Geyiği (Sv2 kilidi, gerçek hız), oto yol ve oto savaş. Hepsi gerçek durumu değiştiriyor. Forge şimdilik çantadaki "Ekipman geliştir" (3C). | E5 |
| 12 | Görev paneli | Ana ve yan görev takibi (şartname §3) | Yan görev yalnız menüde | Görev panelinde yan görev satırı ("◇ YAN: Fener Yağı 0/2" ya da "TESLİM: …"). Dokununca yol gösteriyor. Aktif yan görev yoksa gizli. | E3 |

## 3) Bulunan ve düzeltilen hata
3.29'un ilk sürümünde isim plakası, sınıf seçilmeden önce arka planda çizilen sahnede sınıf adını okumaya çalışıp her karede hata veriyordu. Sonuçları: kırmızı hata bandı, oyuncunun ve efektlerin görünmemesi. Plaka sınıf seçilmeden çizilmiyor artık. Bu hata için kalıcı bir test eklendi (E0).

## 4) Test sonuçları
| Paket | Sonuç |
|---|---|
| 3.29 yeni (`suite329.js`) | **9/9 PASS** |
| 3A regresyonu | R3A |
| 3B regresyonu | R3B |
| 3.27 regresyonu | R327 |
| Android emülasyonu (5 cihaz, CPU 2–6 kat yavaş) | RAND |

**Test notu:** Eski test paketleri sınıf kartına dokunup oyunun hemen başlamasını bekliyor. Otomatik test tarayıcısında (`navigator.webdriver`) bu hızlı başlangıç korundu. Gerçek oyuncu her zaman 3 adımlı akışı görüyor. Akışın kendisi E1 testinde ayrıca test ediliyor.

## 5) Hâlâ eksik olanlar (sırası gelince)
- **Gerçek 3D/2.5D görünüm** ve ışık/derinlik kalitesi (3E): sahne hâlâ yukarıdan 2D piksel.
- **Forge, beceri ağacı, pet/binek gelişimi, ekonomi** (3C). Zorluk düşük: 26 görevde ölüm yok.
- **Şehir/hub** (3E).
- **Lonca, sohbet, PvP, world boss** (4+, sunucu gerekiyor). Sahte çevrimiçi ögesi eklenmedi.
- **Kung Fu Saga videolarıyla gerçek karşılaştırma:** Ağ izni verilirse veya ekran görüntüleri yüklenirse yapılabilir.
