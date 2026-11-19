// Kırık Mühür 3.37 — kullanıcı ekranlarına göre yoldaş/binek akışı
const {chromium,devices}=require('playwright');const fs=require('fs'),path=require('path');
const [,,FILE,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const results=[];const rec=(id,name,ok,ev)=>{results.push({id,name,status:ok?'PASS':'FAIL',evidence:ev});console.log((ok?'PASS':'FAIL').padEnd(5),id,name,'—',JSON.stringify(ev).slice(0,900))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();
 const open=async(o={})=>{const ctx=await b.newContext({...devices['Pixel 7'],...(o.vp?{viewport:o.vp}:{})});if(o.init)await ctx.addInitScript(o.init,o.arg);const pg=await ctx.newPage();pg.errs=[];pg.on('pageerror',e=>pg.errs.push(e.message));await pg.goto('file://'+FILE);await sleep(700);if(!o.noClass){await pg.tap(`[data-class="${o.cls||'guardian'}"]`);await sleep(250)}return {ctx,pg}};
 // Y1 başlangıç: kilitli, tanıtım biçimi
 {const {ctx,pg}=await open();const r=await pg.evaluate(()=>{const T=window.__kmTest,o={};const g=T.get();o.pet=g.petOpen;o.mount=g.mountOpen;o.teaser0=g.teaser;document.getElementById('petBtn').click();o.petAfterClick=state.pet;document.getElementById('mountBtn').click();o.mountAfterClick=state.mount;state.level=5;baseStats();o.ridingLv5=km336Riding();
   openModal('companion');o.lockBtns=[...document.querySelectorAll('#km329PetT,#km329MountT')].map(b=>b.disabled+':'+b.textContent);closeModal();return o});
  rec('Y1','Yeni oyun: tilki ve binek kilitli (seviye yükselse de); düğme açmaz; Sadık ekranında KİLİTLİ; HUD tanıtımı "N. Ana Görevi Bitir" biçiminde',r.pet===false&&r.mount===false&&/Ana Görevi Bitir/.test(r.teaser0)&&!r.petAfterClick&&!r.mountAfterClick&&!r.ridingLv5&&r.lockBtns.every(x=>/^true:KİLİTLİ/.test(x))&&!pg.errs.length,r);await ctx.close()}
 // Y2 gerçek hikâye akışı: 4. görevde tilki, 8. görevde ahır → Toplanıyor → binek → öğretici → yukarı kaydır
 for(const cls of ['guardian','weaver']){const {ctx,pg}=await open({cls});
  const r=await pg.evaluate(()=>{const T=window.__kmTest,o={teasers:[],chan:0,chanText:''};
   for(let i=0;i<8;i++){const q0=state.missionIndex;o.teasers.push(T.get().teaser);if(T.get().rewardOpen)T.closeModal();T.questAction();
    for(let s=0;s<6000&&state.missionIndex===q0;s++){if(T.get().rewardOpen)T.closeModal();if(state.mode==='dead'){document.getElementById('respawn').click();T.questAction()}T.step(.05);if(km337Chan>0){o.chan=Math.max(o.chan,km337Chan);const c=document.getElementById('km337Chan');if(c)o.chanText=c.textContent}
     if(state.missionIndex===q0&&q0===7&&!o.title)o.title=missionInfo().title}
    if(state.missionIndex===4&&o.petAt===undefined){o.petAt=state.missionIndex;o.petOpen=state.petOpen;o.petReveal=document.getElementById('km335Reveal')?.textContent||'';o.mountBefore=state.mountOpen;o.teaserAfterPet=T.get().teaser}
   }
   o.mi=state.missionIndex;o.mountOpen=state.mountOpen;o.mountOn=state.mount;o.reveal=document.getElementById('km335Reveal')?.textContent||'';o.groom=state.npcs.some(n=>n.id==='groom');return o});
  await pg.screenshot({path:path.join(OUT,`binek_kazandin_${cls}.png`)});
  await pg.tap('#km335RevealOk').catch(()=>{});await sleep(700);const tutBefore=await pg.evaluate(()=>({modalOpen:!document.getElementById('modal').classList.contains('hidden'),tut:!!document.getElementById('km337Tut')}));for(let k=0;k<6;k++){const open=await pg.evaluate(()=>!document.getElementById('modal').classList.contains('hidden')||!!document.getElementById('km335Reveal'));if(!open)break;await pg.evaluate(()=>{const r=document.getElementById('km335RevealOk');if(r)r.click();else window.__kmTest.closeModal()});await sleep(400)}await sleep(700);const tut=await pg.evaluate(()=>({tut:!!document.getElementById('km337Tut'),txt:document.getElementById('km337Tut')?.textContent}));await pg.screenshot({path:path.join(OUT,`kaydir_ogretici_${cls}.png`)});
  // gerçek parmakla yukarı kaydırma (CDP dokunma)
  await pg.evaluate(()=>{state.mount=false;baseStats()});const cdp=await ctx.newCDPSession(pg);const vp=pg.viewportSize();const x=vp.width/2,y0=vp.height*0.55;
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y:y0}]});for(let k=1;k<=6;k++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:y0-k*25}]});await sleep(25)}await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await sleep(200);
  const sw=await pg.evaluate(()=>({mount:state.mount,riding:km336Riding(),tutDone:state.tutMount,tutGone:!document.getElementById('km337Tut')}));
  rec('Y2-'+cls,'Hikâye akışı: 4. ana görev tesliminde Ruh Tilkisi (KAZANDIN + gerçek stat); 8. görev "YOLCULUĞA HAZIRLIK": Seyis + AHIR, "Toplanıyor" çubuğu, teslimde Ay Işığı Geyiği (CAN +…); ardından "yukarı kaydır" öğreticisi; parmakla yukarı kaydırınca biner',
   r.petAt===4&&r.petOpen&&/Ruh Tilkisi/.test(r.petReveal)&&/SAL \+\d+/.test(r.petReveal)&&!r.mountBefore&&/Binek • 8\. Ana Görevi Bitir/.test(r.teaserAfterPet)&&r.title==='YOLCULUĞA HAZIRLIK'&&r.groom&&r.chan>=1.5&&r.mi===8&&r.mountOpen&&r.mountOn&&/Ay Işığı Geyiği/.test(r.reveal)&&/CAN \+\d+/.test(r.reveal)&&(!tutBefore.modalOpen||!tutBefore.tut)&&tut.tut&&/yukarı kaydır/.test(tut.txt)&&sw.mount&&sw.riding&&sw.tutDone&&sw.tutGone&&!pg.errs.length,{...r,tutBefore,tut,sw});await ctx.close()}
 // Y3 eski kayıtlar: açılmış olan kaybolmaz
 {const base={questSchema:336,classId:'scout',coins:100,inv:['bow'],equipment:{weapon:'bow'},zone:'village',x:475,y:580,questPhase:'ready'};const cases=[
   ['ilerlemis',{...base,level:9,missionIndex:12,quest:12,questRewards:Array.from({length:12},(_,i)=>'mission-'+i),pet:false,mount:false},g=>g.petOpen&&g.mountOpen],
   ['erken-binek-acik',{...base,level:3,missionIndex:2,quest:2,questRewards:['mission-0','mission-1'],pet:true,mount:true},g=>g.petOpen&&g.mountOpen&&g.mount],
   ['erken-kapali',{...base,level:3,missionIndex:2,quest:2,questRewards:['mission-0','mission-1'],pet:false,mount:false},g=>!g.petOpen&&!g.mountOpen&&/Ruh Tilkisi • 4\. Ana Görevi Bitir/.test(g.teaser)]];
  const out={};let ok=true;for(const [k,sv,chk] of cases){const {ctx,pg}=await open({noClass:true,init:(sv)=>{if(!sessionStorage.getItem('i')){sessionStorage.setItem('i','1');localStorage.clear();localStorage.setItem('kirikMuhurQuestFlowV324Test',sv)}},arg:JSON.stringify(sv)});
   const g=await pg.evaluate(()=>{const g=window.__kmTest.get();return {mode:g.mode,petOpen:g.petOpen,mountOpen:g.mountOpen,mount:state.mount,teaser:g.teaser}});out[k]=g;ok=ok&&g.mode==='game'&&chk(g)&&!pg.errs.length;await ctx.close()}
  rec('Y3','Eski kayıt: 8. görevi geçmiş oyuncuda tilki+binek açık; erken kayıtta önceden açılmış tilki/binek korunur; hiç açmamışta kilitli ve doğru tanıtım',ok,out)}
 // Y4 ekran: ahır ve Toplanıyor (320/393)
 for(const vp of [{width:320,height:568},{width:393,height:852}]){const {ctx,pg}=await open({vp});await pg.evaluate(()=>{const T=window.__kmTest;state.missionIndex=7;state.quest=7;state.questRewards=Array.from({length:7},(_,i)=>'mission-'+i);state.level=5;baseStats();T.enter('village',1185,760);state.questPhase='hunt';km337Chan=.8});
  await sleep(250);const r=await pg.evaluate(()=>{const c=document.getElementById('km337Chan');const b=c&&c.getBoundingClientRect();return {chan:!!c,fits:!!b&&b.left>=0&&b.right<=innerWidth}});await pg.screenshot({path:path.join(OUT,`ahir_toplaniyor_${vp.width}x${vp.height}.png`)});
  rec(`Y4-${vp.width}x${vp.height}`,'Ahır sahnesi ve "Toplanıyor" çubuğu ekranda, taşma yok',r.chan&&r.fits&&!pg.errs.length,r);await ctx.close()}
 fs.writeFileSync(path.join(OUT,'test_sonuclari_3_37.json'),JSON.stringify(results,null,1));const s={PASS:0,FAIL:0};for(const x of results)s[x.status]++;console.log('ÖZET',s);await b.close()})();
