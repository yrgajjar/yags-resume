import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useResumeStore } from './store/resumeStore'
import { useApplyTheme } from './hooks/useApplyTheme'
import { PublicResume } from './pages/PublicResume'
import { ProtectedRoute } from './components/admin/ProtectedRoute'
import { Toaster } from './components/ui/Toaster'
import { LoadingScreen } from './components/ui/LoadingScreen'

// Admin bundle (TipTap, editors, drag-and-drop) is code-split so the public
// resume loads a much smaller initial bundle.
const AdminLogin = lazy(() =>
  import('./pages/AdminLogin').then((m) => ({ default: m.AdminLogin })),
)
const AdminDashboard = lazy(() =>
  import('./pages/AdminDashboard').then((m) => ({ default: m.AdminDashboard })),
)

export default function App() {
  const load = useResumeStore((s) => s.load)
  const theme = useResumeStore((s) => s.settings.theme)

  useEffect(() => {
    void load()
  }, [load])

  useApplyTheme(theme)

  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<PublicResume />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Toaster />
    </>
  )
}
