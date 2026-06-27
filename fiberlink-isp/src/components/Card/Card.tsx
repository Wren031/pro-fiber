import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'highlighted'
  delay?: number
}

export default function Card({ children, className = '', variant = 'default', delay = 0 }: CardProps) {
  const variantStyles = {
    default: 'bg-white border border-gray-100 rounded-2xl',
    glass: 'glass rounded-2xl',
    highlighted: 'bg-white border-2 border-primary rounded-2xl ring-1 ring-primary/20',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className={`${variantStyles[variant]} card-hover ${className}`}
    >
      {children}
    </motion.div>
  )
}
