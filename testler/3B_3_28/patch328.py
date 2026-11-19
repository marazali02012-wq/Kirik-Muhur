# Kırık Mühür 3.28 — Android emülasyon testinde bulunan açıkların kapatılması (3.27 üzerine)
# 1) Performans: tuval çözünürlüğü sınırı + uyarlanabilir çözünürlük
# 2) Dokunma alanları: görünümü değiştirmeden ≥44 px dokunulabilir alan
# 3) Ani kapanmaya dayanıklı kayıt: IndexedDB yansısı + açılışta en yeni kaydı seçme
import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding='utf-8').read()
def rep(old,new,count=1):
    global s
    n=s.count(old)
    if n!=count: raise SystemExit(f'EXPECTED {count} got {n}: {old[:100]!r}')
    s=s.replace(old,new)

rep('<title>Kırık Mühür 3.27 | 3B Tamamlama TEST</title>','<title>Kırık Mühür 3.28 | Android Uyum TEST</title>')
rep('<p class="sub">3.27 • AŞAMA 3B TAMAMLAMA TESTİ</p>','<p class="sub">3.28 • 3A/3B AÇIK KAPATMA • ANDROID UYUM</p>')

# ---------- 1) Performans
rep("function resize(){canvas.width=window.innerWidth*devicePixelRatio;canvas.height=window.innerHeight*devicePixelRatio;ctx.imageSmoothingEnabled=false}",
    "// 3.28: tuvali cihazın tam piksel yoğunluğunda (ör. 1081x2202) her kare çizmek orta seviye telefonda ~19 FPS veriyordu. Piksel sanatı için 1.5 üst sınır yeterli; FPS düşerse 1.0'a kadar iner.\nlet km328Res=Math.min(window.devicePixelRatio||1,1.5),km328FpsN=0,km328FpsT=0,km328Low=0;\nfunction resize(){canvas.width=Math.round(window.innerWidth*km328Res);canvas.height=Math.round(window.innerHeight*km328Res);ctx.imageSmoothingEnabled=false}\nfunction km328Adapt(n){if(!km328FpsT){km328FpsT=n;return}km328FpsN++;const el=n-km328FpsT;if(el<3000)return;const fps=km328FpsN*1000/el;km328FpsN=0;km328FpsT=n;if(document.visibilityState!=='visible'||state.mode!=='game'||state.paused)return;km328Low=fps<38?km328Low+1:0;if(km328Low>=1&&km328Res>1){km328Res=Math.max(1,+(km328Res-.25).toFixed(2));resize();km328Low=0}}")
rep("state.lastTick=n;tick(dt);draw();","state.lastTick=n;tick(dt);draw();km328Adapt(n);")

# ---------- 2) Dokunma alanları (görünmez genişletme; görsel boyut ve yerleşim aynı)
rep('<style id="km321-character-portrait">','''<style id="km328-touch-targets">
/* 3.28: Android dokunma hedefi ≥44 px. Görünmez ::before alanı; .ability:after bekleme göstergesi olduğu için ::before kullanılır. */
#app .railBtn,#interactBtn,#pauseBtn,#trackBtn{position:relative}
#app .railBtn::before{content:'';position:absolute;inset:-3px}
#app .ability:not(.attack)::before{content:'';position:absolute;inset:-5px;border-radius:50%}
#interactBtn::before,#pauseBtn::before{content:'';position:absolute;inset:-6px}
#trackBtn::before{content:'';position:absolute;inset:-8px -2px}
#battleToggle::before{content:'';position:absolute;inset:-12px -2px}
#mapBtn::before{content:'';position:absolute;inset:-13px -2px}
#app .actionSkills{gap:6px}
#app .ability:not(.attack){width:39px;min-width:39px;height:39px;min-height:39px}
#app .ability.attack{width:46px;min-width:46px;height:46px}
#app .ability:not(.attack)::before{inset:-3px}
#trackBtn{min-height:34px}
#interactBtn::before{inset:-8px}
#minimapFrame{cursor:pointer}
</style><style id="km321-character-portrait">''')

# ---------- 3) IndexedDB yansısı
rep("function save(){if(!state.classId||km325SaveBlocked)return;try{const s={questSchema:327,",
    "function save(){if(!state.classId||km325SaveBlocked)return;try{const s={savedAt:Date.now(),questSchema:328,")
rep("saveVersion:'3.27'","saveVersion:'3.28'")
rep("localStorage.setItem(SAVE_V32,JSON.stringify(s))}catch{}}",
r"""const js=JSON.stringify(s);km328Mirror(js);localStorage.setItem(SAVE_V32,js)}catch{}}
// 3.28: Chrome localStorage'ı diske gecikmeli yazar; Android uygulamayı aniden kapatırsa son dakikalar kaybolabiliyordu (emülasyon testi A12).
// Aynı kayıt IndexedDB'ye de yazılır (işlem tamamlanınca diskte); açılışta savedAt'i daha yeni olan seçilir. Anahtar adı aynı.
const KM328_DB='kirikMuhurKayit',KM328_STORE='kayit';let km328Db=null,km328Pending=null,km328Writing=false,km328Booted=false,km328FromIdb=false;
function km328Open(){return new Promise(res=>{try{const r=indexedDB.open(KM328_DB,1);r.onupgradeneeded=()=>{try{r.result.createObjectStore(KM328_STORE)}catch(e){}};r.onsuccess=()=>res(r.result);r.onerror=()=>res(null);r.onblocked=()=>res(null)}catch(e){res(null)}})}
function km328Mirror(js){km328Pending=js;if(km328Writing||!km328Db)return;km328Writing=true;const v=km328Pending;km328Pending=null;try{const tx=km328Db.transaction(KM328_STORE,'readwrite');tx.objectStore(KM328_STORE).put(v,SAVE_V32);const done=()=>{km328Writing=false;if(km328Pending)km328Mirror(km328Pending)};tx.oncomplete=done;tx.onerror=done;tx.onabort=done}catch(e){km328Writing=false}}
function km328ReadIdb(){return new Promise(res=>{try{const rq=km328Db.transaction(KM328_STORE,'readonly').objectStore(KM328_STORE).get(SAVE_V32);rq.onsuccess=()=>res(typeof rq.result==='string'?rq.result:null);rq.onerror=()=>res(null)}catch(e){res(null)}})}
function km328Reset(){try{localStorage.removeItem(SAVE_V32);localStorage.setItem('kirikMuhurV324Fresh','1')}catch(e){}const go=()=>location.reload();if(!km328Db){go();return}try{const tx=km328Db.transaction(KM328_STORE,'readwrite');tx.objectStore(KM328_STORE).delete(SAVE_V32);tx.oncomplete=go;tx.onerror=go;tx.onabort=go}catch(e){go()}}""")
rep("localStorage.removeItem(SAVE_V32);localStorage.setItem('kirikMuhurV324Fresh','1');location.reload()","km328Reset()",count=2)
rep("$('classCards').addEventListener('click',e=>{let b=e.target.closest('[data-class]');if(b)applyClass(b.dataset.class)});",
    "$('classCards').addEventListener('click',e=>{let b=e.target.closest('[data-class]');if(b&&km328Booted)applyClass(b.dataset.class)});")
rep("if(!restore())state.mode='select';requestAnimationFrame(frame);",
r"""requestAnimationFrame(frame);
(async()=>{try{km328Db=await Promise.race([km328Open(),new Promise(r=>setTimeout(()=>r(null),1500))]);
 if(km328Db){const idb=await km328ReadIdb();let raw=null,ls=null,bad=false;try{raw=localStorage.getItem(SAVE_V32);ls=raw?JSON.parse(raw):null}catch(e){bad=true}
  const fresh=(()=>{try{return localStorage.getItem('kirikMuhurV324Fresh')==='1'&&!raw}catch(e){return false}})();
  let it=null;try{it=idb?JSON.parse(idb):null}catch(e){it=null}
  if(it&&!fresh&&(bad||!ls||(Number(it.savedAt)||0)>(Number(ls.savedAt)||0))){try{if(bad&&raw&&localStorage.getItem(SAVE_V32+'_bozukYedek')===null)localStorage.setItem(SAVE_V32+'_bozukYedek',raw);localStorage.setItem(SAVE_V32,idb);km328FromIdb=true}catch(e){}}}
}catch(e){}
 km328Booted=true;if(!restore())state.mode='select';else{if(km328FromIdb)notify('Kayıt güvenli kopyadan (IndexedDB) yüklendi');save()}})();""")
rep("paused:state.paused,unstuck:","paused:state.paused,res:km328Res,booted:km328Booted,fromIdb:km328FromIdb,unstuck:")

# Mini haritanın tamamı haritayı açar (HARİTA düğmesi kendi işleyicisini korur; çift tetikleme yok)
rep("setFlowerMenuPage(0);","setFlowerMenuPage(0);\n$('minimapFrame').addEventListener('click',e=>{if(e.target.closest('#mapBtn'))return;if(state.mode==='game')toggleModal('map')});")

open(dst,'w',encoding='utf-8').write(s)
print('OK',len(s))
