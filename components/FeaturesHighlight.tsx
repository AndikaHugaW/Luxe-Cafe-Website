'use client'

import { motion } from 'framer-motion'
import { Coffee, Heart, Award } from 'lucide-react'

const features = [
  {
    icon: Coffee,
    title: 'Premium Coffee',
    description: 'Handcrafted with the finest beans from around the world'
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Every cup is crafted with passion and attention to detail'
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized for excellence in coffee and service quality'
  },
]

export default function FeaturesHighlight() {
  return (
    <motion.div
      className="absolute bottom-8 right-8 lg:right-12 z-20 max-w-sm"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
    >
      <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 drop-shadow-lg">
        Luxe Experience
      </h3>
      
      <div className="space-y-4">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={index}
              className="flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
            >
              <div className="mb-2">
                <Icon className="w-6 h-6 text-white drop-shadow-md" />
              </div>
              <h4 className="text-base font-bold text-white mb-1 drop-shadow-md">
                {feature.title}
              </h4>
              <p className="text-xs text-white/90 leading-relaxed drop-shadow-md">
                {feature.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

