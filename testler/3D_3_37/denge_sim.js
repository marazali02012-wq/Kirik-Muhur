// Kırık Mühür — zorluk/ekonomi simülasyonu: 26 hikâye görevi, oto savaş, oyuncu hiçbir şey yükseltmez (en kötü durum)
// ve "aktif oyuncu" (her görevden sonra beceri+silah güçlendirir). Görev başına: en düşük can %, ölüm, süre, seviye, altın/toz.
const {chromium}=require('playwright');const fs=require('fs');
const [,,file,OUT,MODE,PARAMS]=process.argv;
(async()=>{const b=await chromium.launch();const all={};
 for(const cls of ['guardian','scout','weaver'])for(const style of (MODE?[MODE]:['pasif','aktif'])){const ctx=await b.newContext({viewport:{width:393,height:852},hasTouch:true,isMobile:true});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
  await pg.goto('file://'+file);await pg.waitForTimeout(500);await pg.tap(`[data-class="${cls}"]`);await pg.waitForTimeout(150);
  const r=await pg.evaluate(async([style,PARAMS])=>{const T=window.__kmTest;if(PARAMS&&window.__kmTest.diff){const P=JSON.parse(PARAMS);for(const k of Object.keys(P))T.diff[k]=P[k]}const log=[];Math.random=(()=>{let s=12345;return()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296}})();
   const spend=()=>{if(style!=='aktif')return;for(let k=0;k<6;k++){for(const id of ['s3','s1','s2','heal'])T.skillUp&&T.skillUp(id);const w=state.equipment.weapon,a=state.equipment.armor;if(w&&T.gearEnhance)T.gearEnhance(w);if(a&&T.gearEnhance)T.gearEnhance(a)}
     if(typeof km331Better==='function')for(const id of [...state.inv])if(itemdefs[id]&&itemdefs[id].slot&&km331Better(id)&&T.gearEquip)T.gearEquip(id);if(window.km334PetUp){for(let k=0;k<3;k++){km334PetUp('pet');km334PetUp('mount')}}};
   for(let i=0;i<26;i++){if(T.get().rewardOpen)T.closeModal();if(typeof closeModal==='function'&&!document.getElementById('modal').classList.contains('hidden'))T.closeModal();const g0=T.get(),q0=g0.quest,info=g0.questInfo,pw0=km324Power();T.questAction();let t=0,deaths=0,minHp=1,bossMin=1;
    while(t<12000&&T.get().quest===q0){const g=T.get();if(g.rewardOpen)T.closeModal();if(g.mode==='dead'){deaths++;document.getElementById('respawn').click();T.questAction()}else{const p=state.player,f=p.hp/p.maxHp;if(state.enemies.some(e=>!e.dead&&dist(e,p)<200))minHp=Math.min(minHp,f);if(state.enemies.some(e=>e.boss&&!e.dead&&dist(e,p)<200))bossMin=Math.min(bossMin,f)}T.step(.05);t++}
    const g=T.get();log.push({i:q0,t:info.title.slice(0,18),k:info.kind,ok:g.quest===q0+1,s:Math.round(t*.05),d:deaths,lv:state.level,minHp:Math.round(minHp*100),boss:bossMin<1?Math.round(bossMin*100):null,gold:state.coins,toz:state.materials,pw:km324Power(),pw0});spend();if(g.quest===q0)break}
   return log},[style,PARAMS||'']);
  all[cls+'-'+style]={log:r,errs};const tot={ok:r.filter(l=>l.ok).length,deaths:r.reduce((a,l)=>a+l.d,0),time:r.reduce((a,l)=>a+l.s,0),lv:r[r.length-1].lv,minHp:Math.min(...r.map(l=>l.minHp)),bosses:r.filter(l=>l.boss!==null).map(l=>l.i+':'+l.boss+'%'+(l.d?'/'+l.d+'ö':'')).join(' ')};
  console.log(cls.padEnd(8),style.padEnd(5),JSON.stringify(tot),'errs',errs.length);await ctx.close()}
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(all,null,1));await b.close()})();
