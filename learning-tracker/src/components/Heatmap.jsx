import { todayKey, addDays, fromKey, prettyDate } from '../utils/date.js'

// GitHub-style activity heatmap for the last ~18 weeks.
export default function Heatmap({ log = {}, checkIns = {} }) {
  const weeksBack = 18
  const today = todayKey()
  // align end to the end of current week (Saturday)
  const todayDow = fromKey(today).getDay() // 0=Sun
  const end = addDays(today, 6 - todayDow)
  const totalDays = weeksBack * 7
  const start = addDays(end, -(totalDays - 1))

  const cells = []
  for (let i = 0; i < totalDays; i++) {
    const key = addDays(start, i)
    const count = (log[key] || 0) + (checkIns[key] ? 1 : 0)
    const future = key > today
    cells.push({ key, count, future })
  }

  // build columns of 7 (each column = a week, top=Sun)
  const columns = []
  for (let c = 0; c < weeksBack; c++) {
    columns.push(cells.slice(c * 7, c * 7 + 7))
  }

  const level = (n) => (n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n <= 4 ? 3 : 4)

  return (
    <div className="heatmap">
      <div className="heatmap-grid">
        {columns.map((col, ci) => (
          <div key={ci} className="hm-col">
            {col.map((cell) => (
              <div
                key={cell.key}
                className={`hm-cell ${cell.future ? 'future' : `lvl-${level(cell.count)}`}`}
                title={cell.future ? '' : `${prettyDate(cell.key)} — ${cell.count} item${cell.count !== 1 ? 's' : ''}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="heatmap-legend">
        <span>Less</span>
        <i className="hm-cell lvl-0" /><i className="hm-cell lvl-1" /><i className="hm-cell lvl-2" /><i className="hm-cell lvl-3" /><i className="hm-cell lvl-4" />
        <span>More</span>
      </div>
    </div>
  )
}
