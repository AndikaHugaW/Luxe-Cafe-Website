'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const previewItems = [
  { id: 1, name: 'Caramel Macchiato', description: 'Sweet caramel with smooth espresso and steamed milk', price: 'Rp 42.000' },
  { id: 2, name: 'Matcha Latte', description: 'Premium matcha with creamy oat milk', price: 'Rp 38.000' },
  { id: 3, name: 'Chocolate Cake', description: 'Decadent chocolate cake with ganache frosting', price: 'Rp 55.000' },
  { id: 4, name: 'Croissant', description: 'Buttery, flaky French croissant', price: 'Rp 28.000' },
]

export default function MenuPreview() {
  return (
    <section id="menu" className="py-20 px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl sm:text-6xl font-bold text-dark-blue mb-4">
            Best Seller
          </h2>
          <p className="text-lg text-dark-blue/70">
            Discover our handcrafted beverages and artisanal treats
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {previewItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Product Image */}
              <div className="w-full h-72 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                <div className="text-center text-gray-400 text-sm">
                  <p>Product Image</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-lg font-bold text-dark-blue mb-2">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-dark-blue/70 leading-relaxed mb-4 flex-1">
                  {item.description}
                </p>

                {/* Price */}
                <div className="mt-auto pt-3 border-t border-dashed border-primary/20">
                  <span className="text-2xl font-bold text-dark-blue">
                    {item.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/menu">
            <motion.button
              className="px-8 py-3 bg-primary text-cream rounded-full font-medium hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Menu
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

