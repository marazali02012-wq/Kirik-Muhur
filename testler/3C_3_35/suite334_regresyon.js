// Kırık Mühür 3.34 — 3C/3 denge, seviye atlama gösterisi, sadık/binek seviyeleri, önerilen güç
const {chromium,devices}=require('playwright');const fs=require('fs'),path=require('path');
const [,,FILE,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const results=[];const rec=(id,name,ok,ev)=>{results.push({id,name,status:ok?'PASS':'FAIL',evidence:ev});console.log((ok?'PASS':'FAIL').padEnd(5),id,name,'—',JSON.stringify(ev).slice(0,700))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();
 const open=async(o={})=>{const ctx=await b.newContext({...devices['Pixel 7'],...(o.vp?{viewport:o.vp}:{}),ignoreHTTPSErrors:true});if(o.init)await ctx.addInitScript(o.init,o.arg);const pg=await ctx.newPage();pg.errs=[];pg.on('pageerror',e=>pg.errs.push(e.message));await pg.goto(o.url||('file://'+FILE));await sleep(700);if(!o.noClass){await pg.tap(`[data-class="${o.cls||'guardian'}"]`);await sleep(250)}return {ctx,pg}};
 // D1 zorluk ölçeği
 {const {ctx,pg}=await open();const r=await pg.evaluate(()=>{const o={};const pick=(z,id)=>{const e=enemiesFor(z).find(x=>x.id===id);return e?{hp:e.hp,atk:e.attack,def:e.def,lvl:e.lvl}:null};
   state.missionIndex=0;o.shade0=pick('forest','shade1');state.missionIndex=1;state.questPhase='hunt';o.boss1=pick('arena','boss1');
   state.missionIndex=13;state.questPhase='ready';o.shade13=pick('forest','shade1');o.thorn13=pick('forest','thorn1');state.missionIndex=20;o.shade20=pick('forest','shade1');
   const m15=KM323_STORY?KM323_STORY.findIndex(x=>x.id==='ashlord'):-1;o.m15=m15;if(m15>=0){state.missionIndex=m15;state.questPhase='hunt';o.ash=pick('ashpass','ashlord1')}return o});
  rec('D1','Zorluk ölçeği: yaratık canı/saldırısı görev sırasıyla artar (en fazla k=12); Kolos 572 can/16 saldırı; Kül Lordu 1265/30',r.shade0.hp===78&&r.shade0.atk===8&&r.shade13.hp===78+12*14&&r.shade13.atk===Math.round((7+12*.8)*1.1)&&JSON.stringify(r.shade20)===JSON.stringify(r.shade13)&&r.boss1.hp===572&&r.boss1.atk===16&&(!r.ash||(r.ash.hp===1265&&r.ash.atk===30))&&r.thorn13.hp>r.shade13.hp&&!pg.errs.length,r);await ctx.close()}
 // D2 seviye atlama gösterisi: gerçek stat farkı
 for(const [cls,vp] of [['guardian',null],['weaver',{width:320,height:568}]]){const {ctx,pg}=await open({cls,vp});const r=await pg.evaluate(()=>{const T=window.__kmTest,p=state.player,o={};const b={hp:p.maxHp,atk:p.attack,def:p.def,mp:p.maxMp,pw:km324Power()};earnXP(95-state.xp);const s=T.levelShow();o.show=s;o.real={hp:p.maxHp-b.hp,atk:p.attack-b.atk,def:p.def-b.def,mp:p.maxMp-b.mp,pw:km324Power()-b.pw};o.pe=getComputedStyle(document.getElementById('km334Lv')).pointerEvents;return o});
  await sleep(600);const fit=await pg.evaluate(()=>{const r=document.querySelector('#km334Lv h2').getBoundingClientRect();return r.left>=0&&r.right<=innerWidth+1});await pg.screenshot({path:path.join(OUT,`seviye_${cls}.png`)});await sleep(2700);const gone=await pg.evaluate(()=>window.__kmTest.levelShow());
  rec('D2-'+cls,'Seviye atlama: ortada "SEVİYE ATLADIN", Sv1→Sv2, gösterilen CAN/SAL/SAV/RUH/GÜÇ artışı gerçek farka eşit; dokunmayı engellemez; ~2,4 sn sonra kapanır',r.show&&/SEVİYE ATLADIN/.test(r.show.text)&&/Sv 1 → Sv 2/.test(r.show.text)&&JSON.stringify(r.show.d)===JSON.stringify(r.real)&&r.real.hp>0&&r.real.atk>0&&r.pe==='none'&&fit&&gone===null&&!pg.errs.length,{...r,fit,gone});await ctx.close()}
 // D3 sadık/binek seviyeleri
 {const {ctx,pg}=await open();const r=await pg.evaluate(()=>{const T=window.__kmTest,p=state.player,o={};state.coins=100000;state.materials=1000;o.mountLocked=T.petUp('mount');o.petCap=T.petUp('pet');
   state.level=12;baseStats();const d0=km334PetDmg(),c0=km334PetCd();const g0=state.coins;o.up=T.petUp('pet');o.cost=g0-state.coins;o.dmg=[d0,km334PetDmg()];o.cd=[c0,km334PetCd()];
   for(let i=0;i<15;i++)T.petUp('pet');o.petLv=T.get().petLv;
   state.mount=true;baseStats();const s0=p.speed,h0=p.maxHp;for(let i=0;i<4;i++)T.petUp('mount');o.mountLv=T.get().mountLv;o.speed=[s0,p.speed];o.hp=[h0,p.maxHp];
   state.coins=0;o.poor=T.petUp('mount');
   // tilki gerçekten seviyeli hasar verir
   state.pet=true;T.enter('forest',470,425);const e=state.enemies[0];e.x=p.x+40;e.y=p.y;e.hp=e.maxHp=99999;state.petTimer=0;T.step(.05);o.petHit=99999-e.hp;o.expect=km334PetDmg();return o});
  rec('D3','Sadık/binek: Sv1’de binek kilitli; seviye karakter seviyesini geçemez; tilki hasarı ↑ bekleme ↓; binek hızı ve kalıcı can ↑; en fazla Sv10; parasız yükselmez; tilki seviyeli hasarı gerçekten vurur',r.mountLocked===false&&r.petCap===false&&r.up===true&&r.cost===40&&r.dmg[1]>r.dmg[0]&&r.cd[1]<r.cd[0]&&r.petLv===10&&r.mountLv===5&&r.speed[1]>r.speed[0]&&r.hp[1]>r.hp[0]&&r.poor===false&&r.petHit===r.expect&&!pg.errs.length,r);await ctx.close()}
 // D4 kayıt
 {const {ctx,pg}=await open({url:URL});const before=await pg.evaluate(()=>{const T=window.__kmTest;state.level=6;baseStats();state.coins=9999;state.materials=99;T.petUp('pet');T.petUp('pet');T.petUp('mount');save();return {pet:T.get().petLv,mount:T.get().mountLv,hp:state.player.maxHp}});
  await pg.reload();await sleep(900);const after=await pg.evaluate(()=>({pet:window.__kmTest.get().petLv,mount:window.__kmTest.get().mountLv,hp:state.player.maxHp}));
  const sv=JSON.stringify({questSchema:333,classId:'weaver',level:4,coins:10,missionIndex:2,quest:2,questPhase:'ready',questRewards:['mission-0','mission-1'],inv:['staff'],equipment:{weapon:'staff'},petLv:99,mountLv:'x',zone:'village',x:475,y:580});
  const c2=await open({noClass:true,init:(sv)=>{if(!sessionStorage.getItem('i')){sessionStorage.setItem('i','1');localStorage.clear();localStorage.setItem('kirikMuhurQuestFlowV324Test',sv)}},arg:sv});
  const bad=await c2.pg.evaluate(()=>({mode:window.__kmTest.get().mode,pet:window.__kmTest.get().petLv,mount:window.__kmTest.get().mountLv}));
  rec('D4','Kayıt: sadık/binek seviyesi ve can birebir; bozuk değerler sınırlanır (99→10, "x"→1)',JSON.stringify(before)===JSON.stringify(after)&&before.pet===3&&before.mount===2&&bad.mode==='game'&&bad.pet===10&&bad.mount===1&&!pg.errs.length&&!c2.pg.errs.length,{before,after,bad});await ctx.close();await c2.ctx.close()}
 // D5 önerilen güç
 {const {ctx,pg}=await open();const r=await pg.evaluate(()=>{const T=window.__kmTest,o={};openModal('quests');o.low=document.querySelector('.km334rec')?.textContent;o.lowCls=document.querySelector('.km334rec')?.classList.contains('low');closeModal();
   state.coins=1e5;state.materials=1e3;state.level=10;baseStats();openModal('quests');o.ok=document.querySelector('.km334rec')?.textContent;o.okCls=document.querySelector('.km334rec')?.classList.contains('low');o.rec=T.get().rec;o.pw=km324Power();closeModal();return o});
  rec('D5','Görev ekranında "Önerilen güç" ve oyuncunun gücü; güç düşükse kırmızı uyarı, yeterliyse yeşil',/Önerilen güç: 90/.test(r.low||'')&&r.rec===90&&r.okCls===false&&/Senin gücün/.test(r.ok||'')&&!pg.errs.length,r);await ctx.close()}
 {const {ctx,pg}=await open();const r=await pg.evaluate(()=>{state.missionIndex=15;openModal('quests');const e=document.querySelector('.km334rec');const o={t:e?.textContent,low:e?.classList.contains('low')};closeModal();return o});
  rec('D5b','Güç önerinin altındaysa kırmızı uyarı ve "ekipman/beceri güçlendir" ipucu',r.low===true&&/güçlendir/.test(r.t||'')&&!pg.errs.length,r);await ctx.close()}
 // D6 arayüz
 for(const vp of [{width:320,height:568},{width:393,height:852}]){const {ctx,pg}=await open({vp});await pg.evaluate(()=>{state.level=5;baseStats();state.coins=900;state.materials=40;syncUI()});await pg.tap('#quickBtn').catch(()=>{});await sleep(200);if(!(await pg.$('#km334PetUp')))await pg.evaluate(()=>openModal('companion'));await sleep(150);
  const ui=await pg.evaluate(()=>{const m=document.getElementById('modalBody').getBoundingClientRect();const bs=['km334PetUp','km334MountUp'].map(i=>document.getElementById(i).getBoundingClientRect());return {fits:m.left>=0&&m.right<=innerWidth+1,minH:Math.min(...bs.map(r=>r.height)),txt:document.getElementById('modalBody').textContent.match(/Sv\d+\/10/g)}});
  await pg.screenshot({path:path.join(OUT,`sadik_${vp.width}x${vp.height}.png`)});await pg.tap('#km334PetUp');await sleep(120);const lv=await pg.evaluate(()=>window.__kmTest.get().petLv);
  rec(`D6-${vp.width}x${vp.height}`,'Sadık ekranı: seviye etiketi, YÜKSELT düğmeleri ≥44 px, panel sığar, dokununca tilki Sv2',ui.fits&&ui.minH>=44&&ui.txt&&ui.txt.length===2&&lv===2&&!pg.errs.length,{...ui,lv});await ctx.close()}
 fs.writeFileSync(path.join(OUT,'test_sonuclari_3_34.json'),JSON.stringify(results,null,1));const s={PASS:0,FAIL:0};for(const x of results)s[x.status]++;console.log('ÖZET',s);await b.close()})();
