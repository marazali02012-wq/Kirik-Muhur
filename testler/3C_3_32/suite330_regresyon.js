// Kırık Mühür 3.30 — NPC konuşma kartı, görev balonu, beceri efekti, referans HUD
const {chromium,devices}=require('playwright');const fs=require('fs'),path=require('path');
const [,,FILE,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const results=[];const rec=(id,name,ok,ev)=>{results.push({id,name,status:ok?'PASS':'FAIL',evidence:ev});console.log((ok?'PASS':'FAIL').padEnd(5),id,name,'—',JSON.stringify(ev).slice(0,600))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();
 const open=async(cls='guardian')=>{const ctx=await b.newContext(devices['Pixel 7']);const pg=await ctx.newPage();pg.errs=[];pg.on('pageerror',e=>pg.errs.push(e.message));await pg.goto('file://'+FILE);await sleep(700);await pg.tap(`[data-class="${cls}"]`);await sleep(250);return {ctx,pg}};
 // F1 NPC konuşma kartı + geri sayım + otomatik kapanma (gerçek zaman)
 {const {ctx,pg}=await open();await pg.tap('#trackBtn');await pg.evaluate(()=>{const T=window.__kmTest;let t=0;while(t<1500&&!T.get().rewardOpen){T.step(.05);t++}});
  const a=await pg.evaluate(()=>{const c=document.getElementById('km330Npc');let px=0;if(c){const d=c.getContext('2d').getImageData(0,0,96,120).data;for(let i=3;i<d.length;i+=4)if(d[i])px++}return {px,name:document.querySelector('.km330bubble b')&&document.querySelector('.km330bubble b').textContent,line:document.querySelector('.km330bubble p')&&document.querySelector('.km330bubble p').textContent,cd:document.getElementById('km330Cd').textContent,buttons:[...document.querySelectorAll('#modalBody button')].map(x=>x.textContent)}});
  await sleep(2100);const cd2=await pg.evaluate(()=>document.getElementById('km330Cd')&&document.getElementById('km330Cd').textContent);await sleep(4500);const closed=await pg.evaluate(()=>!window.__kmTest.get().rewardOpen);
  rec('F1','Görev teslimi NPC konuşma kartı: portre + isim + özgün cümle + ödüller; tek DEVAM, geri sayım, ~6 sn sonra otomatik kapanır',a.px>800&&a.name==='Bilge Işın'&&/Gölgeler geri çekildi/.test(a.line)&&a.buttons.length===1&&(a.cd==='(6 sn)'||a.cd==='(5 sn)')&&cd2!==a.cd&&closed&&!pg.errs.length,{...a,cdAfter2s:cd2,autoClosed:closed,errors:pg.errs});await ctx.close()}
 // F2 Görev başı konuşma balonu metinleri (tek dokunuş korunur)
 {const {ctx,pg}=await open();const r=await pg.evaluate(()=>{const T=window.__kmTest,o={};for(const i of [0,1,2,4,10,12]){T.setQuest(i);T.questAction();o[i]=[T.get().bubble,T.get().autoPath,T.get().questPhase];T.closeModal()}return o});
  rec('F2','Görev başında NPC/kahraman konuşma balonu; tek dokunuşla oto akış başlar',r[0][0]==='[Ruh Ormanı] Gölge ×3 yen!'&&r[1][0]==='[Kırık Tapınak] Mühür Kolosu ×1 yen!'&&r[2][0]==='[Fener Köyü] İzi incele!'&&r[4][0]==='[Ruh Ormanı] 3 parça topla!'&&r[10][0]==='[Kül Geçidi] Geçit Bekçisi Varan ile konuş!'&&r[12][0]==='[Kül Geçidi] Bölgeyi keşfet!'&&Object.values(r).every(x=>x[1]===true)&&!pg.errs.length,r);
  await pg.evaluate(()=>{const T=window.__kmTest;T.setQuest(0);T.questAction();T.step(.05)});await sleep(150);await pg.screenshot({path:path.join(OUT,'gorev_balonu.png')});await ctx.close()}
 // F3 Beceri efekti
 for(const cls of ['guardian','scout','weaver']){const {ctx,pg}=await open(cls);const r=await pg.evaluate(()=>{const T=window.__kmTest;T.enter('forest',470,425);T.skill();const nova1=flash.some(f=>f.kind==='nova');const sc=km330Screen>0;for(let i=0;i<10;i++)T.step(.05);T.secondSkill();const nova2=flash.some(f=>f.kind==='nova');for(let i=0;i<20;i++)T.step(.05);return {nova1,sc,nova2,after:flash.filter(f=>f.kind==='nova').length,screenAfter:km330Screen}});
  rec('F3-'+cls,'Beceri 1 ve 2: çok renkli halka efekti ve kısa ekran parlaması; sonra temizlenir',r.nova1&&r.sc&&r.nova2&&r.after===0&&r.screenAfter===0&&!pg.errs.length,r);await ctx.close()}
 // F4 Referans HUD: güç altın renk, yuvarlak menü ikonları
 {const {ctx,pg}=await open();const r=await pg.evaluate(()=>({level:getComputedStyle(document.getElementById('level')).color,rail:[...document.querySelectorAll('.topRail .railBtn')].filter(e=>e.offsetWidth).map(e=>getComputedStyle(e).borderRadius)}));
  rec('F4','HUD: güç altın renkte, alt menü ikonları yuvarlak',r.level==='rgb(255, 213, 106)'&&r.rail.length>=6&&r.rail.every(x=>x==='50%'),r);await ctx.close()}
 fs.writeFileSync(path.join(OUT,'test_sonuclari_3_30.json'),JSON.stringify(results,null,1));const s={PASS:0,FAIL:0};for(const x of results)s[x.status]++;console.log('ÖZET',s);await b.close()})();
