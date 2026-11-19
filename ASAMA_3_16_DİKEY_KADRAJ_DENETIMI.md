# Kırık Mühür — 3.16 Dikey Kadraj Denetimi

19 Kasım 2026 • İzole test dalı: `stage3-reward-ui-314` • Ana `index.html` değiştirilmedi.

## Gerçek kök neden ayrımı
- Dünya koordinatları `W=1440,H=960` **geniş yatay harita**; bu tek başına bir hata değil: açık dünya portre ekranlarda yatay yönde de geniş olabilir.
- `CW=432,CH=960` **dikey kamera görüntüleme düzlemi**. CSS `@media (orientation:portrait)` uygulanıyor.
- Kullanıcının gözlemi olan **yatay his**, dikey telefonda yatay kompozisyondaki sahne arka planlarından kadraj alınmasıyla ilgili; portre arayüzün teknik olarak çalışmamasıyla karıştırma.
- Önceki masaüstü/TinyFish testleri telefon portresini kanıtlamıyordu. Tek oyun iframe içinde 360×800, 393×852 ve 412×915 ölçülerinde gerçek CSS/DOM ölçümü yapılmıştır.

## Yeni kod
- `hud_dikey_kamera_test_3_16.html` = 3.15 sürümünden izole türetilmiş dosya.
- Dikey kamera yakınlaştırması `1.32 → 1.52` (yaklaşık %15'lik ölçek artışı); yatay kamera aynen 1.12.
- Dikey kamera y-ankrajı `0.50 → 0.47`, oyuncuyu çok hafif yukarı çeker; dünya/quest/loot/boss koordinatları ve hareket motoru **aynen korunur**.
- Mobil `100dvh` ekran yüksekliği; `window.__kmTest.get().zoom` artık gerçek `getCameraZoom()` ile aynı.
- Ödül popup'ı, oyun günlüğü, kayıt anahtarı, mevcut piksel görseller ve kontrol fonksiyonları korundu.
- **Bu bir kamera/kadraj denemesidir; dikey sahnelerin özel çizimlerine eşdeğer değildir.**

## Yapılmış testler
- Tam JS sözdizimi: **PASS** (V8).
- Render statik site dağıtımı: **live** — `https://kirik-muhur-314-izole-test.onrender.com/hud_dikey_kamera_test_3_16.html`.
- Tek pencere QA: `tek_dikey_qa_3_16.html`.
- TinyFish DOM ölçümleri:
  - 360×800 (iframe içi 354×794): `portrait:true`, yatay/dikey taşma `0/0`, JS HATA yok.
  - 412×915 (iframe içi 406×909): `portrait:true`, taşma `0/0`, JS HATA yok, canlı görsel var.
  - Önceki 3-iframe yan yana testte belirtilen 412×915 **siyah ekran** tek pencerede **tekrarlanmadı**.
- Muhafız sınıfı seçilip köy sahnesinin açıldığı gözlendi. 3.14'te ilk görevin savaş–teslim–ödül akışı canlı test edilmişti, **3.16'da tüm görev zinciri tekrar çalıştırılmadı**.
- TinyFish görsel incelemesinde kamera kadrajının belirgin biçimde daha yakın hissedildiği **doğrulanmadı**; salt JS zoom değeri artışı dikey görünüm hedefine yeterli kabul edilmiyor.

## Açık kalanlar
1. Kullanıcı istediği gerçekten **dikey kompozisyonlu** sanat için Fener Köyü / Ruh Ormanı / Kırık Tapınak arka planlarının dikey yeniden kadrajlanması veya özgün portre sahne çizimleri gerekir. Geniş yatay dünya haritasının tamamını daraltmak **yanlış** olur; sadece kamera/arka plan kompozisyonunu ayır.
2. Android cihaz üzerinde doğrudan 360×800 dokunma/joystick, modal kapama ve görüntü denetimi yapılmadı.
3. Bu kabul edilmeden `index.html`'e aktarılmayacak ve Aşama 4'e geçilmeyecek.
