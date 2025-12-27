'use client'

import { TestimonialsColumn } from "@/components/ui/testimonials-columns"
import { motion } from "framer-motion"

const testimonials = [
  {
    text: "LUXE CAFE has completely transformed how I work. The coffee is amazing, the space is inspiring, and the vibe is always welcoming!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    name: "Sarah Johnson",
    role: "Creative Director",
  },
  {
    text: "The perfect blend of premium coffee and productive workspace. I've found my second office here!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    name: "Michael Chen",
    role: "Entrepreneur",
  },
  {
    text: "From the artisanal pastries to the cozy atmosphere, everything about LUXE CAFE is exceptional. Highly recommend!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    name: "Emma Williams",
    role: "Marketing Manager",
  },
  {
    text: "The Bronze membership has been a game-changer for my productivity. Great amenities and even better coffee!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    name: "David Rodriguez",
    role: "Software Developer",
  },
  {
    text: "I love the community vibe here. Met so many interesting people while enjoying the best latte in town!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    name: "Lisa Anderson",
    role: "Freelance Designer",
  },
  {
    text: "The team at LUXE CAFE truly cares about their customers. Every visit feels special and personalized.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    name: "James Taylor",
    role: "Business Consultant",
  },
  {
    text: "Best coffee shop for remote work! Fast WiFi, comfortable seating, and the coffee keeps me energized all day.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    name: "Sophia Martinez",
    role: "Content Writer",
  },
  {
    text: "The Gold membership is worth every penny. Unlimited office time and premium coffee selection - what more could I ask for?",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    name: "Ryan Thompson",
    role: "Startup Founder",
  },
  {
    text: "LUXE CAFE has become my go-to spot for client meetings. Professional atmosphere with a warm, welcoming touch.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop",
    name: "Olivia Brown",
    role: "Account Executive",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

export default function Testimonials() {
  return (
    <section className="bg-cream py-24 px-8 lg:px-16 xl:px-24 relative overflow-hidden">
      <div className="container z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[640px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-primary/20 bg-white py-2 px-5 rounded-full text-sm font-medium text-dark-blue uppercase tracking-wider">
              Testimonials
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-6 text-dark-blue text-center">
            What our clients say
          </h2>
          <p className="text-center mt-5 text-dark-blue/70 text-lg leading-relaxed">
            Discover why our customers love the LUXE CAFE experience.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  )
}
