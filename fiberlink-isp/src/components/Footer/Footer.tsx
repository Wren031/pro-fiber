import { motion } from 'framer-motion'
import { HiGlobeAlt } from 'react-icons/hi2'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa'
import Button from '../Button/Button'

const quickLinks = [
  { label: 'About Us', href: '#' },
  { label: 'Plans & Pricing', href: '#plans' },
  { label: 'Coverage Map', href: '#coverage' },
  { label: 'Careers', href: '#' },
  { label: 'Blog', href: '#' },
]

const services = [
  { label: 'Fiber Internet', href: '#' },
  { label: 'Business Internet', href: '#' },
  { label: 'Home WiFi', href: '#' },
  { label: 'Managed Network', href: '#' },
  { label: 'Static IP', href: '#' },
]

const support = [
  { label: 'Help Center', href: '#' },
  { label: 'Contact Us', href: '#contact' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Speed Test', href: '#' },
  { label: 'Report Outage', href: '#' },
]

const socials = [
  { icon: FaFacebookF, href: '#' },
  { icon: FaTwitter, href: '#' },
  { icon: FaInstagram, href: '#' },
  { icon: FaYoutube, href: '#' },
  { icon: FaLinkedinIn, href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <a href="#" className="flex items-center gap-2 text-white">
                <HiGlobeAlt className="w-8 h-8 text-accent" />
                <span className="text-xl font-bold">
                  Pro<span className="text-accent">Fiber</span> Network
                </span>
              </a>
              <p className="text-gray-400 max-w-sm">
                Experience ultra-fast fiber internet with affordable plans, 99.9% uptime, and nationwide coverage.
              </p>
              <div className="flex gap-4">
                {socials.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-accent transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-accent transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              {support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-accent transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} ProFiber Network. All rights reserved.
            </p>
            <div className="flex gap-4 items-center justify-start lg:justify-end">
              <input
                type="email"
                placeholder="Subscribe to newsletter"
                className="px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm flex-1 lg:flex-none lg:w-64 focus:outline-none focus:border-accent"
              />
              <Button variant="primary" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
