import { achievements } from '../data/achievements.js'
import { useProgress } from '../context/ProgressContext.jsx'

export default function Achievements() {
  const { stats } = useProgress()
  const earnedCount = stats.earnedAchievements.length

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>🏅 Achievements</h1>
          <p className="muted">Earn badges by staying consistent and finishing sheets.</p>
        </div>
        <div className="sheet-progress">
          <div className="sheet-pct" style={{ color: '#eab308' }}>{earnedCount}/{achievements.length}</div>
          <div className="muted sm">unlocked</div>
        </div>
      </div>

      <div className="badge-grid">
        {achievements.map((a) => {
          const earned = stats.earnedIds.has(a.id)
          return (
            <div key={a.id} className={`badge-card ${earned ? 'earned' : 'locked'}`}>
              <div className="badge-emoji">{earned ? a.emoji : '🔒'}</div>
              <div className="badge-title">{a.title}</div>
              <div className="badge-desc">{a.desc}</div>
              {earned && <div className="badge-tag">Unlocked</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
