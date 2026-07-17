import { useState } from 'react'
import { useProgress } from '../context/ProgressContext.jsx'

const SYNC_LABEL = {
  idle: { text: 'Not synced', dot: 'idle' },
  syncing: { text: 'Syncing…', dot: 'syncing' },
  synced: { text: 'Synced to cloud', dot: 'synced' },
  error: { text: 'Sync error', dot: 'error' },
  offline: { text: 'Cloud disabled', dot: 'idle' },
}

export default function AccountCard() {
  const {
    cloudEnabled, user, syncStatus, authError,
    signIn, signUp, signOut,
  } = useProgress()

  const [mode, setMode] = useState('signin') // signin | signup
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [info, setInfo] = useState('')

  // Cloud not configured -> tell the developer/user how to enable it.
  if (!cloudEnabled) {
    return (
      <section className="card">
        <h2>☁️ Cloud sync</h2>
        <p className="muted sm">
          Cloud sync is <b>off</b>. Your progress is saved only in this browser.
          To sync across devices, add your Supabase keys in a <code>.env</code> file
          (see <code>README</code>) and redeploy.
        </p>
      </section>
    )
  }

  const status = SYNC_LABEL[syncStatus] || SYNC_LABEL.idle

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true); setInfo('')
    if (mode === 'signup') {
      const { error, data } = await signUp(email, password)
      if (!error) {
        if (data?.user && !data?.session) setInfo('Check your email to confirm your account, then sign in.')
      }
    } else {
      await signIn(email, password)
    }
    setBusy(false)
  }

  // Logged in view
  if (user) {
    return (
      <section className="card">
        <h2>☁️ Cloud sync</h2>
        <div className="account-row">
          <div className="account-user">
            <div className="account-avatar">{(user.email || '?')[0].toUpperCase()}</div>
            <div>
              <strong>{user.email}</strong>
              <div className={`sync-status ${status.dot}`}>
                <span className="sync-dot" /> {status.text}
              </div>
            </div>
          </div>
          <button className="btn ghost" onClick={signOut}>Sign out</button>
        </div>
        <p className="muted sm">Your progress syncs automatically across every device you sign in on.</p>
      </section>
    )
  }

  // Logged out view
  return (
    <section className="card">
      <h2>☁️ Cloud sync</h2>
      <p className="muted sm">Sign in to back up your progress and sync it across devices (phone + laptop).</p>

      <div className="auth-tabs">
        <button className={`auth-tab ${mode === 'signin' ? 'active' : ''}`} onClick={() => setMode('signin')}>Sign in</button>
        <button className={`auth-tab ${mode === 'signup' ? 'active' : ''}`} onClick={() => setMode('signup')}>Create account</button>
      </div>

      <form className="auth-form" onSubmit={submit}>
        <input
          type="email" placeholder="you@example.com" value={email} required
          autoComplete="email" onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password" placeholder="Password (min 6 chars)" value={password} required
          minLength={6} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn full" type="submit" disabled={busy}>
          {busy ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Sign in'}
        </button>
      </form>

      {authError && <p className="auth-error">{authError}</p>}
      {info && <p className="auth-info">{info}</p>}
    </section>
  )
}
