# Kırık Mühür 3.25 — Aşama 3A Onarım: Değişiklikler

**Kaynak:** `Kirik_Muhur_3_24_KAYNAK_TEST.html` (Git blob SHA `b70de48f729e77fdd924711001ada641cb39b2d5`, doğrulandı — kaynak dosya değiştirilmedi).
**Yeni dosya:** `Kirik_Muhur_3_25_3A_Onarim_TEST.html` (tek dosya, tek `<script>`, gömülü base64 görseller korundu).
**Uygulama yöntemi:** `testler/3A_3_25/patch325.py` — her değişiklik "tam olarak 1 kez geçen eski metin → yeni metin" olarak uygulanır; eşleşme sayısı tutmazsa betik durur. Yani bu dosya aynı zamanda satır satır kesin değişiklik listesidir.

**Korunanlar:** `index.html`, 3.19–3.24 HTML'leri, kayıt anahtarı `kirikMuhurQuestFlowV324Test`, eski anahtarlar (`kirikMuhurQuestFlowV323Test`, `kirikMuhurQuestFlowV32`, `kirikMuhurStep3TestV1`) — okunur ama **asla yazılmaz/silinmez**. 10 ana + 5 dönüşümlü devam + 3 yan görev, 3 sınıf, çanta, harita, çiçek menü, binek/pet, gelişim ekranı silinmedi. Render/frame döngüsü ve sprite yönleri değiştirilmedi. 3.24'ün `questRewards` / `side324-*` / `mission-N` muhasebe kimlikleri aynen kullanılıyor.

## Kök neden → düzeltme (her biri 3.24 kaynağında testle yeniden üretildi)

| # | Hata (3.24'te kanıt) | Kök neden | Değişen işlev | Kanıt (3.25) |
|---|---|---|---|---|
| 1 | NPC teslimi sonrası **ödül popup'ı hiç açılmıyor** (`modalHidden:true`) | CSS (`km-stage3-14-real-reward-popup`) vardı, ama `rewardVisible` sınıfını ekleyen JS yoktu; `closeModal` yalnız kaldırıyordu | `deliverMissionAtNPC`, yeni `km325QueueReward / km325RewardTick / km325ShowReward` | T05 ×3 sınıf, T22 |
| 2 | Manuel oyunda (oto kapalı) **öldürülen gölgeler sayılmıyor** (`phase:travel, kills:0`) | `travel→hunt` geçişi yalnız `autoMissionTick` içindeydi ve o işlev `autoPath=false` iken hemen dönüyordu | yeni `km325QuestProgress` (her karede, otodan bağımsız); `killEnemy` başına güvenlik | T09 ×3 |
| 3 | Manuel oyunda **inceleme/toplama noktası sayılmıyor** | Nokta toplama yalnız `autoMissionTick` içinde | yeni `km325CollectPoint` (tek kaynak), `autoMissionTick` ondan çağırır | T10 |
| 4 | Manuel oyuncu NPC'ye yürüyünce teslim yalnız ✦ tuşu/NPC'ye dokunmayla | Otomatik teslim yalnız oto yolda | `km325QuestProgress` 62 birim içinde `deliverMissionAtNPC` çağırır (idempotent) | T09 |
| 5 | **Mühür Parçası (relic) çoğalıyor** — görev öncesi tapınağa 3 giriş = 3 relic | Boss görev dışında öldürülünce `bossDead` set edilmiyor, her girişte yeniden doğuyordu; drop eşsiz değildi | `killEnemy` (boss her ölümde `bossDead=true`, relic yalnız çantada yoksa), `pickDrop` | bugs D: 3→1; T07 |
| 6 | **Bozuk kayıt sessizce eziliyor**, yedek yok, bildirim yok | `load()` `JSON.parse` hatasını yutup `null` döndürüyordu; sınıf seçimi `save()` ile üzerine yazıyordu | yeni `km325ReadKey`: ham veri `kirikMuhurQuestFlowV324Test_bozukYedek`'e (yoksa) kopyalanır; giriş ekranında uyarı | T17 |
| 7 | **Geçersiz alanlı kayıt oyunu çökertiyor** (`Cannot read properties of undefined (reading 'icon')`, `questPhase:'weird'` kilit, `coins:'x'`) | `restore()` alan doğrulaması yapmıyordu | yeni `km325Sanitize` (sayı/aşama/eşya/kuşanım/bölge doğrulama), görev sayacı `count` ile sınırlanır | T18 |
| 8 | **HP kaydedilmiyor** — yeniden açınca can tam doluyor (168→180) | `save()` hp/mp yazmıyordu, `restore()` maxHp atıyordu | `save()` (hp, mp, `questSchema:325`), `restore()` | T21 |
| 9 | **Sekme kapanınca konum kayboluyor** (678,685 → 475,580) | Kayıt yalnız olaylarda; `pagehide/visibilitychange` yoktu | `pagehide`, `visibilitychange`, 4 sn'de bir `km325AutoSave` | T20, T21 |
| 10 | Toplama görevinde (orman) kayıt yüklenince **gölgeler ölü doğuyor** | `enterZone` toplanan nokta sayısını gölge ölümü sanıyordu | `enterZone` koşulu yalnız gölge avına | bugs J |
| 11 | Yan hedef popup'ı oto görev/boss savaşı ortasında oyunu durdurur (3.25 ilk taslağında yakalandı) | — | Yan hedef popup'ı görevler arasında (`ready`) açılır; görev ödülü popup'ı önceliklidir; ödül yine anında eklenir + bildirim | T07, T12, T22 |
| 12 | Binaya/engele dokununca hiçbir şey olmuyor; ulaşılamaz hedefte her karede yeniden A* riski | `goTo` engel içindeki hedefi reddediyordu; yol sonu hedefe uzaksa sonsuz yeniden rota | `km325Walkable` (en yakın yürünebilir nokta), `tick` içinde yol sonu kontrolü | bugs F |
| 13 | Android geri tuşu oyundan çıkarır | Geçmiş girdisi yoktu | `popstate` tuzağı: açık pencere kapanır / duraklatma açılır (sınıf seçiminde devre dışı) | T16 (Chromium geçmiş simülasyonu) |
| 14 | Ölümde hareket/rota/basılı saldırı açık kalıyordu; ölüm anı kaydedilmiyordu | — | `enemyTick` ölüm dalı, `respawn` (önce can, sonra bölge) | T13 ×3 |
| 15 | Oyun günlüğünün 3. satırı yarım kesik görünüyor (taşma) | Kutu yüksekliği 2 satırlık | `notify` en fazla 2 satır | portre görüntüleri |
| 16 | Giriş metni "NPC'ye dokunarak teslim" diyor (gerçek davranış otomatik) | Eski metin | Giriş notu ve alt başlık 3.25 davranışıyla eşleştirildi | portre görüntüleri |
| 17 | Çiçek yalnız dokunuşla; "çevirme" yok | — | Çiçekte yatay kaydırma (≥22 px) sayfa ileri/geri; olay yayılımı durdurulur, karakter hareket etmez. Joystick (`#pad`) gizli kalır | T14 |
| 18 | `closeModal` sınıf seçimi/ölüm ekranında `mode='game'` zorlayabiliyordu | — | `closeModal` sınıfsız veya canı 0 iken modu değiştirmez | T13, T17 |

## Test API eklentisi (oyun mantığını değiştirmez)
`window.__kmTest.get()` artık `paused, rewardOpen, rewardShown, lastReward, loadIssue, hp` alanlarını da döndürür.

## Bilinçli olarak YAPILMAYANLAR (aşama kilidi)
3B/3C/3D/3E/4 kapsamındaki hiçbir sistem eklenmedi: yeni bölge/NPC/yaratık, ekonomi/XP formülü değişikliği, beceri ağacı, pet/binek eğitimi, karakter oluşturma, HUD yeniden tasarımı, boss/zindan, çevrimiçi özellik yok. XP/altın/hasar formülleri 3.24 ile aynı.
