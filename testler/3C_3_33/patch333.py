# Kırık Mühür 3.33 — Aşama 3C/2: Beceri sistemi (3.32 üzerine)
# Seviyeyle açılan beceriler (kilitli yuva "Sv N"), 4. beceri, beceri seviyesi (1–10, altın+toz), beceri ekranı (tanım/etki),
# oto beceri sırası (aç/kapa, yukarı taşı). Kayıt alanları: skillLv, skillAuto. Eski kayıtlar varsayılanla açılır.
import sys,re
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding='utf-8').read()
def rep(old,new,count=1):
    global s
    n=s.count(old)
    if n!=count: raise SystemExit(f'EXPECTED {count} got {n}: {old[:100]!r}')
    s=s.replace(old,new)

rep('<title>Kırık Mühür 3.32 | 3C Ekipman TEST</title>','<title>Kırık Mühür 3.33 | 3C Beceri TEST</title>')
rep("savedAt:Date.now(),questSchema:332,","savedAt:Date.now(),questSchema:333,")
rep("saveVersion:'3.32'","saveVersion:'3.33'")

# ---------- durum + kayıt
rep("gear:{},gearSeq:0,enemies:[]","gear:{},gearSeq:0,skillLv:{s1:1,s2:1,heal:1,s3:1},skillAuto:['s3','s1','s2'],enemies:[]")
rep("state.gear={};state.gearSeq=0;","state.gear={};state.gearSeq=0;state.skillLv={s1:1,s2:1,heal:1,s3:1};state.skillAuto=['s3','s1','s2'];")
rep("gear:state.gear||{},gearSeq:state.gearSeq||0};","gear:state.gear||{},gearSeq:state.gearSeq||0,skillLv:state.skillLv,skillAuto:state.skillAuto};")
rep("km332Register(old.gear);","km332Register(old.gear);state.skillLv=km333SanLv(old.skillLv);state.skillAuto=km333SanAuto(old.skillAuto);")

# ---------- beceri gücü seviyeyle artar + kilit
rep("p.mp-=20;p.skillCd=5;p.attackAnim=.53;live.slice(0,state.classId==='guardian'?3:1).forEach(e=>deal(e,2.6));",
    "p.mp-=20;p.skillCd=5;p.attackAnim=.53;live.slice(0,state.classId==='guardian'?3:1).forEach(e=>deal(e,2.6*km333Mul('s1')));")
rep("function secondSkill(){const p=state.player;if(p.hp<=0||state.mode!=='game'||state.paused)return;",
    "function secondSkill(){const p=state.player;if(p.hp<=0||state.mode!=='game'||state.paused)return;if(!km333Open('s2')){notify(km333Def('s2').n+': Sv'+KM333_UNLOCK.s2+' gerekir');return}")
rep("nearby.slice(0,max).forEach(e=>deal(e,state.classId==='weaver'?2.1:1.8));","nearby.slice(0,max).forEach(e=>deal(e,(state.classId==='weaver'?2.1:1.8)*km333Mul('s2')));")
rep("let n=Math.round(p.maxHp*(state.classId==='weaver'?.4:.24));","let n=Math.round(p.maxHp*(state.classId==='weaver'?.4:.24)*km333Mul('heal'));")
rep("p.skill2Cd=Math.max(0,(p.skill2Cd||0)-dt);","p.skill2Cd=Math.max(0,(p.skill2Cd||0)-dt);p.skill3Cd=Math.max(0,(p.skill3Cd||0)-dt);")
# oto savaş: sıraya göre
rep("if(p.skillCd<=0&&p.mp>=20)skill();if(p.skill2Cd<=0&&p.mp>=18)secondSkill()","km333AutoCast()")
# HUD: 4. beceri yuvası (2×2 ızgaranın boş hücresi)
rep('<button class="ability" id="healBtn" title="Şifa becerisi">✚<span class="caption">ŞİFA</span></button>',
    '<button class="ability" id="healBtn" title="Şifa becerisi">✚<span class="caption">ŞİFA</span></button><button class="ability" id="skill3" title="Dördüncü beceri">✹<span class="caption">BECERİ 3</span></button>')
rep("$('healBtn').onclick=heal;","$('healBtn').onclick=heal;$('skill3').onclick=km333Skill3;")
rep("$('healBtn').classList.toggle('cool',p.healCd>.1);$('healBtn').dataset.cd=p.healCd>0?Math.ceil(p.healCd)+'s':'';",
    "$('healBtn').classList.toggle('cool',p.healCd>.1);$('healBtn').dataset.cd=p.healCd>0?Math.ceil(p.healCd)+'s':'';$('skill3').classList.toggle('cool',(p.skill3Cd||0)>.1);$('skill3').dataset.cd=p.skill3Cd>0?Math.ceil(p.skill3Cd)+'s':'';km333Locks();")
# seviye atlayınca açılan beceri duyurusu
rep("if(leveled){notify(`SEVİYE ${state.level}! Gücün arttı`);km329LevelFx()}","if(leveled){notify(`SEVİYE ${state.level}! Gücün arttı`);km329LevelFx();km333OnLevel()}")

# ---------- beceri ekranı (yeniden)
m=re.search(r"else if\(mode==='skills'\)\{.*?\$\('closeModal'\)\.onclick=closeModal\}\n(?=else if\(mode==='quests'\))",s,re.S)
assert m,'skills modal'
s=s[:m.start()]+"else if(mode==='skills'){km333Screen(body)}\n"+s[m.end():]

rep('<style id="km332-gear">','''<style id="km333-skills">
.ability.km333lock{filter:grayscale(1) brightness(.6)}
.ability.km333lock .caption{color:#ffe2a0;font-weight:900}
.km333list{display:grid;gap:6px;text-align:left}
.km333card{display:grid;grid-template-columns:44px 1fr;gap:7px;align-items:start;border:1px solid #4a6378;border-radius:9px;padding:6px;background:#12233a}
.km333card.lock{opacity:.62}.km333card.sel{border-color:#ffd58a;box-shadow:0 0 0 1px #ffd58a}
.km333ic{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-size:21px;background:radial-gradient(#3b5a72,#14243a);border:2px solid #b7955f}
.km333card b{font-size:13px;color:#ffe3a6}.km333card .d{font-size:11px;line-height:1.4;color:#dce7ef}.km333card .e{font-size:11px;color:#8fe7c4}
.km333row{display:flex;gap:6px;flex-wrap:wrap;margin-top:5px}.km333row button{min-height:44px;padding:0 10px;border-radius:8px;font-weight:900;font-size:11px}
.km333auto{display:flex;gap:5px;justify-content:center;flex-wrap:wrap;margin:6px 0}
.km333auto button{min-width:48px;min-height:48px;border-radius:50%;font-size:19px;position:relative;border:2px solid #b7955f;background:#1a2c42;color:#fff}
.km333auto button small{position:absolute;right:-2px;top:-4px;font-size:10px;background:#ffd56a;color:#2a1a00;border-radius:8px;padding:0 4px;font-weight:900}
.km333auto button.off{opacity:.45}
</style><style id="km332-gear">''')

rep("// ===== 3.32 EKİPMAN SİSTEMİ (3C) =====",r"""// ===== 3.33 BECERİ SİSTEMİ (3C) =====
const KM333_UNLOCK={s1:1,heal:1,s2:3,s3:8},KM333_MAX=10;let km333Sel='s1',km333Known=null;
const KM333_DEFS={
 guardian:{s1:{n:'Keskin Mühür',i:'✦',d:'Önündeki en fazla 3 düşmana mühürlü kılıç darbesi.'},s2:{n:'Mühür Savuruşu',i:'❖',d:'En yakın 2 düşmana geniş savuruş.'},heal:{n:'Şifa',i:'✚',d:'Canının bir kısmını yeniler.'},s3:{n:'Tapınak Çöküşü',i:'✹',d:'Yere mühür vurur; çevredeki en fazla 6 düşmana ağır hasar.'}},
 scout:{s1:{n:'Kül Oku',i:'✦',d:'Hedefe yoğun kül oku.'},s2:{n:'Kül Yağmuru',i:'❖',d:'En yakın 2 düşmana ok yağmuru.'},heal:{n:'Şifa',i:'✚',d:'Canının bir kısmını yeniler.'},s3:{n:'Kül Fırtınası',i:'✹',d:'Çevreye kül fırtınası; en fazla 6 düşmana ağır hasar.'}},
 weaver:{s1:{n:'Ruh Dalgası',i:'✦',d:'Hedefe ruh dalgası.'},s2:{n:'Ruh Çemberi',i:'❖',d:'En yakın 3 düşmana ruh çemberi.'},heal:{n:'Şifa',i:'✚',d:'Canının büyük kısmını yeniler (dokumacı).'},s3:{n:'Ruh Seli',i:'✹',d:'Ruh seli; çevredeki en fazla 6 düşmana ağır hasar.'}}};
const KM333_BASE={s1:{mp:20,cd:5,x:2.6},s2:{mp:18,cd:7,x:1.8},heal:{mp:15,cd:8,x:0},s3:{mp:30,cd:14,x:3.2}};
function km333Def(id){return (KM333_DEFS[state.classId]||KM333_DEFS.guardian)[id]}
function km333Open(id){return state.level>=KM333_UNLOCK[id]}
function km333Lv(id){return (state.skillLv&&state.skillLv[id])||1}
function km333Mul(id){const l=km333Lv(id);return id==='heal'?1+.08*(l-1):1+.1*(l-1)}
function km333SanLv(v){const o={s1:1,s2:1,heal:1,s3:1};if(v&&typeof v==='object')for(const k of Object.keys(o))o[k]=km325Num(v[k],1,1,KM333_MAX);return o}
function km333SanAuto(v){if(!Array.isArray(v))return ['s3','s1','s2'];const out=[];for(const k of v)if(['s1','s2','s3'].includes(k)&&!out.includes(k))out.push(k);return out}
function km333Cost(id){const l=km333Lv(id);return {gold:30*l,toz:l}}
function km333Up(id){if(!KM333_BASE[id])return false;if(!km333Open(id)){notify('Önce Sv'+KM333_UNLOCK[id]+' gerekir');return false}const l=km333Lv(id);if(l>=KM333_MAX){notify('Beceri en yüksek seviyede');return false}if(l>=state.level){notify('Beceri seviyesi karakter seviyesini geçemez (Sv'+state.level+')');return false}
 const c=km333Cost(id);if(state.coins<c.gold||state.materials<c.toz){notify('Altın veya ruh tozu yetersiz ('+c.gold+' altın, '+c.toz+' toz)');return false}state.coins-=c.gold;state.materials-=c.toz;state.skillLv[id]=l+1;notify(km333Def(id).n+' Sv'+(l+1));km331Banner(km333Def(id).n.toLocaleUpperCase('tr-TR')+' SV'+(l+1));syncUI();save();return true}
function km333Skill3(){const p=state.player;if(p.hp<=0||state.mode!=='game'||state.paused)return;if(!km333Open('s3')){notify(km333Def('s3').n+': Sv'+KM333_UNLOCK.s3+' gerekir');return}if((p.skill3Cd||0)>0){notify('Beceri beklemede');return}if(p.mp<30){notify('Ruh enerjisi yetersiz');return}
 const near=state.enemies.filter(e=>!e.dead&&dist(e,p)<p.attackRange+90).sort((a,b)=>dist(a,p)-dist(b,p));if(!near.length){notify('Beceri menzilinde hedef yok');return}
 p.mp-=30;p.skill3Cd=14;p.attackAnim=.6;near.slice(0,6).forEach(e=>deal(e,3.2*km333Mul('s3')));flash.push({x:p.x,y:p.y-20,t:.8,r:140,col:'#ffcf6a',kind:'nova'});flash.push({x:p.x,y:p.y-24,t:.6,r:80,col:'#ff7a4a',kind:'burst'});km330Screen=.18;state.camera.shake=.3;const n=km333Def('s3').n;notify(n+'!');km331Banner(n.toLocaleUpperCase('tr-TR'))}
function km333Ready(id){const p=state.player;if(!km333Open(id))return false;const b=KM333_BASE[id];const cd=id==='s1'?p.skillCd:id==='s2'?(p.skill2Cd||0):(p.skill3Cd||0);return cd<=0&&p.mp>=b.mp}
function km333AutoCast(){for(const id of state.skillAuto||[]){if(km333Ready(id)){if(id==='s1')skill();else if(id==='s2')secondSkill();else km333Skill3();return id}}return null}
function km333Locks(){for(const [id,el] of [['s2','skill2'],['s3','skill3']]){const b=$(el);if(!b)continue;const lk=!km333Open(id);b.classList.toggle('km333lock',lk);if(lk)b.dataset.lock='🔒Sv'+KM333_UNLOCK[id];else delete b.dataset.lock;const c=b.querySelector('.caption');if(c){if(!c.dataset.o)c.dataset.o=c.textContent;const t=lk?'🔒 SV'+KM333_UNLOCK[id]:c.dataset.o;if(c.textContent!==t)c.textContent=t}}}
function km333OnLevel(){for(const id of ['s2','s3'])if(state.level===KM333_UNLOCK[id]){const n=km333Def(id).n;notify('Yeni beceri açıldı: '+n);km331Banner('YENİ BECERİ: '+n.toLocaleUpperCase('tr-TR'))}}
function km333Effect(id,l){const b=KM333_BASE[id],m=id==='heal'?1+.08*(l-1):1+.1*(l-1);if(id==='heal')return 'Can yenileme %'+Math.round((state.classId==='weaver'?40:24)*m);const x=id==='s2'&&state.classId==='weaver'?2.1:b.x;return 'Hasar ×'+(x*m).toFixed(2)+' saldırı'}
function km333Screen(body){const p=state.player,ids=['s1','s2','heal','s3'];
 const card=id=>{const d=km333Def(id),b=KM333_BASE[id],l=km333Lv(id),op=km333Open(id),c=km333Cost(id);return `<div class="km333card${op?'':' lock'}${km333Sel===id?' sel':''}" data-sk="${id}"><div class="km333ic">${op?d.i:'🔒'}</div><div><b>${d.n} ${op?'• Sv'+l+'/'+KM333_MAX:'• '+KM333_UNLOCK[id]+'. Seviyede açılır'}</b><div class="d">${d.d} ${b.mp} ruh • ${b.cd} sn bekleme</div><div class="e">Etki: ${km333Effect(id,l)}${op&&l<KM333_MAX?' → Sv'+(l+1)+': '+km333Effect(id,l+1):''}</div>
  ${op?`<div class="km333row"><button class="primary" data-up="${id}" ${l>=KM333_MAX||l>=state.level?'disabled':''}>YÜKSELT (${c.gold}a+${c.toz}t)</button><button class="outlined" data-cast="${id}">KULLAN</button></div>`:''}</div></div>`};
 const auto=(state.skillAuto||[]).map((id,i)=>`<button data-auto="${id}" title="${km333Def(id).n}">${km333Def(id).i}<small>${i+1}</small></button>`).join('')+['s1','s2','s3'].filter(id=>!(state.skillAuto||[]).includes(id)).map(id=>`<button class="off" data-auto="${id}" title="${km333Def(id).n}">${km333Def(id).i}</button>`).join('');
 body.innerHTML=`<h1>✦ BECERİLER</h1><p class="sub">Sv ${state.level} • Ruh ${Math.floor(p.mp)}/${p.maxMp} • ${state.coins} altın • ${state.materials} toz</p><div class="km333list">${ids.map(card).join('')}</div>
 <p class="sub" style="margin-top:8px">OTO BECERİ SIRASI — oto savaşta soldan sağa denenir. Dokun: öne al • Uzun dokun: kapat/aç</p><div class="km333auto" id="km333Auto">${auto}</div><p class="note">Şifa oto savaşta canın %60 altına inince kullanılır. Beceri seviyesi karakter seviyesini geçemez.</p><button class="outlined" id="closeModal">Oyuna dön</button>`;
 const re=()=>km333Screen(body);
 body.querySelectorAll('[data-up]').forEach(b=>b.onclick=()=>{km333Up(b.dataset.up);re()});
 body.querySelectorAll('[data-cast]').forEach(b=>b.onclick=()=>{const id=b.dataset.cast;closeModal();if(id==='s1')skill();else if(id==='s2')secondSkill();else if(id==='heal')heal();else km333Skill3()});
 body.querySelectorAll('[data-sk]').forEach(c=>c.addEventListener('click',e=>{if(e.target.closest('button'))return;km333Sel=c.dataset.sk;re()}));
 body.querySelectorAll('[data-auto]').forEach(b=>{let t=0,long=false;b.addEventListener('pointerdown',()=>{long=false;t=setTimeout(()=>{long=true;km333AutoToggle(b.dataset.auto);re()},550)});b.addEventListener('pointerup',()=>clearTimeout(t));b.addEventListener('pointerleave',()=>clearTimeout(t));b.onclick=()=>{if(long)return;km333AutoFront(b.dataset.auto);re()}});
 $('closeModal').onclick=closeModal}
function km333AutoFront(id){const a=(state.skillAuto||[]).filter(x=>x!==id);a.unshift(id);state.skillAuto=a;save()}
function km333AutoToggle(id){const a=state.skillAuto||[];state.skillAuto=a.includes(id)?a.filter(x=>x!==id):[...a,id];save()}
// ===== 3.32 EKİPMAN SİSTEMİ (3C) =====""")

rep("bagCount:km332Count(),","bagCount:km332Count(),skillLv:{...state.skillLv},skillAuto:[...(state.skillAuto||[])],skill3Cd:state.player.skill3Cd||0,")
rep("setFlowerMenuPage,gearMake:","setFlowerMenuPage,skill3:()=>km333Skill3(),skillUp:id=>km333Up(id),skillFront:id=>km333AutoFront(id),skillToggle:id=>km333AutoToggle(id),autoCast:()=>km333AutoCast(),skillMul:id=>km333Mul(id),gearMake:")
open(dst,'w',encoding='utf-8').write(s);print('OK',len(s))
