'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const scrollToStates = () => {
    const element = document.querySelector('#states')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden" 
      id="home"
    >
      <motion.div
        style={{ y: imageY, scale }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/main.jpeg"
          alt="Northeast India Landscape"
          fill
          className="object-cover"
          priority
          quality={90}
          unoptimized={true}
        />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-[1]" 
      />

      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 h-full flex flex-col items-center justify-center text-center"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] section-title mb-6 tracking-tight"
        >
          Come, take your dream trip
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/95 font-light tracking-wide mb-12 max-w-2xl"
        >
          Bespoke, curated experiences in the mystical lands of Northeast India.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          href="#states"
          onClick={(e) => {
            e.preventDefault()
            scrollToStates()
          }}
          className="px-8 py-3.5 bg-brand-accent text-white font-light text-base rounded-full premium-button inline-flex items-center space-x-2"
        >
          <span>Explore Destinations</span>
          <ArrowRight className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  )
}

