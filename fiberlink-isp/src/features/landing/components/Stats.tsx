import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiUserGroup, HiBuildingOffice2, HiCheckBadge, HiRocketLaunch } from 'react-icons/hi2'
import CountUp from './CountUp'

const stats = [
  { icon: HiUserGroup, value: 500, suffix: '+', label: 'Happy Customers' },
  { icon: HiBuildingOffice2, value: 120, suffix: '+', label: 'Cities Covered' },
  { icon: HiCheckBadge, value: 99.9, suffix: '%', label: 'Uptime Guaranteed' },
  { icon: HiRocketLaunch, value: 10, suffix: ' Gbps', label: 'Maximum Speed' },
]

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 gradient-bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                <stat.icon className="w-8 h-8 text-accent" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {isInView ? (
                  <CountUp end={stat.value} suffix={stat.suffix} />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <div className="text-gray-400 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
