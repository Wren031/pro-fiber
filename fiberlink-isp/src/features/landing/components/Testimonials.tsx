import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'

const testimonials = [
  {
    name: 'Maria Santos',
    location: 'Makati City',
    rating: 5,
    photo: 'https://i.pravatar.cc/150?img=1',
    review: 'Switched to ProFiber Network and never looked back. The installation was smooth and the speed is incredibly consistent. Best decision for our home office setup!',
  },
  {
    name: 'Juan Dela Cruz',
    location: 'Quezon City',
    rating: 5,
    photo: 'https://i.pravatar.cc/150?img=3',
    review: 'As a gamer, I need low latency and ProFiber Network delivers. My ping dropped significantly and I can stream in 4K without any buffering. Highly recommended!',
  },
  {
    name: 'Anna Reyes',
    location: 'Cebu City',
    rating: 5,
    photo: 'https://i.pravatar.cc/150?img=5',
    review: 'Our small business runs on ProFiber Network. The business plan with static IP was a game-changer. Support team is always responsive and helpful.',
  },
  {
    name: 'Carlos Mendoza',
    location: 'Davao City',
    rating: 4,
    photo: 'https://i.pravatar.cc/150?img=8',
    review: 'Great value for money. The Family Fiber plan covers our whole household of 6 with multiple devices. Very reliable connection.',
  },
  {
    name: 'Lisa Tan',
    location: 'BGC, Taguig',
    rating: 5,
    photo: 'https://i.pravatar.cc/150?img=9',
    review: 'ProFiber Network made work-from-home so much easier. Video calls are crystal clear and large file uploads are lightning fast. Worth every peso!',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const goNext = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  }

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="What Our Customers Say"
          subtitle="Hear from thousands of satisfied customers who trust ProFiber Network for their connectivity needs."
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="relative min-h-[320px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto">
                  <img
                    src={testimonials[current].photo}
                    alt={testimonials[current].name}
                    className="w-20 h-20 rounded-full mx-auto mb-6 object-cover ring-4 ring-primary/20"
                  />
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <HiStar
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonials[current].rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6 italic">
                    &ldquo;{testimonials[current].review}&rdquo;
                  </p>
                  <div>
                    <p className="font-bold text-secondary text-lg">{testimonials[current].name}</p>
                    <p className="text-gray-400 text-sm">{testimonials[current].location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goPrev}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all"
              aria-label="Previous"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === current ? 'bg-primary w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all"
              aria-label="Next"
            >
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
