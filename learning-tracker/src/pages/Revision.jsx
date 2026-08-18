import { Fragment, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext.jsx'
import CodeNote from '../components/CodeNote.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import { todayKey, prettyDate, diffDays, addDays } from '../utils/date.js'
import { revisionIntervals, ROUND_LABEL, TOTAL_ROUNDS, dueLabel } from '../utils/revision.js'

function stars(n) {
  const lvl = n || 0
  return '★'.repeat(lvl) + '☆'.repeat(5 - lvl)
}
function diffClass(n) {
  if (!n) return 'medium'
  if (n <= 2) return 'easy'
  if (n === 3) return 'medium'
  return 'hard'
}
function provider(url) {
  if (!url) return null
  if (url.includes('leetcode')) return 'LC'
  if (url.includes('geeksforgeeks')) return 'GfG'
  return '↗'
}
function ytSearch(name) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(name + ' in java')}`
}
function plural(n, word) {
  return `${n} ${word}${n === 1 ? '' : 's'}`
}
function agoLabel(dateKey, today) {
  const days = -diffDays(today, dateKey)
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  return `${days} days ago`
}

function RevisionRow({ item, today, due, openId, setOpenId, onRevise }) {
  const { undoRevision, snoozeRevision, saveNote, getNote, hasNote } = useProgress()
  const isOpen = openId === item.id
  const noted = hasNote(item.id)
  const prov = provider(item.url)
  const overdue = due && item.overdueDays > 0
  const revisedToday = item.lastDate === today && item.round > 0

  return (
    <Fragment>
      <li className={`rev-row ${overdue ? 'overdue' : ''}`}>
        <span className={`rev-when ${overdue ? 'overdue' : ''}`}>
          {due ? (overdue ? `${item.overdueDays}d late` : 'Today') : prettyDate(item.dueDate)}
        </span>

        <div className="rev-main">
          <div className="rev-title">
            <span className="dsa-sr">#{item.sr}</span>
            {item.url ? (
              <a href={item.url} target="_blank" rel="noreferrer" className="rev-name">{item.name}</a>
            ) : (
              <span className="rev-name">{item.name}</span>
            )}
          </div>
          <div className="rev-meta">
            {due ? (
              <span className="rev-round pending">⏳ {ROUND_LABEL[item.round] || 'Revision'} pending</span>
            ) : (
              <span className={`rev-round r${item.round}`}>{ROUND_LABEL[item.round] || 'Revision'}</span>
            )}
            <span className="muted">·</span>
            <span className="muted">{item.topic}</span>
            <span className="muted">·</span>
            <span className="muted">solved {agoLabel(item.solvedAt, today)}</span>
            {item.snoozed && <span className="rev-snoozed">snoozed</span>}
          </div>
        </div>

        <div className="rev-actions">
          <span className={`diff diff-${diffClass(item.difficulty)}`}>{stars(item.difficulty)}</span>

          <button
            className={`code-btn ${noted ? 'has' : ''} ${isOpen ? 'open' : ''}`}
            title={noted ? 'View your saved solution' : 'Add notes / solution code'}
            onClick={() => setOpenId(isOpen ? null : item.id)}
          >
            {noted ? '📝' : '＋'}<span className="code-btn-label">Notes</span>
          </button>

          <a className="yt-link" href={ytSearch(item.name)} target="_blank" rel="noreferrer" title="Watch on YouTube">▶</a>
          {item.url ? (
            <a className="lc-link" href={item.url} target="_blank" rel="noreferrer" title="Open the problem">{prov}</a>
          ) : (
            <span className="lc-link disabled">—</span>
          )}

          {due ? (
            <>
              <button className="btn btn-sm rev-done-btn" onClick={() => onRevise(item)} title="I have revised this — schedule the next round">
                Mark revised
              </button>
              <button className="btn ghost btn-sm" onClick={() => snoozeRevision(item.id, 1)} title="Not today — push to tomorrow">
                ⏰
              </button>
            </>
          ) : revisedToday && (
            <button className="btn ghost btn-sm" onClick={() => undoRevision(item.id)} title="Undo today's revision">
              ↺ Undo
            </button>
          )}
        </div>
      </li>
      {isOpen && (
        <li className="dsa-note-li">
          <CodeNote
            initialValue={getNote(item.id)}
            onSave={(code) => saveNote(item.id, code)}
            onClose={() => setOpenId(null)}
          />
        </li>
      )}
    </Fragment>
  )
}

export default function Revision() {
  const { state, stats, markRevised, undoRevision } = useProgress()
  const [openId, setOpenId] = useState(null)
  const [showUpcoming, setShowUpcoming] = useState(true)
  const [showMastered, setShowMastered] = useState(false)
  const [toast, setToast] = useState('')

  const today = todayKey()
  const intervals = revisionIntervals(stats.revisionInterval)

  // The row vanishes from "Due now" the instant it is revised, so confirm
  // where it went — otherwise it just looks like it disappeared.
  const handleRevise = (item) => {
    markRevised(item.id)
    const nextRound = item.round + 1
    setToast(
      nextRound < intervals.length
        ? `✓ ${item.name} revised — back on ${prettyDate(addDays(today, intervals[nextRound]))} for its ${ROUND_LABEL[nextRound].toLowerCase()}`
        : `🧊 ${item.name} revised — all ${TOTAL_ROUNDS} rounds cleared, it is locked in`
    )
    setTimeout(() => setToast(''), 4000)
  }
  const due = stats.revisionDue
  const upcoming = stats.revisionUpcoming

  // Every scheduled revision, grouped by due date. No cutoff — a problem you
  // just revised must be findable here, and the last round sits 30 days out.
  const upcomingByDate = useMemo(() => {
    const groups = new Map()
    upcoming.forEach((item) => {
      if (!groups.has(item.dueDate)) groups.set(item.dueDate, [])
      groups.get(item.dueDate).push(item)
    })
    return [...groups.entries()]
  }, [upcoming])

  const revisedToday = stats.revisedToday
  const cyclePct = stats.revisionScheduled
    ? Math.round((stats.revisionMasteredCount / stats.revisionScheduled) * 100)
    : 0

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>🔁 Revision</h1>
          <p className="muted">
            Every problem you solve comes back {plural(intervals[0], 'day')} later, then after {intervals[1]} and {intervals[2]} days.
            Clear {TOTAL_ROUNDS} rounds and it is locked in for good.
          </p>
        </div>
        <div className="sheet-progress">
          <div className="sheet-pct" style={{ color: due.length ? '#f59e0b' : '#22c55e' }}>{due.length}</div>
          <div className="muted sm">due now</div>
        </div>
      </div>

      <div className="dsa-summary">
        <span className="pill medium">🔁 {due.length} due</span>
        {stats.revisionOverdueCount > 0 && <span className="pill hard">⏳ {stats.revisionOverdueCount} overdue</span>}
        <span className="pill">📅 {upcoming.length} scheduled</span>
        <span className="pill easy">🧊 {stats.revisionMasteredCount} locked in</span>
        <span className="pill note">✓ {revisedToday} revised today</span>
      </div>

      {stats.revisionScheduled === 0 ? (
        <section className="card rev-empty">
          <div className="rev-empty-emoji">🌱</div>
          <h2>Nothing scheduled yet</h2>
          <p className="muted">
            Mark a problem as <b>Done</b> on the DSA sheet and it will show up here {plural(intervals[0], 'day')} later
            for its first revision.
          </p>
          <Link to="/dsa" className="btn">Open DSA Sheet →</Link>
        </section>
      ) : (
        <>
          <section className="card">
            <div className="section-head">
              <h2>Due now</h2>
              <span className="section-count">{plural(due.length, 'problem')}</span>
            </div>
            {due.length === 0 ? (
              <div className="rev-clear">
                <span className="rev-clear-emoji">🎉</span>
                <div>
                  <strong>All caught up</strong>
                  <p className="muted sm">
                    {upcoming.length
                      ? `Next revision ${dueLabel(upcoming[0].dueDate, today).toLowerCase()} · ${prettyDate(upcoming[0].dueDate)}`
                      : 'Nothing pending. Go solve something new.'}
                  </p>
                </div>
              </div>
            ) : (
              <ul className="dsa-list">
                {due.map((item) => (
                  <RevisionRow key={item.id} item={item} today={today} due openId={openId} setOpenId={setOpenId} onRevise={handleRevise} />
                ))}
              </ul>
            )}
          </section>

          {revisedToday > 0 && (
            <p className="muted sm rev-undo-hint">
              Revised {revisedToday} problem{revisedToday === 1 ? '' : 's'} today. Marked one by mistake?
              Undo it from the upcoming list below.
            </p>
          )}

          <section className="card">
            <button className="rev-section-toggle" onClick={() => setShowUpcoming((v) => !v)}>
              <span className="phase-caret">{showUpcoming ? '▾' : '▸'}</span>
              <h2>Coming up</h2>
              <span className="section-count">{upcoming.length} scheduled</span>
            </button>
            {showUpcoming && (
              upcomingByDate.length === 0 ? (
                <p className="muted sm">Nothing scheduled — everything solved is either due now or locked in.</p>
              ) : (
                upcomingByDate.map(([date, items]) => (
                  <div className="rev-group" key={date}>
                    <div className="rev-group-head">
                      <span className="rev-group-date">{prettyDate(date)}</span>
                      <span className="muted sm">{dueLabel(date, today)} · {items.length}</span>
                    </div>
                    <ul className="dsa-list">
                      {items.map((item) => (
                        <RevisionRow key={item.id} item={item} today={today} due={false} openId={openId} setOpenId={setOpenId} onRevise={handleRevise} />
                      ))}
                    </ul>
                  </div>
                ))
              )
            )}
          </section>

          <section className="card">
            <button className="rev-section-toggle" onClick={() => setShowMastered((v) => !v)}>
              <span className="phase-caret">{showMastered ? '▾' : '▸'}</span>
              <h2>Locked in</h2>
              <span className="section-count">{plural(stats.revisionMasteredCount, 'problem')}</span>
            </button>
            <ProgressBar pct={cyclePct} color="#22c55e" height={8} />
            <p className="muted sm rev-cycle-note">
              {cyclePct}% of your solved problems have cleared all {TOTAL_ROUNDS} revision rounds.
            </p>
            {showMastered && (
              stats.revisionMastered.length === 0 ? (
                <p className="muted sm">None yet — finish {TOTAL_ROUNDS} rounds on a problem to lock it in.</p>
              ) : (
                <ul className="dsa-list rev-mastered-list">
                  {stats.revisionMastered.map((item) => (
                    <li className="rev-row mastered" key={item.id}>
                      <span className="rev-when done">🧊</span>
                      <div className="rev-main">
                        <div className="rev-title">
                          <span className="dsa-sr">#{item.sr}</span>
                          <span className="rev-name">{item.name}</span>
                        </div>
                        <div className="rev-meta">
                          <span className="muted">{item.topic}</span>
                          <span className="muted">·</span>
                          <span className="muted">last revised {agoLabel(item.lastDate, today)}</span>
                        </div>
                      </div>
                      <div className="rev-actions">
                        <span className={`diff diff-${diffClass(item.difficulty)}`}>{stars(item.difficulty)}</span>
                        <button
                          className="btn ghost btn-sm"
                          onClick={() => undoRevision(item.id)}
                          title="Put this back into the revision cycle"
                        >↺ Revise again</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )
            )}
          </section>

          <p className="muted sm">
            Revision interval is {plural(state.settings.revisionInterval, 'day')} —
            change it in <Link to="/settings" className="link">Settings</Link>.
          </p>
        </>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
