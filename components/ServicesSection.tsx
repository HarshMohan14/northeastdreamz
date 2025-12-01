'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const services = [
  {
    title: 'Curated Northeast Journeys',
    description: 'Thoughtfully designed routes across all 8 states, blending nature, culture and comfort.',
  },
  {
    title: 'Stays That Feel Like Home',
    description: 'Cozy homestays, boutique lodges and unique properties chosen for warmth, charm and location.',
  },
  {
    title: 'Seamless Travel & Transport',
    description: 'Airport pickups, intercity travel, sightseeing vehicles and trained local drivers — all coordinated for you.',
  },
  {
    title: 'Local Experiences',
    description: 'Food explorations, tribal cultures, riverside picnics, handcrafted workshops, and festival immersions.',
  },
  {
    title: 'Nature & Adventure Trails',
    description: 'Living root bridges, forests, lakes, treks, caves, river activities and wildlife encounters.',
  },
  {
    title: 'Custom Travel Planning',
    description: 'Fully personalised itineraries for families, couples, friends and special occasions.',
  },
  {
    title: 'Full-Time Assistance',
    description: 'Our team stays connected with you throughout your journey — guiding, supporting and making sure you\'re always at ease.',
  },
]

export default function ServicesSection() {
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
      id="services" 
      className="py-12 md:py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden"
    >
      <motion.div 
        style={{ y, opacity }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl section-title text-brand-primary mb-6 font-light">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-4">
            At Northeast Dreamz, we design journeys that feel intimate, immersive, and effortless.
          </p>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            From hidden trails to cozy homestays, we curate travel across the entire Northeast with care and authenticity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div 
                className="h-full p-6 md:p-8 backdrop-blur-xl border border-brand-primary/20 rounded-2xl transition-all duration-300 hover:border-brand-primary/40"
                style={{
                  background: 'linear-gradient(135deg, rgba(12, 75, 77, 0.08) 0%, rgba(212, 222, 223, 0.15) 50%, rgba(255,255,255,0.05) 100%)',
                  boxShadow: '0 4px 20px 0 rgba(12, 75, 77, 0.1)'
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-brand-accent mt-2" />
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-brand-primary mb-3 section-title">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

