const {chromium}=require('playwright');
const file=process.argv[2];
(async()=>{
 const b=await chromium.launch();const out={};
 async function fresh(cls='guardian',pre){const ctx=await b.newContext({viewport:{width:393,height:852},hasTouch:true,isMobile:true});const pg=await ctx.newPage();pg.errs=[];pg.on('pageerror',e=>pg.errs.push(e.message));
  if(pre)await ctx.addInitScript(pre);
  await pg.goto('file://'+file);await pg.waitForTimeout(400);if(cls)await pg.click(`[data-class="${cls}"]`);await pg.waitForTimeout(150);return {ctx,pg}}
 const run=(pg,n)=>pg.evaluate(n=>{for(let i=0;i<n;i++)window.__kmTest.step(.05)},n);
 // A reward popup
 {const {ctx,pg}=await fresh();await pg.evaluate(()=>window.__kmTest.questAction());
  for(let i=0;i<60;i++){await run(pg,20);const g=await pg.evaluate(()=>window.__kmTest.get().quest);if(g>0)break}
  out.A_popupAfterDelivery=await pg.evaluate(()=>({quest:window.__kmTest.get().quest,modalHidden:document.getElementById('modal').classList.contains('hidden'),rewardVisible:document.getElementById('modal').classList.contains('rewardVisible')}));await ctx.close()}
 // B manual kill counting
 {const {ctx,pg}=await fresh();await pg.evaluate(()=>window.__kmTest.questAction());
  await pg.touchscreen.tap(200,500);await run(pg,2);
  out.B_manual=await pg.evaluate(()=>{const T=window.__kmTest;const a=T.get().autoPath;T.enter('forest',240,610);T.kill('shade1');T.kill('shade2');T.kill('shade3');for(let i=0;i<40;i++)T.step(.05);const g=T.get();return {autoAfterTap:a,phase:g.questPhase,kills:g.missionKills}});await ctx.close()}
 // C manual inspect
 {const {ctx,pg}=await fresh();out.C_inspect=await pg.evaluate(()=>{const T=window.__kmTest;T.setQuest(2);T.questAction();T.get();
   // manual takeover
   document.getElementById('autoPath').click();T.setPlayer(1048,752);for(let i=0;i<40;i++)T.step(.05);const g=T.get();return {phase:g.questPhase,kills:g.missionKills,auto:g.autoPath}});await ctx.close()}
 // D relic duplicate / boss farm before mission
 {const {ctx,pg}=await fresh();out.D_boss=await pg.evaluate(()=>{const T=window.__kmTest;const r=[];for(let k=0;k<3;k++){T.enter('arena',800,445);const b=T.get().enemies.find(e=>e.id==='boss1');if(b){T.kill('boss1');T.setPlayer(930,445);for(let i=0;i<5;i++)T.step(.05)}}const g=T.get();return {relics:g.inventory.filter(x=>x==='relic').length}});await ctx.close()}
 // E corrupted save overwritten
 {const {ctx,pg}=await fresh(null,()=>{if(!sessionStorage.getItem('x')){sessionStorage.setItem('x',1);localStorage.setItem('kirikMuhurQuestFlowV324Test','{"classId":"guardian",BROKEN')}});
  const before=await pg.evaluate(()=>({mode:window.__kmTest.get().mode,fatal:document.getElementById('fatal').textContent}));
  await pg.click('[data-class="scout"]');await pg.waitForTimeout(100);
  out.E_corrupt={before,after:await pg.evaluate(()=>localStorage.getItem('kirikMuhurQuestFlowV324Test').slice(0,40)),backups:await pg.evaluate(()=>Object.keys(localStorage))};await ctx.close()}
 // F unreachable target repath per frame
 {const {ctx,pg}=await fresh();out.F_repath=await pg.evaluate(()=>{const T=window.__kmTest;T.setPlayer(450,420);T.move(620,190); // inside building obstacle
   let xs=[];for(let i=0;i<120;i++){T.step(1/60);xs.push(T.get().player.x)}const g=T.get();return {moveTarget:g.moveTarget,last:[Math.round(g.player.x),Math.round(g.player.y)],jitter:xs.slice(-20).map(x=>x.toFixed(1)).join(',')}});
  // time cost of tick while stuck
  out.F_tickMs=await pg.evaluate(()=>{const T=window.__kmTest;const t=performance.now();for(let i=0;i<60;i++)T.step(1/60);return (performance.now()-t)/60});await ctx.close()}
 // G HP persistence
 {const {ctx,pg}=await fresh();await pg.evaluate(()=>{const T=window.__kmTest;T.enter('forest',480,430);});await run(pg,80);
  const hpBefore=await pg.evaluate(()=>{const T=window.__kmTest;T.enter('village',475,580);return T.get().player.hp});await pg.reload();await pg.waitForTimeout(400);
  out.G_hp={hpBefore,hpAfter:await pg.evaluate(()=>window.__kmTest.get().player.hp)};await ctx.close()}
 // H position persisted on close
 {const {ctx,pg}=await fresh();await pg.evaluate(()=>{const T=window.__kmTest;T.move(700,700)});await run(pg,60);const pos=await pg.evaluate(()=>{const p=window.__kmTest.get().player;return [Math.round(p.x),Math.round(p.y)]});await pg.reload();await pg.waitForTimeout(400);
  out.H_pos={before:pos,after:await pg.evaluate(()=>{const p=window.__kmTest.get().player;return [Math.round(p.x),Math.round(p.y)]})};await ctx.close()}
 // J collect quest restore in forest marks shades dead
 {const {ctx,pg}=await fresh();out.J=await pg.evaluate(()=>{const T=window.__kmTest;T.setQuest(4);T.questAction();T.enter('forest',300,700);for(let i=0;i<3;i++){}return T.get().enemies.map(e=>e.dead)});
   await pg.evaluate(()=>{const T=window.__kmTest;T.setPlayer(490,811);for(let i=0;i<10;i++)T.step(.05);T.setPlayer(760,808);for(let i=0;i<10;i++)T.step(.05);});
   await pg.reload();await pg.waitForTimeout(400);out.J_after=await pg.evaluate(()=>({k:window.__kmTest.get().missionKills,dead:window.__kmTest.get().enemies.map(e=>e.dead)}));await ctx.close()}
 // K invalid phase lock
 {const {ctx,pg}=await fresh(null,()=>{if(!sessionStorage.getItem('x')){sessionStorage.setItem('x',1);localStorage.setItem('kirikMuhurQuestFlowV324Test',JSON.stringify({questSchema:324,classId:'weaver',level:'abc',questPhase:'weird',inv:['sword','ghostitem'],equipment:{weapon:'ghostitem'},coins:'x'}))}});
  out.K=await pg.evaluate(()=>{const T=window.__kmTest;T.questAction();for(let i=0;i<20;i++)T.step(.05);const g=T.get();let invErr=null;try{document.getElementById('bagBtn').click()}catch(e){invErr=e.message}return {phase:g.questPhase,coins:g.coins,atk:g.player.attack,fatal:document.getElementById('fatal').textContent,invErr}});out.K.errs=pg.errs;await ctx.close()}
 console.log(JSON.stringify(out,null,1));await b.close();
})();
