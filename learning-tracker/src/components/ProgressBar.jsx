export default function ProgressBar({ pct = 0, color = '#6366f1', height = 8 }) {
  return (
    <div className="pbar" style={{ height }}>
      <div className="pbar-fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  )
}
