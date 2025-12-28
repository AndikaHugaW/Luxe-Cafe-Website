'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Bell, Package, Heart, Gift, CheckCircle } from 'lucide-react'

export default function NotificationsPage() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push('/')
    return null
  }

  const notifications = [
    {
      icon: Package,
      title: 'Order Delivered',
      message: 'Your order #1234 has been delivered successfully',
      time: '2 hours ago',
      read: false,
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Heart,
      title: 'Item Back in Stock',
      message: 'Caramel Macchiato is now available',
      time: '5 hours ago',
      read: false,
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Gift,
      title: 'New Reward Available',
      message: 'You earned 50 points! Redeem now',
      time: '1 day ago',
      read: true,
      color: 'bg-amber-100 text-amber-600'
    },
    {
      icon: Package,
      title: 'Order Confirmed',
      message: 'Your order #1233 is being prepared',
      time: '2 days ago',
      read: true,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: CheckCircle,
      title: 'Payment Successful',
      message: 'Payment of Rp 85,000 received',
      time: '2 days ago',
      read: true,
      color: 'bg-green-100 text-green-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-dark-blue mb-2">Notifications</h1>
              <p className="text-gray-500">Stay updated with your latest activities</p>
            </div>
            <button className="px-4 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors">
              Mark all as read
            </button>
          </div>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-all cursor-pointer ${
                !notification.read ? 'border-l-4 border-primary' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${notification.color}`}>
                  <notification.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-dark-blue">{notification.title}</h3>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State (if no notifications) */}
        {notifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-12 text-center"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-dark-blue mb-2">No notifications yet</h3>
            <p className="text-gray-500">We'll notify you when something new arrives</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
