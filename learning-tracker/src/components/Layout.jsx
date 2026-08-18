import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { phases } from '../data/curriculum.js'
import { useProgress } from '../context/ProgressContext.jsx'

const topLinks = [
  { to: '/', label: 'Dashboard', emoji: '📊', end: true },
  { to: '/plan', label: 'Study Plan', emoji: '🗓️' },
  { to: '/dsa', label: 'DSA Sheet', emoji: '🧮' },
]

const SYNC_TEXT = {
  syncing: 'Syncing…',
  synced: 'Synced',
  error: 'Sync error',
  idle: 'Not synced',
}

export default function Layout() {
  const { stats, cloudEnabled, user, syncStatus } = useProgress()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // close drawer on navigation (mobile)
  const close = () => setOpen(false)

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <span className="brand-mark">J</span>
          <div>
            <div className="brand-title">Java Switch</div>
            <div className="brand-sub">Interview Tracker</div>
          </div>
        </div>

        <nav className="nav">
          <div className="nav-group-label">Overview</div>
          {topLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="nav-link" onClick={close}>
              <span className="nav-emoji">{l.emoji}</span>
              <span>{l.label}</span>
            </NavLink>
          ))}
          <NavLink to="/revision" className="nav-link" onClick={close}>
            <span className="nav-emoji">🔁</span>
            <span className="nav-link-text">Revision</span>
            {stats.revisionDueCount > 0 && (
              <span className="nav-badge" title={`${stats.revisionDueCount} due for revision`}>{stats.revisionDueCount}</span>
            )}
          </NavLink>

          <div className="nav-group-label">Topic Sheets</div>
          {phases.map((p) => {
            const prog = stats.phaseProgress[p.id]
            return (
              <NavLink key={p.id} to={`/topics/${p.id}`} className="nav-link" onClick={close}>
                <span className="nav-emoji">{p.emoji}</span>
                <span className="nav-link-text">{p.title}</span>
                <span className="nav-pct" style={{ color: p.color }}>{prog?.pct ?? 0}%</span>
              </NavLink>
            )
          })}

          <div className="nav-group-label">More</div>
          <NavLink to="/achievements" className="nav-link" onClick={close}>
            <span className="nav-emoji">🏅</span><span>Achievements</span>
            <span className="nav-pct">{stats.earnedAchievements.length}</span>
          </NavLink>
          <NavLink to="/settings" className="nav-link" onClick={close}>
            <span className="nav-emoji">⚙️</span><span>Settings</span>
          </NavLink>
        </nav>

        <div className="sidebar-foot">
          <div className="level-chip">
            <span>Lv {stats.level.level}</span>
            <small>{stats.level.name}</small>
          </div>
          <div className="level-bar"><div style={{ width: `${stats.level.progress}%` }} /></div>
        </div>
      </aside>

      {open && <div className="scrim" onClick={close} />}

      <div className="main">
        <header className="topbar">
          <button className="hamburger" onClick={() => setOpen((o) => !o)} aria-label="Menu">☰</button>
          <div className="topbar-stats">
            <div className="tstat" title="Current streak">
              <span className={`flame ${stats.currentStreak > 0 ? 'lit' : ''}`}>🔥</span>
              <b>{stats.currentStreak}</b><span className="tstat-label">day streak</span>
            </div>
            <div className="tstat" title="Total points">
              <span>⭐</span><b>{stats.points}</b><span className="tstat-label">pts</span>
            </div>
            <div className="tstat hide-sm" title="Items completed">
              <span>✅</span><b>{stats.totalCompleted}</b><span className="tstat-label">done</span>
            </div>
            {stats.revisionDueCount > 0 && (
              <NavLink to="/revision" className="tstat tstat-due" title="Problems due for revision">
                <span>🔁</span><b>{stats.revisionDueCount}</b><span className="tstat-label">to revise</span>
              </NavLink>
            )}
          </div>
          {cloudEnabled && user && (
            <NavLink to="/settings" className={`sync-pill ${syncStatus}`} title={`${user.email} — ${SYNC_TEXT[syncStatus] || ''}`}>
              <span className="sync-dot" />
              <span className="sync-pill-text">{SYNC_TEXT[syncStatus] || 'Cloud'}</span>
            </NavLink>
          )}
        </header>
        <main className="content" key={location.pathname}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
