'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CalendarCheck } from 'lucide-react'
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
      'Meghalaya': 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop',
      'Assam': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
      'Arunachal Pradesh': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'Sikkim': 'https://images.unsplash.com/photo-1464822759844-d150ad6d0e0b?w=800&h=600&fit=crop',
    }
    return images[state] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
  }

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
                <h3 className="text-4xl font-bold section-title text-brand-primary mb-2">{packageData.name}</h3>
                <p className="text-gray-700 text-lg mb-6">
                  A bespoke {packageData.days}-Day journey in {packageData.state}.
                </p>
              </div>

              <h4 className="text-2xl font-bold section-title text-brand-primary mt-10 mb-8 border-b border-gray-200 pb-3">
                Detailed Itinerary
              </h4>
              <div className="space-y-6">
                {packageData.itinerary.map((item, index) => (
                  <div key={item.day} className="flex space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 flex items-center justify-center bg-brand-primary text-white rounded-full font-semibold flex-shrink-0">
                        {item.day}
                      </div>
                      {index < packageData.itinerary.length - 1 && (
                        <div className="h-full w-0.5 bg-gray-200 my-2" />
                      )}
                    </div>
                    <div className="pt-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 border-t border-brand-secondary">
              <button
                onClick={onBookingClick}
                className="w-full py-3 bg-brand-accent text-white font-bold text-lg rounded-xl premium-button flex items-center justify-center space-x-2"
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

