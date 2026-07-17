import { useRef, useState } from 'react'
import { useProgress } from '../context/ProgressContext.jsx'
import AccountCard from '../components/AccountCard.jsx'

export default function Settings() {
  const { state, stats, updateSettings, resetAll, exportData, importData } = useProgress()
  const [msg, setMsg] = useState('')
  const fileRef = useRef(null)

  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(''), 2500) }

  const handleExport = () => {
    const blob = new Blob([exportData()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `java-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    flash('Backup downloaded ✓')
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        importData(String(reader.result))
        flash('Progress restored ✓')
      } catch {
        flash('Invalid backup file ✗')
      }
    }
    reader.readAsText(file)
  }

  const enableNotifications = async (on) => {
    if (on && 'Notification' in window) {
      const perm = await Notification.requestPermission()
      if (perm === 'granted') {
        updateSettings({ notifications: true })
        new Notification('Reminders on 🔔', { body: 'I\u2019ll nudge you to keep your streak alive.' })
      } else {
        flash('Notification permission denied')
      }
    } else {
      updateSettings({ notifications: false })
    }
  }

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>⚙️ Settings</h1>
          <p className="muted">Tune your goals and manage your data.</p>
        </div>
      </div>

      <AccountCard />

      <section className="card">
        <h2>Daily goal</h2>
        <p className="muted sm">How many items you aim to complete each day.</p>
        <div className="setting-row">
          <input
            type="range" min="1" max="10" value={state.settings.dailyGoal}
            onChange={(e) => updateSettings({ dailyGoal: Number(e.target.value) })}
          />
          <span className="goal-value">{state.settings.dailyGoal} / day</span>
        </div>
      </section>

      <section className="card">
        <h2>Plan start date</h2>
        <p className="muted sm">Day 1 of your 12-week plan. Changing this re-dates the calendar.</p>
        <div className="setting-row">
          <input
            type="date" value={state.settings.startDate}
            onChange={(e) => updateSettings({ startDate: e.target.value })}
          />
        </div>
      </section>

      <section className="card">
        <h2>Reminders</h2>
        <p className="muted sm">Browser notifications to keep your streak alive (works while the tab is open).</p>
        <label className="switch-row">
          <input
            type="checkbox" checked={state.settings.notifications}
            onChange={(e) => enableNotifications(e.target.checked)}
          />
          <span>{state.settings.notifications ? 'Reminders on' : 'Reminders off'}</span>
        </label>
      </section>

      <section className="card">
        <h2>Your data</h2>
        <p className="muted sm">Progress is saved in this browser. Back it up so you never lose your streak.</p>
        <div className="btn-row">
          <button className="btn" onClick={handleExport}>⬇ Export backup</button>
          <button className="btn ghost" onClick={() => fileRef.current?.click()}>⬆ Import backup</button>
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={handleImport} />
        </div>
        <div className="danger-zone">
          <div>
            <strong>Reset everything</strong>
            <p className="muted sm">Clears all progress, streaks and points. Cannot be undone.</p>
          </div>
          <button
            className="btn danger"
            onClick={() => { if (confirm('Reset ALL progress? This cannot be undone.')) { resetAll(); flash('Progress reset') } }}
          >Reset</button>
        </div>
      </section>

      <section className="card stats-recap">
        <h2>Quick stats</h2>
        <ul>
          <li><span>Total points</span><b>{stats.points}</b></li>
          <li><span>Current streak</span><b>{stats.currentStreak} days</b></li>
          <li><span>Longest streak</span><b>{stats.longestStreak} days</b></li>
          <li><span>Items completed</span><b>{stats.totalCompleted}</b></li>
          <li><span>DSA solved</span><b>{stats.dsaDone}/{stats.dsaTotal}</b></li>
          <li><span>Badges</span><b>{stats.earnedAchievements.length}</b></li>
        </ul>
      </section>

      {msg && <div className="toast">{msg}</div>}
    </div>
  )
}
