import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext.jsx'

// Nudge shown wherever the user might forget the revision queue exists.
// Renders nothing when there is nothing to revise.
export default function RevisionBanner() {
  const { stats } = useProgress()
  const due = stats.revisionDueCount
  if (!due) return null

  const overdue = stats.revisionOverdueCount
  const top = stats.revisionDue.slice(0, 2).map((r) => r.name).join(', ')

  return (
    <div className={`reminder reminder-revision ${overdue ? 'has-overdue' : ''}`}>
      <div className="reminder-icon">🔁</div>
      <div className="reminder-text">
        <strong>
          {due} problem{due === 1 ? '' : 's'} due for revision
          {overdue > 0 && <span className="rev-overdue-tag">{overdue} overdue</span>}
        </strong>
        <span>
          Solved {stats.revisionInterval}+ days ago — {top}
          {due > 2 ? ` and ${due - 2} more` : ''}.
        </span>
      </div>
      <Link to="/revision" className="btn btn-sm">Revise now →</Link>
    </div>
  )
}
