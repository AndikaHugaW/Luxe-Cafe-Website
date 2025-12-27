'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Newsletter from '@/components/Newsletter'

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1470&auto=format&fit=crop',
    alt: 'Coffee shop interior',
    category: 'Interior'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1470&auto=format&fit=crop',
    alt: 'Coffee beans',
    category: 'Coffee'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1470&auto=format&fit=crop',
    alt: 'Cafe atmosphere',
    category: 'Atmosphere'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1470&auto=format&fit=crop',
    alt: 'Latte art',
    category: 'Coffee'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop',
    alt: 'Coffee shop seating',
    category: 'Interior'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1469&auto=format&fit=crop',
    alt: 'Coffee cup on table',
    category: 'Coffee'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1470&auto=format&fit=crop',
    alt: 'Coffee preparation',
    category: 'Coffee'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=1471&auto=format&fit=crop',
    alt: 'Cafe exterior',
    category: 'Exterior'
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1470&auto=format&fit=crop',
    alt: 'Pastries and desserts',
    category: 'Food'
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?q=80&w=1469&auto=format&fit=crop',
    alt: 'Coffee bar',
    category: 'Interior'
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1470&auto=format&fit=crop',
    alt: 'Coffee making',
    category: 'Coffee'
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1461&auto=format&fit=crop',
    alt: 'Cafe ambiance',
    category: 'Atmosphere'
  },
]

const categories = ['All', 'Coffee', 'Interior', 'Food', 'Atmosphere', 'Exterior']

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = React.useState('All')

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  return (
    <main className="relative bg-cream min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 lg:px-8 bg-dark-blue">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              Our Gallery
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Discover the atmosphere, flavors, and moments that make Luxe Cafe special
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-dark-blue text-white'
                    : 'bg-white text-dark-blue hover:bg-dark-blue/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium">{image.alt}</p>
                    <p className="text-white/80 text-sm">{image.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Newsletter />
    </main>
  )
}

