'use client'

import { useMenu } from '@/hooks/useMenu'
import { MenuCategory } from '@/lib/types/menu'
import Image from 'next/image'

interface MenuListProps {
  category?: MenuCategory
}

export default function MenuList({ category }: MenuListProps) {
  const { menuItems, loading, error, refetch } = useMenu(category)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-6 py-2 bg-gold text-white rounded-lg hover:bg-gold/90 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (menuItems.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600">No menu items found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          {/* Image */}
          {item.image_url ? (
            <div className="relative h-48 w-full">
              <Image
                src={item.image_url}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}

          {/* Content */}
          <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {item.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {item.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gold">
                Rp {item.price.toLocaleString('id-ID')}
              </span>
              <span className="text-xs text-gray-500 uppercase">
                {item.category}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
