import Navbar from '@/components/Navbar'
import Menu from '@/components/Menu'
import Newsletter from '@/components/Newsletter'

export default function MenuPage() {
  return (
    <main className="relative bg-cream min-h-screen">
      <Navbar />
      <Menu />
      <Newsletter />
    </main>
  )
}

