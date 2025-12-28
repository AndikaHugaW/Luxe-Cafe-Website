'use client'

import React, { useId, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from 'next-auth/react'
import { Eye, EyeOff } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialView: 'login' | 'signup'
}

export default function AuthModal({ isOpen, onClose, initialView }: AuthModalProps) {
  const [view, setView] = useState<'login' | 'signup'>(initialView)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const id = useId()

  // Update view when initialView changes and modal re-opens
  React.useEffect(() => {
    setView(initialView)
    setError(null)
    setSuccess(null)
  }, [initialView, isOpen])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (view === 'login') {
        // Login with NextAuth
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })

        if (result?.error) {
          setError('Invalid email or password')
        } else if (result?.ok) {
          setSuccess('Login successful!')
          setTimeout(() => {
            onClose()
            // Refresh to update session
            window.location.reload()
          }, 1000)
        }
      } else {
        // Signup
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email, 
            password, 
            name: fullName 
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.error || 'Signup failed')
        } else {
          // Save email for login
          const signupEmail = email
          const signupPassword = password
          
          setSuccess('✅ Account created successfully! Switching to login...')
          
          // Switch to login view after successful signup
          setTimeout(() => {
            setView('login')
            setEmail(signupEmail) // Pre-fill email
            setPassword(signupPassword) // Pre-fill password for convenience
            setFullName('') // Clear name
            setSuccess('Now you can login with your credentials')
            setError(null)
          }, 2000)
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-10 bg-white border-primary/10 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center gap-3 mb-8">
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/5"
            aria-hidden="true"
          >
            <span className="text-primary font-bold text-xl">L</span>
          </div>
          <DialogHeader className="text-center sm:text-center flex flex-col items-center">
            <DialogTitle className="text-2xl font-bold text-dark-blue">
              {view === 'login' ? 'Welcome Back' : 'Create Account'}
            </DialogTitle>
            <DialogDescription className="text-sm text-dark-blue/60 mt-1">
              {view === 'login' 
                ? 'Log in to your LUXE account' 
                : 'Join our LUXE membership program'
              }
            </DialogDescription>
          </DialogHeader>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <form className="space-y-5" onSubmit={handleAuth}>
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-3 text-sm text-green-600 bg-green-50 rounded-lg border border-green-200">
                  {success}
                </div>
              )}
              <div className="space-y-4">
                {view === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor={`${id}-name`}>Full Name</Label>
                    <Input 
                      id={`${id}-name`} 
                      placeholder="Matt Welsh" 
                      type="text" 
                      required 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="border-dark-blue/20 focus-visible:ring-primary/20 focus-visible:border-primary" 
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor={`${id}-email`}>Email</Label>
                  <Input 
                    id={`${id}-email`} 
                    placeholder="your@email.com" 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-dark-blue/20 focus-visible:ring-primary/20 focus-visible:border-primary" 
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor={`${id}-password`}>Password</Label>
                    {view === 'login' && (
                      <a href="#" className="text-xs text-primary hover:underline">Forgot?</a>
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      id={`${id}-password`}
                      placeholder={view === 'login' ? "Enter your password" : "Create a password"}
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-dark-blue/20 focus-visible:ring-primary/20 focus-visible:border-primary h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white h-12 text-base font-semibold transition-all shadow-lg active:scale-95"
              >
                {loading ? 'Processing...' : (view === 'login' ? 'Log In' : 'Sign Up')}
              </Button>
            </form>
          </motion.div>
        </AnimatePresence>

        <div className="my-8 flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Or continue with</span>
        </div>

        <Button 
          type="button"
          variant="outline"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          disabled={loading}
          className="w-full h-12 border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 transition-all flex items-center justify-center gap-3 text-base font-medium text-gray-700 shadow-sm hover:shadow-md group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
            </g>
          </svg>
          <span className="font-semibold">Continue with Google</span>
        </Button>

        <p className="mt-6 text-center text-sm text-dark-blue/60">
          {view === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setView(view === 'login' ? 'signup' : 'login')}
            className="text-primary font-semibold hover:underline"
          >
            {view === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </p>

        {view === 'signup' && (
          <p className="mt-4 text-center text-[10px] text-dark-blue/40 px-4 leading-relaxed">
            By signing up, you agree to our{" "}
            <a className="underline hover:text-primary transition-colors" href="#">Terms</a>
            {" "}and{" "}
            <a className="underline hover:text-primary transition-colors" href="#">Privacy Policy</a>.
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}
