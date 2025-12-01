'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MOCK_REVIEWS } from '@/lib/data'

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_REVIEWS.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const moveReview = (direction: number) => {
    setCurrentIndex((prev) => (prev + direction + MOCK_REVIEWS.length) % MOCK_REVIEWS.length)
  }

  const renderStars = (stars: number) => {
    return '★'.repeat(stars) + '☆'.repeat(5 - stars)
  }

  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section 
      ref={sectionRef}
      id="reviews" 
      className="py-20 md:py-28 bg-gradient-to-b from-white via-brand-secondary/10 to-white relative overflow-hidden"
    >
      <motion.div 
        style={{ y, opacity }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl section-title text-brand-primary text-center mb-12 font-light"
        >
          Hear From Our Happy Travelers
        </motion.h2>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative max-w-5xl mx-auto"
          >
          <div className="relative h-[500px] overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 p-12 md:p-16 backdrop-blur-xl border border-brand-primary/40 rounded-3xl flex flex-col justify-between shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(12, 75, 77, 0.35) 0%, rgba(212, 222, 223, 0.45) 50%, rgba(12, 75, 77, 0.25) 100%)',
                  boxShadow: '0 8px 32px 0 rgba(12, 75, 77, 0.35)'
                }}
              >
                <div>
                  <div className="text-3xl md:text-4xl text-brand-accent mb-8">
                    {renderStars(MOCK_REVIEWS[currentIndex].stars)}
                  </div>
                  <p className="italic text-lg md:text-xl font-light leading-relaxed mb-10 text-gray-800">
                    "{MOCK_REVIEWS[currentIndex].text}"
                  </p>
                </div>
                <div className="border-t border-gray-300/30 pt-8">
                  <p className="font-light text-xl md:text-2xl mb-2 text-gray-900">{MOCK_REVIEWS[currentIndex].name}</p>
                  <p className="text-sm md:text-base text-gray-600 font-light">{MOCK_REVIEWS[currentIndex].city}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => moveReview(-1)}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 backdrop-blur-md border border-brand-primary/40 rounded-full p-4 shadow-lg z-20 transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(12, 75, 77, 0.35) 0%, rgba(212, 222, 223, 0.45) 100%)'
            }}
            aria-label="Previous review"
          >
            <ChevronLeft className="w-6 h-6 text-brand-primary" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => moveReview(1)}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 backdrop-blur-md border border-brand-primary/40 rounded-full p-4 shadow-lg z-20 transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(12, 75, 77, 0.35) 0%, rgba(212, 222, 223, 0.45) 100%)'
            }}
            aria-label="Next review"
          >
            <ChevronRight className="w-6 h-6 text-brand-primary" />
          </motion.button>

          <div className="flex justify-center mt-8 space-x-3">
            {MOCK_REVIEWS.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-brand-primary w-10' : 'bg-gray-300 w-2'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

