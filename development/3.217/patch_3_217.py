from pathlib import Path
import sys
p=Path(sys.argv[1]) if len(sys.argv)>1 else Path(__file__).with_name('index.html')
s=p.read_text()
def rep(a,b):
 global s
 assert s.count(a)==1,(a,s.count(a));s=s.replace(a,b)
rep('function km3133Change(action,id,slot){', '''// 3.217: bounded local audit journal. Never a source of spendable balances.
function km217Journal(raw){const entries=[];let seq=0;if(!Array.isArray(raw?.entries))return {seq,entries};for(const e of raw.entries.slice(-64)){if(!Number.isSafeInteger(e?.seq)||e.seq<=seq||!['craft','merge','equip','remove'].includes(e.action)||typeof e.id!=='string'||!km3133Gem(e.id)||!Number.isSafeInteger(e.at)||e.at<0)continue;if((e.action==='equip'||e.action==='remove')&&!KM332_SLOT_ORDER.includes(e.slot))continue;if(e.action==='craft'&&km3133Gem(e.id).l!==1||e.action==='merge'&&km3133Gem(e.id).l>=KM3133_MAX)continue;seq=e.seq;entries.push({seq,action:e.action,id:e.id,slot:e.action==='equip'||e.action==='remove'?e.slot:null,at:e.at});}return {seq,entries};}
function km217Append(raw,action,id,slot,at=Date.now()){const d=km217Journal(raw);if(d.seq>=Number.MAX_SAFE_INTEGER)return null;const next=km217Journal({entries:[...d.entries,{seq:d.seq+1,action,id,slot,at}]});return next.seq===d.seq+1?next:null;}
function km3133Change(action,id,slot){''')
rep('const d=km3133San(state.gem133),g=km3133Gem(id),old=state.gem133,coins=state.coins,dust=state.materials,hp=state.player.hp,mp=state.player.mp;','const d=km3133San(state.gem133),g=km3133Gem(id),old=state.gem133,coins=state.coins,dust=state.materials,hp=state.player.hp,mp=state.player.mp,oldJournal=state.gemJournal217;const journal=km217Append(oldJournal,action,action===\'remove\'?d.slots[slot]:id,slot);if(!journal)return false;')
rep("state.gem133=d;baseStats();if(!save(false,null,true)){state.gem133=old;state.coins=coins;state.materials=dust;state.player.hp=hp;state.player.mp=mp;baseStats();notify('Kayıt başarısız; işlem iptal.');return false;}","state.gem133=d;state.gemJournal217=journal;baseStats();if(!save(false,null,true)){state.gem133=old;state.gemJournal217=oldJournal;state.coins=coins;state.materials=dust;baseStats();state.player.hp=hp;state.player.mp=mp;notify('Kayıt başarısız; işlem iptal.');return false;}")
rep('gem133:km3133San(src.gem133),','gem133:km3133San(src.gem133),gemJournal217:km217Journal(src.gemJournal217),')
rep('state.gem133=km3133San(null);','state.gem133=km3133San(null);state.gemJournal217=km217Journal(null);')
rep('state.gem133=km3133San(old.gem133);','state.gem133=km3133San(old.gem133);state.gemJournal217=km217Journal(old.gemJournal217);')
rep('Kırık Mühür 3.216 — Kaynak Güvenliği TEST','Kırık Mühür 3.217 — Mücevher İşlem Kaydı TEST')
rep('<h3>Donanım yuvaları</h3><div class="km3133slots">','${km217LastUI(state.gemJournal217)}<h3>Donanım yuvaları</h3><div class="km3133slots">')
rep('function km3133Change(action,id,slot){', """function km217LastUI(raw){const e=km217Journal(raw).entries.at(-1);if(!e)return '<p class="km3126note km217last">Henüz kayıtlı mücevher işlemi yok.</p>';const g=km3133Gem(e.id),action={craft:'Üretildi',merge:'Birleştirildi',equip:'Takıldı',remove:'Çıkarıldı'}[e.action];return `<p class="km3126note km217last">Son işlem #${e.seq}: ${g.name} ${g.l} · ${action}</p>`;}
function km3133Change(action,id,slot){""")
p.write_text(s)
