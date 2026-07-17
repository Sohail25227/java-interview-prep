// Safely merge two progress states (e.g. local + cloud) so nothing is lost
// when a user logs in from a new device for the first time.
//
// Strategy (union / non-destructive):
//   completed : union of both (anything done on either device stays done)
//   notes     : keep the longer / non-empty note per item
//   log       : per-day max activity count
//   checkIns  : union
//   settings  : shallow merge (incoming wins for overlapping keys)
//   meta      : keep the earliest createdAt
export function mergeStates(a = {}, b = {}) {
  const completed = { ...(a.completed || {}), ...(b.completed || {}) }

  const notes = { ...(a.notes || {}) }
  const bNotes = b.notes || {}
  Object.keys(bNotes).forEach((id) => {
    const existing = notes[id] || ''
    const incoming = bNotes[id] || ''
    notes[id] = incoming.length >= existing.length ? incoming : existing
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

  return { completed, notes, log, checkIns, settings, meta }
}
