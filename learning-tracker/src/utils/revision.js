// Spaced-repetition schedule for solved DSA problems.
//
// The moment a problem is marked done we remember the date (state.solvedAt).
// Round 1 comes due exactly `interval` days later (5 by default); each later
// round stretches further out so a problem you keep recalling stops nagging.
// After the last round the problem is "mastered" and leaves the queue.

import { addDays, diffDays } from './date.js'

export const DEFAULT_REVISION_INTERVAL = 5

export const ROUND_LABEL = ['1st revision', '2nd revision', 'Final revision']

// [base, base x3, base x6] -> 5, 15, 30 days with the default interval.
export function revisionIntervals(base = DEFAULT_REVISION_INTERVAL) {
  const b = Math.max(1, Math.round(Number(base) || DEFAULT_REVISION_INTERVAL))
  return [b, b * 3, b * 6]
}

export const TOTAL_ROUNDS = revisionIntervals().length

// Returns null for problems that were never solved (nothing to revise).
export function buildSchedule(id, state, base = DEFAULT_REVISION_INTERVAL) {
  const solved = state.solvedAt?.[id]
  if (!solved) return null

  const history = state.revisions?.[id] || []
  const round = history.length
  const intervals = revisionIntervals(base)

  if (round >= intervals.length) {
    return { solvedAt: solved, history, round, mastered: true, dueDate: null, lastDate: history[round - 1] }
  }

  const lastDate = history[round - 1] || solved
  const interval = intervals[round]
  const natural = addDays(lastDate, interval)
  const snoozed = state.revisionSnooze?.[id]
  // A snooze can only push a problem later, never pull it forward.
  const dueDate = snoozed && snoozed > natural ? snoozed : natural

  return { solvedAt: solved, history, round, mastered: false, lastDate, interval, dueDate, snoozed: !!(snoozed && snoozed > natural) }
}

export function dueLabel(dueDate, today) {
  const days = diffDays(today, dueDate)
  if (days === 0) return 'Due today'
  if (days === 1) return 'Due tomorrow'
  if (days > 1) return `Due in ${days} days`
  if (days === -1) return '1 day overdue'
  return `${Math.abs(days)} days overdue`
}
