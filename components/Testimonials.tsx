'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'John Smith',
    title: 'Founder Main Street Bakery',
    text: 'LUXE CAFE has completely transformed how I work. The coffee is amazing, the space is inspiring, and the vibe is always welcoming!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    title: 'Creative Director',
    text: 'LUXE CAFE has completely transformed how I work. The coffee is amazing, the space is inspiring, and the vibe is always welcoming!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    id: 3,
    name: 'Michael Chen',
    title: 'Founder Tech Startup',
    text: 'LUXE CAFE has completely transformed how I work. The coffee is amazing, the space is inspiring, and the vibe is always welcoming!',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  },
  {
    id: 4,
    name: 'Emily Davis',
    title: 'Freelance Designer',
    text: 'LUXE CAFE has completely transformed how I work. The coffee is amazing, the space is inspiring, and the vibe is always welcoming!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  },
  {
    id: 5,
    name: 'David Wilson',
    title: 'Marketing Consultant',
    text: 'LUXE CAFE has completely transformed how I work. The coffee is amazing, the space is inspiring, and the vibe is always welcoming!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalTestimonials = testimonials.length
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % (totalTestimonials - 2))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + (totalTestimonials - 2)) % (totalTestimonials - 2))
  }

  const currentPage = currentIndex + 1
  const totalPages = totalTestimonials - 2

  return (
    <section className="py-20 px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-wider text-dark-blue/60 font-semibold mb-2">
              TESTIMONIALS
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-dark-blue leading-tight">
              What our clients say
            </h2>
          </motion.div>

          {/* Navigation Controls */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full border border-dark-blue/20 flex items-center justify-center hover:bg-dark-blue hover:text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-dark-blue/60 font-medium min-w-[50px] text-center">
              {String(currentPage).padStart(2, '0')}/{String(totalPages).padStart(2, '0')}
            </span>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-dark-blue text-white flex items-center justify-center hover:bg-dark-blue/90 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Client Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${testimonial.avatar})` }}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-dark-blue text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-dark-blue/60">
                    {testimonial.title}
                  </p>
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-dark-blue/80 text-sm leading-relaxed">
                {testimonial.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

