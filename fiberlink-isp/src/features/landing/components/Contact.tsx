import { useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { HiMapPin, HiPhone, HiEnvelope, HiClock } from 'react-icons/hi2'
import { useAuth } from '../../../context/AuthContext'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import Button from '../../../components/Button/Button'

const ContactMapSection = lazy(() => import('./ContactMapSection'))

const contactInfo = [
  { icon: HiMapPin, label: 'Address', value: 'Balangay 2 Poblacion Quezon Bukidnon 8715, Quezon, Philippines, 8715' },
  { icon: HiPhone, label: 'Phone', value: '+63 912 345 6789' },
  { icon: HiEnvelope, label: 'Email', value: 'support@profibernetwork.com' },
  { icon: HiClock, label: 'Business Hours', value: 'Mon–Sat: 8:00 AM – 8:00 PM' },
]

const defaultCoords: [number, number] = [7.7323, 125.1022]

export default function Contact() {
  const { user } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const pinned = user?.pinnedLocation
  const mapCenter: [number, number] = pinned ? [pinned.lat, pinned.lng] : defaultCoords

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', phone: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Get in Touch"
          subtitle="Have questions? We'd love to hear from you. Send us a message and we'll respond promptly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-gray-50 rounded-3xl p-8 space-y-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="text-secondary font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <Suspense fallback={<div className="aspect-[16/9] rounded-3xl overflow-hidden bg-gray-100 flex items-center justify-center"><p className="text-gray-400 text-sm">Loading map...</p></div>}>
              <ContactMapSection center={mapCenter} />
            </Suspense>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-3xl p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Juan Dela Cruz"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="juan@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+63 912 345 6789"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                {submitted ? 'Message Sent! ✓' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
