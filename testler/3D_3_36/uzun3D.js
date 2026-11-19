// Kırık Mühür 3D — uzun oturum: Moto G4 profili, CPU 6x, kalıcı tarayıcı profili, HTTPS, parmakla (CDP dokunma) oynanış.
// Her 5 dk'da bir sırayla: sayfa yenileme / tarayıcıyı SIGKILL ile öldürüp yeniden açma. Her açılışta veri kaybı denetimi.
const {chromium,devices}=require('playwright');const fs=require('fs'),path=require('path'),os=require('os'),{execSync}=require('child_process');
const [,,URL,OUT,MIN]=process.argv;fs.mkdirSync(OUT,{recursive:true});const TOTAL=(+MIN||35)*60000,SEG=5*60000;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));const dev=devices['Moto G4'];const dir=fs.mkdtempSync(path.join(os.tmpdir(),'km3d-'));
const G=pg=>pg.evaluate(()=>{const g=window.__kmTest.get();return {mode:g.mode,quest:g.quest,phase:g.questPhase,coins:g.coins,level:state.level,xp:state.xp,mat:state.materials,rewards:[...state.questRewards],inv:[...state.inv],gear:Object.keys(state.gear||{}).length,rewardOpen:g.rewardOpen,autoPath:g.autoPath,x:state.player.x,y:state.player.y,zone:state.zone,savedAt:(JSON.parse(localStorage.getItem('kirikMuhurQuestFlowV324Test')||'{}').savedAt)||0}});
async function launch(){const c=await chromium.launchPersistentContext(dir,{...dev,ignoreHTTPSErrors:true});const pg=c.pages()[0]||await c.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));const cdp=await c.newCDPSession(pg);await cdp.send('Emulation.setCPUThrottlingRate',{rate:6});await pg.goto(URL);await sleep(1500);
 await pg.evaluate(()=>{window.__fps=[];let n=0,t=performance.now();(function f(){n++;const now=performance.now();if(now-t>=1000){window.__fps.push(Math.round(n*1000/(now-t)));n=0;t=now}requestAnimationFrame(f)})()});return {c,pg,errs,cdp}}
async function tap(pg,cdp,sel){const r=await pg.evaluate(s=>{const e=document.querySelector(s);if(!e||!e.offsetParent)return null;const b=e.getBoundingClientRect();return {x:b.left+b.width/2,y:b.top+b.height/2}},sel);if(!r)return false;await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:r.x,y:r.y}]});await sleep(60);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});return true}
(async()=>{const log=[];const checks=[];let S=await launch();
 if(await S.pg.$('[data-class="scout"]')){await tap(S.pg,S.cdp,'[data-class="scout"]');await sleep(500)}
 const t0=Date.now();let seg=0,popups=0,deaths=0,allErrs=[];
 while(Date.now()-t0<TOTAL){const segEnd=Math.min(t0+TOTAL,Date.now()+SEG);
  while(Date.now()<segEnd){await sleep(1000);let g;try{g=await G(S.pg)}catch(e){allErrs.push('G:'+e.message);continue}
   if(g.rewardOpen){await tap(S.pg,S.cdp,'#km325RewardOk');popups++}else if(g.mode==='dead'){deaths++;await tap(S.pg,S.cdp,'#respawn');await sleep(300);await tap(S.pg,S.cdp,'#trackBtn')}else if(g.mode==='game'&&(g.phase==='ready'||!g.autoPath))await tap(S.pg,S.cdp,'#trackBtn');
   await tap(S.pg,S.cdp,'#km335RevealOk');}
  seg++;const before=await G(S.pg);const perf=await S.pg.evaluate(()=>({fps:window.__fps.slice(-60),heap:performance.memory?Math.round(performance.memory.usedJSHeapSize/1048576*10)/10:null,saveKB:Math.round((localStorage.getItem('kirikMuhurQuestFlowV324Test')||'').length/102.4)/10}));
  const fp=[...perf.fps].sort((a,b)=>a-b);allErrs.push(...S.errs.splice(0));
  if(Date.now()-t0>=TOTAL){log.push({seg,min:Math.round((Date.now()-t0)/60000),quest:before.quest,level:before.level,coins:before.coins,fpsMed:fp[fp.length>>1],fpsMin:fp[0],heap:perf.heap,saveKB:perf.saveKB,action:'son'});break}
  const kill=seg%2===0;
  if(kill){const pids=execSync(`pgrep -f "${dir}" || true`).toString().trim().split('\n').filter(Boolean);for(const p of pids){try{process.kill(+p,'SIGKILL')}catch(e){}}await sleep(1500);S=await launch()}
  else{await S.pg.reload();await sleep(1500);await S.pg.evaluate(()=>{window.__fps=[];let n=0,t=performance.now();(function f(){n++;const now=performance.now();if(now-t>=1000){window.__fps.push(Math.round(n*1000/(now-t)));n=0;t=now}requestAnimationFrame(f)})()})}
  const after=await G(S.pg);const lostRewards=before.rewards.filter(x=>!after.rewards.includes(x)),lostInv=before.inv.filter(x=>!after.inv.includes(x));
  const ok=after.mode==='game'&&after.quest>=before.quest&&after.level>=before.level&&!lostRewards.length&&!lostInv.length&&after.gear>=before.gear&&new Set(after.rewards).size===after.rewards.length&&(kill?after.coins>=before.coins-0:after.coins===before.coins);
  const c={seg,action:kill?'SIGKILL+yeniden aç':'yenile',ok,before:{quest:before.quest,phase:before.phase,level:before.level,coins:before.coins,rewards:before.rewards.length,inv:before.inv.length},after:{quest:after.quest,phase:after.phase,level:after.level,coins:after.coins,rewards:after.rewards.length,inv:after.inv.length},lostRewards,lostInv,posDiff:Math.round(Math.hypot(after.x-before.x,after.y-before.y))};checks.push(c);
  log.push({seg,min:Math.round((Date.now()-t0)/60000),quest:before.quest,level:before.level,coins:before.coins,fpsMed:fp[fp.length>>1],fpsMin:fp[0],heap:perf.heap,saveKB:perf.saveKB,action:c.action});
  console.log(JSON.stringify(log[log.length-1]),'| kontrol',ok?'PASS':'FAIL',JSON.stringify(c).slice(0,300))}
 allErrs.push(...S.errs);const fin=await G(S.pg);await S.c.close();
 const res={minutes:Math.round((Date.now()-t0)/60000),segments:log,reopenChecks:checks,popups,deaths,errors:allErrs.slice(0,10),final:{quest:fin.quest,level:fin.level,coins:fin.coins,rewards:fin.rewards.length,unique:new Set(fin.rewards).size===fin.rewards.length}};
 fs.writeFileSync(path.join(OUT,'uzun_oturum_3D.json'),JSON.stringify(res,null,1));
 const pass=checks.every(c=>c.ok)&&!allErrs.length&&res.final.unique&&res.minutes>=30;console.log((pass?'PASS':'FAIL')+'  L1 Uzun oturum '+res.minutes+' dk, '+checks.length+' yeniden açma (yenile/SIGKILL), veri kaybı yok, sayfa hatası yok — '+JSON.stringify({final:res.final,popups,deaths,errors:allErrs.length}))})();
