'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { FileText } from 'lucide-react'
import { PACKAGE_DATA, Package } from '@/lib/data'
import ItineraryModal from './ItineraryModal'
import BookingModal from './BookingModal'

export default function PackagesSection() {
  const [filteredState, setFilteredState] = useState<string | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [showItinerary, setShowItinerary] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  const [bookingPackage, setBookingPackage] = useState<{ name: string; description: string } | null>(null)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  useEffect(() => {
    // Listen for state filter from StatesSection
    const handleStateFilter = (e: Event) => {
      const customEvent = e as CustomEvent
      setFilteredState(customEvent.detail.state)
    }
    window.addEventListener('filterPackages', handleStateFilter)
    return () => {
      window.removeEventListener('filterPackages', handleStateFilter)
    }
  }, [])

  const filteredPackages = filteredState
    ? PACKAGE_DATA.filter((pkg) => pkg.state === filteredState)
    : PACKAGE_DATA

  const handleViewItinerary = (pkg: Package) => {
    setSelectedPackage(pkg)
    setShowItinerary(true)
  }

  const handleBookingClick = (pkg?: Package) => {
    if (pkg) {
      setBookingPackage({
        name: `${pkg.state}: ${pkg.name}`,
        description: `${pkg.days}-day immersive journey`,
      })
    }
    setShowBooking(true)
  }

  const getImageSrc = (image: string, pkgId: number) => {
    if (imageErrors[pkgId]) {
      const pkg = filteredPackages.find(p => p.id === pkgId)
      return getNortheastPlaceholder(pkg?.state || 'Northeast')
    }
    if (image.startsWith('http')) return image
    // Use Northeast India themed placeholders
    const pkg = filteredPackages.find(p => p.id === pkgId)
    return getNortheastPlaceholder(pkg?.state || 'Northeast')
  }

  const getNortheastPlaceholder = (state: string) => {
    const images: Record<string, string> = {
      'Meghalaya': '/Northeast Dreamz Image Bank/all-saints-church-shillong-meghalaya-2-attr-hero.jpg',
      'Assam': '/Northeast Dreamz Image Bank/Shillong cherry blossom meghalaya.jpg',
      'Arunachal Pradesh': '/Northeast Dreamz Image Bank/sukumar-bardoloi-kWjU2ZS53U8-unsplash.jpg',
      'Sikkim': '/Northeast Dreamz Image Bank/framesbytanmay-WSpzdB7DMjA-unsplash.jpg',
    }
    return images[state] || '/Northeast Dreamz Image Bank/Mawlynnong.webp'
  }

  // Northeast nature images for each grid item - showcasing diverse Northeast India landscapes
  const northeastNatureImages = [
    '/Northeast Dreamz Image Bank/Mawlynnong.webp', // Grid 1: Meghalaya - Misty hills, waterfalls, and lush green valleys
    '/Northeast Dreamz Image Bank/mawsmai_cave_5856.jpg', // Grid 2: Assam - Tea gardens, Kaziranga grasslands, and green landscapes
    '/Northeast Dreamz Image Bank/Reach-dawki-by-road.jpg', // Grid 3: Sikkim - Himalayan peaks, alpine meadows, and snow-capped mountains
    '/Northeast Dreamz Image Bank/travel-to-mawlynnong-village.jpg', // Grid 4: Arunachal Pradesh - Dense forests, mountain ranges, and pristine valleys
  ]

  const handleImageError = (pkgId: number) => {
    setImageErrors((prev) => ({ ...prev, [pkgId]: true }))
  }

  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [150, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <>
      <section 
        ref={sectionRef}
        id="packages" 
        className="py-8 md:py-12 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden"
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
            className="text-center mb-6"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl section-title text-brand-primary mb-6 font-semibold">
              Curated Bespoke Packages
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              id="package-filter-info"
              className="text-gray-600 text-base md:text-lg lg:text-xl max-w-3xl mx-auto"
            >
              {filteredState ? (
                <>
                  Discover our curated experiences in{' '}
                  <span className="font-light text-brand-primary">{filteredState}</span>.{' '}
                  <span
                    onClick={() => setFilteredState(null)}
                    className="text-brand-accent font-light cursor-pointer hover:text-brand-primary transition-colors"
                  >
                    View All Packages
                  </span>
                </>
              ) : (
                'Handcrafted journeys designed to create unforgettable memories in Northeast India.'
              )}
            </motion.p>
          </motion.div>

          {filteredPackages.length > 0 ? (
            <div className="w-full">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0" style={{ gridAutoRows: 'minmax(400px, 1fr)' }}>
                {filteredPackages.slice(0, 4).map((pkg, index) => {
                  // 4x2 Grid Layout:
                  // Row 1: [3 cols] [1 col]
                  // Row 2: [2 cols] [2 cols]
                  const sizes = [
                    { row: 'row-span-1', col: 'col-span-2 md:col-span-3' }, // First: 3×1 (top left, spans 3 columns)
                    { row: 'row-span-1', col: 'col-span-2 md:col-span-1' }, // Second: 1×1 (top right)
                    { row: 'row-span-1', col: 'col-span-1 md:col-span-2' }, // Third: 2×1 (bottom left)
                    { row: 'row-span-1', col: 'col-span-1 md:col-span-2' }, // Fourth: 2×1 (bottom right)
                  ]
                  const size = sizes[index]
                  
                  return (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`${size.col} ${size.row} group relative`}
                      style={{ minHeight: '400px' }}
                    >
                      <div className="relative w-full h-full min-h-[400px] overflow-hidden bg-gray-100">
                        <div className="absolute inset-0">
                          <Image
                            src={northeastNatureImages[index] || getImageSrc(pkg.image, pkg.id)}
                            alt={pkg.name}
                            fill
                            className="object-cover"
                            unoptimized={true}
                            sizes="(max-width: 768px) 50vw, 33vw"
                            onError={() => handleImageError(pkg.id)}
                          />
                        </div>

                        {/* Default: Always show package name */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4 md:p-6 z-10">
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold section-title text-white mb-4">
                            {pkg.name}
                          </h3>
                          
                          {/* View Itinerary Button - Always visible */}
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleViewItinerary(pkg)
                            }}
                            className="w-full md:w-auto self-start px-[22px] py-[9px] border-2 border-white text-white font-semibold rounded-full backdrop-blur-sm bg-white/10 hover:bg-brand-accent hover:border-brand-accent hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg z-30"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FileText className="w-[15px] h-[15px]" />
                            <span className="text-[13px] md:text-[15px]">View Itinerary</span>
                          </motion.button>
                        </div>

                        {/* Hover: Show impactful description */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6 z-20">
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold section-title text-white mb-2">
                            {pkg.name}
                          </h3>
                          <p className="text-white/95 text-sm md:text-base font-light leading-relaxed mb-4">
                            {pkg.days}-day immersive journey through {pkg.state}'s hidden gems
                          </p>
                          
                          {/* View Itinerary Button - Also visible on hover */}
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleViewItinerary(pkg)
                            }}
                            className="w-full md:w-auto self-start px-[22px] py-[9px] border-2 border-white text-white font-semibold rounded-full backdrop-blur-sm bg-white/10 hover:bg-brand-accent hover:border-brand-accent hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg z-30"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FileText className="w-[15px] h-[15px]" />
                            <span className="text-[13px] md:text-[15px]">View Itinerary</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-16"
            >
              <p className="text-gray-600 text-base md:text-lg mb-6">No packages available for this destination yet.</p>
              <button
                onClick={() => setShowBooking(true)}
                className="px-8 py-3 bg-brand-accent text-white rounded-full font-semibold premium-button"
              >
                Contact Us for Custom Package
              </button>
            </motion.div>
          )}
        </motion.div>
      </section>

      <ItineraryModal
        packageData={selectedPackage}
        isOpen={showItinerary}
        onClose={() => setShowItinerary(false)}
        onBookingClick={() => {
          setShowItinerary(false)
          if (selectedPackage) {
            handleBookingClick(selectedPackage)
          }
        }}
      />

      <BookingModal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        packageName={bookingPackage?.name || 'General Inquiry'}
        packageDescription={bookingPackage?.description || 'Interested in a bespoke trip'}
      />
    </>
  )
}

