import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import StudyPlan from './pages/StudyPlan.jsx'
import DSASheet from './pages/DSASheet.jsx'
import TopicSheet from './pages/TopicSheet.jsx'
import Achievements from './pages/Achievements.jsx'
import Settings from './pages/Settings.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/plan" element={<StudyPlan />} />
        <Route path="/dsa" element={<DSASheet />} />
        <Route path="/topics/:phaseId" element={<TopicSheet />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
