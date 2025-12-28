"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid admin credentials. Please try again.')
        setLoading(false)
      } else {
        router.push('/admin')
      }
    } catch (err) {
      setError('An unexpected error occurred.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] size-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] size-[400px] bg-blue-600/10 rounded-full blur-[100px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-[450px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-10 rounded-[32px] shadow-2xl"
      >
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="size-16 bg-gradient-to-tr from-primary to-orange-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20 mb-6 group transition-transform hover:scale-110">
            <ShieldCheck className="text-white size-8" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2 uppercase">Luxe Admin</h1>
          <p className="text-gray-500 font-medium">Elevated cafe management system</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-bold text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-2 mb-2 block">Control Access Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-600 group-focus-within:text-primary transition-colors" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all font-medium"
                placeholder="administrator@luxecafe.id"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary">Secure Password</label>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-600 group-focus-within:text-primary transition-colors" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all font-medium"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary/20 active:scale-95 group"
          >
            {loading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <>
                Initiate Terminal
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/[0.05] flex flex-col items-center gap-4">
          <p className="text-gray-600 text-xs font-bold">New system operator?</p>
          <Link 
            href="/admin/register" 
            className="text-white hover:text-primary transition-colors font-bold text-sm underline underline-offset-4 decoration-primary/30"
          >
            Request Access Credentials
          </Link>
        </div>
      </motion.div>

      {/* Footer Footer Footer */}
      <div className="absolute bottom-8 text-[10px] text-gray-700 font-bold uppercase tracking-[0.2em]">
        &copy; 2025 LUXE CAFE &bull; CORE MANAGEMENT v2.4.0
      </div>
    </div>
  )
}
