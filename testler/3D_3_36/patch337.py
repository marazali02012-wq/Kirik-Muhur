# Kırık Mühür 3.37 — kullanıcı ekranlarına göre yoldaş/binek akışı (3.36 üzerine).
# Ekranlardaki akış: HUD tanıtımı "Sv. N Ana Görevi Bitir" → [Ana] Yolculuğa Hazırlık: ahıra git → Seyis + bağlı binekler →
# "Toplanıyor" çubuğu → "Aldın" (HP+…) Onayla(8) → "Binmek için hızlıca yukarı kaydırın" + "Eğitimi Geç".
# Kırık Mühür karşılığı (özgün metin): 4. ana görev → Ruh Tilkisi; 8. ana görev "YOLCULUĞA HAZIRLIK" → Ay Işığı Geyiği.
# Yoldaş/binek alındığı andan itibaren kalıcı stat verir. Eski kayıtta açık olan yoldaş/binek kaybolmaz.
import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding='utf-8').read()
def rep(old,new,count=1):
    global s
    n=s.count(old)
    if n!=count: raise SystemExit(f'EXPECTED {count} got {n}: {old[:100]!r}')
    s=s.replace(old,new)
rep('<title>Kırık Mühür 3.36 | 3D Uzun Regresyon TEST</title>','<title>Kırık Mühür 3.37 | Yoldaş Binek Akışı TEST</title>')
rep("savedAt:Date.now(),questSchema:336,","savedAt:Date.now(),questSchema:337,")
rep("saveVersion:'3.36'","saveVersion:'3.37'")
# --- kayıt
rep("slotEn:state.slotEn};","slotEn:state.slotEn,petOpen:!!state.petOpen,mountOpen:!!state.mountOpen,tutMount:!!state.tutMount};")
rep("state.slotEn=km335SanSlots(null);","state.slotEn=km335SanSlots(null);state.petOpen=false;state.mountOpen=false;state.tutMount=false;")
rep("enterZone(rz,rx,ry);$('modal').classList.add('hidden');setTimeout(km335CheckLevelRewards,0);","km337Restore(old);enterZone(rz,rx,ry);$('modal').classList.add('hidden');setTimeout(km335CheckLevelRewards,0);")
# --- hikâye: 8. ana görev = Yolculuğa Hazırlık (aynı sıra, aynı ödül kimliği mission-7; yalnız içerik)
rep(" {kind:'inspect',id:'archive',title:'FENER KÖYÜ ARŞİVİ',zone:'village',points:[{x:454,y:760,label:'Unutulmuş kayıt'}],count:1,returnZone:'village',returnNpc:'elder',coin:94,xp:142,material:2},",
    " {kind:'inspect',id:'stable',title:'YOLCULUĞA HAZIRLIK',zone:'village',points:[{x:1185,y:760,label:'Ahır • Ay Işığı Geyiği'}],count:1,returnZone:'village',returnNpc:'groom',coin:94,xp:142,material:2},")
rep(" 'Arşiv doğruluyor: kuzeydeki geçit bir zamanlar Kül Lordu’nun yoluymuş.',",
    " 'Kuzeydeki geçit bir zamanlar Kül Lordu’nun yoluymuş; yaya varamazsın. Ay Işığı Geyiği artık senin: yolda bin, savaşta in.',")
rep(" 'Tam zamanında yetiştin. Gözcü kulesi senin sayende hâlâ ayakta.',",
    " 'Tam zamanında yetiştin. Bu Ruh Tilkisi seni seçti; bundan sonra yanında savaşacak.',")
rep("{id:'smith',name:'Demirci Oran',x:870,y:700,sprite:'npcSmith',line:'Örsüm hazır; ormandan iyi malzeme gelirse çalışırım.'}",
    "{id:'smith',name:'Demirci Oran',x:870,y:700,sprite:'npcSmith',line:'Örsüm hazır; ormandan iyi malzeme gelirse çalışırım.'},{id:'groom',name:'Seyis Tolga',x:1115,y:735,sprite:'npcRanger',line:'Ahırdaki binekler yola hazır. Uzak yolculuğa çıkan bana uğrar.'}")
# --- görev teslimi: açılım
rep("questAward(id,m.coin,m.xp,m.material);if(state.missionIndex===1&&!state.inv.includes('talisman'))addItem('talisman');",
    "questAward(id,m.coin,m.xp,m.material);if(state.missionIndex===1&&!state.inv.includes('talisman'))addItem('talisman');km337OnMission(state.missionIndex);")
# --- "Toplanıyor" çubuğu (ahır noktası)
rep(" const pt=m.points[Math.min(state.missionKills,m.points.length-1)];if(!pt||dist(p,pt)>=46)return false;",
    " const pt=m.points[Math.min(state.missionKills,m.points.length-1)];if(!pt||dist(p,pt)>=46){km337Chan=0;return false}if(m.id==='stable'&&km337Chan<KM337_CHAN){km337Chan+=km337Dt;moveTarget=null;path=[];if(km337Chan<KM337_CHAN)return true}km337Chan=0;")
rep("km336MountTick(dt);","km336MountTick(dt);km337Dt=dt;")
# --- kilitler
rep("$('petBtn').onclick=()=>{state.pet=!state.pet;","$('petBtn').onclick=()=>{if(!state.petOpen){notify('Ruh Tilkisi: '+KM337.pet.label);return}state.pet=!state.pet;")
rep("if(state.level<2){notify('Binek 2. seviyede açılır');return}","if(!state.mountOpen){notify('Binek: '+KM337.mount.label+' (Yolculuğa Hazırlık)');return}")
rep("return !!state.mount&&state.level>=2&&km336FightT<=0","return !!state.mount&&!!state.mountOpen&&km336FightT<=0")
rep("if(kind==='mount'&&state.level<2)return false;","if(kind==='mount'?!state.mountOpen:!state.petOpen)return false;")
rep("if(kind==='mount'&&state.level<2){notify('Binek Sv2’de açılır');return false}","if(kind==='mount'?!state.mountOpen:!state.petOpen){notify((kind==='mount'?'Binek: ':'Ruh Tilkisi: ')+KM337[kind].label);return false}")
rep("${state.level<2?'2. seviyede açılır.':","${!state.mountOpen?KM337.mount.label+' (Yolculuğa Hazırlık) • açılır.':")
rep("${state.level<2?'disabled':''}>${state.level<2?'KİLİTLİ':","${!state.mountOpen?'disabled':''}>${!state.mountOpen?'KİLİTLİ':")
rep("<button id=\"km329PetT\" class=\"${state.pet?'primary':'outlined'}\">${state.pet?'YANINDA':'ÇAĞIR'}</button>",
    "<button id=\"km329PetT\" class=\"${state.pet?'primary':'outlined'}\" ${state.petOpen?'':'disabled'}>${!state.petOpen?'KİLİTLİ':state.pet?'YANINDA':'ÇAĞIR'}</button>")
rep("if(state.level===2)km335Reveal('♞','Ay Işığı Geyiği','Binek açıldı: hareket hızı +%55. Sadık menüsünden bin.');","")
rep("if(state.pet){const nearest=","if(state.pet&&state.petOpen){const nearest=")
rep("p.maxHp+=km334MountHp(c);","p.maxHp+=state.mountOpen?km334MountHp(c):0;km337CompStats(p,c);")
# --- HUD tanıtımı (ekrandaki "Sv. N Ana Görevi Bitir" biçimi)
rep("if(state.level<2)txt='♞ Binek • Sv2’de açılır';else{const z=Object.keys(KM326_UNLOCK).find(z=>!km326Unlocked(z));if(z)txt='🔒 '+names[z]+' • '+(KM326_UNLOCK[z])+'. görev sonrası'}","txt=km337Teaser();")
# --- ahır çizimi
rep("for(let d of state.drops){","km337DrawStable();for(let d of state.drops){")
# --- yukarı kaydırarak bin
rep("canvas.addEventListener('pointermove',e=>{","canvas.addEventListener('pointerdown',e=>{km337Sw={x:e.clientX,y:e.clientY,t:performance.now(),id:e.pointerId}},true);canvas.addEventListener('pointerup',e=>{if(!km337Sw||km337Sw.id!==e.pointerId)return;const dx=e.clientX-km337Sw.x,dy=e.clientY-km337Sw.y,dt=performance.now()-km337Sw.t;km337Sw=null;if(dy<-80&&Math.abs(dx)<70&&dt<450)km337SwipeMount()});\ncanvas.addEventListener('pointermove',e=>{")
rep('<style id="km335-complete">','''<style id="km337-mount">
#km337Tut{position:fixed;inset:0;z-index:62;pointer-events:none}
#km337Tut .arrow{position:absolute;left:50%;top:30%;width:70px;height:150px;margin-left:-35px;pointer-events:none;animation:km337a 1.1s ease-in-out infinite}
#km337Tut .arrow:before{content:'';position:absolute;left:20px;top:40px;width:30px;height:110px;background:linear-gradient(#ffe48a,#d99a2a);border-radius:6px}
#km337Tut .arrow:after{content:'';position:absolute;left:0;top:0;border:35px solid transparent;border-bottom:50px solid #ffe48a;border-top:0}
@keyframes km337a{0%{transform:translateY(30px);opacity:.3}60%{opacity:1}100%{transform:translateY(-20px);opacity:0}}
#km337Tut .tip{position:absolute;left:5%;right:5%;top:56%;background:#f3e6c8;color:#3b2a12;border:2px solid #b8924a;border-radius:12px;padding:12px 14px;font-weight:900;text-align:center;font-size:15px;box-shadow:0 4px 16px #0008}
#km337Tut button{position:absolute;right:12px;top:calc(env(safe-area-inset-top,0px) + 54px);pointer-events:auto;min-height:44px;padding:0 14px;border-radius:10px;font-weight:900;background:linear-gradient(#ffcf7a,#d98a2a);color:#3b1d00;border:2px solid #fff3c4}
#km337Chan{position:fixed;left:50%;top:42%;transform:translateX(-50%);z-index:59;pointer-events:none;width:min(260px,70vw);text-align:center;color:#fff;font-weight:900;text-shadow:0 1px 0 #000}
#km337Chan i{display:block;height:8px;margin-top:4px;border-radius:5px;background:#0008;overflow:hidden}#km337Chan i b{display:block;height:100%;background:linear-gradient(90deg,#9fe6ff,#ffe48a)}
</style><style id="km335-complete">''')
rep("// ===== 3.36 OTOMATİK BİNEK (savaşta in, yolda bin) =====",r"""// ===== 3.37 YOLDAŞ / BİNEK AKIŞI (kullanıcı ekranları) =====
// Açılım verisi: m = teslimde açılan görev sırası (0'dan). label = HUD'daki "N. Ana Görevi Bitir".
const KM337={pet:{m:3,icon:'🦊',name:'Ruh Tilkisi',label:'4. Ana Görevi Bitir'},mount:{m:7,icon:'♞',name:'Ay Işığı Geyiği',label:'8. Ana Görevi Bitir'}};
const KM337_CHAN=1.6;let km337Chan=0,km337Dt=0,km337Sw=null;
function km337Restore(old){const done=i=>state.questRewards.includes('mission-'+i);
 state.petOpen=old.petOpen!==undefined?!!old.petOpen:(!!old.pet||done(KM337.pet.m));state.mountOpen=old.mountOpen!==undefined?!!old.mountOpen:(!!old.mount||done(KM337.mount.m));
 state.tutMount=old.tutMount!==undefined?!!old.tutMount:state.mountOpen;if(!state.petOpen)state.pet=false;if(!state.mountOpen)state.mount=false;baseStats()}
function km337CompStats(p,c){if(state.petOpen){p.attack+=1+(state.petLv||1);p.maxHp+=Math.round(c.hp*.04)}if(state.mountOpen){p.maxHp+=Math.round(c.hp*.08);p.def+=1+(state.mountLv||1)}}
function km337Grant(kind){const k=KM337[kind],p=state.player;if(kind==='pet'?state.petOpen:state.mountOpen)return false;const b={hp:p.maxHp,atk:p.attack,def:p.def};
 if(kind==='pet'){state.petOpen=true;state.pet=true}else{state.mountOpen=true;state.mount=true;km336FightT=0}baseStats();const d={hp:p.maxHp-b.hp,atk:p.attack-b.atk,def:p.def-b.def};
 const st=[d.hp?'CAN +'+d.hp:'',d.atk?'SAL +'+d.atk:'',d.def?'SAV +'+d.def:''].filter(Boolean).join(' • ');
 km335Reveal(k.icon,k.name,(kind==='pet'?'Yakındaki düşmana kendiliğinden saldırır. ':'Oraya buraya gitmek için bineğe bin. ')+st);
 if(kind==='mount'&&!state.tutMount)km337WaitTut();syncUI();save();return d}
function km337OnMission(i){if(i===KM337.pet.m)km337Grant('pet');if(i===KM337.mount.m)km337Grant('mount')}
function km337WaitTut(){const t=setInterval(()=>{if(!$('km335Reveal')&&!state.paused&&state.mode==='game'&&$('modal').classList.contains('hidden')){clearInterval(t);km337Tut()}},300)}
function km337Tut(){if(state.tutMount||$('km337Tut'))return;const el=document.createElement('div');el.id='km337Tut';el.innerHTML='<div class="arrow"></div><div class="tip">Binmek için ekranda hızlıca yukarı kaydır ↑</div><button id="km337Skip">EĞİTİMİ GEÇ</button>';document.body.appendChild(el);
 $('km337Skip').onclick=()=>{state.tutMount=true;el.remove();save()}}
function km337SwipeMount(){if(!state.mountOpen||state.mode!=='game'||state.paused)return false;moveTarget=null;path=[];state.mount=true;km336FightT=0;baseStats();km336Sync();const p=state.player;effect(p.x,p.y-70,'♞ BİNDİ','#9fe6ff',14);
 if(!state.tutMount){state.tutMount=true;const t=$('km337Tut');if(t)t.remove();notify('Harika! Binek açıkken yolda biner, savaşta inersin.')}syncUI();save();return true}
function km337Teaser(){const mi=state.missionIndex,list=[];
 if(!state.petOpen)list.push({m:KM337.pet.m,t:KM337.pet.icon+' '+KM337.pet.name+' • '+KM337.pet.label});
 if(!state.mountOpen)list.push({m:KM337.mount.m,t:KM337.mount.icon+' Binek • '+KM337.mount.label});
 for(const [z,v] of Object.entries(KM326_UNLOCK))if(!km326Unlocked(z))list.push({m:v-1,t:'🔒 '+names[z]+' • '+v+'. Ana Görevi Bitir'});
 list.sort((a,b)=>a.m-b.m);return list.length?list[0].t:''}
function km337DrawStable(){if(state.zone!=='village')return;const x=1150,y=720;ctx.save();ctx.fillStyle='#6b4a2a';for(let i=0;i<5;i++)ctx.fillRect(x+i*36,y+86,8,26);ctx.fillRect(x-4,y+92,152,6);ctx.fillRect(x-4,y+104,152,5);
 ctx.fillStyle='#4a3420';ctx.fillRect(x+92,y-6,64,8);ctx.fillStyle='#7a5532';ctx.fillRect(x+96,y+2,6,70);ctx.fillRect(x+146,y+2,6,70);
 const mx=x+108,my=y+46;ctx.fillStyle='#355966';ctx.fillRect(mx,my,30,11);ctx.fillStyle='#7ba99d';ctx.fillRect(mx+2,my-7,24,8);ctx.fillRect(mx+24,my-14,7,10);ctx.fillStyle='#d2b98a';ctx.fillRect(mx+2,my+10,4,10);ctx.fillRect(mx+22,my+10,4,10);ctx.fillRect(mx+26,my-19,2,6);ctx.fillRect(mx+30,my-19,2,6);
 ctx.restore();
 const el=$('km337Chan');if(km337Chan>0){const e=el||Object.assign(document.createElement('div'),{id:'km337Chan'});if(!e.parentNode)document.body.appendChild(e);e.innerHTML='Toplanıyor<i><b style="width:'+Math.min(100,Math.round(km337Chan/KM337_CHAN*100))+'%"></b></i>'}else if(el)el.remove()}
// ===== 3.36 OTOMATİK BİNEK (savaşta in, yolda bin) =====""")
rep("mount:state.mount,riding:km336Riding(),","mount:state.mount,riding:km336Riding(),petOpen:!!state.petOpen,mountOpen:!!state.mountOpen,tutMount:!!state.tutMount,teaser:km337Teaser(),")
rep("setFlowerMenuPage,slotBonus:","setFlowerMenuPage,grant:k=>km337Grant(k),swipeMount:()=>km337SwipeMount(),slotBonus:")
open(dst,'w',encoding='utf-8').write(s);print('OK',len(s))
