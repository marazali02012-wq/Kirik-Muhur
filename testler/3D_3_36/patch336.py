# Kırık Mühür 3.36 — kullanıcı bildirimi: "Binek üstünde vuruyor".
# Binek AÇIK = otomatik binek: yolda biner; saldırı başlayınca / düşman vurunca / menzilde savaşa girince iner (binek kaybolur);
# savaş bittikten 2,5 sn sonra yeniden biner. Hız ve çizim artık "binili mi" durumuna bağlı. Kayıt alanı değişmedi (mount = tercih).
import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding='utf-8').read()
def rep(old,new,count=1):
    global s
    n=s.count(old)
    if n!=count: raise SystemExit(f'EXPECTED {count} got {n}: {old[:100]!r}')
    s=s.replace(old,new)
rep('<title>Kırık Mühür 3.35 | 3C Tamamlama TEST</title>','<title>Kırık Mühür 3.36 | 3D Uzun Regresyon TEST</title>')
rep("savedAt:Date.now(),questSchema:335,","savedAt:Date.now(),questSchema:336,")
rep("saveVersion:'3.35'","saveVersion:'3.36'")
rep("function deal(e,mult=1){if(!e||e.dead)return false;","function deal(e,mult=1){if(!e||e.dead)return false;km336Fight();")
rep("p.speed=c.speed*(state.mount?km334MountMul():1);","p.speed=c.speed*(km336Riding()?km334MountMul():1);")
rep(" if(type==='player'&&state.mount){pixelRect("," if(type==='player'&&km336Riding()){pixelRect(")
rep("function tick(dt){if(state.mode!=='game'||state.paused)return;const p=state.player;","function tick(dt){if(state.mode!=='game'||state.paused)return;const p=state.player;km336MountTick(dt);")
rep("e.attackAnim=.47;p.hurtAnim=.32;","e.attackAnim=.47;p.hurtAnim=.32;km336Fight();")
rep("$('mountBtn').textContent='♞ Binek: '+(state.mount?'AÇIK':'KAPALI');","$('mountBtn').textContent='♞ Binek: '+(state.mount?(km336Riding()?'AÇIK':'AÇIK • SAVAŞTA İNDİ'):'KAPALI');")
rep("notify(state.mount?'Ay Işığı Geyiği çağrıldı':'Binek dinleniyor');","notify(state.mount?'Ay Işığı Geyiği çağrıldı • savaşta iner, yolda yeniden biner':'Binek dinleniyor');")
rep("mount:state.mount,targetId:state.targetId,","mount:state.mount,riding:km336Riding(),fightT:km336FightT,targetId:state.targetId,")
rep("// ===== 3.35 3C TAMAMLAMA =====",r"""// ===== 3.36 OTOMATİK BİNEK (savaşta in, yolda bin) =====
let km336FightT=0,km336Rode=null;const KM336_HOLD=2.5;
function km336Riding(){return !!state.mount&&state.level>=2&&km336FightT<=0}
function km336Fight(){km336FightT=KM336_HOLD;km336Sync()}
function km336Sync(){const r=km336Riding();if(km336Rode===null){km336Rode=r;return}if(r===km336Rode)return;km336Rode=r;const p=state.player;baseStats();
 flash.push({x:p.x,y:p.y-14,t:.4,r:30,col:r?'#9fe6ff':'#d2b98a',kind:'burst'});effect(p.x,p.y-70,r?'♞ BİNDİ':'♞ İNDİ',r?'#9fe6ff':'#ffe2a0',13)}
function km336MountTick(dt){const p=state.player;if(km336FightT>0)km336FightT=Math.max(0,km336FightT-dt);
 if(state.mount&&(state.autoBattle||attackHeld)&&state.enemies.some(e=>!e.dead&&dist(e,p)<=p.attackRange+20))km336FightT=KM336_HOLD;km336Sync()}
// ===== 3.35 3C TAMAMLAMA =====""")
open(dst,'w',encoding='utf-8').write(s);print('OK',len(s))
