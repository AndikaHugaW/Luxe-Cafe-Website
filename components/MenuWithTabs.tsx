'use client'

import { useState } from 'react'
import { MenuCategory } from '@/lib/types/menu'
import MenuList from './MenuList'

const categories: { value: MenuCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Menu' },
  { value: 'coffee', label: 'Coffee' },
  { value: 'non-coffee', label: 'Non-Coffee' },
  { value: 'food', label: 'Food' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'snack', label: 'Snack' },
]

export default function MenuWithTabs() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all')

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Our Menu
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our carefully curated selection of premium coffee, delicious food, and delightful treats.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setActiveCategory(category.value)}
            className={`
              px-6 py-2.5 rounded-full font-medium transition-all duration-300
              ${
                activeCategory === category.value
                  ? 'bg-gold text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }
            `}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Menu List */}
      <MenuList category={activeCategory === 'all' ? undefined : activeCategory} />
    </div>
  )
}
