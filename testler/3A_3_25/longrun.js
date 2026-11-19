const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OUT,MIN]=process.argv;const DUR=(+MIN||30)*60e3;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:393,height:852},hasTouch:true,isMobile:true,ignoreHTTPSErrors:true});
 const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(new Date().toISOString()+' '+e.message));pg.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 const cdp=await ctx.newCDPSession(pg);await cdp.send('Performance.enable');
 await pg.goto(URL);await pg.waitForTimeout(800);await pg.tap('[data-class="scout"]');
 await pg.evaluate(()=>{window.__fps=[];let n=0,t0=performance.now();(function f(t){n++;if(t-t0>=5000){window.__fps.push(Math.round(n*1000/(t-t0)));n=0;t0=t}requestAnimationFrame(f)})(performance.now())});
 const start=Date.now();let lastReload=start,reloads=0,taps=0,popups=0,deaths=0;const samples=[];let lastQuest=0,maxQuest=0;
 while(Date.now()-start<DUR){await pg.waitForTimeout(1500);
  const g=await pg.evaluate(()=>window.__kmTest.get());maxQuest=Math.max(maxQuest,g.quest);
  if(g.rewardOpen){await pg.tap('#km325RewardOk').catch(()=>{});popups++}
  else if(g.mode==='dead'){deaths++;await pg.tap('#respawn').catch(()=>{});await pg.waitForTimeout(300);await pg.tap('#trackBtn').catch(()=>{});taps++}
  else if(g.mode==='game'&&(g.questPhase==='ready'||!g.autoPath)){await pg.tap('#trackBtn').catch(()=>{});taps++}
  if(Date.now()-lastReload>5*60e3){const before=await pg.evaluate(()=>{const g=window.__kmTest.get();return {q:g.quest,c:g.coins,r:g.questRewards.length}});await pg.reload();await pg.waitForTimeout(800);reloads++;lastReload=Date.now();
   const after=await pg.evaluate(()=>{const g=window.__kmTest.get();return {q:g.quest,c:g.coins,r:g.questRewards.length}});samples.push({reload:reloads,before,after,match:JSON.stringify(before)===JSON.stringify(after)});
   await pg.evaluate(()=>{window.__fps=[];let n=0,t0=performance.now();(function f(t){n++;if(t-t0>=5000){window.__fps.push(Math.round(n*1000/(t-t0)));n=0;t0=t}requestAnimationFrame(f)})(performance.now())});}
  if((Date.now()-start)%60000<1600){const m=await cdp.send('Performance.getMetrics');const heap=m.metrics.find(x=>x.name==='JSHeapUsedSize').value;const fps=await pg.evaluate(()=>window.__fps.slice(-3));samples.push({min:Math.round((Date.now()-start)/60000),heapMB:+(heap/1048576).toFixed(1),fps,quest:g.quest,phase:g.questPhase});fs.writeFileSync(OUT,JSON.stringify({running:true,samples,errs},null,1))}
 }
 const g=await pg.evaluate(()=>window.__kmTest.get());
 const res={minutes:Math.round((Date.now()-start)/60000),env:'Headless Chromium (Playwright), 393x852 dokunmatik emülasyon, yerel HTTPS',questsCompleted:g.quest,maxQuest,uniqueRewards:new Set(g.questRewards).size===g.questRewards.length,rewardCount:g.questRewards.length,taps,popupsClosed:popups,deaths,reloads,errors:errs,samples,final:{level:g.player.maxHp,coins:g.coins,quest:g.quest}};
 fs.writeFileSync(OUT,JSON.stringify(res,null,1));console.log(JSON.stringify({minutes:res.minutes,quests:res.questsCompleted,errors:errs.length,unique:res.uniqueRewards}));await b.close()})();
