// Kırık Mühür 3.29 — kahraman oluşturma, HUD, savaş görseli ve sadık ekranı testleri
const {chromium,devices}=require('playwright');const fs=require('fs'),path=require('path');
const [,,FILE,URL,OUT]=process.argv;fs.mkdirSync(path.join(OUT,'GORSEL_DENETIM'),{recursive:true});
const results=[];const rec=(id,name,ok,ev)=>{results.push({id,name,status:ok?'PASS':'FAIL',evidence:ev});console.log((ok?'PASS':'FAIL').padEnd(5),id,name,'—',JSON.stringify(ev).slice(0,600))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();
 const open=async(o={})=>{const ctx=await b.newContext({...devices['Pixel 7'],ignoreHTTPSErrors:true});await ctx.addInitScript(f=>{if(f)window.__kmCreateFlow=true},!!o.flow);const pg=await ctx.newPage();pg.errs=[];pg.on('pageerror',e=>pg.errs.push(e.message));pg.on('console',m=>{if(m.type()==='error')pg.errs.push(m.text())});await pg.goto(o.url||('file://'+FILE));await sleep(700);return {ctx,pg}};
 const G=pg=>pg.evaluate(()=>window.__kmTest.get());
 // E0 Seçim ekranında hata yok (3.29 ilk sürümünde çizimde hata bulundu)
 {const {ctx,pg}=await open();await sleep(3000);const f=await pg.evaluate(()=>document.getElementById('fatal').textContent);rec('E0','Sınıf seçim ekranında 3 sn: konsol/sayfa hatası yok',!pg.errs.length&&!f,{errors:pg.errs,fatal:f});await ctx.close()}
 // E1 Kahraman oluşturma: 3 adım, geri, sınıf değiştirme, cinsiyet, isim temizleme, kalıcılık (HTTPS)
 {const {ctx,pg}=await open({flow:true,url:URL});const o={};
  await pg.tap('[data-class="guardian"]');await sleep(300);o.step1=await pg.evaluate(()=>document.querySelector('.km329steps .on').textContent);
  await pg.tap('[data-pick="weaver"]');await sleep(150);o.classAfterPick=await pg.evaluate(()=>document.querySelector('.km329info b').textContent);
  await pg.tap('#km329Next');await sleep(150);await pg.tap('#km329Back');await sleep(150);o.backTo=await pg.evaluate(()=>document.querySelector('.km329steps .on').textContent);
  await pg.tap('#km329Next');await sleep(150);await pg.tap('[data-g="f"]');await sleep(500);
  o.previewDrawn=await pg.evaluate(()=>{const c=document.getElementById('km329Preview'),d=c.getContext('2d').getImageData(0,0,96,120).data;let n=0;for(let i=3;i<d.length;i+=4)if(d[i])n++;return n});
  await pg.screenshot({path:path.join(OUT,'GORSEL_DENETIM','olusturma_adim2_kadin.png')});
  await pg.tap('#km329Next');await sleep(150);await pg.fill('#km329Name','<b>Ayşe</b>"x');await pg.tap('#km329Next');await sleep(600);
  const g=await G(pg);o.game={mode:g.mode,gender:g.gender,name:g.heroName,key:g.spriteKey,quest:g.quest};
  o.portrait=await pg.evaluate(()=>{const d=document.getElementById('portraitIcon').getContext('2d').getImageData(0,0,48,58).data;let n=0;for(let i=0;i<d.length;i+=4)if(d[i]+d[i+1]+d[i+2]>120)n++;return n});
  await pg.reload();await sleep(900);const r=await G(pg);o.afterReload={mode:r.mode,gender:r.gender,name:r.heroName,key:r.spriteKey};
  rec('E1','Kahraman oluşturma: Sınıf → Görünüm → İsim, geri/değiştir, kadın görünüm, isim temizleme, yeniden açılışta korunur',o.step1.includes('SINIF')&&o.classAfterPick==='Ruh Dokumacısı'&&o.backTo.includes('SINIF')&&o.previewDrawn>500&&o.game.mode==='game'&&o.game.gender==='f'&&o.game.name==='bAyşe/bx'&&o.game.key==='weaver_f'&&o.portrait>100&&o.afterReload.gender==='f'&&o.afterReload.name==='bAyşe/bx'&&o.afterReload.key==='weaver_f'&&!pg.errs.length,{...o,errors:pg.errs});await ctx.close()}
 // E2 Kadın sprite sayfaları (3 sınıf) yüklü ve erkeklerden farklı
 {const {ctx,pg}=await open();const r=await pg.evaluate(()=>['guardian','scout','weaver'].map(k=>{const a=spriteImages[k],f=spriteImages[k+'_f'];const px=im=>{const c=document.createElement('canvas');c.width=64;c.height=80;const g=c.getContext('2d');g.drawImage(im,0,0,64,80,0,0,64,80);return g.getImageData(0,0,64,80).data};const d1=px(a),d2=px(f);let diff=0;for(let i=0;i<d1.length;i+=4)if(d1[i]!==d2[i]||d1[i+1]!==d2[i+1])diff++;return {k,loaded:f.complete&&f.naturalWidth===256,diff}}));
  rec('E2','Kadın görünüm sayfaları (3 sınıf × 4 yön × 4 kare) yüklü ve erkek görünümden farklı',r.every(x=>x.loaded&&x.diff>150),r);await ctx.close()}
 // E3 HUD: güç, XP çubuğu, bölge+koordinat, boss çubuğu, yan görev satırı
 {const {ctx,pg}=await open();await pg.tap('[data-class="guardian"]');await sleep(300);const o={};
  o.level=await pg.evaluate(()=>document.getElementById('level').textContent);o.power=(await G(pg)).power;
  o.zone=await pg.evaluate(()=>document.getElementById('zoneInfo').textContent);
  o.sideHiddenAtStart=await pg.evaluate(()=>document.getElementById('km329Side').hidden&&getComputedStyle(document.getElementById('km329Side')).display==='none');
  o.bossHiddenVillage=await pg.evaluate(()=>getComputedStyle(document.getElementById('bossBar')).display==='none');
  await pg.evaluate(()=>{const T=window.__kmTest;T.setQuest(1);T.questAction();T.enter('arena',820,470);for(let i=0;i<20;i++)T.step(.05)});await sleep(200);
  o.boss=await pg.evaluate(()=>({shown:getComputedStyle(document.getElementById('bossBar')).display!=='none',name:document.getElementById('bossName').textContent,hp:document.getElementById('bossHp').textContent}));
  await pg.screenshot({path:path.join(OUT,'GORSEL_DENETIM','boss_cubugu.png')});
  await pg.evaluate(()=>{const T=window.__kmTest;T.kill('boss1');for(let i=0;i<5;i++)T.step(.05);if(T.get().rewardOpen)T.closeModal();T.sqAccept('lamp');T.step(.05)});await sleep(150);
  o.side=await pg.evaluate(()=>({shown:getComputedStyle(document.getElementById('km329Side')).display!=='none',text:document.getElementById('km329Side').textContent}));
  await pg.tap('#km329Side');await sleep(150);o.routeAfterTap=(await G(pg)).mapRoute;
  o.xp=await pg.evaluate(()=>{const g=window.__kmTest.get();return {w:document.getElementById('xpFill').style.width}});
  rec('E3','HUD: SV+GÜÇ, XP çubuğu, bölge+koordinat, boss çubuğu (yalnız boss yakınken), yan görev satırı ve YOL',o.level.includes('GÜÇ '+o.power)&&/Fener Köyü • \d+,\d+/.test(o.zone)&&o.sideHiddenAtStart&&o.bossHiddenVillage&&o.boss.shown&&/Mühür Kolosu/.test(o.boss.name)&&o.side.shown&&/Fener Yağı/.test(o.side.text)&&o.routeAfterTap&&o.routeAfterTap.id==='sq-lamp'&&/%$/.test(o.xp.w)&&!pg.errs.length,o);await ctx.close()}
 // E4 Savaş görseli: ok/büyü mermisi, kılıç yayı, seviye efekti, büyük beceri rakamı
 for(const cls of ['guardian','scout','weaver']){const {ctx,pg}=await open();await pg.tap(`[data-class="${cls}"]`);await sleep(300);
  const r=await pg.evaluate(()=>{const T=window.__kmTest;T.enter('forest',470,425);T.chooseTarget&&T.chooseTarget;T.attack();const shots=T.get().shots;T.skill();const big=state.particles.filter(p=>p.size>=24).length;const lv0=T.get().player.maxHp;earnXP(95);const glow=km329Glow>performance.now();const lvText=state.particles.some(p=>/SEVİYE/.test(p.text));return {shots,big,glow,lvText}});
  rec('E4-'+cls,'Saldırı görseli ('+cls+'): '+(cls==='guardian'?'kılıç yayı':'mermi')+', beceri rakamı büyük, seviye atlama efekti',(cls==='guardian'?r.shots===0:r.shots===1)&&r.big>=1&&r.glow&&r.lvText&&!pg.errs.length,r);await ctx.close()}
 // E5 Sadık ekranı gerçek ayarları değiştirir
 {const {ctx,pg}=await open();await pg.tap('[data-class="scout"]');await sleep(300);await pg.tap('#quickBtn');await sleep(200);const o={};
  o.title=await pg.evaluate(()=>document.querySelector('#modalBody h1').textContent);o.mountLocked=await pg.evaluate(()=>document.getElementById('km329MountT').disabled);
  await pg.tap('#km329PetT');await sleep(100);o.pet=(await pg.evaluate(()=>state.pet));await pg.tap('#km329BattleT');await sleep(100);o.battle=(await G(pg)).autoBattle;
  await pg.evaluate(()=>{earnXP(95)});await pg.tap('#km329PetT');await sleep(100);await pg.evaluate(()=>{window.__kmTest.closeModal();document.getElementById('quickBtn').click()});await sleep(150);await pg.tap('#km329MountT');await sleep(100);o.mount=await pg.evaluate(()=>state.mount);o.speed=(await G(pg)).player.speed;
  await pg.screenshot({path:path.join(OUT,'GORSEL_DENETIM','sadik_ekrani.png')});
  rec('E5','SADIK ekranı: Ruh Tilkisi, Ay Işığı Geyiği (Sv2 kilidi), oto yol/savaş gerçek durumu değiştirir',/SADIK/.test(o.title)&&o.mountLocked&&o.pet===true&&o.battle===true&&o.mount===true&&o.speed>250&&!pg.errs.length,o);await ctx.close()}
 // E6 Kamera: dikeyde karakter ekran yüksekliğinin ≥%8'i
 {const {ctx,pg}=await open();await pg.tap('[data-class="guardian"]');await sleep(400);const r=await pg.evaluate(()=>{const c=document.getElementById('game').getBoundingClientRect(),q=Math.min(c.width/432,c.height/960),z=window.__kmTest.get().zoom;return {zoom:z,heroPx:Math.round(80*z*q),screenH:Math.round(c.height),ratio:+(80*z*q/c.height).toFixed(3)}});
  rec('E6','Dikey kamera: kahraman çizimi ekran yüksekliğinin ≥%8’i',r.ratio>=0.08,r);await ctx.close()}
 fs.writeFileSync(path.join(OUT,'test_sonuclari_3_29.json'),JSON.stringify(results,null,1));const s={PASS:0,FAIL:0};for(const x of results)s[x.status]++;console.log('ÖZET',s);await b.close()})();
