const {chromium,devices}=require('playwright');const O=process.argv[3];
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({...devices['Pixel 7']});await ctx.addInitScript(()=>{window.__kmCreateFlow=true});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file://'+process.argv[2]);await pg.waitForTimeout(800);await pg.tap('[data-class="weaver"]');await pg.waitForTimeout(300);await pg.tap('#km329Next');await pg.tap('[data-g="f"]');await pg.waitForTimeout(200);await pg.tap('[data-hair="4"]');await pg.waitForTimeout(600);await pg.screenshot({path:O+'/01_sac_rengi.png'});
await pg.tap('#km329Next');await pg.tap('#km331Dice');await pg.waitForTimeout(200);await pg.screenshot({path:O+'/02_zar_isim.png'});await pg.tap('#km329Next');await pg.waitForTimeout(600);
await pg.screenshot({path:O+'/03_oyun_hud.png'});
await pg.evaluate(()=>{const T=window.__kmTest;T.setQuest(2);T.questAction();let t=0;while(t<3000&&T.get().quest<3){T.step(.05);t++}});await pg.waitForTimeout(150);await pg.evaluate(()=>window.__kmTest.closeModal());await pg.waitForTimeout(400);await pg.screenshot({path:O+'/04_kazanim_kusanma.png'});
await pg.evaluate(()=>{const T=window.__kmTest;T.enter('forest',470,440);T.skill()});await pg.waitForTimeout(250);await pg.screenshot({path:O+'/05_beceri_afisi.png'});
console.log(JSON.stringify({g:await pg.evaluate(()=>{const g=window.__kmTest.get();return {key:g.spriteKey,hair:g.hair,name:g.heroName,equipCard:g.equipCard}}),errs}));await b.close()})();
