'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Gift, Star, Trophy, Zap } from 'lucide-react'

export default function RewardsPage() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push('/')
    return null
  }

  const rewards = [
    {
      icon: Gift,
      title: 'Free Drink',
      points: 500,
      description: 'Get any drink for free',
      available: true
    },
    {
      icon: Star,
      title: '20% Off',
      points: 300,
      description: 'Discount on your next order',
      available: true
    },
    {
      icon: Zap,
      title: 'Free Dessert',
      points: 400,
      description: 'Any dessert of your choice',
      available: true
    },
    {
      icon: Trophy,
      title: 'VIP Access',
      points: 1000,
      description: 'Exclusive menu items',
      available: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Points Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 mb-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 mb-2">Your Points</p>
              <h1 className="text-5xl font-bold">1,250</h1>
              <p className="text-white/80 mt-2">Keep earning to unlock more rewards!</p>
            </div>
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <Trophy className="w-12 h-12" />
            </div>
          </div>
        </motion.div>

        {/* Rewards Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-dark-blue mb-6">Available Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rewards.map((reward, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-sm p-6 ${
                  reward.available ? 'hover:shadow-lg cursor-pointer' : 'opacity-60'
                } transition-all`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-xl ${
                    reward.available ? 'bg-primary/10' : 'bg-gray-100'
                  }`}>
                    <reward.icon className={`w-8 h-8 ${
                      reward.available ? 'text-primary' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-dark-blue mb-1">{reward.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{reward.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-primary font-bold">{reward.points} points</p>
                      {reward.available ? (
                        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-semibold">
                          Redeem
                        </button>
                      ) : (
                        <span className="text-sm text-gray-400">Locked</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How to Earn */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-xl font-bold text-dark-blue mb-4">How to Earn Points</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <p className="text-gray-700">Earn <span className="font-bold text-primary">10 points</span> for every Rp 10,000 spent</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <p className="text-gray-700">Get <span className="font-bold text-primary">50 bonus points</span> on your birthday</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <p className="text-gray-700">Refer a friend and earn <span className="font-bold text-primary">100 points</span></p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
