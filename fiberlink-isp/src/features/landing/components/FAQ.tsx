import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi2'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'

const faqs = [
  {
    question: 'How long does installation take?',
    answer: 'Standard installation typically takes 2–4 hours for a home or small office. In most cases, we can schedule your installation within 24–48 hours after your application is approved. Our certified technicians handle everything from fiber termination to router setup.',
  },
  {
    question: 'Is there a contract?',
    answer: 'We offer both no-contract monthly plans and discounted annual plans. Our month-to-month plans give you the flexibility to cancel anytime with no penalties. Annual plans come with 2 months free and free installation.',
  },
  {
    question: 'Do you offer business plans?',
    answer: 'Yes! Our Business Fiber plans start at ₱9,999/month with speeds up to 10 Gbps, static IPs, SLA guarantees, and dedicated support. We also offer customized enterprise solutions for larger organizations.',
  },
  {
    question: 'How can I pay my bill?',
    answer: 'You can pay through multiple channels: online banking, credit/debit cards, GCash, Maya, over-the-counter at partner banks, or through our automatic billing system. We also send digital receipts via email.',
  },
  {
    question: 'Can I upgrade my plan?',
    answer: 'Absolutely! You can upgrade your plan anytime. The new speed takes effect immediately upon confirmation. If you\'re on an annual plan, we\'ll prorate the difference. Downgrades are also available with a simple request.',
  },
  {
    question: 'Is there a data cap on your plans?',
    answer: 'No! All ProFiber Network residential and business plans come with truly unlimited data. We do not impose data caps, throttling, or fair usage policies. Enjoy unlimited streaming, gaming, and downloading.',
  },
  {
    question: 'What equipment is included?',
    answer: 'All plans include a free WiFi router/modem. Our higher-tier plans include WiFi 6 mesh systems for whole-home coverage. Business plans come with enterprise-grade routers. Additional mesh nodes are available for purchase.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Got questions? We've got answers. If you can't find what you're looking for, reach out to our support team."
        />

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-6 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="text-base md:text-lg font-semibold text-secondary pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <HiChevronDown className="w-5 h-5 text-primary" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
