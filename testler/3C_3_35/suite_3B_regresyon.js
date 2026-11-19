// Kırık Mühür 3.26 — Aşama 3B test paketi (Playwright + Chromium, mobil dokunmatik emülasyon)
// Kullanım: node suite326.js <3.26.html> <cikti_klasoru>
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const [,,NEW,OUT]=process.argv;fs.mkdirSync(path.join(OUT,'GORSEL_DENETIM'),{recursive:true});
const results=[];const rec=(id,name,ok,ev)=>{const st=ok?'PASS':'FAIL';results.push({id,name,status:st,evidence:ev});console.log(st.padEnd(5),id,name,'—',JSON.stringify(ev).slice(0,600))};
const MOBILE=(w,h)=>({viewport:{width:w,height:h},hasTouch:true,isMobile:true,deviceScaleFactor:2});
let browser;
async function open({cls='guardian',w=393,h=852,init}={}){const ctx=await browser.newContext(MOBILE(w,h));if(init)await ctx.addInitScript(init);const pg=await ctx.newPage();pg.errs=[];pg.on('pageerror',e=>pg.errs.push(e.message));pg.on('console',m=>{if(m.type()==='error')pg.errs.push(m.text())});
 await pg.goto('file://'+NEW);await pg.waitForTimeout(600);if(cls){await pg.tap(`[data-class="${cls}"]`);await pg.waitForTimeout(200)}return {ctx,pg}}
const G=pg=>pg.evaluate(()=>window.__kmTest.get());
(async()=>{browser=await chromium.launch();

 // B01 Bölge kilitleri gerçek: geçit, harita rotası, harita etiketi
 {const {ctx,pg}=await open();const r=await pg.evaluate(()=>{const T=window.__kmTest,o={};
   o.unlocked0=T.get().unlocked;T.enter('forest',1120,560);document.getElementById('autoPath').click();T.setPlayer(1185,548);for(let i=0;i<30;i++)T.step(.05);
   o.walkIntoLockedGate={zone:T.get().zone,log:document.getElementById('battleLogBody').innerText.split('\n')[0]};
   T.mapChoose('arena','scribe');T.mapTravel();o.mapRouteToLocked=T.get().mapRoute;
   document.getElementById('mapBtn').click();o.mapLabels=[...document.querySelectorAll('[data-world-zone] small')].map(x=>x.textContent);T.closeModal();
   T.setQuest(1);o.unlocked1=T.get().unlocked;T.setPlayer(1185,548);for(let i=0;i<30;i++)T.step(.05);o.zoneAt1=T.get().zone;
   T.enter('arena',712,330);o.ashGateAt1=T.transit('ashpass');o.zoneAfterAsh=T.get().zone;
   T.setQuest(10);o.unlocked10=T.get().unlocked;o.ashGateAt10=T.transit('ashpass');o.zoneAt10=T.get().zone;return o});
  await pg.screenshot({path:path.join(OUT,'GORSEL_DENETIM','kilit_kul_gecidi_acildi.png')});
  rec('B01','Bölge kilitleri: kilitli geçitten geçilmez, harita rotası reddedilir, kilit haritada görünür; görev ilerleyince açılır',
   r.unlocked0.join()==='village,forest'&&r.walkIntoLockedGate.zone==='forest'&&/kilitli/.test(r.walkIntoLockedGate.log)&&!r.mapRouteToLocked&&r.mapLabels.filter(x=>/KİLİTLİ/.test(x)).length===2&&r.zoneAt1==='arena'&&r.ashGateAt1===false&&r.zoneAfterAsh==='arena'&&r.ashGateAt10===true&&r.zoneAt10==='ashpass'&&!pg.errs.length,r);await ctx.close()}

 // B02 Rota grafiği: en kısa geçit zinciri ve köyden Kül Geçidi'ne otomatik yolculuk
 {const {ctx,pg}=await open();const r=await pg.evaluate(()=>{const T=window.__kmTest,o={};T.setQuest(10);
   o.hops={v2a:T.nextGate('village','ashpass'),f2a:T.nextGate('forest','ashpass'),a2a:T.nextGate('arena','ashpass'),p2v:T.nextGate('ashpass','village'),a2v:T.nextGate('arena','village')};
   T.enter('village',800,520);T.questAction();const zones=[];let t=0;while(t<6000&&T.get().quest===10){const g=T.get();if(zones[zones.length-1]!==g.zone)zones.push(g.zone);if(g.rewardOpen)T.closeModal();T.step(.05);t++}
   o.path=zones;o.done=T.get().quest===11;o.seconds=Math.round(t*.05);return o});
  rec('B02','Rota: köy→orman→tapınak→Kül Geçidi otomatik, geri dönüş tapınaktan köye kısa yol',r.hops.v2a.to==='forest'&&r.hops.f2a.to==='arena'&&r.hops.a2a.to==='ashpass'&&r.hops.p2v.to==='arena'&&r.hops.a2v.to==='village'&&r.path.join('>')==='village>forest>arena>ashpass'&&r.done,{path:r.path.join('>'),done:r.done,seconds:r.seconds,hops:Object.fromEntries(Object.entries(r.hops).map(([k,v])=>[k,v&&v.to]))});await ctx.close()}

 // B03 Çizim = çarpışma: Kül Geçidi engelleri piksel olarak çizili ve bloklu; tüm NPC/doğma/görev/geçit noktaları yürünebilir
 {const {ctx,pg}=await open();const r=await pg.evaluate(async()=>{const T=window.__kmTest,C=T.content(),o={bad:[]};
   const im=new Image();im.src=ASSETS.ashpass;await im.decode();const c=document.createElement('canvas');c.width=1440;c.height=960;const g=c.getContext('2d');g.drawImage(im,0,0);
   const px=(x,y)=>[...g.getImageData(x,y,1,1).data].slice(0,3);o.obst=[];
   for(const ob of C.obstacles.ashpass){const cx=ob.x+ob.w/2|0,cy=ob.y+ob.h/2|0,[R,G,B]=px(cx,cy);const blk=T.blockedAt('ashpass',cx,cy);const pal=ob.kind==='lava'?['28,15,14','42,21,18','138,44,22','216,85,30','255,154,58','255,210,122','255,106,26','74,54,50','18,10,10']:['33,28,36','74,64,72','63,54,64','85,74,80','122,106,106','47,40,48','255,154,60','18,14,18'];let hitc=0,tot=0;for(let yy=ob.y+6;yy<ob.y+ob.h-6;yy+=6)for(let xx=ob.x+6;xx<ob.x+ob.w-6;xx+=6){tot++;if(pal.includes(px(xx,yy).join(',')))hitc++}const drawn=hitc/tot>0.6;o.obst.push({kind:ob.kind,cover:+(hitc/tot).toFixed(2)});if(!blk||!drawn)o.bad.push('engel '+ob.kind+'@'+cx+','+cy)}
   const chk=(z,x,y,label)=>{if(T.blockedAt(z,x,y))o.bad.push(label+'@'+z+':'+x+','+y)};
   for(const [z,list] of Object.entries(C.npcs))for(const n of list)chk(z,n.x,n.y,'npc '+n.id);
   for(const [z,list] of Object.entries(C.spawns))for(const s of list)chk(z,s.x,s.y,'spawn '+s.id);
   for(const [z,list] of Object.entries(C.gates))for(const gt of list){chk(z,gt.x,gt.y,'gate');chk(gt.to,gt.ax,gt.ay,'arrival')}
   o.checked=Object.values(C.npcs).flat().length+Object.values(C.spawns).flat().length+Object.values(C.gates).flat().length*2;return o});
  // görev noktaları
  rec('B03','Kül Geçidi: kaya/lav çizimi ile çarpışma aynı veriden; NPC, doğma, geçit ve varış noktalarının hepsi yürünebilir',!r.bad.length,{bad:r.bad,obstacles:r.obst,pointsChecked:r.checked});await ctx.close()}

 // B04 Hikâyeye bağlı bosslar
 {const {ctx,pg}=await open();const r=await pg.evaluate(()=>{const T=window.__kmTest,o={},has=id=>T.get().enemies.some(e=>e.id===id&&!e.dead);
   T.enter('arena',712,330);o.bossBeforeQuest=has('boss1');T.setQuest(1);T.questAction();T.enter('arena',712,330);o.bossDuringQuest=has('boss1');T.kill('boss1');T.enter('arena',712,330);o.bossAfterKill=has('boss1');
   T.setQuest(11);T.enter('ashpass',250,560);o.ashlordOtherQuest=has('ashlord1');T.setQuest(15);T.enter('ashpass',250,560);o.ashlordReady=has('ashlord1');T.questAction();T.enter('ashpass',250,560);o.ashlordDuringQuest=has('ashlord1');
   T.setQuest(20);T.enter('arena',712,330);o.sentinelsLater=T.get().enemies.filter(e=>e.id.startsWith('sent')).length;T.setQuest(0);T.enter('arena',712,330);o.sentinelsAt0=T.get().enemies.filter(e=>e.id.startsWith('sent')).length;return o});
  rec('B04','Bosslar yalnız kendi hikâye görevinde doğar; nöbetçi/diken kurdu ilerlemeye göre ortaya çıkar',!r.bossBeforeQuest&&r.bossDuringQuest&&!r.bossAfterKill&&!r.ashlordOtherQuest&&!r.ashlordReady&&r.ashlordDuringQuest&&r.sentinelsLater===2&&r.sentinelsAt0===0,r);await ctx.close()}

 // B05 Yaratık ve NPC çizimleri yüklü; bölge başına tür çeşitliliği
 {const {ctx,pg}=await open();const r=await pg.evaluate(()=>{const T=window.__kmTest,o={};o.sprites=['thorn','sentinel','wisp','ashlord','npcSmith','npcRanger','npcScribe','npcHerbal','npcKeeper','npcHermit'].filter(k=>spriteImages[k]&&spriteImages[k].complete&&spriteImages[k].naturalWidth===256);
   T.setQuest(16);const types={};for(const z of ['village','forest','arena','ashpass']){T.enter(z,{village:475,forest:235,arena:712,ashpass:250}[z],{village:580,forest:610,arena:330,ashpass:560}[z]);types[z]=[...new Set(T.get().enemies.map(e=>e.id.replace(/\d+$/,'').replace('sent','sentinel')))];o.npcs=(o.npcs||0)+T.get().npcs.length}o.types=types;return o});
  rec('B05','Yeni çizimler yüklü (4 yaratık + 6 NPC görünümü); bölgelerde farklı yaratık türleri; 7 NPC (4 yeni)',r.sprites.length===10&&r.types.forest.join()==='shade,thorn'&&r.types.arena.join()==='sentinel'&&r.types.ashpass.join()==='wisp'&&r.npcs===7,r);await ctx.close()}

 // B06 Tam zincir ×3 sınıf: 16 hikâye + 10 devam, tek ödül, popup, tekrarsız devam döngüsü
 for(const cls of ['guardian','scout','weaver']){const {ctx,pg}=await open({cls});const r=await pg.evaluate(()=>{const T=window.__kmTest,log=[];
   for(let i=0;i<26;i++){if(T.get().rewardOpen)T.closeModal();const g0=T.get(),q0=g0.quest,info=g0.questInfo;T.questAction();let t=0,d=0;
    while(t<8000&&T.get().quest===q0){const g=T.get();if(g.rewardOpen&&!(g.lastReward&&g.lastReward.id==='mission-'+q0))T.closeModal();if(g.mode==='dead'){d++;document.getElementById('respawn').click();T.questAction()}T.step(.05);t++}
    const g=T.get();log.push({i:q0,title:info.title,kind:info.kind,zone:info.zone,npc:info.npc,ok:g.quest===q0+1,pop:!!(g.lastReward&&g.lastReward.id==='mission-'+q0),s:Math.round(t*.05),d});if(g.quest===q0)break}
   const g=T.get();return {log,unique:new Set(g.questRewards).size===g.questRewards.length,level:g.player.maxHp}});
  const L=r.log,rep=L.slice(16);const sig=rep.map(l=>l.zone+'/'+l.title.split(' • ')[0]);const consecutiveSame=sig.some((s,i)=>i&&s===sig[i-1]);
  const kinds=[...new Set(L.map(l=>l.kind))],npcs=[...new Set(L.map(l=>l.npc))],zones=[...new Set(L.map(l=>l.zone))];
  rec('B06-'+cls,'26 görev (16 hikâye + 10 devam): hepsi biter, tek ödül + popup, 5 görev türü, 7 teslim NPC’si, 4 bölge, ardışık aynı devam görevi yok',
   L.length===26&&L.every(l=>l.ok&&l.pop)&&r.unique&&kinds.length===5&&npcs.length>=7&&zones.length===4&&!consecutiveSame&&new Set(sig).size===10&&!pg.errs.length,
   {done:L.filter(l=>l.ok).length,kinds,npcs,zones,deaths:L.reduce((a,l)=>a+l.d,0),seconds:L.map(l=>l.s).join(','),repeatDistinct:new Set(sig).size,errors:pg.errs});
  if(cls==='guardian')fs.writeFileSync(path.join(OUT,'zincir_guardian.json'),JSON.stringify(r,null,1));await ctx.close()}

 // B07 Manuel oyun: konuşma/keşif noktaları ve diken kurdu avı manuel sayılır; oto savaş saldırgana karşılık verir
 {const {ctx,pg}=await open();const r=await pg.evaluate(()=>{const T=window.__kmTest,o={};
   T.setQuest(10);T.enter('ashpass',250,560);T.questAction();document.getElementById('autoPath').click();T.setPlayer(330,690);for(let i=0;i<5;i++)T.step(.05);o.talk=[T.get().questPhase,T.get().missionKills];
   T.closeModal();T.setQuest(12);T.questAction();document.getElementById('autoPath').click();T.setPlayer(720,255);for(let i=0;i<3;i++)T.step(.05);T.setPlayer(1330,485);for(let i=0;i<3;i++)T.step(.05);o.explore=[T.get().questPhase,T.get().missionKills];
   T.closeModal();T.setQuest(13);T.enter('forest',235,610);T.questAction();document.getElementById('autoPath').click();for(let i=0;i<3;i++)T.step(.05);T.kill('thorn1');T.kill('thorn2');for(let i=0;i<3;i++)T.step(.05);o.thornManual=[T.get().questPhase,T.get().missionKills];
   // öz savunma: diken kurdu görevi sürerken yakındaki gölge saldırır → oto savaş karşılık verir
   T.closeModal();T.setQuest(13);T.enter('forest',820,600);T.questAction();for(let i=0;i<3;i++)T.step(.05);const before=T.get().enemies.find(e=>e.id==='shade2').hp;for(let i=0;i<60;i++){T.setPlayer(820,600);T.step(.05)}o.shadeHp=[before,T.get().enemies.find(e=>e.id==='shade2').hp];return o});
  rec('B07','Manuel konuşma/keşif/diken kurdu avı sayılır; oto savaş görev dışı saldırgana karşılık verir',r.talk[0]==='return'&&r.explore[0]==='return'&&r.explore[1]===2&&r.thornManual[0]==='return'&&r.shadeHp[1]<r.shadeHp[0],r);await ctx.close()}

 // B08 Kayıt geçişi 3.25 → 3.26 (gerçek localStorage). 3.35: Sv≥5 eski kayda kaçırılmış Sv5 seviye ödülü (150 altın) yüklemede bir kez verilir.
 for(const [name,save,check] of [
  ['bitmis-eski-devam',{questSchema:325,classId:'scout',level:9,xp:10,coins:2000,materials:20,missionIndex:12,quest:12,questPhase:'return',missionKills:2,questRewards:['mission-0','mission-1','mission-2','mission-3','mission-4','mission-5','mission-6','mission-7','mission-8','mission-9','mission-10','mission-11'],inv:['bow','armor','boots'],equipment:{weapon:'bow'},zone:'arena',x:500,y:700,hp:150,mp:50},
    g=>g.quest===13&&g.coins===2000+111+18*1+150&&g.questRewards.includes('lv335-5')&&g.questRewards.includes('mission-12')&&g.questPhase==='ready'],
  ['yarim-eski-devam',{questSchema:325,classId:'weaver',level:8,coins:900,missionIndex:11,quest:11,questPhase:'hunt',missionKills:1,questRewards:['mission-10'],inv:['staff'],equipment:{weapon:'staff'},zone:'forest',x:500,y:600},
    g=>g.quest===11&&g.coins===900+150&&g.questRewards.filter(x=>x==='lv335-5').length===1&&g.questPhase==='ready'&&g.missionKills===0],
  ['kilitli-bolgede-kayit',{questSchema:325,classId:'guardian',level:1,coins:45,missionIndex:0,quest:0,questPhase:'ready',questRewards:[],inv:['sword'],equipment:{weapon:'sword'},zone:'arena',x:600,y:600},
    g=>g.zone==='village'&&g.quest===0]]){
  const {ctx,pg}=await open({cls:null,init:(sv)=>{if(!sessionStorage.getItem('i')){sessionStorage.setItem('i','1');localStorage.clear();localStorage.setItem('kirikMuhurQuestFlowV324Test',sv)}},});
  await ctx.close();
  const ctx2=await browser.newContext(MOBILE(393,852));await ctx2.addInitScript(sv=>{if(!sessionStorage.getItem('i')){sessionStorage.setItem('i','1');localStorage.clear();localStorage.setItem('kirikMuhurQuestFlowV324Test',sv)}},JSON.stringify(save));
  const p2=await ctx2.newPage();const errs=[];p2.on('pageerror',e=>errs.push(e.message));await p2.goto('file://'+NEW);await p2.waitForTimeout(700);const g=await G(p2);
  const disk=await p2.evaluate(()=>JSON.parse(localStorage.getItem('kirikMuhurQuestFlowV324Test')));
  rec('B08-'+name,'3.25 kaydı 3.26’ya geçer: '+name,check(g)&&disk.questSchema>=326&&new Set(g.questRewards).size===g.questRewards.length&&!errs.length,{quest:g.quest,phase:g.questPhase,coins:g.coins,zone:g.zone,rewards:g.questRewards.slice(-3),schema:disk.questSchema,errors:errs});await ctx2.close()}

 // B09 Kül Geçidi portre ölçüleri: HUD taşma/çakışma + görüntü
 for(const [w,h] of [[320,568],[360,800],[393,852],[412,915]]){const {ctx,pg}=await open({w,h});
  await pg.evaluate(()=>{const T=window.__kmTest;T.setQuest(11);T.enter('ashpass',250,560);T.questAction();for(let i=0;i<80;i++)T.step(.05)});await pg.waitForTimeout(300);
  await pg.screenshot({path:path.join(OUT,'GORSEL_DENETIM',`kul_gecidi_${w}x${h}.png`)});
  const r=await pg.evaluate(()=>{const vis=e=>{const s=getComputedStyle(e);return s.display!=='none'&&s.visibility!=='hidden'&&e.getBoundingClientRect().width>0};
   const els=[...document.querySelectorAll('#app button')].filter(vis).filter(e=>!e.closest('#modal'));const W=innerWidth,H=innerHeight,out=[],over=[];
   const R=els.map(e=>({id:e.id||e.textContent.trim().slice(0,8),r:e.getBoundingClientRect(),e}));
   for(const a of R)if(a.r.left<-1||a.r.top<-1||a.r.right>W+1||a.r.bottom>H+1)out.push(a.id);
   for(let i=0;i<R.length;i++)for(let j=i+1;j<R.length;j++){const a=R[i],b=R[j];if(a.e.contains(b.e)||b.e.contains(a.e))continue;const ix=Math.min(a.r.right,b.r.right)-Math.max(a.r.left,b.r.left),iy=Math.min(a.r.bottom,b.r.bottom)-Math.max(a.r.top,b.r.top);if(ix>2&&iy>2)over.push(a.id+'×'+b.id)}
   return {out,over,count:R.length,scroll:document.documentElement.scrollWidth>W+1}});
  rec(`B09-${w}x${h}`,`Kül Geçidi portre ${w}×${h}: düğme taşması/çakışması yok`,!r.out.length&&!r.over.length&&!r.scroll&&!pg.errs.length,r);await ctx.close()}

 fs.writeFileSync(path.join(OUT,'test_sonuclari_3B.json'),JSON.stringify(results,null,1));
 const s={PASS:0,FAIL:0};for(const x of results)s[x.status]++;console.log('ÖZET',s);await browser.close()})();
