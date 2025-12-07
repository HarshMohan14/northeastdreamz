'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CalendarCheck, Download, Calendar, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { Package } from '@/lib/data'

interface ItineraryModalProps {
  packageData: Package | null
  isOpen: boolean
  onClose: () => void
  onBookingClick: () => void
}

export default function ItineraryModal({ packageData, isOpen, onClose, onBookingClick }: ItineraryModalProps) {
  const [imageError, setImageError] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

  if (!packageData) return null

  const getImageSrc = (image: string) => {
    if (imageError) {
      return getNortheastPlaceholder(packageData.state)
    }
    if (image.startsWith('http')) return image
    // Use Northeast India themed placeholders
    return getNortheastPlaceholder(packageData.state)
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

  const downloadItinerary = () => {
    const content = `
DETAILED ITINERARY - ${packageData.name}
${'='.repeat(60)}

Package: ${packageData.name}
State: ${packageData.state}
Duration: ${packageData.days} Days
Cost: ${packageData.cost}

${'='.repeat(60)}
ITINERARY
${'='.repeat(60)}

${packageData.itinerary.map(item => `
Day ${item.day}: ${item.title}
${item.desc}
`).join('\n')}

${'='.repeat(60)}
For bookings and inquiries, please contact Northeast Dreamz.
${'='.repeat(60)}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${packageData.name.replace(/\s+/g, '_')}_Itinerary.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const galleryImages = packageData.gallery || [
    getNortheastPlaceholder(packageData.state),
    '/Northeast Dreamz Image Bank/mawsmai_cave_5856.jpg',
    '/Northeast Dreamz Image Bank/Reach-dawki-by-road.jpg',
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto premium-shadow-lg relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-brand-primary p-2 rounded-full bg-white transition z-10"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 md:p-12">
              <div className="mb-6">
                <div className="relative w-full h-64 mb-4 rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={getImageSrc(packageData.image)}
                    alt={packageData.name}
                    fill
                    className="object-cover"
                    unoptimized={true}
                    onError={() => setImageError(true)}
                  />
                </div>
                <h3 className="text-4xl font-semibold section-title text-brand-primary mb-2">{packageData.name}</h3>
                <p className="text-gray-700 text-lg mb-6">
                  A bespoke {packageData.days}-Day journey in {packageData.state}.
                </p>
              </div>

              <h4 className="text-2xl font-semibold section-title text-brand-primary mt-10 mb-8 border-b border-gray-200 pb-3">
                Detailed Itinerary
              </h4>
              <div className="space-y-8">
                {packageData.itinerary.map((item, index) => {
                  // Get image for this day - cycle through gallery images
                  const dayImage = galleryImages[index % galleryImages.length] || galleryImages[0]
                  return (
                    <div key={item.day} className="flex flex-col md:flex-row gap-6">
                      <div className="flex space-x-4 flex-1">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 flex items-center justify-center bg-brand-primary text-white rounded-full font-light flex-shrink-0">
                            {item.day}
                          </div>
                          {index < packageData.itinerary.length - 1 && (
                            <div className="h-full w-0.5 bg-gray-200 my-2" />
                          )}
                        </div>
                        <div className="pt-1 flex-1">
                          <h4 className="text-xl font-light text-gray-900 mb-2">{item.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                      <div className="relative w-full md:w-64 h-48 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 premium-shadow">
                        <Image
                          src={dayImage}
                          alt={`Day ${item.day}: ${item.title}`}
                          fill
                          className="object-cover"
                          unoptimized={true}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Available Dates Section */}
              {packageData.availableDates && packageData.availableDates.length > 0 && (
                <div className="mt-12">
                  <h4 className="text-2xl font-semibold section-title text-brand-primary mb-6 border-b border-gray-200 pb-3 flex items-center space-x-2">
                    <Calendar className="w-6 h-6" />
                    <span>Available Dates</span>
                  </h4>
                  <div className="space-y-4">
                    {packageData.availableDates.map((monthData, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-4">
                        <button
                          onClick={() => setSelectedMonth(selectedMonth === monthData.month ? null : monthData.month)}
                          className="w-full flex items-center justify-between text-left"
                        >
                          <h5 className="text-lg font-light text-gray-900">{monthData.month}</h5>
                          <span className="text-sm text-brand-primary">
                            {selectedMonth === monthData.month ? '▼' : '▶'}
                          </span>
                        </button>
                        {selectedMonth === monthData.month && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-gray-200"
                          >
                            <div className="flex flex-wrap gap-2">
                              {monthData.dates.map((date) => (
                                <span
                                  key={date}
                                  className="px-4 py-2 bg-brand-primary text-white rounded-lg font-medium text-sm"
                                >
                                  {date}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Section */}
              {galleryImages && galleryImages.length > 0 && (
                <div className="mt-12">
                  <h4 className="text-2xl font-semibold section-title text-brand-primary mb-6 border-b border-gray-200 pb-3 flex items-center space-x-2">
                    <ImageIcon className="w-6 h-6" />
                    <span>Gallery</span>
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((img, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100"
                      >
                        <Image
                          src={img}
                          alt={`${packageData.name} - Photo ${idx + 1}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                          unoptimized={true}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 border-t border-brand-secondary space-y-4">
              <button
                onClick={downloadItinerary}
                className="w-full py-3 bg-brand-primary text-white font-light text-lg rounded-xl premium-button flex items-center justify-center space-x-2 hover:bg-opacity-90 transition"
              >
                <Download className="w-5 h-5" />
                <span>Download Detailed Itinerary</span>
              </button>
              <button
                onClick={onBookingClick}
                className="w-full py-3 bg-brand-accent text-white font-light text-lg rounded-xl premium-button flex items-center justify-center space-x-2"
              >
                <CalendarCheck className="w-5 h-5" />
                <span>Book This Dream Trip Now</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

