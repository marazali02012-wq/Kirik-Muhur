from pathlib import Path
import sys
p=Path(sys.argv[1]) if len(sys.argv)>1 else Path(__file__).with_name('index.html')
s=p.read_text()
def rep(a,b):
 global s
 assert s.count(a)==1,(a[:100],s.count(a));s=s.replace(a,b)
rep("'event-reward','growth-reward'].includes(route)","'event-reward','growth-reward','quest-reward'].includes(route)")
rep("if(state.questRewards.includes(id))return false;state.questRewards.push(id);if(/^(mission-|side327-)/.test(id))km3131Count(state,'quest');state.coins+=coin;state.materials+=mat;", "if(state.questRewards.includes(id)||!Number.isSafeInteger(xp)||xp<0)return false;const plan=km213WalletPlan(state,'quest-reward',coin,mat);if(!plan||!km213WalletApply(state,plan))return false;state.questRewards.push(id);if(/^(mission-|side327-)/.test(id))km3131Count(state,'quest');")
rep("questAward(id,m.coin,m.xp,m.material);if(state.missionIndex===1", "if(!questAward(id,m.coin,m.xp,m.material))return false;if(state.missionIndex===1")
rep("questAward(lid,lm.coin,lm.xp,lm.material);state.missionIndex++;state.quest=state.missionIndex;km326Migrated='Eski devam görevi ödülü eklendi (+'+lm.coin+' altın)'", "if(questAward(lid,lm.coin,lm.xp,lm.material)){state.missionIndex++;state.quest=state.missionIndex;km326Migrated='Eski devam görevi ödülü eklendi (+'+lm.coin+' altın)'}")
rep("if(questAward(id,q.coin,q.xp,q.mat))km325QueueReward", "if(!state.questRewards.includes(id)){if(!questAward(id,q.coin,q.xp,q.mat))return false;km325QueueReward")
rep("powerAfter:km324Power()});\n if(state.km3125Side===q.id)","powerAfter:km324Power()});}\n if(state.km3125Side===q.id)")
# Existing main transaction is shared without changing its main-entry guards.
rep(" // Capture only the state mutated by the existing synchronous settlement and its nested rewards.\n const snapshot=", " return km222Settle(()=>km202DeliverBase(),true);\n};\nfunction km222Settle(fn,main=false){\n if(km202Tx)return false;\n // Capture only the state mutated by the existing synchronous settlement and its nested rewards.\n const snapshot=")
rep("if(!km202DeliverBase())throw Error('settlement rejected');", "if(!fn())throw Error('settlement rejected');")
rep("km202RetryAt=performance.now()+1500;stopMissionMovement();", "if(main){km202RetryAt=performance.now()+1500;stopMissionMovement();}")
rep(" return true;\n};\n\n// 3.204 local API", " return true;\n}\nconst km222SideBase=km327TurnIn;let km222SideRetry=0;\nkm327TurnIn=function(q){if(km202Tx||performance.now()<km222SideRetry||!km3134Can()||state.paused||!q||!km3140NearNpc(q))return false;const st=state.sq?.[q.id];if(!st||st.st!=='active'||st.n<km327Need(q))return false;const ok=km222Settle(()=>km222SideBase(q));if(!ok)km222SideRetry=performance.now()+1500;return ok;};\n\n// 3.204 local API")
rep('Kırık Mühür 3.221 — Ortak Görsel Sistem TEST','Kırık Mühür 3.222 — Görev Ödül İşlemi TEST')
rep(' · 3.221 TEST</p>',' · 3.222 TEST</p>')
rep('Ödül hesabına otomatik ve tek kez eklendi. Onay gerekmez.',"${typeof KM220_PREVIEW!=='undefined'&&KM220_PREVIEW?'İnceleme oturumuna eklendi; kalıcı kayıt yok.':'Ödül hesabına otomatik ve tek kez eklendi. Onay gerekmez.'}")
rep('</body></html>','''<style id="km222-reward-theme">
#modalBody.rewardPanel .rewardTile{background:var(--km-ui-paper-fill)!important;border:1px solid var(--km-ui-gold)!important;box-shadow:var(--km-ui-card-shadow)!important}
#modalBody.rewardPanel .rewardTile .rewardIcon{color:#92602a!important;text-shadow:0 1px #fff8e6!important}
#modalBody.rewardPanel .rewardTile b{color:var(--km-ui-ink)!important;font-size:12px}
#modalBody.rewardPanel .rewardTile small{color:var(--km-ui-muted)!important;font-size:10px}
#modalBody.rewardPanel :is(.sub,.rewardNote){color:var(--km-ui-ivory)!important;font-size:11px}
#modalBody.rewardPanel .rewardClaim{background:var(--km-ui-action)!important;color:var(--km-ui-ivory)!important;border-color:var(--km-ui-gold)!important;box-shadow:var(--km-ui-button-shadow)!important;min-height:44px}
</style></body></html>''')
p.write_text(s)
