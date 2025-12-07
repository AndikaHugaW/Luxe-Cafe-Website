'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const isMenuPage = pathname === '/menu'

  const navItems = [
    { name: 'Our People', href: '/#about', pageHref: '/#about' },
    { name: 'Our Menu', href: '/menu', pageHref: '/#menu' },
    { name: 'Private Events', href: '/#contact', pageHref: '/#contact' },
  ]

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleNavClick = (item: { href: string; pageHref: string }) => {
    if (isMenuPage && item.href === '/menu') {
      // Jika sudah di halaman menu, scroll ke atas
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (item.href.startsWith('/#')) {
      // Jika link dengan hash, scroll ke section
      if (pathname === '/') {
        scrollToSection(item.href.replace('/', ''))
      } else {
        // Jika di halaman lain, redirect ke home dengan hash
        window.location.href = item.href
      }
    }
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

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className="text-sm font-medium text-dark-blue hover:opacity-70 transition-opacity"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

