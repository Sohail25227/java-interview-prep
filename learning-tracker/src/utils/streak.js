import { todayKey, addDays, diffDays } from './date.js'

// activeDates: array of 'YYYY-MM-DD' strings (days with any logged activity).
export function computeStreaks(activeDates) {
  if (!activeDates || activeDates.length === 0) {
    return { current: 0, longest: 0, lastActive: null }
  }
  const sorted = [...new Set(activeDates)].sort()
  const lastActive = sorted[sorted.length - 1]

  // longest run of consecutive days
  let longest = 1
  let run = 1
  for (let i = 1; i < sorted.length; i++) {
    if (diffDays(sorted[i - 1], sorted[i]) === 1) {
      run += 1
    } else {
      run = 1
    }
    longest = Math.max(longest, run)
  }

  // current streak: must include today or yesterday to still be "alive"
  const today = todayKey()
  const yesterday = addDays(today, -1)
  let current = 0
  if (lastActive === today || lastActive === yesterday) {
    current = 1
    let cursor = lastActive
    const set = new Set(sorted)
    while (set.has(addDays(cursor, -1))) {
      current += 1
      cursor = addDays(cursor, -1)
    }
  }

  return { current, longest, lastActive }
}

// Returns a reminder descriptor based on activity vs today.
export function getReminder(activeDates) {
  const today = todayKey()
  const { current, lastActive } = computeStreaks(activeDates)
  const studiedToday = activeDates.includes(today)

  if (!lastActive) {
    return { tone: 'start', title: 'Start your streak today!', message: 'Complete one item to put your first day on the board.' }
  }
  if (studiedToday) {
    return { tone: 'good', title: `You\u2019ve studied today \u2713`, message: current > 1 ? `${current}-day streak going strong. Keep it alive tomorrow.` : 'Day 1 logged. Come back tomorrow to build the streak.' }
  }
  const gap = diffDays(lastActive, today)
  if (gap === 1) {
    return { tone: 'warn', title: `Don\u2019t break your ${current}-day streak!`, message: 'You studied yesterday. Complete one item today to keep the streak alive.' }
  }
  return { tone: 'missed', title: `You missed ${gap - 1} day${gap - 1 > 1 ? 's' : ''}`, message: 'Your streak reset, but momentum is one click away. Restart it right now.' }
}
