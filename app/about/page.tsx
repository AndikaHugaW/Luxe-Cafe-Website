import Navbar from '@/components/Navbar'
import Newsletter from '@/components/Newsletter'
import About from '@/components/About'
import AboutDetail from '@/components/AboutDetail'
import Features from '@/components/Features'

export default function AboutPage() {
  return (
    <main className="relative bg-cream">
      <Navbar />
      <div className="pt-16">
        <AboutDetail />
        <Features />
      </div>
      <Newsletter />
    </main>
  )
}

