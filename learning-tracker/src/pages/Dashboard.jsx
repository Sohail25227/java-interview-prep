import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext.jsx'
import { phases, allCurriculumItemIds } from '../data/curriculum.js'
import { weeks } from '../data/studyPlan.js'
import ReminderBanner from '../components/ReminderBanner.jsx'
import ProgressRing from '../components/ProgressRing.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import StatCard from '../components/StatCard.jsx'
import Heatmap from '../components/Heatmap.jsx'

export default function Dashboard() {
  const { state, stats } = useProgress()

  const topicsDone = phases.reduce((acc, p) => acc + stats.phaseProgress[p.id].done, 0)
  const overallDone = topicsDone + stats.dsaDone
  const overallTotal = allCurriculumItemIds.length + stats.dsaTotal
  const overallPct = overallTotal ? Math.round((overallDone / overallTotal) * 100) : 0

  // next incomplete plan day
  const allDays = weeks.flatMap((w) => w.days.map((d) => ({ ...d })))
  const nextDay = allDays.find((d) => !state.completed[d.id])

  const goalPct = Math.min(100, Math.round((stats.todayCount / Math.max(1, stats.dailyGoal)) * 100))

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">Your switch to a stronger Java role — tracked daily.</p>
        </div>
      </div>

      <ReminderBanner />

      <div className="grid-stats">
        <StatCard emoji="🔥" value={stats.currentStreak} label="Current streak" accent="#f97316" sub={`Best: ${stats.longestStreak} days`} />
        <StatCard emoji="⭐" value={stats.points} label="Total points" accent="#eab308" sub={`+${stats.streakBonus} streak bonus`} />
        <StatCard emoji="✅" value={`${overallDone}/${overallTotal}`} label="Items completed" accent="#22c55e" sub={`${overallPct}% overall`} />
        <StatCard emoji="🧮" value={`${stats.dsaDone}/${stats.dsaTotal}`} label="DSA solved" accent="#a855f7" sub={`Blind75: ${stats.blind75Done}/${stats.blind75Total}`} />
      </div>

      <div className="grid-2">
        <section className="card level-card">
          <h2>Level {stats.level.level} · {stats.level.name}</h2>
          <ProgressBar pct={stats.level.progress} color="#6366f1" height={12} />
          <p className="muted sm">
            {stats.level.next
              ? `${stats.level.pointsToNext} pts to ${stats.level.next.name}`
              : 'Max level reached — you\u2019re interview ready! 🎯'}
          </p>
          <div className="goal-row">
            <div>
              <div className="goal-title">Today's goal</div>
              <div className="muted sm">{stats.todayCount} / {stats.dailyGoal} items {stats.dailyGoalMet ? '— done! 🎉' : ''}</div>
            </div>
            <ProgressRing pct={goalPct} size={72} stroke={8} color={stats.dailyGoalMet ? '#22c55e' : '#6366f1'} label={`${stats.todayCount}`} />
          </div>
        </section>

        <section className="card center-card">
          <ProgressRing pct={overallPct} size={150} stroke={13} color="#6366f1" label={`${overallPct}%`} sub="overall" />
          <p className="muted sm">{overallDone} of {overallTotal} topics + problems</p>
        </section>
      </div>

      {nextDay && (
        <section className="card next-card">
          <div className="next-head">
            <span className="badge">Up next · Week {nextDay.week} · Day {nextDay.day}</span>
            <Link to="/plan" className="link">Open plan →</Link>
          </div>
          <h3>{nextDay.title}</h3>
          <ul className="task-list">
            {nextDay.tasks.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </section>
      )}

      <section className="card">
        <h2>Activity</h2>
        <Heatmap log={state.log} checkIns={state.checkIns} />
      </section>

      <section className="card">
        <h2>Progress by area</h2>
        <div className="phase-list">
          {phases.map((p) => {
            const prog = stats.phaseProgress[p.id]
            return (
              <Link to={`/topics/${p.id}`} className="phase-row" key={p.id}>
                <span className="phase-emoji">{p.emoji}</span>
                <div className="phase-main">
                  <div className="phase-row-top">
                    <span className="phase-name">{p.title}</span>
                    <span className="phase-count">{prog.done}/{prog.total}</span>
                  </div>
                  <ProgressBar pct={prog.pct} color={p.color} />
                </div>
              </Link>
            )
          })}
          <Link to="/dsa" className="phase-row">
            <span className="phase-emoji">🧮</span>
            <div className="phase-main">
              <div className="phase-row-top">
                <span className="phase-name">DSA Problem Sheet</span>
                <span className="phase-count">{stats.dsaDone}/{stats.dsaTotal}</span>
              </div>
              <ProgressBar pct={stats.dsaTotal ? Math.round((stats.dsaDone / stats.dsaTotal) * 100) : 0} color="#a855f7" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}
