// Kırık Mühür 3.31 — referans arayüz testleri
const {chromium,devices}=require('playwright');const fs=require('fs'),path=require('path');
const [,,FILE,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const results=[];const rec=(id,name,ok,ev)=>{results.push({id,name,status:ok?'PASS':'FAIL',evidence:ev});console.log((ok?'PASS':'FAIL').padEnd(5),id,name,'—',JSON.stringify(ev).slice(0,600))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();
 const open=async(o={})=>{const ctx=await b.newContext({...(o.dev?devices[o.dev]:devices['Pixel 7']),...(o.vp?{viewport:o.vp}:{}),ignoreHTTPSErrors:true});await ctx.addInitScript(f=>{if(f)window.__kmCreateFlow=true},!!o.flow);const pg=await ctx.newPage();pg.errs=[];pg.on('pageerror',e=>pg.errs.push(e.message));await pg.goto(o.url||('file://'+FILE));await sleep(700);if(!o.flow){await pg.tap(`[data-class="${o.cls||'guardian'}"]`);await sleep(250)}return {ctx,pg}};
 const G=pg=>pg.evaluate(()=>window.__kmTest.get());
 // G1 Saç rengi + zarla isim + kalıcılık (HTTPS)
 {const {ctx,pg}=await open({flow:true,url:URL});await pg.tap('[data-class="scout"]');await sleep(200);await pg.tap('#km329Next');await pg.tap('[data-hair="6"]');await sleep(400);
  const prev=await pg.evaluate(()=>{const d=document.getElementById('km329Preview').getContext('2d').getImageData(0,0,96,120).data;let blue=0;for(let i=0;i<d.length;i+=4)if(d[i]===60&&d[i+1]===108&&d[i+2]===192)blue++;return blue});
  await pg.tap('#km329Next');await pg.tap('#km331Dice');await sleep(100);const nm=await pg.evaluate(()=>document.getElementById('km329Name').value);await pg.tap('#km329Next');await sleep(500);const g=await G(pg);
  await pg.reload();await sleep(900);const r=await G(pg);
  const sprite=await pg.evaluate(()=>{const im=spriteImages[window.__kmTest.get().spriteKey];const c=document.createElement('canvas');c.width=256;c.height=320;const g=c.getContext('2d');g.drawImage(im,0,0);const d=g.getImageData(0,0,256,320).data;let blue=0,old=0;for(let i=0;i<d.length;i+=4){if(d[i]===60&&d[i+1]===108&&d[i+2]===192)blue++;if(d[i]===100&&d[i+1]===55&&d[i+2]===46)old++}return {blue,old}});
  rec('G1','Karakter oluşturma: 7 saç rengi (önizleme + oyun sprite’ı yeniden renklenir), zarla isim, yeniden açılışta korunur',prev>40&&nm.length>1&&g.hair===6&&g.spriteKey==='scout_h6'&&g.heroName===nm&&r.hair===6&&r.spriteKey==='scout_h6'&&sprite.blue>300&&sprite.old===0&&!pg.errs.length,{previewBluePx:prev,name:nm,game:{hair:g.hair,key:g.spriteKey},afterReload:{hair:r.hair,key:r.spriteKey},sprite,errors:pg.errs});await ctx.close()}
 // G2 Kazanım satırları + hızlı kuşanma kartı (dokunarak ve geri sayımla)
 {const {ctx,pg}=await open();const o={};
  await pg.evaluate(()=>{const T=window.__kmTest;T.setQuest(2);T.questAction();let t=0;while(t<3000&&T.get().quest<3){T.step(.05);t++}T.closeModal()});await sleep(200);
  o.gains=await pg.evaluate(()=>[...document.querySelectorAll('#km331Gains .km331gain')].map(x=>x.textContent));o.card=(await G(pg)).equipCard;o.cardText=await pg.evaluate(()=>document.getElementById('km331Equip').textContent);
  await pg.tap('#km331EqGo');await sleep(150);o.armorAfterTap=await pg.evaluate(()=>state.equipment.armor);o.cardAfter=(await G(pg)).equipCard;
  await sleep(3500);o.gainsGone=await pg.evaluate(()=>document.querySelectorAll('#km331Gains .km331gain').length);
  // geri sayımla otomatik kuşanma
  await pg.evaluate(()=>{state.equipment.boots=null;addItem('forestboots')});await sleep(9300);o.bootsAuto=await pg.evaluate(()=>state.equipment.boots);
  // ✕ ile reddetme
  await pg.evaluate(()=>{state.equipment.talisman=null;addItem('mooncharm')});await sleep(200);await pg.tap('#km331EqX');await sleep(9000);o.charmAfterX=await pg.evaluate(()=>state.equipment.talisman);
  rec('G2','Kazanım satırları (altın/XP/toz/eşya) kayar ve kaybolur; daha iyi eşyada KUŞAN kartı: dokununca, 8 sn sonra otomatik, ✕ ile kuşanmaz',o.gains.some(x=>/Altın.*×78/.test(x))&&o.gains.some(x=>/Gözcü Ceketi/.test(x))&&o.card&&/KUŞAN/.test(o.cardText)&&o.armorAfterTap==='wardcoat'&&!o.cardAfter&&o.gainsGone<=2&&o.bootsAuto==='forestboots'&&o.charmAfterX===null&&!pg.errs.length,o);await ctx.close()}
 // G3 Beceri afişi, seviye rozeti, tanıtım, alt EXP çubuğu
 {const {ctx,pg}=await open({cls:'scout'});const o={};o.lv=await pg.evaluate(()=>document.getElementById('km331Lv').textContent);o.teaser1=await pg.evaluate(()=>document.getElementById('km331Teaser').textContent);
  await pg.evaluate(()=>{const T=window.__kmTest;T.enter('forest',470,425);T.skill()});o.banner=await pg.evaluate(()=>km331BannerText);
  await pg.evaluate(()=>{earnXP(95);window.__kmTest.step(.05)});await sleep(100);o.lv2=await pg.evaluate(()=>document.getElementById('km331Lv').textContent);o.teaser2=await pg.evaluate(()=>document.getElementById('km331Teaser').textContent);
  await pg.evaluate(()=>{earnXP(60);window.__kmTest.step(.05)});o.exp=await pg.evaluate(()=>document.querySelector('#km331Exp span').style.width);
  rec('G3','Portre seviye rozeti, sonraki açılım tanıtımı (binek → bölge), beceri adı afişi, tam genişlik EXP çubuğu',o.lv==='1'&&/Binek/.test(o.teaser1)&&o.banner==='KÜL OKU'&&o.lv2==='2'&&/Kırık Tapınak/.test(o.teaser2)&&/%$/.test(o.exp)&&!pg.errs.length,o);await ctx.close()}
 // G4 Kart ve kazanım satırları görünürken HUD çakışması yok (4 portre ölçüsü)
 for(const vp of [{width:320,height:568},{width:360,height:800},{width:393,height:852},{width:412,height:915}]){const {ctx,pg}=await open({vp});
  await pg.evaluate(()=>{state.equipment.armor=null;addItem('wardcoat');km331Gain([['◆','Altın',10],['✦','XP',10]])});await sleep(400);
  await pg.screenshot({path:path.join(OUT,`kart_${vp.width}x${vp.height}.png`)});
  const r=await pg.evaluate(()=>{const vis=e=>{const s=getComputedStyle(e);return s.display!=='none'&&s.visibility!=='hidden'&&e.getBoundingClientRect().width>0};const els=[...document.querySelectorAll('#app button')].filter(vis).filter(e=>!e.closest('#modal'));const W=innerWidth,H=innerHeight,out=[],over=[];const R=els.map(e=>({id:e.id||e.textContent.trim().slice(0,8),r:e.getBoundingClientRect(),e}));
   for(const a of R)if(a.r.left<-1||a.r.top<-1||a.r.right>W+1||a.r.bottom>H+1)out.push(a.id);
   for(let i=0;i<R.length;i++)for(let j=i+1;j<R.length;j++){const a=R[i],b2=R[j];if(a.e.contains(b2.e)||b2.e.contains(a.e))continue;const ix=Math.min(a.r.right,b2.r.right)-Math.max(a.r.left,b2.r.left),iy=Math.min(a.r.bottom,b2.r.bottom)-Math.max(a.r.top,b2.r.top);if(ix>2&&iy>2)over.push(a.id+'×'+b2.id)}
   const card=document.getElementById('km331Equip').getBoundingClientRect();const cardOver=R.filter(a=>!a.e.closest('#km331Equip')).filter(a=>Math.min(a.r.right,card.right)-Math.max(a.r.left,card.left)>2&&Math.min(a.r.bottom,card.bottom)-Math.max(a.r.top,card.top)>2).map(a=>a.id);
   return {out,over,cardOver}});
  rec(`G4-${vp.width}x${vp.height}`,`Kuşanma kartı + kazanım satırları görünürken ${vp.width}×${vp.height}: taşma/çakışma yok`,!r.out.length&&!r.over.length&&!r.cardOver.length&&!pg.errs.length,r);await ctx.close()}
 fs.writeFileSync(path.join(OUT,'test_sonuclari_3_31.json'),JSON.stringify(results,null,1));const s={PASS:0,FAIL:0};for(const x of results)s[x.status]++;console.log('ÖZET',s);await b.close()})();
