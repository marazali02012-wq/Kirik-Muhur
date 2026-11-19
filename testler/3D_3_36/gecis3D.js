// Kırık Mühür 3D — eski sürüm → yeni sürüm kayıt geçiş zinciri (gerçek tarayıcı, aynı HTTPS origin, gerçek localStorage)
// Her eski sürümde oyna (görev, ödül, eşya, beceri…), kaydet; aynı origin'de yeni sürümü aç; veri kaybını karşılaştır;
// yeni sürümde kaydet/yeniden aç; ikinci açılışta değerlerin sabit kaldığını doğrula.
const {chromium,devices}=require('playwright');const fs=require('fs'),path=require('path');
const [,,BASE,NEWFILE,OUT,OLDLIST]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const OLD=OLDLIST.split(',');const KEY='kirikMuhurQuestFlowV324Test';
const results=[];const rec=(id,name,ok,ev)=>{results.push({id,name,status:ok?'PASS':'FAIL',evidence:ev});console.log((ok?'PASS':'FAIL').padEnd(5),id,name,'—',JSON.stringify(ev).slice(0,900))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const classes=['guardian','scout','weaver'];
 for(let vi=0;vi<OLD.length;vi++){const old=OLD[vi],cls=classes[vi%3];const ctx=await b.newContext({...devices['Pixel 7'],ignoreHTTPSErrors:true});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
  await pg.goto(BASE+'/'+old);await sleep(900);await pg.evaluate(()=>{localStorage.clear()});await pg.reload();await sleep(900);
  await pg.tap(`[data-class="${cls}"]`).catch(()=>{});await sleep(400);
  // eski sürümde oyna
  const played=await pg.evaluate(async()=>{const T=window.__kmTest;const has=k=>T&&typeof T[k]==='function';const close=()=>{try{if(has('closeModal'))T.closeModal();const ok=document.getElementById('km325RewardOk');if(ok&&ok.offsetParent)ok.click()}catch(e){}};
   const startQ=state.missionIndex;for(let m=0;m<5;m++){close();const q0=state.missionIndex;if(has('questAction'))T.questAction();else document.getElementById('trackBtn').click();
    for(let i=0;i<4000&&state.missionIndex===q0;i++){if(state.mode==='dead'){const r=document.getElementById('respawn');if(r)r.click();if(has('questAction'))T.questAction()}if(has('step'))T.step(.05);else break;if(i%40===0)close()}}
   close();const o={missions:state.missionIndex-startQ};
   try{state.coins+=5000;state.materials+=200}catch(e){}
   if(has('gearMake')){const u=T.gearMake('armor',1,3);T.gearEquip&&T.gearEquip(u);T.gearEnhance&&T.gearEnhance(u);T.gearMake('boots',1,2);o.gear=true}
   if(has('skillUp')){state.level=Math.max(state.level,3);baseStats();T.skillUp('s1');T.skillFront&&T.skillFront('s2');o.skill=true}
   if(has('petUp')){T.petUp('pet');o.pet=true}
   if(typeof save==='function')save();return o});
  const oldRaw=await pg.evaluate(k=>localStorage.getItem(k),KEY);const o=JSON.parse(oldRaw||'{}');
  // aynı origin'de yeni sürüm
  await pg.goto(BASE+'/'+NEWFILE);await sleep(1200);
  const n1=await pg.evaluate(()=>{const T=window.__kmTest,g=T.get();return {mode:g.mode,classId:state.classId,level:state.level,xp:state.xp,coins:state.coins,materials:state.materials,missionIndex:state.missionIndex,questRewards:[...state.questRewards],inv:[...state.inv],equipment:{...state.equipment},gear:Object.keys(state.gear||{}),slotEn:{...(state.slotEn||{})},skillLv:{...(state.skillLv||{})},skillAuto:[...(state.skillAuto||[])],petLv:state.petLv,sideStats:JSON.stringify(state.sideStats||{}),schema:JSON.parse(localStorage.getItem('kirikMuhurQuestFlowV324Test')).questSchema}});
  await pg.evaluate(()=>{try{window.__kmTest.closeModal()}catch(e){}});await pg.reload();await sleep(1100);
  const n2=await pg.evaluate(()=>({level:state.level,coins:state.coins,materials:state.materials,missionIndex:state.missionIndex,questRewards:[...state.questRewards],inv:[...state.inv],equipment:{...state.equipment},skillLv:{...(state.skillLv||{})},petLv:state.petLv,slotEn:{...(state.slotEn||{})}}));
  // karşılaştırma: kayıp yok
  const lvRew=n1.questRewards.filter(x=>/^lv335-/.test(x));const expBonus={coin:lvRew.reduce((s,x)=>s+({'lv335-5':150,'lv335-10':300,'lv335-15':500}[x]||0),0),mat:lvRew.reduce((s,x)=>s+({'lv335-5':4,'lv335-10':8,'lv335-15':12}[x]||0),0)};
  const oldRewards=(o.questRewards||[]);const lost={
   classId:n1.classId!==o.classId,level:n1.level!==o.level,coins:n1.coins!==(o.coins||0)+expBonus.coin,materials:n1.materials!==(o.materials||0)+expBonus.mat,
   mission:n1.missionIndex<(o.missionIndex||0),rewards:oldRewards.filter(x=>!n1.questRewards.includes(x)),
   inv:(o.inv||[]).filter(x=>!n1.inv.includes(x)),equip:Object.entries(o.equipment||{}).filter(([k,v])=>v&&n1.equipment[k]!==v).map(([k])=>k),
   skill:o.skillLv?JSON.stringify(o.skillLv)!==JSON.stringify(n1.skillLv):false,pet:o.petLv?o.petLv!==n1.petLv:false};
  const lossFree=!lost.classId&&!lost.level&&!lost.coins&&!lost.materials&&!lost.mission&&!lost.rewards.length&&!lost.inv.length&&!lost.equip.length&&!lost.skill&&!lost.pet;
  const stable=JSON.stringify({l:n1.level,c:n1.coins,m:n1.materials,q:n1.missionIndex,r:n1.questRewards,i:n1.inv,e:n1.equipment,s:n1.skillLv,p:n1.petLv,y:n1.slotEn})===JSON.stringify({l:n2.level,c:n2.coins,m:n2.materials,q:n2.missionIndex,r:n2.questRewards,i:n2.inv,e:n2.equipment,s:n2.skillLv,p:n2.petLv,y:n2.slotEn});
  rec('G-'+old.replace(/^Kirik_Muhur_|_TEST\.html$/g,''),`${old} (${cls}) kaydı → ${NEWFILE}: veri kaybı yok, şema 335, ikinci açılışta sabit`,n1.mode==='game'&&lossFree&&stable&&n1.schema===335&&new Set(n1.questRewards).size===n1.questRewards.length&&!errs.length,
   {played,old:{schema:o.questSchema,level:o.level,coins:o.coins,mat:o.materials,mission:o.missionIndex,rewards:oldRewards.length,inv:o.inv,eq:o.equipment,skillLv:o.skillLv,petLv:o.petLv},new:{level:n1.level,coins:n1.coins,mat:n1.materials,mission:n1.missionIndex,rewards:n1.questRewards.length,inv:n1.inv.length,lvRew},lost,stable,errors:errs.slice(0,3)});
  await ctx.close()}
 fs.writeFileSync(path.join(OUT,'gecis_sonuclari.json'),JSON.stringify(results,null,1));const s={PASS:0,FAIL:0};for(const x of results)s[x.status]++;console.log('ÖZET',s);await b.close()})();
