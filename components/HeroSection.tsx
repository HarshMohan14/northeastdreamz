'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })

  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay was prevented, which is fine
      })
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
        style={{ y: videoY, scale }}
        className="absolute inset-0 w-full h-full"
      >
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
          onError={(e) => {
            const video = e.target as HTMLVideoElement
            video.style.display = 'none'
          }}
        >
          <source
            src="https://videos.pexels.com/video-files/1448735/1448735-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
          <source
            src="https://videos.pexels.com/video-files/2491284/2491284-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
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
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] section-title mb-6 tracking-tight"
        >
          Take the dream trip of your life
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
          className="px-8 py-3.5 bg-brand-accent text-white font-semibold text-base rounded-full premium-button inline-flex items-center space-x-2"
        >
          <span>Explore Destinations</span>
          <ArrowRight className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  )
}

