import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding='utf-8').read()
def rep(old,new,count=1):
    global s
    n=s.count(old)
    if n!=count: raise SystemExit(f'EXPECTED {count} got {n}: {old[:90]!r}')
    s=s.replace(old,new)

# --- 0. Kimlik / metinler (ekran yazısı = gerçek davranış)
rep('<title>Kırık Mühür 3.24 | Çeşitli Hikâye Görevleri TEST</title>','<title>Kırık Mühür 3.25 | 3A Onarım TEST</title>')
rep('<p class="sub">3A • GÖREV ROTASI VE GÖRSEL SAHNE</p>','<p class="sub">3.25 • AŞAMA 3A ONARIM TESTİ</p>')
rep('görev tuşu → otomatik yürüyüş ve savaş → dönüş için görev tuşu → NPC’ye dokunarak teslim ve ödül → yeni görev.',
    'göreve bir kez dokun → otomatik yürüyüş ve savaş → ilgili NPC’ye otomatik dönüş → ödül tek kez otomatik eklenir, bilgi penceresi kazanımı gösterir → yeni görev. Sahaya dokunarak manuel oynayabilirsin; görev yine sayılır.')
rep('<p class="note">Kung Fu Saga tür','<p class="note" id="km325SaveNotice" hidden></p><p class="note">Kung Fu Saga tür')

# --- 1. Kayıt: HP/MP + sürüm, boş kayıt yazma yok
rep("function save(){try{const s={questSchema:324,",
    "function save(){if(!state.classId||km325SaveBlocked)return;try{const s={questSchema:325,saveVersion:'3.25',hp:Math.round(state.player.hp),mp:Math.round(state.player.mp),")
# --- 2. Yükleme: bozuk kaydı yedekle, sessizce ezme
rep("""function load(){try{
 const fresh=JSON.parse(localStorage.getItem(SAVE_V32));if(fresh)return fresh;""",
"""let km325SaveBlocked=false,km325LoadIssue='';
function km325ReadKey(key){let raw=null;try{raw=localStorage.getItem(key)}catch(e){km325LoadIssue='Tarayıcı kayıt alanına erişilemedi.';return null}
 if(raw===null||raw==='')return null;
 try{const v=JSON.parse(raw);if(v&&typeof v==='object'&&!Array.isArray(v))return v;throw new Error('nesne değil')}
 catch(e){const bk=key+'_bozukYedek';try{if(localStorage.getItem(bk)===null)localStorage.setItem(bk,raw)}catch(_){}
  km325LoadIssue='Kayıt okunamadı (bozuk veri). Ham veri silinmedi, "'+bk+'" anahtarına yedeklendi.';return null}}
function load(){try{
 const fresh=km325ReadKey(SAVE_V32);if(fresh)return fresh;if(km325LoadIssue)return null;""")
rep("return JSON.parse(localStorage.getItem('kirikMuhurQuestFlowV323Test'))||JSON.parse(localStorage.getItem('kirikMuhurQuestFlowV32'))||JSON.parse(localStorage.getItem('kirikMuhurStep3TestV1'));",
    "return km325ReadKey('kirikMuhurQuestFlowV323Test')||km325ReadKey('kirikMuhurQuestFlowV32')||km325ReadKey('kirikMuhurStep3TestV1');")

# --- 3. Restore: alan doğrulama + HP koruma + konum doğrulama
rep("function restore(){const old=load();if(!old||!classes[old.classId])return false;",
"""const KM325_PHASES=['ready','travel','hunt','return','complete','claim'];
function km325Num(v,def,min,max){v=Number(v);if(!Number.isFinite(v))return def;return Math.max(min,Math.min(max,Math.floor(v)))}
function km325Sanitize(old){const fixed=[];const o={...old};
 const num=(k,def,min,max)=>{const v=km325Num(o[k],def,min,max);if(o[k]!==undefined&&o[k]!==null&&v!==Number(o[k]))fixed.push(k);o[k]=v};
 num('level',1,1,999);num('xp',0,0,1e7);num('coins',45,0,1e9);num('materials',3,0,1e9);num('upgradeAtk',0,0,1e5);
 if(o.missionIndex!==undefined)num('missionIndex',0,0,1e5);
 if(o.questPhase!==undefined&&!KM325_PHASES.includes(o.questPhase)){fixed.push('questPhase');o.questPhase='ready';o.missionKills=0;o.kills=0;o.autoPath=false;o.autoBattle=false}
 if(!Array.isArray(o.inv)){if(o.inv!==undefined)fixed.push('inv');o.inv=[]}
 const inv=o.inv.filter(id=>typeof id==='string'&&itemdefs[id]);if(inv.length!==o.inv.length)fixed.push('inv');o.inv=inv;
 const eq={weapon:null,armor:null,talisman:null,boots:null};const src=o.equipment&&typeof o.equipment==='object'?o.equipment:{};
 for(const slot of Object.keys(eq)){const id=src[slot];if(id==null)continue;if(itemdefs[id]&&itemdefs[id].slot===slot&&o.inv.includes(id))eq[slot]=id;else fixed.push('equipment.'+slot)}o.equipment=eq;
 if(!Array.isArray(o.questRewards)){if(o.questRewards!==undefined)fixed.push('questRewards');o.questRewards=[]}
 o.questRewards=[...new Set(o.questRewards.filter(x=>typeof x==='string'))];
 if(o.zone!==undefined&&!names[o.zone]){fixed.push('zone');o.zone='village';o.x=475;o.y=580}
 return {o,fixed}}
function restore(){let old=load();if(!old||!classes[old.classId]){if(old&&old.classId!==undefined)km325LoadIssue='Kayıttaki sınıf tanınmadı; ham kayıt korunuyor.';if(km325LoadIssue){const n=$('km325SaveNotice');if(n){n.hidden=false;n.textContent='⚠ '+km325LoadIssue+' Yeni oyun başlatabilirsin.'}}return false}
const km325S=km325Sanitize(old);old=km325S.o;""")
rep("state.targetId=null;state.player.hp=classes[state.classId].hp;state.player.mp=classes[state.classId].mp;baseStats();state.player.hp=state.player.maxHp;state.player.mp=state.player.maxMp;enterZone(old.zone||'village',old.x??475,old.y??580);$('modal').classList.add('hidden');notify('Kaldığın yerden devam');return true}",
"""{const mi=missionInfo();state.missionKills=km325Num(state.missionKills,0,0,mi.count);state.kills=state.missionKills}
state.targetId=null;state.player.hp=classes[state.classId].hp;state.player.mp=classes[state.classId].mp;baseStats();
const savedHp=Number(old.hp),savedMp=Number(old.mp);state.player.hp=Number.isFinite(savedHp)&&savedHp>0?clamp(savedHp,1,state.player.maxHp):state.player.maxHp;state.player.mp=Number.isFinite(savedMp)&&savedMp>=0?clamp(savedMp,0,state.player.maxMp):state.player.maxMp;
let rz=names[old.zone]?old.zone:'village',rx=Number.isFinite(Number(old.x))?Number(old.x):475,ry=Number.isFinite(Number(old.y))?Number(old.y):580;if(!(Number.isFinite(savedHp)&&savedHp>0)&&old.hp!==undefined){rz='village';rx=480;ry=580}if(blocked(rz,rx,ry)){const sp={village:[475,580],forest:[235,610],arena:[235,625]}[rz];rx=sp[0];ry=sp[1]}
enterZone(rz,rx,ry);$('modal').classList.add('hidden');notify(km325S.fixed.length?'Kayıt yüklendi • geçersiz alanlar onarıldı: '+[...new Set(km325S.fixed)].join(', '):'Kaldığın yerden devam');return true}""")

# --- 4. Boss / eşsiz eşya: Mühür Parçası tek kez; boss görev dışı tekrar doğup çiftlenmez
rep("state.drops.push({id:e.id+'drop',x:e.x,y:e.y,type:e.type==='boss'?'relic':'coins',taken:false});",
    "const km325Relic=e.type==='boss'&&!state.inv.includes('relic')&&!state.drops.some(d=>d.type==='relic');state.drops.push({id:e.id+'drop',x:e.x,y:e.y,type:km325Relic?'relic':'coins',taken:false});if(e.type==='boss')state.bossDead=true;")
rep("function pickDrop(d){if(d.taken)return;d.taken=true;if(d.type==='relic')addItem('relic');",
    "function pickDrop(d){if(d.taken)return;d.taken=true;if(d.type==='relic'&&!state.inv.includes('relic'))addItem('relic');else if(d.type==='relic'){state.materials++;notify('Ruh tozu +1')}")

# --- 5. Orman kaydı: yalnız gölge avı görevinde öldürülen gölgeleri işaretle
rep("if(z==='forest'&&missionInfo().zone==='forest'&&['travel','hunt','complete','return'].includes(state.questPhase)){",
    "if(z==='forest'&&missionInfo().zone==='forest'&&missionInfo().kind==='hunt'&&missionInfo().id==='shade'&&['travel','hunt','complete','return'].includes(state.questPhase)){")

# --- 6. Ödül popup'ı: tek kez, bilgilendirici, onay yok
rep("""function deliverMissionAtNPC(){
 if(!['return','claim','complete'].includes(state.questPhase))return false;
 const m=missionInfo();if(state.zone!==m.returnZone)return false;
 const npc=state.npcs.find(n=>n.id===m.returnNpc);
 if(!npc||dist(state.player,npc)>62||state.missionKills<m.count)return false;
 const id='mission-'+state.missionIndex;
 const already=state.questRewards.includes(id);
 if(!already){questAward(id,m.coin,m.xp,m.material);if(state.missionIndex===1&&!state.inv.includes('talisman'))addItem('talisman');km324GrantStoryGear(state.missionIndex)}""",
"""function deliverMissionAtNPC(){
 if(!['return','claim','complete'].includes(state.questPhase))return false;
 const m=missionInfo();if(state.zone!==m.returnZone)return false;
 const npc=state.npcs.find(n=>n.id===m.returnNpc);
 if(!npc||dist(state.player,npc)>62||state.missionKills<m.count)return false;
 const id='mission-'+state.missionIndex;
 const already=state.questRewards.includes(id);
 if(!already){const before={level:state.level,power:km324Power(),inv:state.inv.length};
  questAward(id,m.coin,m.xp,m.material);if(state.missionIndex===1&&!state.inv.includes('talisman'))addItem('talisman');km324GrantStoryGear(state.missionIndex);
  km325QueueReward({id,kind:'mission',title:m.title,npc:npc.name,coin:m.coin,xp:m.xp,mat:m.material,items:state.inv.slice(before.inv),levelBefore:before.level,levelAfter:state.level,powerBefore:before.power,powerAfter:km324Power()})}""")
rep("""  if(questAward(id,t.coin,t.xp,t.mat))notify('YAN GÖREV TAMAMLANDI: '+t.name+' • Ödül eklendi');""",
"""  const before={level:state.level,power:km324Power()};
  if(questAward(id,t.coin,t.xp,t.mat)){notify('YAN GÖREV TAMAMLANDI: '+t.name+' • Ödül eklendi');km325QueueReward({id,kind:'side',title:t.name,npc:'Yan hedef',coin:t.coin,xp:t.xp,mat:t.mat,items:[],levelBefore:before.level,levelAfter:state.level,powerBefore:before.power,powerAfter:km324Power()})}""")

# Ödül kuyruğu + popup + manuel/oto ortak görev ilerlemesi
rep("function questAction(){",
r"""// 3.25 — Ödül bilgi penceresi: ödül zaten hesaba eklenmiştir; ikinci onay sorusu YOK.
let km325RewardQueue=[],km325RewardShown=[],km325RewardTimer=null,km325RewardOpen=false;
function km325QueueReward(r){if(km325RewardShown.includes(r.id)||km325RewardQueue.some(x=>x.id===r.id))return;km325RewardQueue.push(r)}
// Görev ödülü hemen gösterilir. Yan hedef popup'ı aktif görev akışını (oto yol/savaş) bölmesin diye görevler arasında ('ready') açılır; ödül zaten anında eklenmiş ve bildirilmiştir.
function km325RewardTick(){if(km325RewardOpen||!km325RewardQueue.length||state.mode!=='game'||state.paused||!$('modal').classList.contains('hidden'))return;let i=km325RewardQueue.findIndex(r=>r.kind==='mission');if(i<0&&state.questPhase==='ready')i=0;if(i<0)return;km325ShowReward(km325RewardQueue.splice(i,1)[0])}
function km325ShowReward(r){const el=$('modal'),body=$('modalBody');km325RewardShown.push(r.id);km325RewardOpen=true;state.paused=true;
 const tile=(icon,val,label)=>`<div class="rewardTile"><span class="rewardIcon">${icon}</span><b>${val}</b><small>${label}</small></div>`;
 const items=(r.items||[]).filter(i=>itemdefs[i]).map(i=>tile(itemdefs[i].icon,itemdefs[i].name,'EŞYA')).join('');
 const lv=r.levelAfter>r.levelBefore?`<p class="rewardNote">⬆ SEVİYE ${r.levelBefore} → ${r.levelAfter}</p>`:'';
 body.classList.add('rewardPanel');el.classList.add('rewardVisible');el.classList.remove('hidden');
 body.innerHTML=`<h1>✦ ${r.kind==='side'?'YAN HEDEF TAMAMLANDI':'GÖREV TAMAMLANDI'}</h1><p class="sub">${r.npc} • ${r.title}</p><div class="rewardGrid" id="km325RewardGrid">${tile('◆','+'+r.coin,'ALTIN')}${tile('✦','+'+r.xp,'XP')}${tile('❖','+'+r.mat,'RUH TOZU')}${items}${tile('⚔',r.powerBefore+' → '+r.powerAfter,'GÜÇ')}</div>${lv}<p class="rewardNote">Ödül hesabına otomatik ve tek kez eklendi. Onay gerekmez.</p><button class="rewardClaim" id="km325RewardOk">DEVAM ✓</button>`;
 window.__km325LastReward={...r,shownAt:Date.now()};
 const close=()=>{if(!km325RewardOpen)return;km325RewardOpen=false;clearTimeout(km325RewardTimer);closeModal()};
 $('km325RewardOk').onclick=close;el.onclick=e=>{if(km325RewardOpen&&e.target===el)close()};
 clearTimeout(km325RewardTimer);km325RewardTimer=setTimeout(close,7000)}
// 3.25 — Görev ilerlemesi oto yoldan bağımsız: manuel oynayan oyuncunun avı/incelemesi/teslimi de sayılır.
function km325CollectPoint(){const m=missionInfo(),p=state.player;if(m.kind==='hunt'||state.questPhase!=='hunt'||state.zone!==m.zone)return false;
 const pt=m.points[Math.min(state.missionKills,m.points.length-1)];if(!pt||dist(p,pt)>=46)return false;
 state.missionKills=Math.min(m.count,state.missionKills+1);state.kills=state.missionKills;
 effect(pt.x,pt.y-32,'✦ '+(m.kind==='inspect'?'İNCELENDİ':'TOPLANDI'),'#f6dc86');flash.push({x:pt.x,y:pt.y-22,t:.48,r:45,col:'#f4e0ac',kind:'burst'});
 moveTarget=null;path=[];state.navDelay=0;if(state.missionKills>=m.count)missionDone();else{notify((m.kind==='inspect'?'İncelendi: ':'Toplandı: ')+state.missionKills+'/'+m.count);syncUI();save()}return true}
function km325QuestProgress(){const m=missionInfo(),q=state.questPhase;
 if(q==='travel'&&state.zone===m.zone){state.questPhase='hunt';state.autoBattle=state.autoPath&&m.kind==='hunt';if(state.autoPath){moveTarget=null;path=[]}state.navDelay=0;
  notify(m.kind==='hunt'?'Hedefleri bul ve savaş!':m.kind==='collect'?'Mühür parçalarını topla!':'İşareti araştır!');syncUI();save();return}
 if(q==='hunt'){if(state.missionKills>=m.count){missionDone();return}km325CollectPoint();return}
 if(['return','claim','complete'].includes(q)&&state.zone===m.returnZone){const npc=state.npcs.find(n=>n.id===m.returnNpc);if(npc&&dist(state.player,npc)<=62)deliverMissionAtNPC()}}
function questAction(){""")

# autoMissionTick: toplama tek yerde (km325CollectPoint)
rep("""   const idx=state.missionKills,pt=m.points[Math.min(idx,m.points.length-1)];
   if(dist(p,pt)<46){
    state.missionKills=Math.min(m.count,state.missionKills+1);state.kills=state.missionKills;
    effect(pt.x,pt.y-32,'✦ '+(m.kind==='inspect'?'İNCELENDİ':'TOPLANDI'),'#f6dc86');
    flash.push({x:pt.x,y:pt.y-22,t:.48,r:45,col:'#f4e0ac',kind:'burst'});
    moveTarget=null;path=[];state.navDelay=0;syncUI();save();
    if(state.missionKills>=m.count){missionDone();return}
   }""","""   if(km325CollectPoint()&&state.questPhase!=='hunt')return;""")

# tick: ortak ilerleme + ödül kuyruğu + periyodik kayıt; yeniden-rota döngüsünü kır
rep("mapTravelTick();autoMissionTick();","mapTravelTick();km325QuestProgress();autoMissionTick();km325RewardTick();if(state.paused)return;km325AutoSave(dt);")
rep("if(dist(p,moveTarget)>34){path=findPath(p,moveTarget);if(!path.length){moveTarget=null;state.navDelay=.4}}else {moveTarget=null}}",
    "if(dist(p,moveTarget)>34){path=findPath(p,moveTarget);if(!path.length||dist(p,path[path.length-1])<20){path=[];moveTarget=null;state.navDelay=.4}}else {moveTarget=null}}")
# goTo: engel içine dokunulursa en yakın yürünebilir noktaya git
rep("let path=[],pathDestination='';function goTo(target){if(!target)return false;",
    "let path=[],pathDestination='';function km325Walkable(t){if(!blocked(state.zone,t.x,t.y))return t;const p=state.player,d=dist(p,t);for(let s=8;s<d;s+=8){const k=s/d,c={x:t.x+(p.x-t.x)*k,y:t.y+(p.y-t.y)*k};if(!blocked(state.zone,c.x,c.y))return c}return t}\nfunction goTo(target){if(!target)return false;target=km325Walkable(target);")

# ölüm: hareket kuyruğunu temizle, ilerlemeyi kaydet
rep("if(p.hp<=0){state.autoBattle=false;state.autoPath=false;state.mode='dead';openModal('dead');notify('Yenildin')}",
    "if(p.hp<=0){state.autoBattle=false;state.autoPath=false;state.mapRoute=null;moveTarget=null;path=[];state.targetId=null;attackHeld=false;save();state.mode='dead';openModal('dead');notify('Yenildin')}")
rep("""$('respawn').onclick=()=>{state.mapRoute=null;state.mode='game';enterZone('village',480,580);state.player.hp=state.player.maxHp;state.player.mp=state.player.maxMp;closeModal();save()}""",
    """$('respawn').onclick=()=>{state.mapRoute=null;state.mode='game';state.player.hp=state.player.maxHp;state.player.mp=state.player.maxMp;enterZone('village',480,580);closeModal();save();notify(state.questPhase==='ready'?'Yeniden doğdun':'Yeniden doğdun • göreve dokunarak kaldığın yerden sürdür')}""")
# closeModal: sınıf seçimi/ölüm durumunu bozma
rep("function closeModal(){$('modal').classList.remove('rewardVisible');$('modalBody').classList.remove('rewardPanel');$('modal').classList.add('hidden');state.paused=false;state.mode='game';save()}",
    "function closeModal(){if(!state.classId)return;$('modal').classList.remove('rewardVisible');$('modalBody').classList.remove('rewardPanel');$('modal').onclick=null;$('modal').classList.add('hidden');km325RewardOpen=false;state.paused=false;if(state.player.hp>0)state.mode='game';save()}")

rep("function killEnemy(e){if(e.dead)return;","function killEnemy(e){if(e.dead)return;if(state.questPhase==='travel'&&state.zone===missionInfo().zone)km325QuestProgress();")
rep("while(log.children.length>3)log.lastChild.remove()","while(log.children.length>2)log.lastChild.remove()")
# --- 7. Çiçek: döndürme (kaydırma) jesti; hareketten tamamen bağımsız
rep("$('flowerMenu').onclick=()=>{if(state.mode!=='game'||state.paused)return;setFlowerMenuPage(menuPage+1)};",
"""let km325FlowerX=null,km325FlowerSwiped=false;
$('flowerMenu').addEventListener('pointerdown',e=>{e.stopPropagation();km325FlowerX=e.clientX;km325FlowerSwiped=false});
$('flowerMenu').addEventListener('pointerup',e=>{e.stopPropagation();if(km325FlowerX===null)return;const dx=e.clientX-km325FlowerX;km325FlowerX=null;if(Math.abs(dx)>=22&&state.mode==='game'&&!state.paused){km325FlowerSwiped=true;setFlowerMenuPage(menuPage+(dx>0?1:-1))}});
$('flowerMenu').onclick=()=>{if(km325FlowerSwiped){km325FlowerSwiped=false;return}if(state.mode!=='game'||state.paused)return;setFlowerMenuPage(menuPage+1)};""")

# --- 8. Kalıcılık: sekme kapanırken/arka plana geçerken kaydet; periyodik kayıt; Android geri tuşu
rep("window.addEventListener('error',e=>{",
"""let km325SaveClock=0;function km325AutoSave(dt){km325SaveClock+=dt;if(km325SaveClock>=4){km325SaveClock=0;save()}}
window.addEventListener('pagehide',()=>save());document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')save()});
// Android geri tuşu: açık pencereyi kapatır, oyunda duraklatma menüsünü açar; oyundan istemsiz çıkışı önler.
try{history.pushState({km325:1},'')}catch(e){}
window.addEventListener('popstate',()=>{if(state.mode==='select')return;try{history.pushState({km325:1},'')}catch(e){}if(state.mode==='dead')return;if(!$('modal').classList.contains('hidden')){closeModal();return}if(state.mode==='game')toggleModal('pause')});
window.addEventListener('error',e=>{""")

# --- 9. Test API: kuyruk ve son ödül görünürlüğü (oyun mantığı değişmez)
rep("menuPage:$('app').dataset.menuPage,","menuPage:$('app').dataset.menuPage,paused:state.paused,rewardOpen:km325RewardOpen,rewardShown:[...km325RewardShown],lastReward:window.__km325LastReward||null,loadIssue:km325LoadIssue,hp:state.player.hp,")

open(dst,'w',encoding='utf-8').write(s)
print('OK',len(s))
