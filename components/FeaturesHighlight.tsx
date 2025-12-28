'use client'

import { motion } from 'framer-motion'
import { Coffee, Heart, MapPin, Clock } from 'lucide-react'

const features = [
  {
    icon: Coffee,
    title: 'Premium Coffee'
  },
  {
    icon: Heart,
    title: 'Made with Love'
  },
  {
    icon: MapPin,
    title: 'Cozy Place'
  },
  {
    icon: Clock,
    title: '24 Hours Service'
  },
]

export default function FeaturesHighlight() {
  return (
    <motion.div
      className="absolute bottom-8 right-8 lg:right-12 z-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
    >
      {/* Grid Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Header - Spans 2 columns on first row */}
        <motion.div
          className="col-span-2 mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white mb-2">
            Experience
          </h3>
          <p className="text-sm text-white/90 leading-relaxed max-w-xs">
            Visit us during our operating hours for the best coffee experience. We're here to serve you with passion and quality.
          </p>
        </motion.div>

        {/* Feature Items */}
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={index}
              className="flex flex-col items-start gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
            >
              <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-sm font-medium text-white leading-tight">
                {feature.title}
              </h4>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

