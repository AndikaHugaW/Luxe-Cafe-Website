'use client'

import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const footerColumns = [
  {
    title: 'Menu',
    links: [
      { text: 'Coffee & Beverages', href: '/menu' },
      { text: 'Pastries & Snacks', href: '/menu' },
      { text: 'Breakfast', href: '/menu' },
      { text: 'Lunch Specials', href: '/menu' },
    ],
  },
  {
    title: 'About',
    links: [
      { text: 'Our Story', href: '/about' },
      { text: 'Team', href: '/about' },
      { text: 'Locations', href: '/contact' },
      { text: 'Careers', href: '/about' },
    ],
  },
  {
    title: 'Membership',
    links: [
      { text: 'Luxe Member', href: '/#membership' },
      { text: 'Bronze Member', href: '/#membership' },
      { text: 'Gold Member', href: '/#membership' },
      { text: 'Benefits', href: '/#membership' },
    ],
  },
]

const legalLinks = [
  { text: 'Terms of Service', href: '/terms' },
  { text: 'Privacy Policy', href: '/privacy' },
  { text: 'Cookie Settings', href: '/cookies' },
]

const socialIcons = [
  { icon: <Instagram className="h-5 w-5" />, href: 'https://instagram.com/luxecafe', label: 'Instagram' },
  { icon: <Facebook className="h-5 w-5" />, href: 'https://facebook.com/luxecafe', label: 'Facebook' },
  { icon: <Twitter className="h-5 w-5" />, href: 'https://twitter.com/luxecafe', label: 'Twitter' },
]

const contactInfo = [
  { icon: Mail, text: 'hello@luxecafe.com', href: 'mailto:hello@luxecafe.com' },
  { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: MapPin, text: 'Downtown, City Center', href: '/contact' },
]

export default function FooterNewsletter() {
  return (
    <footer className="bg-cream text-dark-blue relative w-full pt-20 pb-10">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full overflow-hidden">
        <div className="bg-primary absolute top-1/3 left-1/4 h-64 w-64 rounded-full opacity-5 blur-3xl" />
        <div className="bg-primary absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full opacity-5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-8 lg:px-16 xl:px-24">
        {/* Newsletter Section */}
        <div className="bg-white shadow-lg border border-primary/10 mb-16 rounded-2xl p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold md:text-3xl text-dark-blue">
                Want updates? Join our LUXE newsletter today.
              </h3>
              <p className="text-dark-blue/70 mb-6">
                Get exclusive offers, new menu items, and event updates delivered to your inbox.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 border-dark-blue/20 bg-white focus:ring-primary rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none text-dark-blue placeholder-gray-400"
                />
                <button className="bg-primary text-white shadow-primary/20 hover:shadow-primary/30 hover:bg-primary-dark rounded-lg px-6 py-3 font-semibold shadow-lg transition">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="hidden justify-end md:flex">
              <div className="relative">
                <div className="bg-primary/20 absolute inset-0 rotate-6 rounded-xl" />
                <img
                  src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=300&fit=crop"
                  alt="LUXE CAFE"
                  className="relative w-80 h-60 rounded-xl object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Logo & Description */}
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-6 flex items-center space-x-2">
              <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
                <span className="text-white text-xl font-bold">L</span>
              </div>
              <span className="text-2xl font-bold text-dark-blue">LUXE CAFE</span>
            </div>
            <p className="text-dark-blue/60 mb-6 max-w-sm">
              Premium coffee and cozy workspace in the heart of the city. Where great coffee meets productivity.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {contactInfo.map(({ icon: Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  className="flex items-center gap-2 text-dark-blue/70 hover:text-primary transition"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-sm">{text}</span>
                </a>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              {socialIcons.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  aria-label={item.label}
                  className="bg-white border border-primary/20 hover:bg-primary hover:text-white text-primary flex h-10 w-10 items-center justify-center rounded-full transition shadow-sm"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-lg font-semibold text-dark-blue">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map(({ text, href }) => (
                  <li key={text}>
                    <a
                      href={href}
                      className="text-dark-blue/60 hover:text-primary transition text-sm"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-dark-blue/10 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <p className="text-dark-blue/60 mb-4 text-sm md:mb-0">
            © 2025 LUXE CAFE. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {legalLinks.map(({ text, href }) => (
              <a
                key={text}
                href={href}
                className="text-dark-blue/60 hover:text-primary text-sm transition"
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
