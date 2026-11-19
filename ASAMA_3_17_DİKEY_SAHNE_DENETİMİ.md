# Aşama 3 — 3.17 Dikey Oynanış ve Sahne Denetimi

Tarih: 19 Kasım 2026. İzole dal: `stage3-reward-ui-314`. Ana `index.html` **değiştirilmedi**. Aşama 4'e **geçilmedi**.

## Çalışma ve kök neden
1. Önceki 3.16 dizaynı teknik olarak portre (`CW=432, CH=960`) olsa da hâlâ **yatay dünya haritasını kamera ile gösteriyordu** (`W=1440, H=960`). Sadece CSS ve zoom değiştirmek, 3B/2.5B portre kompozisyonuna dönüşmek demek değildir.
2. 3.16 kamera y-ankrajı `0.47` idi, bu da karakterin üst yarıya yakın durmasına sebep oluyordu. 3.17 y-ankrajı `0.60` yapıldı: ileri yürünecek üst bölgeye daha fazla ekran payı ayrıldı.
3. Portre kamera zoom `1.52 -> 1.68`. Yatay moddaki `1.12` zoom korunuyor.
4. `km317PortraitWorld()` mevcut dünya koordinatları üzerine Fener Köyü/Ruh Ormanı/Kırık Tapınak'a özel, özgün, düşük opaklıklı kuzey-güney patika, taş, lamba/ruhsal ışık ve çevre dokusu ekliyor. **Yeni bölgeler veya fizik engeller eklemiyor**.
5. `km317PortraitDepthFrame()` portre ekranda sınırlı alan derinliği amaçlayan kenar/gölge kompozisyonu uyguluyor. Kontrol düğmelerinin üzerine DOM katmanı eklenmiyor.
6. Kaydetme anahtarı `kirikMuhurQuestFlowV32`, harita bağlantıları, görev akışı, ödüller, saldırı hesapları ve boss mekanikleri korunuyor.

## Test sonuçları
- JS sözdizimi ve kod bütünlüğü kontrolleri **PASS**. Bu, tüm oynanışın test edildiği anlamına gelmez.
- Render statik test ortamı `https://kirik-muhur-314-izole-test.onrender.com/`.
- `tek_dikey_qa_3_17.html` ile TinyFish oynanabilir browser QA:
  - 360x800: içeride 354x794; `portrait:true`, yatay/dikey taşma `0/0`, JavaScript hata raporu yok; Muhafız sınıfı seçildi ve köy sahnesi açıldı.
  - 393x852: içeride 387x846; `portrait:true`, taşma `0/0`, JS hata raporu yok.
  - 412x915: içeride 406x909; `portrait:true`, taşma `0/0`, JS hata raporu yok; siyah ekran **yok**.
- Görsel gözlem: oyuncu aşağı/ortada, fakat önceki sürüme göre belirgin büyük görünmedi; vinyet/patika yeni dekorasyonu görsel inceleme tarafından fark edilmedi. **Görsel kalite hedefi henüz doğrulanmadı.**
- `dikey_sahne_316_317_karsilastirma.html` ile iki sürüm sabit 360x800 iframe'de ayrı ayrı oynanıp karşılaştırılabilir.
- Gerçek Android cihaz test edilmedi; TinyFish iframe bir Android cihaz değildir. Tam görev zinciri, joystick ve boss savaşı 3.17 üzerinde baştan sona test edilmedi.

## Açık kabul koşulu
1. İstenen dikey RPG kompozisyonu için yalnız zoom/overlay değil; gerçekten yeni **portreye göre kompoze edilmiş, özgün ve işlevsel dünya sanat görselleri** gerekecek. Kaynak referans fotoğraflarındaki telifli varlıklar birebir kullanılmaz.
2. Portre sanatının üç bölgede gerçek hareket/kamera ve NPC konumlarını bozmadığı **görsel olarak** doğrulanmalı.
3. Android cihazda hareket, görev, saldırı, boss ölüm, portal, ödül ve kaydet/yükle regresyonu tamamlanmadan ana `index.html` güncellenmez.
4. Figma'da 3.17 referans dosyası açıldı, ancak Starter MCP araç çağrı sınırı nedeniyle düzenlenebilir ekran çizimi oluşturulamadı. Canva'da bulunan mevcut Kırık Mühür tasarım referansı incelendi; kod olarak uygulandığı iddia edilmez.

**Sonuç: AŞAMA 3 AÇIK. 3.17 yalnız izole test sürümüdür.**
