'use client'

import { FeatureSteps } from '@/components/ui/feature-steps'

const features = [
  { 
    step: 'Step 1', 
    title: 'Our Menu',
    content: 'Discover our handcrafted beverages and artisanal pastries made with premium ingredients.', 
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2070&auto=format&fit=crop' 
  },
  { 
    step: 'Step 2',
    title: 'Our People',
    content: 'Meet the passionate team behind every cup, dedicated to creating memorable experiences.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop'
  },
  { 
    step: 'Step 3',
    title: 'Our History',
    content: 'Learn about our journey and culinary traditions inspired by our beloved French grandmother.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop'
  },
]

export default function Features() {
  return (
    <section className="py-32 px-8 lg:px-16 xl:px-24 bg-cream">
      <FeatureSteps 
        features={features}
        title="Discover LUXE Experience"
        autoPlayInterval={4000}
        imageHeight="h-[700px]"
      />
    </section>
  )
}
