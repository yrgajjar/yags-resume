import { createContext } from 'react'
import type { User } from 'firebase/auth'

export interface AuthContextValue {
  user: User | null
  /** True while the initial auth state is resolving. */
  loading: boolean
  /** True when Firebase env vars are present (admin features available). */
  configured: boolean
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  configured: false,
})
