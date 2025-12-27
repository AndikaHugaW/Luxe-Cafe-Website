'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-20 px-6 lg:px-8 bg-primary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg sm:text-xl text-white leading-relaxed">
            Luxe, our beloved French grandmother, inspired this tranquil haven. She was the heart of our family, 
            nurturing us with her wisdom and love for culinary traditions. In her honor, we've created this cozy cafe, 
            where we blend her timeless recipes with modern flair. Our scratch kitchen celebrates seasonal produce from 
            local farmers, elevating classic French flavors and crafting dishes that delight your senses.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
