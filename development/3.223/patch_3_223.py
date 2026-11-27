from pathlib import Path
import sys
p=Path(sys.argv[1]) if len(sys.argv)>1 else Path(__file__).with_name('index.html')
s=p.read_text()
def rep(a,b):
 global s
 assert s.count(a)==1,(a[:100],s.count(a));s=s.replace(a,b)
a=s.index('function km335CheckLevelRewards(){');b=s.index('function km335OnLevel()',a)
s=s[:a]+'''function km223RewardAllowed(){return !!state.classId&&state.mode==='game'&&!state.paused&&km3134Can();}
function km223RewardTxn(fn){return km202Tx?fn():km222Settle(fn);}
function km223LevelGrant(r){const id='lv335-'+r.lv;if(state.level<r.lv||state.questRewards.includes(id))return false;
 const before={level:state.level,power:km324Power()},items=[];
 if(r.gear&&(!Number.isSafeInteger(state.gearSeq)||state.gearSeq<0||state.gearSeq>=Number.MAX_SAFE_INTEGER||Object.hasOwn(itemdefs,'g'+(state.gearSeq+1))))return false;
 if(!questAward(id,r.coin,0,r.mat))return false;
 if(r.gear){const slot=KM335_SLOTKEYS[(r.lv/5)%6|0],u=km332Make(slot,Math.min(4,1+Math.floor(r.lv/5)),r.gear);if(!addItem(u))throw Error('Level reward placement rejected');items.push(u);}
 notify('SEVİYE ÖDÜLÜ: Sv'+r.lv);km325QueueReward({id,kind:'side',title:'Seviye '+r.lv+' ödülü',npc:'Seviye ödülü',coin:r.coin,xp:0,mat:r.mat,items,levelBefore:before.level,levelAfter:state.level,powerBefore:before.power,powerAfter:km324Power()});return true;}
function km335CheckLevelRewards(){if(!km223RewardAllowed())return false;for(const r of KM335_LVREW){if(state.level<r.lv||state.questRewards.includes('lv335-'+r.lv))continue;if(!km223RewardTxn(()=>km223LevelGrant(r)))return false;}return true;}
'''+s[b:]
a=s.index('function km324CheckSideRewards(){');b=s.index('function km324OnZoneVisit(',a)
s=s[:a]+'''function km223SideReady(t){return !state.questRewards.includes('side324-'+t.id)&&(!t.after||state.questRewards.includes('side324-'+t.after))&&km324SideValue(t.id)>=t.target;}
function km324CheckSideRewards(){if(!km223RewardAllowed())return false;
 for(const t of KM324_SIDE_TASKS){if(!km223SideReady(t))continue;
 if(!km223RewardTxn(()=>{if(!km223SideReady(t))return false;const id='side324-'+t.id,before={level:state.level,power:km324Power()};if(!questAward(id,t.coin,t.xp,t.mat))return false;
 notify('YAN GÖREV TAMAMLANDI: '+t.name+' • Ödül eklendi');km325QueueReward({id,kind:'side',title:t.name,npc:'Yan hedef',coin:t.coin,xp:state.km3132LastQuestXP,mat:t.mat,items:[],levelBefore:before.level,levelAfter:state.level,powerBefore:before.power,powerAfter:km324Power()});return true;}))return false;
 }return true;}
let km223RewardRetryAt=0;
function km223RewardRetry(){if(km202Tx||!km223RewardAllowed()||performance.now()<km223RewardRetryAt)return;km223RewardRetryAt=performance.now()+2000;if(KM335_LVREW.some(r=>state.level>=r.lv&&!state.questRewards.includes('lv335-'+r.lv))&&!km335CheckLevelRewards())return;if(KM324_SIDE_TASKS.some(km223SideReady))km324CheckSideRewards();}
'''+s[b:]
rep('km325RewardTick();if(state.paused)', 'km223RewardRetry();km325RewardTick();if(state.paused)')
rep("r.kind==='side'?'YAN HEDEF TAMAMLANDI'","/^lv335-\\d+$/.test(r.id)?'SEVİYE ÖDÜLÜ':r.kind==='side'?'YAN HEDEF TAMAMLANDI'")
rep('Kırık Mühür 3.222 — Görev Ödül İşlemi TEST','Kırık Mühür 3.223 — Seviye Ödülleri TEST')
rep(' · 3.222 TEST</p>',' · 3.223 TEST</p>')
p.write_text(s)
