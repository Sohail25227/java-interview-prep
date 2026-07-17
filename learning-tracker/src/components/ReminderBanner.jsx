import { useProgress } from '../context/ProgressContext.jsx'
import { getReminder } from '../utils/streak.js'

const ICON = { start: '🚀', good: '✅', warn: '⏰', missed: '💔' }

export default function ReminderBanner() {
  const { stats, checkInToday } = useProgress()
  const reminder = getReminder(stats.activeDates)

  return (
    <div className={`reminder reminder-${reminder.tone}`}>
      <div className="reminder-icon">{ICON[reminder.tone]}</div>
      <div className="reminder-text">
        <strong>{reminder.title}</strong>
        <span>{reminder.message}</span>
      </div>
      {!stats.studiedToday && (
        <button className="btn btn-sm" onClick={checkInToday}>Mark today studied</button>
      )}
    </div>
  )
}
