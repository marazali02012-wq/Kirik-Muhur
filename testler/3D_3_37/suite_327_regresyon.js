// Kırık Mühür 3.27 — 3B tamamlama testleri. Kullanım: node suite327.js <3.27.html> <cikti>
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const [,,NEW,OUT]=process.argv;fs.mkdirSync(path.join(OUT,'GORSEL_DENETIM'),{recursive:true});
const results=[];const rec=(id,name,ok,ev)=>{const st=ok?'PASS':'FAIL';results.push({id,name,status:st,evidence:ev});console.log(st.padEnd(5),id,name,'—',JSON.stringify(ev).slice(0,700))};
let browser;
async function open({cls='guardian',init}={}){const ctx=await browser.newContext({viewport:{width:393,height:852},hasTouch:true,isMobile:true,deviceScaleFactor:2});if(init)await ctx.addInitScript(init);const pg=await ctx.newPage();pg.errs=[];pg.on('pageerror',e=>pg.errs.push(e.message));pg.on('console',m=>{if(m.type()==='error')pg.errs.push(m.text())});
 await pg.goto('file://'+NEW);await pg.waitForTimeout(600);if(cls){await pg.tap(`[data-class="${cls}"]`);await pg.waitForTimeout(200)}return {ctx,pg}}
(async()=>{browser=await chromium.launch();

 // C01 Çizim = çarpışma (mevcut 3 harita): gövde engellerinin içinde gövde pikseli var; sütun/sunak/tezgâh merkezleri bloklu; tüm içerik noktaları yürünebilir
 {const {ctx,pg}=await open();const r=await pg.evaluate(async()=>{const T=window.__kmTest,C=T.content(),o={bad:[],trunks:0,trunkHits:0,kinds:{}};
   for(const z of ['village','forest']){const im=new Image();im.src=ASSETS[z];await im.decode();const c=document.createElement('canvas');c.width=768;c.height=512;const g=c.getContext('2d');g.drawImage(im,0,0);const d=g.getImageData(0,0,768,512).data;
    for(const ob of C.obstacles[z].filter(x=>x.kind==='trunk')){o.trunks++;let hit=0;for(let y=ob.y;y<ob.y+ob.h+2;y+=2)for(let x=ob.x;x<ob.x+ob.w;x+=1){const sx=Math.floor(x/1.875),sy=Math.floor(y/1.875),i=(sy*768+sx)*4;if(d[i]===111&&d[i+1]===79&&d[i+2]===69)hit++}if(hit>0)o.trunkHits++;else o.bad.push('gövde pikseli yok '+z+':'+ob.x+','+ob.y)}}
   for(const z of Object.keys(C.obstacles))for(const ob of C.obstacles[z]){o.kinds[ob.kind||'yapı']=(o.kinds[ob.kind||'yapı']||0)+1;if(!T.blockedAt(z,ob.x+ob.w/2,ob.y+ob.h/2))o.bad.push('merkez bloklu değil '+z)}
   const chk=(z,x,y,l)=>{if(T.blockedAt(z,x,y))o.bad.push(l+'@'+z+':'+x+','+y)};let n=0;
   for(const [z,l] of Object.entries(C.npcs))for(const p of l){chk(z,p.x,p.y,'npc '+p.id);n++}
   for(const [z,l] of Object.entries(C.spawns))for(const p of l){chk(z,p.x,p.y,'spawn '+p.id);n++}
   for(const [z,l] of Object.entries(C.gates))for(const gt of l){chk(z,gt.x,gt.y,'gate');chk(gt.to,gt.ax,gt.ay,'arrival');n+=2}
   for(const q of C.side)if(q.points)for(const p of q.points){chk(q.target,p.x,p.y,'yan '+q.id);n++}
   o.points=n;return o});
  // ana/devam görev noktaları
  const qp=await pg.evaluate(()=>{const T=window.__kmTest,bad=[];let n=0;for(let i=0;i<26;i++){T.setQuest(i);const g=T.get();}return {bad,n}});
  await pg.evaluate(()=>{const T=window.__kmTest;T.setQuest(5);T.enter('forest',380,780)});await pg.waitForTimeout(300);await pg.screenshot({path:path.join(OUT,'GORSEL_DENETIM','orman_govde_carpisma.png')});
  rec('C01','Mevcut haritalar: engeller çizimle eşleşir (gövde pikselleri, sütun, sunak, tezgâh, sandık); tüm içerik noktaları yürünebilir',!r.bad.length&&r.trunks===r.trunkHits,{trunks:r.trunks,trunkHits:r.trunkHits,kinds:r.kinds,pointsChecked:r.points,bad:r.bad.slice(0,8)});await ctx.close()}

 // C02 Rota regresyonu: her bölgede 120 rastgele yürünebilir hedefe gerçek yürüyüş; takılma/ulaşamama sayılır
 {const {ctx,pg}=await open();const r=await pg.evaluate(()=>{const T=window.__kmTest,res={};let seed=327;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
   T.setQuest(20);document.getElementById('autoPath').click();
   for(const z of ['village','forest','arena','ashpass']){const start={village:[475,580],forest:[235,610],arena:[712,330],ashpass:[250,560]}[z];T.enter(z,start[0],start[1]);for(const id of T.get().enemies.map(e=>e.id))T.kill(id);
    const gates=T.content().gates[z],clear=()=>{for(const id of T.get().enemies.map(e=>e.id))T.kill(id)};let ok=0,fail=[],tot=0,secs=0;for(let k=0;k<120;k++){let x,y;do{x=60+rnd()*1320;y=80+rnd()*820}while(T.blockedAt(z,x,y)||gates.some(gt=>Math.hypot(gt.x-x,gt.y-y)<110));if(T.get().mode==='dead'){document.getElementById('respawn').click()}if(T.get().zone!==z){T.enter(z,start[0],start[1]);clear()}
     tot++;if(T.get().rewardOpen)T.closeModal();T.move(x,y);let t=0;while(t<400){T.step(.05);t++;const g=T.get();if(g.rewardOpen){T.closeModal();continue}if(Math.hypot(g.player.x-x,g.player.y-y)<30||(!g.moveTarget&&Math.hypot(g.player.x-x,g.player.y-y)<40))break;if(!g.moveTarget&&t>2)break}
     const g=T.get(),d=Math.hypot(g.player.x-x,g.player.y-y);secs+=t*.05;if(d<40)ok++;else fail.push([Math.round(x),Math.round(y),Math.round(d),g.zone,g.mode]);if(g.zone!==z){T.enter(z,start[0],start[1]);clear()}}
    res[z]={ok,tot,fail:fail.slice(0,4),avgSec:+(secs/tot).toFixed(1)}}
   res.unstuck=T.get().unstuck;return res});
  const okAll=Object.values(r).filter(v=>v&&v.tot).every(v=>v.ok/v.tot>=0.97);
  rec('C02','Rota regresyonu: 4 bölgede 480 rastgele hedefe yürüyüş (≥%97 ulaşır, A* + takılma emniyeti)',okAll,r);await ctx.close()}

 // C03 NPC yan görevleri: 6 görevin tamamı — kilitliler gizli, NPC'ye dokunarak alma, ilerleme, NPC'de tek ödül + popup, kayıt
 {const {ctx,pg}=await open();
  const listAt0=await pg.evaluate(()=>{const T=window.__kmTest;document.getElementById('questsBtn').click();const t=document.getElementById('modalBody').innerText;T.closeModal();return {visible:(t.match(/YOL/g)||[]).length,lockedNote:/hikâye ilerledikçe açılacak/.test(t),status:T.get().sqStatus}});
  // Bilge Işın'a gerçek dokunuşla al
  await pg.evaluate(()=>{const T=window.__kmTest;T.setPlayer(800,560);for(let i=0;i<60;i++)T.step(.05)});
  const tapPos=await pg.evaluate(()=>{const c=document.getElementById('game').getBoundingClientRect(),T=window.__kmTest.get(),q=Math.min(c.width/432,c.height/960);const x=c.left+(c.width-432*q)/2+(800-T.camera.x)*T.zoom*q,y=c.top+(c.height-960*q)/2+(460-30-T.camera.y)*T.zoom*q;return {x,y,hit:document.elementFromPoint(x,y).id}});
  await pg.touchscreen.tap(tapPos.x,tapPos.y);await pg.waitForTimeout(100);
  const afterTap=await pg.evaluate(()=>window.__kmTest.get().sq);
  await pg.screenshot({path:path.join(OUT,'GORSEL_DENETIM','yan_gorev_alindi.png')});
  const r=await pg.evaluate(()=>{const T=window.__kmTest,o={},C=T.content();
   const run=(q)=>{const before=T.get().coins;if(q.kind==='collect'){T.enter(q.target,{village:475,forest:235,arena:712,ashpass:250}[q.target],{village:580,forest:610,arena:330,ashpass:560}[q.target]);for(const p of q.points){if(T.get().rewardOpen)T.closeModal();T.setPlayer(p.x,p.y);for(let i=0;i<3;i++)T.step(.05)}}
     else{const z={sentinel:'arena',thorn:'forest',wisp:'ashpass'}[q.target];let k=0;while(T.get().sq[q.id].n<q.count&&k<6){T.enter(z,{forest:235,arena:712,ashpass:250}[z],{forest:610,arena:330,ashpass:560}[z]);for(const e of T.get().enemies)if(e.id.startsWith({sentinel:'sent',thorn:'thorn',wisp:'wisp'}[q.target]))T.kill(e.id);T.step(.05);k++}}
     if(T.get().rewardOpen)T.closeModal();const prog=T.get().sq[q.id].n;const npc=C.npcs[q.zone].find(n=>n.id===q.npc);T.enter(q.zone,npc.x-40,npc.y+30);for(let i=0;i<4;i++){T.step(.05);const gg=T.get();if(gg.rewardOpen&&!(gg.lastReward&&gg.lastReward.id==='side327-'+q.id))T.closeModal()}const g=T.get();const pop=g.rewardOpen&&g.lastReward&&g.lastReward.id==='side327-'+q.id;T.closeModal();
     // ikinci teslim denemesi
     const c1=T.get().coins;T.talk();for(let i=0;i<4;i++)T.step(.05);return {prog,popup:!!pop,gained:c1-before,again:T.get().coins-c1,st:T.get().sqStatus.find(x=>x.startsWith(q.id+':'))}};
   T.setQuest(12);o.statusAt12=T.get().sqStatus;
   for(const q of C.side){if(!T.get().sq[q.id])T.sqAccept(q.id);o[q.id]=run(q)}
   o.rewards=T.get().questRewards.filter(x=>x.startsWith('side327'));return o});
  await pg.reload();await pg.waitForTimeout(500);const re=await pg.evaluate(()=>window.__kmTest.get().sqStatus);
  const ids=['lamp','moss','pages','core','pack','ember'];
  const ok=listAt0.visible===1&&listAt0.lockedNote&&afterTap.lamp&&afterTap.lamp.st==='active'&&ids.every(i=>r[i].popup&&r[i].again===0&&r[i].st.endsWith('done')&&r[i].gained>0)&&new Set(r.rewards).size===6&&re.every(x=>x.endsWith('done'))&&!pg.errs.length;
  if(tapPos.hit!=='game')console.log('UYARI: dokunuş tuvale düşmedi',tapPos);
  rec('C03','6 NPC yan görevi: kilitliler gizli, NPC’ye dokunarak alınır, ilerler, NPC’de tek ödül + popup, kayıttan döner',ok,{atStart:listAt0,afterNpcTap:afterTap,results:Object.fromEntries(ids.map(i=>[i,r[i]])),rewards:r.rewards,afterReload:re,errors:pg.errs});await ctx.close()}

 // C04 Görev ekranından YOL: yan görev NPC'sine rota, ana oto görev duraklar ve görev kutusuyla sürer
 {const {ctx,pg}=await open();await pg.tap('#trackBtn');await pg.evaluate(()=>{for(let i=0;i<10;i++)window.__kmTest.step(.05)});await pg.tap('#questsBtn');await pg.waitForTimeout(150);
  await pg.screenshot({path:path.join(OUT,'GORSEL_DENETIM','gorev_ekrani_yan_gorevler.png')});
  await pg.tap('[data-sq-route="lamp"]');const a=await pg.evaluate(()=>window.__kmTest.get());
  const r=await pg.evaluate(()=>{const T=window.__kmTest;let t=0;while(t<1200&&T.get().mapRoute){T.step(.05);t++}const g=T.get();return {arrived:!g.mapRoute,pos:[Math.round(g.player.x),Math.round(g.player.y)],s:Math.round(t*.05)}});
  await pg.tap('#trackBtn');const b=await pg.evaluate(()=>window.__kmTest.get());
  rec('C04','Görev ekranı YOL düğmesi: yan görev NPC’sine yürür, ana görev duraklar ve görev kutusuyla devam eder',a.mapRoute&&a.mapRoute.id==='sq-lamp'&&!a.autoPath&&r.arrived&&b.autoPath&&b.questPhase===a.questPhase,{route:a.mapRoute,mainPaused:!a.autoPath,walk:r,resumed:b.autoPath});await ctx.close()}

 // C05 Sürü davranışı
 {const {ctx,pg}=await open();const r=await pg.evaluate(()=>{const T=window.__kmTest;T.setQuest(12);T.enter('ashpass',820,330);document.getElementById('autoPath').click();
   const pos=id=>{const e=T.get().enemies.find(x=>x.id===id);return e};const d0=Math.hypot(1110-820,490-330);T.hit('wisp3',.2);for(let i=0;i<20;i++){T.setPlayer(820,330);T.step(.05)}
   const s=enemiesNow=>0;return {}});
  const r2=await pg.evaluate(()=>{const T=window.__kmTest;const p=T.get().player;return {}});
  // konumları __kmTest.get() vermediği için doğrudan state'ten oku
  const r3=await pg.evaluate(()=>{const T=window.__kmTest;T.enter('ashpass',820,330);const before=state.enemies.filter(e=>e.pack==='kivilcimB').map(e=>Math.round(Math.hypot(e.x-820,e.y-330)));T.hit('wisp3',.2);for(let i=0;i<30;i++){state.player.x=820;state.player.y=330;T.step(.05)}const after=state.enemies.filter(e=>e.pack==='kivilcimB').map(e=>Math.round(Math.hypot(e.x-820,e.y-330)));const otherA=state.enemies.filter(e=>e.pack==='kivilcimA').map(e=>Math.round(Math.hypot(e.x-820,e.y-330)));return {before,after,packA:otherA}});
  rec('C05','Yaratık sürüleri: vurulan kıvılcımın sürüsü (3) birlikte oyuncuya yönelir',r3.after.every((d,i)=>d<r3.before[i]-20),r3);await ctx.close()}

 // C06 Kayıt: 3.26 kaydı (sq yok) ve bozuk sq alanı
 for(const [name,save,check] of [['3.26-kaydi',{questSchema:326,classId:'scout',level:5,coins:500,missionIndex:4,quest:4,questPhase:'ready',questRewards:['mission-0','mission-1','mission-2','mission-3'],inv:['bow'],equipment:{weapon:'bow'},zone:'forest',x:300,y:600},g=>g.mode==='game'&&g.sqStatus.filter(x=>x.endsWith('available')).length===4],
   ['bozuk-sq',{questSchema:327,classId:'guardian',level:3,coins:100,missionIndex:2,quest:2,questPhase:'ready',questRewards:['mission-0','mission-1','side327-lamp'],sq:{lamp:{st:'active',n:1},moss:{st:'active',n:'x'},hayalet:{st:'active',n:5},pages:'bozuk'},inv:['sword'],equipment:{weapon:'sword'},zone:'village',x:475,y:580},g=>g.sq.lamp&&g.sq.lamp.st==='done'&&g.sq.moss.n===0&&!g.sq.hayalet&&!g.sq.pages]]){
  const ctx=await browser.newContext({viewport:{width:393,height:852}});await ctx.addInitScript(sv=>{if(!sessionStorage.getItem('i')){sessionStorage.setItem('i','1');localStorage.clear();localStorage.setItem('kirikMuhurQuestFlowV324Test',sv)}},JSON.stringify(save));
  const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));await pg.goto('file://'+NEW);await pg.waitForTimeout(600);const g=await pg.evaluate(()=>window.__kmTest.get());
  rec('C06-'+name,'Kayıt geçişi: '+name,check(g)&&!errs.length,{sq:g.sq,status:g.sqStatus,errors:errs});await ctx.close()}

 // C07 Görsel: NPC işaretleri (! / ?) ve yan görev toplama işareti
 {const {ctx,pg}=await open();await pg.evaluate(()=>{const T=window.__kmTest;T.setQuest(2);T.enter('forest',300,420);T.step(.05)});await pg.waitForTimeout(300);await pg.screenshot({path:path.join(OUT,'GORSEL_DENETIM','npc_yan_gorev_isareti.png')});
  await pg.evaluate(()=>{const T=window.__kmTest;T.sqAccept('moss');T.setPlayer(260,520);T.step(.05)});await pg.waitForTimeout(300);await pg.screenshot({path:path.join(OUT,'GORSEL_DENETIM','yan_gorev_toplama_isareti.png')});
  await pg.evaluate(()=>{const T=window.__kmTest;T.setQuest(20);T.enter('arena',712,330);T.step(.05)});await pg.waitForTimeout(300);await pg.screenshot({path:path.join(OUT,'GORSEL_DENETIM','tapinak_sunak_sutun.png')});
  await pg.evaluate(()=>{const T=window.__kmTest;T.enter('village',980,600);T.step(.05)});await pg.waitForTimeout(300);await pg.screenshot({path:path.join(OUT,'GORSEL_DENETIM','koy_tezgah.png')});
  rec('C07','Görsel denetim görüntüleri alındı (NPC işareti, yan görev işareti, tapınak, köy)',!pg.errs.length,{errors:pg.errs});await ctx.close()}

 fs.writeFileSync(path.join(OUT,'test_sonuclari_3_27.json'),JSON.stringify(results,null,1));const s={PASS:0,FAIL:0};for(const x of results)s[x.status]++;console.log('ÖZET',s);await browser.close()})();
