# KIRIK MÜHÜR — KULLANICININ KESİN OYUN ŞARTNAMESİ
**Durum:** Onaylanan hedef kapsam. **Referans:** Kung Fu Saga mekanik ve ekran düzeni; oyun sanatı, isimleri ve UI özgün.  
**Kural:** Bu doküman hedef gereksinimleri kaydeder. Listelenmesi, oyunda şu anda çalıştığı anlamına gelmez. Aşama kabulü yapılmadan sonraki aşamanın koduna geçilmez.

## 1) Ana yapı
- Dikey mobil MMORPG
- Tek karakterle açık alan gezme
- NPC görev alma
- Otomatik yol bulma
- Otomatik savaş
- Görev teslimi
- Ödül popup
- Karakter güçlenme döngüsü

## 2) Giriş / karakter oluşturma
- Sınıf seçimi ekranı
- Erkek / kadın seçimi
- Büyük karakter önizleme
- Arka planda tematik sahne
- “Next Step” tipi ilerleme akışı

## 3) Oyun içi ana HUD
- **Üst sol:** profil, seviye, güç, VIP
- **Üst orta / üst bar:** altın / premium para / diğer kaynaklar
- **Üst sağ:** bölge adı, koordinat, durum bilgisi
- **Sol orta:** görev paneli
- **Orta alan:** karakter + düşman + hasar sayıları
- **Alt orta:** beceri tuşları
- **Alt sol / alt sıra:** karakter, çanta, skill, pet, forge benzeri kısayollar
- **Alt sağ:** sohbet, hızlı menü, joystick / yön kontrol alanı

## 4) Savaş sistemi
- Normal açık alan savaşı
- Çoklu yaratık grupları
- Hasar rakamları
- Beceri kullanımı
- Boss alanı
- World boss / dungeon boss mantığı
- Otomatik savaş aç/kapat

## 5) Sistem ekranları
- Karakter bilgi ekranı
- İstatistik ekranı
- Çanta
- Beceri
- Pet / binek
- Forge / geliştirme
- Görev ödülü popup
- Ana şehir / hub ekranı
- Kalabalık ikonlu üst-yan menü sistemi

## 6) Sosyal / meta sistem
- Lonca
- Market / shop
- Hunt / dungeon / daily / event
- Chat paneli
- Boss girişleri
- Günlük görevler
- Güç puanı odaklı ilerleme

## 7) Direkt kopyalamayacağız
**Aynı mantıkta fakat özgün yapılacak:**
- İkonlar
- Karakter isimleri
- UI süsleri
- Buton grafikleri
- Şehir arka planları
- Sınıf isimleri
- Boss isimleri

## 8) Aynı his korunacak
**Yakın tutulacak tasarım prensipleri:**
- Ekran yerleşimi
- Görev akışı
- Otomatik savaş mantığı
- Açık dünya mobil MMORPG hissi
- Çok ikonlu, yoğun HUD yapısı
- Ödül / görev / güç artışı döngüsü

## 9) Kuracağımız yeni oyun omurgası — çekirdek modüller
- Karakter oluşturma
- Ana açık dünya sahnesi
- Görev sistemi
- Otomatik yol bulma
- Otomatik savaş
- Yaratık / boss sistemi
- Ödül ve drop sistemi
- Karakter ekranı
- Çanta
- Skill ekranı
- Pet / mount sistemi
- Forge / geliştirme
- Şehir hub ekranı
- Sohbet
- Etkinlik / günlük görev / dungeon menüleri

## 10) Görsel stil kararı
**Hat 1 — Kung Fu Saga tipi:**
- Parlak
- 3D / 2.5D karakter hissi
- Yoğun HUD
- Mobil MMORPG arayüzü
- Doğu-fantastik tema

**Hat 2 — Kullanıcının verdiği piksel kalite örnekleri:**
- Sahne kalitesi yüksek
- Atmosfer güçlü
- Keskin sanat dili

**Doğru birleşim:**
- Mekanik ve ekran düzeni: Kung Fu Saga tipi
- Kalite standardı ve sahne özeni: yüksek kaliteli piksel örnekleri
- Sonuç: **özgün oyun**

## 11) Net proje tanımı
> “Kung Fu Saga referanslı, dikey mobil açık dünya MMORPG; aynı görev-savaş-hub-mount-pet-lonca omurgasına sahip; fakat özgün isimler, özgün sanat ve özgün UI ile kurulacak.”

---

## 12) Önceki kesin çalışma kararları — yukarıdaki kapsamın uygulanması
Bu bölüm yukarıdaki kullanıcı hedeflerine **ek yorumdur**; onları değiştirmez:
- Görev: bir kez başlat → hedefe git → savaş / inceleme / toplama → ilgili NPC'ye dön → ödül **otomatik bir kez** hesaba geçsin.
- **Ödül popup** olacak, ama “ÖDÜLÜ AL / SONRA AL” biçiminde ikinci sorgu olmayacak; yalnız ne kazanıldığını gösterecek.
- Sağ alttaki **çiçek** joystick değil, döndürülüp menüleri değiştiren/gizleyen hızlı menüdür. Hareket kontrolü ayrı olacak. Listede geçen “joystick / yön kontrol alanı” hareket için ayrılan yerin genel tarifidir.
- Oyun başta **tek oyunculu HTML prototipi**; gerçek MMORPG niteliği için sunucu ve eşzamanlı çok oyunculu sistemler ayrıca kurulmalı. Tamamlanmayan özellikler çalışıyormuş gibi gösterilmez.
- **Aşama kilidi:** 3A hareket / görev / otomatik savaş / kayıt → 3B harita ve görevler → 3C gelişim ve ekonomi → 3D regresyon ve kalıcı kayıt → 3E görsel kalite, HUD, karakter oluşturma. Bu aşamaların tamamı kabul edilmeden yeni boss/zindan, lonca ve canlı PvP geliştirmesine geçilmez.
- Kırık Mühür ile **Arena Forge Pro** karıştırılmaz. Mevcut `index.html`, kayıtlar, çalışan sürümler ve sunucular doğrulama olmadan bozulmaz.
- **Değişiklik denetimi:** Her yeni GitHub güncellemesini bu şartnameye karşı değerlendir; çelişirse kodu otomatik değiştirmek yerine sapmayı açıkça raporla. Kullanıcının yeni açık talimatı olmadan kapsamı genişletme.

**Kod ve kabul durumu için detay:** [Ana proje omurgası](KIRIK_MUHUR_PROJE_OMURGASI_KARAR_2026-11-19.md).
