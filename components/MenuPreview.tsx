'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const previewItems = [
  { id: 1, name: 'Caramel Macchiato', description: 'Sweet caramel with smooth espresso and steamed milk', price: 'Rp 42.000', image_url: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800' },
  { id: 2, name: 'Matcha Latte', description: 'Premium matcha with creamy oat milk', price: 'Rp 38.000', image_url: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800' },
  { id: 3, name: 'Chocolate Cake', description: 'Decadent chocolate cake with ganache frosting', price: 'Rp 55.000', image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800' },
  { id: 4, name: 'Croissant', description: 'Buttery, flaky French croissant', price: 'Rp 28.000', image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800' },
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
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col border border-primary/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* Product Image */}
              <div className="relative w-full h-72 overflow-hidden">
                <motion.img 
                  src={item.image_url} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-dark-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-dark-blue mb-2 transition-colors group-hover:text-primary">
                  {item.name}
                </h3>

                <p className="text-sm text-dark-blue/60 leading-relaxed mb-6 line-clamp-2">
                  {item.description}
                </p>

                <div className="mt-auto pt-4 border-t border-primary/10 flex items-center justify-between">
                  <span className="text-xl font-black text-dark-blue">
                    {item.price}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary transform scale-0 group-hover:scale-100 transition-transform duration-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
                    </svg>
                  </div>
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

