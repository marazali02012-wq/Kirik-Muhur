const {chromium}=require('playwright');
const file=process.argv[2];
(async()=>{
 const b=await chromium.launch();
 for(const cls of ['guardian','scout','weaver']){
  const ctx=await b.newContext({viewport:{width:393,height:852},hasTouch:true,isMobile:true});
  const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));pg.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await pg.goto('file://'+file);await pg.waitForTimeout(500);
  await pg.click(`[data-class="${cls}"]`);await pg.waitForTimeout(200);
  const res=await pg.evaluate(async()=>{
   const T=window.__kmTest;const log=[];let simT=0;
   for(let mi=0;mi<15;mi++){
    if(T.get().rewardOpen)T.closeModal();const startQ=T.get().quest;T.questAction();
    let t=0,ok=false,lastPh='';
    while(t<400){ // seconds sim
      // auto heal: keep alive by topping up if dead
      const g=T.get();
      if(g.mode==='dead'){log.push({mi,ev:'dead',zone:g.zone,ph:g.questPhase});document.getElementById('respawn').click();T.questAction();}
      if(document.getElementById('modal').classList.contains('hidden')===false && g.mode==='game'){T.closeModal()}
      for(let k=0;k<20;k++)T.step(0.05);t+=1;
      const h=T.get();
      if(h.questPhase!==lastPh){lastPh=h.questPhase}
      if(h.quest>startQ){ok=true;break}
    }
    const g=T.get();
    log.push({mi,ok,t,title:g.questInfo.title,ph:g.questPhase,zone:g.zone,kills:g.missionKills,coins:g.coins,lvl:T.get().player.maxHp,rewards:g.questRewards.length,pos:[Math.round(g.player.x),Math.round(g.player.y)],auto:g.autoPath});
    if(!ok)break;
   }
   return log;
  });
  console.log(cls,JSON.stringify(res,null,0).replace(/\},\{/g,'},\n{'));console.log('errors',errs);
  await ctx.close();
 }
 await b.close();
})();
