from pathlib import Path
import sys
p=Path(sys.argv[1]) if len(sys.argv)>1 else Path(__file__).with_name('index.html')
s=p.read_text()
def rep(a,b):
 global s
 assert s.count(a)==1,(a[:80],s.count(a));s=s.replace(a,b)
rep("grant=['smelt','smelt-batch'].includes(route)","grant=['smelt','smelt-batch','event-reward','growth-reward'].includes(route)")
rep("if(!r||km3131Status(id,d)!=='ready')return false;", "if(!r||km3131Status(id,d)!=='ready')return false;\n const plan=km213WalletPlan(state,'event-reward',r.gold,r.dust);if(!plan){notify('Ödül için kaynak kaydı geçersiz.');return false;}")
rep('state.event131=d;state.coins+=r.gold;state.materials+=r.dust;', 'if(!km213WalletApply(state,plan))return false;state.event131=d;')
rep("const st=km3131Status(r.id,d);return `<article", "const st=km3131Status(r.id,d),wallet=!!km213WalletPlan(state,'event-reward',r.gold,r.dust);return `<article")
rep("${st!=='ready'||blocked?'disabled':''}>${st==='claimed'?'Alındı':st==='ready'?'Al':'Kilitli'}", "${st!=='ready'||blocked||!wallet?'disabled':''}>${st==='claimed'?'Alındı':st!=='ready'?'Kilitli':blocked?'Saat hatası':!wallet?'Kayıt hatası':'Al'}")
rep("function km3142Value(g){return g.kind==='gear'?KM332_SLOT_ORDER.filter(k=>!!itemdefs[state.equipment[k]]&&km335Lv(k)>=g.level).length:Math.max(0,Math.floor(state.player.def));}",'''function km3142Value(g){if(g.kind!=='gear')return Number.isFinite(state.player.def)?Math.max(0,Math.floor(state.player.def)):0;let n=0;for(const k of KM332_SLOT_ORDER){const id=state.equipment?.[k],d=Object.hasOwn(itemdefs,id)?itemdefs[id]:null,l=state.slotEn?.[k];if(!d||d.slot!==k||state.inv?.filter(x=>x===id).length!==1||(state.depot||[]).includes(id)||(state.mail200||[]).includes(id)||!km381Allowed(id,state.classId,state.level,state.inv)||!Number.isSafeInteger(l)||l<g.level||km3163Cap(d)<g.level)continue;n++;}return n;}
function km219GrowthPlan(g){return g&&km213WalletPlan(state,'growth-reward',g.coin,g.mat);}''')
rep("const c=state.coins,m=state.materials,old=state.questRewards;state.questRewards=[...old,key];state.coins+=g.coin;state.materials+=g.mat;", "const plan=km219GrowthPlan(g);if(!plan){notify('Ödül için kaynak kaydı geçersiz.');return false;}const c=state.coins,m=state.materials,old=state.questRewards;if(!km213WalletApply(state,plan))return false;state.questRewards=[...old,key];")
rep("n=km3142Value(g),ready=n>=g.max;const el", "n=km3142Value(g),ready=n>=g.max,wallet=!!km219GrowthPlan(g);const el")
rep("st.textContent=done?'ALINDI':ready?'HAZIR':Math.min(n,g.max)+'/'+g.max;", "st.textContent=done?'ALINDI':ready?(wallet?'HAZIR':'KAYIT HATASI'):Math.min(n,g.max)+'/'+g.max;")
rep("b.disabled=done;b.textContent=done?'Ödül alındı':ready?'Ödülü al':'Demirciye git';", "b.disabled=done||(ready&&!wallet);b.textContent=done?'Ödül alındı':ready?(wallet?'Ödülü al':'Kaynak kaydı geçersiz'):'Demirciye git';")
rep('Kırık Mühür 3.218 — Toplu Güçlendirme TEST','Kırık Mühür 3.219 — Ödül Kayıt Güvenliği TEST')
rep("ready=[...KM3131_TASKS,...KM3131_REWARDS].filter(r=>km3131Status(r.id,d)==='ready').length;","ready=[...KM3131_TASKS,...KM3131_REWARDS].filter(r=>!blocked&&km3131Status(r.id,d)==='ready'&&km213WalletPlan(state,'event-reward',r.gold,r.dust)).length;")
p.write_text(s)
