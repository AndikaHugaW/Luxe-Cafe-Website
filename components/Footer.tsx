'use client'

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-cream border-t border-dark-blue/10 py-6 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <button
              onClick={() => scrollToSection('#about')}
              className="text-dark-blue hover:opacity-70 transition-opacity font-medium"
            >
              Our People
            </button>
            <button
              onClick={() => scrollToSection('#menu')}
              className="text-dark-blue hover:opacity-70 transition-opacity font-medium"
            >
              Our Menu
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <button
              onClick={() => scrollToSection('#contact')}
              className="text-dark-blue hover:opacity-70 transition-opacity font-medium"
            >
              Private Events
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="text-dark-blue hover:opacity-70 transition-opacity font-medium"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

