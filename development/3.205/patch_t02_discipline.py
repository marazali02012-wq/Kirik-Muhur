from pathlib import Path
p=Path('index.html')
s=p.read_text()
changes=[
('ready:!!r&&w.level>=r.lv&&w.missionIndex>=r.q&&def>=r.def','ready:!!r&&km203Rule(w,r.q,r.lv).open&&Number.isFinite(def)&&def>=r.def'),
("row('Tamamlanan ana görev',state.missionIndex,r.q)","row('Doğrulanmış ana görev',km203Progress(state).completed,r.q)"),
("status:state.level>=20&&state.missionIndex>=12?'open':'locked'","status:km203Rule(state,12,20).open?'open':'locked'")]
for a,b in changes:
    assert s.count(a)==1,(a,s.count(a))
    s=s.replace(a,b)
p.write_text(s)
