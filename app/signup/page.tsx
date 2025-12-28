'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Newsletter from '@/components/Newsletter'
import { useId } from "react"
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const id = useId()
  const router = useRouter()
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-6 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[400px] bg-white rounded-2xl shadow-xl border border-primary/10 p-8"
        >
          <div className="flex flex-col items-center gap-2 mb-8">
            <div
              className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/5"
              aria-hidden="true"
            >
              <span className="text-primary font-bold text-xl">L</span>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-dark-blue">Create Account</h1>
              <p className="text-sm text-dark-blue/60">
                Join our LUXE membership program
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-xl text-green-600 text-xs font-bold text-center">
              Account created! Redirecting to login...
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${id}-name`}>Full Name</Label>
                <Input 
                  id={`${id}-name`} 
                  placeholder="Matt Welsh" 
                  type="text" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-dark-blue/20 focus-visible:ring-primary/20 focus-visible:border-primary" 
                />
              </div>
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
              <div className="space-y-2">
                <Label htmlFor={`${id}-password`}>Password</Label>
                <Input
                  id={`${id}-password`}
                  placeholder="Create a password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-dark-blue/20 focus-visible:ring-primary/20 focus-visible:border-primary"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={loading || success}
              className="w-full bg-primary hover:bg-primary-dark text-white h-11 text-base font-semibold transition-all"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Or continue with</span>
          </div>

          <Button variant="outline" className="w-full h-11 border-dark-blue/20 text-dark-blue hover:bg-dark-blue/5 transition-all flex items-center justify-center gap-2">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>

          <p className="mt-8 text-center text-sm text-dark-blue/60">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Log in
            </Link>
          </p>

          <p className="mt-6 text-center text-[10px] text-dark-blue/40 px-4">
            By signing up, you agree to our{" "}
            <a className="underline hover:text-primary transition-colors" href="#">Terms of Service</a>
            {" "}and{" "}
            <a className="underline hover:text-primary transition-colors" href="#">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>

      <Newsletter />
    </main>
  )
}
