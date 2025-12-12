'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ]

  const handleNavClick = (e: React.MouseEvent, item: { href: string }) => {
    e.preventDefault()
    // Jika link ke halaman yang sama, tidak perlu navigasi
    if (pathname === item.href) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    // Navigasi ke halaman lain
    window.location.href = item.href
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <motion.div
              className="text-xl font-semibold text-dark-blue tracking-tight cursor-pointer"
              whileHover={{ opacity: 0.8 }}
            >
              LUXE
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`text-sm font-medium transition-all relative ${
                    isActive 
                      ? 'text-dark-blue border-b-2 border-dark-blue pb-1' 
                      : 'text-dark-blue/70 hover:text-dark-blue'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-200/50"
            >
              <div className="py-4 space-y-2">
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
                          ? 'text-dark-blue bg-dark-blue/5 border-l-4 border-dark-blue'
                          : 'text-dark-blue/70 hover:text-dark-blue hover:bg-dark-blue/5'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

