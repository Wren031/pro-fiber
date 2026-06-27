import { motion } from 'framer-motion'
import { HiSignal, HiCloudArrowDown } from 'react-icons/hi2'
import { BsWifi, BsRouter } from 'react-icons/bs'
import { IoServerOutline } from 'react-icons/io5'
import Button from '../../../components/Button/Button'

const floatingIcons = [
  { icon: BsWifi, className: 'top-20 left-[15%] text-accent/40', size: 40 },
  { icon: HiSignal, className: 'top-40 right-[20%] text-primary/30', size: 36 },
  { icon: BsRouter, className: 'bottom-32 left-[20%] text-accent/30', size: 44 },
  { icon: IoServerOutline, className: 'bottom-40 right-[15%] text-primary/40', size: 48 },
  { icon: HiCloudArrowDown, className: 'top-1/2 left-[10%] text-white/20', size: 52 },
]

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  delay: Math.random() * 3,
}))

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden gradient-bg-dark">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10" />

      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.className}`}
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
        >
          <item.icon size={item.size} />
        </motion.div>
      ))}

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ opacity: [0, 0.6, 0], y: [0, -30, 0] }}
          transition={{ duration: 3 + p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/20 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-accent text-sm"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Now Serving 1000+ Happy Customers
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              Fast, Reliable Internet for{' '}
              <span className="gradient-text">Every Home and Business</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-xl">
              Experience ultra-fast fiber internet with affordable plans, 99.9% uptime, and nationwide coverage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" href="#plans">
                View Plans
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              <Button variant="outline" size="lg" href="#coverage">
                Check Coverage
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              {[
                { label: 'Happy Customers', value: '1000K+' },
                { label: 'Cities Covered', value: '120+' },
                { label: 'Uptime', value: '99.9%' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg">
              <div className="aspect-square rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-3xl absolute inset-0" />

              <div className="relative glass rounded-3xl p-8 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                <div className="space-y-4">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/10"
                  >
                    <BsWifi className="w-8 h-8 text-accent" />
                    <div>
                      <div className="text-white font-medium">WiFi 5 Ready</div>
                      <div className="text-gray-400 text-sm">Dual-band gigabit</div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/10"
                  >
                    <HiSignal className="w-8 h-8 text-accent" />
                    <div>
                      <div className="text-white font-medium">Fiber Optic</div>
                      <div className="text-gray-400 text-sm">Up to 10 Gbps</div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, delay: 1, repeat: Infinity }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/10"
                  >
                    <IoServerOutline className="w-8 h-8 text-accent" />
                    <div>
                      <div className="text-white font-medium">Cloud Network</div>
                      <div className="text-gray-400 text-sm">99.9% uptime</div>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="aspect-square rounded-2xl bg-white/5 flex items-center justify-center"
                      >
                        <div className="w-8 h-8 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
