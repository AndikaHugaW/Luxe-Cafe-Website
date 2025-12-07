'use client'

import { motion } from 'framer-motion'

export default function Newsletter() {
  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div 
          className="bg-cover bg-center bg-no-repeat rounded-3xl p-8 lg:p-12 overflow-hidden relative"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1470&auto=format&fit=crop)'
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-dark-blue/80 rounded-3xl"></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-6 leading-tight">
                Want updates? Join our LUXE newsletter today.
              </h2>
              
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 px-6 py-4 rounded-lg bg-white text-dark-blue placeholder-dark-blue/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  required
                />
                <motion.button
                  type="submit"
                  className="px-8 py-4 bg-white text-dark-blue rounded-lg font-semibold hover:bg-white/90 transition-all whitespace-nowrap"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

