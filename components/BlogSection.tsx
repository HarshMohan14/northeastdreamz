'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import BookingModal from './BookingModal'
import { useState } from 'react'

const blogPosts = [
  {
    id: 1,
    state: 'Meghalaya',
    title: '5 Days in Shillong: A Perfect Itinerary',
    description: 'From crystal clear rivers to the misty cliffs of Laitlum Canyon, plan your trip now.',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&h=400&fit=crop',
    alt: 'Misty hills of Meghalaya',
  },
  {
    id: 2,
    state: 'Assam',
    title: "Kaziranga's Magic: The One-Horned Rhino",
    description: 'A complete guide to safari bookings and the best time to visit the sanctuary.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
    alt: 'Tea gardens of Assam',
  },
  {
    id: 3,
    state: 'Sikkim',
    title: 'Trekking to the Roof of the World',
    description: 'Insider tips for planning your high-altitude Kanchenjunga base camp trek.',
    image: 'https://images.unsplash.com/photo-1464822759844-d150ad6d0e0b?w=600&h=400&fit=crop',
    alt: 'Himalayan peaks of Sikkim',
  },
]

export default function BlogSection() {
  const [showBooking, setShowBooking] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [150, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <>
      <section 
        ref={sectionRef}
        id="blog" 
        className="py-8 md:py-12 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden"
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
            className="text-5xl md:text-6xl lg:text-7xl section-title text-brand-primary text-center mb-6 font-light"
          >
            Traveler's Journal
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden premium-shadow-lg hover:premium-shadow-2xl transition-all duration-300"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-64 overflow-hidden"
                >
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    className="object-cover"
                    unoptimized={true}
                    onError={() => setImageErrors((prev) => ({ ...prev, [post.id]: true }))}
                  />
                </motion.div>
                <div className="p-8">
                  <span className="text-xs font-light uppercase text-brand-accent mb-4 block tracking-wider">
                    {post.state}
                  </span>
                  <h3 className="text-2xl font-light section-title text-gray-900 mb-4">{post.title}</h3>
                  <p className="text-gray-600 text-base mb-6 leading-relaxed">{post.description}</p>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="#packages"
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.querySelector('#packages')
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="text-brand-primary font-light hover:text-brand-accent transition-colors inline-flex items-center space-x-2"
                  >
                    <span>Read More</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-20"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBooking(true)}
              className="px-12 py-4 bg-brand-accent text-white font-light text-lg rounded-full premium-button"
            >
              Plan My Trip Now
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      <BookingModal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        packageName="Blog Inquiry"
        packageDescription="Interested after reading the blog posts"
      />
    </>
  )
}

