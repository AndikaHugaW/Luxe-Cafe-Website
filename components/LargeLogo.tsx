'use client'

import { motion } from 'framer-motion'

export default function LargeLogo() {
  return (
    <section className="py-32 px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          className="text-8xl sm:text-9xl md:text-[12rem] font-bold text-dark-blue tracking-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          LUXE
        </motion.h1>
      </div>
    </section>
  )
}

