'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CloudRain, Coffee, Mountain, Snowflake } from 'lucide-react'
import Image from 'next/image'
import { STATES } from '@/lib/data'

// Background images for each state
const stateImages: Record<string, string> = {
  'Meghalaya': 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop',
  'Assam': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
  'Arunachal Pradesh': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  'Sikkim': 'https://images.unsplash.com/photo-1464822759844-d150ad6d0e0b?w=800&h=600&fit=crop',
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'cloud-rain': CloudRain,
  'tea-cup': Coffee,
  mountain: Mountain,
  'snowy-mountain': Snowflake,
}

interface StatesSectionProps {
  onStateClick?: (state: string) => void
}

export default function StatesSection({ onStateClick }: StatesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const scrollToPackages = (state?: string) => {
    const packagesSection = document.querySelector('#packages')
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' })
      if (state) {
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent('filterPackages', { detail: { state } })
          )
          onStateClick?.(state)
        }, 300)
      }
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="states" 
      className="py-8 md:py-12 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden"
    >
      <motion.div 
        style={{ y, opacity }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl section-title text-brand-primary mb-6 font-bold"
        >
          The Mystical 4 States
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-600 mb-6 max-w-3xl mx-auto text-xl"
        >
          Discover the untouched beauty and unique cultures of our four core destinations. Click to see curated packages, or{' '}
          <span
            onClick={() => scrollToPackages()}
            className="font-semibold text-brand-accent cursor-pointer hover:text-brand-primary transition-colors"
          >
            View All
          </span>
          .
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATES.map((state, index) => {
            const IconComponent = iconMap[state.icon] || Mountain
            return (
              <motion.div
                key={state.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => scrollToPackages(state.name)}
                className="cursor-pointer group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative p-8 rounded-3xl overflow-hidden transition-all duration-300 border-2 border-white/20 hover:border-white/40 premium-shadow-lg h-full min-h-[280px]"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={stateImages[state.name] || stateImages['Meghalaya']}
                      alt={state.name}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 border-2 border-white/40 premium-shadow"
                    >
                      <IconComponent className="w-12 h-12 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mt-4 mb-3">{state.name}</h3>
                    <p className="text-sm text-white/90 leading-relaxed">{state.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

