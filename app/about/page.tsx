import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import About from '@/components/About'
import AboutDetail from '@/components/AboutDetail'
import Features from '@/components/Features'

export default function AboutPage() {
  return (
    <main className="relative bg-cream">
      <Navbar />
      <div className="pt-16">
        <About />
        <AboutDetail />
        <Features />
      </div>
      <Footer />
    </main>
  )
}

