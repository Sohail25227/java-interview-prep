// Safely merge two progress states (e.g. local + cloud) so nothing is lost
// when a user logs in from a new device for the first time.
//
// Strategy (union / non-destructive):
//   completed : union of both (anything done on either device stays done)
//   notes     : keep the longer / non-empty note per item
//   status    : keep the furthest-along DSA status per item
//   revisit   : union (flagged on either device stays flagged)
//   solvedAt  : earliest solve date per problem
//   revisions : union of revision dates per problem
//   snooze    : latest push-back wins
//   log       : per-day max activity count
//   checkIns  : union
//   settings  : shallow merge (incoming wins for overlapping keys)
//   meta      : keep the earliest createdAt
const STATUS_RANK = { not_attempted: 0, tried: 1, logic: 2, code: 3, done: 4 }

export function mergeStates(a = {}, b = {}) {
  const completed = { ...(a.completed || {}), ...(b.completed || {}) }

  const status = { ...(a.status || {}) }
  const bStatus = b.status || {}
  Object.keys(bStatus).forEach((id) => {
    const cur = STATUS_RANK[status[id]] ?? 0
    const inc = STATUS_RANK[bStatus[id]] ?? 0
    if (inc > cur) status[id] = bStatus[id]
  })
  // anything completed on either device outranks intermediate status noise
  Object.keys(completed).forEach((id) => { if (status[id]) delete status[id] })

  const revisit = { ...(a.revisit || {}), ...(b.revisit || {}) }

  const notes = { ...(a.notes || {}) }
  const bNotes = b.notes || {}
  Object.keys(bNotes).forEach((id) => {
    const existing = notes[id] || ''
    const incoming = bNotes[id] || ''
    notes[id] = incoming.length >= existing.length ? incoming : existing
  })

  const solvedAt = { ...(a.solvedAt || {}) }
  const bSolvedAt = b.solvedAt || {}
  Object.keys(bSolvedAt).forEach((id) => {
    const existing = solvedAt[id]
    solvedAt[id] = existing && existing < bSolvedAt[id] ? existing : bSolvedAt[id]
  })

  const revisions = { ...(a.revisions || {}) }
  const bRevisions = b.revisions || {}
  Object.keys(bRevisions).forEach((id) => {
    const union = new Set([...(revisions[id] || []), ...(bRevisions[id] || [])])
    revisions[id] = [...union].sort()
  })

  const revisionSnooze = { ...(a.revisionSnooze || {}) }
  const bSnooze = b.revisionSnooze || {}
  Object.keys(bSnooze).forEach((id) => {
    const existing = revisionSnooze[id]
    revisionSnooze[id] = existing && existing > bSnooze[id] ? existing : bSnooze[id]
  })

  const log = { ...(a.log || {}) }
  const bLog = b.log || {}
  Object.keys(bLog).forEach((d) => {
    log[d] = Math.max(log[d] || 0, bLog[d] || 0)
  })

  const checkIns = { ...(a.checkIns || {}), ...(b.checkIns || {}) }

  const settings = { ...(a.settings || {}), ...(b.settings || {}) }

  const aCreated = a.meta?.createdAt
  const bCreated = b.meta?.createdAt
  let createdAt = aCreated || bCreated
  if (aCreated && bCreated) createdAt = aCreated < bCreated ? aCreated : bCreated
  const meta = { ...(a.meta || {}), ...(b.meta || {}), createdAt }

  return { completed, notes, status, revisit, solvedAt, revisions, revisionSnooze, log, checkIns, settings, meta }
}
