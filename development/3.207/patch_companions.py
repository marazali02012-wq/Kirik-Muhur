from pathlib import Path
p=Path('index.html');s=p.read_text()
changes=[
("const done=i=>state.questRewards.includes('mission-'+i);", "const done=i=>km203HasMission(state,i+1);"),
("function km337Grant(kind){const k=KM337[kind],p=state.player;", "function km337Grant(kind){if(!Object.hasOwn(KM337,kind)||km202Tx?.phase!=='stage')return false;const k=KM337[kind],p=state.player;if(state.missionIndex!==k.m||!km203HasMission({...state,missionIndex:k.m+1},k.m+1))return false;"),
("function km334CanUp(kind){const l=", "function km334CanUp(kind){if(!Object.hasOwn(KM337,kind)||!km3134Can()||km395Suspended()||km325RewardOpen)return false;const l="),
("function km334PetUp(kind){const key=", "function km334PetUp(kind){if(!Object.hasOwn(KM337,kind)||!km3134Can()||km395Suspended()||km325RewardOpen)return false;const key="),
("const KM3134_MAX=10;", "const KM3134_MAX=10;\nconst KM207_WING_MISSION=10;\nfunction km207WingReady(w,id){if(!Object.hasOwn(KM3134_W,id))return false;const a=KM3134_W[id];return !!km3134San(w.look134).wings[id] ? Number.isFinite(w.level)&&w.level>=a.lv : km203Rule(w,KM207_WING_MISSION,a.lv).open;}\nfunction km207WingReq(id){return 'Sv '+KM3134_W[id].lv+' · '+KM207_WING_MISSION+'. ana görev';}"),
("if(!a||state.level<a.lv)return false;const old=state.look134", "if(!a||(wing?!km207WingReady(state,id):state.level<a.lv))return false;const old=state.look134"),
("locked=state.level<a.lv,p=wing?", "locked=wing?!km207WingReady(state,id):state.level<a.lv,p=wing?"),
("'Sv '+v.lv+' açılır'", "wing?km207WingReq(k):'Sv '+v.lv+' açılır'"),
("${locked?'Seviye '+a.lv+' gerekli':!own?", "${locked?(wing?km207WingReq(id):'Seviye '+a.lv+' gerekli'):!own?"),
("add('wing-'+id,a.name,'✧',l>=a.lv,'Sv '+a.lv,", "add('wing-'+id,a.name,'✧',km207WingReady(w,id),km207WingReq(id),"),
(" if(id==='pet'||id==='mount')return known", " if(id==='wings')return known(Object.keys(KM3134_W).some(k=>km207WingReady(w,k)),km207WingReq('feather'),()=>km3134UI('wing'),'Kanat koleksiyonu');\n if(id==='pet'||id==='mount')return known"),
]
for a,b in changes:
 assert s.count(a)==1,(a,s.count(a));s=s.replace(a,b)
p.write_text(s)
