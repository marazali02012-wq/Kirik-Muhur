from pathlib import Path
import sys
p=Path(sys.argv[1]) if len(sys.argv)>1 else Path(__file__).with_name('index.html')
s=p.read_text()
def rep(a,b):
 global s
 assert s.count(a)==1,(a[:80],s.count(a));s=s.replace(a,b)
a=s.index('function km332Enhance(');b=s.index('function km332Smelt(',a)
s=s[:a]+'''function km218ForgePlan(id,limit=1){const d=Object.hasOwn(itemdefs,id)?itemdefs[id]:null;if(!d||!KM332_SLOT_ORDER.includes(d.slot)||!km3134Can()||!Number.isInteger(limit)||limit<1||limit>10||state.equipment[d.slot]!==id||state.inv.filter(x=>x===id).length!==1||(state.depot||[]).includes(id)||(state.mail200||[]).includes(id))return null;const k=d.slot,l=km335Lv(k),tier=d.tier||1,cap=km3163Cap(d);if(!Number.isSafeInteger(l)||l<0||l>=cap||!Number.isSafeInteger(tier)||tier<1)return null;let count=0,gold=0,dust=0,wallet=null;while(count<limit&&l+count<cap){const g=20*(l+count+1)*tier,t=l+count+1,next=km213WalletPlan(state,'forge',gold+g,dust+t);if(!next)break;gold+=g;dust+=t;wallet=next;count++;}return count?{id,k,l,count,gold,dust,wallet}:null;}
function km332Enhance(id,limit=1){const plan=km218ForgePlan(id,limit);if(!plan){notify('Yükseltme için ekipman, kaynak veya kademe uygun değil.');return null;}const {k,l,count,wallet}=plan;const gold=state.coins,dust=state.materials,hp=state.player.hp,mp=state.player.mp,forge=state.sideStats?.forge;if(state.sideStats&&(!Number.isSafeInteger(forge??0)||forge<0||!Number.isSafeInteger((forge||0)+count)))return null;if(!km213WalletApply(state,wallet))return null;state.slotEn[k]=l+count;if(state.sideStats)state.sideStats.forge=(forge||0)+count;baseStats();if(!save(false,null,true)){state.coins=gold;state.materials=dust;state.slotEn[k]=l;if(state.sideStats)state.sideStats.forge=forge;baseStats();state.player.hp=hp;state.player.mp=mp;syncUI();notify('Kayıt doğrulanamadı • yükseltme iptal.');return null;}if(state.sideStats)km324CheckSideRewards();notify(KM332_SLOTS[k].n+' yuvası +'+(l+count));syncUI();return id;}
'''+s[b:]
rep("for(let i=0;i<10;i++){let k=km364UpgradeSlot,c=km335Cost(k);if(km335Lv(k)>=km3163Cap(itemdefs[state.equipment[k]])||state.coins<c.gold||state.materials<c.toz||!km332Enhance(state.equipment[k]))break}re()","km332Enhance(state.equipment[km364UpgradeSlot],10);re()")
rep("let count=0,gold=0,toz=0;while(count<10&&l+count<km3163Cap(d)){const g=20*(l+count+1)*(d.tier||1),t=l+count+1;if(gold+g>state.coins||toz+t>state.materials)break;gold+=g;toz+=t;count++;}","const plan=km218ForgePlan(state.equipment[k],10),count=plan?.count||0,gold=plan?.gold||0,toz=plan?.dust||0;")
rep("if(b)b.textContent=count?`${count} Sv. yükselt`:'Çoklu yükselt';","if(b){b.textContent=count?`${count} Sv. yükselt`:'Çoklu yükselt';b.disabled=!plan;}const one=$('km364UpOne');if(one)one.disabled=!km218ForgePlan(state.equipment[k],1);")
rep("${max||state.coins<c.gold||state.materials<c.toz?'disabled':''}>Yükselt", "${!km218ForgePlan(id,1)?'disabled':''}>Yükselt")
rep("${max||state.coins<c.gold||state.materials<c.toz?'disabled':''}>10 Sv. Yükselt", "${!km218ForgePlan(id,10)?'disabled':''}>10 Sv. Yükselt")
rep('Kırık Mühür 3.217 — Mücevher İşlem Kaydı TEST','Kırık Mühür 3.218 — Toplu Güçlendirme TEST')
# Render the exact same plan in the initial HTML; no post-render mutation.
rep('next=km364BonusAt(d,Math.min(l+1,cap));return', 'next=km364BonusAt(d,Math.min(l+1,cap)),batch=km218ForgePlan(id,10);return')
rep('<div class="km364uprow"><button id="km364UpOne"', '''<div class="km3143cost">${batch?`${batch.count} kademe: ${batch.gold} altın · ${batch.dust} ruh tozu`:'Yükseltme için kaynak veya kademe yetersiz'}</div><div class="km364uprow"><button id="km364UpOne"''')
rep("${!km218ForgePlan(id,10)?'disabled':''}>10 Sv. Yükselt", "${!batch?'disabled':''}>${batch?batch.count+' Sv. yükselt':'Çoklu yükselt'}")
a=s.index("const row=body.querySelector('.km364uprow');if(row){const k=km364UpgradeSlot");b=s.index('return out;};',a)
s=s[:a]+'}'+s[b:]
p.write_text(s)
