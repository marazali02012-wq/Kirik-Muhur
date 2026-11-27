from pathlib import Path
import sys
p=Path(sys.argv[1]) if len(sys.argv)>1 else Path(__file__).with_name('index.html')
s=p.read_text()
def rep(a,b):
 global s
 assert s.count(a)==1,(a,s.count(a))
 s=s.replace(a,b)
rep('function km3133Sets(w=state){', '''function km214GemTypes(slot){if(!KM332_SLOT_ORDER.includes(slot))return [];const w=KM332_SLOTS[slot].w;return [...(w[0]>0?['atk']:[]),...(w[1]>0?['def']:[]),'hp'];}
function km214GemCompatible(slot,id){const g=km3133Gem(id);return !!g&&km214GemTypes(slot).includes(g.k);}
function km214GemLabel(slot){return km214GemTypes(slot).map(k=>KM3133_TYPES[k].name).join(' / ');}
function km3133Sets(w=state){''')
rep('if(!km209GemGear(w,slot))continue;const g=km3133Gem(id);','if(!km209GemGear(w,slot)||!km214GemCompatible(slot,id))continue;const g=km3133Gem(id);')
rep("else if(action==='equip'){if(!g||!km209GemGear(state,slot)||d.slots[slot]||!take(id,1))", "else if(action==='equip'){if(!g||!km209GemGear(state,slot)||!km214GemCompatible(slot,id)||d.slots[slot]||!take(id,1))")
rep("${eq?stoneLabel(d.slots[k]):'Ekipman yok'}", "${!eq?'Ekipman yok':g&&!km214GemCompatible(k,d.slots[k])?'Uyumsuz · çıkar':stoneLabel(d.slots[k])}")
rep('<small>Seçilen taş: ${selected.name} ${selected.l} · +${selected.n} ${selected.stat}</small>', '<small>Seçilen taş: ${selected.name} ${selected.l} · +${selected.n} ${selected.stat}</small><small>Uygun taşlar: ${km214GemLabel(km3133Selected)}</small>${!km214GemCompatible(km3133Selected,km3133Stone)?\'<small class="km214warn">Seçilen taş bu yuvaya uymaz.</small>\':\'\'}${current&&!km214GemCompatible(km3133Selected,current)?\'<small class="km214warn">Eski taş pasif. Çıkararak geri alabilirsin.</small>\':\'\'}')
rep('locked||current||!km209GemGear(state,km3133Selected)||!d.bag[km3133Stone]', 'locked||current||!km209GemGear(state,km3133Selected)||!km214GemCompatible(km3133Selected,km3133Stone)||!d.bag[km3133Stone]')
rep('Taş yuvaya bağlıdır; eşya değişince korunur. Boş ekipman yuvasında bonus vermez.', 'Taş yuvaya bağlıdır; eşya değişince korunur. Boş veya uyumsuz yuvada bonus vermez.')
rep("use:'Mücevher yuvası: +'+g.n+' '+g.stat", "use:'Mücevher yuvası: +'+g.n+' '+g.stat+' · '+KM332_SLOT_ORDER.filter(k=>km214GemCompatible(k,id)).map(k=>KM332_SLOTS[k].n).join(', ')")
rep('Yuva: ${KM332_SLOTS[d.slot].n}<br>Güçlendirme sınırı:', 'Yuva: ${KM332_SLOTS[d.slot].n}<br>Uygun mücevher: ${km214GemLabel(d.slot)}<br>Güçlendirme sınırı:')
rep('<style id="km212-style">','<style id="km214-style">.km3133detail .km214warn{color:#ffb0a5;font-weight:700;overflow-wrap:anywhere}.km3133detail small{overflow-wrap:anywhere}</style><style id="km212-style">')
p.write_text(s)
