'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import Image from 'next/image'

export default function FavoritesPage() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push('/')
    return null
  }

  const favorites = [
    {
      id: 1,
      name: 'Cappuccino',
      description: 'Classic Italian coffee with steamed milk foam',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400'
    },
    {
      id: 2,
      name: 'Tiramisu',
      description: 'Classic Italian coffee-flavored dessert',
      price: 38000,
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400'
    },
    {
      id: 3,
      name: 'Caffe Latte',
      description: 'Smooth espresso with steamed milk',
      price: 38000,
      image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-dark-blue mb-2">My Favorites</h1>
          <p className="text-gray-500">Your saved items ({favorites.length})</p>
        </motion.div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </button>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-dark-blue mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-primary">
                    Rp {item.price.toLocaleString('id-ID')}
                  </p>
                  <button className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {favorites.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-12 text-center"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-dark-blue mb-2">No favorites yet</h3>
            <p className="text-gray-500 mb-6">Start adding items you love!</p>
            <button 
              onClick={() => router.push('/menu')}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Browse Menu
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
