import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface PinnedLocation {
  lat: number
  lng: number
  label: string
}

export interface UserProfile {
  name: string
  email: string
  phone: string
  address: string
  city: string
  plan: string
  pinnedLocation: PinnedLocation | null
}

interface AuthContextType {
  user: UserProfile | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
  updateProfile: (data: Partial<UserProfile>) => void
  updatePinnedLocation: (loc: PinnedLocation) => void
}

const defaultProfile: UserProfile = {
  name: 'Juan Dela Cruz',
  email: 'juan@profibernetwork.com',
  phone: '+63 912 345 6789',
  address: '123 Sample Street',
  city: 'Metro Manila',
  plan: 'Family Fiber',
  pinnedLocation: null,
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)

  const login = useCallback((email: string, password: string) => {
    if (email && password) {
      setUser({ ...defaultProfile, email })
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev))
  }, [])

  const updatePinnedLocation = useCallback((loc: PinnedLocation) => {
    setUser((prev) => (prev ? { ...prev, pinnedLocation: loc } : prev))
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateProfile, updatePinnedLocation }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
