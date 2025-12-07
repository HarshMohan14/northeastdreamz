'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CUSTOMER_IMAGES } from '@/lib/data'

export default function GallerySection() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const autoScrollRef = useRef<number | null>(null)
  const autoScrollEnabledRef = useRef(true)
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const scrollPositionRef = useRef(0)

  // Auto-scroll animation
  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery) return

    const scrollSpeed = 0.5

    const animateScroll = () => {
      if (autoScrollEnabledRef.current && gallery) {
        scrollPositionRef.current += scrollSpeed
        const halfWidth = gallery.scrollWidth / 2
        if (scrollPositionRef.current >= halfWidth) {
          scrollPositionRef.current = 0
        }
        gallery.scrollLeft = scrollPositionRef.current
      }
      autoScrollRef.current = requestAnimationFrame(animateScroll)
    }

    autoScrollRef.current = requestAnimationFrame(animateScroll)
    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current)
      }
    }
  }, [])

  // Sync scroll position when auto-scroll resumes
  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery) return

    const handleScroll = () => {
      if (!autoScrollEnabledRef.current) {
        scrollPositionRef.current = gallery.scrollLeft
      }
    }

    gallery.addEventListener('scroll', handleScroll, { passive: true })
    return () => gallery.removeEventListener('scroll', handleScroll)
  }, [])

  const carouselImages = [...CUSTOMER_IMAGES, ...CUSTOMER_IMAGES]
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [200, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Get actual photo width including spacing
  const getPhotoWidth = () => {
    if (!galleryRef.current) return 474 // default desktop: 450 + 24
    // Find the first image container
    const firstImage = galleryRef.current.querySelector('.flex-shrink-0') as HTMLElement
    if (!firstImage) {
      // Fallback: calculate based on screen size
      return typeof window !== 'undefined' && window.innerWidth >= 768 ? 474 : 344 // 450+24 or 320+24
    }
    const imageWidth = firstImage.offsetWidth || firstImage.getBoundingClientRect().width
    const spacing = 24 // space-x-6 = 24px
    return imageWidth + spacing
  }

  // Stop auto-scroll and set timer to resume after 3 seconds
  const pauseAutoScroll = () => {
    autoScrollEnabledRef.current = false
    
    // Clear existing timeout
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current)
    }
    
    // Resume auto-scroll after 3 seconds
    autoScrollTimeoutRef.current = setTimeout(() => {
      if (galleryRef.current) {
        scrollPositionRef.current = galleryRef.current.scrollLeft
        autoScrollEnabledRef.current = true
      }
    }, 3000)
  }

  const animateScrollTo = (target: number, duration: number = 400) => {
    if (!galleryRef.current) return
    
    const start = galleryRef.current.scrollLeft
    const distance = target - start
    if (Math.abs(distance) < 1) return // Already at target
    
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Smooth easing function
      const ease = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2 // ease-in-out
      
      if (galleryRef.current) {
        galleryRef.current.scrollLeft = start + distance * ease
        scrollPositionRef.current = galleryRef.current.scrollLeft
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }

  const scrollLeft = () => {
    if (!galleryRef.current) return
    
    pauseAutoScroll()
    const photoWidth = getPhotoWidth()
    const currentScroll = galleryRef.current.scrollLeft
    // Round to nearest photo position for better alignment
    const currentPhotoIndex = Math.round(currentScroll / photoWidth)
    const targetScroll = Math.max(0, (currentPhotoIndex - 1) * photoWidth)
    
    animateScrollTo(targetScroll, 400)
  }

  const scrollRight = () => {
    if (!galleryRef.current) return
    
    pauseAutoScroll()
    const photoWidth = getPhotoWidth()
    const currentScroll = galleryRef.current.scrollLeft
    const maxScroll = galleryRef.current.scrollWidth - galleryRef.current.clientWidth
    // Round to nearest photo position for better alignment
    const currentPhotoIndex = Math.round(currentScroll / photoWidth)
    const targetScroll = Math.min(maxScroll, (currentPhotoIndex + 1) * photoWidth)
    
    animateScrollTo(targetScroll, 400)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current)
      }
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="py-8 md:py-12 bg-gradient-to-b from-white via-brand-primary to-brand-primary text-white relative overflow-hidden"
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
          className="text-3xl md:text-5xl lg:text-6xl section-title text-white text-center mb-8 font-semibold"
        >
          Gallery of Memories
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/90 text-center mb-8 text-base md:text-lg lg:text-xl"
        >
          Real moments captured by our travelers.
        </motion.p>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 shadow-lg active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 shadow-lg active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </button>

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
                  src={hasError ? '/Northeast Dreamz Image Bank/Mawlynnong.webp' : src}
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
        </div>
      </motion.div>
    </section>
  )
}

