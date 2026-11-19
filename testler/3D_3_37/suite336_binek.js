// Kırık Mühür 3.36 — otomatik binek: yolda bin, savaşta in, savaş bitince yeniden bin
const {chromium,devices}=require('playwright');const fs=require('fs'),path=require('path');
const [,,FILE,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const results=[];const rec=(id,name,ok,ev)=>{results.push({id,name,status:ok?'PASS':'FAIL',evidence:ev});console.log((ok?'PASS':'FAIL').padEnd(5),id,name,'—',JSON.stringify(ev).slice(0,800))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();
 const open=async(cls='guardian')=>{const ctx=await b.newContext({...devices['Pixel 7']});const pg=await ctx.newPage();pg.errs=[];pg.on('pageerror',e=>pg.errs.push(e.message));await pg.goto('file://'+FILE);await sleep(700);await pg.tap(`[data-class="${cls}"]`);await sleep(250);return {ctx,pg}};
 // M1 gerçek görev akışı: yol (binili) → av (indi) → dönüş (binili)
 for(const cls of ['guardian','scout','weaver']){const {ctx,pg}=await open(cls);const r=await pg.evaluate(()=>{const T=window.__kmTest,p=state.player,o={};state.level=3;state.petOpen=true;state.mountOpen=true;baseStats();document.getElementById('mountBtn').click();T.closeModal&&T.closeModal();
   const seq=[];let last=null;const speeds={ride:null,foot:null};T.questAction();
   for(let i=0;i<5000&&state.missionIndex===0;i++){if(T.get().rewardOpen)T.closeModal();T.step(.05);const r=km336Riding(),ph=state.questPhase;const key=ph+':'+(r?'binili':'yaya');if(key!==last){seq.push(key);last=key}if(r)speeds.ride=p.speed;else speeds.foot=p.speed;
    // savaş anında binili saldırı olmamalı
    if(p.attackAnim>.4&&r)o.attackWhileRiding=(o.attackWhileRiding||0)+1}
   o.seq=seq;o.speeds=speeds;o.done=state.missionIndex===1;return o});
  const huntFoot=r.seq.some(x=>x==='hunt:yaya'),travelRide=r.seq.some(x=>/^travel:binili/.test(x)),afterRide=r.seq.slice(r.seq.indexOf('hunt:yaya')).some(x=>/binili$/.test(x));
  rec('M1-'+cls,'Görev akışı: yolda binili, savaş başlayınca iner, savaş bitince yeniden biner; binili saldırı yok; binili hız > yaya hız',r.done&&travelRide&&huntFoot&&afterRide&&!r.attackWhileRiding&&r.speeds.ride>r.speeds.foot&&!pg.errs.length,r);await ctx.close()}
 // M2 elle saldırı / düşman vuruşu / kapalı binek
 {const {ctx,pg}=await open();const r=await pg.evaluate(()=>{const T=window.__kmTest,p=state.player,o={};state.level=3;state.petOpen=true;state.mountOpen=true;baseStats();state.mount=true;km336FightT=0;km336Sync();T.enter('forest',470,425);for(const e of state.enemies){e.x=p.x+2000;e.y=p.y}T.step(.05);o.riding0=km336Riding();o.spd0=p.speed;
   const e=state.enemies[0];e.x=p.x+30;e.y=p.y;e.hp=e.maxHp=9999;p.cd=0;state.autoBattle=false;document.getElementById('attackBtn').click();o.afterAttack=km336Riding();o.spd1=p.speed;
   for(let i=0;i<20;i++){e.x=p.x+3000;T.step(.05)}o.at1s=km336Riding();for(let i=0;i<40;i++){e.x=p.x+3000;T.step(.05)}o.at3s=km336Riding();
   e.x=p.x+20;e.y=p.y;e.cd=0;e.attack=5;for(let i=0;i<10&&km336Riding();i++)T.step(.05);o.afterHit=km336Riding();
   state.mount=false;km336FightT=0;for(let i=0;i<5;i++){e.x=p.x+3000;T.step(.05)}o.off=km336Riding();o.btn=document.getElementById('mountBtn').textContent;return o});
  rec('M2','Elle SALDIRI binekten indirir (hız düşer); 2,5 sn savaşsız kalınca yeniden biner; düşman vuruşu da indirir; binek KAPALI iken hiç binilmez',r.riding0&&r.afterAttack===false&&r.spd1<r.spd0&&r.at1s===false&&r.at3s===true&&r.afterHit===false&&r.off===false&&/KAPALI/.test(r.btn)&&!pg.errs.length,r);
  await pg.evaluate(()=>{state.mount=true;km336FightT=0;km336Sync();window.__kmTest.enter('forest',470,425)});await sleep(200);await pg.screenshot({path:path.join(OUT,'binek_yolda.png')});
  await pg.evaluate(()=>{const p=state.player,e=state.enemies[0];e.x=p.x+30;e.y=p.y;p.cd=0;document.getElementById('attackBtn').click()});await sleep(200);await pg.screenshot({path:path.join(OUT,'binek_savasta_indi.png')});await ctx.close()}
 fs.writeFileSync(path.join(OUT,'test_sonuclari_3_36_binek.json'),JSON.stringify(results,null,1));const s={PASS:0,FAIL:0};for(const x of results)s[x.status]++;console.log('ÖZET',s);await b.close()})();
