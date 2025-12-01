'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { CUSTOMER_IMAGES } from '@/lib/data'

export default function GallerySection() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery) return

    let scrollPosition = 0
    const scrollSpeed = 0.4

    const animateScroll = () => {
      scrollPosition += scrollSpeed
      if (scrollPosition >= gallery.scrollWidth / 2) {
        scrollPosition = 0
      }
      gallery.scrollLeft = scrollPosition
      requestAnimationFrame(animateScroll)
    }

    const animationId = requestAnimationFrame(animateScroll)
    return () => cancelAnimationFrame(animationId)
  }, [])

  const carouselImages = [...CUSTOMER_IMAGES, ...CUSTOMER_IMAGES]
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [200, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-28 bg-gradient-to-b from-white via-brand-primary to-brand-primary text-white relative overflow-hidden"
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
          className="text-5xl md:text-6xl lg:text-7xl section-title text-white text-center mb-8 font-bold"
        >
          Gallery of Memories
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/90 text-center mb-16 text-xl"
        >
          Real moments captured by our travelers.
        </motion.p>

        <div
          ref={galleryRef}
          className="flex overflow-x-hidden no-scrollbar space-x-6 py-4"
        >
          {carouselImages.map((src, index) => {
            const imageKey = `${src}-${index}`
            const hasError = imageErrors[imageKey]
            return (
              <motion.div
                key={imageKey}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="flex-shrink-0 w-80 h-80 md:w-[450px] md:h-[450px] rounded-3xl overflow-hidden premium-shadow-2xl"
              >
                <Image
                  src={hasError ? 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop' : src}
                  alt="Northeast India Travel Photo"
                  width={450}
                  height={450}
                  className="w-full h-full object-cover"
                  unoptimized={true}
                  onError={() => setImageErrors((prev) => ({ ...prev, [imageKey]: true }))}
                />
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

