'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  ]

  return (
    <footer className="bg-dark-blue text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Link href="/">
              <h3 className="text-2xl font-bold mb-4 hover:opacity-80 transition-opacity cursor-pointer">
                LUXE
              </h3>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              A tranquil haven inspired by our beloved French grandmother. 
              Where timeless recipes meet modern flair.
            </p>
            {/* Social Media */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all group"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  </a>
                )
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white/60 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">
                  123 Coffee Street<br />
                  Jakarta, Indonesia 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white/60 flex-shrink-0" />
                <a
                  href="tel:+621234567890"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  +62 123 4567 890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/60 flex-shrink-0" />
                <a
                  href="mailto:hello@luxecafe.com"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  hello@luxecafe.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Working Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">Working Hours</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white/60 flex-shrink-0" />
                <div className="text-white/80">
                  <p className="font-medium">Monday - Friday</p>
                  <p className="text-white/70">7:00 AM - 9:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white/60 flex-shrink-0" />
                <div className="text-white/80">
                  <p className="font-medium">Saturday - Sunday</p>
                  <p className="text-white/70">8:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>
              © {currentYear} Luxe Cafe. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
