import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BsWifi, BsBuilding, BsHouseDoor, BsHddNetwork, BsCashCoin } from 'react-icons/bs'
import { HiGlobeAlt, HiWrenchScrewdriver, HiVideoCamera, HiDocumentText, HiXMark, HiCheck } from 'react-icons/hi2'
import SectionTitle from '../../components/SectionTitle/SectionTitle'

interface ServiceDetail {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
  color: string
  bg: string
  highlights: string[]
  details: string
}

const services: ServiceDetail[] = [
  {
    icon: BsWifi,
    title: 'Fiber Internet',
    desc: 'Lightning-fast fiber optic internet with speeds up to 10 Gbps for seamless streaming, gaming, and working from home.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    highlights: ['Speeds up to 10 Gbps', 'Unlimited data', 'Free WiFi router', '99.9% uptime SLA', '24/7 support'],
    details: 'Our fiber internet service delivers ultra-fast, reliable connectivity directly to your home or office. With pure fiber optic technology, you get symmetrical upload and download speeds, low latency, and consistent performance even during peak hours. Perfect for streaming 4K content, competitive gaming, video conferencing, and running a smart home.',
  },
  {
    icon: BsBuilding,
    title: 'Business Internet',
    desc: 'Enterprise-grade connectivity with dedicated bandwidth, SLA guarantees, and priority support for your business.',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    highlights: ['Dedicated bandwidth', 'SLA guarantees', 'Static IP included', 'Priority 24/7 support', 'Business-grade router'],
    details: 'Keep your business running smoothly with enterprise-grade internet connectivity. Our business plans come with dedicated bandwidth, service level agreements, and priority technical support. We offer symmetrical speeds, multiple static IPs, and advanced network monitoring to ensure your operations never skip a beat.',
  },
  {
    icon: BsHouseDoor,
    title: 'Home WiFi',
    desc: 'Whole-home WiFi coverage with mesh technology. Perfect for families with multiple devices and smart home setups.',
    color: 'text-green-500',
    bg: 'bg-green-50',
    highlights: ['Mesh WiFi system', 'Whole-home coverage', 'Supports 50+ devices', 'Parental controls', 'Easy app management'],
    details: 'Eliminate dead spots and enjoy seamless connectivity throughout your home with our mesh WiFi systems. Our setup provides consistent coverage across every room, automatically switching your devices to the strongest signal. Built-in parental controls let you manage screen time and content filters for your family.',
  },
  {
    icon: BsHddNetwork,
    title: 'Managed Network',
    desc: 'Comprehensive network management including monitoring, security, and optimization for businesses of all sizes.',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    highlights: ['24/7 network monitoring', 'Security & firewall', 'Performance optimization', 'Remote management', 'Monthly reports'],
    details: 'Let our experts handle your network infrastructure. We provide end-to-end network management including proactive monitoring, security threat detection, performance optimization, and regular reporting. Our team ensures your network stays secure, fast, and reliable so you can focus on what matters most.',
  },
  {
    icon: HiGlobeAlt,
    title: 'Static IP',
    desc: 'Get a dedicated static IP address for remote access, hosting servers, or running VPN connections.',
    color: 'text-red-500',
    bg: 'bg-red-50',
    highlights: ['Dedicated static IP', 'Remote access ready', 'Server hosting support', 'VPN compatible', 'IPv4 and IPv6'],
    details: 'A static IP address gives your business a permanent online identity. Perfect for hosting your own servers, setting up VPN connections, remote desktop access, security camera systems, and maintaining consistent access to your network from anywhere in the world.',
  },
  {
    icon: HiWrenchScrewdriver,
    title: 'Network Installation',
    desc: 'Professional network cabling and installation services for homes and offices. Structured cabling experts.',
    color: 'text-teal-500',
    bg: 'bg-teal-50',
    highlights: ['Structured cabling', 'Fiber termination', 'Router configuration', 'Wall plate installation', 'Speed testing'],
    details: 'Our certified technicians handle every aspect of your network installation. From running structured cabling through walls to terminating fiber connections and configuring your router, we ensure everything is set up correctly. We test every connection to guarantee you get the speeds you paid for.',
  },
  {
    icon: HiVideoCamera,
    title: 'CCTV Installation',
    desc: 'High-definition CCTV camera installation for home and business security. 24/7 monitoring and remote viewing ready.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-50',
    highlights: ['HD/4K cameras', 'Night vision', 'Remote viewing', 'Motion detection', 'Cloud & local storage'],
    details: 'Secure your property with professional CCTV installation. We offer high-definition cameras with night vision, motion detection, and remote viewing capabilities. Access your feeds from anywhere using your smartphone. Choose from cloud or local storage options with flexible retention periods.',
  },
  {
    icon: HiDocumentText,
    title: 'Internet Plans',
    desc: 'Flexible fiber internet plans tailored to your needs. From starter to business-grade with unlimited data and no hidden fees.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
    highlights: ['100 Mbps to 10 Gbps', 'Unlimited data', 'No hidden fees', 'Free installation', 'No lock-in contracts'],
    details: 'Choose from a range of fiber internet plans designed to fit every budget and usage need. All plans come with unlimited data, free standard installation, and a free WiFi router. Upgrade or downgrade anytime with no penalties. Whether you need basic browsing or enterprise-grade speeds, we have a plan for you.',
  },
  {
    icon: BsCashCoin,
    title: 'Peso WiFi Vendo',
    desc: 'Affordable coin-operated WiFi vending solutions for public areas, sari-sari stores, and communities. Easy setup and management.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    highlights: ['Coin-operated system', 'Vendo machine included', 'Remote management', 'Usage analytics', 'Low maintenance'],
    details: 'Start your own WiFi business with our Peso WiFi Vendo solution. We provide the complete vending machine with integrated coin acceptor, WiFi router, and management software. Users pay by coin for timed internet access. You get real-time analytics, remote monitoring, and minimal maintenance requirements.',
  },
]

export default function Services() {
  const [selected, setSelected] = useState<ServiceDetail | null>(null)

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Our Services"
          subtitle="Comprehensive connectivity solutions tailored for every need — from home to enterprise."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 ${service.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className={`w-8 h-8 ${service.color}`} />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
              <button onClick={() => setSelected(service)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                Learn More &rarr;
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50" onClick={() => setSelected(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-lg w-full bg-white rounded-2xl shadow-xl z-50 flex flex-col max-h-[90vh]">
              <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${selected.bg} rounded-xl flex items-center justify-center`}>
                    <selected.icon className={`w-6 h-6 ${selected.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-secondary">{selected.title}</h3>
                    <p className="text-sm text-gray-500">Service Details</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all">
                  <HiXMark className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                <p className="text-gray-600 leading-relaxed text-sm">{selected.details}</p>
                <div>
                  <h4 className="text-sm font-semibold text-secondary mb-3">Highlights</h4>
                  <ul className="space-y-2.5">
                    {selected.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <HiCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                <button onClick={() => setSelected(null)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200 transition-all">
                  Close
                </button>
                <a href="#contact"
                  onClick={() => setSelected(null)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-all">
                  <HiGlobeAlt className="w-4 h-4" /> Inquire Now
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
