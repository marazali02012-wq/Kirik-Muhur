# Kırık Mühür 3.32 — Aşama 3C/1: Ekipman sistemi (3.31 üzerine)
# Nadirlik (5), aşama (tier), seviye şartı, 6 yuva, yaratık/boss düşüşü, kapasiteli ızgara çanta, Düzenle, Yut (eritme),
# eşya başına güçlendirme (+1…+10), "↑ daha iyi" oku. Mevcut eşyalar, kayıtlar ve görev ödülleri korunur.
import sys,re
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding='utf-8').read()
def rep(old,new,count=1):
    global s
    n=s.count(old)
    if n!=count: raise SystemExit(f'EXPECTED {count} got {n}: {old[:100]!r}')
    s=s.replace(old,new)

rep('<title>Kırık Mühür 3.31 | Referans Arayüz TEST</title>','<title>Kırık Mühür 3.32 | 3C Ekipman TEST</title>')
rep("savedAt:Date.now(),questSchema:331,","savedAt:Date.now(),questSchema:332,")
rep("saveVersion:'3.31'","saveVersion:'3.32'")

# ---------- 6 yuva (kask, eldiven eklendi)
rep("equipment:{weapon:null,armor:null,talisman:null,boots:null},enemies:[]","equipment:{weapon:null,helm:null,armor:null,gloves:null,boots:null,talisman:null},gear:{},gearSeq:0,enemies:[]")
rep("state.equipment={weapon:state.inv[0],armor:null,talisman:null,boots:null};","state.equipment={weapon:state.inv[0],helm:null,armor:null,gloves:null,boots:null,talisman:null};state.gear={};state.gearSeq=0;")
rep("const eq={weapon:null,armor:null,talisman:null,boots:null};","const eq={weapon:null,helm:null,armor:null,gloves:null,boots:null,talisman:null};")

# ---------- Kayıt: üretilen eşya tanımları
rep(",gender:state.gender==='f'?'f':'m',heroName:state.heroName||'',hair:state.hair||0};",",gender:state.gender==='f'?'f':'m',heroName:state.heroName||'',hair:state.hair||0,gear:state.gear||{},gearSeq:state.gearSeq||0};")
rep("const km325S=km325Sanitize(old);old=km325S.o;","state.gear={};state.gearSeq=km325Num(old.gearSeq,0,0,1e9);km332Register(old.gear);const km325S=km325Sanitize(old);old=km325S.o;")

# ---------- Düşüş: yaratık %10, boss %100 (en az Destansı); yerden toplama
rep("state.drops.push({id:e.id+'drop',x:e.x,y:e.y,type:km325Relic?'relic':'coins',taken:false});",
    "state.drops.push({id:e.id+'drop',x:e.x,y:e.y,type:km325Relic?'relic':'coins',taken:false});km332Loot(e);")
rep("function pickDrop(d){if(d.taken)return;d.taken=true;if(d.type==='relic'&&!state.inv.includes('relic'))addItem('relic');",
    "function pickDrop(d){if(d.taken)return;d.taken=true;if(d.type==='gear'){km332Pick(d);state.drops=state.drops.filter(x=>!x.taken);save();return}if(d.type==='relic'&&!state.inv.includes('relic'))addItem('relic');")
rep("for(let d of state.drops){ctx.fillStyle=d.type==='relic'?'#e5bc67':'#80e3c9';",
    "for(let d of state.drops){if(d.type==='gear'){ctx.save();ctx.globalAlpha=.35+.25*Math.sin(performance.now()/200);ctx.fillStyle=KM332_RAR[d.rar].c;ctx.beginPath();ctx.ellipse(d.x,d.y-2,16,6,0,0,Math.PI*2);ctx.fill();ctx.restore()}ctx.fillStyle=d.type==='gear'?KM332_RAR[d.rar].c:d.type==='relic'?'#e5bc67':'#80e3c9';")

# ---------- Kuşanma önerisi seviye şartını dikkate alır
rep("function km331Better(id){const d=itemdefs[id];if(!d||!d.slot)return false;","function km331Better(id){const d=itemdefs[id];if(!d||!d.slot)return false;if(d.req&&state.level<d.req)return false;")

# ---------- Çanta ekranı (yeniden)
m=re.search(r"if\(mode==='inventory'\)\{body\.innerHTML=.*?\$\('closeModal'\)\.onclick=closeModal\}\n(?=else if\(mode==='character'\))",s,re.S)
assert m,'inventory modal'
s=s[:m.start()]+"if(mode==='inventory'){km332Bag(body)}\n"+s[m.end():]

# ---------- CSS
rep('<style id="km321-character-portrait">','''<style id="km332-gear">
.km332top{display:grid;grid-template-columns:52px 1fr 52px;gap:6px;align-items:center;margin:4px 0 6px}
.km332col{display:grid;gap:5px}
.km332slot,.km332cell{position:relative;width:46px;height:46px;min-height:46px;border-radius:8px;border:2px solid #4c6a86;background:linear-gradient(160deg,#22384e,#101c2c);color:#fff;font-size:20px;padding:0;display:grid;place-items:center}
.km332slot small,.km332cell small{position:absolute;left:2px;bottom:1px;font-size:8px;line-height:9px;color:#ffe9b0;font-weight:800}
.km332slot.empty{opacity:.55;font-size:10px;color:#9fb3c6}
.km332cell .up{position:absolute;right:1px;bottom:0;color:#5ef07a;font-size:13px;line-height:13px;text-shadow:0 1px 0 #000}
.km332cell .eq{position:absolute;left:2px;top:0;color:#9fe6ff;font-size:10px}
.km332cell .en,.km332slot .en{position:absolute;right:2px;top:1px;font-size:9px;color:#ffd56a;font-weight:900}
.km332cell.sel{box-shadow:0 0 0 2px #ffd58a}
.km332hero{display:grid;place-items:center}.km332hero canvas{width:96px;height:120px;image-rendering:pixelated}
.km332hero b{font-size:12px;color:#ffd56a}
.km332grid{display:grid;grid-template-columns:repeat(auto-fill,46px);gap:5px;justify-content:center;max-height:150px;overflow-y:auto;padding:4px;border:1px solid #3a5068;border-radius:8px;background:#0b1624}
.km332foot{display:flex;gap:6px;align-items:center;justify-content:space-between;margin:6px 0;font-size:11px;color:#cfe0ea}
.km332foot button,.km332act button{min-height:44px;padding:0 10px;border-radius:8px;font-weight:900}
.km332detail{border:1px solid #6a7f92;border-radius:9px;padding:7px 8px;background:#14263a;text-align:left;font-size:11px;margin:4px 0}
.km332detail h3{margin:0 0 3px;font-size:14px}.km332detail .d{font-size:11px;line-height:1.45;color:#e4ecf2}.km332pos{color:#6fe08a}.km332neg{color:#ff8a8a}
.km332act{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}
</style><style id="km321-character-portrait">''')

# ---------- İşlevler
rep("function km326KindHint(m){",r"""// ===== 3.32 EKİPMAN SİSTEMİ (3C) =====
const KM332_RAR=[null,{n:'Sıradan',c:'#c9ced6',m:1},{n:'Nadir',c:'#6fdc7a',m:1.35},{n:'Destansı',c:'#6aa8ff',m:1.75},{n:'Efsanevi',c:'#c38aff',m:2.3},{n:'Kadim',c:'#ffb84a',m:3}];
const KM332_SLOTS={weapon:{n:'Silah',w:[1,0]},helm:{n:'Kask',w:[0,.6]},armor:{n:'Zırh',w:[0,1]},gloves:{n:'Eldiven',w:[.45,.2]},boots:{n:'Çizme',w:[.15,.5]},talisman:{n:'Tılsım',w:[.6,.3]}};
const KM332_SLOT_ORDER=['weapon','helm','armor','gloves','boots','talisman'];
const KM332_ICON={helm:'⛑',armor:'▣',gloves:'✋',boots:'♧',talisman:'❖'},KM332_WPN={guardian:['⚔','Kılıç'],scout:['➶','Yay'],weaver:['✦','Asa']};
const KM332_NOUN={helm:'Miğfer',armor:'Zırh',gloves:'Eldiven',boots:'Çizme',talisman:'Tılsım'},KM332_TIER=[null,'Çırak','Mühürlü','Kül Dövme','Kadim'];
const KM332_CAP=40,KM332_MAXEN=10;let km332Sel=null;
function km332Apply(d){const k=1+.08*(d.ench||0);d.atk=d.batk?Math.round(d.batk*k)+(d.ench||0):0;d.def=d.bdef?Math.round(d.bdef*k)+(d.ench||0):0}
function km332Make(slot,tier,rar){tier=km325Num(tier,1,1,4);rar=km325Num(rar,1,1,5);const base=(tier*6+2)*KM332_RAR[rar].m,w=KM332_SLOTS[slot].w,wp=KM332_WPN[state.classId]||['⚔','Kılıç'];
 const uid='g'+(++state.gearSeq);const d={name:KM332_TIER[tier]+' '+(slot==='weapon'?wp[1]:KM332_NOUN[slot]),slot,icon:slot==='weapon'?wp[0]:KM332_ICON[slot],rarity:rar,tier,req:Math.max(1,tier*5-4),ench:0,batk:Math.round(base*w[0]),bdef:Math.round(base*w[1]),gen:true};
 km332Apply(d);state.gear[uid]=d;itemdefs[uid]=d;return uid}
function km332Register(g){if(!g||typeof g!=='object')return;for(const [uid,v] of Object.entries(g)){if(!/^g\d+$/.test(uid)||!v||!KM332_SLOTS[v.slot])continue;const d={name:String(v.name||'Eşya').replace(/[<>&"']/g,'').slice(0,24),slot:v.slot,icon:String(v.icon||'◆').slice(0,2),rarity:km325Num(v.rarity,1,1,5),tier:km325Num(v.tier,1,1,4),req:km325Num(v.req,1,1,99),ench:km325Num(v.ench,0,0,KM332_MAXEN),batk:km325Num(v.batk,0,0,9999),bdef:km325Num(v.bdef,0,0,9999),gen:true};if(v.orig&&itemdefs[v.orig])d.orig=v.orig;km332Apply(d);state.gear[uid]=d;itemdefs[uid]=d}}
function km332Roll(min){const r=Math.random();const v=r<.6?1:r<.88?2:r<.97?3:r<.995?4:5;return Math.max(min,v)}
function km332Loot(e){const c=KM326_CREATURES[e.type]||{};const zt={village:1,forest:1,arena:2,ashpass:3}[state.zone]||1;if(!c.boss&&Math.random()>.1)return;
 const slot=KM332_SLOT_ORDER[Math.floor(Math.random()*6)];state.drops.push({id:e.id+'g'+Date.now(),x:e.x+16,y:e.y+8,type:'gear',slot,tier:Math.min(4,zt+(c.boss?1:0)),rar:km332Roll(c.boss?3:1),taken:false})}
function km332Count(){return state.inv.filter(id=>itemdefs[id]&&itemdefs[id].slot).length}
function km332Value(d){const r=d.rarity||1,t=d.tier||1;return {toz:r*t,gold:5*r*t+(d.ench||0)*10}}
function km332Pick(d){if(km332Count()>=KM332_CAP){const v=km332Value({rarity:d.rar,tier:d.tier});state.materials+=v.toz;state.coins+=v.gold;notify('Çanta dolu: eşya eritildi (+'+v.toz+' toz, +'+v.gold+' altın)');km331Gain([['❖','Ruh tozu',v.toz],['◆','Altın',v.gold]]);return}
 const uid=km332Make(d.slot,d.tier,d.rar);addItem(uid);if(d.rar>=3)notify(KM332_RAR[d.rar].n+' eşya: '+itemdefs[uid].name)}
function km332Equipped(id){return Object.values(state.equipment).includes(id)}
function km332Equip(id){const d=itemdefs[id];if(!d||!d.slot)return false;if(d.req&&state.level<d.req){notify('Seviye '+d.req+' gerekir');return false}state.equipment[d.slot]=state.equipment[d.slot]===id?null:id;baseStats();syncUI();save();return true}
function km332Clone(id){const d=itemdefs[id];if(!d||d.gen)return id;const uid='g'+(++state.gearSeq);const n={name:d.name,slot:d.slot,icon:d.icon,rarity:d.rarity||1,tier:1,req:1,ench:0,batk:d.atk,bdef:d.def,gen:true,orig:id};km332Apply(n);state.gear[uid]=n;itemdefs[uid]=n;
 const i=state.inv.indexOf(id);if(i>=0)state.inv[i]=uid;for(const k of Object.keys(state.equipment))if(state.equipment[k]===id)state.equipment[k]=uid;return uid}
function km332Cost(d){const t=d.tier||1,e=d.ench||0;return {gold:20*(e+1)*t,toz:1+e}}
function km332Enhance(id){let d=itemdefs[id];if(!d||!d.slot)return null;if((d.ench||0)>=KM332_MAXEN){notify('En yüksek güçlendirme (+'+KM332_MAXEN+')');return null}const c=km332Cost(d);if(state.coins<c.gold||state.materials<c.toz){notify('Altın veya ruh tozu yetersiz ('+c.gold+' altın, '+c.toz+' toz)');return null}
 const uid=km332Clone(id);d=itemdefs[uid];state.coins-=c.gold;state.materials-=c.toz;d.ench=(d.ench||0)+1;km332Apply(d);baseStats();km324OnEquipmentEnhance();notify(d.name+' +'+d.ench+' güçlendirildi');save();return uid}
function km332Smelt(id){const d=itemdefs[id];if(!d||!d.slot||km332Equipped(id))return false;const v=km332Value(d);const i=state.inv.indexOf(id);if(i<0)return false;state.inv.splice(i,1);if(state.gear[id]){delete state.gear[id]}state.materials+=v.toz;state.coins+=v.gold;km331Gain([['❖','Ruh tozu',v.toz],['◆','Altın',v.gold]]);save();return true}
function km332SmeltLow(){let n=0;for(const id of [...state.inv]){const d=itemdefs[id];if(d&&d.gen&&!d.orig&&(d.rarity||1)<=2&&!km332Equipped(id)&&!(state.equipment[d.slot]&&km331Better(id))&&km332Smelt(id))n++}notify(n?n+' eşya eritildi':'Eritilecek Sıradan/Nadir eşya yok');return n}
function km332Sort(){const rank=id=>{const d=itemdefs[id]||{};return [d.slot?KM332_SLOT_ORDER.indexOf(d.slot):9,-(d.rarity||0),-(d.tier||0),-(d.ench||0)]};state.inv.sort((a,b)=>{const x=rank(a),y=rank(b);for(let i=0;i<4;i++)if(x[i]!==y[i])return x[i]-y[i];return 0});save()}
function km332Bag(body){const p=state.player,cnt=km332Count();const slotBtn=k=>{const id=state.equipment[k],d=itemdefs[id];return d?`<button class="km332slot" data-slot="${k}" style="border-color:${KM332_RAR[d.rarity||1].c}">${d.icon}${d.ench?`<span class="en">+${d.ench}</span>`:''}<small>${KM332_SLOTS[k].n}</small></button>`:`<button class="km332slot empty" data-slot="${k}">${KM332_SLOTS[k].n}</button>`};
 const cells=state.inv.map((id,i)=>{const d=itemdefs[id];if(!d)return '';const col=d.slot?KM332_RAR[d.rarity||1].c:'#e5bc67';return `<button class="km332cell${km332Sel===id?' sel':''}" data-item="${i}" style="border-color:${col}" title="${d.name}">${d.icon}${km332Equipped(id)?'<span class="eq">✓</span>':''}${d.ench?`<span class="en">+${d.ench}</span>`:''}${d.slot&&d.tier?`<small>${d.tier}.Aş</small>`:''}${d.slot&&!km332Equipped(id)&&km331Better(id)?'<b class="up">↑</b>':''}</button>`}).join('');
 const w=itemdefs[state.equipment.weapon],wc=w?km332Cost(w):null;
 body.innerHTML=`<h1>✦ ÇANTA</h1><p class="sub">Sv ${state.level} • ${state.heroName||classes[state.classId].name} • GÜÇ ${km324Power()} • ${state.coins} altın • ${state.materials} toz</p>
 <div class="km332top"><div class="km332col">${['weapon','helm','armor'].map(slotBtn).join('')}</div><div class="km332hero"><canvas id="km332Hero" width="96" height="120"></canvas><b>SAL ${p.attack} • SAV ${p.def} • CAN ${p.maxHp}</b></div><div class="km332col">${['gloves','boots','talisman'].map(slotBtn).join('')}</div></div>
 <div class="km332grid">${cells}</div><div class="km332foot"><span>Kapasite ${cnt}/${KM332_CAP}</span><button class="outlined" id="km332Sort">DÜZENLE</button><button class="outlined" id="km332Smelt">TOPLU YUT</button></div>
 <div id="km332Detail"></div><div class="km332act"><button class="primary" id="upgradeBtn" ${w?'':'disabled'}>⚒ SİLAHI GÜÇLENDİR${wc?` (${wc.gold} altın + ${wc.toz} toz)`:''}</button><button class="outlined" id="closeModal">Oyuna dön</button></div>`;
 const hc=$('km332Hero').getContext('2d'),im=spriteImages[km329Key()];hc.imageSmoothingEnabled=false;if(im&&im.complete&&im.naturalWidth)hc.drawImage(im,0,0,64,80,0,0,96,120);
 const re=()=>km332Bag(body);
 body.querySelectorAll('[data-item]').forEach(b=>b.onclick=()=>{km332Sel=state.inv[+b.dataset.item];re()});
 body.querySelectorAll('[data-slot]').forEach(b=>b.onclick=()=>{const id=state.equipment[b.dataset.slot];if(id){km332Sel=id;re()}});
 $('km332Sort').onclick=()=>{km332Sort();re()};$('km332Smelt').onclick=()=>{km332SmeltLow();re()};
 $('upgradeBtn').onclick=()=>{if(state.equipment.weapon){km332Sel=km332Enhance(state.equipment.weapon)||km332Sel;re()}};$('closeModal').onclick=closeModal;
 if(km332Sel&&itemdefs[km332Sel]&&state.inv.includes(km332Sel))km332ShowDetail(km332Sel,body,re)}
function km332ShowDetail(id,body,re){const d=itemdefs[id],box=$('km332Detail');if(!box)return;const i=state.inv.indexOf(id);
 if(!d.slot){box.innerHTML=`<div class="km332detail"><h3 style="color:#e5bc67">${d.icon} ${d.name}</h3><div class="d">Görev eşyası. Kuşanılmaz, eritilmez.</div></div>`;return}
 const cur=itemdefs[state.equipment[d.slot]],eq=km332Equipped(id),dA=d.atk-(cur&&!eq?cur.atk:eq?d.atk:0),dD=d.def-(cur&&!eq?cur.def:eq?d.def:0);const sg=v=>v>0?`<span class="km332pos">+${v}</span>`:v<0?`<span class="km332neg">${v}</span>`:'±0';
 const c=km332Cost(d),v=km332Value(d),r=KM332_RAR[d.rarity||1];
 box.innerHTML=`<div class="km332detail"><h3 style="color:${r.c}">${d.icon} ${d.name}${d.ench?' +'+d.ench:''}</h3><div class="d">${r.n} • ${KM332_SLOTS[d.slot].n} • ${d.tier||1}. Aşama • Seviye ${d.req||1}${d.req&&state.level<d.req?' <span class="km332neg">(yetersiz)</span>':''}<br>SAL ${d.atk} ${eq?'':'('+sg(dA)+')'} • SAV ${d.def} ${eq?'':'('+sg(dD)+')'}</div>
 <div class="km332act"><button class="primary" data-equip="${i}">${eq?'ÇIKAR':'KUŞAN'}</button><button class="outlined" id="km332En" ${(d.ench||0)>=KM332_MAXEN?'disabled':''}>GÜÇLENDİR (${c.gold}a+${c.toz}t)</button><button class="outlined" id="km332Yut" ${eq?'disabled':''}>YUT (+${v.toz}t +${v.gold}a)</button></div></div>`;
 box.querySelector('[data-equip]').onclick=()=>{km332Equip(id);re()};$('km332En').onclick=()=>{km332Sel=km332Enhance(id)||id;re()};$('km332Yut').onclick=()=>{if(km332Smelt(id)){km332Sel=null;re()}}}
function km326KindHint(m){""")
rep("paused:state.paused,res:km328Res,","paused:state.paused,res:km328Res,equipment:{...state.equipment},gearCount:Object.keys(state.gear||{}).length,bagCount:km332Count(),")
rep("setFlowerMenuPage,transit:","setFlowerMenuPage,gearMake:(slot,t,r)=>{const u=km332Make(slot,t,r);addItem(u);return u},gearEnhance:id=>km332Enhance(id),gearSmelt:id=>km332Smelt(id),gearSmeltLow:()=>km332SmeltLow(),gearEquip:id=>km332Equip(id),gearSort:()=>km332Sort(),gearDef:id=>itemdefs[id]?{...itemdefs[id]}:null,lootFrom:id=>{const e=state.enemies.find(x=>x.id===id);if(e)km332Loot(e);return state.drops.filter(d=>d.type==='gear').length},transit:")

open(dst,'w',encoding='utf-8').write(s)
print('OK',len(s))
