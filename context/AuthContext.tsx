'use client'

import React, { createContext, useContext } from 'react'
import { SessionProvider, useSession, signOut as nextAuthSignOut } from 'next-auth/react'

interface User {
  id: string
  email: string
  name?: string | null
  image?: string | null
  role?: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  signOut: () => {},
})

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  
  const user = session?.user ? {
    id: (session.user as any).id || '',
    email: session.user.email || '',
    name: session.user.name,
    image: session.user.image,
    role: (session.user as any).role || 'user',
  } : null

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading: status === 'loading',
      signOut: () => nextAuthSignOut()
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </SessionProvider>
  )
}

export const useAuth = () => useContext(AuthContext)
