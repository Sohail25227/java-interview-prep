import { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { phases, POINTS_PER_TOPIC } from '../data/curriculum.js'
import { dsaPatterns, DIFFICULTY_POINTS, allDsaProblemIds, blind75Count } from '../data/dsaSheet.js'
import { weeks, POINTS_PER_PLAN_DAY, allPlanDayIds, months } from '../data/studyPlan.js'
import { achievements } from '../data/achievements.js'
import { computeStreaks } from '../utils/streak.js'
import { getLevel } from '../utils/gamification.js'
import { todayKey } from '../utils/date.js'
import { supabase, cloudEnabled, PROGRESS_TABLE } from '../lib/supabase.js'
import { mergeStates } from '../utils/mergeState.js'

const STORAGE_KEY = 'java-switch-tracker-v1'

// ---- Build a one-time index: itemId -> { points, type, phaseId } ----
const ITEM_INDEX = (() => {
  const idx = {}
  phases.forEach((ph) =>
    ph.sections.forEach((s) =>
      s.items.forEach((it) => {
        idx[it.id] = { points: POINTS_PER_TOPIC, type: 'topic', phaseId: ph.id }
      })
    )
  )
  dsaPatterns.forEach((g) =>
    g.problems.forEach((pr) => {
      idx[pr.id] = { points: DIFFICULTY_POINTS[pr.difficulty], type: 'dsa', star: pr.star }
    })
  )
  weeks.forEach((w) =>
    w.days.forEach((d) => {
      idx[d.id] = { points: POINTS_PER_PLAN_DAY, type: 'plan', month: w.month, week: w.week }
    })
  )
  return idx
})()

const DEFAULT_STATE = {
  completed: {},
  log: {},        // 'YYYY-MM-DD' -> activity count
  checkIns: {},   // 'YYYY-MM-DD' -> true (manual check-ins)
  notes: {},      // itemId -> saved code / notes string
  settings: { dailyGoal: 3, notifications: false, startDate: todayKey() },
  meta: { createdAt: new Date().toISOString() },
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    const parsed = JSON.parse(raw)
    return {
      ...DEFAULT_STATE,
      ...parsed,
      settings: { ...DEFAULT_STATE.settings, ...(parsed.settings || {}) },
      meta: { ...DEFAULT_STATE.meta, ...(parsed.meta || {}) },
    }
  } catch {
    return DEFAULT_STATE
  }
}

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [state, setState] = useState(loadState)

  // ---- keep a live ref of state for async sync callbacks ----
  const stateRef = useRef(state)
  useEffect(() => { stateRef.current = state }, [state])

  // persist to localStorage (offline + fast, always on)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  // ---------------- cloud auth + sync ----------------
  const [session, setSession] = useState(null)
  const [syncStatus, setSyncStatus] = useState(cloudEnabled ? 'idle' : 'offline') // idle|syncing|synced|error|offline
  const [authError, setAuthError] = useState('')

  const pushTimer = useRef(null)
  const syncStartedRef = useRef(null)   // userId whose initial sync has begun
  const initialSyncedRef = useRef(null) // userId whose initial sync completed

  const pushToCloud = useCallback(async (userId, data) => {
    if (!cloudEnabled || !userId) return
    const { error } = await supabase
      .from(PROGRESS_TABLE)
      .upsert({ user_id: userId, data, updated_at: new Date().toISOString() })
    if (error) { setSyncStatus('error'); return { error } }
    return {}
  }, [])

  // subscribe to auth state
  useEffect(() => {
    if (!cloudEnabled) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  // initial sync on login: merge remote + local, push merged up
  useEffect(() => {
    if (!cloudEnabled) return
    const userId = session?.user?.id
    if (!userId) { syncStartedRef.current = null; initialSyncedRef.current = null; return }
    if (syncStartedRef.current === userId) return
    syncStartedRef.current = userId
    ;(async () => {
      setSyncStatus('syncing')
      try {
        const { data, error } = await supabase
          .from(PROGRESS_TABLE)
          .select('data')
          .eq('user_id', userId)
          .maybeSingle()
        if (error) throw error
        const merged = data?.data ? mergeStates(stateRef.current, data.data) : stateRef.current
        setState(merged)
        await pushToCloud(userId, merged)
        initialSyncedRef.current = userId
        setSyncStatus('synced')
      } catch {
        setSyncStatus('error')
      }
    })()
  }, [session, pushToCloud])

  // debounced push whenever state changes (only after initial sync)
  useEffect(() => {
    if (!cloudEnabled) return
    const userId = session?.user?.id
    if (!userId || initialSyncedRef.current !== userId) return
    if (pushTimer.current) clearTimeout(pushTimer.current)
    pushTimer.current = setTimeout(async () => {
      setSyncStatus('syncing')
      const res = await pushToCloud(userId, stateRef.current)
      if (!res?.error) setSyncStatus('synced')
    }, 1200)
    return () => { if (pushTimer.current) clearTimeout(pushTimer.current) }
  }, [state, session, pushToCloud])

  // ---- auth actions ----
  const signUp = useCallback(async (email, password) => {
    setAuthError('')
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) { setAuthError(error.message); return { error } }
    return { data }
  }, [])

  const signIn = useCallback(async (email, password) => {
    setAuthError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setAuthError(error.message); return { error } }
    return {}
  }, [])

  const signInWithGoogle = useCallback(async () => {
    setAuthError('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
    if (error) setAuthError(error.message)
  }, [])

  const signOut = useCallback(async () => {
    if (pushTimer.current) clearTimeout(pushTimer.current)
    const userId = session?.user?.id
    if (userId) await pushToCloud(userId, stateRef.current) // flush pending
    await supabase.auth.signOut()
    initialSyncedRef.current = null
    syncStartedRef.current = null
    setSyncStatus('idle')
  }, [session, pushToCloud])

  const isDone = useCallback((id) => !!state.completed[id], [state.completed])

  const toggle = useCallback((id) => {
    setState((prev) => {
      const today = todayKey()
      const wasDone = !!prev.completed[id]
      const completed = { ...prev.completed }
      const log = { ...prev.log }

      if (wasDone) {
        delete completed[id]
        log[today] = Math.max(0, (log[today] || 0) - 1)
        if (log[today] === 0) delete log[today]
      } else {
        completed[id] = true
        log[today] = (log[today] || 0) + 1
      }
      return { ...prev, completed, log }
    })
  }, [])

  const checkInToday = useCallback(() => {
    setState((prev) => {
      const today = todayKey()
      return { ...prev, checkIns: { ...prev.checkIns, [today]: true } }
    })
  }, [])

  // Save code/notes for an item. Adding non-empty code auto-marks it done.
  const saveNote = useCallback((id, code) => {
    setState((prev) => {
      const notes = { ...prev.notes }
      const trimmed = (code || '').trim()
      if (trimmed) notes[id] = code
      else delete notes[id]

      let completed = prev.completed
      let log = prev.log
      if (trimmed && !prev.completed[id]) {
        const today = todayKey()
        completed = { ...prev.completed, [id]: true }
        log = { ...prev.log, [today]: (prev.log[today] || 0) + 1 }
      }
      return { ...prev, notes, completed, log }
    })
  }, [])

  const getNote = useCallback((id) => state.notes?.[id] || '', [state.notes])
  const hasNote = useCallback((id) => !!state.notes?.[id], [state.notes])

  const updateSettings = useCallback((partial) => {
    setState((prev) => ({ ...prev, settings: { ...prev.settings, ...partial } }))
  }, [])

  const resetAll = useCallback(() => {
    setState({ ...DEFAULT_STATE, settings: { ...DEFAULT_STATE.settings, startDate: todayKey() }, meta: { createdAt: new Date().toISOString() } })
  }, [])

  const exportData = useCallback(() => JSON.stringify(state, null, 2), [state])

  const importData = useCallback((json) => {
    const parsed = JSON.parse(json)
    setState({
      ...DEFAULT_STATE,
      ...parsed,
      settings: { ...DEFAULT_STATE.settings, ...(parsed.settings || {}) },
    })
  }, [])

  // ---------------- derived stats ----------------
  const stats = useMemo(() => {
    const completedIds = Object.keys(state.completed)
    const totalCompleted = completedIds.length

    let points = 0
    completedIds.forEach((id) => {
      points += ITEM_INDEX[id]?.points || 0
    })

    // active dates = days with logged activity + manual check-ins
    const logDays = Object.keys(state.log).filter((d) => state.log[d] > 0)
    const activeDates = [...new Set([...logDays, ...Object.keys(state.checkIns)])]
    const { current, longest, lastActive } = computeStreaks(activeDates)

    // streak bonus points (rewards consistency)
    const streakBonus = longest * 5
    points += streakBonus

    // DSA
    const dsaDone = allDsaProblemIds.filter((id) => state.completed[id]).length
    const dsaTotal = allDsaProblemIds.length
    let blind75Done = 0
    dsaPatterns.forEach((g) => g.problems.forEach((pr) => { if (pr.star && state.completed[pr.id]) blind75Done++ }))

    // per-phase progress
    const phaseProgress = {}
    const phaseDone = {}
    phases.forEach((ph) => {
      const ids = ph.sections.flatMap((s) => s.items.map((i) => i.id))
      const done = ids.filter((id) => state.completed[id]).length
      phaseProgress[ph.id] = { done, total: ids.length, pct: ids.length ? Math.round((done / ids.length) * 100) : 0 }
      phaseDone[ph.id] = ids.length > 0 && done === ids.length
    })

    // plan progress
    const planDaysDone = allPlanDayIds.filter((id) => state.completed[id]).length
    const monthDone = {}
    months.forEach((m) => {
      const ids = weeks.filter((w) => w.month === m.month).flatMap((w) => w.days.map((d) => d.id))
      monthDone[m.month] = ids.every((id) => state.completed[id])
    })
    const planDone = allPlanDayIds.every((id) => state.completed[id])

    const today = todayKey()
    const todayCount = state.log[today] || 0
    const notesCount = Object.keys(state.notes || {}).length

    const levelInfo = getLevel(points)

    const baseStats = {
      totalCompleted,
      points,
      streakBonus,
      currentStreak: current,
      longestStreak: longest,
      lastActive,
      activeDates,
      studiedToday: activeDates.includes(today),
      todayCount,
      dailyGoal: state.settings.dailyGoal,
      dailyGoalMet: todayCount >= state.settings.dailyGoal,
      dsaDone, dsaTotal, blind75Done, blind75Total: blind75Count,
      notesCount,
      phaseProgress, phaseDone,
      planDaysDone, planTotal: allPlanDayIds.length, monthDone, planDone,
      level: levelInfo,
    }

    const earned = achievements.filter((a) => {
      try { return a.check(baseStats) } catch { return false }
    })
    baseStats.earnedAchievements = earned
    baseStats.earnedIds = new Set(earned.map((a) => a.id))

    return baseStats
  }, [state])

  const value = useMemo(() => ({
    state, stats, isDone, toggle, checkInToday,
    saveNote, getNote, hasNote,
    updateSettings, resetAll, exportData, importData,
    // cloud
    cloudEnabled, session, user: session?.user || null, syncStatus, authError,
    signUp, signIn, signInWithGoogle, signOut,
  }), [state, stats, isDone, toggle, checkInToday, saveNote, getNote, hasNote, updateSettings, resetAll, exportData, importData, session, syncStatus, authError, signUp, signIn, signInWithGoogle, signOut])

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider')
  return ctx
}
