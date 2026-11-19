# Kırık Mühür 3.30 — Kung Fu Saga oynanış karelerinden alınan referansla (3.29 üzerine)
# Gözlenen: NPC konuşma kartı (büyük portre + isim + metin + ödül ikonları + "N sn sonra devam"), renkli yoğun beceri efektleri,
# belirgin güç değeri, yuvarlak ikonlu alt menü. Hiçbir görsel/metin kopyalanmadı; tüm çizimler ve cümleler özgün.
import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding='utf-8').read()
def rep(old,new,count=1):
    global s
    n=s.count(old)
    if n!=count: raise SystemExit(f'EXPECTED {count} got {n}: {old[:100]!r}')
    s=s.replace(old,new)

rep('<title>Kırık Mühür 3.29 | Kahraman ve Savaş Görseli TEST</title>','<title>Kırık Mühür 3.30 | NPC Konuşma ve Efekt TEST</title>')
rep("savedAt:Date.now(),questSchema:329,","savedAt:Date.now(),questSchema:330,")
rep("saveVersion:'3.29'","saveVersion:'3.30'")

# ---------- 1) NPC konuşma kartı: görev tesliminde ödül penceresinin üstünde
rep("km325QueueReward({id,kind:'mission',title:m.title,npc:npc.name,","km325QueueReward({id,kind:'mission',title:m.title,npc:npc.name,sprite:npc.sprite||'elder',line:km330Line(state.missionIndex,m),")
rep("km325QueueReward({id,kind:'sidequest',title:q.title,npc:km327NpcName(q),","km325QueueReward({id,kind:'sidequest',title:q.title,npc:km327NpcName(q),sprite:((KM326_NPCS[q.zone]||[]).find(n=>n.id===q.npc)||{}).sprite||'elder',line:'Yardımın için sağ ol, yolcu. '+q.title+' işi tamam; bunu da al.',")
rep("body.innerHTML=`<h1>✦ ${r.kind==='side'?","body.innerHTML=`${km330Head(r)}<h1>✦ ${r.kind==='side'?")
rep('<button class="rewardClaim" id="km325RewardOk">DEVAM ✓</button>`;','<button class="rewardClaim" id="km325RewardOk">DEVAM ✓ <small id="km330Cd"></small></button>`;')
rep("window.__km325LastReward={...r,shownAt:Date.now()};","km330DrawNpc(r);window.__km325LastReward={...r,shownAt:Date.now()};")
rep("clearTimeout(km325RewardTimer);km325RewardTimer=setTimeout(close,7000)}","clearTimeout(km325RewardTimer);km325RewardTimer=setTimeout(close,6000);km330Countdown(6)}")

# ---------- 2) Görev başında NPC konuşma balonu (tek dokunuşla başlama değişmez)
rep("state.navDelay=0;moveTarget=null;path=[];notify('Görev başladı: '+m.title);","state.navDelay=0;moveTarget=null;path=[];notify('Görev başladı: '+m.title);km330Bubble={npc:m.returnNpc,text:km330StartLine(m),until:performance.now()+4200};")
rep("Math.round((fx.size||15)*(1+Math.max(0,fx.life-.82)*2.2)))}km329DrawShots();","Math.round((fx.size||15)*(1+Math.max(0,fx.life-.82)*2.2)))}km329DrawShots();km330DrawBubble();")

# ---------- 3) Renkli beceri efekti + kısa ekran parlaması
rep("flash.push({x:p.x,y:p.y-22,t:.55,r:60,col:'#39e7ce',kind:'burst'});","flash.push({x:p.x,y:p.y-22,t:.55,r:60,col:'#39e7ce',kind:'burst'});flash.push({x:p.x,y:p.y-22,t:.6,r:96,col:'#ffd34a',kind:'nova'});km330Screen=.12;")
rep("flash.push({x:p.x,y:p.y-27,t:.60,r:76,col:state.classId==='guardian'?'#edba6b':state.classId==='scout'?'#a5e7bc':'#c9a4f0',kind:'burst'});",
    "flash.push({x:p.x,y:p.y-27,t:.60,r:76,col:state.classId==='guardian'?'#edba6b':state.classId==='scout'?'#a5e7bc':'#c9a4f0',kind:'burst'});flash.push({x:p.x,y:p.y-27,t:.6,r:110,col:'#ff8ad8',kind:'nova'});km330Screen=.1;")
rep(" else if(f.kind==='burst'){for(let k=0;k<8;k++){const angle=k*Math.PI/4;ctx.fillRect(Math.round(f.x+Math.cos(angle)*f.r*.7),Math.round(f.y+Math.sin(angle)*f.r*.7),6,6)}}",
    " else if(f.kind==='burst'){for(let k=0;k<8;k++){const angle=k*Math.PI/4;ctx.fillRect(Math.round(f.x+Math.cos(angle)*f.r*.7),Math.round(f.y+Math.sin(angle)*f.r*.7),6,6)}}\n else if(f.kind==='nova'){const k=1-f.t/.6;for(let i=0;i<14;i++){const a=i*Math.PI/7+k*1.3,r1=f.r*(.15+k*.55),r2=f.r*(.35+k*.85);ctx.strokeStyle=['#ffd34a','#7ff6ff','#ff8ad8'][i%3];ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(f.x+Math.cos(a)*r1,f.y+Math.sin(a)*r1*.62);ctx.lineTo(f.x+Math.cos(a)*r2,f.y+Math.sin(a)*r2*.62);ctx.stroke()}ctx.strokeStyle='#fffbe8';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(f.x,f.y+20,f.r*(.35+k*.75),f.r*(.16+k*.36),0,0,Math.PI*2);ctx.stroke()}")
rep("ctx.globalAlpha=1;ctx.restore();km317PortraitDepthFrame()}","ctx.globalAlpha=1;ctx.restore();km317PortraitDepthFrame();if(km330Screen>0){ctx.save();ctx.globalAlpha=Math.min(.22,km330Screen*1.8);ctx.fillStyle='#fff3d0';ctx.fillRect(0,0,CW,CH);ctx.restore()}}")
rep("for(const sh of km329Shots)sh.t+=dt;","km330Screen=Math.max(0,km330Screen-dt);for(const sh of km329Shots)sh.t+=dt;")

# ---------- 4) Belirgin güç + 5) yuvarlak ikonlu alt menü
rep('<style id="km321-character-portrait">','''<style id="km330-reference">
#app #level{color:#ffd56a!important;font-weight:900!important;font-size:10px!important;text-shadow:0 1px 0 #3a1a00,0 0 6px #ffb84a55}
#app .topRail .railBtn{border-radius:50%!important;border:2px solid #c9a35a!important;background:radial-gradient(circle at 35% 30%,#56718a,#16243a 72%)!important;box-shadow:0 2px 0 #0a1422,inset 0 0 0 2px #2c4258!important}
#app .topRail .railBtn::before{inset:-6px}
#app .topRail .railBtn span{position:absolute;bottom:-3px;left:50%;transform:translateX(-50%);background:#24180f;border:1px solid #8a6a3a;border-radius:4px;padding:0 3px;white-space:nowrap;line-height:9px}
.km330talk{display:grid;grid-template-columns:88px 1fr;gap:8px;align-items:end;margin:-2px 0 6px}
#km330Npc{width:88px;height:110px;image-rendering:pixelated;background:radial-gradient(circle at 50% 70%,#3a5a6a,#0f1b2c 70%);border:2px solid #c9a35a;border-radius:10px}
.km330bubble{position:relative;text-align:left;background:#f3e6c8;color:#2a1c10;border:2px solid #8a6a3a;border-radius:10px;padding:6px 8px}
.km330bubble b{display:inline-block;background:#6a3a1e;color:#ffe9c0;font-size:10px;border-radius:5px;padding:1px 6px;margin-bottom:3px}
.km330bubble p{margin:0;font-size:11px;line-height:1.35}
.km330bubble::before{content:'';position:absolute;left:-9px;bottom:14px;border:8px solid transparent;border-right-color:#8a6a3a}
#km330Cd{font-size:11px;opacity:.85}
</style><style id="km321-character-portrait">''')

# ---------- İşlevler ve özgün hikâye cümleleri (içerik katmanı)
rep("function km326KindHint(m){",r"""// ===== 3.30 NPC KONUŞMA / EFEKT (içerik: özgün Kırık Mühür cümleleri) =====
let km330Bubble=null,km330Screen=0,km330CdTimer=null;
const KM330_TALES=[
 'Gölgeler geri çekildi. Ruh Ormanı yeniden nefes alıyor; ama tapınaktaki kırık mühür hâlâ uğulduyor.',
 'Mühür Kolosu düştü! Bu tılsım mühür taşından yontuldu, artık senin. Tapınağın yolu açık.',
 'Kapıdaki iz eski bir mühür ustasına ait. Demek ki köy çoktandır izleniyormuş…',
 'Tam zamanında yetiştin. Gözcü kulesi senin sayende hâlâ ayakta.',
 'Bu ruh parçaları birbirine çekiliyor. Biri onları bir araya toplamaya çalışıyor.',
 'Yazıt eski dilde: “Mühür kırılırsa kül geri döner.” Bunu Bilge Işın da bilmeli.',
 'İki mühür taşı da sıcak… Taşlar uyanıyor, yolcu.',
 'Arşiv doğruluyor: kuzeydeki geçit bir zamanlar Kül Lordu’nun yoluymuş.',
 'Son nöbet bitti. Orman güvende; artık gözlerimizi kuzeye çevirmeliyiz.',
 'Sunak açıldı! Tapınağın kuzey kapısı Kül Geçidi’ne çıkıyor.',
 'Varan seni gönderdi demek. Kıvılcımlar mührün kırıklarından doğuyor; dikkatli ol.',
 'Kıvılcımlar söndü, geçit bir süre sakin. Ama asıl ateş derinde bekliyor.',
 'Tepeden gördün mü? Yıkık köprü Kül Lordu’nun inine iniyor.',
 'Diken kurtları kaçtı! Otlarım kurtuldu, sağ ol yolcu.',
 'Nöbetçiler yeniden taşa döndü. Tapınak senin sayende sessiz.',
 'Kül Lordu yenildi! Fener Köyü’nün ışığı bu gece her zamankinden parlak yanacak.'];
const KM330_REPEAT={hunt:'Bölge yeniden güvende. Ödülünü hak ettin.',collect:'Getirdiklerin tam istediğim gibi.',inspect:'Bu iz önemli; kayıtlara geçiriyorum.',explore:'Gözlemlerin çok işimize yarayacak.',talk:'Haberi ilettin, teşekkür ederim.'};
function km330Line(idx,m){return KM330_TALES[idx]||KM330_REPEAT[m.kind]||'Görev tamam. Ödülün hazır.'}
function km330StartLine(m){const w='['+names[m.zone]+'] ';return w+(m.kind==='hunt'?(KM326_CREATURES[m.id]?KM326_CREATURES[m.id].name:'Hedef')+' ×'+m.count+' yen!':m.kind==='collect'?m.count+' parça topla!':m.kind==='explore'?'Bölgeyi keşfet!':m.kind==='talk'?m.points[0].label+' ile konuş!':'İzi incele!')}
function km330Head(r){if(!r.sprite||!r.line)return '';return `<div class="km330talk"><canvas id="km330Npc" width="96" height="120"></canvas><div class="km330bubble"><b>${r.npc}</b><p>${r.line}</p></div></div>`}
function km330DrawNpc(r){const c=$('km330Npc');if(!c)return;const g=c.getContext('2d'),im=spriteImages[r.sprite]||spriteImages.elder;g.imageSmoothingEnabled=false;g.clearRect(0,0,96,120);if(im&&im.complete&&im.naturalWidth)g.drawImage(im,0,0,64,80,0,0,96,120)}
function km330Countdown(n){clearInterval(km330CdTimer);let left=n;const el=()=>$('km330Cd');if(el())el().textContent='('+left+' sn)';km330CdTimer=setInterval(()=>{left--;if(!el()||!km325RewardOpen||left<0){clearInterval(km330CdTimer);return}el().textContent='('+left+' sn)'},1000)}
function km330DrawBubble(){if(!km330Bubble||performance.now()>km330Bubble.until)return;let n=state.npcs.find(x=>x.id===km330Bubble.npc);if(n){const z=getCameraZoom(),vx=state.camera.x,vy=state.camera.y;if(n.x<vx+40||n.x>vx+CW/z-40||n.y<vy+190||n.y>vy+CH/z-30)n=null}const who=n||state.player;const t=km330Bubble.text;
 ctx.save();ctx.font='bold 12px sans-serif';const w=Math.min(250,ctx.measureText(t).width+18),x=who.x-w/2,y=who.y-(n?150:176);
 ctx.globalAlpha=Math.min(1,(km330Bubble.until-performance.now())/400);ctx.fillStyle='#f3e6c8';ctx.strokeStyle='#8a6a3a';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect?ctx.roundRect(x,y,w,24,8):ctx.rect(x,y,w,24);ctx.fill();ctx.stroke();
 ctx.beginPath();ctx.moveTo(who.x-6,y+24);ctx.lineTo(who.x,y+32);ctx.lineTo(who.x+6,y+24);ctx.closePath();ctx.fill();ctx.fillStyle='#2a1c10';ctx.textAlign='center';ctx.fillText(t.length>40?t.slice(0,39)+'…':t,who.x,y+16);ctx.restore()}
function km326KindHint(m){""")
rep("paused:state.paused,res:km328Res,","paused:state.paused,res:km328Res,bubble:km330Bubble&&performance.now()<km330Bubble.until?km330Bubble.text:null,")

open(dst,'w',encoding='utf-8').write(s)
print('OK',len(s))
