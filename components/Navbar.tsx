'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, User as UserIcon, LogOut } from 'lucide-react'
import AuthModal from './AuthModal'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [userMenuOpen, setUserMenuOpen] = React.useState(false)
  const [authModal, setAuthModal] = React.useState<{ isOpen: boolean, view: 'login' | 'signup' }>({
    isOpen: false,
    view: 'login'
  })

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ]

  const handleNavClick = (e: React.MouseEvent, item: { name: string; href: string }) => {
    // For home page sections, use smooth scroll
    if (pathname === '/' && item.href.startsWith('/#')) {
      e.preventDefault()
      const sectionId = item.href.replace('/#', '')
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const openAuth = (view: 'login' | 'signup') => {
    setAuthModal({ isOpen: true, view })
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200/50 shadow-sm">
        <div className="max-w-full mx-auto px-8 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between h-20">
            {/* Logo Container */}
            <div className="flex-1 flex items-center">
              <Link href="/">
                <motion.div
                  className="text-xl font-semibold text-dark-blue tracking-tight cursor-pointer"
                  whileHover={{ opacity: 0.8 }}
                >
                  LUXE
                </motion.div>
              </Link>
            </div>

            {/* Desktop Menu - Centered */}
            <div className="hidden md:flex items-center justify-center gap-8 flex-[2]">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`text-sm font-medium transition-all relative ${
                      isActive 
                        ? 'text-primary border-b-2 border-primary pb-1' 
                        : 'text-black/50 hover:text-primary'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>

            {/* Auth Buttons & Mobile Button Container */}
            <div className="flex-1 flex items-center justify-end gap-4">
              {/* Desktop Auth */}
              <div className="hidden md:flex items-center gap-4">
                {user ? (
                  <div className="relative">
                    <motion.button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-dark-blue/10 hover:bg-dark-blue/5 transition-all"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-dark-blue max-w-[100px] truncate">
                        {user.user_metadata.full_name || user.email}
                      </span>
                    </motion.button>

                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden"
                        >
                          <button
                            onClick={() => {
                              signOut()
                              setUserMenuOpen(false)
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Log Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    <motion.button
                      onClick={() => openAuth('login')}
                      className="px-5 py-2.5 text-sm font-medium text-dark-blue hover:text-primary transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Log In
                    </motion.button>
                    <motion.button
                      onClick={() => openAuth('signup')}
                      className="px-5 py-2.5 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-white hover:text-primary border-2 border-primary transition-all shadow-md"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign Up
                    </motion.button>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-dark-blue"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100"
            >
              <div className="py-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        handleNavClick(e, item)
                        setMobileMenuOpen(false)
                      }}
                      className={`block px-4 py-2 text-sm font-medium transition-all ${
                        isActive
                          ? 'text-primary bg-primary/5 border-l-4 border-primary'
                          : 'text-black/50 hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                })}
                
                {/* Auth Buttons - Mobile */}
                <div className="mt-4 px-4 pt-4 border-t border-gray-100 space-y-3">
                  {user ? (
                    <button 
                      onClick={() => {
                        signOut()
                        setMobileMenuOpen(false)
                      }}
                      className="w-full px-4 py-3 text-sm font-semibold text-red-500 bg-red-50 rounded-lg transition-all flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => openAuth('login')}
                        className="w-full px-4 py-3 text-sm font-medium text-dark-blue border border-dark-blue/20 rounded-lg hover:bg-dark-blue/5 transition-all text-left"
                      >
                        Log In
                      </button>
                      <button 
                        onClick={() => openAuth('signup')}
                        className="w-full px-4 py-3 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary-dark transition-all"
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AuthModal 
        isOpen={authModal.isOpen} 
        onClose={() => setAuthModal(prev => ({ ...prev, isOpen: false }))} 
        initialView={authModal.view} 
      />
    </>
  )
}
