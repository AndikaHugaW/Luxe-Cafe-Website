import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import AboutDetail from '@/components/AboutDetail'
import Features from '@/components/Features'
import LargeLogo from '@/components/LargeLogo'
import MenuPreview from '@/components/MenuPreview'
import Membership from '@/components/Membership'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main id="home" className="relative bg-cream">
      <Navbar />
      <Hero />
      <About />
      <AboutDetail />
      <Features />
      <LargeLogo />
      <MenuPreview />
      <Membership />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  )
}

