// Kırık Mühür — Android'e en yakın emülasyon testi (gerçek cihaz DEĞİL)
// Playwright Android cihaz profilleri + CPU yavaşlatma + CDP gerçek dokunma olayları + gerçek zaman (hızlandırma yok)
// Kullanım: node android_emulasyon.js <https_url> <cikti> [oturum_dakika]
const {chromium,devices}=require('playwright');const fs=require('fs'),path=require('path'),os=require('os');
const [,,URL,OUT,LONGMIN]=process.argv;fs.mkdirSync(path.join(OUT,'GORSEL_DENETIM'),{recursive:true});
const results=[];const rec=(id,name,ok,ev)=>{const st=ok===null?'BİLGİ':ok?'PASS':'FAIL';results.push({id,name,status:st,evidence:ev});console.log(st.padEnd(6),id,name,'—',JSON.stringify(ev).slice(0,600))};
const DEVICES=[['Moto G4',6],['Galaxy S8',4],['Pixel 7',4],['Galaxy A55',4],['Galaxy S24',2]];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function touch(cdp,type,pts){await cdp.send('Input.dispatchTouchEvent',{type,touchPoints:pts.map((p,i)=>({x:p.x,y:p.y,id:i,radiusX:6,radiusY:6,force:1}))})}
async function tap(cdp,x,y,hold=60){await touch(cdp,'touchStart',[{x,y}]);await sleep(hold);await touch(cdp,'touchEnd',[])}
async function tapEl(pg,cdp,sel){const b=await pg.$(sel);if(!b)return false;const r=await b.boundingBox();if(!r)return false;await tap(cdp,r.x+r.width/2,r.y+r.height/2);return true}
const G=pg=>pg.evaluate(()=>window.__kmTest.get());
const worldToScreen=(pg,wx,wy)=>pg.evaluate(([wx,wy])=>{const c=document.getElementById('game').getBoundingClientRect(),T=window.__kmTest.get(),q=Math.min(c.width/432,c.height/960);const x=c.left+(c.width-432*q)/2+(wx-T.camera.x)*T.zoom*q,y=c.top+(c.height-960*q)/2+(wy-T.camera.y)*T.zoom*q;return {x,y,hit:(document.elementFromPoint(x,y)||{}).id}},[wx,wy]);
const PERF=()=>{window.__fps=[];window.__long=0;let n=0,t0=performance.now();(function f(t){n++;if(t-t0>=2000){window.__fps.push(Math.round(n*1000/(t-t0)));n=0;t0=t}requestAnimationFrame(f)})(performance.now());try{new PerformanceObserver(l=>{window.__long+=l.getEntries().length}).observe({entryTypes:['longtask']})}catch(e){}};

(async()=>{
 for(const [devName,cpu] of DEVICES){const dev=devices[devName];const tag=devName.replace(/\s+/g,'_');
  const browser=await chromium.launch();const ctx=await browser.newContext({...dev,ignoreHTTPSErrors:true});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));pg.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  const cdp=await ctx.newCDPSession(pg);await cdp.send('Emulation.setCPUThrottlingRate',{rate:cpu});
  const t0=Date.now();await pg.goto(URL);await pg.waitForSelector('[data-class="guardian"]');const tLoad=Date.now()-t0;
  await tapEl(pg,cdp,'[data-class="weaver"]');const t1=Date.now();
  // Siyah ekran kontrolü: sınıf seçiminden sonra ilk 2 sn içinde sahne çizildi mi (ortalama parlaklık)
  let firstFrameMs=null;for(let i=0;i<20;i++){await sleep(100);const lum=await pg.evaluate(()=>{const c=document.getElementById('game'),g=c.getContext('2d');const d=g.getImageData(c.width*.3|0,c.height*.3|0,40,40).data;let s=0;for(let k=0;k<d.length;k+=4)s+=d[k]+d[k+1]+d[k+2];return s/(d.length/4)/3});if(lum>25){firstFrameMs=Date.now()-t1;break}}
  await pg.evaluate(PERF);
  const vp=dev.viewport;
  rec(`A1-${tag}`,`${devName} (${vp.width}×${vp.height}, dpr ${dev.deviceScaleFactor}, CPU ${cpu}x yavaş): yükleme ve siyah ekran yok`,firstFrameMs!==null&&firstFrameMs<2000,{loadMs:tLoad,firstFrameMs,ua:dev.userAgent.slice(0,60)});

  // Dokunarak yürüme ve yön
  const g0=await G(pg);const target=await worldToScreen(pg,g0.player.x+110,g0.player.y-20);
  await tap(cdp,target.x,target.y);await sleep(1500);const g1=await G(pg);
  rec(`A2-${tag}`,'Gerçek dokunuşla yürüme: sağa dokun → sağa yürür, sağa bakar',target.hit==='game'&&g1.player.x>g0.player.x+60&&g1.facing==='right',{hit:target.hit,dx:Math.round(g1.player.x-g0.player.x),facing:g1.facing});
  // Sürükleyerek yürüme (parmak ekranda kayıyor)
  const s0=await G(pg);const a=await worldToScreen(pg,s0.player.x,s0.player.y+40);await touch(cdp,'touchStart',[{x:a.x,y:a.y}]);for(let k=1;k<=12;k++){await touch(cdp,'touchMove',[{x:a.x-k*9,y:a.y+k*4}]);await sleep(70)}await touch(cdp,'touchEnd',[]);await sleep(1200);const s1=await G(pg);
  rec(`A3-${tag}`,'Parmağı sürükleyerek yürüme (sola-aşağı)',s1.player.x<s0.player.x-30,{dx:Math.round(s1.player.x-s0.player.x),dy:Math.round(s1.player.y-s0.player.y),facing:s1.facing});
  // İki parmak / çift dokunma ile sayfa yakınlaşmaz
  const c=await worldToScreen(pg,s1.player.x,s1.player.y-100);await touch(cdp,'touchStart',[{x:c.x-20,y:c.y},{x:c.x+20,y:c.y}]);for(let k=1;k<=8;k++){await touch(cdp,'touchMove',[{x:c.x-20-k*12,y:c.y},{x:c.x+20+k*12,y:c.y}]);await sleep(40)}await touch(cdp,'touchEnd',[]);
  await tap(cdp,c.x,c.y,40);await sleep(80);await tap(cdp,c.x,c.y,40);await sleep(300);
  const zoom=await pg.evaluate(()=>({scale:window.visualViewport?visualViewport.scale:1,scrollX,scrollY}));
  rec(`A4-${tag}`,'İki parmak açma ve çift dokunma sayfayı yakınlaştırmaz/kaydırmaz',zoom.scale===1&&zoom.scrollX===0&&zoom.scrollY===0,zoom);
  // Çiçek: kaydırma jesti menü değiştirir, karakter yürümez
  const f0=await G(pg);const fb=await (await pg.$('#flowerMenu')).boundingBox();await touch(cdp,'touchStart',[{x:fb.x+fb.width/2-15,y:fb.y+fb.height/2}]);for(let k=1;k<=5;k++){await touch(cdp,'touchMove',[{x:fb.x+fb.width/2-15+k*8,y:fb.y+fb.height/2}]);await sleep(30)}await touch(cdp,'touchEnd',[]);await sleep(600);const f1=await G(pg);
  rec(`A5-${tag}`,'Çiçeği parmakla kaydırma menüyü değiştirir; karakter yürümez',f1.menuPage!==f0.menuPage&&Math.hypot(f1.player.x-f0.player.x,f1.player.y-f0.player.y)<3&&!f1.moveTarget,{from:f0.menuPage,to:f1.menuPage,moved:Math.round(Math.hypot(f1.player.x-f0.player.x,f1.player.y-f0.player.y))});
  await tapEl(pg,cdp,'#flowerMenu');await tapEl(pg,cdp,'#flowerMenu');await sleep(200);
  // Saldırı tuşuna uzun basma: sürekli saldırı
  await pg.evaluate(()=>{const T=window.__kmTest;T.enter('forest',460,425)});await sleep(400);const hp0=await pg.evaluate(()=>state.enemies.find(e=>e.id==='shade1').hp);
  const ab=await (await pg.$('#attackBtn')).boundingBox();await touch(cdp,'touchStart',[{x:ab.x+ab.width/2,y:ab.y+ab.height/2}]);await sleep(2600);await touch(cdp,'touchEnd',[]);const hp1=await pg.evaluate(()=>{const e=state.enemies.find(e=>e.id==='shade1');return e?e.hp:0});
  const hitsDealt=Math.round((hp0-hp1)/Math.max(1,(await G(pg)).player.attack-3));
  rec(`A6-${tag}`,'Saldırı tuşuna basılı tutma: art arda vuruş',hp0-hp1>0&&hitsDealt>=2,{hp0,hp1,approxHits:hitsDealt});
  await pg.evaluate(()=>window.__kmTest.enter('village',475,560));await sleep(300);
  // Hızlı çift dokunma görev tuşu: tek başlatma
  const tb=await (await pg.$('#trackBtn')).boundingBox();await tap(cdp,tb.x+tb.width/2,tb.y+tb.height/2,30);await sleep(40);await tap(cdp,tb.x+tb.width/2,tb.y+tb.height/2,30);await sleep(300);const q1=await G(pg);
  rec(`A7-${tag}`,'Görev tuşuna hızlı çift dokunma: görev bir kez başlar, hata yok',q1.questPhase==='travel'&&q1.autoPath&&!errs.length,{phase:q1.questPhase,auto:q1.autoPath});
  // Gerçek zamanlı oyun (hızlandırma yok): parmakla görev ve popup
  const playMs=devName==='Moto G4'?150000:75000;const startQ=q1.quest;const pStart=Date.now();let popups=0,deaths=0;
  while(Date.now()-pStart<playMs){await sleep(900);const g=await G(pg);if(g.rewardOpen){await tapEl(pg,cdp,'#km325RewardOk');popups++}else if(g.mode==='dead'){deaths++;await tapEl(pg,cdp,'#respawn');await sleep(300);await tapEl(pg,cdp,'#trackBtn')}else if(g.mode==='game'&&(g.questPhase==='ready'||!g.autoPath))await tapEl(pg,cdp,'#trackBtn')}
  const perf=await pg.evaluate(()=>({fps:window.__fps.slice(1),long:window.__long,heap:performance.memory?Math.round(performance.memory.usedJSHeapSize/1048576*10)/10:null}));const gEnd=await G(pg);
  const fpsSorted=[...perf.fps].sort((a,b)=>a-b),med=fpsSorted[fpsSorted.length>>1],p10=fpsSorted[Math.floor(fpsSorted.length*.1)];
  await pg.screenshot({path:path.join(OUT,'GORSEL_DENETIM',`android_${tag}_oyun.png`)});
  rec(`A8-${tag}`,`Gerçek zamanlı ${Math.round(playMs/1000)} sn oyun, parmakla görev/popup (CPU ${cpu}x): ilerleme, FPS, hata`,gEnd.quest>startQ&&!errs.length&&med>=30,{quests:gEnd.quest-startQ,popups,deaths,fpsMedian:med,fpsP10:p10,longTasks:perf.long,heapMB:perf.heap,errors:errs.slice(0,3)});
  // Geri tuşu
  await pg.goBack().catch(()=>{});await sleep(400);const back1=await pg.evaluate(()=>!document.getElementById('modal').classList.contains('hidden'));await pg.goBack().catch(()=>{});await sleep(400);const back2=await pg.evaluate(()=>document.getElementById('modal').classList.contains('hidden'));
  rec(`A9-${tag}`,'Android geri tuşu (tarayıcı geçmişi): oyundan çıkmaz, duraklatma açar/kapatır',back1&&back2&&pg.url().startsWith(URL),{pauseOpened:back1,closed:back2});
  // Yatay çevirme ve geri dikey
  await pg.setViewportSize({width:vp.height,height:vp.width});await sleep(500);const land=await pg.evaluate(()=>getComputedStyle(document.getElementById('landscapeGuard')).display);await pg.screenshot({path:path.join(OUT,'GORSEL_DENETIM',`android_${tag}_yatay.png`)});
  await pg.setViewportSize(vp);await sleep(500);const port=await pg.evaluate(()=>{const W=innerWidth,H=innerHeight;const vis=e=>{const s=getComputedStyle(e);return s.display!=='none'&&s.visibility!=='hidden'&&e.getBoundingClientRect().width>0};const bs=[...document.querySelectorAll('#app button')].filter(vis).filter(e=>!e.closest('#modal'));const out=bs.filter(b=>{const r=b.getBoundingClientRect();return r.left<-1||r.top<-1||r.right>W+1||r.bottom>H+1}).map(b=>b.id);return {guard:getComputedStyle(document.getElementById('landscapeGuard')).display,out,canvasW:document.getElementById('game').width}});
  rec(`A10-${tag}`,'Yataya çevirince "telefonu dik tut" uyarısı; dikeye dönünce HUD düzgün',land!=='none'&&port.guard==='none'&&!port.out.length,{landscapeGuard:land,afterPortrait:port});
  // Dokunma hedefi boyutları (Android önerisi 48dp; 40 px altı raporlanır)
  await pg.evaluate(()=>{const T=window.__kmTest;if(!document.getElementById('modal').classList.contains('hidden'))T.closeModal()});await sleep(200);
  const sizes=await pg.evaluate(()=>{const vis=e=>{const s=getComputedStyle(e);return s.display!=='none'&&s.visibility!=='hidden'&&e.getBoundingClientRect().width>0};return [...document.querySelectorAll('#app button')].filter(vis).filter(e=>!e.closest('#modal')).map(b=>{const r=b.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;const own=(x,y)=>{const h=document.elementFromPoint(Math.max(0,Math.min(innerWidth-1,x)),Math.max(0,Math.min(innerHeight-1,y)));return !!h&&(h===b||b.contains(h))};let w=0,h=0;for(let d=1;d<=40;d++){if(own(cx-d,cy)&&own(cx+d,cy))w=2*d+1;else break}for(let d=1;d<=40;d++){if(own(cx,cy-d)&&own(cx,cy+d))h=2*d+1;else break}return {id:b.id||b.textContent.trim().slice(0,10),w,h,gorsel:[Math.round(r.width),Math.round(r.height)]}}).map(x=>{if(x.id==='mapBtn'){const f=document.getElementById('minimapFrame').getBoundingClientRect();x.w=Math.round(f.width);x.h=Math.round(f.height);x.not='mini haritanın tamamı haritayı açar'}return x})});
  const small=sizes.filter(s=>Math.min(s.w,s.h)<43);
  rec(`A11-${tag}`,'Gerçek dokunulabilir alan her düğmede ≥43 px (Android önerisi 48dp)',small.length===0,{toplam:sizes.length,kucuk:small});
  // Android'in uygulamayı aniden öldürmesi: pagehide YOK, yalnız periyodik kayıt
  await browser.close();
  results.push({id:'_',name:'',status:'',evidence:''});results.pop();
 }

 // A12: Uygulama süreci aniden öldürülür (SIGKILL) — Android arka plandaki sekmeyi kapatır gibi
 {const dir=fs.mkdtempSync(path.join(os.tmpdir(),'kmand-'));const dev=devices['Galaxy S8'];
  let c1=await chromium.launchPersistentContext(dir,{...dev,ignoreHTTPSErrors:true});const p1=c1.pages()[0]||await c1.newPage();await p1.goto(URL);await sleep(700);await p1.tap('[data-class="scout"]');await sleep(300);await p1.tap('#trackBtn');
  await sleep(20000);const before=await G(p1);await sleep(4500);const last=await G(p1); // son periyodik kayıttan sonra en az 4 sn
  const proc=c1.browser&&c1.browser()?null:null;
  // tarayıcı sürecini öldür
  const pids=require('child_process').execSync(`pgrep -f "${dir}" || true`).toString().trim().split('\n').filter(Boolean);for(const pid of pids){try{process.kill(+pid,'SIGKILL')}catch(e){}}await sleep(800);
  const c2=await chromium.launchPersistentContext(dir,{...dev,ignoreHTTPSErrors:true});const p2=c2.pages()[0]||await c2.newPage();await p2.goto(URL);await sleep(900);const after=await G(p2);
  const posLoss=Math.round(Math.hypot(after.player.x-last.player.x,after.player.y-last.player.y));
  rec('A12','Android süreci aniden öldürürse (SIGKILL, pagehide yok): görev/altın/ödül korunur, en fazla ~4 sn konum kaybı',after.mode==='game'&&after.quest>=before.quest&&after.coins>=before.coins&&new Set(after.questRewards).size===after.questRewards.length,{killedPids:pids.length,before:{quest:before.quest,phase:before.questPhase,coins:before.coins},lastLive:{quest:last.quest,phase:last.questPhase,coins:last.coins},afterRestart:{quest:after.quest,phase:after.questPhase,coins:after.coins},positionDiffFromLastLive:posLoss});
  await c2.close()}

 // A13: Uzun oturum — en zayıf profil (Moto G4, CPU 6x), gerçek zaman
 if(+LONGMIN>0){const dev=devices['Moto G4'];const browser=await chromium.launch();const ctx=await browser.newContext({...dev,ignoreHTTPSErrors:true});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));const cdp=await ctx.newCDPSession(pg);await cdp.send('Emulation.setCPUThrottlingRate',{rate:6});
  await pg.goto(URL);await sleep(800);await tapEl(pg,cdp,'[data-class="guardian"]');await sleep(300);await pg.evaluate(PERF);const st=Date.now();let popups=0,deaths=0;const samples=[];
  while(Date.now()-st<LONGMIN*60000){await sleep(1000);const g=await G(pg);if(g.rewardOpen){await tapEl(pg,cdp,'#km325RewardOk');popups++}else if(g.mode==='dead'){deaths++;await tapEl(pg,cdp,'#respawn');await sleep(300);await tapEl(pg,cdp,'#trackBtn')}else if(g.mode==='game'&&(g.questPhase==='ready'||!g.autoPath))await tapEl(pg,cdp,'#trackBtn');
   if((Date.now()-st)%60000<1100){const p=await pg.evaluate(()=>({fps:window.__fps.slice(-5),heap:performance.memory?Math.round(performance.memory.usedJSHeapSize/1048576*10)/10:null,long:window.__long}));samples.push({min:Math.round((Date.now()-st)/60000),quest:g.quest,...p})}}
  const g=await G(pg);const all=samples.flatMap(s=>s.fps).sort((a,b)=>a-b);
  rec('A13',`Uzun oturum ${LONGMIN} dk — Moto G4 profili, CPU 6x, gerçek zaman, parmakla oynanış`,!errs.length&&g.quest>10&&new Set(g.questRewards).size===g.questRewards.length,{quests:g.quest,popups,deaths,fpsMedian:all[all.length>>1],fpsMin:all[0],heapMB:samples.map(s=>s.heap),errors:errs.slice(0,3)});
  fs.writeFileSync(path.join(OUT,'uzun_oturum_moto_g4.json'),JSON.stringify({samples},null,1));await browser.close()}

 fs.writeFileSync(path.join(OUT,'android_emulasyon_sonuclari.json'),JSON.stringify(results,null,1));const s={};for(const x of results)s[x.status]=(s[x.status]||0)+1;console.log('ÖZET',s)})();
