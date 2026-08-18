import { Fragment, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  dsaPhases,
  allDsaProblems,
  STATUS_ORDER,
  STATUS_META,
  DIFFICULTY_LABEL,
} from '../data/dsaMasterSheet.js'
import { useProgress } from '../context/ProgressContext.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import CodeNote from '../components/CodeNote.jsx'
import RevisionBanner from '../components/RevisionBanner.jsx'

const DIFFS = ['All', '1', '2', '3', '4', '5']
const STATUS_FILTERS = ['All', ...STATUS_ORDER]

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

export default function DSASheet() {
  const { toggle, setStatus, getStatus, isRevisit, toggleRevisit, stats, saveNote, getNote, hasNote } = useProgress()
  const [diff, setDiff] = useState('All')
  const [status, setStatusFilter] = useState('All')
  const [phaseId, setPhaseId] = useState('All')
  const [revisitOnly, setRevisitOnly] = useState(false)
  const [revisionOnly, setRevisionOnly] = useState(false)
  const [q, setQ] = useState('')
  const [openId, setOpenId] = useState(null)
  const [openPhases, setOpenPhases] = useState(() => new Set([dsaPhases[0]?.id]))

  const dueIds = stats.revisionDueIds
  const anyFilter = !!q.trim() || diff !== 'All' || status !== 'All' || revisitOnly || revisionOnly || phaseId !== 'All'

  const match = (p) => {
    if (diff !== 'All' && String(p.difficulty) !== diff) return false
    if (revisitOnly && !isRevisit(p.id)) return false
    if (revisionOnly && !dueIds.has(p.id)) return false
    if (status !== 'All' && getStatus(p.id) !== status) return false
    if (q.trim() && !p.name.toLowerCase().includes(q.trim().toLowerCase())) return false
    return true
  }

  const filtered = useMemo(() => {
    return dsaPhases
      .filter((ph) => phaseId === 'All' || ph.id === phaseId)
      .map((ph) => ({
        ...ph,
        topics: ph.topics
          .map((t) => ({
            ...t,
            subtopics: t.subtopics
              .map((s) => ({ ...s, problems: s.problems.filter(match) }))
              .filter((s) => s.problems.length > 0),
          }))
          .filter((t) => t.subtopics.length > 0),
      }))
      .filter((ph) => ph.topics.length > 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diff, status, phaseId, revisitOnly, revisionOnly, q, stats])

  const pct = stats.dsaTotal ? Math.round((stats.dsaDone / stats.dsaTotal) * 100) : 0
  const sc = stats.dsaStatusCounts
  const dd = stats.dsaDiff

  const togglePhase = (id) =>
    setOpenPhases((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  const expandAll = () => setOpenPhases(new Set(dsaPhases.map((p) => p.id)))
  const collapseAll = () => setOpenPhases(new Set())

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>🧮 DSA Master Sheet</h1>
          <p className="muted">
            {stats.dsaTotal} problems · 9 phases · {dsaPhases.reduce((n, p) => n + p.topics.length, 0)} topics — LeetCode &amp; GeeksforGeeks.
          </p>
        </div>
        <div className="sheet-progress">
          <div className="sheet-pct" style={{ color: '#a855f7' }}>{pct}%</div>
          <div className="muted sm">{stats.dsaDone}/{stats.dsaTotal} solved</div>
        </div>
      </div>

      <div className="sheet-bar"><ProgressBar pct={pct} color="#a855f7" height={10} /></div>

      <RevisionBanner />

      <div className="dsa-summary">
        <span className="pill easy">★★☆☆☆ Easy {dd[1].done + dd[2].done}/{dd[1].total + dd[2].total}</span>
        <span className="pill medium">★★★☆☆ Medium {dd[3].done}/{dd[3].total}</span>
        <span className="pill hard">★★★★★ Hard {dd[4].done + dd[5].done}/{dd[4].total + dd[5].total}</span>
        <span className="pill status-tried">🟠 Tried {sc.tried}</span>
        <span className="pill status-logic">🟡 Logic {sc.logic}</span>
        <span className="pill status-code">🔵 Coding {sc.code}</span>
        <span className="pill revisit">🚩 Revisit {stats.dsaRevisitCount}</span>
        <Link to="/revision" className="pill rev-pill">🔁 Revision due {stats.revisionDueCount}</Link>
        <span className="pill note">💾 {stats.notesCount} saved</span>
      </div>

      <div className="filters card">
        <input className="search" placeholder="Search problems…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="sel" value={phaseId} onChange={(e) => setPhaseId(e.target.value)}>
          <option value="All">All phases</option>
          {dsaPhases.map((p) => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
        <select className="sel" value={status} onChange={(e) => setStatusFilter(e.target.value)}>
          {STATUS_FILTERS.map((s) => (
            <option key={s} value={s}>{s === 'All' ? 'Any status' : `${STATUS_META[s].emoji} ${STATUS_META[s].label}`}</option>
          ))}
        </select>
        <div className="filter-group">
          {DIFFS.map((d) => (
            <button key={d} className={`chip ${diff === d ? 'active' : ''}`} onClick={() => setDiff(d)} title={d === 'All' ? 'All difficulties' : DIFFICULTY_LABEL[d]}>
              {d === 'All' ? 'All' : '★'.repeat(Number(d))}
            </button>
          ))}
        </div>
        <label className={`chip toggle ${revisitOnly ? 'active revisit-toggle' : ''}`}>
          <input type="checkbox" checked={revisitOnly} onChange={(e) => setRevisitOnly(e.target.checked)} />
          🚩 Revisit only
        </label>
        <label className={`chip toggle ${revisionOnly ? 'active revision-toggle' : ''}`}>
          <input type="checkbox" checked={revisionOnly} onChange={(e) => setRevisionOnly(e.target.checked)} />
          🔁 Due for revision
        </label>
        <div className="filter-group">
          <button className="chip" onClick={expandAll}>Expand</button>
          <button className="chip" onClick={collapseAll}>Collapse</button>
        </div>
      </div>

      {filtered.length === 0 && <p className="muted">No problems match these filters.</p>}

      {filtered.map((ph) => {
        const prog = stats.dsaPhaseProgress[ph.id] || { done: 0, total: 0, pct: 0 }
        const shownCount = ph.topics.reduce((n, t) => n + t.subtopics.reduce((m, s) => m + s.problems.length, 0), 0)
        const open = anyFilter || openPhases.has(ph.id)
        return (
          <section className="card phase-card" key={ph.id}>
            <button className="phase-head-btn" onClick={() => togglePhase(ph.id)} style={{ borderColor: ph.color }}>
              <span className="phase-caret">{open ? '▾' : '▸'}</span>
              <span className="phase-emoji" style={{ color: ph.color }}>{ph.emoji}</span>
              <span className="phase-title">{ph.title}</span>
              <span className="phase-mini-bar"><ProgressBar pct={prog.pct} color={ph.color} height={6} /></span>
              <span className="section-count">{anyFilter ? `${shownCount} shown` : `${prog.done}/${prog.total}`}</span>
            </button>

            {open && ph.topics.map((t) => {
              const tIds = t.subtopics.flatMap((s) => s.problems.map((p) => p.id))
              const tDone = tIds.filter((id) => getStatus(id) === 'done').length
              return (
                <div className="topic-block" key={t.id}>
                  <div className="topic-head">
                    <h3>{t.name}</h3>
                    <span className="section-count">{tDone}/{tIds.length}</span>
                  </div>
                  {t.subtopics.map((s) => (
                    <div className="subtopic-block" key={t.id + (s.name || 'x')}>
                      {s.name && <div className="subtopic-label">{s.name}</div>}
                      <ul className="dsa-list">
                        {s.problems.map((p) => {
                          const st = getStatus(p.id)
                          const done = st === 'done'
                          const noted = hasNote(p.id)
                          const flagged = isRevisit(p.id)
                          const isOpen = openId === p.id
                          const prov = provider(p.url)
                          const revDue = dueIds.has(p.id)
                          return (
                            <Fragment key={p.id}>
                              <li className={`dsa-row ${done ? 'checked' : ''} ${revDue ? 'rev-due' : ''}`}>
                                <select
                                  className={`status-sel st-${st}`}
                                  value={st}
                                  onChange={(e) => setStatus(p.id, e.target.value)}
                                  title="Update your status"
                                >
                                  {STATUS_ORDER.map((k) => (
                                    <option key={k} value={k}>{STATUS_META[k].emoji} {STATUS_META[k].short}</option>
                                  ))}
                                </select>
                                <span className="dsa-name" onClick={() => toggle(p.id)}>
                                  <span className="dsa-sr">#{p.sr}</span>
                                  {p.name}
                                </span>
                                {revDue && (
                                  <Link className="rev-badge" to="/revision" title="Due for revision — revisit this one">
                                    🔁 Revise
                                  </Link>
                                )}
                                <span className={`diff diff-${diffClass(p.difficulty)}`} title={DIFFICULTY_LABEL[p.difficulty] || ''}>
                                  {stars(p.difficulty)}
                                </span>
                                <button
                                  className={`flag-btn ${flagged ? 'on' : ''}`}
                                  title={flagged ? 'Unflag revisit' : 'Flag to revisit'}
                                  onClick={() => toggleRevisit(p.id)}
                                >🚩</button>
                                <button
                                  className={`code-btn ${noted ? 'has' : ''} ${isOpen ? 'open' : ''}`}
                                  title={noted ? 'View / edit your notes & solution' : 'Add notes / solution code'}
                                  onClick={() => setOpenId(isOpen ? null : p.id)}
                                >
                                  {noted ? '📝' : '＋'}<span className="code-btn-label">{noted ? 'Notes' : 'Notes'}</span>
                                </button>
                                <a
                                  className="yt-link"
                                  href={ytSearch(p.name)}
                                  target="_blank"
                                  rel="noreferrer"
                                  title={`Watch "${p.name} in java" on YouTube`}
                                >▶</a>
                                {p.url ? (
                                  <a className="lc-link" href={p.url} target="_blank" rel="noreferrer" title={`Open on ${prov === 'LC' ? 'LeetCode' : 'GeeksforGeeks'}`}>
                                    {prov}
                                  </a>
                                ) : (
                                  <span className="lc-link disabled" title="No link in sheet">—</span>
                                )}
                              </li>
                              {isOpen && (
                                <li className="dsa-note-li">
                                  <CodeNote
                                    initialValue={getNote(p.id)}
                                    onSave={(code) => saveNote(p.id, code)}
                                    onClose={() => setOpenId(null)}
                                  />
                                </li>
                              )}
                            </Fragment>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              )
            })}
          </section>
        )
      })}
    </div>
  )
}
