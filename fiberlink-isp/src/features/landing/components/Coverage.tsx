import { useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { HiMagnifyingGlass, HiCheckCircle, HiClock, HiArrowPath } from 'react-icons/hi2'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'

const CoverageMapSection = lazy(() => import('./CoverageMapSection'))

const coverageStatus = [
  {
    icon: HiCheckCircle,
    label: 'Available',
    desc: 'Currently serviced areas',
    color: 'text-green-500',
    bg: 'bg-green-50',
  },
  {
    icon: HiClock,
    label: 'Coming Soon',
    desc: 'Under development',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
  },
  {
    icon: HiArrowPath,
    label: 'Expanding Area',
    desc: 'Upgrade in progress',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
]

export default function Coverage() {
  const [search, setSearch] = useState('')

  return (
    <section id="coverage" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Check Our Service Coverage"
          subtitle="Find out if ProFiber is available in your area. We're expanding rapidly across the nation."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto mb-12"
        >
          <div className="relative">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your city or barangay..."
              className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-base"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {coverageStatus.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${item.bg} rounded-2xl p-6 text-center`}
            >
              <item.icon className={`w-12 h-12 ${item.color} mx-auto mb-4`} />
              <h4 className="text-lg font-semibold text-secondary mb-1">{item.label}</h4>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <Suspense fallback={
          <div className="rounded-3xl overflow-hidden border border-gray-100 aspect-[21/9] flex items-center justify-center bg-gray-100">
            <p className="text-gray-400 text-sm">Loading coverage map...</p>
          </div>
        }>
          <CoverageMapSection />
        </Suspense>
      </div>
    </section>
  )
}
