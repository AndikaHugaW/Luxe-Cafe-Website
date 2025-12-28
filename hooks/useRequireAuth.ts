import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

/**
 * Hook to protect routes that require authentication
 * Redirects to home page if user is not logged in
 */
export function useRequireAuth() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  return { user, isLoading: !user }
}
