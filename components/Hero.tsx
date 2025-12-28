'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import WorkingHours from './WorkingHours'
import FeaturesHighlight from './FeaturesHighlight'
import { ChevronDown, Coffee, Menu as MenuIcon } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  const scrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById('menu')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black lg:bg-cream">
      {/* Hero Image Background with Enhanced Overlay */}
      <div className="absolute inset-0">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1621593446047-4db277eef303?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
          }}
        >
          {/* Multi-layered overlay for better depth and text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70"></div>
        </motion.div>
      </div>

      {/* Main Content Overlay */}
      <motion.div
        className="relative z-10 text-center px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo Section */}
        <motion.div variants={itemVariants} className="relative w-[280px] h-[100px] sm:w-[500px] sm:h-[180px] md:w-[600px] md:h-[220px] lg:w-[800px] lg:h-[280px] mb-4">
          <Image
            src="/logo.svg"
            alt="Luxe Cafe Logo"
            fill
            className="object-contain filter brightness-0 invert" 
            priority
          />
        </motion.div>

        {/* Brand Story / Tagline */}
        <motion.p 
          variants={itemVariants}
          className="text-white/90 text-lg sm:text-xl md:text-2xl font-light tracking-wide max-w-2xl mb-12 drop-shadow-lg"
        >
          Specialty Coffee & Artisan Brews <br className="hidden sm:block" /> 
          <span className="text-primary font-medium">Crafted with precision, served with heart.</span>
        </motion.p>

      </motion.div>

      {/* Secondary Information Components */}
      <div className="hidden lg:block">
        <WorkingHours />
        <FeaturesHighlight />
      </div>

      {/* Micro-animations Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>
    </section>
  )
}
