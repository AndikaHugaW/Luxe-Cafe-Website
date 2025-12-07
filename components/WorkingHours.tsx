'use client'

import { motion } from 'framer-motion'

export default function WorkingHours() {
  const hours = [
    { day: 'MON - FRI', time: '09:00 - 22:00' },
    { day: 'SAT', time: '09:00 - 17:00' },
    { day: 'SUN', time: 'CLOSED' },
  ]

  return (
    <motion.div
      className="absolute bottom-8 left-8 lg:left-12 z-20 max-w-sm"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 drop-shadow-lg">
        WORKING HOURS
      </h3>
      
      <p className="text-sm text-white/90 mb-6 leading-relaxed drop-shadow-md">
        Visit us during our operating hours for the best coffee experience. 
        We're here to serve you with passion and quality.
      </p>

      <div className="space-y-3">
        {hours.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between pb-3 border-b border-white/30 last:border-0"
          >
            <span className="text-base lg:text-lg font-semibold text-white drop-shadow-md">
              {item.day}
            </span>
            <span className="text-base lg:text-lg font-semibold text-white drop-shadow-md">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

