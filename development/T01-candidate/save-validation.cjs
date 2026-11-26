'use strict';
const CAP=46;
const FLAGS=['story147','story148','story150','story152','story167'];
const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
const int=(v,min)=>Number.isSafeInteger(v)&&v>=min;
function audit(w){
 const fail=reason=>({ok:false,reason});
 if(!w||typeof w!=='object'||Array.isArray(w))return fail('invalid-save');
 if(!own(w,'missionIndex')||!own(w,'level')||!own(w,'questRewards'))return fail('migration-required');
 if(!int(w.missionIndex,0)||!int(w.level,1))return fail('invalid-number');
 if(!Array.isArray(w.questRewards))return fail('invalid-receipts');
 const seen=new Set();
 for(const id of w.questRewards){
  if(typeof id!=='string'||!id.trim()||id!==id.trim())return fail('invalid-receipt');
  if(seen.has(id))return fail('duplicate-receipt');
  seen.add(id);
  if(id.startsWith('mission-')&&!/^mission-(0|[1-9][0-9]*)$/.test(id))return fail('invalid-mission-id');
 }
 let prefix=0;while(prefix<CAP&&seen.has('mission-'+prefix))prefix++;
 const expected=Math.min(w.missionIndex,CAP);
 for(const flag of FLAGS)if(own(w,flag)&&w[flag]!==0&&w[flag]!==1)return fail('invalid-migration-flag');
 if(!FLAGS.every(flag=>w[flag]===1))return fail('migration-required');
 if(prefix<expected)return {...fail('receipt-gap'),firstMissing:prefix+1};
 for(const id of seen){if(id.startsWith('mission-')){const n=Number(id.slice(8));if(!Number.isSafeInteger(n))return fail('invalid-mission-id');if(n>=expected&&n<CAP)return fail('receipt-ahead');if(n>=CAP)return fail('unknown-mission-id');}}
 if(w.missionIndex>CAP)return fail('migration-required');
 return {ok:true,reason:'ok',completed:expected};
}
function rule(w,mission,level=1){if(!int(mission,0)||mission>CAP||!int(level,1))return {open:false,reason:'invalid-rule'};const a=audit(w);if(!a.ok)return {open:false,reason:a.reason};return a.completed<mission?{open:false,reason:'mission'}:w.level<level?{open:false,reason:'level'}:{open:true,reason:'open'};}
module.exports={audit,rule};
