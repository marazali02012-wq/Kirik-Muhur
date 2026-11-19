# Kırık Mühür 3.34 — Aşama 3C/3: Zorluk dengesi, seviye atlama gösterisi (gerçek stat farkı), sadık/binek seviyeleri,
# önerilen güç. 3.33 üzerine. Kayıt alanları: petLv, mountLv. Eski kayıtlar Sv1 ile açılır.
import sys,re
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding='utf-8').read()
def rep(old,new,count=1):
    global s
    n=s.count(old)
    if n!=count: raise SystemExit(f'EXPECTED {count} got {n}: {old[:100]!r}')
    s=s.replace(old,new)

rep('<title>Kırık Mühür 3.33 | 3C Beceri TEST</title>','<title>Kırık Mühür 3.34 | 3C Denge TEST</title>')
rep("savedAt:Date.now(),questSchema:333,","savedAt:Date.now(),questSchema:334,")
rep("saveVersion:'3.33'","saveVersion:'3.34'")

# ---------- durum + kayıt
rep("skillAuto:['s3','s1','s2'],enemies:[]","skillAuto:['s3','s1','s2'],petLv:1,mountLv:1,enemies:[]")
rep("state.skillAuto=['s3','s1','s2'];","state.skillAuto=['s3','s1','s2'];state.petLv=1;state.mountLv=1;")
rep("skillLv:state.skillLv,skillAuto:state.skillAuto};","skillLv:state.skillLv,skillAuto:state.skillAuto,petLv:state.petLv||1,mountLv:state.mountLv||1};")
rep("state.skillAuto=km333SanAuto(old.skillAuto);","state.skillAuto=km333SanAuto(old.skillAuto);state.petLv=km325Num(old.petLv,1,1,KM334_CMAX);state.mountLv=km325Num(old.mountLv,1,1,KM334_CMAX);")

# ---------- zorluk ölçeği (veri)
rep("const n=state.missionIndex>=2?Math.min(7,state.missionIndex-1):0","const n=state.missionIndex>=2?Math.min(KM334_D.kMax,state.missionIndex-1):0")
rep("hp:sp.hp+k*12,maxHp:sp.hp+k*12,attack:sp.atk+k,def:sp.def+k,","hp:km334Hp(sp,c,k),maxHp:km334Hp(sp,c,k),attack:km334Atk(sp,c,k),def:Math.round(sp.def+k*KM334_D.defK),")

# ---------- binek / sadık
rep("p.speed=c.speed*(state.mount?1.55:1);","p.speed=c.speed*(state.mount?km334MountMul():1);p.maxHp+=km334MountHp(c);")
rep("petTimer=3.4;let n=4+state.level*2;","petTimer=km334PetCd();let n=km334PetDmg();")
rep("const petDmg=4+state.level*2;","const petDmg=km334PetDmg();")
rep("Yakındaki düşmana her 3,4 sn’de ${petDmg} hasar verir.","<em class=\"km334lv\">Sv${state.petLv||1}/${KM334_CMAX}</em> Yakındaki düşmana her ${km334PetCd().toFixed(1).replace('.',',')} sn’de ${petDmg} hasar verir.")
rep("'Hareket hızını %55 artırır (şu an '+Math.round(p.speed)+').'","'<em class=\"km334lv\">Sv'+(state.mountLv||1)+'/'+KM334_CMAX+'</em> Hareket hızı +%'+Math.round((km334MountMul()-1)*100)+' (şu an '+Math.round(p.speed)+'), kalıcı can +'+km334MountHp(classes[state.classId])+'.'")
rep(" </div><button class=\"outlined\" id=\"closeModal\">Oyuna dön</button>`;\n const pc=$('km329Pet')",
    " </div><div class=\"km334up\"><button class=\"primary\" id=\"km334PetUp\" ${km334CanUp('pet')?'':'disabled'}>TİLKİ SV+ (${km334Cost('pet').gold}a+${km334Cost('pet').toz}t)</button><button class=\"primary\" id=\"km334MountUp\" ${km334CanUp('mount')?'':'disabled'}>GEYİK SV+ (${km334Cost('mount').gold}a+${km334Cost('mount').toz}t)</button></div><p class=\"note\">Yoldaş ve binek seviyesi karakter seviyesini geçemez.</p><button class=\"outlined\" id=\"closeModal\">Oyuna dön</button>`;\n const pc=$('km329Pet')")
rep("$('km329AutoT').onclick=()=>{$('autoPath').click();re()};","$('km329AutoT').onclick=()=>{$('autoPath').click();re()};$('km334PetUp').onclick=()=>{km334PetUp('pet');re()};$('km334MountUp').onclick=()=>{km334PetUp('mount');re()};")

# ---------- seviye atlama gösterisi
rep("function earnXP(n){state.xp+=n;let leveled=false;","function earnXP(n){state.xp+=n;let leveled=false;const km334B=state.classId?{hp:state.player.maxHp,atk:state.player.attack,def:state.player.def,mp:state.player.maxMp,pw:km324Power(),lv:state.level}:null;")
rep("km329LevelFx();km333OnLevel()}","km329LevelFx();km333OnLevel();if(km334B)km334LevelShow(km334B)}")

# ---------- önerilen güç (görev ekranı ve görev paneli)
rep("<small>İlerleme: ${Math.min(m.count,state.missionKills)}/${m.count}</small>","<small>İlerleme: ${Math.min(m.count,state.missionKills)}/${m.count}</small>${km334RecHtml()}")

rep('<style id="km333-skills">','''<style id="km334-balance">
#km334Lv{position:fixed;left:0;right:0;top:17%;padding:0 12px;z-index:60;pointer-events:none;display:grid;justify-items:center;gap:4px;text-align:center;opacity:0;transition:opacity .25s}
#km334Lv.on{opacity:1}
#km334Lv .pillar{position:absolute;top:-40%;width:120px;height:190%;background:linear-gradient(90deg,transparent,rgba(255,226,140,.38),transparent);filter:blur(2px);animation:km334p 2.4s ease-out}
#km334Lv h2{position:relative;margin:0;font-size:clamp(22px,7.5vw,32px);letter-spacing:1px;white-space:nowrap;color:#ffe48a;text-shadow:0 0 12px #ffb340,0 3px 0 #6b3d00;animation:km334z .5s ease-out}
#km334Lv .lv{position:relative;font-size:18px;font-weight:900;color:#fff4d0;text-shadow:0 2px 0 #000}
#km334Lv .st{position:relative;font-size:clamp(12px,3.8vw,15px);font-weight:900;color:#8dffb8;text-shadow:0 2px 0 #000}
#km334Lv .pw{position:relative;font-size:17px;font-weight:900;color:#ff9a5c;text-shadow:0 0 8px #ff5a1f,0 2px 0 #000}
#km334Lv .nx{position:relative;font-size:12px;color:#ffd0c0;text-shadow:0 1px 0 #000}
@keyframes km334z{from{transform:scale(1.35);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes km334p{from{opacity:0;transform:scaleY(.2)}30%{opacity:1}to{opacity:.6;transform:scaleY(1)}}
.km334up{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-top:6px}.km334up button{min-height:44px;padding:0 10px;border-radius:8px;font-weight:900;font-size:11px}
.km334lv{font-style:normal;color:#ffd56a;font-weight:900;margin-right:4px}
.km334rec{color:#8fe7c4}.km334rec.low{color:#ff8a7a}
</style><style id="km333-skills">''')

rep("// ===== 3.33 BECERİ SİSTEMİ (3C) =====",r"""// ===== 3.34 DENGE (3C) =====
// Zorluk ölçeği: k = görev sırası (en fazla kMax). Hikâye bossları sabit (k=0) ama kendi çarpanlarıyla güçlendirildi.
// Değerler testler/3C_3_34/denge_sim.js ile 3 sınıf × (pasif/aktif oyuncu) × 26 görev simülasyonuyla seçildi.
const KM334_D={kMax:12,hpK:14,atkK:.8,defK:.7,mobAtk:1.1,boss:{boss:{hp:2.2,atk:1.75},ashlord:{hp:1.15,atk:1}}};
const KM334_CMAX=10;
function km334Hp(sp,c,k){const b=(KM334_D.boss[sp.type]||{}).hp||1;return Math.round((sp.hp+k*KM334_D.hpK)*b)}
function km334Atk(sp,c,k){const b=(KM334_D.boss[sp.type]||{}).atk||(c.boss?1:KM334_D.mobAtk);return Math.round((sp.atk+k*KM334_D.atkK)*b)}
function km334PetDmg(){return Math.round((4+state.level*2)*(1+.15*((state.petLv||1)-1)))}
function km334PetCd(){return Math.max(2.3,3.4-.12*((state.petLv||1)-1))}
function km334MountMul(){return 1.55+.03*((state.mountLv||1)-1)}
function km334MountHp(c){return Math.round((c?c.hp:150)*.02*((state.mountLv||1)-1))}
function km334Cost(kind){const l=kind==='pet'?(state.petLv||1):(state.mountLv||1);return {gold:40*l,toz:2*l}}
function km334CanUp(kind){const l=kind==='pet'?(state.petLv||1):(state.mountLv||1),c=km334Cost(kind);if(kind==='mount'&&state.level<2)return false;return l<KM334_CMAX&&l<state.level&&state.coins>=c.gold&&state.materials>=c.toz}
function km334PetUp(kind){const key=kind==='pet'?'petLv':'mountLv',l=state[key]||1,c=km334Cost(kind),nm=kind==='pet'?'Ruh Tilkisi':'Ay Işığı Geyiği';
 if(kind==='mount'&&state.level<2){notify('Binek Sv2’de açılır');return false}if(l>=KM334_CMAX){notify(nm+' en yüksek seviyede');return false}if(l>=state.level){notify(nm+' seviyesi karakter seviyesini geçemez');return false}
 if(state.coins<c.gold||state.materials<c.toz){notify('Altın veya ruh tozu yetersiz ('+c.gold+' altın, '+c.toz+' toz)');return false}
 state.coins-=c.gold;state.materials-=c.toz;state[key]=l+1;baseStats();notify(nm+' Sv'+(l+1));km331Banner(nm.toLocaleUpperCase('tr-TR')+' SV'+(l+1));syncUI();save();return true}
let km334LvTimer=null;
function km334LevelShow(b){const p=state.player,el=$('km334Lv')||Object.assign(document.createElement('div'),{id:'km334Lv'});if(!el.parentNode)document.body.appendChild(el);
 const d={hp:p.maxHp-b.hp,atk:p.attack-b.atk,def:p.def-b.def,mp:p.maxMp-b.mp,pw:km324Power()-b.pw};const unlock=['s2','s3'].find(id=>state.level===KM333_UNLOCK[id]);
 const nxt=['s2','s3'].map(id=>KM333_UNLOCK[id]).find(l=>l>state.level);
 el.innerHTML=`<div class="pillar"></div><h2>SEVİYE ATLADIN</h2><div class="lv">Sv ${b.lv} → Sv ${state.level}</div><div class="st">CAN +${d.hp} • SAL +${d.atk} • SAV +${d.def} • RUH +${d.mp}</div><div class="pw">GÜÇ ${km324Power()} (+${d.pw})</div>${unlock?`<div class="nx">Yeni beceri: ${km333Def(unlock).n}</div>`:nxt?`<div class="nx">Sv ${nxt}: yeni beceri açılır</div>`:''}`;
 el.classList.add('on');el.dataset.show=JSON.stringify(d);clearTimeout(km334LvTimer);km334LvTimer=setTimeout(()=>el.classList.remove('on'),2400);return d}
// Önerilen güç: simülasyonda 3 sınıfın pasif (hiç yükseltmeyen) ve aktif oyuncu görev başı gücünün ortalaması, 10'a yuvarlanmış.
const KM334_REC=[REC_TABLE];
function km334Rec(){return KM334_REC[Math.min(KM334_REC.length-1,state.missionIndex)]||0}
function km334RecHtml(){const r=km334Rec(),pw=km324Power();return r?`<small class="km334rec${pw<r?' low':''}">Önerilen güç: ${r} • Senin gücün: ${pw}${pw<r?' — ekipman/beceri güçlendir':''}</small>`:''}
// ===== 3.33 BECERİ SİSTEMİ (3C) =====""")

rep("skill3Cd:state.player.skill3Cd||0,","skill3Cd:state.player.skill3Cd||0,petLv:state.petLv||1,mountLv:state.mountLv||1,rec:km334Rec(),")
rep("setFlowerMenuPage,skill3:","setFlowerMenuPage,petUp:k=>km334PetUp(k),levelShow:()=>{const e=$('km334Lv');return e&&e.classList.contains('on')?{text:e.textContent,d:JSON.parse(e.dataset.show||'{}')}:null},diff:KM334_D,skill3:")
rec=sys.argv[3] if len(sys.argv)>3 else '90,110,130,140,150,150,170,170,170,190,190,190,210,210,220,220,240,240,240,240,250,250,250,250,270,270'
s=s.replace('[REC_TABLE]','['+rec+']')
open(dst,'w',encoding='utf-8').write(s);print('OK',len(s))
