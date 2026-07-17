export default function StatCard({ emoji, value, label, accent, sub }) {
  return (
    <div className="stat-card">
      <div className="stat-emoji" style={accent ? { background: `${accent}22`, color: accent } : undefined}>{emoji}</div>
      <div className="stat-body">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {sub && <div className="stat-sub">{sub}</div>}
      </div>
    </div>
  )
}
