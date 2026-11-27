from pathlib import Path
import sys
p=Path(sys.argv[1]) if len(sys.argv)>1 else Path(__file__).with_name('index.html')
s=p.read_text()
def rep(a,b):
 global s
 assert s.count(a)==1,(a,s.count(a)); s=s.replace(a,b)
rep('function km3133Sets(w=state){', '''// 3.215: derived combat attributes; no new save fields or resource costs.
function km215GearCrit(d){return d&&KM332_SLOT_ORDER.includes(d.slot)&&KM332_SLOTS[d.slot].w[0]>0?km3164Star(d):0;}
function km215GemPierce(id){const g=km3133Gem(id);return g?.k==='atk'?g.l/2:0;}
function km215Stats(w=state){let crit=0,pierce=0;const gems=km3133San(w.gem133);for(const slot of KM332_SLOT_ORDER){if(!km209GemGear(w,slot))continue;const id=w.equipment[slot],d=itemdefs[id];if(!km381Allowed(id,w.classId,w.level,w.inv))continue;crit+=km215GearCrit(d);const stone=gems.slots[slot];if(km209GemOpen(w)&&km214GemCompatible(slot,stone))pierce+=km215GemPierce(stone);}return {crit:Math.min(20,crit),pierce:Math.min(25,pierce)};}
function km215Damage(attack,mult,def,bossMul,stats,roll=Math.random){const a=[attack,mult,def,bossMul];if(!a.every(x=>Number.isFinite(x)&&x>=0))return null;const bounded=(x,max)=>Number.isFinite(x)?Math.max(0,Math.min(max,x)):0;const c=bounded(stats?.crit,20),p=bounded(stats?.pierce,25);const crit=c>0&&roll()<c/100;const raw=attack*mult*bossMul-def*.35*(1-p/100);if(!Number.isFinite(raw))return null;const damage=Math.max(1,Math.round(Math.max(0,raw)*(crit?1.5:1)));return Number.isSafeInteger(damage)?{damage,crit}:null;}
function km3133Sets(w=state){''')
rep('let damage=Math.max(1,Math.round(state.player.attack*mult*(e.boss&&km3157Skill()?1.05:1)-e.def*.35));','const hit=km215Damage(state.player.attack,mult,e.def,e.boss&&km3157Skill()?1.05:1,state.player.km215Combat);if(!hit)return false;const {damage,crit}=hit;')
rep("'-'+damage,mult>=1.8?'#ffd34a':'#fff0c8',mult>=1.8?24:17", "(crit?'KRİTİK -':'-')+damage,crit||mult>=1.8?'#ffd34a':'#fff0c8',crit||mult>=1.8?24:17")
rep('const x=km3133Bonus();state.player.attack+=x.atk;', 'const x=km3133Bonus();state.player.km215Combat=km215Stats();state.player.attack+=x.atk;')
rep('Seçilen taş: ${selected.name} ${selected.l} · +${selected.n} ${selected.stat}</small>', 'Seçilen taş: ${selected.name} ${selected.l} · +${selected.n} ${selected.stat}${selected.k===\'atk\'?\' · %\'+km215GemPierce(selected.id)+\' zırh kırma\':\'\'}</small>')
rep('Taş yuvaya bağlıdır; eşya değişince korunur. Boş veya uyumsuz yuvada bonus vermez.', 'Taş yuvaya bağlıdır; eşya değişince korunur. Boş veya uyumsuz yuvada bonus vermez. Zırh kırma toplam sınırı %25.')
rep('Savunma: ${d.def}${eq?', 'Savunma: ${d.def}<br>Kritik olasılığı: %${km215GearCrit(d)}${eq?')
rep('Etkin yuva bonusu karşılaştırmaya dahil.</small>', 'Etkin yuva bonusu karşılaştırmaya dahil.</small><small>Kritik olasılığı: ${delta(km215GearCrit(d)-km215GearCrit(cur))} yüzde puan</small>')
# Separate compact stat row beneath the portrait to avoid covering character art.
rep('</div>${km364Tabs()}${km364Filter', '</div><div class="km215attributes"><span>Kritik <b>%${km215Stats().crit}</b></span><span>Zırh kırma <b>%${km215Stats().pierce}</b></span></div>${km364Tabs()}${km364Filter')
rep("use:'Mücevher yuvası: +'+g.n+' '+g.stat+' · '", "use:'Mücevher yuvası: +'+g.n+' '+g.stat+(g.k==='atk'?' · %'+km215GemPierce(id)+' zırh kırma':'')+' · '")
rep('<style id="km214-style">', '<style id="km215-style">.km215attributes{display:flex;flex-wrap:wrap;justify-content:space-evenly;gap:4px;padding:5px 4px;color:#eadfc6;font-size:12px;background:#26343d;border:1px solid #776445;border-radius:4px}.km215attributes b{color:#ffe0a0}</style><style id="km214-style">')
rep('<title>Kırık Mühür 3.171 — R01 Mücadele HUD TEST</title>', '<title>Kırık Mühür 3.215 — Ekipman Nitelikleri TEST</title>')
p.write_text(s)
