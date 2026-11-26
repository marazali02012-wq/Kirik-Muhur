const {km203Rule}=require('./progression.cjs');
// KM200 inventory progression v1. Derive from completed quest receipts and character level.
const KM200_RULES=Object.freeze(Object.fromEntries(Object.entries({"bag":[[3,3,"Fener Köyü emanet sandığı"],[8,5,"Kuzey yolculuğu heybesi"],[16,12,"Kül Lordu ganimeti"],[22,16,"Yeni mühür sandığı"],[28,20,"Demircinin mühürlü çantası"],[40,30,"Kristal harabe sandığı"],[46,36,"Demir Teras emaneti"]],"depot":[[4,3,"Gözcünün ambarı"],[10,8,"Tapınak emanet odası"],[22,16,"Yeni mühür ambarı"],[34,25,"Vadi deposu"],[40,30,"Kristal mahzeni"]]}).map(([k,rows])=>[k,Object.freeze(rows.map(Object.freeze))])));
function km200Gate(w,kind){if(!Object.hasOwn(KM200_RULES,kind))throw Error('invalid storage');const rules=KM200_RULES[kind];let passed=0;for(const [mission,lv] of rules){if(!km203Rule(w,mission,lv).open)break;passed++;}return {open:42+passed*6,total:42+rules.length*6,next:rules[passed]||null,passed};}

module.exports={KM200_RULES,km200Gate};
