import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext.jsx'
import { phases, allCurriculumItemIds } from '../data/curriculum.js'
import { weeks } from '../data/studyPlan.js'
import ReminderBanner from '../components/ReminderBanner.jsx'
import RevisionBanner from '../components/RevisionBanner.jsx'
import ProgressRing from '../components/ProgressRing.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import StatCard from '../components/StatCard.jsx'
import Heatmap from '../components/Heatmap.jsx'
import { prettyDate } from '../utils/date.js'

export default function Dashboard() {
  const { state, stats, markRevised } = useProgress()

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
      <RevisionBanner />

      <div className="grid-stats">
        <StatCard emoji="🔥" value={stats.currentStreak} label="Current streak" accent="#f97316" sub={`Best: ${stats.longestStreak} days`} />
        <StatCard emoji="⭐" value={stats.points} label="Total points" accent="#eab308" sub={`+${stats.streakBonus} streak bonus`} />
        <StatCard emoji="✅" value={`${overallDone}/${overallTotal}`} label="Items completed" accent="#22c55e" sub={`${overallPct}% overall`} />
        <StatCard emoji="🧮" value={`${stats.dsaDone}/${stats.dsaTotal}`} label="DSA solved" accent="#a855f7" sub={stats.dsaRevisitCount ? `🚩 ${stats.dsaRevisitCount} to revisit` : `${stats.dsaStatusCounts.done} done`} />
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

      {stats.revisionScheduled > 0 && (
        <section className="card rev-card">
          <div className="section-head">
            <h2>🔁 Revision queue</h2>
            <Link to="/revision" className="link">Open revision →</Link>
          </div>
          <div className="rev-card-stats">
            <div className={`rev-stat ${stats.revisionDueCount ? 'hot' : ''}`}>
              <b>{stats.revisionDueCount}</b><span>due now</span>
            </div>
            <div className="rev-stat"><b>{stats.revisionUpcomingCount}</b><span>scheduled</span></div>
            <div className="rev-stat"><b>{stats.revisionMasteredCount}</b><span>locked in</span></div>
            <div className="rev-stat"><b>{stats.revisedToday}</b><span>revised today</span></div>
          </div>
          {stats.revisionDueCount > 0 ? (
            <ul className="rev-mini-list">
              {stats.revisionDue.slice(0, 3).map((r) => (
                <li key={r.id}>
                  <span className={`rev-when ${r.overdueDays > 0 ? 'overdue' : ''}`}>
                    {r.overdueDays > 0 ? `${r.overdueDays}d late` : 'Today'}
                  </span>
                  <span className="rev-mini-name">{r.name}</span>
                  <button className="btn btn-sm" onClick={() => markRevised(r.id)} title="I have revised this — schedule the next round">Mark revised</button>
                </li>
              ))}
              {stats.revisionDueCount > 3 && (
                <li className="rev-mini-more">
                  <Link to="/revision" className="link">+ {stats.revisionDueCount - 3} more waiting</Link>
                </li>
              )}
            </ul>
          ) : (
            <p className="muted sm">
              Nothing to revise today.{' '}
              {stats.revisionUpcoming[0] && `Next up ${stats.revisionUpcoming[0].name} on ${prettyDate(stats.revisionUpcoming[0].dueDate)}.`}
            </p>
          )}
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
