import { Fragment, useMemo, useState } from 'react'
import { dsaPatterns, allDsaProblems } from '../data/dsaSheet.js'
import { useProgress } from '../context/ProgressContext.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import CodeNote from '../components/CodeNote.jsx'

const DIFFS = ['All', 'Easy', 'Medium', 'Hard']
const STATUSES = ['All', 'To do', 'Done']

export default function DSASheet() {
  const { isDone, toggle, stats, saveNote, getNote, hasNote } = useProgress()
  const [diff, setDiff] = useState('All')
  const [status, setStatus] = useState('All')
  const [starOnly, setStarOnly] = useState(false)
  const [q, setQ] = useState('')
  const [openId, setOpenId] = useState(null)

  const filteredPatterns = useMemo(() => {
    const ql = q.trim().toLowerCase()
    return dsaPatterns
      .map((g) => ({
        ...g,
        problems: g.problems.filter((p) => {
          if (diff !== 'All' && p.difficulty !== diff) return false
          if (starOnly && !p.star) return false
          if (status === 'Done' && !isDone(p.id)) return false
          if (status === 'To do' && isDone(p.id)) return false
          if (ql && !p.name.toLowerCase().includes(ql)) return false
          return true
        }),
      }))
      .filter((g) => g.problems.length > 0)
  }, [diff, status, starOnly, q, isDone])

  const pct = stats.dsaTotal ? Math.round((stats.dsaDone / stats.dsaTotal) * 100) : 0
  const easy = allDsaProblems.filter((p) => p.difficulty === 'Easy')
  const med = allDsaProblems.filter((p) => p.difficulty === 'Medium')
  const hard = allDsaProblems.filter((p) => p.difficulty === 'Hard')
  const countDone = (arr) => arr.filter((p) => isDone(p.id)).length

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>🧮 DSA Problem Sheet</h1>
          <p className="muted">Curated must-do set (NeetCode-150 style) grouped by pattern. ⭐ = Blind-75 essential.</p>
        </div>
        <div className="sheet-progress">
          <div className="sheet-pct" style={{ color: '#a855f7' }}>{pct}%</div>
          <div className="muted sm">{stats.dsaDone}/{stats.dsaTotal} solved</div>
        </div>
      </div>

      <div className="sheet-bar"><ProgressBar pct={pct} color="#a855f7" height={10} /></div>

      <div className="dsa-summary">
        <span className="pill easy">Easy {countDone(easy)}/{easy.length}</span>
        <span className="pill medium">Medium {countDone(med)}/{med.length}</span>
        <span className="pill hard">Hard {countDone(hard)}/{hard.length}</span>
        <span className="pill star">⭐ Blind75 {stats.blind75Done}/{stats.blind75Total}</span>
        <span className="pill note">💾 {stats.notesCount} solutions saved</span>
      </div>

      <div className="filters card">
        <input className="search" placeholder="Search problems…" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="filter-group">
          {DIFFS.map((d) => (
            <button key={d} className={`chip ${diff === d ? 'active' : ''}`} onClick={() => setDiff(d)}>{d}</button>
          ))}
        </div>
        <div className="filter-group">
          {STATUSES.map((s) => (
            <button key={s} className={`chip ${status === s ? 'active' : ''}`} onClick={() => setStatus(s)}>{s}</button>
          ))}
        </div>
        <label className={`chip toggle ${starOnly ? 'active' : ''}`}>
          <input type="checkbox" checked={starOnly} onChange={(e) => setStarOnly(e.target.checked)} />
          ⭐ Blind75 only
        </label>
      </div>

      {filteredPatterns.length === 0 && <p className="muted">No problems match these filters.</p>}

      {filteredPatterns.map((g) => {
        const done = g.problems.filter((p) => isDone(p.id)).length
        return (
          <section className="card" key={g.id}>
            <div className="section-head">
              <h2>{g.title}{g.note && <span className="section-note"> · {g.note}</span>}</h2>
              <span className="section-count">{done}/{g.problems.length}</span>
            </div>
            <ul className="dsa-list">
              {g.problems.map((p) => {
                const checked = isDone(p.id)
                const noted = hasNote(p.id)
                const open = openId === p.id
                return (
                  <Fragment key={p.id}>
                    <li className={`dsa-row ${checked ? 'checked' : ''}`}>
                      <span className={`checkbox ${checked ? 'on' : ''}`} onClick={() => toggle(p.id)}>
                        {checked && '✓'}
                      </span>
                      <span className="dsa-name" onClick={() => toggle(p.id)}>
                        {p.star && <span className="star" title="Must-do essential">⭐</span>}
                        {p.name}
                      </span>
                      <span className={`diff diff-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                      <button
                        className={`code-btn ${noted ? 'has' : ''} ${open ? 'open' : ''}`}
                        title={noted ? 'View / edit your saved solution' : 'Add your solution code'}
                        onClick={() => setOpenId(open ? null : p.id)}
                      >
                        {noted ? '📝' : '＋'}<span className="code-btn-label">{noted ? 'Code' : 'Add code'}</span>
                      </button>
                      <a className="lc-link" href={p.url} target="_blank" rel="noreferrer" title="Open on LeetCode">↗</a>
                    </li>
                    {open && (
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
          </section>
        )
      })}
    </div>
  )
}
