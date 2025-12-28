"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Coffee, 
  Users, 
  ShoppingBag, 
  Settings, 
  LogOut,
  Bell,
  Search
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Menu Management', href: '/admin/menu', icon: Coffee },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Don't show the layout wrap/auth check for login and register pages
  const isAuthPage = pathname === '/admin/login' || pathname === '/admin/register'
  if (isAuthPage) return <>{children}</>

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <Link href="/">
            <h1 className="text-2xl font-black text-primary tracking-tighter">LUXE CAFE</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Admin Panel</p>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-primary'
                }`}
              >
                <item.icon className="size-5" />
                <span className="font-semibold text-sm">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-all font-semibold text-sm"
          >
            <LogOut className="size-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search analytics, orders..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-primary transition-colors">
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-dark-blue">{user?.name || user?.email?.split('@')[0] || 'Guest Admin'}</p>
                <p className="text-[10px] text-primary font-black uppercase">{user?.role || 'No Role'}</p>
              </div>
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden border-2 border-primary/20">
                {user?.image ? (
                  <img src={user.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  (user?.name?.[0] || user?.email?.[0] || 'A').toUpperCase()
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {(!user || user.role !== 'admin') ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="size-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <Users className="size-10" />
              </div>
              <h2 className="text-2xl font-black text-dark-blue mb-2">Access Restricted</h2>
              <p className="text-gray-500 font-medium max-w-md mb-8">
                {!user 
                  ? "Sesi Anda telah berakhir atau Anda belum login. Silakan login untuk melanjutkan ke dashboard." 
                  : `Akun Anda (${user.email}) terdeteksi memiliki akses '${user.role}'. Perlu akses 'admin' untuk melihat halaman ini.`}
              </p>
              <div className="flex gap-4">
                <Link href="/admin/login" className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                  Admin Login
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="px-8 py-3 bg-gray-100 text-gray-500 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Logout & Start Over
                </button>
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      </main>
    </div>
  )
}
