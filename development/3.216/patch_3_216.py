from pathlib import Path
import sys
p=Path(sys.argv[1]) if len(sys.argv)>1 else Path(__file__).with_name('index.html')
s=p.read_text()
def rep(a,b):
 global s
 assert s.count(a)==1,(a,s.count(a));s=s.replace(a,b)
rep("['forge','fusion','gem-craft','appearance'].includes(route)","['forge','fusion','gem-craft','appearance','companion','fate'].includes(route)")
rep('return l<KM334_CMAX&&l<state.level&&state.coins>=c.gold&&state.materials>=c.toz}', 'return Number.isSafeInteger(l)&&l>=1&&l<KM334_CMAX&&l<state.level&&!!km213WalletPlan(state,"companion",c.gold,c.toz)}')
rep(" if(state.coins<c.gold||state.materials<c.toz){notify('Altın veya ruh tozu yetersiz ('+c.gold+' altın, '+c.toz+' toz)');return false}\n state.coins-=c.gold;state.materials-=c.toz;state[key]=l+1;baseStats();notify(nm+' Sv'+(l+1));km331Banner(nm.toLocaleUpperCase('tr-TR')+' SV'+(l+1));syncUI();save();return true}", " const plan=km213WalletPlan(state,'companion',c.gold,c.toz);if(!Number.isSafeInteger(l)||l<1||!plan){notify('Altın veya ruh tozu yetersiz');return false;}\n const before={level:state[key],coins:state.coins,materials:state.materials,hp:state.player.hp,mp:state.player.mp};if(!km213WalletApply(state,plan))return false;state[key]=l+1;baseStats();if(!save(false,null,true)){state[key]=before.level;state.coins=before.coins;state.materials=before.materials;baseStats();state.player.hp=before.hp;state.player.mp=before.mp;syncUI();notify('Kayıt başarısız • yükseltme iptal.');return false;}notify(nm+' Sv'+(l+1));km331Banner(nm.toLocaleUpperCase('tr-TR')+' SV'+(l+1));syncUI();return true}")
rep("const p=km3146Price(d.lv[id]);if(coins<p.gold||dust<p.dust)return false;state.coins-=p.gold;state.materials-=p.dust;d.lv[id]++;", "const p=km3146Price(d.lv[id]),plan=km213WalletPlan(state,'fate',p.gold,p.dust);if(!plan||!km213WalletApply(state,plan))return false;d.lv[id]++;")
rep("use:'Demirci, mücevher üretimi ve füzyon'},boss_ticket", "use:'Demirci, mücevher, füzyon, pet, binek ve kader geliştirme'},boss_ticket")
rep("source:'Günlük bilet yenilenmesi',use:'Kişisel boss girişinde 2 adet otomatik tüketilir'", "source:'Günlük 6 bilet yenilenir',use:'Kişisel boss girişinde 2 adet tüketilir; giriş hakkı ayrıca kontrol edilir'")
rep("use:'Uygun elit boss bekleme süresini sıfırlar'}};", "use:'Uygun elit boss bekleme süresini sıfırlar'},fate_ash:{id:'fate_ash',icon:'◇',name:'Kül Kaderi',type:'Kader malzemesi',source:'Kül Lordu galibiyeti · ilk kule katı gerekli',use:'Eritme: 1 kader özü; Çifte Yankı füzyonunda 1 adet'},fate_colossus:{id:'fate_colossus',icon:'◇',name:'Kolos Kaderi',type:'Kader malzemesi',source:'Dünya bossu galibiyeti · ilk kule katı gerekli',use:'Eritme: 1 kader özü; Çifte Yankı füzyonunda 1 adet'},fate_essence:{id:'fate_essence',icon:'❖',name:'Kader özü',type:'Kader malzemesi',source:'Günlük kule ödülü · kader eritme',use:'Çifte Yankı füzyonunda 2 adet; 5. kule katı gerekli'}};")
rep('...gems.bag};return Object.entries(values)', '...gems.bag};if(km3146Cleared(w)>0){const f=km3158Resources(w);Object.assign(values,{fate_ash:f.stock[0],fate_colossus:f.stock[1],fate_essence:f.essence});}return Object.entries(values)')
rep('Miktarlar mevcut kayıttan okunur. Mücevherler ve boss biletleri ilgili sistemde kullanılır.', 'Miktarlar mevcut kayıttan okunur. Boss bileti, mücevher ve kader malzemeleri ilgili panellerde kullanılır.')
rep('if(!km3134Can()||!km3146Cleared())return false;const old=state.fate146', 'if(!km3134Can()||!km395Suspended()||km325RewardOpen||!km3146Cleared())return false;const old=state.fate146'.replace('!km395Suspended()','km395Suspended()'))
rep('Kırık Mühür 3.215 — Ekipman Nitelikleri TEST','Kırık Mühür 3.216 — Kaynak Güvenliği TEST')
p.write_text(s)
