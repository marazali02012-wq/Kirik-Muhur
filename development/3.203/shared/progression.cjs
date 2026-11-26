// Shared local progression rules, version 1. Not proof of server entitlement.
const KM203_STORY_CAP=46;
function km203Progress(w){
 const raw=w?.missionIndex??(Number(w?.quest)>=3?1:0),index=Number(raw);
 const valid=Number.isSafeInteger(index)&&index>=0;
 const expected=valid?Math.min(index,KM203_STORY_CAP):0;
 const receipts=new Set(Array.isArray(w?.questRewards)?w.questRewards:[]);
 let prefix=0;while(prefix<KM203_STORY_CAP&&receipts.has('mission-'+prefix))prefix++;
 return {valid,index:valid?index:0,expected,prefix,completed:Math.min(expected,prefix),gap:!valid||prefix<expected,ahead:prefix>expected,firstMissing:prefix<expected?prefix+1:null};
}
function km203HasMission(w,need){if(!Number.isSafeInteger(need)||need<0||need>KM203_STORY_CAP)return false;const p=km203Progress(w);return p.valid&&p.completed>=need;}
function km203Rule(w,mission,level=1){
 if(!Number.isSafeInteger(mission)||mission<0||mission>KM203_STORY_CAP||!Number.isSafeInteger(level)||level<1)return {open:false,reason:'invalid-rule'};
 const p=km203Progress(w);if(!p.valid)return {open:false,reason:'invalid-progress'};
 if(p.completed<mission)return {open:false,reason:p.gap?'receipt-gap':'mission',need:mission,completed:p.completed};
 const lv=Number(w?.level);if(!Number.isFinite(lv)||lv<level)return {open:false,reason:'level',need:level};
 return {open:true,reason:'open'};
}
// Old repeat content was remapped at known chapter boundaries by existing restore().
// Check the preserved prefix before allowing any mutation. Do not invent receipts.
function km203AuditSave(w){
 const p=km203Progress(w);if(!p.valid)return {ok:false,reason:'invalid-progress'};
 let target=p.expected;
 for(const [flag,boundary] of [['story147',16],['story148',22],['story150',28],['story152',34],['story167',40]])if(w[flag]!==1)target=Math.min(target,boundary);
 if(p.prefix<target)return {ok:false,reason:'receipt-gap',firstMissing:p.prefix+1};
 const current=['story147','story148','story150','story152','story167'].every(k=>w[k]===1);
 // Scan even non-contiguous future main receipts; a partially committed prior snapshot is unsafe.
 if(current&&p.expected<KM203_STORY_CAP&&Array.isArray(w.questRewards)&&w.questRewards.some(id=>{const m=typeof id==='string'&&/^mission-(0|[1-9]\d*)$/.exec(id);return m&&Number(m[1])>=p.expected&&Number(m[1])<KM203_STORY_CAP;}))return {ok:false,reason:'receipt-ahead'};
 return {ok:true,reason:'ok'};
}

module.exports={KM203_STORY_CAP,km203Progress,km203HasMission,km203Rule,km203AuditSave};
