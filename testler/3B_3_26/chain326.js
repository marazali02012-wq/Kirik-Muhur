const {chromium}=require('playwright');
const [,,file,N]=process.argv;
(async()=>{const b=await chromium.launch();
 for(const cls of ['guardian','scout','weaver']){const ctx=await b.newContext({viewport:{width:393,height:852},hasTouch:true,isMobile:true});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
  await pg.goto('file://'+file);await pg.waitForTimeout(500);await pg.tap(`[data-class="${cls}"]`);await pg.waitForTimeout(150);
  const r=await pg.evaluate(async(N)=>{const T=window.__kmTest;const log=[];
   for(let i=0;i<N;i++){if(T.get().rewardOpen)T.closeModal();const g0=T.get(),q0=g0.quest,info=g0.questInfo;T.questAction();let t=0,deaths=0,zones=new Set();
    while(t<8000&&T.get().quest===q0){const g=T.get();zones.add(g.zone);if(g.rewardOpen)T.closeModal();if(g.mode==='dead'){deaths++;document.getElementById('respawn').click();T.questAction()}T.step(.05);t++}
    const g=T.get();log.push({i:q0,t:info.title,k:info.kind,ok:g.quest===q0+1,s:Math.round(t*.05),d:deaths,lv:g.player.maxHp,ph:g.questPhase,z:[...zones].join('/'),pop:g.lastReward&&g.lastReward.id===('mission-'+q0)});if(g.quest===q0)break}
   const g=T.get();return {log,unique:new Set(g.questRewards).size===g.questRewards.length,unlocked:g.unlocked}},+N||26);
  console.log(cls,r.unique,r.unlocked.join(','));for(const l of r.log)if(!l.ok||l.d||!l.pop||l.s>60)console.log('  ',JSON.stringify(l));console.log('  ok',r.log.filter(l=>l.ok).length,'/',r.log.length,'deaths',r.log.reduce((a,l)=>a+l.d,0),'errs',errs);await ctx.close()}
 await b.close()})();
