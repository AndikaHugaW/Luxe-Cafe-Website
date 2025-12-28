'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutDetail() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left Side - Large Image */}
          <motion.div
            className="relative h-[600px] lg:h-full rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1621593446047-4db277eef303?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
              }}
            />
          </motion.div>

          {/* Right Side - Content */}
          <div className="space-y-8 lg:space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-sm uppercase tracking-wider text-dark-blue/70 font-semibold mb-3">
                ABOUT US
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-dark-blue mb-6 lg:mb-8 leading-tight">
                Experience The Perfect<br />Blend Of Coffee & Vibes
              </h2>
              <p className="text-lg lg:text-xl text-dark-blue/80 leading-relaxed">
                LUXE CAFE aims to create a flexible co-working environment that provides solutions 
                to a wide variety of working professionals. The best place to do business with 
                the best coffee of course! LUXE CAFE is located directly in the heart of the city, 
                offering a perfect blend of premium coffee, cozy atmosphere, and professional workspace.
              </p>
            </motion.div>

            {/* Two Small Images */}
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              <motion.div
                className="relative h-48 lg:h-64 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div 
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1000&auto=format&fit=crop)'
                  }}
                />
              </motion.div>
              <motion.div
                className="relative h-48 lg:h-64 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div 
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop)'
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

