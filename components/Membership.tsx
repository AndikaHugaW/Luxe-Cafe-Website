'use client'

import { motion } from 'framer-motion'
import { Coffee, Users } from 'lucide-react'

const memberships = [
  {
    id: 1,
    name: 'Luxe Member',
    icon: Coffee,
    description: 'Are you an avid coffee drinker? Receive 10% off drinks and products at LUXE CAFE with our standard membership. We made this membership to put money back in your pocket! Save money, drink coffee. What\'s not to love?',
    price: 'Rp 75.000',
    period: 'Per Month',
    buttonText: 'Become Member'
  },
  {
    id: 2,
    name: 'Bronze Member',
    icon: Users,
    description: 'If you need a reliable co-working space for meetings, creativity or your weekly Zoom call this membership is for you. Bronze Members get 1 hour per week of office time & up to 150 printed pages per month.',
    price: 'Rp 150.000',
    period: 'Per Month',
    buttonText: 'Become Member'
  },
]

export default function Membership() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm uppercase tracking-wider text-dark-blue/70 font-semibold mb-4">
            LUXE MEMBERSHIPS
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-blue mb-4 leading-tight">
            Better way to do business.
          </h2>
          <p className="text-lg text-dark-blue/80 max-w-2xl mx-auto">
            LUXE CAFE offers a variety of memberships to accommodate a wide variety of working professionals.
          </p>
        </motion.div>

        {/* Membership Cards */}
        <div className="space-y-6 mb-8">
          {memberships.map((membership, index) => {
            const Icon = membership.icon
            return (
              <motion.div
                key={membership.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  {/* Logo/Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full border-2 border-dark-blue flex items-center justify-center">
                      <Icon className="w-10 h-10 text-dark-blue" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-dark-blue mb-3">
                      {membership.name}
                    </h3>
                    <p className="text-dark-blue/70 leading-relaxed mb-4">
                      {membership.description}
                    </p>
                  </div>

                  {/* Price & Button */}
                  <div className="flex flex-col items-end gap-4 lg:min-w-[200px]">
                    <div className="text-right">
                      <div className="text-4xl font-bold text-dark-blue mb-1">
                        {membership.price}
                      </div>
                      <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                        {membership.period}
                      </span>
                    </div>
                    <motion.button
                      className="px-8 py-3 bg-dark-blue text-white rounded-lg font-semibold hover:bg-dark-blue/90 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {membership.buttonText}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* View More Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            className="px-8 py-3 bg-dark-blue text-white rounded-lg font-semibold hover:bg-dark-blue/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View More
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

