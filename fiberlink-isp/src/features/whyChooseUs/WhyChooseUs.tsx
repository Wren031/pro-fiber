import { motion } from 'framer-motion'
import { BsLightningCharge, BsShieldCheck, BsHeadset, BsMap, BsCashCoin, BsGearWideConnected } from 'react-icons/bs'
import SectionTitle from '../../components/SectionTitle/SectionTitle'

const reasons = [
  {
    icon: BsLightningCharge,
    title: 'Lightning Fast Speed',
    desc: 'Experience blazing-fast internet with speeds up to 10 Gbps powered by pure fiber optic technology.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
  },
  {
    icon: BsShieldCheck,
    title: 'Secure Network',
    desc: 'Enterprise-grade security with advanced encryption, firewall protection, and real-time threat monitoring.',
    color: 'text-green-500',
    bg: 'bg-green-50',
  },
  {
    icon: BsHeadset,
    title: '24/7 Customer Support',
    desc: 'Our dedicated support team is available around the clock to assist you with any concerns or issues.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: BsMap,
    title: 'Wide Coverage',
    desc: 'Spanning 120+ cities nationwide with continuous expansion to bring connectivity to every corner.',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
  {
    icon: BsCashCoin,
    title: 'Affordable Plans',
    desc: 'Competitive pricing with no hidden fees. Get premium internet service that fits your budget.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  {
    icon: BsGearWideConnected,
    title: 'Professional Installation',
    desc: 'Certified technicians ensure proper setup and optimization of your connection for peak performance.',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Why Choose ProFiber Network?"
          subtitle="We deliver more than just internet — we deliver an experience. Here's why thousands trust us."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 transition-all duration-300"
            >
              <div className={`w-14 h-14 ${reason.bg} rounded-xl flex items-center justify-center mb-5`}>
                <reason.icon className={`w-7 h-7 ${reason.color}`} />
              </div>
              <h3 className="text-lg font-bold text-secondary mb-2">{reason.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
