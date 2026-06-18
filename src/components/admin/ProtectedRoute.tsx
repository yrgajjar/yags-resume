import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { LoadingScreen } from '../ui/LoadingScreen'

/** Gates admin routes: redirects to /admin/login unless a Firebase user is present. */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading, configured } = useAuth()

  // Without Firebase there is no auth at all — send to login (which explains setup).
  if (!configured) return <Navigate to="/admin/login" replace />
  if (loading) return <LoadingScreen label="Checking session…" />
  if (!user) return <Navigate to="/admin/login" replace />

  return <>{children}</>
}
