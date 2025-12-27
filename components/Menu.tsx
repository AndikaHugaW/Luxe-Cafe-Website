'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Star, Coffee, GlassWater, Cookie, Shirt, ShoppingCart } from 'lucide-react'
import { useMenu } from '@/hooks/useMenu'
import { useAuth } from '@/context/AuthContext'
import AuthModal from './AuthModal'

const categories = [
  { id: 'bestseller', name: 'Best Seller', icon: Star },
  { id: 'coffee', name: 'Coffee', icon: Coffee },
  { id: 'noncoffee', name: 'Non Coffee', icon: GlassWater },
  { id: 'snack', name: 'Snack', icon: Cookie },
  { id: 'merchandise', name: 'Merchandise', icon: Shirt },
]

const menuData = {
  bestseller: [
    { id: 1, name: 'Caramel Macchiato', description: 'Sweet caramel with smooth espresso and steamed milk', price: 'Rp 42.000' },
    { id: 2, name: 'Matcha Latte', description: 'Premium matcha with creamy oat milk', price: 'Rp 38.000' },
    { id: 3, name: 'Chocolate Cake', description: 'Decadent chocolate cake with ganache frosting', price: 'Rp 55.000' },
    { id: 4, name: 'Croissant', description: 'Buttery, flaky French croissant', price: 'Rp 28.000' },
    { id: 5, name: 'Vanilla Latte', description: 'Smooth espresso with vanilla and steamed milk', price: 'Rp 36.000' },
    { id: 6, name: 'Red Velvet Cake', description: 'Classic red velvet with cream cheese frosting', price: 'Rp 58.000' },
    { id: 7, name: 'Iced Caramel Latte', description: 'Cold caramel latte with ice and whipped cream', price: 'Rp 40.000' },
    { id: 8, name: 'Chocolate Chip Muffin', description: 'Fresh baked muffin with chocolate chips', price: 'Rp 30.000' },
    { id: 9, name: 'Cappuccino', description: 'Espresso with steamed milk and foam', price: 'Rp 35.000' },
    { id: 10, name: 'Strawberry Cheesecake', description: 'Creamy cheesecake with fresh strawberries', price: 'Rp 56.000' },
    { id: 11, name: 'Hazelnut Latte', description: 'Rich hazelnut flavor with espresso and milk', price: 'Rp 39.000' },
    { id: 12, name: 'Almond Croissant', description: 'Buttery croissant filled with almond cream', price: 'Rp 32.000' },
    { id: 13, name: 'Iced Matcha', description: 'Refreshing cold matcha with ice', price: 'Rp 37.000' },
    { id: 14, name: 'New York Cheesecake', description: 'Classic creamy New York style cheesecake', price: 'Rp 52.000' },
    { id: 15, name: 'Mocha Frappe', description: 'Blended mocha with ice and whipped cream', price: 'Rp 43.000' },
    { id: 16, name: 'Blueberry Scone', description: 'Buttery scone with fresh blueberries', price: 'Rp 29.000' },
    { id: 17, name: 'White Chocolate Mocha', description: 'Espresso with white chocolate and milk', price: 'Rp 41.000' },
    { id: 18, name: 'Lemon Tart', description: 'Tangy lemon curd in buttery pastry shell', price: 'Rp 45.000' },
    { id: 19, name: 'Cold Brew', description: 'Smooth cold-brewed coffee, served over ice', price: 'Rp 32.000' },
    { id: 20, name: 'Tiramisu', description: 'Classic Italian dessert with coffee and mascarpone', price: 'Rp 48.000' },
  ],
  coffee: [
    { id: 1, name: 'Espresso', description: 'Rich and bold espresso with a perfect crema', price: 'Rp 25.000' },
    { id: 2, name: 'Americano', description: 'Espresso with hot water, bold and smooth', price: 'Rp 28.000' },
    { id: 3, name: 'Cappuccino', description: 'Espresso with steamed milk and foam', price: 'Rp 35.000' },
    { id: 4, name: 'Latte', description: 'Espresso with steamed milk, smooth and creamy', price: 'Rp 35.000' },
    { id: 5, name: 'Caramel Macchiato', description: 'Sweet caramel with smooth espresso and steamed milk', price: 'Rp 42.000' },
    { id: 6, name: 'Mocha', description: 'Espresso with chocolate and steamed milk', price: 'Rp 40.000' },
    { id: 7, name: 'Flat White', description: 'Double espresso with microfoam milk', price: 'Rp 38.000' },
    { id: 8, name: 'Cold Brew', description: 'Smooth cold-brewed coffee, served over ice', price: 'Rp 32.000' },
    { id: 9, name: 'Vanilla Latte', description: 'Smooth espresso with vanilla and steamed milk', price: 'Rp 36.000' },
    { id: 10, name: 'Hazelnut Latte', description: 'Rich hazelnut flavor with espresso and milk', price: 'Rp 39.000' },
    { id: 11, name: 'White Chocolate Mocha', description: 'Espresso with white chocolate and milk', price: 'Rp 41.000' },
    { id: 12, name: 'Cortado', description: 'Equal parts espresso and steamed milk', price: 'Rp 33.000' },
    { id: 13, name: 'Affogato', description: 'Espresso poured over vanilla ice cream', price: 'Rp 38.000' },
    { id: 14, name: 'Long Black', description: 'Double espresso with hot water', price: 'Rp 30.000' },
    { id: 15, name: 'Piccolo Latte', description: 'Small latte with ristretto shot', price: 'Rp 32.000' },
    { id: 16, name: 'Caffe Breve', description: 'Espresso with half-and-half instead of milk', price: 'Rp 37.000' },
    { id: 17, name: 'Red Eye', description: 'Drip coffee with a shot of espresso', price: 'Rp 34.000' },
    { id: 18, name: 'Irish Coffee', description: 'Coffee with Irish whiskey and cream', price: 'Rp 45.000' },
    { id: 19, name: 'Vietnamese Coffee', description: 'Strong coffee with condensed milk', price: 'Rp 36.000' },
    { id: 20, name: 'Turkish Coffee', description: 'Traditional finely ground coffee, unfiltered', price: 'Rp 35.000' },
  ],
  noncoffee: [
    { id: 1, name: 'Matcha Latte', description: 'Premium matcha with creamy oat milk', price: 'Rp 38.000' },
    { id: 2, name: 'Chocolate Latte', description: 'Rich chocolate with steamed milk', price: 'Rp 36.000' },
    { id: 3, name: 'Green Tea', description: 'Premium Japanese green tea', price: 'Rp 22.000' },
    { id: 4, name: 'Earl Grey Tea', description: 'Classic bergamot-scented black tea', price: 'Rp 22.000' },
    { id: 5, name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice', price: 'Rp 28.000' },
    { id: 6, name: 'Lemonade', description: 'Fresh lemonade with a hint of mint', price: 'Rp 26.000' },
    { id: 7, name: 'Smoothie Berry', description: 'Mixed berries with yogurt and honey', price: 'Rp 38.000' },
    { id: 8, name: 'Hot Chocolate', description: 'Rich and creamy hot chocolate', price: 'Rp 32.000' },
    { id: 9, name: 'Iced Matcha', description: 'Refreshing cold matcha with ice', price: 'Rp 37.000' },
    { id: 10, name: 'Chai Latte', description: 'Spiced tea with steamed milk', price: 'Rp 35.000' },
    { id: 11, name: 'Jasmine Tea', description: 'Fragrant jasmine green tea', price: 'Rp 24.000' },
    { id: 12, name: 'Peach Iced Tea', description: 'Refreshing peach flavored iced tea', price: 'Rp 27.000' },
    { id: 13, name: 'Mango Smoothie', description: 'Fresh mango blended with yogurt', price: 'Rp 39.000' },
    { id: 14, name: 'Strawberry Smoothie', description: 'Fresh strawberries with banana and yogurt', price: 'Rp 37.000' },
    { id: 15, name: 'Avocado Smoothie', description: 'Creamy avocado with condensed milk', price: 'Rp 35.000' },
    { id: 16, name: 'Watermelon Juice', description: 'Fresh watermelon juice, chilled', price: 'Rp 25.000' },
    { id: 17, name: 'Ginger Tea', description: 'Warming ginger tea with honey', price: 'Rp 23.000' },
    { id: 18, name: 'Chamomile Tea', description: 'Calming herbal chamomile tea', price: 'Rp 24.000' },
    { id: 19, name: 'Coconut Water', description: 'Fresh young coconut water', price: 'Rp 30.000' },
    { id: 20, name: 'Mint Lemonade', description: 'Refreshing mint and lemon blend', price: 'Rp 28.000' },
  ],
  snack: [
    { id: 1, name: 'Croissant', description: 'Buttery, flaky French croissant', price: 'Rp 28.000' },
    { id: 2, name: 'Chocolate Cake', description: 'Decadent chocolate cake with ganache frosting', price: 'Rp 55.000' },
    { id: 3, name: 'Tiramisu', description: 'Classic Italian dessert with coffee and mascarpone', price: 'Rp 48.000' },
    { id: 4, name: 'Cheesecake', description: 'Creamy New York style cheesecake', price: 'Rp 52.000' },
    { id: 5, name: 'Blueberry Muffin', description: 'Fresh baked muffin with blueberries', price: 'Rp 32.000' },
    { id: 6, name: 'Chocolate Chip Cookie', description: 'Warm, gooey chocolate chip cookies', price: 'Rp 25.000' },
    { id: 7, name: 'Banana Bread', description: 'Moist banana bread with walnuts', price: 'Rp 35.000' },
    { id: 8, name: 'Cinnamon Roll', description: 'Sweet cinnamon roll with cream cheese frosting', price: 'Rp 38.000' },
    { id: 9, name: 'Almond Croissant', description: 'Buttery croissant filled with almond cream', price: 'Rp 32.000' },
    { id: 10, name: 'Red Velvet Cake', description: 'Classic red velvet with cream cheese frosting', price: 'Rp 58.000' },
    { id: 11, name: 'Strawberry Cheesecake', description: 'Creamy cheesecake with fresh strawberries', price: 'Rp 56.000' },
    { id: 12, name: 'Blueberry Scone', description: 'Buttery scone with fresh blueberries', price: 'Rp 29.000' },
    { id: 13, name: 'Lemon Tart', description: 'Tangy lemon curd in buttery pastry shell', price: 'Rp 45.000' },
    { id: 14, name: 'Chocolate Brownie', description: 'Rich fudgy chocolate brownie', price: 'Rp 33.000' },
    { id: 15, name: 'Apple Pie', description: 'Classic apple pie with cinnamon', price: 'Rp 42.000' },
    { id: 16, name: 'Carrot Cake', description: 'Moist carrot cake with cream cheese frosting', price: 'Rp 48.000' },
    { id: 17, name: 'Pecan Pie', description: 'Sweet pecan pie with caramel', price: 'Rp 46.000' },
    { id: 18, name: 'Chocolate Eclair', description: 'Cream-filled pastry with chocolate glaze', price: 'Rp 38.000' },
    { id: 19, name: 'Raspberry Danish', description: 'Flaky pastry with raspberry filling', price: 'Rp 36.000' },
    { id: 20, name: 'Pistachio Macaron', description: 'Delicate French macaron with pistachio', price: 'Rp 28.000' },
  ],
  merchandise: [
    { id: 1, name: 'Luxe Cafe T-Shirt', description: 'Premium cotton t-shirt with logo', price: 'Rp 150.000' },
    { id: 2, name: 'Luxe Cafe Tumbler', description: 'Insulated stainless steel tumbler 500ml', price: 'Rp 180.000' },
    { id: 3, name: 'Luxe Cafe Mug', description: 'Ceramic mug with logo design', price: 'Rp 95.000' },
    { id: 4, name: 'Luxe Cafe Tote Bag', description: 'Canvas tote bag with logo', price: 'Rp 120.000' },
    { id: 5, name: 'Coffee Beans Pack', description: 'Premium coffee beans 250gr', price: 'Rp 125.000' },
    { id: 6, name: 'Luxe Cafe Hoodie', description: 'Comfortable hoodie with logo', price: 'Rp 280.000' },
    { id: 7, name: 'Luxe Cafe Cap', description: 'Adjustable cap with embroidered logo', price: 'Rp 110.000' },
    { id: 8, name: 'Coffee Grinder', description: 'Manual coffee grinder for home use', price: 'Rp 350.000' },
    { id: 9, name: 'French Press', description: 'Glass French press 500ml', price: 'Rp 220.000' },
    { id: 10, name: 'Pour Over Set', description: 'Complete pour over coffee brewing set', price: 'Rp 195.000' },
    { id: 11, name: 'Coffee Scale', description: 'Digital coffee scale with timer', price: 'Rp 275.000' },
    { id: 12, name: 'Luxe Cafe Apron', description: 'Professional barista apron with logo', price: 'Rp 165.000' },
    { id: 13, name: 'Coffee Syrup Set', description: 'Set of 3 flavored coffee syrups', price: 'Rp 140.000' },
    { id: 14, name: 'Luxe Cafe Notebook', description: 'Premium notebook with cafe logo', price: 'Rp 85.000' },
    { id: 15, name: 'Coffee Gift Set', description: 'Gift set with beans, mug, and syrup', price: 'Rp 320.000' },
    { id: 16, name: 'Luxe Cafe Stickers', description: 'Set of 10 premium vinyl stickers', price: 'Rp 45.000' },
    { id: 17, name: 'Coffee Thermometer', description: 'Digital coffee temperature gauge', price: 'Rp 155.000' },
    { id: 18, name: 'Luxe Cafe Keychain', description: 'Metal keychain with logo design', price: 'Rp 65.000' },
    { id: 19, name: 'Coffee Filters Pack', description: 'Premium paper filters 100pcs', price: 'Rp 75.000' },
    { id: 20, name: 'Luxe Cafe Gift Card', description: 'Gift card with custom design', price: 'Rp 100.000' },
  ],
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('bestseller')
  const { user } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  
  // Try to use API, fallback to local data
  const { menuItems: apiItems, loading, error } = useMenu(activeCategory)
  
  // Use API data if available and no error, otherwise use local data
  const currentItems = (!error && apiItems.length > 0)
    ? apiItems 
    : (menuData[activeCategory as keyof typeof menuData] || [])

  return (
    <section id="menu" className="pt-24 pb-20 px-6 lg:px-8 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl sm:text-6xl font-bold text-dark-blue mb-4">
            Our Menu
          </h2>
          <p className="text-lg text-dark-blue/70">
            Discover our handcrafted beverages and artisanal treats
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.id
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-cream'
                    : 'bg-white text-dark-blue border border-primary/20 hover:border-primary/40'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </motion.button>
            )
          })}
        </div>

        {/* Loading State - Only show if trying to load from API */}
        {loading && !error && (
          <div className="text-center py-12">
            <p className="text-dark-blue/70">Loading menu...</p>
          </div>
        )}

        {/* Menu Items Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {currentItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              {/* Product Image */}
              <div className="w-full h-72 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                {(item as any).image_url ? (
                  <div 
                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${(item as any).image_url})` }}
                  />
                ) : (
                  <div className="text-center text-gray-400 text-sm">
                    <p>Product Image</p>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                {/* Title with Icon */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-dark-blue">
                    {item.name}
                  </h3>
                  {/* Icon kecil sesuai kategori */}
                  {activeCategory === 'coffee' && (
                    <Coffee className="w-4 h-4 text-dark-blue/60" />
                  )}
                  {activeCategory === 'noncoffee' && (
                    <GlassWater className="w-4 h-4 text-dark-blue/60" />
                  )}
                  {activeCategory === 'snack' && (
                    <Cookie className="w-4 h-4 text-dark-blue/60" />
                  )}
                  {activeCategory === 'merchandise' && (
                    <Shirt className="w-4 h-4 text-dark-blue/60" />
                  )}
                  {activeCategory === 'bestseller' && (
                    <Star className="w-4 h-4 text-dark-blue/60" />
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-dark-blue/70 leading-relaxed mb-4 flex-1">
                  {item.description}
                </p>

                {/* Price & Action */}
                <div className="mt-auto pt-3 border-t border-dashed border-primary/20 flex items-center justify-between">
                  <span className="text-2xl font-bold text-dark-blue">
                    {item.price}
                  </span>
                  
                  <motion.button
                    onClick={() => {
                      if (!user) {
                        setAuthModalOpen(true)
                      } else {
                        alert(`Pesanan ${item.name} berhasil ditambahkan!`)
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-all shadow-md active:scale-95"
                    whileHover={{ scale: 1.05 }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Order
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AuthModal 
          isOpen={authModalOpen} 
          onClose={() => setAuthModalOpen(false)} 
          initialView="login" 
        />

        {/* Empty State */}
        {currentItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-dark-blue/70">No items available in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
