// Badge definitions. Each badge has a `check(stats)` predicate.
// `stats` is produced by ProgressContext (see deriveStats).

export const achievements = [
  { id: 'first-step', emoji: '👶', title: 'First Step', desc: 'Complete your very first item', check: (s) => s.totalCompleted >= 1 },
  { id: 'getting-going', emoji: '🌱', title: 'Getting Going', desc: 'Complete 10 items', check: (s) => s.totalCompleted >= 10 },
  { id: 'committed', emoji: '💪', title: 'Committed', desc: 'Complete 50 items', check: (s) => s.totalCompleted >= 50 },
  { id: 'centurion', emoji: '🏆', title: 'Centurion', desc: 'Complete 100 items', check: (s) => s.totalCompleted >= 100 },
  { id: 'unstoppable', emoji: '🔥', title: 'Unstoppable', desc: 'Complete 200 items', check: (s) => s.totalCompleted >= 200 },

  { id: 'streak-3', emoji: '⚡', title: 'On a Roll', desc: '3-day streak', check: (s) => s.longestStreak >= 3 },
  { id: 'streak-7', emoji: '🔥', title: 'Week Warrior', desc: '7-day streak', check: (s) => s.longestStreak >= 7 },
  { id: 'streak-14', emoji: '🚀', title: 'Fortnight Force', desc: '14-day streak', check: (s) => s.longestStreak >= 14 },
  { id: 'streak-30', emoji: '👑', title: 'Iron Discipline', desc: '30-day streak', check: (s) => s.longestStreak >= 30 },
  { id: 'streak-60', emoji: '💎', title: 'Diamond Habit', desc: '60-day streak', check: (s) => s.longestStreak >= 60 },

  { id: 'dsa-10', emoji: '🧮', title: 'Problem Solver', desc: 'Solve 10 DSA problems', check: (s) => s.dsaDone >= 10 },
  { id: 'dsa-50', emoji: '🎯', title: 'Pattern Hunter', desc: 'Solve 50 DSA problems', check: (s) => s.dsaDone >= 50 },
  { id: 'dsa-100', emoji: '🥇', title: 'Century of Code', desc: 'Solve 100 DSA problems', check: (s) => s.dsaDone >= 100 },
  { id: 'dsa-250', emoji: '🏅', title: 'Halfway Hero', desc: 'Solve 250 DSA problems', check: (s) => s.dsaDone >= 250 },
  { id: 'dsa-hard', emoji: '🐉', title: 'Boss Slayer', desc: 'Solve 25 five-star problems', check: (s) => s.dsaDiff?.[5]?.done >= 25 },
  { id: 'dsa-all', emoji: '🧠', title: 'DSA Complete', desc: 'Solve every problem on the sheet', check: (s) => s.dsaDone >= s.dsaTotal },

  { id: 'revision-first', emoji: '🔁', title: 'Second Look', desc: 'Complete your first scheduled revision', check: (s) => s.revisionsCompleted >= 1 },
  { id: 'revision-25', emoji: '🔂', title: 'Repetition Pays', desc: 'Complete 25 revisions', check: (s) => s.revisionsCompleted >= 25 },
  { id: 'revision-100', emoji: '🧲', title: 'Memory Muscle', desc: 'Complete 100 revisions', check: (s) => s.revisionsCompleted >= 100 },
  { id: 'revision-locked-25', emoji: '🧊', title: 'Locked In', desc: 'Take 25 problems through every revision round', check: (s) => s.revisionMasteredCount >= 25 },
  { id: 'revision-clear', emoji: '🧹', title: 'Queue Zero', desc: 'Empty a revision queue of 10+ problems', check: (s) => s.revisionScheduled >= 10 && s.revisionDueCount === 0 },

  { id: 'core-java-done', emoji: '☕', title: 'Java Core Master', desc: 'Finish the Core Java sheet', check: (s) => s.phaseDone['core-java'] },
  { id: 'spring-done', emoji: '🍃', title: 'Spring Master', desc: 'Finish the Spring sheet', check: (s) => s.phaseDone['spring'] },
  { id: 'project-done', emoji: '🚀', title: 'Shipped It', desc: 'Finish the resume project checklist', check: (s) => s.phaseDone['project'] },
  { id: 'sd-done', emoji: '📐', title: 'System Designer', desc: 'Finish the System Design sheet', check: (s) => s.phaseDone['system-design'] },

  { id: 'points-500', emoji: '⭐', title: '500 Club', desc: 'Earn 500 points', check: (s) => s.points >= 500 },
  { id: 'points-2000', emoji: '🌟', title: '2K Club', desc: 'Earn 2000 points', check: (s) => s.points >= 2000 },
  { id: 'plan-month1', emoji: '📅', title: 'Month 1 Done', desc: 'Complete all Month-1 plan days', check: (s) => s.monthDone[1] },
  { id: 'plan-all', emoji: '🎓', title: 'Plan Finisher', desc: 'Complete the full 12-week plan', check: (s) => s.planDone },
]
