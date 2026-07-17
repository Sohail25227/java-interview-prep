// All date helpers work in LOCAL time and use 'YYYY-MM-DD' string keys.

export function toKey(date) {
  const d = new Date(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function todayKey() {
  return toKey(new Date())
}

export function fromKey(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(key, n) {
  const d = fromKey(key)
  d.setDate(d.getDate() + n)
  return toKey(d)
}

export function diffDays(a, b) {
  // whole days from a -> b
  const ms = fromKey(b).getTime() - fromKey(a).getTime()
  return Math.round(ms / 86400000)
}

export function prettyDate(key) {
  return fromKey(key).toLocaleDateString(undefined, {
    weekday: 'short', month: 'short', day: 'numeric',
  })
}

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']
const WEEKDAY_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

export function monthLabel(year, monthIndex) {
  return `${MONTH_NAMES[monthIndex]} ${year}`
}

export { WEEKDAY_SHORT }
