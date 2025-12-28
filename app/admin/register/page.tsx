"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Lock, Mail, User, ArrowRight, Loader2, ShieldPlus } from 'lucide-react'
import Link from 'next/link'

export default function AdminRegister() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          role: 'admin' // Force role to admin for this specific page
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to register admin account')
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/admin/login')
      }, 2000)

    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] right-[-10%] size-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] size-[400px] bg-blue-600/10 rounded-full blur-[100px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-[450px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-10 rounded-[32px] shadow-2xl"
      >
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="size-16 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/20 mb-6 group transition-transform hover:scale-110">
            <ShieldPlus className="text-white size-8" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2 uppercase">Core Access</h1>
          <p className="text-gray-500 font-medium">Register as system administrator</p>
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

        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-500 text-sm font-bold text-center"
          >
            Admin registration successful! Redirecting...
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-2 mb-2 block">Operator Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-600 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all font-medium"
                placeholder="Full operational name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-2 mb-2 block">System Email</label>
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
            <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-2 mb-2 block">Create Access Code</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-600 group-focus-within:text-primary transition-colors" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all font-medium"
                placeholder="Min. 6 alphanumeric"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || success}
            className="w-full bg-white text-black hover:bg-gray-100 disabled:bg-gray-800 disabled:text-gray-500 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-white/5 active:scale-95 group"
          >
            {loading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <>
                Confirm Operator Credentials
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/[0.05] flex flex-col items-center gap-4">
          <p className="text-gray-600 text-xs font-bold">Already an operator?</p>
          <Link 
            href="/admin/login" 
            className="text-white hover:text-primary transition-colors font-bold text-sm underline underline-offset-4 decoration-primary/30"
          >
            Access Core Terminal
          </Link>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-8 text-[10px] text-gray-700 font-bold uppercase tracking-[0.2em]">
        SECURITY PROTOCOL: CAFE-ADMIN-2.4
      </div>
    </div>
  )
}
