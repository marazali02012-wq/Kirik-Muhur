# Kırık Mühür 3.26 — Aşama 3B: harita/görev genişletmesi (3.25 üzerine)
# Her değişiklik "tam 1 kez geçen eski metin -> yeni metin"; eşleşme tutmazsa durur.
import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding='utf-8').read()
def rep(old,new,count=1):
    global s
    n=s.count(old)
    if n!=count: raise SystemExit(f'EXPECTED {count} got {n}: {old[:100]!r}')
    s=s.replace(old,new)

# ---------- Kimlik
rep('<title>Kırık Mühür 3.25 | 3A Onarım TEST</title>','<title>Kırık Mühür 3.26 | 3B Harita ve Görev TEST</title>')
rep('<p class="sub">3.25 • AŞAMA 3A ONARIM TESTİ</p>','<p class="sub">3.26 • AŞAMA 3B HARİTA VE GÖREV TESTİ</p>')
rep("questSchema:325,saveVersion:'3.25'","questSchema:326,saveVersion:'3.26'")

# ---------- Sprite paletleri: yeni yaratıklar + NPC görünümleri (özgün çizim üreticisi)
rep(''' boss:{dark:"#37354a",''',''' thorn:{dark:"#2a2a1f",edge:"#14140f",cloth:"#5a6b3a",cloth2:"#8a9b52",trim:"#c9a24a",glint:"#f0e09a",skin:"#3d4a2a",skinlight:"#7d8f4f",hair:"#26301c",steel:"#d8c98a",steel2:"#fff3c2",eye:"#ff7a3a",cape:"#33401f",shoe:"#20281a",glow:"#e7ff7a"},
 sentinel:{dark:"#3a3f4c",edge:"#1a1e28",cloth:"#5d6577",cloth2:"#8a93a6",trim:"#9fb7c9",glint:"#e6f3ff",skin:"#555d6e",skinlight:"#9aa4b8",hair:"#3b4150",steel:"#b8c4d6",steel2:"#eef6ff",eye:"#7ff0ff",cape:"#444b5b",shoe:"#3a404e",glow:"#7ff0ff"},
 wisp:{dark:"#3b1f1c",edge:"#1a0d0c",cloth:"#7a3324",cloth2:"#c2552e",trim:"#ff9a3c",glint:"#ffd27a",skin:"#5a2a22",skinlight:"#b5502f",hair:"#2a1412",steel:"#ff8a4a",steel2:"#ffe0a0",eye:"#fff2a8",cape:"#4a1f1a",shoe:"#2f1614",glow:"#ffb347"},
 ashlord:{dark:"#2b1a1a",edge:"#120a0a",cloth:"#5a2a22",cloth2:"#9a4a2e",trim:"#ffb04a",glint:"#fff0b0",skin:"#4a2622",skinlight:"#a8603e",hair:"#3a1e1a",steel:"#e08a4a",steel2:"#ffe2b0",eye:"#ffef7a",cape:"#4a2420",shoe:"#3a1c18",glow:"#ff9a3c"},
 npcSmith:{dark:"#2e2622",edge:"#14100e",cloth:"#6b4a34",cloth2:"#9a6e4a",trim:"#d9a050",glint:"#ffe0a0",skin:"#c48a62",skinlight:"#e8b48a",hair:"#3a2a22",steel:"#a8b0b8",steel2:"#e8eef2",eye:"#2a2020",cape:"#4a3428",shoe:"#2a201a",glow:"#ffb060"},
 npcRanger:{dark:"#1e2b26",edge:"#0e1714",cloth:"#3f6a52",cloth2:"#6a9a72",trim:"#c9b070",glint:"#f2e6a8",skin:"#c99a72",skinlight:"#ecc49a",hair:"#5a3a24",steel:"#b0c8b8",steel2:"#eaf6ec",eye:"#1e3a30",cape:"#2f5040",shoe:"#26342c",glow:"#88e8b0"},
 npcScribe:{dark:"#2a2438",edge:"#120f1c",cloth:"#5a4a7a",cloth2:"#8a78a8",trim:"#d6c07a",glint:"#fff0c0",skin:"#c49478",skinlight:"#ecc0a0",hair:"#1e1a2a",steel:"#b8b0d0",steel2:"#f0ecff",eye:"#2a2440",cape:"#443a60",shoe:"#2e2840",glow:"#c0a8ff"},
 npcHerbal:{dark:"#24301e",edge:"#10170c",cloth:"#5a7a3a",cloth2:"#8aaa5a",trim:"#e0c060",glint:"#fff4b0",skin:"#b88a68",skinlight:"#e2b490",hair:"#d8d0b8",steel:"#a8c098",steel2:"#f0fae0",eye:"#2a3a20",cape:"#3a5a2a",shoe:"#2a3420",glow:"#b8f080"},
 npcKeeper:{dark:"#2c2224",edge:"#140e10",cloth:"#6a3a34",cloth2:"#9a5a4a",trim:"#e0a050",glint:"#ffe2a8",skin:"#b07c60",skinlight:"#dca688",hair:"#2a1a18",steel:"#c0a090",steel2:"#f4e4d8",eye:"#2a1a18",cape:"#4a2a26",shoe:"#2a1c1a",glow:"#ff9a4a"},
 npcHermit:{dark:"#2a2a30",edge:"#121216",cloth:"#5a5a66",cloth2:"#8a8a96",trim:"#c0a070",glint:"#f4e8c8",skin:"#b89478",skinlight:"#e0bea0",hair:"#e8e4dc",steel:"#b0aab0",steel2:"#f4f0f0",eye:"#3a3a44",cape:"#44444e",shoe:"#2c2c34",glow:"#ffc080"},
 boss:{dark:"#37354a",''')
rep('const isMon=type==="shade",isBoss=type==="boss",','const isMon=type==="shade"||type==="wisp",isBoss=type==="boss"||type==="sentinel"||type==="ashlord",isBeast=type==="thorn",')
rep("  if(isMon){\n","""  if(isBeast){
    // 3.26 özgün dört ayaklı Diken Kurdu: yandan görünüş sola bakar, sağa bakış çevrilerek çizilir
    const a=[0,3,0,-3][step];
    if(side){
      p(`50,44 60,36 58,46 52,50`,c.edge);
      r(18,38,32,18,c.edge);r(20,40,28,14,c.cloth);r(22,41,24,5,c.cloth2);
      for(let j=0;j<5;j++)p(`${22+j*5},40 ${24+j*5},${32-(j%2)*3} ${27+j*5},40`,c.trim);
      r(21+a,53,5,15,c.edge);r(27-a,53,5,15,c.dark);r(40+a,53,5,15,c.edge);r(45-a,53,5,15,c.dark);
      r(20+a,66,7,4,c.shoe);r(39+a,66,7,4,c.shoe);
      r(8,34,16,14,c.edge);r(9,36,13,10,c.skinlight);r(5,42,8,6,c.skin);r(10,38,3,3,c.eye);
      p(`12,34 9,26 16,33`,c.steel);r(6,47,6,2,c.steel2);
    }else{
      r(18,36,28,22,c.edge);r(20,38,24,18,c.cloth);r(22,39,20,6,c.cloth2);
      for(let j=0;j<4;j++)p(`${21+j*6},38 ${24+j*6},${30-(j%2)*3} ${27+j*6},38`,c.trim);
      r(19,54+a,6,14,c.edge);r(39,54-a,6,14,c.edge);r(26,56-a,5,12,c.dark);r(33,56+a,5,12,c.dark);
      r(18,66+a,8,4,c.shoe);r(38,66-a,8,4,c.shoe);
      if(!back){r(24,26,16,16,c.edge);r(26,28,12,12,c.skinlight);r(27,31,3,3,c.eye);r(34,31,3,3,c.eye);r(28,37,8,3,c.skin);r(29,40,2,2,c.steel2);r(33,40,2,2,c.steel2);p(`25,28 21,18 29,26`,c.steel);p(`39,28 43,18 35,26`,c.steel)}
      else{r(26,30,12,8,c.cloth2);p(`44,46 52,38 50,48`,c.edge)}
    }
  }else if(isMon){
""")
rep("const spriteImages={};Object.keys(CHARACTER_SPRITES).forEach(k=>{const i=new Image();i.onerror=()=>{if(i.src!==CHARACTER_SPRITES[k])i.src=CHARACTER_SPRITES[k]};",
    "const spriteImages={};[...new Set([...Object.keys(CHARACTER_SPRITES),...Object.keys(KM37_SPRITE_IMAGES)])].forEach(k=>{const i=new Image();i.onerror=()=>{if(CHARACTER_SPRITES[k]&&i.src!==CHARACTER_SPRITES[k])i.src=CHARACTER_SPRITES[k]};")

# ---------- Engeller + Kül Geçidi sahnesi (çizim ve çarpışma aynı veriden)
rep("forest:[{x:590,y:65,w:265,h:210}],arena:[]};",
r"""forest:[{x:590,y:65,w:265,h:210}],arena:[],
 ashpass:[{x:420,y:120,w:230,h:150,kind:'rock'},{x:760,y:600,w:200,h:130,kind:'rock'},{x:480,y:760,w:240,h:110,kind:'lava'},{x:1000,y:90,w:120,h:120,kind:'rock'},{x:1200,y:620,w:170,h:130,kind:'lava'},{x:60,y:150,w:200,h:170,kind:'rock'},{x:1260,y:60,w:150,h:150,kind:'rock'}]};
// 3.26 — Kül Geçidi: özgün, prosedürel piksel sahne. Kaya/lav çizimleri doğrudan obstacles.ashpass dikdörtgenlerinden çizilir.
function km326MakeAshpass(){const c=document.createElement('canvas');c.width=1440;c.height=960;const g=c.getContext('2d');g.imageSmoothingEnabled=false;
 let seed=326011;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
 const R=(x,y,w,h,col)=>{g.fillStyle=col;g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
 const grd=g.createLinearGradient(0,0,0,960);grd.addColorStop(0,'#2a2630');grd.addColorStop(.5,'#3a3032');grd.addColorStop(1,'#2b2228');g.fillStyle=grd;g.fillRect(0,0,1440,960);
 for(let i=0;i<9000;i++){const x=rnd()*1440,y=rnd()*960,s2=2+Math.floor(rnd()*4);g.globalAlpha=.12+rnd()*.2;R(x,y,s2,2,['#4a4045','#5b4c48','#1f1a1f','#6b5550'][Math.floor(rnd()*4)])}g.globalAlpha=1;
 const trail=[[120,560],[330,620],[560,560],[760,470],[980,520],[1180,420],[1300,330]];
 g.lineCap='round';g.lineJoin='round';const tr=()=>{g.beginPath();trail.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y))};
 g.strokeStyle='#463b3b';g.lineWidth=92;tr();g.stroke();g.strokeStyle='#5e504b';g.lineWidth=62;tr();g.stroke();
 for(let i=0;i<1100;i++){const t=rnd()*(trail.length-1),k=Math.floor(t),f=t-k,a=trail[k],b=trail[k+1],x=a[0]+(b[0]-a[0])*f+(rnd()-.5)*56,y=a[1]+(b[1]-a[1])*f+(rnd()-.5)*44;g.globalAlpha=.4;R(x,y,4+rnd()*7,2,rnd()<.5?'#7a6658':'#3e3433')}g.globalAlpha=1;
 // patika yanı küçük kül kümbetleri (taşınmaz süs, ufak; çarpışma gerektirmez)
 for(const [x,y] of [[200,470],[420,680],[640,520],[870,420],[1090,560],[1240,470]]){R(x-6,y-3,12,6,'#2a2228');R(x-4,y-9,8,7,'#5a4a48');R(x-1,y-12,3,3,'#ffb04a')}
 for(let i=0;i<30;i++){let x=rnd()*1440,y=60+rnd()*860;g.strokeStyle='#ff7a2a';g.globalAlpha=.5;g.lineWidth=2;g.beginPath();g.moveTo(x,y);for(let j=0;j<5;j++){x+=(rnd()-.3)*40;y+=(rnd()-.5)*26;g.lineTo(x,y)}g.stroke();g.globalAlpha=.16;g.lineWidth=7;g.stroke()}g.globalAlpha=1;
 for(const o of obstacles.ashpass){const {x,y,w,h}=o;
  if(o.kind==='lava'){g.fillStyle='#1c0f0e';g.fillRect(x,y,w,h);g.fillStyle='#2a1512';g.fillRect(x+4,y+4,w-8,h-8);g.fillStyle='#8a2c16';g.fillRect(x+10,y+10,w-20,h-20);g.fillStyle='#d8551e';g.fillRect(x+18,y+18,w-36,h-36);g.fillStyle='#ff9a3a';g.fillRect(x+30,y+28,w-60,h-56);for(let i=0;i<34;i++)R(x+14+rnd()*(w-28),y+14+rnd()*(h-28),4,3,rnd()<.5?'#ffd27a':'#ff6a1a');R(x,y,w,3,'#4a3632');R(x,y+h-3,w,3,'#120a0a')}
  else{R(x-4,y+h-8,w+8,12,'#120e12');const cols=Math.max(3,Math.floor(w/26)),cw=w/cols;for(let i=0;i<cols;i++){const cx=x+i*cw,top=y+(rnd()*.4)*h;R(cx,top,cw-1,y+h-top,'#211c24');R(cx+2,top+2,cw-5,y+h-top-5,['#4a4048','#3f3640','#554a50'][i%3]);R(cx+2,top+2,cw-5,5,'#7a6a6a');R(cx+Math.round(cw*.5),top+10,2,Math.round((y+h-top)*.6),'#2f2830');if(rnd()<.45)R(cx+4,top+14,3,3,'#ff9a3c')}}
 }
 for(const [x,y] of [[30,60],[300,40],[1380,880],[40,900],[700,930],[1180,930],[880,40]]){R(x,y-34,4,34,'#241c1c');R(x-8,y-30,8,3,'#241c1c');R(x+4,y-22,9,3,'#241c1c');R(x-3,y-2,10,3,'#120e0e')}
 return c.toDataURL('image/png')}
ASSETS.ashpass=km326MakeAshpass();{const im=new Image();im.onload=()=>assetsReady++;im.src=ASSETS.ashpass;images.ashpass=im}""")

# ---------- İÇERİK KATMANI: bölgeler, kilitler, geçitler, NPC'ler, yaratıklar, doğma noktaları
rep("""const KM323_NPCS={
 village:[{id:'elder',name:'Bilge Işın',x:800,y:460}],
 forest:[{id:'ranger',name:'Gözcü Nera',x:354,y:796}],
 arena:[{id:'scribe',name:'Yazman Tara',x:391,y:751}]
};""",
r"""// ===== 3.26 İÇERİK KATMANI (3B) — görev motoru bu veriyi okur; yeni içerik burada eklenir =====
names.ashpass='Kül Geçidi';
const KM326_UNLOCK={village:0,forest:0,arena:1,ashpass:10};
const KM326_UNLOCK_TEXT={arena:'“Ormanın Gölgeleri” görevini teslim et',ashpass:'“Mührün Kaynağı” görevini teslim et'};
function km326Unlocked(z){return state.missionIndex>=(KM326_UNLOCK[z]??0)}
const KM326_GATES={
 village:[{x:1215,y:640,to:'forest',ax:235,ay:610,label:'RUH ORMANI'}],
 forest:[{x:145,y:620,to:'village',ax:1070,ay:610,label:'FENER KÖYÜ'},{x:1200,y:545,to:'arena',ax:235,ay:625,label:'KIRIK TAPINAK'}],
 arena:[{x:170,y:620,to:'village',ax:1070,ay:610,label:'KÖYE DÖN'},{x:712,y:215,to:'ashpass',ax:250,ay:560,label:'KÜL GEÇİDİ'}],
 ashpass:[{x:140,y:560,to:'arena',ax:712,ay:330,label:'KIRIK TAPINAK'}]
};
// Açık bölgeler üzerinden en kısa geçit zinciri; ilk geçidi döndürür (kilitli hedef: null).
function km326NextGate(from,to){if(!from||!to||from===to)return null;const prev={[from]:null},q=[from];
 while(q.length){const z=q.shift();for(const g of KM326_GATES[z]||[]){if(prev[g.to]!==undefined||!km326Unlocked(g.to))continue;prev[g.to]={z,g};
  if(g.to===to){let cur=to;while(prev[cur].z!==from)cur=prev[cur].z;return prev[cur].g}q.push(g.to)}}return null}
const KM326_NPCS={
 village:[{id:'elder',name:'Bilge Işın',x:800,y:460,sprite:'elder',line:'Fener sönmesin; yeni görev için soldaki kutuya dokun.'},{id:'smith',name:'Demirci Oran',x:870,y:700,sprite:'npcSmith',line:'Örsüm hazır; ormandan iyi malzeme gelirse çalışırım.'}],
 forest:[{id:'ranger',name:'Gözcü Nera',x:354,y:796,sprite:'npcRanger',line:'Gölgeler ağaçların arasında dolaşıyor.'},{id:'herbalist',name:'Otacı Lin',x:300,y:340,sprite:'npcHerbal',line:'Diken kurtları otlarımı eziyor.'}],
 arena:[{id:'scribe',name:'Yazman Tara',x:391,y:751,sprite:'npcScribe',line:'Yazıtlar mührün hikâyesini anlatır.'}],
 ashpass:[{id:'keeper',name:'Geçit Bekçisi Varan',x:330,y:700,sprite:'npcKeeper',line:'Kül Lordu uyanırsa geçit kapanır.'},{id:'hermit',name:'Münzevi Sela',x:1180,y:300,sprite:'npcHermit',line:'Kıvılcımlar mührün kırıklarından doğdu.'}]
};
const KM326_CREATURES={
 shade:{name:'Gölge',scale:1.18,coin:6,xp:15,range:47},
 thorn:{name:'Diken Kurdu',scale:1.12,coin:8,xp:20,range:44},
 sentinel:{name:'Taş Nöbetçi',scale:1.05,coin:10,xp:24,range:52},
 wisp:{name:'Kül Kıvılcımı',scale:1.0,coin:9,xp:22,range:46},
 boss:{name:'Mühür Kolosu',scale:1.37,coin:30,xp:60,range:69,boss:true,story:true},
 ashlord:{name:'Kül Lordu',scale:1.5,coin:60,xp:140,range:72,boss:true,story:true}
};
// from: hikâye görev sırası bu değere ulaşınca doğar. story:true yaratıklar yalnız kendi av görevi sürerken doğar.
const KM326_SPAWNS={
 village:[],
 forest:[{id:'shade1',type:'shade',x:500,y:425,hp:78,atk:7,def:2,speed:57},{id:'shade2',type:'shade',x:840,y:620,hp:84,atk:8,def:2,speed:61},{id:'shade3',type:'shade',x:1030,y:435,hp:90,atk:8,def:3,speed:62},
  {id:'thorn1',type:'thorn',x:640,y:700,hp:120,atk:12,def:4,speed:66,from:10},{id:'thorn2',type:'thorn',x:1150,y:690,hp:126,atk:12,def:4,speed:68,from:10},{id:'thorn3',type:'thorn',x:430,y:575,hp:132,atk:13,def:5,speed:66,from:10}],
 arena:[{id:'boss1',type:'boss',x:930,y:445,hp:260,atk:9,def:7,speed:45,fixed:true},{id:'sent1',type:'sentinel',x:470,y:560,hp:150,atk:11,def:6,speed:40,from:2},{id:'sent2',type:'sentinel',x:1010,y:640,hp:160,atk:11,def:6,speed:40,from:2}],
 ashpass:[{id:'wisp1',type:'wisp',x:640,y:420,hp:110,atk:13,def:4,speed:70},{id:'wisp2',type:'wisp',x:900,y:330,hp:116,atk:13,def:4,speed:72},{id:'wisp3',type:'wisp',x:1080,y:470,hp:122,atk:14,def:5,speed:72},{id:'ashlord1',type:'ashlord',x:1000,y:820,hp:1100,atk:30,def:12,speed:42,fixed:true}]
};
function km326KindHint(m){return m.kind==='hunt'?(KM326_CREATURES[m.id]?KM326_CREATURES[m.id].name:'Hedef')+' bul ve savaş!':m.kind==='collect'?'Mühür parçalarını topla!':m.kind==='explore'?'Bölgeyi keşfet!':m.kind==='talk'?'İlgili kişiyle konuş!':'İşareti araştır!'}
const KM323_NPCS=KM326_NPCS;""")

# ---------- Hikâye 2. bölüm (10–15) + çeşitli devam havuzu (eski 5 devam görevi korunur, 5 yeni eklendi)
rep("""{kind:'inspect',id:'altar',title:'MÜHRÜN KAYNAĞI',zone:'arena',points:[{x:1012,y:807,label:'Kadim sunak'}],count:1,returnZone:'arena',returnNpc:'scribe',coin:165,xp:210,material:5}
];""","""{kind:'inspect',id:'altar',title:'MÜHRÜN KAYNAĞI',zone:'arena',points:[{x:1012,y:807,label:'Kadim sunak'}],count:1,returnZone:'arena',returnNpc:'scribe',coin:165,xp:210,material:5},
 // 3.26 — 2. bölüm: Kül Geçidi (10. görev tesliminden sonra açılır)
 {kind:'talk',id:'keeper',title:'KÜL GEÇİDİ’NE ÇAĞRI',zone:'ashpass',points:[{x:330,y:700,label:'Geçit Bekçisi Varan'}],count:1,returnZone:'ashpass',returnNpc:'hermit',coin:150,xp:220,material:3},
 {kind:'hunt',id:'wisp',title:'KÜL KIVILCIMLARI',zone:'ashpass',count:3,returnZone:'ashpass',returnNpc:'keeper',coin:175,xp:250,material:4},
 {kind:'explore',id:'ridge',title:'KÜL TEPESİ VE YIKIK KÖPRÜ',zone:'ashpass',points:[{x:720,y:250,label:'Kül Tepesi'},{x:1330,y:480,label:'Yıkık köprü'}],count:2,returnZone:'ashpass',returnNpc:'hermit',coin:170,xp:255,material:4},
 {kind:'hunt',id:'thorn',title:'DİKENLİ TEHDİT',zone:'forest',count:2,returnZone:'forest',returnNpc:'herbalist',coin:160,xp:240,material:3},
 {kind:'hunt',id:'sentinel',title:'UYANAN NÖBETÇİLER',zone:'arena',count:2,returnZone:'arena',returnNpc:'scribe',coin:185,xp:270,material:4},
 {kind:'hunt',id:'ashlord',title:'KÜL LORDU',zone:'ashpass',count:1,returnZone:'ashpass',returnNpc:'keeper',coin:260,xp:380,material:6}
];""")
rep("""{kind:'inspect',id:'altar',title:'TAPINAK KONTROLÜ',zone:'arena',points:[{x:921,y:730,label:'Yazıtın izi'}],count:1,returnZone:'arena',returnNpc:'scribe',coin:110,xp:145,material:3}
];""","""{kind:'inspect',id:'altar',title:'TAPINAK KONTROLÜ',zone:'arena',points:[{x:921,y:730,label:'Yazıtın izi'}],count:1,returnZone:'arena',returnNpc:'scribe',coin:110,xp:145,material:3},
 {kind:'hunt',id:'thorn',title:'DİKEN KURDU AVI',zone:'forest',count:3,returnZone:'forest',returnNpc:'herbalist',coin:120,xp:160,material:3},
 {kind:'hunt',id:'wisp',title:'KIVILCIM SÖNDÜRME',zone:'ashpass',count:3,returnZone:'ashpass',returnNpc:'keeper',coin:140,xp:180,material:4},
 {kind:'hunt',id:'sentinel',title:'NÖBETÇİ TAŞLARI',zone:'arena',count:2,returnZone:'arena',returnNpc:'scribe',coin:130,xp:170,material:4},
 {kind:'explore',id:'ridge',title:'KÜL TEPESİ GÖZCÜLÜĞÜ',zone:'ashpass',points:[{x:720,y:250,label:'Kül Tepesi'}],count:1,returnZone:'ashpass',returnNpc:'hermit',coin:125,xp:165,material:3},
 {kind:'talk',id:'herbalist',title:'DEMİRCİNİN SİPARİŞİ',zone:'forest',points:[{x:300,y:340,label:'Otacı Lin'}],count:1,returnZone:'village',returnNpc:'smith',coin:115,xp:150,material:3}
];
// 3.25 ve öncesinde devam görevleri 10. sıradan başlıyordu (5'li döngü). Eski kayıt geçişinde bekleyen ödülü doğru hesaplamak için saklanır.
const KM325_LEGACY_REPEAT=KM323_REPEAT.slice(0,5);
function km326LegacyMission(idx){const num=idx-10,tier=Math.floor(num/5)+1,src=KM325_LEGACY_REPEAT[num%5];return {...src,title:src.title+' • '+tier,coin:src.coin+18*tier,xp:src.xp+20*tier}}""")

# ---------- Yaratıklar: veri katmanından doğma
import re
m=re.search(r"\nfunction enemiesFor\(z\)\{[^\n]*\n",s)
assert m, 'enemiesFor'
s=s[:m.start()]+"""
function enemiesFor(z){const n=state.missionIndex>=2?Math.min(7,state.missionIndex-1):0,m=missionInfo(),huntingHere=m.kind==='hunt'&&['travel','hunt'].includes(state.questPhase);
 return (KM326_SPAWNS[z]||[]).filter(sp=>{const c=KM326_CREATURES[sp.type];if(c.story)return huntingHere&&m.id===sp.type&&m.zone===z;return state.missionIndex>=(sp.from||0)})
  .map(sp=>{const c=KM326_CREATURES[sp.type],k=sp.fixed?0:n;return {id:sp.id,type:sp.type,name:c.name,boss:!!c.boss,x:sp.x,y:sp.y,hp:sp.hp+k*12,maxHp:sp.hp+k*12,attack:sp.atk+k,def:sp.def+k,range:c.range,speed:sp.speed,cd:0,dead:false}})}
"""+s[m.end():]
rep("if(z==='forest'&&missionInfo().zone==='forest'&&missionInfo().kind==='hunt'&&missionInfo().id==='shade'&&['travel','hunt','complete','return'].includes(state.questPhase)){const count=Math.min(3,state.missionKills);for(let i=0;i<count;i++){state.enemies[i].dead=true;state.enemies[i].hp=0}}",
    "{const mm=missionInfo();if(mm.kind==='hunt'&&mm.zone===z&&['travel','hunt','complete','return'].includes(state.questPhase)){let k=state.missionKills;for(const e of state.enemies){if(k<=0)break;if(e.type===mm.id&&!KM326_CREATURES[e.type].story){e.dead=true;e.hp=0;k--}}}}")
rep("return {zone:m.zone,x:m.id==='boss'?930:820,y:m.id==='boss'?445:525};",
    "const sp=(KM326_SPAWNS[m.zone]||[]).find(x=>x.type===m.id);return {zone:m.zone,x:sp?sp.x:820,y:sp?sp.y:525};")
rep("flash.push({x:e.x,y:e.y-33,t:.34,r:e.type==='boss'?41:25,col:'#ffe0a2',kind:'impact'});if(e.type==='boss')state.camera.shake=.28;",
    "flash.push({x:e.x,y:e.y-33,t:.34,r:e.boss?41:25,col:'#ffe0a2',kind:'impact'});if(e.boss)state.camera.shake=.28;")
rep("notify('Hedef: '+(e.type==='boss'?'Mühür Kolosu':'Gölge'))","notify('Hedef: '+(e.name||'Yaratık'))")
rep("life:e.type==='boss'?1.05:.74,t:e.type==='boss'?1.05:.74","life:e.boss?1.05:.74,t:e.boss?1.05:.74")
rep("r:e.type==='boss'?65:34,col:e.type==='boss'?'#70f4e7':'#c4a1f5'","r:e.boss?65:34,col:e.boss?'#70f4e7':'#c4a1f5'")
rep("state.coins+=e.type==='boss'?30:6;earnXP(e.type==='boss'?60:15);","{const cr=KM326_CREATURES[e.type]||{coin:6,xp:15};state.coins+=cr.coin;earnXP(cr.xp)}")
rep("e.cd=e.type==='boss'?1.6:1.9;e.attackAnim=.47;p.hurtAnim=.32;state.camera.shake=e.type==='boss'?.32:.13;",
    "e.cd=e.boss?1.6:1.9;e.attackAnim=.47;p.hurtAnim=.32;state.camera.shake=e.boss?.32:.13;")
# Oto savaş: görev hedefi önceliği korunur, ama menzildeki saldırgan yaratığa karşılık verilir (savunmasız kalmaz)
rep("const targets=state.enemies.filter(e=>!e.dead&&(!restricted||e.type===m.id));const e=targets.find(e=>e.id===state.targetId)||targets.sort((a,b)=>dist(a,p)-dist(b,p))[0];",
    "const targets=state.enemies.filter(e=>!e.dead&&(!restricted||e.type===m.id||dist(e,p)<=e.range+40));const inR=targets.filter(x=>dist(x,p)<=p.attackRange).sort((a,b)=>((b.id===state.targetId)-(a.id===state.targetId))||dist(a,p)-dist(b,p));const e=inR[0]||targets.find(e=>e.id===state.targetId)||targets.sort((a,b)=>dist(a,p)-dist(b,p))[0];")

# ---------- Geçitler, kilitler, rota
rep("""function portalLocation(){
 const m=missionInfo();
 const target=['return','claim','complete'].includes(state.questPhase)?m.returnZone:m.zone;
 if(state.zone==='village')return {x:1215,y:640};
 if(state.zone==='forest')return target==='arena'?{x:1200,y:545}:{x:145,y:620};
 return {x:170,y:620};
}""","""function portalLocation(){
 const m=missionInfo();
 const target=['return','claim','complete'].includes(state.questPhase)?m.returnZone:m.zone;
 const g=km326NextGate(state.zone,target)||(KM326_GATES[state.zone]||[])[0];
 return g?{x:g.x,y:g.y}:{x:state.player.x,y:state.player.y};
}
function km326Transit(g){if(!g)return false;
 if(!km326Unlocked(g.to)){if(state.portalCd<=0)notify('🔒 '+names[g.to]+' kilitli: '+KM326_UNLOCK_TEXT[g.to]);state.portalCd=1.2;const p=state.player,d=Math.max(1,dist(p,g)),nx=g.x+(p.x-g.x)/d*80,ny=g.y+(p.y-g.y)/d*80;if(!blocked(state.zone,nx,ny)){p.x=nx;p.y=ny}moveTarget=null;path=[];if(state.mapRoute&&state.mapRoute.zone===g.to)state.mapRoute=null;return false}
 enterZone(g.to,g.ax,g.ay);notify(names[g.to]+' bölgesine girdin');syncUI();save();return true}""")
m=re.search(r"function portal\(\)\{if\(state\.portalCd>0\)return;const z=state\.zone,m=missionInfo\(\);.*?syncUI\(\);save\(\)\}\n",s,re.S)
assert m,'portal'
s=s[:m.start()]+"function portal(){if(state.portalCd>0)return;const near=(KM326_GATES[state.zone]||[]).map(g=>({g,d:dist(state.player,g)})).sort((a,b)=>a.d-b.d)[0];if(near&&near.d<110)km326Transit(near.g)}\n"+s[m.end():]
rep("const pt=portalLocation();if(dist(state.player,pt)<100){portal();return}","if((KM326_GATES[state.zone]||[]).some(g=>dist(state.player,g)<100)){portal();return}")
rep("if(state.portalCd<=0){let portalHit=state.zone==='forest'?dist(p,{x:145,y:620})<60||dist(p,{x:1200,y:545})<60:dist(p,portalLocation())<60;if(portalHit&&((state.autoPath&&((state.questPhase==='travel'&&state.zone!==missionInfo().zone)||(state.questPhase==='return'&&state.zone!==missionInfo().returnZone)||(state.questPhase==='hunt'&&state.zone!==missionInfo().zone)))||!state.autoPath))portal()}",
    "if(state.portalCd<=0){const hit=(KM326_GATES[state.zone]||[]).find(g=>dist(p,g)<60);if(hit){let take;if(state.autoPath){const m=missionInfo(),tz=['return','claim','complete'].includes(state.questPhase)?m.returnZone:m.zone;take=['travel','hunt','return'].includes(state.questPhase)&&state.zone!==tz&&km326NextGate(state.zone,tz)===hit}else if(state.mapRoute){take=state.zone!==state.mapRoute.zone&&km326NextGate(state.zone,state.mapRoute.zone)===hit}else take=true;if(take)km326Transit(hit)}}")
rep("function mapRoutePortal(z,to){if(z==='village')return {x:1215,y:640};if(z==='arena')return {x:170,y:620};return to==='arena'?{x:1200,y:545}:{x:145,y:620}}",
    "function mapRoutePortal(z,to){const g=km326NextGate(z,to);return g?{x:g.x,y:g.y}:{x:state.player.x,y:state.player.y}}")
rep("function startWorldRoute(){const z=worldSelectedZone,p=WORLD_GRAPH[z].points.find(x=>x.id===worldSelectedPoint);if(!p)return;",
    "function startWorldRoute(){const z=worldSelectedZone,p=WORLD_GRAPH[z].points.find(x=>x.id===worldSelectedPoint);if(!p)return;if(!km326Unlocked(z)){notify('🔒 '+names[z]+' kilitli: '+KM326_UNLOCK_TEXT[z]);return}")
rep("const portals=state.zone==='village'?[{x:1215,y:640}]:state.zone==='forest'?[{x:145,y:620},{x:1200,y:545}]:[{x:170,y:620}];","const portals=KM326_GATES[state.zone]||[];")
rep("for(const e of portals){const [x,y]=pos(e.x,e.y);m.fillStyle='#61eecc';m.fillRect(x-2,y-2,5,5)}","for(const e of portals){const [x,y]=pos(e.x,e.y);m.fillStyle=km326Unlocked(e.to)?'#61eecc':'#d0675f';m.fillRect(x-2,y-2,5,5)}")
rep("""if(state.zone==='village'){portalDraw(1215,640,'RUH ORMANI')}
else if(state.zone==='forest'){portalDraw(145,620,'FENER KÖYÜ');portalDraw(1200,545,'KIRIK TAPINAK')}
else portalDraw(170,620,'KÖYE DÖN');""","for(const g of KM326_GATES[state.zone]||[])portalDraw(g.x,g.y,km326Unlocked(g.to)?g.label:'🔒 '+g.label);")

# ---------- Çizim: NPC görünümleri, yaratık ölçekleri, boss can çubuğu
rep("for(const n of state.npcs){sprite(n,'elder');","for(const n of state.npcs){sprite(n,n.sprite||'elder');")
rep("const key=type==='player'?state.classId:type==='boss'?'boss':type==='shade'?'shade':'elder',im=spriteImages[key];",
    "const key=type==='player'?state.classId:(spriteImages[type]?type:'elder'),im=spriteImages[key],isNpc=type==='elder'||String(type).startsWith('npc');")
rep("const animated=type==='player'?state.moving:ent.moving||type==='elder';","const animated=type==='player'?state.moving:ent.moving||isNpc;")
rep("animated?(type==='elder'?Math.floor(performance.now()/900)%4:","animated?(isNpc?Math.floor(performance.now()/900)%4:")
rep("const sc=type==='boss'?1.37:type==='shade'?1.18:1;","const sc=KM326_CREATURES[type]?KM326_CREATURES[type].scale:1;")
rep("hpbar(a.entity,a.type==='boss')","hpbar(a.entity,!!a.entity.boss)")
rep("function km321DrawEnvironment(){\n const z=state.zone;","function km321DrawEnvironment(){\n const z=state.zone;if(z==='ashpass')return;")
rep(" arena:{color:'#66eee4',dots:"," ashpass:{color:'#ffa24a',dots:[[260,520],[520,470],[700,330],[880,520],[1060,380],[1250,520],[420,860],[1120,860]]},\n arena:{color:'#66eee4',dots:")

# ---------- Görev metinleri ve türleri
rep("if(q==='hunt')return [m.title,m.kind==='collect'?'Ruh parçaları: '+prog:m.kind==='inspect'?'İşareti araştır: '+prog:'Yaratıkları yen: '+prog];",
    "if(q==='hunt')return [m.title,m.kind==='collect'?'Ruh parçaları: '+prog:m.kind==='inspect'?'İşareti araştır: '+prog:m.kind==='explore'?'Keşfet: '+prog:m.kind==='talk'?'Konuş: '+m.points[0].label:(KM326_CREATURES[m.id]?KM326_CREATURES[m.id].name:'Yaratık')+' yen: '+prog];")
rep("notify(m.kind==='hunt'?'Hedefleri bul ve savaş!':m.kind==='collect'?'Mühür parçalarını topla!':'İşareti araştır!')","notify(km326KindHint(m))",count=2)
rep("'✦ '+(m.kind==='inspect'?'İNCELENDİ':'TOPLANDI')","'✦ '+({inspect:'İNCELENDİ',collect:'TOPLANDI',explore:'KEŞFEDİLDİ',talk:'KONUŞULDU'}[m.kind]||'TAMAM')")
rep("notify((m.kind==='inspect'?'İncelendi: ':'Toplandı: ')+state.missionKills+'/'+m.count)","notify(({inspect:'İncelendi: ',collect:'Toplandı: ',explore:'Keşfedildi: ',talk:'Konuşuldu: '}[m.kind]||'')+state.missionKills+'/'+m.count)")
rep("notify(nearby.name+': '+(state.questPhase==='ready'?'Yeni görevi soldan başlatabilirsin.':'Önce görevi tamamla.'));",
    "notify(nearby.name+': '+(state.questPhase==='ready'?(nearby.line||'Yeni görevi soldan başlatabilirsin.'):'Önce görevi tamamla.'));")
# Bölge açılışı teslimde bildirilir ve ödül penceresinde gösterilir
rep("state.missionIndex++;state.quest=state.missionIndex;state.questPhase='ready';state.missionKills=0;state.kills=0;\n stopMissionMovement();",
    "state.missionIndex++;state.quest=state.missionIndex;state.questPhase='ready';state.missionKills=0;state.kills=0;\n for(const [z,v] of Object.entries(KM326_UNLOCK))if(v===state.missionIndex){notify('🔓 YENİ BÖLGE AÇILDI: '+names[z]);const last=km325RewardQueue.find(r=>r.id===id);if(last)last.unlock=names[z]}\n stopMissionMovement();")
rep("${lv}<p class=\"rewardNote\">Ödül hesabına otomatik","${lv}${r.unlock?`<p class=\"rewardNote\">🔓 Yeni bölge açıldı: ${r.unlock}</p>`:''}<p class=\"rewardNote\">Ödül hesabına otomatik")

# ---------- Harita ekranı
rep("let worldSelectedZone='village',worldSelectedPoint='elder';",
r"""let worldSelectedZone='village',worldSelectedPoint='elder';
// 3.26 — dünya haritası içerik katmanından genişletilir
WORLD_GRAPH.forest.points.forEach(p=>{if(p.kind==='enemy')p.type='shade'});WORLD_GRAPH.arena.points.forEach(p=>{if(p.kind==='boss')p.type='boss'});
WORLD_GRAPH.village.points.push({id:'smith',label:'Demirci Oran',icon:'✦',x:870,y:700,kind:'npc',detail:'Köy demircisi; sipariş görevlerinin teslimi.'});
WORLD_GRAPH.forest.points.push({id:'herbalist',label:'Otacı Lin',icon:'✦',x:300,y:340,kind:'npc',detail:'Diken kurdu görevleri.'},{id:'thorn1',label:'Diken kurtları',icon:'⚔',x:640,y:700,kind:'enemy',type:'thorn',detail:'10. hikâye görevinden sonra ortaya çıkar.'});
WORLD_GRAPH.arena.points.push({id:'ashgate',label:'Kül Geçidi kapısı',icon:'⟡',x:712,y:215,kind:'gate',detail:'“Mührün Kaynağı” tesliminden sonra açılır.'},{id:'sent1',label:'Taş nöbetçiler',icon:'⚔',x:470,y:560,kind:'enemy',type:'sentinel',detail:'3. hikâye görevinden sonra uyanır.'});
WORLD_GRAPH.arena.description='Mühür Kolosu boss alanı, taş nöbetçiler, köye ve Kül Geçidi’ne kapılar.';
WORLD_GRAPH.ashpass={label:'Kül Geçidi',number:'04',description:'Lav çatlakları, kül kıvılcımları ve Kül Lordu’nun ini.',points:[{id:'keeper',label:'Geçit Bekçisi Varan',icon:'✦',x:330,y:700,kind:'npc',detail:'Geçit görevleri teslimi.'},{id:'hermit',label:'Münzevi Sela',icon:'✦',x:1180,y:300,kind:'npc',detail:'Keşif görevleri.'},{id:'arenagate2',label:'Tapınak kapısı',icon:'⟡',x:140,y:560,kind:'gate',detail:'Kırık Tapınak’a dönüş.'},{id:'wisp1',label:'Kül kıvılcımları',icon:'⚔',x:640,y:420,kind:'enemy',type:'wisp',detail:'Hızlı ateş ruhları.'},{id:'ashlord1',label:'Kül Lordu',icon:'◆',x:1000,y:820,kind:'boss',type:'ashlord',detail:'Yalnız hikâye görevi sırasında uyanır.'}]};""")
rep("(p.kind==='boss'&&mission.id==='boss')||(p.kind==='enemy'&&mission.id==='shade')","((p.kind==='boss'||p.kind==='enemy')&&p.type===mission.id&&z===mission.zone)")
rep("${k===state.zone?'● BURADASIN':k===mission.zone?'✦ GÖREV BÖLGESİ':'GEÇİTLE ULAŞ'}","${!km326Unlocked(k)?'🔒 KİLİTLİ':k===state.zone?'● BURADASIN':k===mission.zone?'✦ GÖREV BÖLGESİ':'GEÇİTLE ULAŞ'}")
rep("Rota: Fener Köyü ⇄ Ruh Ormanı ⇄ Kırık Tapınak (tapınaktan dönüş köye).","Rota: Fener Köyü ⇄ Ruh Ormanı ⇄ Kırık Tapınak ⇄ Kül Geçidi (tapınaktan köye doğrudan kapı). Kilitli bölgeler hikâye ilerledikçe açılır.")
rep("worldSelectedPoint=(worldSelectedZone==='village'?'elder':worldSelectedZone==='arena'?'boss1':'shade1')","worldSelectedPoint=WORLD_GRAPH[worldSelectedZone].points[0].id")

# ---------- Kayıt geçişi (3.25 → 3.26): eski devam görevi dizinleri 10+ artık 2. bölüm
rep("if((old.questSchema||0)<323&&state.missionIndex>=2){state.questPhase='ready';state.missionKills=0;state.kills=0;state.autoPath=false;state.autoBattle=false}",
    """if((old.questSchema||0)<323&&state.missionIndex>=2){state.questPhase='ready';state.missionKills=0;state.kills=0;state.autoPath=false;state.autoBattle=false}
// 3.26: 10+ sıradaki eski 5'li devam görevi. Bitmiş ama teslim edilmemişse eski tanımla bir kez ödüllendir ve ilerle; yarımsa baştan başlat.
if((old.questSchema||0)<326&&state.missionIndex>=10&&state.classId){const lid='mission-'+state.missionIndex;
 if(['return','claim','complete'].includes(state.questPhase)&&!state.questRewards.includes(lid)){const lm=km326LegacyMission(state.missionIndex);questAward(lid,lm.coin,lm.xp,lm.material);state.missionIndex++;state.quest=state.missionIndex;km326Migrated='Eski devam görevi ödülü eklendi (+'+lm.coin+' altın)'}
 else if(['return','claim','complete'].includes(state.questPhase))state.missionIndex++;
 state.questPhase='ready';state.missionKills=0;state.kills=0;state.autoPath=false;state.autoBattle=false;if(!km326Migrated)km326Migrated='Görev içeriği 3.26 ile güncellendi'}""")
rep("function restore(){let old=load();","let km326Migrated='';\nfunction restore(){let old=load();")
rep("let rz=names[old.zone]?old.zone:'village',rx=","let rz=names[old.zone]&&km326Unlocked(old.zone)?old.zone:'village',rx=")
rep("if(blocked(rz,rx,ry)){const sp","if(rz!==old.zone){rx=475;ry=580}if(blocked(rz,rx,ry)){const sp")
rep("notify(km325S.fixed.length?","if(km326Migrated)notify(km326Migrated);notify(km325S.fixed.length?")
# Kilitli bölge yalnız oyun içinde değil, kayıt ile de atlanamaz (enter test API'si dahil değil — test kancası)

# ---------- KM317 dikey dünya süsü (Kül Geçidi)
rep(" arena:{trail:[[770,1030],"," ashpass:{trail:[[330,1030],[330,620],[760,470],[1180,420],[1300,-80]],\n   floor:'#5e504b',rim:'#c8a088',glow:'#ffb04a',lamps:[[330,640],[760,430],[1180,380],[560,600]],\n   moss:[],title:'Kül Geçidi'},\n arena:{trail:[[770,1030],")

# Nokta tabanlı tüm görev türleri (inceleme/toplama/keşif/konuşma) aynı oto rota dalını kullanır
rep("if(m.kind==='inspect'||m.kind==='collect'){","if(m.kind!=='hunt'){")
rep('<p class="sub">3 bölge • Her','<p class="sub">${Object.keys(WORLD_GRAPH).length} bölge • Her')
# Test API: kilit/rota görünürlüğü
rep("paused:state.paused,rewardOpen:km325RewardOpen,","paused:state.paused,rewardOpen:km325RewardOpen,unlocked:Object.keys(KM326_UNLOCK).filter(km326Unlocked),npcs:state.npcs.map(n=>n.id),")
rep("setFlowerMenuPage,attack,","setFlowerMenuPage,transit:to=>km326Transit((KM326_GATES[state.zone]||[]).find(g=>g.to===to)),nextGate:(a,b)=>km326NextGate(a,b),blockedAt:(z,x,y)=>blocked(z,x,y),content:()=>({story:KM323_STORY.length,repeat:KM323_REPEAT.length,spawns:KM326_SPAWNS,obstacles,gates:KM326_GATES,npcs:KM326_NPCS}),attack,")

open(dst,'w',encoding='utf-8').write(s)
print('OK',len(s))
