import { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { phases, POINTS_PER_TOPIC } from '../data/curriculum.js'
import { dsaPhases, DIFFICULTY_POINTS, allDsaProblems, allDsaProblemIds, totalDsaProblems } from '../data/dsaMasterSheet.js'
import { weeks, POINTS_PER_PLAN_DAY, allPlanDayIds, months } from '../data/studyPlan.js'
import { achievements } from '../data/achievements.js'
import { computeStreaks } from '../utils/streak.js'
import { getLevel } from '../utils/gamification.js'
import { todayKey, addDays, diffDays } from '../utils/date.js'
import { buildSchedule, DEFAULT_REVISION_INTERVAL } from '../utils/revision.js'
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
  allDsaProblems.forEach((pr) => {
    idx[pr.id] = { points: DIFFICULTY_POINTS[pr.difficulty] || 20, type: 'dsa', difficulty: pr.difficulty }
  })
  weeks.forEach((w) =>
    w.days.forEach((d) => {
      idx[d.id] = { points: POINTS_PER_PLAN_DAY, type: 'plan', month: w.month, week: w.week }
    })
  )
  return idx
})()

const isDsa = (id) => ITEM_INDEX[id]?.type === 'dsa'

const DEFAULT_STATE = {
  completed: {},
  log: {},        // 'YYYY-MM-DD' -> activity count
  checkIns: {},   // 'YYYY-MM-DD' -> true (manual check-ins)
  notes: {},      // itemId -> saved code / notes string
  status: {},     // dsa problem id -> 'tried' | 'logic' | 'code' (intermediate states; 'done' lives in `completed`)
  revisit: {},    // dsa problem id -> true (flagged to revisit)
  solvedAt: {},   // dsa problem id -> 'YYYY-MM-DD' the day it was marked done
  revisions: {},  // dsa problem id -> ['YYYY-MM-DD', ...] completed revision rounds
  revisionSnooze: {}, // dsa problem id -> 'YYYY-MM-DD' pushed-back due date
  settings: { dailyGoal: 3, notifications: false, startDate: todayKey(), revisionInterval: DEFAULT_REVISION_INTERVAL },
  meta: { createdAt: new Date().toISOString() },
}

// Saves made before the revision feature have no solve dates. Seed the missing
// ones with today so old completions join the cycle instead of arriving as a
// wall of overdue problems. Idempotent — only ever fills gaps.
function seedSolveDates(s) {
  const solvedAt = { ...(s.solvedAt || {}) }
  const today = todayKey()
  let changed = false
  Object.keys(s.completed || {}).forEach((id) => {
    if (isDsa(id) && !solvedAt[id]) { solvedAt[id] = today; changed = true }
  })
  return changed ? { ...s, solvedAt } : s
}

function hydrate(parsed) {
  return seedSolveDates({
    ...DEFAULT_STATE,
    ...parsed,
    settings: { ...DEFAULT_STATE.settings, ...(parsed.settings || {}) },
    meta: { ...DEFAULT_STATE.meta, ...(parsed.meta || {}) },
  })
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    return hydrate(JSON.parse(raw))
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
        const merged = data?.data ? hydrate(mergeStates(stateRef.current, data.data)) : stateRef.current
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

  // Starts the revision clock for a DSA problem the day it is solved.
  function startRevisionClock(prev, id, today) {
    if (!isDsa(id)) return {}
    return { solvedAt: { ...prev.solvedAt, [id]: today } }
  }

  // Un-solving a problem drops it out of the revision cycle entirely.
  function stopRevisionClock(prev, id) {
    if (!isDsa(id)) return {}
    const solvedAt = { ...prev.solvedAt }
    const revisions = { ...prev.revisions }
    const revisionSnooze = { ...prev.revisionSnooze }
    delete solvedAt[id]
    delete revisions[id]
    delete revisionSnooze[id]
    return { solvedAt, revisions, revisionSnooze }
  }

  const toggle = useCallback((id) => {
    setState((prev) => {
      const today = todayKey()
      const wasDone = !!prev.completed[id]
      const completed = { ...prev.completed }
      const log = { ...prev.log }
      const status = { ...prev.status }
      let revision

      if (wasDone) {
        delete completed[id]
        delete status[id]
        log[today] = Math.max(0, (log[today] || 0) - 1)
        if (log[today] === 0) delete log[today]
        revision = stopRevisionClock(prev, id)
      } else {
        completed[id] = true
        delete status[id]
        log[today] = (log[today] || 0) + 1
        revision = startRevisionClock(prev, id, today)
      }
      return { ...prev, completed, log, status, ...revision }
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
      let revision = {}
      if (trimmed && !prev.completed[id]) {
        const today = todayKey()
        completed = { ...prev.completed, [id]: true }
        log = { ...prev.log, [today]: (prev.log[today] || 0) + 1 }
        revision = startRevisionClock(prev, id, today)
      }
      return { ...prev, notes, completed, log, ...revision }
    })
  }, [])

  const getNote = useCallback((id) => state.notes?.[id] || '', [state.notes])
  const hasNote = useCallback((id) => !!state.notes?.[id], [state.notes])

  // ---- DSA multi-state status (Not Attempted -> Tried -> Logic -> Code -> Done) ----
  // 'done' is stored in `completed` (source of truth for points/streaks);
  // intermediate states live in `state.status`.
  const getStatus = useCallback(
    (id) => (state.completed[id] ? 'done' : state.status?.[id] || 'not_attempted'),
    [state.completed, state.status]
  )

  const setStatus = useCallback((id, next) => {
    setState((prev) => {
      const today = todayKey()
      const status = { ...prev.status }
      if (!next || next === 'not_attempted' || next === 'done') delete status[id]
      else status[id] = next

      const wasDone = !!prev.completed[id]
      const willDone = next === 'done'
      let completed = prev.completed
      let log = prev.log
      let revision = {}
      if (willDone && !wasDone) {
        completed = { ...prev.completed, [id]: true }
        log = { ...prev.log, [today]: (prev.log[today] || 0) + 1 }
        revision = startRevisionClock(prev, id, today)
      } else if (!willDone && wasDone) {
        completed = { ...prev.completed }
        delete completed[id]
        log = { ...prev.log }
        log[today] = Math.max(0, (log[today] || 0) - 1)
        if (log[today] === 0) delete log[today]
        revision = stopRevisionClock(prev, id)
      }
      return { ...prev, status, completed, log, ...revision }
    })
  }, [])

  const isRevisit = useCallback((id) => !!state.revisit?.[id], [state.revisit])

  const toggleRevisit = useCallback((id) => {
    setState((prev) => {
      const revisit = { ...prev.revisit }
      if (revisit[id]) delete revisit[id]
      else revisit[id] = true
      return { ...prev, revisit }
    })
  }, [])

  // ---- spaced revision ----
  const markRevised = useCallback((id) => {
    setState((prev) => {
      const today = todayKey()
      const history = prev.revisions[id] || []
      if (history.includes(today)) return prev
      const revisionSnooze = { ...prev.revisionSnooze }
      delete revisionSnooze[id]
      return {
        ...prev,
        revisions: { ...prev.revisions, [id]: [...history, today] },
        revisionSnooze,
        log: { ...prev.log, [today]: (prev.log[today] || 0) + 1 },
      }
    })
  }, [])

  const undoRevision = useCallback((id) => {
    setState((prev) => {
      const history = prev.revisions[id] || []
      if (!history.length) return prev
      const today = todayKey()
      const last = history[history.length - 1]
      const revisions = { ...prev.revisions }
      const rest = history.slice(0, -1)
      if (rest.length) revisions[id] = rest
      else delete revisions[id]

      let log = prev.log
      if (last === today) {
        log = { ...prev.log }
        log[today] = Math.max(0, (log[today] || 0) - 1)
        if (log[today] === 0) delete log[today]
      }
      return { ...prev, revisions, log }
    })
  }, [])

  const snoozeRevision = useCallback((id, days = 1) => {
    setState((prev) => ({
      ...prev,
      revisionSnooze: { ...prev.revisionSnooze, [id]: addDays(todayKey(), days) },
    }))
  }, [])

  const updateSettings = useCallback((partial) => {
    setState((prev) => ({ ...prev, settings: { ...prev.settings, ...partial } }))
  }, [])

  const resetAll = useCallback(() => {
    setState({ ...DEFAULT_STATE, settings: { ...DEFAULT_STATE.settings, startDate: todayKey() }, meta: { createdAt: new Date().toISOString() } })
  }, [])

  const exportData = useCallback(() => JSON.stringify(state, null, 2), [state])

  const importData = useCallback((json) => {
    setState(hydrate(JSON.parse(json)))
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

    // DSA (full master sheet)
    const dsaDone = allDsaProblemIds.filter((id) => state.completed[id]).length
    const dsaTotal = totalDsaProblems

    const dsaStatusCounts = { not_attempted: 0, tried: 0, logic: 0, code: 0, done: 0 }
    const dsaDiff = { 1: { done: 0, total: 0 }, 2: { done: 0, total: 0 }, 3: { done: 0, total: 0 }, 4: { done: 0, total: 0 }, 5: { done: 0, total: 0 } }
    allDsaProblems.forEach((pr) => {
      const done = !!state.completed[pr.id]
      const st = done ? 'done' : state.status?.[pr.id] || 'not_attempted'
      dsaStatusCounts[st] = (dsaStatusCounts[st] || 0) + 1
      const d = pr.difficulty || 3
      dsaDiff[d].total++
      if (done) dsaDiff[d].done++
    })
    const dsaRevisitCount = allDsaProblems.filter((pr) => state.revisit?.[pr.id]).length

    const dsaPhaseProgress = {}
    dsaPhases.forEach((ph) => {
      const ids = ph.topics.flatMap((t) => t.subtopics.flatMap((s) => s.problems.map((pr) => pr.id)))
      const done = ids.filter((id) => state.completed[id]).length
      dsaPhaseProgress[ph.id] = { done, total: ids.length, pct: ids.length ? Math.round((done / ids.length) * 100) : 0 }
    })

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

    // ---- spaced revision queue ----
    const revisionInterval = state.settings.revisionInterval || DEFAULT_REVISION_INTERVAL
    const revisionDue = []
    const revisionUpcoming = []
    const revisionMastered = []
    let revisionsCompleted = 0
    let revisedToday = 0
    allDsaProblems.forEach((pr) => {
      const sch = buildSchedule(pr.id, state, revisionInterval)
      if (!sch) return
      revisionsCompleted += sch.round
      if (sch.history[sch.round - 1] === today) revisedToday++
      const entry = { ...pr, ...sch }
      if (sch.mastered) revisionMastered.push(entry)
      else if (sch.dueDate <= today) revisionDue.push({ ...entry, overdueDays: -diffDays(today, sch.dueDate) })
      else revisionUpcoming.push(entry)
    })
    // Most overdue first, then hardest — tackle the riskiest recall first.
    revisionDue.sort((a, b) => a.dueDate.localeCompare(b.dueDate) || b.difficulty - a.difficulty)
    revisionUpcoming.sort((a, b) => a.dueDate.localeCompare(b.dueDate) || a.sr - b.sr)
    const revisionOverdueCount = revisionDue.filter((r) => r.overdueDays > 0).length

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
      dsaDone, dsaTotal, dsaStatusCounts, dsaDiff, dsaRevisitCount, dsaPhaseProgress,
      revisionInterval,
      revisionDue, revisionUpcoming, revisionMastered,
      revisionDueCount: revisionDue.length,
      revisionOverdueCount,
      revisionUpcomingCount: revisionUpcoming.length,
      revisionMasteredCount: revisionMastered.length,
      revisionScheduled: revisionDue.length + revisionUpcoming.length + revisionMastered.length,
      revisionDueIds: new Set(revisionDue.map((r) => r.id)),
      revisionsCompleted,
      revisedToday,
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
    getStatus, setStatus, isRevisit, toggleRevisit,
    markRevised, undoRevision, snoozeRevision,
    updateSettings, resetAll, exportData, importData,
    // cloud
    cloudEnabled, session, user: session?.user || null, syncStatus, authError,
    signUp, signIn, signInWithGoogle, signOut,
  }), [state, stats, isDone, toggle, checkInToday, saveNote, getNote, hasNote, getStatus, setStatus, isRevisit, toggleRevisit, markRevised, undoRevision, snoozeRevision, updateSettings, resetAll, exportData, importData, session, syncStatus, authError, signUp, signIn, signInWithGoogle, signOut])

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider')
  return ctx
}
