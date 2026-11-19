# Kırık Mühür 3.29 — Referans karşılaştırması sonrası oynanış/görsel bütünlük (3.28 üzerine)
# Kaynaklar: kullanıcının kesin şartnamesi (HUD/giriş/sistem ekranları), depodaki referans denetimleri, web arama metin özetleri.
# Kung Fu Saga videoları/ekranları bu oturumda açılamadı; hiçbir görsel/varlık kopyalanmadı, tüm çizimler özgün.
import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding='utf-8').read()
def rep(old,new,count=1):
    global s
    n=s.count(old)
    if n!=count: raise SystemExit(f'EXPECTED {count} got {n}: {old[:100]!r}')
    s=s.replace(old,new)

rep('<title>Kırık Mühür 3.28 | Android Uyum TEST</title>','<title>Kırık Mühür 3.29 | Kahraman ve Savaş Görseli TEST</title>')
rep('<p class="sub">3.28 • 3A/3B AÇIK KAPATMA • ANDROID UYUM</p>','<p class="sub">3.29 • KAHRAMANINI SEÇ</p>')
rep("savedAt:Date.now(),questSchema:328,","savedAt:Date.now(),questSchema:329,")
rep("saveVersion:'3.28'","saveVersion:'3.29'")

# ---------- A) Kadın görünümleri: aynı özgün piksel üreticisi, sınıfa özel saç/palet
rep(' elder:{dark:"#333e4c",',''' guardian_f:{dark:"#1c2236",edge:"#0a1426",cloth:"#2c4560",cloth2:"#527189",trim:"#e2b25c",glint:"#ffeca4",skin:"#e0ad88",skinlight:"#f6d0aa",hair:"#6a2c3a",steel:"#a8dbe4",steel2:"#f2fbf2",eye:"#1d3a52",cape:"#3a3058",shoe:"#253348",glow:"#7cecd8"},
 scout_f:{dark:"#1d2c2a",edge:"#0f2024",cloth:"#3b7466",cloth2:"#66a88a",trim:"#f0bb66",glint:"#faeaa8",skin:"#d2a07a",skinlight:"#f4caa2",hair:"#b2552c",steel:"#c0dfcd",steel2:"#fad99a",eye:"#1a4a40",cape:"#2f5f50",shoe:"#30423a",glow:"#8ce9c2"},
 weaver_f:{dark:"#261f3e",edge:"#11172b",cloth:"#6a4a96",cloth2:"#a07ac4",trim:"#dcbf78",glint:"#fff3c4",skin:"#c8988a",skinlight:"#f2c4ae",hair:"#2a2f5a",steel:"#8ad8e6",steel2:"#dafcff",eye:"#3a6a9a",cape:"#55407c",shoe:"#4a385c",glow:"#62eaf2"},
 elder:{dark:"#333e4c",''')
rep("function frame(type,dir,step){\n  const c=palettes[type];","function frame(type,dir,step){\n  const base=String(type).replace(/_f$/,''),fem=/_f$/.test(type);\n  const c=palettes[type];")
rep('type==="guardian"','base==="guardian"',count=2)
rep('type==="scout"','base==="scout"',count=3)
rep('type==="weaver"','base==="weaver"',count=3)
rep("else{r(21,12+bob,25,9,c.hair);r(22,18+bob,7,4,c.hair);r(39,19+bob,6,5,c.hair);r(32,10+bob,7,5,c.trim);}",
    "else{r(21,12+bob,25,9,c.hair);r(22,18+bob,7,4,c.hair);r(39,19+bob,6,5,c.hair);r(32,10+bob,7,5,c.trim);}\n    if(fem){r(20,15+bob,5,26,c.hair);r(43,15+bob,5,26,c.hair);r(21,39+bob,4,3,c.trim);r(43,39+bob,4,3,c.trim);if(back){r(23,15+bob,22,28,c.hair);r(29,41+bob,10,7,c.hair);r(31,46+bob,6,3,c.trim)}else if(!side){r(26,20+bob,6,1,c.edge);r(36,20+bob,6,1,c.edge);r(32,29+bob,4,1,'#b5505a')}else{r(40,18+bob,7,22,c.hair)}}")

# ---------- B) Oyuncu çizimi/portresi cinsiyet anahtarı
rep("const key=type==='player'?state.classId:(spriteImages[type]?type:'elder')","const key=type==='player'?km329Key():(spriteImages[type]?type:'elder')")
rep("const im=spriteImages[state.classId],c=$('portraitIcon');","const im=spriteImages[km329Key()],c=$('portraitIcon');")
rep("const v=state.classId+':'+valid;","const v=km329Key()+':'+valid;")

# ---------- C) Kayıt: cinsiyet ve kahraman adı
rep(",sideStats:state.sideStats,sq:state.sq};",",sideStats:state.sideStats,sq:state.sq,gender:state.gender==='f'?'f':'m',heroName:state.heroName||''};")
rep("state.sq=km327RestoreSq(old.sq);","state.sq=km327RestoreSq(old.sq);state.gender=old.gender==='f'?'f':'m';state.heroName=typeof old.heroName==='string'?old.heroName.replace(/[<>&\"']/g,'').slice(0,14):'';")

# ---------- D) Kamera: dikeyde karakter daha büyük ve okunur
rep("const getCameraZoom=()=>window.innerHeight>window.innerWidth?1.25:1.12;","const getCameraZoom=()=>window.innerHeight>window.innerWidth?1.45:1.12;")

# ---------- E) Yaratık seviyesi (yalnız gösterim)
rep("return {id:sp.id,type:sp.type,name:c.name,boss:!!c.boss,pack:sp.pack||null,","return {id:sp.id,type:sp.type,name:c.name,boss:!!c.boss,pack:sp.pack||null,lvl:Math.max(1,1+k+Math.round((sp.atk-7)/2)+(c.boss?2:0)),")

# ---------- F) Hasar rakamları, seviye atlama efekti, mermiler, kılıç yayı, bekleme nefesi
rep("function effect(x,y,text,color){state.particles.push({x,y,text,color,life:1})}","function effect(x,y,text,color,size=15){state.particles.push({x,y,text,color,life:1,size})}")
rep("function badgeText(txt,x,y,color='#ffe7ad'){ctx.font='bold 13px sans-serif';ctx.textAlign='center';ctx.lineWidth=3;",
    "function badgeText(txt,x,y,color='#ffe7ad',size=13){ctx.font='bold '+size+'px sans-serif';ctx.textAlign='center';ctx.lineWidth=Math.max(3,size/4);")
rep("for(let fx of state.particles){ctx.globalAlpha=clamp(fx.life,0,1);badgeText(fx.text,fx.x,fx.y,fx.color)}",
    "for(let fx of state.particles){ctx.globalAlpha=clamp(fx.life*1.4,0,1);badgeText(fx.text,fx.x,fx.y,fx.color,Math.round((fx.size||15)*(1+Math.max(0,fx.life-.82)*2.2)))}km329DrawShots();")
rep("effect(e.x,e.y-42,'-'+damage,'#ffe0a2');","effect(e.x+(Math.random()*14-7),e.y-48,'-'+damage,mult>=1.8?'#ffd34a':'#fff0c8',mult>=1.8?24:17);")
rep("if(leveled)notify(`SEVİYE ${state.level}! Gücün arttı`);","if(leveled){notify(`SEVİYE ${state.level}! Gücün arttı`);km329LevelFx()}")
rep("kind:state.classId==='guardian'?'slash':'projectile',fromX:p.x,fromY:p.y-45})}",
    "kind:state.classId==='guardian'?'slash':'projectile',fromX:p.x,fromY:p.y-45});if(state.classId!=='guardian')km329Shots.push({x0:p.x,y0:p.y-45,x1:e.x,y1:e.y-34,t:0,d:.17,cls:state.classId})}")
rep(" if(f.kind==='slash'){ctx.beginPath();ctx.moveTo(f.x-24,f.y+22);ctx.lineTo(f.x+17,f.y-21);ctx.lineTo(f.x+27,f.y-32);ctx.stroke()}",
    " if(f.kind==='slash'){const k=1-f.t/.38;ctx.lineWidth=7;ctx.beginPath();ctx.arc(f.x-6,f.y+6,30,-2.6+k*.5,-0.3+k*.5);ctx.stroke();ctx.strokeStyle='#ffffff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(f.x-6,f.y+6,26,-2.4+k*.5,-0.5+k*.5);ctx.stroke()}")
rep("if(type==='player'&&state.moving&&!dying){const bob=Math.sin(phase*1.6)*1.6;ctx.translate(0,-bob);ctx.rotate(Math.sin(phase*.9)*.015+clamp(state.turnLean||0,-.7,.7)*.055);}",
    "if(type==='player'&&state.moving&&!dying){const bob=Math.sin(phase*1.6)*1.6;ctx.translate(0,-bob);ctx.rotate(Math.sin(phase*.9)*.015+clamp(state.turnLean||0,-.7,.7)*.055);}else if(!dying&&(type==='player'||isNpc)){ctx.translate(0,-Math.round((Math.sin(performance.now()/430+(ent.x||0))+1)*.7))}\n if(type==='player'&&km329Glow>performance.now()){const g=(km329Glow-performance.now())/1600;ctx.save();ctx.globalAlpha=.55*g;ctx.strokeStyle='#ffe48a';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,-2,30+18*(1-g),11+6*(1-g),0,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#ffe48a';for(let i=0;i<6;i++){const a=i*1.05+performance.now()/300;ctx.fillRect(Math.round(Math.cos(a)*24)-2,Math.round(-30-((1-g)*40)+Math.sin(a)*6),4,4)}ctx.restore()}")
rep("p.mp=Math.min(p.maxMp,p.mp+dt*1.5);","p.mp=Math.min(p.maxMp,p.mp+dt*1.5);for(const sh of km329Shots)sh.t+=dt;km329Shots=km329Shots.filter(sh=>sh.t<sh.d);")
# İsim/seviye plakaları
rep("for(let a of actors){sprite(a.entity,a.type);if(!a.entity.deathPreview)hpbar(a.entity,!!a.entity.boss);",
    "for(let a of actors){sprite(a.entity,a.type);if(!a.entity.deathPreview){hpbar(a.entity,!!a.entity.boss);km329Plate(a.entity,a.type)}")

# ---------- G) HUD: güç, XP çubuğu, bölge + koordinat, boss çubuğu, yan görev satırı, SADIK
rep('<div class="meter mana"><span id="mpFill"></span><small id="mpText"></small></div></div>','<div class="meter mana"><span id="mpFill"></span><small id="mpText"></small></div><div class="meter km329xp" title="Deneyim"><span id="xpFill"></span></div></div>')
rep('<button class="miniMapOpen" id="mapBtn" title="Büyük haritayı aç">⌖ HARİTA</button></div>','<button class="miniMapOpen" id="mapBtn" title="Büyük haritayı aç">⌖ HARİTA</button></div><div id="zoneInfo" class="km329zone" aria-label="Bölge ve koordinat"></div><div id="bossBar" class="km329boss" hidden><b id="bossName"></b><div class="km329bossbar"><span id="bossFill"></span></div><small id="bossHp"></small></div>')
rep('<button id="trackBtn">▶ GÖREVE BAŞLA</button></div>','<button id="trackBtn">▶ GÖREVE BAŞLA</button><button id="km329Side" class="km329side" hidden></button></div>')
rep('<button class="railBtn" id="quickBtn" aria-expanded="false" title="Oto, pet ve binek ayarları">✧<span>AYAR</span></button>','<button class="railBtn" id="quickBtn" aria-expanded="false" title="Sadık yoldaş ve binek">✧<span>SADIK</span></button>')
rep("$('level').textContent=`SV ${state.level} • ${state.xp}/${state.level*95} XP`;","km329Text('level',`SV ${state.level} • GÜÇ ${km324Power()}`);")
rep("toggle.textContent='⚔ OTO SAVAŞ: '+(state.autoBattle?'AÇIK':'KAPALI')}}","toggle.textContent='⚔ OTO SAVAŞ: '+(state.autoBattle?'AÇIK':'KAPALI')}km329Sync()}")
rep("$('quickBtn').onclick=()=>{const open=$('quickPanel').classList.toggle('open');$('quickBtn').setAttribute('aria-expanded',String(open))};","$('quickBtn').onclick=()=>state.mode==='game'&&toggleModal('companion');")
rep("else if(mode==='progress'){km324OpenProgress()}","else if(mode==='progress'){km324OpenProgress()}\nelse if(mode==='companion'){km329Companion()}")

# ---------- H) Kahraman oluşturma akışı (Sınıf → Görünüm → İsim)
rep("$('classCards').addEventListener('click',e=>{let b=e.target.closest('[data-class]');if(b&&km328Booted)applyClass(b.dataset.class)});",
    "$('modalBody').addEventListener('click',e=>{let b=e.target.closest('#classCards [data-class]');if(!b||!km328Booted||state.mode!=='select')return;\n // Otomatik test tarayıcısı (navigator.webdriver) eski hızlı başlangıcı kullanır; gerçek oyuncu her zaman 3 adımlı akışı görür. Akış testi __kmCreateFlow ile açılır.\n if(navigator.webdriver&&!window.__kmCreateFlow){state.gender='m';state.heroName='';applyClass(b.dataset.class);return}km329Create(b.dataset.class)});")

# ---------- CSS
rep('<style id="km321-character-portrait">','''<style id="km329-hero-hud">
.meter.km329xp{height:4px!important;min-height:4px!important;margin-top:2px;background:#0c1626;border:1px solid #5a4a2a}
.meter.km329xp span{display:block;height:100%;background:linear-gradient(90deg,#c98a2e,#ffe08a)}
.km329zone{position:absolute;top:70px;right:4px;max-width:132px;font-size:9px;line-height:12px;text-align:right;color:#ffe2a0;background:#0c1626cc;border:1px solid #6a5634;border-radius:6px;padding:2px 6px;pointer-events:none;white-space:nowrap;z-index:6}
.km329side[hidden],.km329boss[hidden]{display:none!important}
.km329boss{position:absolute;top:134px;left:50%;transform:translateX(-50%);width:min(250px,64vw);text-align:center;pointer-events:none;z-index:7}
.km329boss b{display:block;font-size:12px;color:#ffd0a0;text-shadow:0 1px 2px #000}
.km329bossbar{height:9px;border:1px solid #e6b36a;background:#1a0f14;border-radius:5px;overflow:hidden}
.km329bossbar span{display:block;height:100%;background:linear-gradient(90deg,#b8323e,#ff7a5a)}
.km329boss small{font-size:9px;color:#ffe;text-shadow:0 1px 2px #000}
.km329side{display:block;width:100%;min-height:30px;margin-top:5px;border:1px solid #4f7f8f;border-radius:6px;background:#10283acc;color:#bff3ff;font-size:10px;font-weight:800;text-align:left;padding:2px 7px;position:relative;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.km329side::before{content:'';position:absolute;inset:-7px -2px}
.km329create .panel{width:min(400px,96vw)!important;background:linear-gradient(170deg,#1d2b44,#0e1628)!important}
.km329steps{display:flex;gap:4px;justify-content:center;margin:4px 0 8px}
.km329steps span{font-size:10px;padding:3px 7px;border-radius:10px;background:#1a2a40;color:#8fa6bb;border:1px solid #2f4560}
.km329steps span.on{background:#c48a3e;color:#fff4dc;border-color:#ffd58a}
.km329steps span.done{color:#9fe6c8;border-color:#3c7a64}
.km329stage{display:flex;gap:10px;align-items:center;border:2px solid #b8955a;border-radius:12px;padding:8px;background-size:cover;background-position:center;position:relative;overflow:hidden;min-height:200px}
.km329stage::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,#0b1424aa,#0b1424dd);z-index:0}
.km329stage>*{position:relative;z-index:1}
#km329Preview{width:144px;height:180px;image-rendering:pixelated;flex:none}
.km329info{text-align:left;min-width:0}.km329info b{font-size:16px;color:#ffdc8e}.km329info small{display:block;color:#9fe6d8;font-size:10px;margin:2px 0 4px}
.km329info p{font-size:11px;line-height:1.35;color:#e4ecf2;margin:0 0 5px}.km329stats{font-size:9px;color:#ffe9b8;line-height:1.4}
.km329pick{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0}
.km329pick button{min-height:46px;border:2px solid #4c6a86;border-radius:9px;background:#172a42;color:#eaf2f8;font-weight:800;font-size:11px}
.km329pick button.sel{border-color:#ffd58a;background:#5a3e1e;color:#fff2d6}
.km329pick.two{grid-template-columns:1fr 1fr}
.km329name{width:100%;min-height:44px;margin:8px 0;border-radius:9px;border:2px solid #b8955a;background:#0c1626;color:#fff;font-size:16px;padding:0 10px;box-sizing:border-box}
.km329nav{display:grid;grid-template-columns:1fr 1.6fr;gap:8px;margin-top:6px}.km329nav button{min-height:46px;font-weight:900}
.km329comp{display:grid;gap:8px;margin:8px 0}.km329card{display:grid;grid-template-columns:64px 1fr auto;gap:8px;align-items:center;border:1px solid #6a7f92;border-radius:10px;padding:7px;background:#14263a;text-align:left}
.km329card canvas{width:64px;height:64px;image-rendering:pixelated}.km329card b{color:#ffdc8e;font-size:13px}.km329card small{display:block;font-size:10px;color:#cfe0ea;line-height:1.3}
.km329card button{min-width:76px;min-height:44px;border-radius:9px;font-weight:900}
</style><style id="km321-character-portrait">''')

# ---------- Yeni işlevler (oyun içi), içerik sınıf tanımlarına bağlı
rep("function km326KindHint(m){",r"""// ===== 3.29 KAHRAMAN / HUD / SAVAŞ GÖRSELİ =====
let km329Shots=[],km329Glow=0;const km329Cache={};
function km329Key(){const k=state.classId+(state.gender==='f'?'_f':'');return spriteImages[k]?k:state.classId}
function km329Text(id,v){if(km329Cache[id]===v)return;km329Cache[id]=v;const el=$(id);if(el)el.textContent=v}
function km329LevelFx(){const p=state.player;km329Glow=performance.now()+1600;effect(p.x,p.y-96,'SEVİYE '+state.level+'!','#ffe48a',26);flash.push({x:p.x,y:p.y-30,t:.9,r:70,col:'#ffe48a',kind:'burst'})}
function km329DrawShots(){for(const sh of km329Shots){const k=Math.min(1,sh.t/sh.d),x=sh.x0+(sh.x1-sh.x0)*k,y=sh.y0+(sh.y1-sh.y0)*k,a=Math.atan2(sh.y1-sh.y0,sh.x1-sh.x0);ctx.save();ctx.translate(x,y);
 if(sh.cls==='scout'){ctx.rotate(a);ctx.fillStyle='#5a3a22';ctx.fillRect(-14,-1,18,3);ctx.fillStyle='#e8f4ff';ctx.beginPath();ctx.moveTo(10,0);ctx.lineTo(3,-4);ctx.lineTo(3,4);ctx.closePath();ctx.fill();ctx.fillStyle='#9fe6c8';ctx.fillRect(-16,-3,4,2);ctx.fillRect(-16,2,4,2)}
 else{ctx.globalAlpha=.35;ctx.fillStyle='#8ff6ff';ctx.beginPath();ctx.arc(0,0,11,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;ctx.fillStyle='#e8ffff';ctx.beginPath();ctx.arc(0,0,5,0,Math.PI*2);ctx.fill();ctx.fillStyle='#c9a4f0';ctx.fillRect(-2-Math.round(Math.cos(a)*10),-2-Math.round(Math.sin(a)*10),4,4)}
 ctx.restore()}}
function km329Plate(ent,type){let txt,col;if(type==='player'){if(!state.classId||!classes[state.classId])return;txt='Sv'+state.level+' '+(state.heroName||classes[state.classId].name);col='#bff7ff'}else if(ent.name){txt=ent.name+' Sv'+(ent.lvl||1);col=ent.boss?'#ffb08a':'#ffd7d7'}else return;
 ctx.save();ctx.font='bold 11px sans-serif';ctx.textAlign='center';const y=ent.y-(ent.boss?140:type==='player'?104:104);ctx.lineWidth=3;ctx.strokeStyle='#0c1424';ctx.strokeText(txt,ent.x,y);ctx.fillStyle=col;ctx.fillText(txt,ent.x,y);ctx.restore()}
function km329Sync(){const p=state.player;
 const xf=$('xpFill');if(xf){const w=Math.round(state.xp/(state.level*95)*100)+'%';if(km329Cache.xp!==w){km329Cache.xp=w;xf.style.width=w}}
 km329Text('zoneInfo',names[state.zone]+' • '+Math.round(p.x/10)+','+Math.round(p.y/10));
 const boss=state.enemies.find(e=>e.boss&&!e.dead&&dist(e,p)<620),bb=$('bossBar');
 if(bb){if(boss){if(bb.hidden)bb.hidden=false;km329Text('bossName','◆ '+boss.name+' • Sv'+(boss.lvl||1));const w=Math.round(boss.hp/boss.maxHp*100)+'%';if(km329Cache.boss!==w){km329Cache.boss=w;$('bossFill').style.width=w}km329Text('bossHp',boss.hp+' / '+boss.maxHp)}else if(!bb.hidden)bb.hidden=true}
 const sb=$('km329Side');if(sb&&state.sq){const q=KM327_SIDE.find(q=>['active','turnin'].includes(km327Status(q)));if(q){const st=km327Status(q),n=state.sq[q.id].n;km329Text('km329Side','◇ YAN: '+q.title+' '+(st==='turnin'?'• TESLİM: '+km327NpcName(q):n+'/'+km327Need(q)));sb.dataset.sq=q.id;if(sb.hidden)sb.hidden=false}else if(!sb.hidden)sb.hidden=true}}
const KM329_INFO={guardian:{rol:'Ön saf • yakın dövüş • yüksek can',desc:'Mühür kılıcı ve ağır zırhla düşmanı üstüne çeker. Becerileri birden çok hedefe vurur.',scene:'village'},
 scout:{rol:'Uzak menzil • hızlı hareket',desc:'Kül yayıyla uzaktan vurur, en hızlı koşan sınıftır. Düşük savunmasını mesafeyle kapatır.',scene:'forest'},
 weaver:{rol:'Ruh büyüsü • orta menzil • şifa',desc:'Ruh enerjisini örerek alan saldırısı yapar; en güçlü şifa onundur.',scene:'arena'}};
function km329Create(cls){const st={cls,g:'m',name:'',step:1},body=$('modalBody'),modal=$('modal');modal.classList.add('km329create');let anim=0;
 const esc=t=>t.replace(/[<>&"']/g,'');
 const render=()=>{const c=classes[st.cls],inf=KM329_INFO[st.cls];
  const ctl=st.step===1?`<div class="km329pick">${Object.keys(classes).map(k=>`<button data-pick="${k}" class="${k===st.cls?'sel':''}">${classes[k].icon} ${classes[k].name.split(' ').slice(-1)[0].toUpperCase()}</button>`).join('')}</div>`
   :st.step===2?`<div class="km329pick two"><button data-g="m" class="${st.g==='m'?'sel':''}">♂ ERKEK</button><button data-g="f" class="${st.g==='f'?'sel':''}">♀ KADIN</button></div>`
   :`<input id="km329Name" class="km329name" maxlength="14" autocomplete="off" placeholder="Kahraman adı (isteğe bağlı)" value="${esc(st.name)}"><p class="note" style="margin:0">${c.name} • ${st.g==='f'?'Kadın':'Erkek'} görünüm. Görev kutusuna bir kez dokunman yeterli; yol, savaş ve teslim otomatik sürer.</p>`;
  body.innerHTML=`<h1>KIRIK MÜHÜR</h1><p class="sub">KAHRAMAN OLUŞTUR • ADIM ${st.step}/3</p><div class="km329steps">${['SINIF','GÖRÜNÜM','İSİM'].map((t,i)=>`<span class="${i+1===st.step?'on':i+1<st.step?'done':''}">${i+1}. ${t}</span>`).join('')}</div>
  <div class="km329stage" style="background-image:url(${ASSETS[inf.scene]})"><canvas id="km329Preview" width="96" height="120"></canvas><div class="km329info"><b>${c.name}</b><small>${inf.rol}</small><p>${inf.desc}</p><div class="km329stats">CAN ${c.hp} • RUH ${c.mp}<br>SALDIRI ${c.attack} • SAVUNMA ${c.def}<br>MENZİL ${c.range} • HIZ ${c.speed}</div></div></div>
  ${ctl}<div class="km329nav"><button class="outlined" id="km329Back">◀ GERİ</button><button class="primary" id="km329Next">${st.step<3?'SONRAKİ ADIM ▶':'MACERAYA BAŞLA ✦'}</button></div>`;
  body.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>{st.cls=b.dataset.pick;render()});
  body.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{st.g=b.dataset.g;render()});
  const nm=$('km329Name');if(nm)nm.oninput=()=>{st.name=esc(nm.value).slice(0,14)};
  $('km329Back').onclick=()=>{if(st.step>1){st.step--;render()}else{cancelAnimationFrame(anim);modal.classList.remove('km329create');location.reload()}};
  $('km329Next').onclick=()=>{if(st.step<3){st.step++;render();return}cancelAnimationFrame(anim);modal.classList.remove('km329create');state.gender=st.g;state.heroName=st.name.trim();applyClass(st.cls);notify((state.heroName||c.name)+' maceraya başladı!')}};
 const loop=t=>{const cv=$('km329Preview');if(!cv||!modal.classList.contains('km329create'))return;const g=cv.getContext('2d'),key=st.cls+(st.g==='f'?'_f':''),im=spriteImages[key]||spriteImages[st.cls];g.clearRect(0,0,96,120);g.imageSmoothingEnabled=false;
  g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(48,108,30,7,0,0,Math.PI*2);g.fill();const dir=[0,3,1,2][Math.floor(t/1800)%4],step=Math.floor(t/170)%4;if(im&&im.complete&&im.naturalWidth)g.drawImage(im,step*64,dir*80,64,80,0,0,96,120);anim=requestAnimationFrame(loop)};
 render();anim=requestAnimationFrame(loop)}
function km329Companion(){const body=$('modalBody'),p=state.player;const petDmg=4+state.level*2;
 body.innerHTML=`<h1>✧ SADIK YOLDAŞ & BİNEK</h1><p class="sub">Gerçek oyun etkileri • Seviye ${state.level}</p><div class="km329comp">
 <div class="km329card"><canvas id="km329Pet" width="32" height="32"></canvas><div><b>Ruh Tilkisi</b><small>Yakındaki düşmana her 3,4 sn’de ${petDmg} hasar verir. Görevdeki av sayımına katılır.</small></div><button id="km329PetT" class="${state.pet?'primary':'outlined'}">${state.pet?'YANINDA':'ÇAĞIR'}</button></div>
 <div class="km329card"><canvas id="km329Mount" width="32" height="32"></canvas><div><b>Ay Işığı Geyiği</b><small>${state.level<2?'2. seviyede açılır.':'Hareket hızını %55 artırır (şu an '+Math.round(p.speed)+').'}</small></div><button id="km329MountT" class="${state.mount?'primary':'outlined'}" ${state.level<2?'disabled':''}>${state.level<2?'KİLİTLİ':state.mount?'BİNİLDİ':'BİN'}</button></div>
 <div class="km329card"><div style="font-size:30px;text-align:center">↝</div><div><b>Otomatik görev yolu</b><small>Görev hedefine ve NPC’ye otomatik yürür. Sahaya dokununca durur.</small></div><button id="km329AutoT" class="${state.autoPath?'primary':'outlined'}">${state.autoPath?'AÇIK':'KAPALI'}</button></div>
 <div class="km329card"><div style="font-size:30px;text-align:center">⚔</div><div><b>Otomatik savaş</b><small>Menzildeki hedefe saldırır, becerileri ve şifayı kullanır.</small></div><button id="km329BattleT" class="${state.autoBattle?'primary':'outlined'}">${state.autoBattle?'AÇIK':'KAPALI'}</button></div>
 </div><button class="outlined" id="closeModal">Oyuna dön</button>`;
 const pc=$('km329Pet').getContext('2d');pc.fillStyle='#102b37';pc.fillRect(4,10,23,17);pc.fillStyle='#3b9e9a';pc.fillRect(6,6,19,15);pc.fillRect(7,1,6,7);pc.fillRect(19,1,6,7);pc.fillStyle='#78e3cf';pc.fillRect(8,7,15,7);pc.fillStyle='#ffedb5';pc.fillRect(10,10,3,3);pc.fillRect(19,10,3,3);
 const mc=$('km329Mount').getContext('2d');mc.fillStyle='#355966';mc.fillRect(3,14,24,9);mc.fillStyle='#7ba99d';mc.fillRect(5,9,20,7);mc.fillRect(22,4,6,8);mc.fillStyle='#d2b98a';mc.fillRect(5,22,4,8);mc.fillRect(21,22,4,8);mc.fillRect(23,1,2,4);mc.fillRect(27,1,2,4);
 const re=()=>{syncUI();km329Companion()};$('km329PetT').onclick=()=>{$('petBtn').click();re()};$('km329MountT').onclick=()=>{$('mountBtn').click();re()};
 $('km329AutoT').onclick=()=>{$('autoPath').click();re()};$('km329BattleT').onclick=()=>{$('autoBattle').click();re()};$('closeModal').onclick=closeModal}
function km326KindHint(m){""")
# Yan görev satırı tıklaması (görev kutusunun ana dokunuşunu etkilemez: bir düğmedir)
rep("setFlowerMenuPage(0);","setFlowerMenuPage(0);\n$('km329Side').addEventListener('click',e=>{e.stopPropagation();if(state.mode==='game'&&!state.paused&&e.currentTarget.dataset.sq)km327Route(e.currentTarget.dataset.sq)});")
# Test API
rep("paused:state.paused,res:km328Res,","paused:state.paused,res:km328Res,gender:state.gender||'m',heroName:state.heroName||'',spriteKey:state.classId?km329Key():null,shots:km329Shots.length,")

open(dst,'w',encoding='utf-8').write(s)
print('OK',len(s))
