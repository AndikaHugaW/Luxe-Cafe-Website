'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react'

export default function OrdersPage() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push('/')
    return null
  }

  const orders = [
    {
      id: '#1234',
      date: 'Dec 28, 2024',
      items: ['Cappuccino', 'Croissant'],
      total: 60000,
      status: 'delivered',
      statusText: 'Delivered'
    },
    {
      id: '#1233',
      date: 'Dec 26, 2024',
      items: ['Espresso', 'Tiramisu'],
      total: 63000,
      status: 'processing',
      statusText: 'Processing'
    },
    {
      id: '#1232',
      date: 'Dec 25, 2024',
      items: ['Caffe Latte', 'Chocolate Chip Cookies'],
      total: 58000,
      status: 'delivered',
      statusText: 'Delivered'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'processing':
        return <Clock className="w-5 h-5 text-amber-600" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Package className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700'
      case 'processing':
        return 'bg-amber-100 text-amber-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-dark-blue mb-2">My Orders</h1>
          <p className="text-gray-500">Track and manage your orders</p>
        </motion.div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-dark-blue">{order.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.statusText}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                {getStatusIcon(order.status)}
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-gray-700">• {item}</p>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <p className="font-semibold text-dark-blue">
                  Total: Rp {order.total.toLocaleString('id-ID')}
                </p>
                <button className="text-primary hover:underline text-sm font-medium">
                  View Details →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
