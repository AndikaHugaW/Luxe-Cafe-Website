import Navbar from '@/components/Navbar'
import Newsletter from '@/components/Newsletter'
import Contact from '@/components/Contact'

export default function ContactPage() {
  return (
    <main className="relative bg-cream min-h-screen">
      <Navbar />
      <Contact />
      <Newsletter />
    </main>
  )
}

