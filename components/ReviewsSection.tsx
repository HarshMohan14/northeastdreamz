'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ExternalLink, Star, Play, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { MOCK_REVIEWS } from '@/lib/data'

interface PhotoGalleryProps {
  photos: string[]
  stars: number
  name: string
}

function PhotoGallery({ photos, stars, name }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const goToPhoto = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative w-full h-64 overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Image
            src={photos[currentIndex]}
            alt={`Photo ${currentIndex + 1} from ${name}`}
            fill
            className="object-cover"
            unoptimized={true}
          />
        </motion.div>
      </AnimatePresence>

      {/* Rating Badge Overlay */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center space-x-1 shadow-lg z-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < stars ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows - Show on hover when multiple photos */}
      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevPhoto()
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-white"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-4 h-4 text-brand-primary" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextPhoto()
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-white"
            aria-label="Next photo"
          >
            <ChevronRight className="w-4 h-4 text-brand-primary" />
          </button>
        </>
      )}

      {/* Photo Counter */}
      {photos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium z-10">
          {currentIndex + 1} / {photos.length}
        </div>
      )}

      {/* Thumbnail Dots */}
      {photos.length > 1 && (
        <div className="absolute bottom-4 right-4 flex items-center space-x-1.5 z-10">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                goToPhoto(index)
              }}
              className={`transition-all ${
                index === currentIndex
                  ? 'w-2 h-2 bg-white rounded-full'
                  : 'w-1.5 h-1.5 bg-white/50 rounded-full hover:bg-white/75'
              }`}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ReviewsSection() {
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const toggleReview = (reviewId: number) => {
    setExpandedReviews((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId)
      } else {
        newSet.add(reviewId)
      }
      return newSet
    })
  }

  const renderStars = (stars: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < stars ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'
        }`}
      />
    ))
  }

  const getReviewPhotos = (review: typeof MOCK_REVIEWS[0]): string[] => {
    // Support both new photos array and legacy single photo
    if (review.photos && review.photos.length > 0) {
      return review.photos
    }
    if (review.photo) {
      return [review.photo]
    }
    return []
  }

  return (
    <section 
      ref={sectionRef}
      id="reviews" 
      className="py-8 md:py-12 bg-gradient-to-b from-white via-brand-secondary/10 to-white relative overflow-hidden"
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
          className="text-5xl md:text-6xl lg:text-7xl section-title text-brand-primary text-center mb-8 font-light"
        >
          Hear From Our Happy Travelers
        </motion.h2>

        {/* Individual Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {MOCK_REVIEWS.map((review, idx) => {
            const photos = getReviewPhotos(review)
            const hasMedia = photos.length > 0 || review.video

            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
                {/* Photo Gallery or Video Section */}
                {hasMedia && (
                  <>
                    {review.video ? (
                      <div className="relative w-full h-64 overflow-hidden">
                        <div className="relative w-full h-full bg-gray-900">
                          <video
                            src={review.video}
                            className="w-full h-full object-cover"
                            controls
                            poster={photos[0]}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                              <Play className="w-8 h-8 text-brand-primary ml-1" />
                            </div>
                          </div>
                        </div>
                        {/* Rating Badge Overlay */}
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center space-x-1 shadow-lg z-10">
                          {renderStars(review.stars)}
                        </div>
                      </div>
                    ) : photos.length > 0 ? (
                      <PhotoGallery photos={photos} stars={review.stars} name={review.name} />
                    ) : null}
                  </>
                )}

                {/* Review Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Rating (if no media) */}
                  {!hasMedia && (
                    <div className="flex items-center space-x-1 mb-4">
                      {renderStars(review.stars)}
                    </div>
                  )}

                  {/* Review Text */}
                  <div className="mb-4 flex-1">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={expandedReviews.has(review.id) ? 'full' : 'short'}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-700 text-sm leading-relaxed italic"
                      >
                        "{expandedReviews.has(review.id) ? review.text : (review.shortText || review.text)}"
                      </motion.p>
                    </AnimatePresence>
                    
                    {/* Read More/Less Button - Only show if shortText exists and is different from full text */}
                    {review.shortText && review.shortText !== review.text && (
                      <button
                        onClick={() => toggleReview(review.id)}
                        className="mt-2 text-brand-primary hover:text-brand-accent text-xs font-semibold flex items-center space-x-1 transition-colors"
                      >
                        <span>{expandedReviews.has(review.id) ? 'Read less' : 'Read more'}</span>
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-300 ${
                            expandedReviews.has(review.id) ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Reviewer Info */}
                  <div className="border-t border-gray-200 pt-4 mt-auto">
                    <p className="font-semibold text-gray-900 text-base mb-1">{review.name}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">{review.city}</p>
                      {review.date && (
                        <p className="text-xs text-gray-500">{review.date}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Google Reviews CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <motion.a
            href="https://www.google.com/search?q=Northeast+dreamz&rlz=1C1RXQR_enIN1143IN1143&oq=Northeast+dreamz&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPNIBCDQxNzZqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#mpd=~3251114805954971274/customers/reviews"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-brand-accent text-white font-bold text-lg rounded-xl premium-button shadow-lg hover:shadow-xl transition-all"
          >
            <Star className="w-6 h-6 fill-white text-white" />
            <span>View All Google Reviews</span>
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
