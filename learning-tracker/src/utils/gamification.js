// Level thresholds (cumulative points needed to REACH each level).
export const LEVELS = [
  { level: 1, name: 'Beginner', min: 0 },
  { level: 2, name: 'Apprentice', min: 150 },
  { level: 3, name: 'Practitioner', min: 400 },
  { level: 4, name: 'Developer', min: 800 },
  { level: 5, name: 'Senior', min: 1400 },
  { level: 6, name: 'Expert', min: 2200 },
  { level: 7, name: 'Architect', min: 3200 },
  { level: 8, name: 'Interview Ready', min: 4500 },
]

export function getLevel(points) {
  let current = LEVELS[0]
  for (const l of LEVELS) {
    if (points >= l.min) current = l
  }
  const next = LEVELS.find((l) => l.min > points) || null
  const span = next ? next.min - current.min : 1
  const into = points - current.min
  const progress = next ? Math.min(100, Math.round((into / span) * 100)) : 100
  return {
    ...current,
    next,
    progress,
    pointsToNext: next ? next.min - points : 0,
  }
}
