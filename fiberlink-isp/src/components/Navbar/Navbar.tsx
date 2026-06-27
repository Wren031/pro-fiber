import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { HiGlobeAlt, HiUserCircle } from 'react-icons/hi2'
import { useAuth } from '../../context/AuthContext'
import Button from '../Button/Button'

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'Plans', href: '#plans' },
  { label: 'Coverage', href: '#coverage' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome ? 'glass-dark shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-2 text-white">
            <HiGlobeAlt className="w-8 h-8 text-accent" />
            <span className="text-xl font-bold">
              Pro<span className="text-accent">Fiber</span> Network
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                <HiUserCircle className="w-5 h-5 mr-1" /> Dashboard
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Login
              </Button>
            )}
            <Button variant="primary" size="sm" href="#contact">
              Get Connected
            </Button>
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden glass-dark overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white text-base font-medium py-2 transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 space-y-3">
            {isAuthenticated ? (
              <Button variant="ghost" size="md" className="w-full" onClick={() => { setIsOpen(false); navigate('/dashboard') }}>
                Dashboard
              </Button>
            ) : (
              <Button variant="ghost" size="md" className="w-full" onClick={() => { setIsOpen(false); navigate('/login') }}>
                Login
              </Button>
            )}
            <Button variant="primary" size="md" className="w-full" href="#contact">
              Get Connected
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
