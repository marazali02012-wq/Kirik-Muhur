// Kırık Mühür 3.33 — 3C/2 beceri sistemi testleri
const {chromium,devices}=require('playwright');const fs=require('fs'),path=require('path');
const [,,FILE,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const results=[];const rec=(id,name,ok,ev)=>{results.push({id,name,status:ok?'PASS':'FAIL',evidence:ev});console.log((ok?'PASS':'FAIL').padEnd(5),id,name,'—',JSON.stringify(ev).slice(0,700))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();
 const open=async(o={})=>{const ctx=await b.newContext({...devices['Pixel 7'],...(o.vp?{viewport:o.vp}:{}),ignoreHTTPSErrors:true});if(o.init)await ctx.addInitScript(o.init,o.arg);const pg=await ctx.newPage();pg.errs=[];pg.on('pageerror',e=>pg.errs.push(e.message));await pg.goto(o.url||('file://'+FILE));await sleep(700);if(!o.noClass){await pg.tap(`[data-class="${o.cls||'guardian'}"]`);await sleep(250)}return {ctx,pg}};
 // S1 açılım seviyeleri ve kilitli yuvalar
 for(const cls of ['guardian','scout','weaver']){const {ctx,pg}=await open({cls});const r=await pg.evaluate(()=>{const T=window.__kmTest,o={};T.enter('forest',470,425);const p=state.player;
   const lk=id=>{const b=document.getElementById(id);return {lock:b.classList.contains('km333lock'),tag:b.dataset.lock||'',cap:b.querySelector('.caption').textContent}};syncUI();o.hud1={s2:lk('skill2'),s3:lk('skill3')};
   const mp0=p.mp;T.secondSkill();T.skill3();o.lockedNoCost=p.mp===mp0&&!(p.skill2Cd>0)&&!(p.skill3Cd>0);
   let need=0;for(let l=1;l<3;l++)need+=l*95;earnXP(need-state.xp);o.lv=state.level;o.banner=km331BannerText;syncUI();o.hud3={s2:lk('skill2'),s3:lk('skill3')};
   p.mp=p.maxMp;for(const e of state.enemies)e.x=p.x+30,e.y=p.y;T.secondSkill();o.s2used=p.skill2Cd>0;
   while(state.level<8)earnXP(state.level*95-state.xp);o.lv8=state.level;o.banner8=km331BannerText;syncUI();o.hud8=lk('skill3');
   T.enter('forest',470,425);for(const e of state.enemies){e.x=p.x+20;e.y=p.y+10;e.hp=e.maxHp=99999}p.mp=p.maxMp;const hp0=state.enemies.map(e=>e.hp);T.skill3();o.hit=state.enemies.filter((e,i)=>e.hp<hp0[i]).length;o.n=state.enemies.length;o.s3cd=p.skill3Cd;o.name=km331BannerText;return o});
  rec('S1-'+cls,'Açılım: Beceri 2 Sv3, Beceri 3 Sv8; kilitliyken 🔒SvN etiketi ve kullanılamaz (ruh harcanmaz); seviye atlayınca "YENİ BECERİ"; Beceri 3 en fazla 6 düşmana vurur',r.hud1.s2.lock&&r.hud1.s2.tag==='🔒Sv3'&&r.hud1.s3.tag==='🔒Sv8'&&r.hud1.s3.cap==='🔒 SV8'&&r.hud8.cap==='BECERİ 3'&&r.lockedNoCost&&r.lv===3&&/YENİ BECERİ/.test(r.banner)&&!r.hud3.s2.lock&&r.hud3.s3.lock&&r.s2used&&r.lv8===8&&/YENİ BECERİ/.test(r.banner8)&&!r.hud8.lock&&r.hit===Math.min(6,r.n)&&r.hit>0&&r.s3cd>13&&!pg.errs.length,r);await ctx.close()}
 // S2 yükseltme: maliyet, karakter seviyesi sınırı, +10 sınırı, hasar artışı
 {const {ctx,pg}=await open();const r=await pg.evaluate(()=>{const T=window.__kmTest,o={},p=state.player;T.enter('forest',470,425);const e=state.enemies[0];e.def=0;
   const hit=()=>{p.skillCd=0;p.mp=p.maxMp;e.dead=false;e.hp=e.maxHp=1e6;e.x=p.x+20;e.y=p.y;state.targetId=e.id;T.skill();return 1e6-e.hp};
   o.d1=hit();state.coins=100000;state.materials=1000;o.capLv=T.skillUp('s1');state.level=20;baseStats();const c0=state.coins,m0=state.materials;o.up1=T.skillUp('s1');o.cost={gold:c0-state.coins,toz:m0-state.materials};
   for(let i=0;i<15;i++)T.skillUp('s1');o.lv=T.get().skillLv.s1;o.d10=hit();o.atk=p.attack;
   state.coins=0;o.poor=T.skillUp('s2');o.lockUp=(state.level=2,T.skillUp('s3'));return o});
  rec('S2','Yükseltme: beceri seviyesi karakter seviyesini geçemez; maliyet 30×Sv altın + Sv toz; en fazla Sv10; Sv10 hasarı ×1.9; parasızken ve kilitliyken yükselmez',r.capLv===false&&r.up1===true&&r.cost.gold===30&&r.cost.toz===1&&r.lv===10&&r.d10>r.d1*1.5&&r.poor===false&&r.lockUp===false&&!pg.errs.length,r);await ctx.close()}
 // S3 oto beceri sırası
 {const {ctx,pg}=await open();const r=await pg.evaluate(()=>{const T=window.__kmTest,o={},p=state.player;state.level=8;baseStats();T.enter('forest',470,425);for(const e of state.enemies){e.x=p.x+25;e.y=p.y;e.hp=e.maxHp=99999}
   const reset=()=>{p.mp=p.maxMp;p.skillCd=0;p.skill2Cd=0;p.skill3Cd=0};reset();o.def=T.get().skillAuto.join();o.first=T.autoCast();reset();T.skillFront('s2');o.order2=T.get().skillAuto.join();o.second=T.autoCast();
   reset();T.skillToggle('s2');o.order3=T.get().skillAuto.join();o.third=T.autoCast();T.skillToggle('s3');T.skillToggle('s1');reset();o.none=T.autoCast();o.mpKept=p.mp===p.maxMp;
   T.skillToggle('s1');reset();p.mp=10;o.noMp=T.autoCast();return o});
  rec('S3','Oto beceri sırası: varsayılan s3,s1,s2; öne alma ve kapatma oto savaşı değiştirir; hepsi kapalı/ruh yetersizse beceri kullanılmaz',r.def==='s3,s1,s2'&&r.first==='s3'&&r.order2==='s2,s3,s1'&&r.second==='s2'&&r.order3==='s3,s1'&&r.third==='s3'&&r.none===null&&r.mpKept&&r.noMp===null&&!pg.errs.length,r);await ctx.close()}
 // S4 gerçek oto savaş döngüsünde sıra kullanılır
 {const {ctx,pg}=await open();const r=await pg.evaluate(()=>{const T=window.__kmTest,o={},p=state.player;state.level=8;baseStats();p.hp=p.maxHp;p.mp=p.maxMp;T.enter('forest',470,425);for(const e of state.enemies){e.x=p.x+30;e.y=p.y;e.hp=e.maxHp=99999;e.attack=0}
   state.skillAuto=['s2'];state.autoBattle=true;for(let i=0;i<6;i++)T.step(.05);o.s2=p.skill2Cd>0;o.s1=p.skillCd>0;o.s3=(p.skill3Cd||0)>0;return o});
  rec('S4','Gerçek oto savaş: yalnız sıradaki beceriler kullanılır (sıra=[s2] → s2 evet, s1/s3 hayır)',r.s2&&!r.s1&&!r.s3&&!pg.errs.length,r);await ctx.close()}
 // S5 kayıt (HTTPS) + bozuk kayıt
 {const {ctx,pg}=await open({url:URL});const before=await pg.evaluate(()=>{const T=window.__kmTest;state.level=9;baseStats();state.coins=9999;state.materials=99;T.skillUp('s1');T.skillUp('s1');T.skillUp('s3');T.skillFront('s2');T.skillToggle('s3');save();return {lv:T.get().skillLv,auto:T.get().skillAuto}});
  await pg.reload();await sleep(900);const after=await pg.evaluate(()=>({lv:window.__kmTest.get().skillLv,auto:window.__kmTest.get().skillAuto}));
  rec('S5','Kayıt/yükleme: beceri seviyeleri ve oto sıra birebir',JSON.stringify(before)===JSON.stringify(after)&&before.lv.s1===3&&!pg.errs.length,{before,after});await ctx.close()}
 {const mk=(extra)=>JSON.stringify({questSchema:332,classId:'scout',level:6,coins:100,missionIndex:3,quest:3,questPhase:'ready',questRewards:['mission-0','mission-1','mission-2'],inv:['bow','armor'],equipment:{weapon:'bow'},zone:'village',x:475,y:580,...extra});
  const out={};for(const [k,sv] of [['eski',mk({})],['bozuk',mk({skillLv:{s1:99,s2:'x',heal:-4,s3:2.6,zz:5},skillAuto:['bad','s1','s1','heal','s3']})]]){
   const {ctx,pg}=await open({noClass:true,init:(sv)=>{if(!sessionStorage.getItem('i')){sessionStorage.setItem('i','1');localStorage.clear();localStorage.setItem('kirikMuhurQuestFlowV324Test',sv)}},arg:sv});
   out[k]=await pg.evaluate(()=>({mode:window.__kmTest.get().mode,lv:window.__kmTest.get().skillLv,auto:window.__kmTest.get().skillAuto}));out[k].errs=pg.errs.length;await ctx.close()}
  rec('S6','Eski kayıt (beceri alanı yok) varsayılanla açılır; bozuk beceri kaydı sınırlanır/ayıklanır',out.eski.mode==='game'&&JSON.stringify(out.eski.lv)==='{"s1":1,"s2":1,"heal":1,"s3":1}'&&out.eski.auto.join()==='s3,s1,s2'&&out.bozuk.lv.s1===10&&out.bozuk.lv.s2===1&&out.bozuk.lv.heal===1&&out.bozuk.lv.s3===2&&!('zz' in out.bozuk.lv)&&out.bozuk.auto.join()==='s1,s3'&&!out.eski.errs&&!out.bozuk.errs,out)}
 // S7 arayüz: beceri ekranı + HUD 4 yuva, 4 ekran
 for(const vp of [{width:320,height:568},{width:360,height:640},{width:393,height:852},{width:412,height:915}]){const {ctx,pg}=await open({vp});
  await pg.evaluate(()=>{state.level=3;baseStats();state.coins=500;state.materials=20;syncUI()});await sleep(120);
  const hud=await pg.evaluate(()=>{const ids=['skill1','skill2','healBtn','skill3','attackBtn','battleToggle','interactBtn'];const R=ids.map(i=>{const e=document.getElementById(i);const r=e.getBoundingClientRect();return {i,x:r.left,y:r.top,w:r.width,h:r.height,v:getComputedStyle(e).display!=='none'&&r.width>0}});
   const ov=[];for(let a=0;a<R.length;a++)for(let c=a+1;c<R.length;c++){const A=R[a],B=R[c];if(!A.v||!B.v)continue;if(A.x<B.x+B.w-1&&B.x<A.x+A.w-1&&A.y<B.y+B.h-1&&B.y<A.y+A.h-1)ov.push(A.i+'×'+B.i)}
   const s3=R[3],s1=R[0];return {ov,same:Math.abs(s3.w-s1.w)<1&&Math.abs(s3.h-s1.h)<1,inScreen:R.filter(r=>r.v).every(r=>r.x>=0&&r.y>=0&&r.x+r.w<=innerWidth+1&&r.y+r.h<=innerHeight+1),s3:{w:s3.w,h:s3.h,v:s3.v}}});
  await pg.screenshot({path:path.join(OUT,`hud_${vp.width}x${vp.height}.png`)});
  await pg.tap('#skillsBtn').catch(()=>pg.evaluate(()=>openModal('skills')));await sleep(200);if(!(await pg.$('.km333list')))await pg.evaluate(()=>openModal('skills'));await sleep(150);
  const ui=await pg.evaluate(()=>{const m=document.getElementById('modalBody').getBoundingClientRect();const btn=[...document.querySelectorAll('.km333list button,.km333auto button')].map(b=>Math.min(b.getBoundingClientRect().width,b.getBoundingClientRect().height));return {cards:document.querySelectorAll('.km333card').length,locked:document.querySelectorAll('.km333card.lock').length,fits:m.left>=0&&m.right<=innerWidth+1,minBtn:Math.min(...btn)}});
  await pg.screenshot({path:path.join(OUT,`beceri_${vp.width}x${vp.height}.png`)});
  await pg.tap('[data-up="s1"]');await sleep(150);const lv=await pg.evaluate(()=>window.__kmTest.get().skillLv.s1);
  rec(`S7-${vp.width}x${vp.height}`,'Arayüz: HUD 4 beceri yuvası çakışmasız, ekranda ve diğer yuvalarla aynı boyda; beceri ekranında 4 kart (Sv3: 1 kilitli), panel sığar, düğmeler ≥44 px, YÜKSELT çalışır',!hud.ov.length&&hud.inScreen&&hud.s3.v&&hud.same&&ui.cards===4&&ui.locked===1&&ui.fits&&ui.minBtn>=44&&lv===2&&!pg.errs.length,{hud,ui,lv});await ctx.close()}
 fs.writeFileSync(path.join(OUT,'test_sonuclari_3_33.json'),JSON.stringify(results,null,1));const s={PASS:0,FAIL:0};for(const x of results)s[x.status]++;console.log('ÖZET',s);await b.close()})();
