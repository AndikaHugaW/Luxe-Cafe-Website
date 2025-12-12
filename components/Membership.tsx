'use client'

import { motion } from 'framer-motion'
import { Coffee, Users, Sparkles, Check, ArrowRight } from 'lucide-react'

const memberships = [
  {
    id: 1,
    name: 'Luxe Member',
    icon: Coffee,
    gradient: 'from-amber-50 to-orange-50',
    iconBg: 'bg-gradient-to-br from-amber-400 to-orange-500',
    description: 'Perfect for avid coffee lovers. Enjoy exclusive discounts and special perks every time you visit.',
    price: '75.000',
    period: 'Per Month',
    buttonText: 'Become Member',
    features: [
      '10% off all drinks',
      'Priority seating',
      'Free birthday drink',
      'Monthly newsletter',
      'Special member events'
    ],
    popular: false
  },
  {
    id: 2,
    name: 'Bronze Member',
    icon: Users,
    gradient: 'from-blue-50 to-indigo-50',
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    description: 'Ideal for professionals needing a reliable workspace. Get access to premium amenities and services.',
    price: '150.000',
    period: 'Per Month',
    buttonText: 'Become Member',
    features: [
      '1 hour office time/week',
      '150 printed pages/month',
      '10% off all drinks',
      'WiFi priority access',
      'Meeting room access'
    ],
    popular: true
  },
]

export default function Membership() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-cream relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-dark-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-dark-blue/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-blue/5 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-dark-blue/60" />
            <p className="text-sm uppercase tracking-wider text-dark-blue/70 font-semibold">
              LUXE MEMBERSHIPS
            </p>
          </motion.div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-dark-blue mb-6 leading-tight">
            Better way to do business
          </h2>
          <p className="text-lg lg:text-xl text-dark-blue/70 max-w-3xl mx-auto leading-relaxed">
            Choose a membership plan that fits your lifestyle. Unlock exclusive benefits, discounts, and premium experiences at LUXE CAFE.
          </p>
        </motion.div>

        {/* Membership Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-12 items-stretch">
          {memberships.map((membership, index) => {
            const Icon = membership.icon
            return (
              <motion.div
                key={membership.id}
                className={`group relative bg-white rounded-3xl p-10 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 flex flex-col ${
                  membership.popular 
                    ? 'border-dark-blue/20' 
                    : 'border-transparent hover:border-dark-blue/10'
                } overflow-hidden h-full`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
              >
                {/* Decorative Gradient Background */}
                <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${membership.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Popular Badge */}
                {membership.popular && (
                  <div className="absolute top-6 right-6 z-20">
                    <span className="px-4 py-1.5 bg-dark-blue text-white text-xs font-bold uppercase tracking-wide rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="relative z-10 flex flex-col flex-1">
                  {/* Header with Icon */}
                  <div className="flex items-start justify-between mb-8">
                    <div className={`w-16 h-16 rounded-2xl ${membership.iconBg} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex-shrink-0`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    {membership.popular && (
                      <div className="text-right">
                        <div className="text-xs text-dark-blue/60 font-medium uppercase tracking-wider mb-1">
                          Best Value
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="mb-8">
                    <h3 className="text-3xl lg:text-4xl font-bold text-dark-blue mb-4 group-hover:text-dark-blue transition-colors">
                      {membership.name}
                    </h3>
                    <p className="text-dark-blue/70 leading-relaxed text-base lg:text-lg">
                      {membership.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mb-10 space-y-4 flex-1">
                    {membership.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 + idx * 0.05 }}
                      >
                        <div className={`w-5 h-5 rounded-full ${membership.iconBg} flex items-center justify-center flex-shrink-0`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-dark-blue/80 text-sm lg:text-base">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Price & Button */}
                  <div className="pt-8 border-t border-dark-blue/10 mt-auto">
                    <div className="flex items-baseline justify-between mb-8">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl text-dark-blue/60 font-medium">Rp</span>
                          <span className="text-5xl lg:text-6xl font-bold text-dark-blue">
                            {membership.price}
                          </span>
                        </div>
                        <p className="text-sm text-dark-blue/60 mt-2 font-medium">
                          {membership.period}
                        </p>
                      </div>
                    </div>
                    
                    <motion.button
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
                        membership.popular
                          ? 'bg-dark-blue text-white hover:bg-dark-blue/90 shadow-lg hover:shadow-xl'
                          : 'bg-dark-blue/10 text-dark-blue hover:bg-dark-blue hover:text-white'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {membership.buttonText}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>

                {/* Decorative Corner Element */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-dark-blue/5 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            )
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-dark-blue/60 text-sm lg:text-base">
            All memberships include free WiFi and access to our loyalty program.{' '}
            <span className="text-dark-blue font-medium underline cursor-pointer hover:text-dark-blue/80 transition-colors">
              View full terms and conditions
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
