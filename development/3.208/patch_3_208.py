from pathlib import Path
p=Path(__file__).resolve().parent/'index.html'
s=p.read_text()
changes=[
("function km332Enhance(id){const d=itemdefs[id];if(!d||!d.slot)return null;if(!km332Equipped(id))", "function km332Enhance(id){const d=Object.hasOwn(itemdefs,id)?itemdefs[id]:null;if(!d||!KM332_SLOT_ORDER.includes(d.slot)||!km3134Can())return null;if(state.equipment[d.slot]!==id||!state.inv.includes(id))"),
("const c=km335Cost(k);if(state.coins<c.gold||state.materials<c.toz)", "const c=km335Cost(k);if(!Number.isSafeInteger(l)||l<0||!Number.isFinite(state.coins)||!Number.isFinite(state.materials)||!Number.isFinite(c.gold)||c.gold<=0||state.coins<c.gold||state.materials<c.toz)"),
("{id:'slots',name:'Yuva Ustası',detail:'2 ekipman yuvasını +5’e çıkar',target:2,coin:240,xp:160,mat:6}", "{id:'slots',name:'Yuva Ustası',detail:'2 ekipman yuvasını +5’e çıkar',target:2,coin:240,xp:160,mat:6},\n {id:'forge10a',name:'Güçlendirme Yolu I',detail:'2 farklı kuşanılmış ekipmanı etkin +10’a çıkar',target:2,coin:240,xp:160,mat:6},\n {id:'forge10b',name:'Güçlendirme Yolu II',detail:'4 farklı kuşanılmış ekipmanı etkin +10’a çıkar',target:4,coin:240,xp:160,mat:6,after:'forge10a'}"),
("function km324SideValue(id){", "function km208ForgeCount(w,level){const seen=new Set();let n=0;for(const k of KM332_SLOT_ORDER){const id=w.equipment?.[k],d=Object.hasOwn(itemdefs,id)?itemdefs[id]:null,l=w.slotEn?.[k];if(!d||d.slot!==k||!w.inv?.includes(id)||seen.has(id)||!Number.isSafeInteger(l)||Math.min(l,km3163Cap(d))<level)continue;seen.add(id);n++;}return n;}\nfunction km324SideValue(id){if(id==='forge10a'||id==='forge10b')return km208ForgeCount(state,10);"),
("if(state.questRewards.includes(id)||km324SideValue(t.id)<t.target)continue;", "if(state.questRewards.includes(id)||(t.after&&!state.questRewards.includes('side324-'+t.after))||km324SideValue(t.id)<t.target)continue;"),
("const val=Math.min(km324SideValue(t.id),t.target),done=state.questRewards.includes('side324-'+t.id);", "const done=state.questRewards.includes('side324-'+t.id),locked=!done&&t.after&&!state.questRewards.includes('side324-'+t.after),val=done?t.target:locked?0:Math.min(km324SideValue(t.id),t.target);"),
("${done?'ÖDÜL VERİLDİ':`${t.coin} altın", "${done?'ÖDÜL VERİLDİ':locked?'Önce Güçlendirme Yolu I':`${t.coin} altın"),
("<div class=\"km364section\">Yükseltilebilir ekipmanlar</div>", "<div class=\"km364section\">Güçlendirme Yolu</div><div class=\"km364hint\">${state.questRewards.includes('side324-forge10a')?(state.questRewards.includes('side324-forge10b')?'✓ I ve II tamamlandı':'II · '+Math.min(4,km208ForgeCount(state,10))+'/4 ekipman +10'):'I · '+Math.min(2,km208ForgeCount(state,10))+'/2 ekipman +10'}</div><div class=\"km364section\">Yükseltilebilir ekipmanlar</div>")]
for a,b in changes:
 assert s.count(a)==1,(a,s.count(a));s=s.replace(a,b)
p.write_text(s)
