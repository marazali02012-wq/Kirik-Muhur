# Kırık Mühür 3.31 — Uptodown'daki gerçek Kung Fu Saga oyun içi ekranlarından referans (3.30 üzerine)
# Gözlenen ve özgün olarak uygulanan: kayan "Kazanıldı" ödül satırları, geri sayımlı hızlı kuşanma kartı, beceri adı afişi,
# portre seviye rozeti, sonraki açılım tanıtımı, tam genişlik EXP çubuğu, karakter oluşturmada saç rengi + zarla isim.
# Görsel/isim/metin kopyalanmadı. Sohbet ve PK modu (çevrimiçi gerektirir) eklenmedi.
import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding='utf-8').read()
def rep(old,new,count=1):
    global s
    n=s.count(old)
    if n!=count: raise SystemExit(f'EXPECTED {count} got {n}: {old[:100]!r}')
    s=s.replace(old,new)

rep('<title>Kırık Mühür 3.30 | NPC Konuşma ve Efekt TEST</title>','<title>Kırık Mühür 3.31 | Referans Arayüz TEST</title>')
rep("savedAt:Date.now(),questSchema:330,","savedAt:Date.now(),questSchema:331,")
rep("saveVersion:'3.30'","saveVersion:'3.31'")

# ---------- DOM: seviye rozeti, kazanım satırları, kuşanma kartı, tanıtım kutusu, alt EXP çubuğu
rep('<div class="playerPortrait" aria-hidden="true"><canvas id="portraitIcon" width="48" height="58" aria-hidden="true"></canvas></div>',
    '<div class="playerPortrait" aria-hidden="true"><canvas id="portraitIcon" width="48" height="58" aria-hidden="true"></canvas><span id="km331Lv" class="km331lv">1</span></div>')
rep('<div id="bossBar" class="km329boss" hidden>','<div id="km331Gains" class="km331gains" aria-live="polite"></div><div id="km331Equip" class="km331equip" hidden></div><div id="km331Teaser" class="km331teaser" hidden></div><div id="km331Exp" class="km331exp"><span></span></div><div id="bossBar" class="km329boss" hidden>')

# ---------- Kazanım satırları (görev/yan görev ödülü ve yeni eşya)
rep("function questAward(id,coin,xp,mat){if(state.questRewards.includes(id))return false;state.questRewards.push(id);state.coins+=coin;state.materials+=mat;earnXP(xp);save();return true}",
    "function questAward(id,coin,xp,mat){if(state.questRewards.includes(id))return false;state.questRewards.push(id);state.coins+=coin;state.materials+=mat;earnXP(xp);save();km331Gain([['◆','Altın',coin],['✦','XP',xp],['❖','Ruh tozu',mat]]);return true}")
rep("function addItem(id){if(!itemdefs[id])return;state.inv.push(id);notify(`${itemdefs[id].name} elde edildi`);save()}",
    "function addItem(id){if(!itemdefs[id])return;state.inv.push(id);notify(`${itemdefs[id].name} elde edildi`);save();km331Gain([[itemdefs[id].icon,itemdefs[id].name,1]]);km331OfferEquip(id)}")

# ---------- Beceri adı afişi
rep("notify(state.classId==='guardian'?'Keskin Mühür!':state.classId==='scout'?'Kül Oku!':'Ruh Dalgası!')",
    "notify(state.classId==='guardian'?'Keskin Mühür!':state.classId==='scout'?'Kül Oku!':'Ruh Dalgası!');km331Banner(state.classId==='guardian'?'KESKİN MÜHÜR':state.classId==='scout'?'KÜL OKU':'RUH DALGASI')")
rep("notify(state.classId==='guardian'?'Mühür Savuruşu!':state.classId==='scout'?'Kül Yağmuru!':'Ruh Çemberi!');",
    "notify(state.classId==='guardian'?'Mühür Savuruşu!':state.classId==='scout'?'Kül Yağmuru!':'Ruh Çemberi!');km331Banner(state.classId==='guardian'?'MÜHÜR SAVURUŞU':state.classId==='scout'?'KÜL YAĞMURU':'RUH ÇEMBERİ');")
rep("km329DrawShots();km330DrawBubble();","km329DrawShots();km330DrawBubble();km331DrawBanner();")

# ---------- HUD senkronu: rozet, tanıtım, alt EXP
rep("function km329Sync(){const p=state.player;","function km329Sync(){const p=state.player;km331Sync();")

# ---------- Saç rengi ve zarla isim (karakter oluşturma)
rep(":st.step===2?`<div class=\"km329pick two\"><button data-g=\"m\" class=\"${st.g==='m'?'sel':''}\">♂ ERKEK</button><button data-g=\"f\" class=\"${st.g==='f'?'sel':''}\">♀ KADIN</button></div>`",
    ":st.step===2?`<div class=\"km329pick two\"><button data-g=\"m\" class=\"${st.g==='m'?'sel':''}\">♂ ERKEK</button><button data-g=\"f\" class=\"${st.g==='f'?'sel':''}\">♀ KADIN</button></div><div class=\"km331hair\"><small>SAÇ RENGİ</small>${KM331_HAIR.map((h,i)=>`<button data-hair=\"${i}\" class=\"${(st.hair||0)===i?'sel':''}\" title=\"${h.n}\" style=\"background:${h.c||'linear-gradient(135deg,#888,#333)'}\">${i?'':'◎'}</button>`).join('')}</div>`")
rep("body.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{st.g=b.dataset.g;render()});",
    "body.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{st.g=b.dataset.g;render()});body.querySelectorAll('[data-hair]').forEach(b=>b.onclick=()=>{st.hair=+b.dataset.hair;render()});const dice=$('km331Dice');if(dice)dice.onclick=()=>{st.name=KM331_NAMES[Math.floor(Math.random()*KM331_NAMES.length)];render()};")
rep('<input id="km329Name" class="km329name" maxlength="14" autocomplete="off" placeholder="Kahraman adı (isteğe bağlı)" value="${esc(st.name)}">',
    '<div class="km331namerow"><input id="km329Name" class="km329name" maxlength="14" autocomplete="off" placeholder="Kahraman adı (isteğe bağlı)" value="${esc(st.name)}"><button id="km331Dice" title="Rastgele isim">🎲</button></div>')
rep("state.gender=st.g;state.heroName=st.name.trim();","state.gender=st.g;state.heroName=st.name.trim();state.hair=st.hair||0;")
rep("function km329Key(){const k=state.classId+(state.gender==='f'?'_f':'');return spriteImages[k]?k:state.classId}",
    "function km329Key(){const k=state.classId+(state.gender==='f'?'_f':'');const b=spriteImages[k]?k:state.classId;return km331HairKey(b,state.hair||0)}")
# önizleme de saç rengini kullanır
import re
m=re.search(r"key=st\.cls\+\(st\.g==='f'\?'_f':''\),im=spriteImages\[key\]\|\|spriteImages\[st\.cls\];",s)
assert m,'preview key'
s=s[:m.start()]+"key=km331HairKey(st.cls+(st.g==='f'?'_f':''),st.hair||0),im=spriteImages[key]||spriteImages[st.cls];"+s[m.end():]
# kayıt
rep(",gender:state.gender==='f'?'f':'m',heroName:state.heroName||''};",",gender:state.gender==='f'?'f':'m',heroName:state.heroName||'',hair:state.hair||0};")
rep("state.gender=old.gender==='f'?'f':'m';","state.gender=old.gender==='f'?'f':'m';state.hair=km325Num(old.hair,0,0,KM331_HAIR.length-1);")

# ---------- CSS
rep('<style id="km321-character-portrait">','''<style id="km331-reference-ui">
.playerPortrait{position:relative}
.km331lv{position:absolute;left:50%;bottom:-6px;transform:translateX(-50%);min-width:18px;height:16px;padding:0 4px;border-radius:9px;background:linear-gradient(180deg,#d6a24a,#8a5a1e);border:1px solid #ffe2a0;color:#fff7e0;font:900 10px/14px sans-serif;text-align:center;box-shadow:0 1px 2px #000a;pointer-events:none}
.km331gains{position:absolute;right:6px;top:42%;display:flex;flex-direction:column;gap:4px;align-items:flex-end;pointer-events:none;z-index:8}
.km331gain{display:flex;gap:6px;align-items:center;min-width:150px;padding:3px 10px 3px 8px;background:linear-gradient(90deg,#0b1424e8,#1b2a40e0);border:1px solid #b8955a;border-radius:6px 0 0 6px;color:#fff3d6;font:800 11px sans-serif;animation:km331in .25s ease-out,km331out .5s ease-in 2.6s forwards}
.km331gain i{font-style:normal;color:#ffd56a;width:16px;text-align:center}.km331gain b{color:#ffe9b0;margin-left:auto}
@keyframes km331in{from{transform:translateX(60px);opacity:0}to{transform:none;opacity:1}}@keyframes km331out{to{transform:translateX(30px);opacity:0}}
.km331equip{position:absolute;right:58px;bottom:calc(150px + env(safe-area-inset-bottom,0px));width:112px;padding:5px 6px;text-align:center;background:linear-gradient(180deg,#f3e6c8,#d8c39a);border:2px solid #8a6a3a;border-radius:9px;color:#2a1c10;z-index:9;box-shadow:0 3px 8px #000a}
.km331equip[hidden],.km331teaser[hidden]{display:none!important}
.km331equip b{display:block;font-size:11px}.km331equip .ic{font-size:20px;line-height:24px}.km331equip small{display:block;font-size:9px;color:#5a3a1a}
.km331equip button{width:100%;min-height:44px;margin-top:4px;border:2px solid #7a4a1e;border-radius:8px;background:linear-gradient(180deg,#e2a64e,#a8622a);color:#fff6e0;font-weight:900}
.km331equip .x{position:absolute;top:-16px;left:-16px;width:44px;height:44px;min-height:44px;margin:0;border-radius:50%;background:#3a2a1e;border:2px solid #c9a35a;font-size:14px;padding:0}
.km331teaser{position:absolute;left:4px;top:104px;max-width:150px;padding:3px 8px;border-radius:8px;background:#0c1626d9;border:1px solid #6a5634;color:#ffe2a0;font:800 10px/1.3 sans-serif;pointer-events:none;z-index:6}
.km331exp{position:absolute;left:0;right:0;bottom:0;height:3px;background:#0a1220;pointer-events:none;z-index:12}.km331exp span{display:block;height:100%;width:0;background:linear-gradient(90deg,#c98a2e,#ffe08a)}
.km331hair{display:flex;gap:6px;align-items:center;justify-content:center;flex-wrap:wrap;margin:2px 0 6px}.km331hair small{width:100%;font-size:10px;color:#cfe0ea}
.km331hair button{width:36px;height:36px;border-radius:50%;border:2px solid #4c6a86;color:#fff;font-size:14px;position:relative}.km331hair button::before{content:'';position:absolute;inset:-4px}.km331hair button.sel{border:3px solid #ffd58a;box-shadow:0 0 0 2px #5a3e1e}
.km331namerow{display:grid;grid-template-columns:1fr 48px;gap:6px;align-items:center}.km331namerow button{min-height:44px;border-radius:9px;border:2px solid #b8955a;background:#172a42;font-size:20px}
</style><style id="km321-character-portrait">''')

# ---------- İşlevler
rep("function km326KindHint(m){",r"""// ===== 3.31 REFERANS ARAYÜZ (Kung Fu Saga oyun içi ekran incelemesi; özgün uygulama) =====
const KM331_HAIR=[{n:'Sınıf rengi',c:null},{n:'Gece siyahı',c:'#1c1c28'},{n:'Kestane',c:'#7a4426'},{n:'Buğday',c:'#caa152'},{n:'Kızıl',c:'#b63a2c'},{n:'Gümüş',c:'#dfe6ee'},{n:'Ruh mavisi',c:'#3c6cc0'}];
const KM331_BASEHAIR={guardian:'#293142',scout:'#64372e',weaver:'#d9edf4',guardian_f:'#6a2c3a',scout_f:'#b2552c',weaver_f:'#2a2f5a'};
const KM331_NAMES=['Ayla','Doruk','Ece','Kaan','Nehir','Toprak','Ilgaz','Defne','Arda','Mira','Bora','Lale','Alaz','Yağmur'];
let km331BannerT=0,km331BannerText='',km331EquipTimer=null;
function km331HairKey(base,idx){if(!idx||!KM331_HAIR[idx]||!KM331_BASEHAIR[base])return base;const key=base+'_h'+idx;const ex=spriteImages[key];if(ex)return ex.complete&&ex.naturalWidth?key:base;
 const src=spriteImages[base];if(!src||!src.complete||!src.naturalWidth)return base;try{const c=document.createElement('canvas');c.width=src.naturalWidth;c.height=src.naturalHeight;const g=c.getContext('2d');g.drawImage(src,0,0);const d=g.getImageData(0,0,c.width,c.height),px=d.data;
  const hx=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)],a=hx(KM331_BASEHAIR[base]),b=hx(KM331_HAIR[idx].c);
  for(let i=0;i<px.length;i+=4)if(px[i+3]>0&&Math.abs(px[i]-a[0])<3&&Math.abs(px[i+1]-a[1])<3&&Math.abs(px[i+2]-a[2])<3){px[i]=b[0];px[i+1]=b[1];px[i+2]=b[2]}
  g.putImageData(d,0,0);const im=new Image();im.src=c.toDataURL('image/png');spriteImages[key]=im}catch(e){}return base}
function km331Gain(rows){const box=$('km331Gains');if(!box)return;for(const [ic,name,n] of rows){if(!n)continue;const r=document.createElement('div');r.className='km331gain';r.innerHTML=`<i>${ic}</i><span>${name}</span><b>×${n}</b>`;box.appendChild(r);setTimeout(()=>r.remove(),3200)}while(box.children.length>5)box.firstChild.remove()}
function km331Better(id){const d=itemdefs[id];if(!d||!d.slot)return false;const cur=itemdefs[state.equipment[d.slot]];return !cur||(d.atk*2+d.def*1.5)>(cur.atk*2+cur.def*1.5)}
function km331OfferEquip(id){if(!km331Better(id))return;const d=itemdefs[id],box=$('km331Equip');if(!box)return;let left=8;clearInterval(km331EquipTimer);
 const done=(equip)=>{clearInterval(km331EquipTimer);box.hidden=true;if(equip&&state.inv.includes(id)&&km331Better(id)){state.equipment[d.slot]=id;baseStats();syncUI();save();notify(d.name+' kuşanıldı');km331Gain([[d.icon,d.name+' kuşanıldı','✓']])}};
 const draw=()=>{box.innerHTML=`<button class="x" id="km331EqX" title="Kuşanma">✕</button><b>${d.name}</b><div class="ic">${d.icon}</div><small>+${d.atk} SAL • +${d.def} SAV</small><button id="km331EqGo">KUŞAN (${left})</button>`;$('km331EqGo').onclick=()=>done(true);$('km331EqX').onclick=()=>done(false)};
 box.hidden=false;draw();km331EquipTimer=setInterval(()=>{if(state.paused)return;left--;if(left<=0){done(true);return}const b=$('km331EqGo');if(b)b.textContent='KUŞAN ('+left+')'},1000)}
function km331Banner(t){km331BannerText=t;km331BannerT=performance.now()+1000}
function km331DrawBanner(){const now=performance.now();if(now>km331BannerT||!state.classId)return;const k=1-(km331BannerT-now)/1000,p=state.player,sc=Math.min(1,k*5);ctx.save();ctx.translate(p.x,p.y-150);ctx.scale(.6+.4*sc,.6+.4*sc);ctx.globalAlpha=k>.8?(1-k)*5:1;
 ctx.font='900 22px sans-serif';ctx.textAlign='center';ctx.lineWidth=6;ctx.strokeStyle='#3a1606';ctx.strokeText(km331BannerText,0,0);const gr=ctx.createLinearGradient(0,-18,0,4);gr.addColorStop(0,'#fff6c8');gr.addColorStop(1,'#ff9a2e');ctx.fillStyle=gr;ctx.fillText(km331BannerText,0,0);ctx.restore()}
function km331Sync(){km329Text('km331Lv',String(state.level));const e=$('km331Exp');if(e){const w=Math.round(state.xp/(state.level*95)*100)+'%';if(km329Cache.exp2!==w){km329Cache.exp2=w;e.firstChild.style.width=w}}
 const t=$('km331Teaser');if(!t)return;let txt='';if(state.level<2)txt='♞ Binek • Sv2’de açılır';else{const z=Object.keys(KM326_UNLOCK).find(z=>!km326Unlocked(z));if(z)txt='🔒 '+names[z]+' • '+(KM326_UNLOCK[z])+'. görev sonrası'}
 const bossOn=$('bossBar')&&!$('bossBar').hidden;if(!txt||bossOn){if(!t.hidden)t.hidden=true}else{km329Text('km331Teaser',txt);if(t.hidden)t.hidden=false}}
function km326KindHint(m){""")
rep("paused:state.paused,res:km328Res,","paused:state.paused,res:km328Res,hair:state.hair||0,equipCard:!!($('km331Equip')&&!$('km331Equip').hidden),")

open(dst,'w',encoding='utf-8').write(s)
print('OK',len(s))
