'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, LogOut, ShoppingCart, Heart } from 'lucide-react'
import AuthModal from './AuthModal'
import { useAuth } from '@/context/AuthContext'
import { UserDropdown } from './ui/user-dropdown'
import { NotificationDropdown } from './ui/notification-dropdown'
import { CartDropdown } from './ui/cart-dropdown'
import { WishlistDropdown } from './ui/wishlist-dropdown'
import Image from 'next/image'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()
  // ... rest of component logic
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [authModal, setAuthModal] = React.useState<{ isOpen: boolean, view: 'login' | 'signup' }>({
    isOpen: false,
    view: 'login'
  })

  // Handle scroll for glassmorphism
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ]

  const isHomeTop = pathname === '/' && !isScrolled

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

  const handleProfileAction = (action: string) => {
    const routes: Record<string, string> = {
      'profile': '/profile',
      'settings': '/settings',
      'notifications': '/notifications',
      'orders': '/orders',
      'favorites': '/favorites',
      'rewards': '/rewards',
      'help': '/help',
      'terms': '/terms'
    }

    if (routes[action]) {
      router.push(routes[action])
    }
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm py-0' 
          : 'bg-transparent py-2'
      }`}>
        <div className="max-w-full mx-auto px-8 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between h-20">
            {/* Logo Container */}
            <div className="flex-1 flex items-center">
              <Link href="/">
                <motion.div
                  className="relative h-12 w-40 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image
                    src="/logo-nav.svg"
                    alt="Luxe Cafe Logo"
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </motion.div>
              </Link>
            </div>

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
                        : isHomeTop
                          ? 'text-white/80 hover:text-white'
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
              <div className="hidden md:flex items-center gap-6">
                {user ? (
                  <>
                    {/* Notification Dropdown */}
                    <NotificationDropdown isLight={isHomeTop} />

                    {/* Wishlist Dropdown */}
                    <WishlistDropdown isLight={isHomeTop} />

                    {/* Cart Dropdown */}
                    <CartDropdown isLight={isHomeTop} />

                    {/* User Dropdown */}
                    <UserDropdown onAction={handleProfileAction} isLight={isHomeTop} />
                  </>
                ) : (
                  <>
                    <motion.button
                      onClick={() => openAuth('login')}
                      className={`px-5 py-2.5 text-sm font-medium transition-colors ${
                        pathname === '/' && !isScrolled
                          ? 'text-white/90 hover:text-white'
                          : 'text-dark-blue hover:text-primary'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Log In
                    </motion.button>
                    <motion.button
                      onClick={() => openAuth('signup')}
                      className="px-6 py-2.5 text-sm font-bold bg-primary text-white rounded-full hover:bg-white hover:text-primary border-2 border-primary transition-all shadow-lg hover:shadow-primary/20"
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign Up
                    </motion.button>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className={`md:hidden p-2 transition-colors ${
                  isHomeTop ? 'text-white' : 'text-dark-blue'
                }`}
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
