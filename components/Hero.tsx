'use client'

import { motion } from 'framer-motion'
import WorkingHours from './WorkingHours'
import FeaturesHighlight from './FeaturesHighlight'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream">
      {/* Hero Image Background */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1621593446047-4db277eef303?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-gray-900/40 to-gray-900/60"></div>
        </div>
      </div>

      {/* Overlay Text */}
      <motion.div
        className="relative z-10 text-center px-6 lg:px-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6 tracking-tight">
          LUXE
        </h1>
        <p className="text-xl sm:text-2xl text-white/90 font-light">
          Where Coffee Meets Vibes
        </p>
      </motion.div>

      {/* Working Hours - Bottom Left */}
      <WorkingHours />

      {/* Features Highlight - Top Right */}
      <FeaturesHighlight />
    </section>
  )
}

