# Kırık Mühür 3.27 — Aşama 3B tamamlama (3.26 üzerine)
# 1) Mevcut üç haritada çizim = çarpışma  2) NPC'den alınan yan görev akışı  3) Yaratık grupları
import sys,re
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding='utf-8').read()
def rep(old,new,count=1):
    global s
    n=s.count(old)
    if n!=count: raise SystemExit(f'EXPECTED {count} got {n}: {old[:100]!r}')
    s=s.replace(old,new)

rep('<title>Kırık Mühür 3.26 | 3B Harita ve Görev TEST</title>','<title>Kırık Mühür 3.27 | 3B Tamamlama TEST</title>')
rep('<p class="sub">3.26 • AŞAMA 3B HARİTA VE GÖREV TESTİ</p>','<p class="sub">3.27 • AŞAMA 3B TAMAMLAMA TESTİ</p>')
rep("questSchema:326,saveVersion:'3.26'","questSchema:327,saveVersion:'3.27'")

# ---------- 1) Çizim = çarpışma: görüntü piksellerinden çıkarılan ağaç gövdeleri + elle ölçülen sütun/sunak/tezgâh/sandık
# Gövde rengi (111,79,69) bağlı bileşenleri, 768x512 kaynak → 1440x960 dünya (x1.875). Yalnız gövde bloklanır; taç arkasından geçilebilir.
FOREST_TRUNKS=[(230,238,125),(135,142,127),(339,346,125),(1042,1050,133),(373,380,146),(241,249,196),(1267,1275,198),(892,900,225),(1168,1175,219),(1006,1014,260),
 (371,378,851),(0,5,853),(491,498,860),(525,532,894),(1282,1290,896),(639,646,888),(626,633,905),(881,888,946),(1156,1164,952),(1398,1406,958),(108,116,960),(138,146,960)]
VILLAGE_TRUNKS=[(1318,1325,200),(279,286,223),(101,108,860),(1329,1336,870)]
trunk=lambda a,b,base:"{x:%d,y:%d,w:%d,h:16,kind:'trunk'}"%(a-2,min(base,944)-18,b-a+4)
village_extra=",".join([trunk(*t) for t in VILLAGE_TRUNKS]+["{x:930,y:665,w:165,h:58,kind:'stall'}","{x:633,y:362,w:32,h:26,kind:'crate'}","{x:452,y:612,w:34,h:24,kind:'crate'}","{x:1202,y:540,w:34,h:26,kind:'crate'}","{x:800,y:802,w:34,h:26,kind:'crate'}"])
forest_extra=",".join(trunk(*t) for t in FOREST_TRUNKS)
arena=",".join(["{x:105,y:270,w:46,h:45,kind:'pillar'}","{x:1262,y:262,w:46,h:44,kind:'pillar'}","{x:122,y:832,w:44,h:44,kind:'pillar'}","{x:1236,y:836,w:44,h:44,kind:'pillar'}","{x:625,y:110,w:175,h:70,kind:'altar'}","{x:600,y:200,w:20,h:24,kind:'lamp'}","{x:803,y:200,w:20,h:24,kind:'lamp'}"])
rep("{x:140,y:470,w:215,h:134}],forest:[{x:590,y:65,w:265,h:210}],arena:[],",
    "{x:140,y:470,w:215,h:134},"+village_extra+"],forest:[{x:590,y:65,w:265,h:210},"+forest_extra+"],arena:["+arena+"],")

# ---------- 3) Yaratık grupları (sürüler); gölgelerin hikâye konumları değişmedi
rep("{id:'thorn1',type:'thorn',x:640,y:700,hp:120,atk:12,def:4,speed:66,from:10},{id:'thorn2',type:'thorn',x:1150,y:690,hp:126,atk:12,def:4,speed:68,from:10},{id:'thorn3',type:'thorn',x:430,y:575,hp:132,atk:13,def:5,speed:66,from:10}",
    "{id:'thorn1',type:'thorn',x:1040,y:680,hp:120,atk:12,def:4,speed:66,from:10,pack:'diken'},{id:'thorn2',type:'thorn',x:1120,y:650,hp:126,atk:12,def:4,speed:68,from:10,pack:'diken'},{id:'thorn3',type:'thorn',x:1100,y:740,hp:132,atk:13,def:5,speed:66,from:10,pack:'diken'}")
rep("{id:'sent1',type:'sentinel',x:470,y:560,hp:150,atk:11,def:6,speed:40,from:2},{id:'sent2',type:'sentinel',x:1010,y:640,hp:160,atk:11,def:6,speed:40,from:2}",
    "{id:'sent1',type:'sentinel',x:1000,y:600,hp:150,atk:11,def:6,speed:40,from:2,pack:'nobet'},{id:'sent2',type:'sentinel',x:1080,y:650,hp:160,atk:11,def:6,speed:40,from:2,pack:'nobet'}")
rep("{id:'wisp1',type:'wisp',x:640,y:420,hp:110,atk:13,def:4,speed:70},{id:'wisp2',type:'wisp',x:900,y:330,hp:116,atk:13,def:4,speed:72},{id:'wisp3',type:'wisp',x:1080,y:470,hp:122,atk:14,def:5,speed:72}",
    "{id:'wisp1',type:'wisp',x:620,y:420,hp:110,atk:13,def:4,speed:70,pack:'kivilcimA'},{id:'wisp2',type:'wisp',x:690,y:470,hp:116,atk:13,def:4,speed:72,pack:'kivilcimA'},{id:'wisp3',type:'wisp',x:1040,y:440,hp:122,atk:14,def:5,speed:72,pack:'kivilcimB'},{id:'wisp4',type:'wisp',x:1110,y:490,hp:118,atk:13,def:4,speed:70,pack:'kivilcimB'},{id:'wisp5',type:'wisp',x:1060,y:525,hp:118,atk:13,def:4,speed:70,pack:'kivilcimB'}")
rep("{id:'thorn1',label:'Diken kurtları',icon:'⚔',x:640,y:700,","{id:'thorn1',label:'Diken kurdu sürüsü',icon:'⚔',x:1080,y:690,")
rep("{id:'sent1',label:'Taş nöbetçiler',icon:'⚔',x:470,y:560,","{id:'sent1',label:'Taş nöbetçi çifti',icon:'⚔',x:1040,y:625,")
rep("{id:'wisp1',label:'Kül kıvılcımları',icon:'⚔',x:640,y:420,","{id:'wisp1',label:'Kül kıvılcımı sürüleri',icon:'⚔',x:860,y:470,")
# Sürü davranışı: sürünün bir üyesi vurulunca/saldırıya geçince diğerleri de oyuncuya yönelir
rep("function enemyTick(dt){const p=state.player;for(let e of state.enemies){if(e.dead)continue;",
    "function enemyTick(dt){const p=state.player;for(const e of state.enemies)if(!e.dead&&e.pack&&(e.hurtAnim>0||dist(e,p)<e.range+10))for(const o of state.enemies)if(o!==e&&!o.dead&&o.pack===e.pack)o.alert=2.5;for(let e of state.enemies){if(e.dead)continue;e.alert=Math.max(0,(e.alert||0)-dt);")
rep("if(r<310&&r>e.range+8&&p.hp>0){","if((r<310||e.alert>0)&&r>e.range+8&&p.hp>0){")
rep("return {id:sp.id,type:sp.type,name:c.name,boss:!!c.boss,","return {id:sp.id,type:sp.type,name:c.name,boss:!!c.boss,pack:sp.pack||null,")

# ---------- 2) NPC yan görevleri
rep("function km326KindHint(m){",
r"""// ===== 3.27 NPC YAN GÖREVLERİ (içerik katmanı) — NPC'ye dokunarak alınır, NPC'ye dönünce ödül tek kez =====
const KM327_SIDE=[
 {id:'lamp',npc:'elder',zone:'village',title:'Fener Yağı',detail:'Köydeki iki yağ küpünü topla',kind:'collect',target:'village',points:[{x:300,y:700,label:'Yağ küpü'},{x:1150,y:800,label:'Yağ küpü'}],from:0,coin:50,xp:60,mat:1},
 {id:'moss',npc:'herbalist',zone:'forest',title:'Şifalı Yosun',detail:'Ormandan üç yosun demeti topla',kind:'collect',target:'forest',points:[{x:230,y:470,label:'Yosun'},{x:980,y:560,label:'Yosun'},{x:560,y:330,label:'Yosun'}],from:1,coin:70,xp:90,mat:2},
 {id:'pages',npc:'scribe',zone:'arena',title:'Kayıp Sayfalar',detail:'Tapınaktaki iki yırtık sayfayı bul',kind:'collect',target:'arena',points:[{x:300,y:450,label:'Yırtık sayfa'},{x:1150,y:420,label:'Yırtık sayfa'}],from:2,coin:80,xp:100,mat:2},
 {id:'core',npc:'smith',zone:'village',title:'Nöbetçi Çekirdeği',detail:'2 Taş Nöbetçi yen (Kırık Tapınak)',kind:'hunt',target:'sentinel',count:2,from:3,coin:90,xp:110,mat:3},
 {id:'pack',npc:'ranger',zone:'forest',title:'Diken Sürüsü',detail:'3 Diken Kurdu yen (Ruh Ormanı)',kind:'hunt',target:'thorn',count:3,from:10,coin:110,xp:140,mat:3},
 {id:'ember',npc:'hermit',zone:'ashpass',title:'Kıvılcım Özü',detail:'4 Kül Kıvılcımı yen (Kül Geçidi)',kind:'hunt',target:'wisp',count:4,from:11,coin:130,xp:170,mat:4}
];
const km327Need=q=>q.kind==='hunt'?q.count:q.points.length;
function km327Status(q){const st=state.sq&&state.sq[q.id];if(!st)return state.missionIndex>=q.from?'available':'locked';if(st.st==='done')return 'done';return st.n>=km327Need(q)?'turnin':'active'}
function km327NpcName(q){return ((KM326_NPCS[q.zone]||[]).find(n=>n.id===q.npc)||{}).name||q.npc}
function km327Accept(q){if(!q||!state.sq||km327Status(q)!=='available')return false;state.sq[q.id]={st:'active',n:0};notify('YAN GÖREV ALINDI: '+q.title+' — '+q.detail);syncUI();save();return true}
function km327RestoreSq(o){const d={};for(const q of KM327_SIDE){const v=o&&typeof o==='object'?o[q.id]:null;if(state.questRewards.includes('side327-'+q.id)){d[q.id]={st:'done',n:km327Need(q)};continue}if(v&&v.st==='active')d[q.id]={st:'active',n:km325Num(v.n,0,0,km327Need(q))}}return d}
function km327OnKill(type){if(!state.sq)return;for(const q of KM327_SIDE){const st=state.sq[q.id];if(st&&st.st==='active'&&q.kind==='hunt'&&q.target===type&&st.n<q.count){st.n++;notify(q.title+': '+st.n+'/'+q.count+(st.n>=q.count?' • teslim: '+km327NpcName(q):''))}}}
function km327Tick(){if(!state.sq)return;const p=state.player;
 for(const q of KM327_SIDE){const st=state.sq[q.id];if(!st||st.st!=='active')continue;
  if(q.kind==='collect'&&state.zone===q.target&&st.n<q.points.length){const pt=q.points[st.n];if(dist(p,pt)<46){st.n++;effect(pt.x,pt.y-32,'✦ TOPLANDI','#b8f0ff');flash.push({x:pt.x,y:pt.y-22,t:.48,r:40,col:'#b8f0ff',kind:'burst'});notify(q.title+': '+st.n+'/'+q.points.length+(st.n>=q.points.length?' • teslim: '+km327NpcName(q):''));save()}}
  if(st.n>=km327Need(q)&&state.zone===q.zone){const npc=state.npcs.find(n=>n.id===q.npc);if(npc&&dist(p,npc)<=62)km327TurnIn(q)}}}
function km327TurnIn(q){const st=state.sq&&state.sq[q.id];if(!st||st.st!=='active'||st.n<km327Need(q))return false;const id='side327-'+q.id,before={level:state.level,power:km324Power()};st.st='done';
 if(questAward(id,q.coin,q.xp,q.mat))km325QueueReward({id,kind:'sidequest',title:q.title,npc:km327NpcName(q),coin:q.coin,xp:q.xp,mat:q.mat,items:[],levelBefore:before.level,levelAfter:state.level,powerBefore:before.power,powerAfter:km324Power()});
 notify('YAN GÖREV TAMAMLANDI: '+q.title);syncUI();save();return true}
function km327Route(id){const q=KM327_SIDE.find(x=>x.id===id);if(!q)return;const st=km327Status(q);let z=q.zone,pt=null;
 if(st==='active'){if(q.kind==='collect'){z=q.target;pt=q.points[state.sq[q.id].n]}else{z=q.target==='sentinel'?'arena':q.target==='thorn'?'forest':'ashpass';const sp=(KM326_SPAWNS[z]||[]).find(x=>x.type===q.target);pt=sp&&{x:sp.x,y:sp.y}}}
 if(!pt){const n=(KM326_NPCS[q.zone]||[]).find(n=>n.id===q.npc);pt={x:n.x,y:n.y}}
 if(!km326Unlocked(z)){notify('🔒 '+names[z]+' kilitli');return}
 if(state.autoPath){state.autoPath=false;state.autoBattle=false;notify('Ana görev duraklatıldı; görev kutusuyla sürdürebilirsin')}
 state.mapRoute={zone:z,x:pt.x,y:pt.y,id:'sq-'+q.id};state.targetId=null;moveTarget=null;path=[];state.navDelay=0;closeModal();mapTravelTick();save()}
function km327QuestListHtml(){const rows=KM327_SIDE.map(q=>({q,st:km327Status(q)})).filter(x=>x.st!=='locked');const locked=KM327_SIDE.length-rows.length;
 const label={available:'AL: NPC ile konuş',active:'',turnin:'TESLİM: NPC yanına dön',done:'✓ TAMAMLANDI'};
 return `<h1 style="margin-top:12px">✦ YAN GÖREVLER</h1>`+rows.map(({q,st})=>{const s=state.sq[q.id];const prog=st==='active'?`İlerleme: ${s.n}/${km327Need(q)}`:label[st].replace('NPC',km327NpcName(q));
  return `<div class="skillRow"><div><b>${st==='done'?'✓ ':''}${q.title}</b><small>${km327NpcName(q)} • ${q.detail}</small><small>${prog} • Ödül: ${q.coin} altın · ${q.xp} XP · ${q.mat} toz</small></div>${st==='done'?'':`<button data-sq-route="${q.id}">YOL</button>`}</div>`}).join('')+(locked?`<p class="note">${locked} yan görev hikâye ilerledikçe açılacak.</p>`:'')}
function km327NpcMark(n){if(!state.sq)return;let mark='';for(const q of KM327_SIDE){if(q.npc!==n.id||q.zone!==state.zone)continue;const st=km327Status(q);if(st==='turnin'){mark='?';break}if(st==='available')mark='!'}if(mark)badgeText(mark,n.x,n.y-116,'#ffd36a')}
function km327DrawMarkers(){if(!state.sq)return;ctx.save();for(const q of KM327_SIDE){const st=state.sq[q.id];if(!st||st.st!=='active'||q.kind!=='collect'||q.target!==state.zone||st.n>=q.points.length)continue;const n=q.points[st.n];
 ctx.globalAlpha=.9;ctx.fillStyle='#8fe6ff';ctx.beginPath();ctx.ellipse(n.x,n.y+2,18,7,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#d8f8ff';ctx.beginPath();ctx.moveTo(n.x,n.y-40);ctx.lineTo(n.x+10,n.y-27);ctx.lineTo(n.x,n.y-14);ctx.lineTo(n.x-10,n.y-27);ctx.closePath();ctx.fill();badgeText(n.label,n.x,n.y-50,'#d8f8ff')}ctx.restore()}
function km326KindHint(m){""")
# NPC'ye dokunma / ✦ etkileşim: yan görev alma
rep("notify(nearby.name+': '+(state.questPhase==='ready'?(nearby.line||'Yeni görevi soldan başlatabilirsin.'):'Önce görevi tamamla.'));",
    "{const sq=KM327_SIDE.find(q=>q.npc===nearby.id&&q.zone===state.zone&&km327Status(q)==='available');if(sq){km327Accept(sq);return}const tq=KM327_SIDE.find(q=>q.npc===nearby.id&&q.zone===state.zone&&km327Status(q)==='turnin');if(tq){if(!km327TurnIn(tq))notify(nearby.name+' konumuna biraz daha yaklaş.');return}}\n notify(nearby.name+': '+(state.questPhase==='ready'?(nearby.line||'Yeni görevi soldan başlatabilirsin.'):'Önce görevi tamamla.'));")
rep("if(e.type==='shade')km324OnShadeDefeat();","if(e.type==='shade')km324OnShadeDefeat();km327OnKill(e.type);")
rep("mapTravelTick();km325QuestProgress();","mapTravelTick();km325QuestProgress();km327Tick();")
rep("km323DrawMissionMarkers();","km323DrawMissionMarkers();km327DrawMarkers();")
rep("for(const n of state.npcs){sprite(n,n.sprite||'elder');badgeText(n.name,n.x,n.y-98)}","for(const n of state.npcs){sprite(n,n.sprite||'elder');badgeText(n.name,n.x,n.y-98);km327NpcMark(n)}")
rep("let i=km325RewardQueue.findIndex(r=>r.kind==='mission');","let i=km325RewardQueue.findIndex(r=>r.kind==='mission'||(r.kind==='sidequest'&&(!state.autoPath||state.questPhase==='ready')));")
rep("${r.kind==='side'?'YAN HEDEF TAMAMLANDI':'GÖREV TAMAMLANDI'}","${r.kind==='side'?'YAN HEDEF TAMAMLANDI':r.kind==='sidequest'?'YAN GÖREV TAMAMLANDI':'GÖREV TAMAMLANDI'}")
# Görev ekranı: yan görev listesi (kilitliler gizli) + yol düğmesi
rep('<button class="outlined" id="gotoProgress">GELİŞİM VE YAN HEDEFLER</button><button class="outlined" id="closeModal">Oyuna dön</button>`;$(\'gotoProgress\').onclick=()=>openModal(\'progress\');',
    '${km327QuestListHtml()}<button class="outlined" id="gotoProgress">GELİŞİM VE YAN HEDEFLER</button><button class="outlined" id="closeModal">Oyuna dön</button>`;$(\'gotoProgress\').onclick=()=>openModal(\'progress\');body.querySelectorAll(\'[data-sq-route]\').forEach(b=>b.onclick=()=>km327Route(b.dataset.sqRoute));')
# Kayıt
rep(",sideStats:state.sideStats};localStorage.setItem",",sideStats:state.sideStats,sq:state.sq};localStorage.setItem")
rep("state.sideStats=km324NewSideStats();","state.sideStats=km324NewSideStats();state.sq={};")
rep("state.sideStats=km324RestoreSideStats(old.sideStats);","state.sideStats=km324RestoreSideStats(old.sideStats);state.sq=km327RestoreSq(old.sq);")
# Test API
rep("unlocked:Object.keys(KM326_UNLOCK).filter(km326Unlocked),","unlocked:Object.keys(KM326_UNLOCK).filter(km326Unlocked),sq:JSON.parse(JSON.stringify(state.sq||{})),sqStatus:KM327_SIDE.map(q=>q.id+':'+km327Status(q)),")
rep("content:()=>({story:KM323_STORY.length,","sqAccept:id=>km327Accept(KM327_SIDE.find(q=>q.id===id)),sqRoute:id=>km327Route(id),content:()=>({side:KM327_SIDE,story:KM323_STORY.length,")


# ---------- Yol bulma kök neden düzeltmesi (3.24'ten beri): ızgara merkezleri engel sınırına denk gelince karakter sınırda kilitleniyordu
rep("const wx=(nx+.5)*size,wy=(ny+.5)*size;if(blocked(state.zone,wx,wy))continue;",
    "const wx=(nx+.5)*size,wy=(ny+.5)*size;if(blocked(state.zone,wx,wy)||(n!==end&&(blocked(state.zone,wx+6,wy)||blocked(state.zone,wx-6,wy)||blocked(state.zone,wx,wy+6)||blocked(state.zone,wx,wy-6))))continue;")
rep("// No implicit cancellation when a path waypoint is reached",
    "// 3.27 takılma emniyeti: yol varken 0.45 sn ilerleme yoksa yeniden rota + engelden 6 birim uzaklaş\nif(moveTarget&&path.length&&mm<=.08){const mv=Math.hypot(p.x-(state.lastPX??p.x),p.y-(state.lastPY??p.y));state.stuckT=mv<.15?(state.stuckT||0)+dt:0;if(state.stuckT>.45){state.stuckT=0;state.unstuck=(state.unstuck||0)+1;for(const [ax,ay] of [[0,6],[0,-6],[6,0],[-6,0]])if(!blocked(state.zone,p.x+ax,p.y+ay)&&blocked(state.zone,p.x-ax*2,p.y-ay*2)){p.x+=ax;p.y+=ay;break}path=findPath(p,moveTarget)}}else state.stuckT=0;state.lastPX=p.x;state.lastPY=p.y;\n// No implicit cancellation when a path waypoint is reached")
rep("paused:state.paused,rewardOpen:km325RewardOpen,","paused:state.paused,unstuck:state.unstuck||0,rewardOpen:km325RewardOpen,")

# Hedef hücresinin merkezi engelde ise (hedef noktası yürünebilir olsa da) A* hiç yol bulamıyordu: en yakın açık hücreyi hedef al
rep("const [sx,sy]=cell(a.x,a.y),[tx,ty]=cell(b.x,b.y),start=sy*cols+sx,end=ty*cols+tx;",
    "const [sx,sy]=cell(a.x,a.y);let [tx,ty]=cell(b.x,b.y);if(blocked(state.zone,(tx+.5)*size,(ty+.5)*size)){let best=null;for(let r=1;r<=2&&!best;r++)for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){const nx=tx+dx,ny=ty+dy;if(nx<0||ny<0||nx>=cols||ny>=rows||blocked(state.zone,(nx+.5)*size,(ny+.5)*size))continue;const dd=Math.hypot((nx+.5)*size-b.x,(ny+.5)*size-b.y);if(!best||dd<best.d)best={nx,ny,d:dd}}if(best){tx=best.nx;ty=best.ny}}const start=sy*cols+sx,end=ty*cols+tx;")
# Dokunarak aynı bölgede yürürken rota üstündeki geçit istemsiz kullanılmaz; hedef geçidin kendisiyse veya joystick/klavye ile yürünüyorsa kullanılır
rep("else if(state.mapRoute){take=state.zone!==state.mapRoute.zone&&km326NextGate(state.zone,state.mapRoute.zone)===hit}else take=true;",
    "else if(state.mapRoute){take=state.zone!==state.mapRoute.zone&&km326NextGate(state.zone,state.mapRoute.zone)===hit}else take=!moveTarget||dist(moveTarget,hit)<100;")

open(dst,'w',encoding='utf-8').write(s)
print('OK',len(s))
