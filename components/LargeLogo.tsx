'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function LargeLogo() {
  return (
    <section className="py-32 px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto flex justify-center">
        <motion.div
          className="relative h-48 w-full max-w-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/logo.svg"
            alt="Luxe Cafe Large Logo"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}

