'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen relative flex items-center justify-center p-8 lg:p-12">
      {/* Full Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1621593446047-4db277eef303?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
        }}
      >
        <div className="absolute inset-0 backdrop-blur-sm bg-gray-900/20"></div>
      </div>
      
      {/* Card Overlay - Right Side */}
      <div className="relative z-20 w-full max-w-2xl lg:ml-auto h-full flex items-center">
        <motion.div
          className="bg-white/20 backdrop-blur-md rounded-2xl lg:rounded-3xl p-10 lg:p-16 shadow-2xl border border-white/30 h-[85vh] max-h-[800px] w-full flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
            Get in touch with us
          </h2>

          <form className="space-y-6 flex-1 flex flex-col">
            {/* First Name & Last Name - Side by Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-4 rounded-lg bg-white text-dark-blue placeholder-primary/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-4 rounded-lg bg-white text-dark-blue placeholder-primary/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                placeholder="Phone"
                className="w-full px-4 py-4 rounded-lg bg-white text-dark-blue placeholder-primary/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                required
              />
            </div>

            {/* Email & Button - Side by Side */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-4 rounded-lg bg-white text-dark-blue placeholder-primary/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="px-6 lg:px-8 py-4 bg-primary text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all group whitespace-nowrap"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {/* Message */}
            <div className="flex-1">
              <textarea
                placeholder="Message"
                rows={6}
                className="w-full h-full min-h-[150px] px-4 py-4 rounded-lg bg-white text-dark-blue placeholder-primary/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all resize-none"
                required
              />
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
