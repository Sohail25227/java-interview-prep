import { Fragment, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPhase } from '../data/curriculum.js'
import { useProgress } from '../context/ProgressContext.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import CodeNote from '../components/CodeNote.jsx'

export default function TopicSheet() {
  const { phaseId } = useParams()
  const phase = getPhase(phaseId)
  const { isDone, toggle, stats, saveNote, getNote, hasNote } = useProgress()
  const [openId, setOpenId] = useState(null)

  if (!phase) {
    return (
      <div className="page">
        <p>Unknown topic. <Link to="/" className="link">Back to dashboard</Link></p>
      </div>
    )
  }

  const prog = stats.phaseProgress[phase.id]

  return (
    <div className="page">
      <div className="page-head sheet-head" style={{ '--accent': phase.color }}>
        <div>
          <h1><span className="head-emoji">{phase.emoji}</span> {phase.title}</h1>
          <p className="muted">{phase.blurb}</p>
        </div>
        <div className="sheet-progress">
          <div className="sheet-pct" style={{ color: phase.color }}>{prog.pct}%</div>
          <div className="muted sm">{prog.done}/{prog.total} done</div>
        </div>
      </div>

      <div className="sheet-bar"><ProgressBar pct={prog.pct} color={phase.color} height={10} /></div>

      {phase.sections.map((section) => {
        const ids = section.items.map((i) => i.id)
        const done = ids.filter(isDone).length
        return (
          <section className="card" key={section.id}>
            <div className="section-head">
              <h2>{section.title}</h2>
              <span className="section-count">{done}/{ids.length}</span>
            </div>
            <ul className="check-list">
              {section.items.map((item) => {
                const checked = isDone(item.id)
                const noted = hasNote(item.id)
                const open = openId === item.id
                return (
                  <Fragment key={item.id}>
                    <li className={`check-item ${checked ? 'checked' : ''}`}>
                      <span
                        className={`checkbox ${checked ? 'on' : ''}`}
                        style={checked ? { background: phase.color, borderColor: phase.color } : undefined}
                        onClick={() => toggle(item.id)}
                      >
                        {checked && '✓'}
                      </span>
                      <span className="check-text" onClick={() => toggle(item.id)}>{item.text}</span>
                      <button
                        className={`code-btn ${noted ? 'has' : ''} ${open ? 'open' : ''}`}
                        title={noted ? 'View / edit your notes' : 'Add notes'}
                        onClick={() => setOpenId(open ? null : item.id)}
                      >
                        {noted ? '📝' : '＋'}<span className="code-btn-label">Notes</span>
                      </button>
                    </li>
                    {open && (
                      <li className="dsa-note-li">
                        <CodeNote
                          initialValue={getNote(item.id)}
                          label="📝 Your notes"
                          placeholder={'Write your notes, key points, or a code example here.\nSaving will mark this topic done and keep the notes for revision.'}
                          onSave={(code) => saveNote(item.id, code)}
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
