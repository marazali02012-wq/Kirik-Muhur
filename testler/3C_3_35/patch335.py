# Kırık Mühür 3.35 — Aşama 3C/4 (3C tamamlama), 3.34 üzerine.
# Yuva güçlendirme (eşya değişince korunur), eşya puanı, "Yuva Ustası" yan hedefi, tilki Sv3/6/9 ek etkileri,
# binek açılış gösterisi, tek seferlik seviye ödülleri (Sv5/10/15). Kayıt alanı: slotEn. Eski eşya güçlendirmeleri korunur.
import sys,re
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding='utf-8').read()
def rep(old,new,count=1):
    global s
    n=s.count(old)
    if n!=count: raise SystemExit(f'EXPECTED {count} got {n}: {old[:100]!r}')
    s=s.replace(old,new)

rep('<title>Kırık Mühür 3.34 | 3C Denge TEST</title>','<title>Kırık Mühür 3.35 | 3C Tamamlama TEST</title>')
rep("savedAt:Date.now(),questSchema:334,","savedAt:Date.now(),questSchema:335,")
rep("saveVersion:'3.34'","saveVersion:'3.35'")

# ---------- durum + kayıt
rep("petLv:1,mountLv:1,enemies:[]","petLv:1,mountLv:1,slotEn:{weapon:0,helm:0,armor:0,gloves:0,boots:0,talisman:0},enemies:[]")
rep("state.petLv=1;state.mountLv=1;","state.petLv=1;state.mountLv=1;state.slotEn=km335SanSlots(null);")
rep("petLv:state.petLv||1,mountLv:state.mountLv||1};","petLv:state.petLv||1,mountLv:state.mountLv||1,slotEn:state.slotEn};")
rep("state.mountLv=km325Num(old.mountLv,1,1,KM334_CMAX);","state.mountLv=km325Num(old.mountLv,1,1,KM334_CMAX);state.slotEn=km335SanSlots(old.slotEn);")

# ---------- yuva bonusu statlara
rep("if(e){p.attack+=e.atk;p.def+=e.def}}p.hp=clamp(hp,0,p.maxHp);","if(e){p.attack+=e.atk;p.def+=e.def}}km335AddSlots(p);p.hp=clamp(hp,0,p.maxHp);")

# ---------- güçlendirme artık yuvaya
m=re.search(r"function km332Enhance\(id\)\{.*?return uid\}\n",s,re.S);assert m,'enhance'
s=s[:m.start()]+"""function km332Enhance(id){const d=itemdefs[id];if(!d||!d.slot)return null;if(!km332Equipped(id)){notify('Önce kuşan: güçlendirme yuvaya işlenir');return null}const k=d.slot,l=km335Lv(k);if(l>=KM332_MAXEN){notify(KM332_SLOTS[k].n+' yuvası en yüksek (+'+KM332_MAXEN+')');return null}
 const c=km335Cost(k);if(state.coins<c.gold||state.materials<c.toz){notify('Altın veya ruh tozu yetersiz ('+c.gold+' altın, '+c.toz+' toz)');return null}
 state.coins-=c.gold;state.materials-=c.toz;state.slotEn[k]=l+1;baseStats();km324OnEquipmentEnhance();notify(KM332_SLOTS[k].n+' yuvası +'+(l+1));syncUI();save();return id}
"""+s[m.end():]

# ---------- çanta/ayrıntı arayüzü
rep("const c=km332Cost(d),v=km332Value(d),r=KM332_RAR[d.rarity||1];","const c=km335Cost(d.slot),v=km332Value(d),r=KM332_RAR[d.rarity||1],sl=km335Lv(d.slot),sb=km335Bonus(d.slot);")
rep("<button class=\"outlined\" id=\"km332En\" ${(d.ench||0)>=KM332_MAXEN?'disabled':''}>GÜÇLENDİR (${c.gold}a+${c.toz}t)</button>",
    "<button class=\"outlined\" id=\"km332En\" ${!eq||sl>=KM332_MAXEN?'disabled':''}>${!eq?'KUŞANINCA GÜÇLENİR':sl>=KM332_MAXEN?'YUVA +'+sl+' (EN YÜKSEK)':`YUVA +${sl+1} (${c.gold}a+${c.toz}t)`}</button>")
rep("• SAV ${d.def} ${eq?'':'('+sg(dD)+')'}</div>",
    "• SAV ${d.def} ${eq?'':'('+sg(dD)+')'}<br>${km335ScoreHtml(d,cur,eq)}${eq&&sl?` • <b class=\"km335slot\">${KM332_SLOTS[d.slot].n} yuvası +${sl}</b> (SAL +${sb.atk} SAV +${sb.def})`:''}</div>")
rep("${d.ench?`<span class=\"en\">+${d.ench}</span>`:''}<small>${KM332_SLOTS[k].n}</small>","${km335Lv(k)?`<span class=\"en\">+${km335Lv(k)}</span>`:''}<small>${KM332_SLOTS[k].n}</small>")
rep("const w=itemdefs[state.equipment.weapon],wc=w?km332Cost(w):null;","const w=itemdefs[state.equipment.weapon],wc=w&&km335Lv('weapon')<KM332_MAXEN?km335Cost('weapon'):null;")
rep("⚒ SİLAHI GÜÇLENDİR${wc?` (${wc.gold} altın + ${wc.toz} toz)`:''}","⚒ SİLAH YUVASI +${km335Lv('weapon')+(wc?1:0)}${wc?` (${wc.gold} altın + ${wc.toz} toz)`:' (EN YÜKSEK)'}")

# ---------- yan hedef
rep("{id:'forge',name:'Ekipman Ustası',detail:'Silahını bir kere geliştir',target:1,coin:65,xp:50,mat:1}",
    "{id:'forge',name:'Ekipman Ustası',detail:'Silahını bir kere geliştir',target:1,coin:65,xp:50,mat:1},\n {id:'slots',name:'Yuva Ustası',detail:'2 ekipman yuvasını +5’e çıkar',target:2,coin:240,xp:160,mat:6}")
rep("if(id==='regions')return Object.values(x.regions).filter(Boolean).length;return x[id]||0}","if(id==='regions')return Object.values(x.regions).filter(Boolean).length;if(id==='slots')return Object.values(state.slotEn||{}).filter(v=>v>=5).length;return x[id]||0}")

# ---------- tilki ek etkileri
rep("state.petTimer=km334PetCd();let n=km334PetDmg();nearest.hp=Math.max(0,nearest.hp-n);effect(nearest.x,nearest.y-25,'-'+n,'#9decd9');if(nearest.hp<=0)killEnemy(nearest)",
    "state.petTimer=km334PetCd();let n=km334PetDmg();state.petHits=(state.petHits||0)+1;if((state.petLv||1)>=9&&state.petHits%3===0){n*=2;effect(nearest.x,nearest.y-48,'TİLKİ ATEŞİ','#ffcf6a',13)}nearest.hp=Math.max(0,nearest.hp-n);effect(nearest.x,nearest.y-25,'-'+n,'#9decd9');km335PetExtra(nearest,n);if(nearest.hp<=0)killEnemy(nearest)")
rep("Yakındaki düşmana her ${km334PetCd().toFixed(1).replace('.',',')} sn’de ${petDmg} hasar verir.",
    "Yakındaki düşmana her ${km334PetCd().toFixed(1).replace('.',',')} sn’de ${petDmg} hasar verir.${km335PetPerks()}")

# ---------- seviye olayları: binek gösterisi + seviye ödülü
rep("km333OnLevel();if(km334B)km334LevelShow(km334B)}","km333OnLevel();if(km334B)km334LevelShow(km334B);km335OnLevel()}")
# eski kayıt: yükleme sonrası kaçırılmış seviye ödülleri
rep("enterZone(rz,rx,ry);$('modal').classList.add('hidden');","enterZone(rz,rx,ry);$('modal').classList.add('hidden');setTimeout(km335CheckLevelRewards,0);")

rep('<style id="km334-balance">','''<style id="km335-complete">
.km335slot{color:#ffd56a}.km335score{color:#ffe9b0;font-weight:900}
.km335perk{display:block;font-size:10px;line-height:1.35;color:#8a9aa8}.km335perk.on{color:#8fe7c4}
#km335Reveal{position:fixed;left:0;right:0;margin:0 auto;top:12%;z-index:61;width:min(300px,88vw);pointer-events:none;text-align:center;border-radius:16px;padding:14px 12px 12px;
 background:radial-gradient(circle at 50% 38%,rgba(255,214,120,.45),rgba(20,30,48,.94) 62%);border:2px solid #e7c06c;box-shadow:0 0 30px rgba(255,190,80,.5);animation:km334z .45s ease-out}
#km335Reveal h2{margin:0;font-size:28px;color:#ffe48a;text-shadow:0 0 10px #ff9a3a,0 2px 0 #5a3000}
#km335Reveal .ic{font-size:54px;line-height:64px;filter:drop-shadow(0 0 10px #ffd37a)}
#km335Reveal b{display:block;font-size:16px;color:#fff3cf}#km335Reveal small{display:block;font-size:12px;color:#cfe3ee;margin:4px 0 8px}
#km335Reveal button{pointer-events:auto;min-height:44px;min-width:140px;border-radius:10px;font-weight:900}
</style><style id="km334-balance">''')

rep("// ===== 3.34 DENGE (3C) =====",r"""// ===== 3.35 3C TAMAMLAMA =====
const KM335_SLOTKEYS=['weapon','helm','armor','gloves','boots','talisman'];
function km335SanSlots(v){const o={};for(const k of KM335_SLOTKEYS)o[k]=v&&typeof v==='object'?km325Num(v[k],0,0,KM332_MAXEN):0;return o}
function km335Lv(k){return (state.slotEn&&state.slotEn[k])||0}
function km335Cost(k){const d=itemdefs[state.equipment[k]],t=(d&&d.tier)||1,l=km335Lv(k);return {gold:20*(l+1)*t,toz:1+l}}
// Yuva bonusu: kuşanılı eşyanın temel değerinin %8'i × seviye + seviye (yalnız eşyanın sahip olduğu stata). Boş yuvada bonus yok.
function km335Bonus(k){const d=itemdefs[state.equipment[k]],l=km335Lv(k);if(!d||!l)return {atk:0,def:0};return {atk:d.atk?Math.round(d.atk*.08*l)+l:0,def:d.def?Math.round(d.def*.08*l)+l:0}}
function km335AddSlots(p){for(const k of KM335_SLOTKEYS){const b=km335Bonus(k);p.attack+=b.atk;p.def+=b.def}}
function km335Score(d){return d&&d.slot?Math.round((d.atk*2+d.def*1.5)*10+(d.tier||1)*20+(d.rarity||1)*10):0}
function km335ScoreHtml(d,cur,eq){const sc=km335Score(d);if(eq||!cur)return `<span class="km335score">Puan ${sc}</span>`;const df=sc-km335Score(cur);return `<span class="km335score">Puan ${sc}</span> (${df>0?`<span class="km332pos">+${df}</span>`:df<0?`<span class="km332neg">${df}</span>`:'±0'})`}
function km335PetExtra(t,n){const lv=state.petLv||1,p=state.player;if(lv>=3){const o=state.enemies.filter(e=>!e.dead&&e!==t&&dist(e,t)<90).sort((a,b)=>dist(a,t)-dist(b,t))[0];if(o){const m=Math.max(1,Math.round(n*.5));o.hp=Math.max(0,o.hp-m);effect(o.x,o.y-25,'-'+m,'#9decd9');if(o.hp<=0)killEnemy(o)}}
 if(lv>=6&&p.hp>0){const h=Math.max(1,Math.round(n*.25));p.hp=Math.min(p.maxHp,p.hp+h);effect(p.x,p.y-60,'+'+h,'#90ffd1',13)}}
function km335PetPerks(){const lv=state.petLv||1;return [[3,'Ruh Pençesi: vuruşun yarısı yakındaki 2. düşmana sıçrar'],[6,'Şifa Kokusu: vurduğu hasarın %25’i kadar can verir'],[9,'Tilki Ateşi: her 3. vuruş çift hasar']].map(([l,t])=>`<span class="km335perk${lv>=l?' on':''}">${lv>=l?'✓':'🔒 Sv'+l} ${t}</span>`).join('')}
let km335RevealT=null;
function km335Reveal(icon,title,text){let el=$('km335Reveal');if(!el){el=document.createElement('div');el.id='km335Reveal';document.body.appendChild(el)}let n=8;
 const draw=()=>{el.innerHTML=`<h2>KAZANDIN</h2><div class="ic">${icon}</div><b>${title}</b><small>${text}</small><button class="primary" id="km335RevealOk">TAMAM (${n})</button>`;$('km335RevealOk').onclick=close};
 const close=()=>{clearInterval(km335RevealT);km335RevealT=null;el.remove()};clearInterval(km335RevealT);draw();el.dataset.title=title;km335RevealT=setInterval(()=>{if(state.paused)return;n--;if(n<=0)close();else draw()},1000)}
const KM335_LVREW=[{lv:5,coin:150,mat:4,gear:0},{lv:10,coin:300,mat:8,gear:3},{lv:15,coin:500,mat:12,gear:4}];
function km335CheckLevelRewards(){if(!state.classId||state.mode==='select')return;for(const r of KM335_LVREW){const id='lv335-'+r.lv;if(state.level<r.lv||state.questRewards.includes(id))continue;
 const before={level:state.level,power:km324Power()};if(!questAward(id,r.coin,0,r.mat))continue;const items=[];if(r.gear&&km332Count()<KM332_CAP){const slot=KM335_SLOTKEYS[(r.lv/5)%6|0];const u=km332Make(slot,Math.min(4,1+Math.floor(r.lv/5)),r.gear);addItem(u);items.push(itemdefs[u].name)}
 notify('SEVİYE ÖDÜLÜ: Sv'+r.lv);km325QueueReward({id,kind:'side',title:'Seviye '+r.lv+' ödülü',npc:'Seviye ödülü',coin:r.coin,xp:0,mat:r.mat,items,levelBefore:before.level,levelAfter:state.level,powerBefore:before.power,powerAfter:km324Power()})}}
function km335OnLevel(){if(state.level===2)km335Reveal('♞','Ay Işığı Geyiği','Binek açıldı: hareket hızı +%55. Sadık menüsünden bin.');km335CheckLevelRewards()}
// ===== 3.34 DENGE (3C) =====""")

rep("petLv:state.petLv||1,mountLv:state.mountLv||1,rec:km334Rec(),","petLv:state.petLv||1,mountLv:state.mountLv||1,rec:km334Rec(),slotEn:{...(state.slotEn||{})},")
rep("setFlowerMenuPage,petUp:","setFlowerMenuPage,slotBonus:k=>km335Bonus(k),score:id=>km335Score(itemdefs[id]),reveal:()=>{const e=$('km335Reveal');return e?e.textContent:null},petUp:")
open(dst,'w',encoding='utf-8').write(s);print('OK',len(s))
