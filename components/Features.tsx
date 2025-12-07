'use client'

import { motion } from 'framer-motion'
import { Coffee, Users, Clock } from 'lucide-react'

const features = [
  {
    icon: Coffee,
    title: 'Our Menu',
    description: 'Discover our handcrafted beverages and artisanal pastries'
  },
  {
    icon: Users,
    title: 'Our People',
    description: 'Meet the passionate team behind every cup'
  },
  {
    icon: Clock,
    title: 'Our History',
    description: 'Learn about our journey and culinary traditions'
  },
]

export default function Features() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-6">
                  <Icon 
                    className="w-16 h-16 text-dark-blue stroke-1" 
                    strokeWidth={1.5}
                    style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                  />
                </div>
                <h3 className="text-lg font-medium text-dark-blue mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-dark-blue/70">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

