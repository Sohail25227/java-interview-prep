import { useState } from 'react'
import { months, weeks } from '../data/studyPlan.js'
import { useProgress } from '../context/ProgressContext.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import { addDays, prettyDate, todayKey } from '../utils/date.js'

export default function StudyPlan() {
  const { state, isDone, toggle, stats } = useProgress()
  const startDate = state.settings.startDate
  const today = todayKey()

  // figure out which week "today" falls in, to auto-expand it
  const dayOffset = Math.max(0, Math.floor((new Date(today) - new Date(startDate)) / 86400000))
  const currentWeek = Math.min(12, Math.floor(dayOffset / 7) + 1)

  const [openWeeks, setOpenWeeks] = useState(() => new Set([currentWeek]))
  const toggleWeek = (w) =>
    setOpenWeeks((prev) => {
      const n = new Set(prev)
      n.has(w) ? n.delete(w) : n.add(w)
      return n
    })

  const dateFor = (week, day) => addDays(startDate, (week - 1) * 7 + (day - 1))

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>🗓️ Study Plan</h1>
          <p className="muted">12 weeks, day-by-day. Sequenced so each topic builds on the last.</p>
        </div>
        <div className="sheet-progress">
          <div className="sheet-pct" style={{ color: '#6366f1' }}>{stats.planTotal ? Math.round((stats.planDaysDone / stats.planTotal) * 100) : 0}%</div>
          <div className="muted sm">{stats.planDaysDone}/{stats.planTotal} days</div>
        </div>
      </div>

      {months.map((m) => {
        const monthWeeks = weeks.filter((w) => w.month === m.month)
        const ids = monthWeeks.flatMap((w) => w.days.map((d) => d.id))
        const done = ids.filter(isDone).length
        const pct = ids.length ? Math.round((done / ids.length) * 100) : 0
        return (
          <section className="card month-card" key={m.month}>
            <div className="month-head">
              <div>
                <h2>{m.title}{stats.monthDone[m.month] && <span className="done-tag">✓ done</span>}</h2>
                <p className="muted sm">{m.subtitle}</p>
              </div>
              <span className="month-count">{done}/{ids.length}</span>
            </div>
            <ProgressBar pct={pct} color="#6366f1" />

            <div className="weeks">
              {monthWeeks.map((w) => {
                const wids = w.days.map((d) => d.id)
                const wdone = wids.filter(isDone).length
                const isOpen = openWeeks.has(w.week)
                return (
                  <div className={`week ${isOpen ? 'open' : ''}`} key={w.week}>
                    <button className="week-head" onClick={() => toggleWeek(w.week)}>
                      <span className="week-caret">{isOpen ? '▾' : '▸'}</span>
                      <span className="week-title">Week {w.week}</span>
                      <span className="week-focus">{w.focus}</span>
                      <span className="week-count">{wdone}/{wids.length}</span>
                    </button>
                    {isOpen && (
                      <ul className="day-list">
                        {w.days.map((d) => {
                          const checked = isDone(d.id)
                          const date = dateFor(w.week, d.day)
                          const isToday = date === today
                          return (
                            <li key={d.id} className={`day-row ${checked ? 'checked' : ''} ${isToday ? 'is-today' : ''}`}>
                              <span className={`checkbox ${checked ? 'on' : ''}`} onClick={() => toggle(d.id)}>
                                {checked && '✓'}
                              </span>
                              <div className="day-main" onClick={() => toggle(d.id)}>
                                <div className="day-top">
                                  <span className="day-label">Day {d.day} · {d.title}</span>
                                  <span className="day-date">{isToday ? 'Today' : prettyDate(date)}</span>
                                </div>
                                <div className="day-tasks">
                                  {d.tasks.map((t, i) => <span className="task-chip" key={i}>{t}</span>)}
                                </div>
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
