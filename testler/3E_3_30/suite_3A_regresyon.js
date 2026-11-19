// Kırık Mühür 3.25 — Aşama 3A gerçek tarayıcı test paketi (Playwright + Chromium)
// Kullanım: node suite.js <yeni.html> <kaynak_3_24.html> <cikti_klasoru> <https_base_url>
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),os=require('os');
const [,,NEW,OLD,OUT,HTTPS]=process.argv;
fs.mkdirSync(path.join(OUT,'GORSEL_DENETIM'),{recursive:true});
const results=[];
const ONLY=process.env.ONLY;function rec(id,name,status,evidence){results.push({id,name,status,evidence});console.log(status.padEnd(8),id,name,'—',typeof evidence==='string'?evidence:JSON.stringify(evidence))}
const shot=n=>path.join(OUT,'GORSEL_DENETIM',n);
const MOBILE=(w,h)=>({viewport:{width:w,height:h},hasTouch:true,isMobile:true,deviceScaleFactor:2,userAgent:'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Mobile Safari/537.36'});
let browser;
async function open(file,{w=393,h=852,cls='guardian',init,url}={}){
 const ctx=await browser.newContext({...MOBILE(w,h),ignoreHTTPSErrors:true});if(init)await ctx.addInitScript(init);
 const pg=await ctx.newPage();pg.errs=[];pg.on('pageerror',e=>pg.errs.push(e.message));pg.on('console',m=>{if(m.type()==='error')pg.errs.push(m.text())});
 await pg.goto(url||('file://'+file));await pg.waitForTimeout(600);
 if(cls){await pg.tap(`[data-class="${cls}"]`);await pg.waitForTimeout(250)}
 return {ctx,pg};
}
const G=pg=>pg.evaluate(()=>window.__kmTest.get());
const step=(pg,n,dt=.05)=>pg.evaluate(([n,dt])=>{for(let i=0;i<n;i++)window.__kmTest.step(dt)},[n,dt]);
async function until(pg,fn,max=600,arg){for(let i=0;i<max;i++){await step(pg,20);if(await pg.evaluate(fn,arg))return true}return false}

(async()=>{
 browser=await chromium.launch();
 // ---------- T01 Sınıflar açılır
 if(!ONLY||ONLY.split(',').includes('T01')){
 for(const cls of ['guardian','scout','weaver']){const {ctx,pg}=await open(NEW,{cls});const g=await G(pg);
  rec('T01-'+cls,'Sınıf oyunu açar: '+cls,g.mode==='game'&&g.spriteCount>=6&&!pg.errs.length?'PASS':'FAIL',{mode:g.mode,sprites:g.spriteCount,hp:g.player.maxHp,atk:g.player.attack,errors:pg.errs});await ctx.close()}

 }

 // ---------- T02 Portre ölçüleri: taşma/çakışma + önce/sonra görüntü
 if(!ONLY||ONLY.split(',').includes('T02')){
 for(const [w,h] of [[320,568],[360,800],[393,852],[412,915]]){
  for(const [tag,file] of [['once_3_24',OLD],['sonra_3_25',NEW]]){
   const {ctx,pg}=await open(file,{w,h});
   await pg.screenshot({path:shot(`portre_${w}x${h}_${tag}.png`)});
   if(tag==='sonra_3_25'){
    const r=await pg.evaluate(()=>{const ids=['questPanel','trackBtn','flowerMenu','attackBtn','skill1','skill2','healBtn','battleToggle','minimapFrame','resources','interactBtn','pauseBtn'];
     const vis=e=>{const s=getComputedStyle(e);return s.display!=='none'&&s.visibility!=='hidden'&&e.getBoundingClientRect().width>0};
     const rails=[...document.querySelectorAll('.topRail .railBtn')].filter(vis);
     const els=ids.map(id=>document.getElementById(id)).filter(e=>e&&vis(e)).concat(rails);
     const W=innerWidth,H=innerHeight,out=[],over=[];
     const R=els.map(e=>({id:e.id||e.textContent.trim().slice(0,8),r:e.getBoundingClientRect(),e}));
     for(const a of R){if(a.r.left<-1||a.r.top<-1||a.r.right>W+1||a.r.bottom>H+1)out.push(a.id)}
     for(let i=0;i<R.length;i++)for(let j=i+1;j<R.length;j++){const a=R[i],b=R[j];if(a.e.contains(b.e)||b.e.contains(a.e))continue;
      const ix=Math.min(a.r.right,b.r.right)-Math.max(a.r.left,b.r.left),iy=Math.min(a.r.bottom,b.r.bottom)-Math.max(a.r.top,b.r.top);if(ix>2&&iy>2)over.push(a.id+'×'+b.id)}
     // oyuncu ekranda mı? (kamera dönüşümü)
     const T=window.__kmTest.get();const c=document.getElementById('game').getBoundingClientRect();
     const scrollW=document.documentElement.scrollWidth>W+1;
     // yanlış dokunma: kontrol merkezlerinde elementFromPoint kendisi mi
     const wrong=R.filter(a=>a.e.tagName==='BUTTON').filter(a=>{const x=a.r.left+a.r.width/2,y=a.r.top+a.r.height/2;const hit=document.elementFromPoint(x,y);return hit&&!a.e.contains(hit)&&!hit.contains(a.e)}).map(a=>a.id);
     return {out,over,scrollW,wrong,count:R.length}});
    const ok=!r.out.length&&!r.over.length&&!r.scrollW&&!r.wrong.length;
    rec(`T02-${w}x${h}`,`Portre ${w}×${h}: taşma/çakışma/yanlış dokunma`,ok?'PASS':'FAIL',r);
    // oyun içi görev akışı sırasında görüntü
    await pg.tap('#trackBtn');await step(pg,60);await pg.waitForTimeout(150);await pg.screenshot({path:shot(`portre_${w}x${h}_sonra_3_25_gorevde.png`)});
   }
   await ctx.close();
  }
 }

 }

 // ---------- T03 Dokunmatik yürüme: yön + animasyon + titreme yok
 if(!ONLY||ONLY.split(',').includes('T03')){
 {const {ctx,pg}=await open(NEW);const res={};
  const canvasTapWorld=async(wx,wy)=>{const p=await pg.evaluate(([wx,wy])=>{const c=document.getElementById('game').getBoundingClientRect(),q=Math.min(c.width/432,c.height/960),cz=window.__kmTest.get().zoom,cam=window.__kmTest.get().camera;const x=c.left+(c.width-432*q)/2+(wx-cam.x)*cz*q,y=c.top+(c.height-960*q)/2+(wy-cam.y)*cz*q;return {x,y,hit:document.elementFromPoint(x,y).id}},[wx,wy]);await pg.touchscreen.tap(p.x,p.y);return p.hit==='game'};
  const trial=async(name,dx,dy,expect)=>{await pg.evaluate(()=>{window.__kmTest.enter('village',700,560)});await step(pg,30);const g0=await G(pg); // 3.27: başlangıcın altındaki sandık engelinden uzak açık alan
   const hitOk=await canvasTapWorld(g0.player.x+dx,g0.player.y+dy);const faces=[];let ph0=(await G(pg)).walkPhase;
   for(let i=0;i<40;i++){await step(pg,1,1/60);faces.push((await G(pg)).facing)}
   const g=await G(pg);const flips=faces.reduce((n,f,i)=>n+(i&&f!==faces[i-1]?1:0),0);const seq=faces.filter((f,i)=>!i||f!==faces[i-1]);const osc=seq.some((f,i)=>i>=2&&seq[i-2]===f);
   res[name]={hitCanvas:hitOk,seq:seq.join('>'),osc,final:faces[faces.length-1],flips,walk:+(g.walkPhase-ph0).toFixed(2),moved:[Math.round(g.player.x-g0.player.x),Math.round(g.player.y-g0.player.y)]};
   return hitOk&&faces[faces.length-1]===expect&&!osc&&g.walkPhase>ph0};
  const a=await trial('sag',110,60,'right') /* 3.29+: yakınlaştırma 1.45; hedef Bilge Işın’dan uzak */,b=await trial('sol',-150,0,'left'),c=await trial('asagi',0,140,'down'),d=await trial('yukari',0,-140,'up');
  const e=await trial('capraz_sag_asagi',120,100,'right');
  // varışta titreme: hedefe ulaşınca konum sabit
  await pg.evaluate(()=>{window.__kmTest.enter('village',475,580);window.__kmTest.move(640,640)});await step(pg,120,1/60);const xs=[];for(let i=0;i<30;i++){await step(pg,1,1/60);const p=(await G(pg)).player;xs.push(Math.round(p.x*10)/10+','+Math.round(p.y*10)/10)}
  res.varis=[...new Set(xs)];
  await pg.screenshot({path:shot('dokunmatik_yurume_393x852.png')});
  rec('T03','Dokunmatik yürüme: sağ/sol/yukarı/aşağı/çapraz, animasyon, varışta titreme yok',a&&b&&c&&d&&e&&res.varis.length===1?'PASS':'FAIL',res);await ctx.close()}

 }

 // ---------- T04-T07 Tek dokunuş görev, ödül popup, tek ödül
 if(!ONLY||ONLY.split(',').includes('T04')){
 for(const cls of ['guardian','scout','weaver']){
  const {ctx,pg}=await open(NEW,{cls});const g0=await G(pg);
  await pg.tap('#trackBtn');const tapAuto=(await G(pg)).autoPath;
  const phases=new Set();let popup=null;
  for(let i=0;i<500&&!popup;i++){await step(pg,10);const g=await G(pg);phases.add(g.questPhase);if(g.rewardOpen)popup=g}
  const shotName=`odul_popup_${cls}.png`;if(popup){await pg.waitForTimeout(100);await pg.screenshot({path:shot(shotName)})}
  const dom=await pg.evaluate(()=>({text:document.getElementById('modalBody').innerText,buttons:[...document.querySelectorAll('#modalBody button')].map(b=>b.textContent)}));
  const g1=await G(pg);
  rec('T04-'+cls,'Tek dokunuş: hedef → savaş → NPC’ye otomatik dönüş → teslim',tapAuto&&popup&&g1.quest===1&&['travel','hunt','return'].every(p=>phases.has(p))?'PASS':'FAIL',{autoAfterOneTap:tapAuto,phases:[...phases],quest:g1.quest});
  const noClaim=!/ÖDÜLÜ AL|SONRA AL/i.test(dom.text+dom.buttons.join(' '));
  rec('T05-'+cls,'Bilgi popup’ı otomatik açılır, kazanımı gösterir, onay sormaz',popup&&noClaim&&dom.buttons.length===1&&/\+70/.test(dom.text)&&/\+95/.test(dom.text)&&/\+2/.test(dom.text)?'PASS':'FAIL',{buttons:dom.buttons,text:dom.text.replace(/\n+/g,' | ').slice(0,220),screenshot:shotName});
  // Tek ödül: tekrar teslim/konuşma/yeniden yükleme
  await pg.tap('#km325RewardOk');const after=await G(pg);
  await pg.evaluate(()=>{const T=window.__kmTest;T.deliverMissionAtNPC();T.talk();for(let i=0;i<40;i++)T.step(.05)});const again=await G(pg);
  await pg.reload();await pg.waitForTimeout(500);await step(pg,40);const re=await G(pg);
  const xpOk=after.coins-g0.coins>=70;
  rec('T06-'+cls,'Görev ödülü tek kez (tekrar teslim, NPC konuşma, yeniden yükleme)',after.questRewards.filter(x=>x==='mission-0').length===1&&again.coins===after.coins&&re.coins===after.coins&&!re.rewardOpen&&re.questRewards.length===after.questRewards.length&&xpOk&&!pg.errs.length?'PASS':'FAIL',{coinsStart:g0.coins,afterReward:after.coins,afterRetry:again.coins,afterReload:re.coins,rewardIds:re.questRewards,popupAfterReload:re.rewardOpen,errors:pg.errs});
  // İkinci ana görev (boss) — savaş hasarı, sınıf becerileri
  await pg.tap('#trackBtn');let dmg=0,hpMin=1e9,bossSeen=false;
  for(let i=0;i<700;i++){await step(pg,10);const g=await G(pg);if(g.enemies.some(e=>e.id==='boss1')){bossSeen=true;const b=g.enemies.find(e=>e.id==='boss1');dmg=Math.max(dmg,260-b.hp)}hpMin=Math.min(hpMin,g.player.hp);if(g.mode==='dead'){await pg.tap('#respawn');await pg.tap('#trackBtn')}if(g.quest===2&&g.rewardOpen)break}
  const g2=await G(pg);
  rec('T07-'+cls,'2. ana görev (boss): hasar, beceri, tek ödül + tılsım',g2.quest===2&&bossSeen&&dmg>0&&g2.inventory.filter(x=>x==='talisman').length===1&&g2.questRewards.filter(x=>x==='mission-1').length===1?'PASS':'FAIL',{quest:g2.quest,bossDamageSeen:dmg,playerHpMin:Math.round(hpMin),talisman:g2.inventory.filter(x=>x==='talisman').length,relic:g2.inventory.filter(x=>x==='relic').length});
  await ctx.close();
 }

 }

 // ---------- T08 Manuel devralma + kaldığı yerden devam (her sınıf)
 if(!ONLY||ONLY.split(',').includes('T08')){
 for(const cls of ['guardian','scout','weaver']){const {ctx,pg}=await open(NEW,{cls});
  await pg.tap('#trackBtn');await step(pg,30);const a=await G(pg);
  const c=await pg.evaluate(()=>{const r=document.getElementById('game').getBoundingClientRect();return {x:r.left+r.width*.3,y:r.top+r.height*.55}});
  await pg.touchscreen.tap(c.x,c.y);await step(pg,1);const b=await G(pg);
  await step(pg,200);const c2=await G(pg); // 10 sn: kendiliğinden açılmamalı
  await pg.tap('#trackBtn');await step(pg,2);const d=await G(pg);
  const ok=a.autoPath&&!b.autoPath&&!b.autoBattle&&!c2.autoPath&&!c2.autoBattle&&d.autoPath&&d.questPhase===c2.questPhase&&d.quest===c2.quest;
  rec('T08-'+cls,'Manuel devralma: oto kapanır, 10 sn kendiliğinden açılmaz, görev tuşuyla kaldığı yerden sürer',ok?'PASS':'FAIL',{before:a.autoPath,afterTap:[b.autoPath,b.autoBattle],after10s:[c2.autoPath,c2.autoBattle],resume:[d.autoPath,d.questPhase]});
  // Manuel oyunla tamamla: kendi vuruşlarıyla say
  const m=await pg.evaluate(()=>{const T=window.__kmTest;document.getElementById('autoPath').click();T.enter('forest',240,610);for(let i=0;i<4;i++)T.step(.05);
   for(const id of ['shade1','shade2','shade3']){for(let k=0;k<60;k++){const e=T.get().enemies.find(x=>x.id===id);if(!e||e.dead)break;T.hit(id,1)}}
   for(let i=0;i<10;i++)T.step(.05);const g=T.get();return {phase:g.questPhase,kills:g.missionKills,auto:g.autoPath}});
  const m2=await pg.evaluate(()=>{const T=window.__kmTest;T.enter('village',1070,610);T.setPlayer(790,470);for(let i=0;i<5;i++)T.step(.05);const g=T.get();return {quest:g.quest,popup:g.rewardOpen,auto:g.autoPath}});
  rec('T09-'+cls,'Tamamen manuel oyun: kendi vuruşu sayılır, NPC yanında ödül otomatik + popup',m.phase==='return'&&m.kills===3&&!m.auto&&m2.quest===1&&m2.popup?'PASS':'FAIL',{hunt:m,deliver:m2});
  await ctx.close()}

 }

 // ---------- T10 Manuel inceleme/toplama
 if(!ONLY||ONLY.split(',').includes('T10')){
 {const {ctx,pg}=await open(NEW);const r=await pg.evaluate(()=>{const T=window.__kmTest;const o={};
   T.setQuest(2);T.questAction();document.getElementById('autoPath').click();T.setPlayer(1048,752);for(let i=0;i<5;i++)T.step(.05);o.inspect=T.get().questPhase;
   T.closeModal();T.setQuest(4);T.questAction();document.getElementById('autoPath').click();T.enter('forest',300,700);for(let i=0;i<3;i++)T.step(.05);
   for(const [x,y] of [[490,811],[760,808],[1074,802]]){T.setPlayer(x,y);for(let i=0;i<3;i++)T.step(.05)}o.collect=[T.get().questPhase,T.get().missionKills];return o});
  rec('T10','Manuel inceleme/toplama görevleri sayılır',r.inspect==='return'&&r.collect[0]==='return'&&r.collect[1]===3?'PASS':'FAIL',r);await ctx.close()}

 }

 // ---------- T11 Yan görevler (3) tek ödül
 if(!ONLY||ONLY.split(',').includes('T11')){
 {const {ctx,pg}=await open(NEW);const r=await pg.evaluate(()=>{const T=window.__kmTest;const out={};
   const c0=T.get().coins;T.enter('forest',240,610);for(let i=0;i<3;i++)T.step(.05);T.enter('arena',235,625);for(let i=0;i<3;i++)T.step(.05);
   out.regionsPopup=T.get().rewardOpen;T.closeModal();
   for(let r=0;r<3;r++){T.enter('forest',240,610);for(const id of ['shade1','shade2','shade3'])T.kill(id);for(let i=0;i<3;i++)T.step(.05);if(T.get().rewardOpen)T.closeModal()}
   // 8 kill > 5 hedef: tek ödül
   T.closeModal();document.getElementById('bagBtn').click();document.getElementById('upgradeBtn').click();document.getElementById('upgradeBtn').click();T.closeModal();for(let i=0;i<3;i++)T.step(.05);
   const g=T.get();out.ids=g.questRewards.filter(x=>x.startsWith('side324'));out.shown=g.rewardShown;out.side=g.sideStats;
   // yeniden işleme denemesi
   const before=g.coins;for(let i=0;i<20;i++)T.step(.05);out.stable=T.get().coins===before;return out});
  const ok=r.ids.length===3&&new Set(r.ids).size===3&&r.stable&&r.shown.filter(x=>x.startsWith('side324')).length===3;
  rec('T11','3 yan hedef: doğru sayım, her biri tek ödül + bilgi popup’ı',ok?'PASS':'FAIL',r);await ctx.close()}

 }

 // ---------- T12 Harita: yanlış bölge, portal, NPC dönüşü
 if(!ONLY||ONLY.split(',').includes('T12')){
 {const {ctx,pg}=await open(NEW);const r=await pg.evaluate(()=>{const T=window.__kmTest;const o={};
   T.setQuest(2);T.questAction();for(let i=0;i<10;i++)T.step(.05);document.getElementById('autoPath').click(); // 3.26: görev 2 (köy), tapınak açık; oto kapat
   T.mapChoose('arena','scribe');T.mapTravel();let t=0;while(t<1200&&!(T.get().zone==='arena'&&!T.get().mapRoute)){T.step(.05);t++}
   o.mapArrived=[T.get().zone,!!T.get().mapRoute,Math.round(t*.05)+'s'];o.phaseInWrongZone=T.get().questPhase;
   T.questAction();t=0;while(t<6000&&T.get().quest<3){if(T.get().rewardOpen)T.closeModal();T.step(.05);t++;if(T.get().mode==='dead'){document.getElementById('respawn').click();T.questAction()}}
   o.completedFromWrongZone=[T.get().quest,Math.round(t*.05)+'s'];return o});
  rec('T12','Yanlış bölge (harita rotası tapınağa) → görev tuşu → portallarla doğru bölge → NPC teslimi',r.mapArrived[0]==='arena'&&r.completedFromWrongZone[0]===3?'PASS':'FAIL',r);await ctx.close()}

 }

 // ---------- T13 Ölüm / yeniden doğma / devam
 if(!ONLY||ONLY.split(',').includes('T13')){
 for(const cls of ['guardian','scout','weaver']){const {ctx,pg}=await open(NEW,{cls});
  await pg.tap('#trackBtn');let dead=false;
  await until(pg,()=>{const g=window.__kmTest.get();return g.zone==='forest'&&g.questPhase==='hunt'&&g.missionKills>=1},600);
  await pg.evaluate(()=>{document.getElementById('autoPath').click();window.__kmTest.setPlayer(830,600)}); // oto kapalı, savunmasız
  for(let i=0;i<300&&!dead;i++){await step(pg,20);const g=await G(pg);if(g.mode==='dead')dead=true;else await pg.evaluate(()=>{const g=window.__kmTest.get();const e=g.enemies.find(x=>!x.dead);})}
  const dg=await G(pg);await page_shot(pg,`olum_${cls}.png`,dead);
  let kills=dg.missionKills;
  if(dead){await pg.tap('#respawn');}
  const r=await G(pg);await pg.tap('#trackBtn');
  let ok2=await until(pg,()=>{const g=window.__kmTest.get();if(g.mode==='dead'){document.getElementById('respawn').click();window.__kmTest.questAction()}return g.quest>=1},800);
  rec('T13-'+cls,'Ölüm → köyde yeniden doğma → görev ilerlemesi korunur → görev tuşuyla tamamlanır',dead&&r.zone==='village'&&r.player.hp===r.player.maxHp&&r.missionKills===kills&&ok2?'PASS':'FAIL',{dead,killsAtDeath:kills,afterRespawn:{zone:r.zone,hp:r.player.hp,phase:r.questPhase,kills:r.missionKills},completed:ok2});
  await ctx.close()}

 }

 // ---------- T14 Çiçek menü: menü değiştirir, joystick değil
 if(!ONLY||ONLY.split(',').includes('T14')){
 {const {ctx,pg}=await open(NEW);const g0=await G(pg);const pages=[];
  const fb=await pg.$('#flowerMenu');const bb=await fb.boundingBox();
  for(let i=0;i<3;i++){await pg.tap('#flowerMenu');await step(pg,10);pages.push((await G(pg)).menuPage)}
  await pg.screenshot({path:shot('cicek_menu_sayfa.png')});
  // kaydırma (döndürme) jesti
  await pg.evaluate(([x,y])=>{const f=document.getElementById('flowerMenu');const ev=(t,cx)=>f.dispatchEvent(new PointerEvent(t,{bubbles:true,clientX:cx,clientY:y,pointerId:7,pointerType:'touch'}));ev('pointerdown',x);ev('pointerup',x+40);f.click()},[bb.x+bb.width/2,bb.y+bb.height/2]);
  await step(pg,10);const sw=await G(pg);
  const vis=await pg.evaluate(()=>({pad:getComputedStyle(document.getElementById('pad')).display}));
  const g1=await G(pg);const moved=Math.hypot(g1.player.x-g0.player.x,g1.player.y-g0.player.y);
  rec('T14','Çiçek: dokunuş/kaydırma ile menü sayfası değişir; karakter hareket etmez; joystick yok',pages.join()==='utilities,hidden,main'&&sw.menuPage==='utilities'&&moved<1&&!g1.moveTarget&&vis.pad==='none'?'PASS':'FAIL',{pages,swipe:sw.menuPage,playerMoved:moved,moveTarget:g1.moveTarget,joystick:vis.pad});await ctx.close()}

 }

 // ---------- T15 Duraklatma / envanter oto av sırasında
 if(!ONLY||ONLY.split(',').includes('T15')){
 {const {ctx,pg}=await open(NEW);await pg.tap('#trackBtn');await until(pg,()=>window.__kmTest.get().questPhase==='hunt',300);
  await pg.tap('#bagBtn');const a=await G(pg);await step(pg,100);const b=await G(pg);await pg.waitForTimeout(600);const b2=await G(pg);
  await pg.tap('#closeModal');await step(pg,2);const c=await G(pg);
  rec('T15','Oto av sırasında çanta: oyun durur (konum/HP sabit), kapanınca oto sürer',a.paused&&b.player.x===a.player.x&&b.player.hp===a.player.hp&&b2.player.x===a.player.x&&!c.paused&&c.autoPath?'PASS':'FAIL',{paused:a.paused,posFrozen:b2.player.x===a.player.x,hpFrozen:b2.player.hp===a.player.hp,resumedAuto:c.autoPath});await ctx.close()}

 }

 // ---------- T16 Android geri tuşu (tarayıcı geçmişi)
 if(!ONLY||ONLY.split(',').includes('T16')){
 {const {ctx,pg}=await open(NEW);const url0=pg.url();await pg.goBack().catch(()=>{});await pg.waitForTimeout(300);const a=await G(pg);const vis=await pg.evaluate(()=>!document.getElementById('modal').classList.contains('hidden'));
  await pg.goBack().catch(()=>{});await pg.waitForTimeout(300);const vis2=await pg.evaluate(()=>!document.getElementById('modal').classList.contains('hidden'));
  rec('T16','Geri tuşu: oyundan çıkmaz; duraklatma açar / açık pencereyi kapatır (Chromium geçmiş simülasyonu)',pg.url()===url0&&a.mode==='game'&&vis&&!vis2?'PASS':'FAIL',{url:pg.url()===url0,pauseOpened:vis,closedOnSecondBack:!vis2});await ctx.close()}

 }

 // ---------- T17 Bozuk kayıt
 if(!ONLY||ONLY.split(',').includes('T17')){
 {const {ctx,pg}=await open(NEW,{cls:null,init:()=>{if(!sessionStorage.getItem('i')){sessionStorage.setItem('i','1');localStorage.setItem('kirikMuhurQuestFlowV324Test','{"classId":"guardian",BOZUK')}}});
  const r=await pg.evaluate(()=>({notice:document.getElementById('km325SaveNotice').textContent,hidden:document.getElementById('km325SaveNotice').hidden,backup:localStorage.getItem('kirikMuhurQuestFlowV324Test_bozukYedek'),fatal:document.getElementById('fatal').textContent,mode:window.__kmTest.get().mode}));
  await pg.screenshot({path:shot('bozuk_kayit_bildirimi.png')});
  rec('T17','Bozuk kayıt: çökme yok, bildirim var, ham veri yedekte',!r.hidden&&r.backup==='{"classId":"guardian",BOZUK'&&!r.fatal&&r.mode==='select'&&!pg.errs.length?'PASS':'FAIL',r);await ctx.close()}
 {const {ctx,pg}=await open(NEW,{cls:null,init:()=>{if(!sessionStorage.getItem('i')){sessionStorage.setItem('i','1');localStorage.setItem('kirikMuhurQuestFlowV324Test',JSON.stringify({questSchema:324,classId:'weaver',level:'abc',coins:'x',questPhase:'bilinmeyen',inv:['staff','hayalet'],equipment:{weapon:'hayalet',armor:'staff'},zone:'mars',questRewards:'x'}))}}});
  const r=await pg.evaluate(()=>{const T=window.__kmTest;const g=T.get();document.getElementById('bagBtn').click();const bag=!!document.querySelector('[data-equip]');T.closeModal();T.questAction();T.step(.05);return {mode:g.mode,level:g.player.maxHp,coins:g.coins,zone:g.zone,inv:g.inventory,phaseAfterTap:T.get().questPhase,bag,fatal:document.getElementById('fatal').textContent}});
  rec('T18','Geçersiz alanlı kayıt: alanlar onarılır, çanta açılır, görev kilitlenmez',r.mode==='game'&&r.coins===45&&r.zone==='village'&&r.inv.join()==='staff'&&r.phaseAfterTap==='travel'&&r.bag&&!r.fatal&&!pg.errs.length?'PASS':'FAIL',{...r,errors:pg.errs});await ctx.close()}

 }

 // ---------- T19 Eski kayıt geçişi (3.23 test verisi), eski anahtar bayt-bayt korunur
 if(!ONLY||ONLY.split(',').includes('T19')){
 {const legacy=JSON.stringify({questSchema:323,classId:'scout',level:4,xp:30,coins:612,materials:9,quest:3,missionIndex:3,questPhase:'hunt',missionKills:1,kills:1,questRewards:['mission-0','mission-1','mission-2'],upgradeAtk:2,inv:['bow','armor','boots','talisman','wardcoat'],equipment:{weapon:'bow',armor:'wardcoat',talisman:'talisman',boots:null},zone:'forest',x:600,y:700,pet:true,mount:false,autoPath:false,autoBattle:false});
  const {ctx,pg}=await open(NEW,{cls:null,init:(l)=>{if(!sessionStorage.getItem('i')){sessionStorage.setItem('i','1');localStorage.clear();localStorage.setItem('kirikMuhurQuestFlowV323Test',l)}},});
  await pg.evaluate(l=>{},legacy);
  await ctx.close();
  const ctx2=await browser.newContext(MOBILE(393,852));await ctx2.addInitScript(l=>{if(!sessionStorage.getItem('i')){sessionStorage.setItem('i','1');localStorage.clear();localStorage.setItem('kirikMuhurQuestFlowV323Test',l)}},legacy);
  const pg2=await ctx2.newPage();await pg2.goto('file://'+NEW);await pg2.waitForTimeout(600);
  const r=await pg2.evaluate(()=>{const g=window.__kmTest.get();return {mode:g.mode,cls:g.inventory[0],coins:g.coins,quest:g.quest,phase:g.questPhase,kills:g.missionKills,rewards:g.questRewards,zone:g.zone,pos:[g.player.x,g.player.y],atk:g.player.attack,legacyRaw:localStorage.getItem('kirikMuhurQuestFlowV323Test'),newKey:!!localStorage.getItem('kirikMuhurQuestFlowV324Test')}});
  rec('T19','Eski 3.23 kaydı: seviye/altın/görev/eşya geçer, eski anahtar değişmez, ödül yeniden işlenmez',r.mode==='game'&&r.coins===612&&r.quest===3&&r.phase==='hunt'&&r.kills===1&&r.rewards.length===3&&r.zone==='forest'&&r.legacyRaw===legacy&&r.newKey?'PASS':'FAIL',{...r,legacyRaw:r.legacyRaw===legacy?'AYNEN KORUNDU':'DEĞİŞTİ'});await ctx2.close()}

 }

 // ---------- T20 50 kez kaydet/yükle döngüsü yarım görevde
 if(!ONLY||ONLY.split(',').includes('T20')){
 {const {ctx,pg}=await open(NEW,{url:HTTPS+'/Kirik_Muhur_3_30_NPC_Efekt_TEST.html',init:()=>{try{window.__savedAtLoad=JSON.parse(localStorage.getItem('kirikMuhurQuestFlowV324Test'))}catch(e){window.__savedAtLoad=null}}});await pg.tap('#trackBtn');const snaps=[];
  for(let i=0;i<50;i++){await step(pg,i%5===4?400:30);await pg.evaluate(()=>{if(window.__kmTest.get().rewardOpen)window.__kmTest.closeModal();document.getElementById('pauseBtn').click()});const a=await G(pg);await pg.reload();await pg.waitForTimeout(120);const b=await G(pg);
   if(b.rewardOpen)await pg.evaluate(()=>window.__kmTest.closeModal());
   const df=[];const sv=await pg.evaluate(()=>window.__savedAtLoad);if(!sv)df.push('kayit-yok');else{const pairs=[['x',sv.x,Math.round(a.player.x)],['y',sv.y,Math.round(a.player.y)],['hp',sv.hp,Math.round(a.player.hp)],['coins',sv.coins,a.coins],['quest',sv.missionIndex,a.quest],['phase',sv.questPhase,a.questPhase],['kills',sv.missionKills,a.missionKills],['auto',sv.autoPath,a.autoPath],['autoBattle',sv.autoBattle,a.autoBattle],['materials',sv.materials,a.materials],['rewards',JSON.stringify(sv.questRewards),JSON.stringify(a.questRewards)],['inv',JSON.stringify(sv.inv),JSON.stringify(a.inventory)]];for(const [k,x,y] of pairs)if(x!==y)df.push(k+':'+x+'/'+y)}snaps.push({df,ok:!df.length&&b.mode!=='select'&&new Set(b.questRewards).size===b.questRewards.length,a:[a.quest,a.questPhase,a.coins],b:[b.quest,b.questPhase,b.coins]});
   await pg.evaluate(()=>{const T=window.__kmTest;if(T.get().mode==='dead')document.getElementById('respawn').click();if(T.get().rewardOpen)T.closeModal();if(!T.get().autoPath)T.questAction()})}
  const bad=snaps.filter(s=>!s.ok);const g=await G(pg);
  rec('T20','HTTPS origin: 50 kez yarım görevde yeniden yükleme, diskteki kayıt birebir, çift ödül yok',!bad.length&&g.quest>=2&&new Set(g.questRewards).size===g.questRewards.length&&!pg.errs.length?'PASS':'FAIL',{cycles:50,mismatches:bad.slice(0,3),finalQuest:g.quest,rewards:g.questRewards});await ctx.close()}

 }

 // ---------- T21 Gerçek diskli kalıcı kayıt: HTTPS origin, tarayıcı süreci kapatılıp yeniden açılır
 if(!ONLY||ONLY.split(',').includes('T21')){
 {const dir=fs.mkdtempSync(path.join(os.tmpdir(),'km325prof-'));const url=HTTPS+'/Kirik_Muhur_3_30_NPC_Efekt_TEST.html';
  let c1=await chromium.launchPersistentContext(dir,{...MOBILE(393,852),ignoreHTTPSErrors:true});let p1=c1.pages()[0]||await c1.newPage();
  await p1.goto(url);await p1.waitForTimeout(600);await p1.tap('[data-class="weaver"]');await p1.waitForTimeout(200);
  await p1.tap('#trackBtn');
  for(let i=0;i<600;i++){await step(p1,10);const g=await G(p1);if(g.rewardOpen){await p1.tap('#km325RewardOk')}if(g.quest>=1&&!g.rewardOpen)break}
  await p1.tap('#trackBtn');await step(p1,40);
  await p1.evaluate(()=>{document.getElementById('bagBtn').click();document.querySelector('[data-equip="1"]').click();window.__kmTest.closeModal();document.getElementById('autoPath').click()}); // zırh tak + manuel devral
  await step(p1,5);const before=await G(p1);const origin=await p1.evaluate(()=>location.origin+' secure='+window.isSecureContext);
  await c1.close(); // tarayıcı süreci kapanır; veri diskteki profilde
  const c2=await chromium.launchPersistentContext(dir,{...MOBILE(393,852),ignoreHTTPSErrors:true});const p2=c2.pages()[0]||await c2.newPage();
  await p2.goto(url);await p2.waitForTimeout(700);const after=await G(p2);
  const keys=['mode','zone','quest','questPhase','missionKills','coins','materials','autoPath','autoBattle','menuPage'];
  const diff=keys.filter(k=>JSON.stringify(before[k])!==JSON.stringify(after[k]));
  if(JSON.stringify(before.questRewards)!==JSON.stringify(after.questRewards))diff.push('questRewards');
  if(JSON.stringify(before.inventory)!==JSON.stringify(after.inventory))diff.push('inventory');
  for(const k of ['attack','def','maxHp','maxMp'])if(before.player[k]!==after.player[k])diff.push('player.'+k);
  if(Math.round(before.player.hp)!==Math.round(after.player.hp))diff.push('hp');
  if(Math.round(before.player.x)!==Math.round(after.player.x)||Math.round(before.player.y)!==Math.round(after.player.y))diff.push('pos');
  if(before.power!==after.power)diff.push('power');
  await p2.screenshot({path:shot('kalici_kayit_yeniden_acilis.png')});
  rec('T21','Gerçek diskli kayıt: yerel HTTPS origin, tarayıcı kapat/aç, alanlar birebir',!diff.length&&before.quest>=1?'PASS':'FAIL',{origin,diff,before:{quest:before.quest,phase:before.questPhase,coins:before.coins,level:before.power,auto:before.autoPath,inv:before.inventory},after:{quest:after.quest,phase:after.questPhase,coins:after.coins,level:after.power,auto:after.autoPath,inv:after.inventory},profile:'Playwright kalıcı Chromium profili (disk)'});
  await c2.close();}

 }

 // ---------- T22 Uzun boss/otomatik regresyon: 3 sınıf × 15 görev (10 ana + 5 devam)
 if(!ONLY||ONLY.split(',').includes('T22')){
 for(const cls of ['guardian','scout','weaver']){const {ctx,pg}=await open(NEW,{cls});
  const r=await pg.evaluate(async()=>{const T=window.__kmTest;const log=[];
   for(let mi=0;mi<15;mi++){if(T.get().rewardOpen)T.closeModal();const q0=T.get().quest,c0=T.get().coins;const info=T.get().questInfo;T.questAction();let t=0;
    while(t<8000&&T.get().quest===q0){const g=T.get();if(g.rewardOpen){T.closeModal()}if(g.mode==='dead'){document.getElementById('respawn').click();T.questAction()}T.step(.05);t++}
    const g=T.get();log.push({i:q0,title:info.title,kind:info.kind,done:g.quest===q0+1,s:Math.round(t*.05),popup:g.rewardOpen,reward:g.lastReward&&g.lastReward.id,coins:g.coins-c0})}
   const g=T.get();return {log,unique:new Set(g.questRewards).size===g.questRewards.length,rewards:g.questRewards.length,gear:g.inventory}});
  const ok=r.log.every(l=>l.done&&l.popup&&l.reward==='mission-'+l.i)&&r.unique;
  rec('T22-'+cls,'10 ana + 5 devam görevi oto akış: her birinde tek ödül + popup',ok?'PASS':'FAIL',{done:r.log.filter(l=>l.done).length+'/15',seconds:r.log.map(l=>l.s).join(','),kinds:[...new Set(r.log.map(l=>l.kind))],unique:r.unique,gear:r.gear,errors:pg.errs});
  await ctx.close()}

 }
 fs.writeFileSync(path.join(OUT,'test_sonuclari.json'),JSON.stringify(results,null,1));
 const s={PASS:0,FAIL:0};for(const r of results)s[r.status]=(s[r.status]||0)+1;console.log('ÖZET',s);
 await browser.close();
})();
async function page_shot(pg,n,cond){if(cond)await pg.screenshot({path:shot(n)})}
