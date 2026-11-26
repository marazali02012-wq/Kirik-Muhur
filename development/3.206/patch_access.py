from pathlib import Path
p=Path('index.html'); s=p.read_text()
changes=[
('if(!r||state.level<r.lv||state.missionIndex<r.q)return false;d.rank++;','if(!r||!km203Rule(state,r.q,r.lv).open)return false;d.rank++;'),
('const ready=r&&state.level>=r.lv&&state.missionIndex>=r.q;','const ready=!!r&&km203Rule(state,r.q,r.lv).open;'),
("${state.missionIndex>=r.q?'✓':'○'} Ana görev ${Math.min(state.missionIndex,r.q)}/${r.q}","${km203HasMission(state,r.q)?'✓':'○'} Ana görev ${Math.min(km203Progress(state).completed,r.q)}/${r.q}"),
("rank===i&&l>=r.lv&&q>=r.q","rank===i&&km203Rule(w,r.q,r.lv).open"),
("open:state.missionIndex>=1,detail:state.missionIndex>=1?","open:km203HasMission(state,1),detail:km203HasMission(state,1)?"),
("open:state.missionIndex>=KM3105_TOWER[0].unlock,detail:state.missionIndex<KM3105_TOWER[0].unlock?","open:km203HasMission(state,KM3105_TOWER[0].unlock),detail:!km203HasMission(state,KM3105_TOWER[0].unlock)?"),
("if(!st)return state.missionIndex>=q.from?'available':'locked';","if(!st)return km203HasMission(state,q.from)?'available':'locked';"),
("function km3139StoryDone(){return state.missionIndex>=KM323_STORY.length;}","function km3139StoryDone(){return km203HasMission(state,KM323_STORY.length);}")]
for a,b in changes:
 assert s.count(a)==1,(a,s.count(a));s=s.replace(a,b)
p.write_text(s)
