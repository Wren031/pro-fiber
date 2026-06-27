import { motion } from 'framer-motion'
import { HiCheck } from 'react-icons/hi2'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import Button from '../../components/Button/Button'

const plans = [
  {
    name: 'Starter Fiber',
    speed: '100 Mbps',
    price: '₱999',
    period: '/month',
    popular: false,
    features: [
      'Unlimited Data',
      'Free Installation',
      'WiFi Router Included',
      'No Data Cap',
      '24/7 Support',
      '1GB Cloud Storage',
    ],
  },
  {
    name: 'Family Fiber',
    speed: '500 Mbps',
    price: '₱1,999',
    period: '/month',
    popular: true,
    features: [
      'Unlimited Data',
      'Free Installation',
      'WiFi 6 Router',
      'No Data Cap',
      '24/7 Priority Support',
      '5GB Cloud Storage',
      'Netflix Basic (3mo)',
    ],
  },
  {
    name: 'Pro Fiber',
    speed: '1 Gbps',
    price: '₱3,499',
    period: '/month',
    popular: false,
    features: [
      'Unlimited Data',
      'Free Installation',
      'WiFi 6 Mesh System',
      'No Data Cap',
      '24/7 Premium Support',
      '50GB Cloud Storage',
      'Static IP',
      'Netflix Standard (6mo)',
    ],
  },
  {
    name: 'Business Fiber',
    speed: '10 Gbps',
    price: '₱9,999',
    period: '/month',
    popular: false,
    features: [
      'Unlimited Data',
      'Priority Installation',
      'Enterprise Router',
      'SLA Guaranteed',
      'Dedicated Support',
      '500GB Cloud Storage',
      '5 Static IPs',
      'S-Corp Package',
    ],
  },
]

export default function Plans() {
  return (
    <section id="plans" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Internet Plans"
          subtitle="Choose the perfect plan for your needs. All plans come with unlimited data and free installation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'bg-white border-2 border-primary scale-105 lg:scale-110 z-10'
                  : 'bg-white border border-gray-100'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 gradient-bg text-white px-6 py-1.5 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-secondary mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold gradient-text">{plan.speed}</div>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-secondary">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-600">
                    <HiCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                size="md"
                className="w-full"
              >
                Subscribe Now
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
