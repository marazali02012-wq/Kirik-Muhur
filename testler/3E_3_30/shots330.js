const {chromium,devices}=require('playwright');const O=process.argv[3];
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({...devices['Pixel 7']});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file://'+process.argv[2]);await pg.waitForTimeout(800);await pg.tap('[data-class="guardian"]');await pg.waitForTimeout(300);
await pg.tap('#trackBtn');await pg.evaluate(()=>{for(let i=0;i<4;i++)window.__kmTest.step(.05)});await pg.waitForTimeout(200);await pg.screenshot({path:O+'/01_gorev_baslangic_balon.png'});
const bub=await pg.evaluate(()=>window.__kmTest.get().bubble);
await pg.evaluate(()=>{const T=window.__kmTest;let t=0;while(t<1500&&!T.get().rewardOpen){T.step(.05);t++}});await pg.waitForTimeout(1300);await pg.screenshot({path:O+'/02_npc_konusma_odul.png'});
const cd=await pg.evaluate(()=>document.getElementById('km330Cd')&&document.getElementById('km330Cd').textContent);
await pg.evaluate(()=>{const T=window.__kmTest;T.closeModal();T.enter('forest',480,520);for(let i=0;i<3;i++)T.step(.05);T.skill();for(let i=0;i<3;i++)T.step(.05)});await pg.waitForTimeout(60);await pg.screenshot({path:O+'/03_beceri_efekti.png'});
console.log(JSON.stringify({bub,cd,errs}));await b.close()})();
