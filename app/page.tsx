'use client'

import { useState, useEffect } from 'react'
import HeroSection from '@/components/HeroSection'
import Navigation from '@/components/Navigation'
import ServicesSection from '@/components/ServicesSection'
import StatesSection from '@/components/StatesSection'
import PackagesSection from '@/components/PackagesSection'
import ReviewsSection from '@/components/ReviewsSection'
import GallerySection from '@/components/GallerySection'
import BlogSection from '@/components/BlogSection'
import InquiryFormSection from '@/components/InquiryFormSection'
import Footer from '@/components/Footer'
import BookingModal from '@/components/BookingModal'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Home() {
  const [showBooking, setShowBooking] = useState(false)
  const [bookingPackage, setBookingPackage] = useState<{ name: string; description: string } | null>(null)

  const handleBookingClick = (pkg?: { name: string; description: string }) => {
    if (pkg) {
      setBookingPackage(pkg)
    }
    setShowBooking(true)
  }

  // Handle hash navigation when page loads or hash changes
  useEffect(() => {
    const scrollToHash = () => {
      // Check sessionStorage first (set by Navigation component)
      const storedHash = sessionStorage.getItem('scrollToHash')
      const hash = storedHash || window.location.hash
      
      if (hash) {
        // Try to scroll immediately with aggressive retry
        const attemptScroll = (retries = 0) => {
          const element = document.querySelector(hash)
          if (element) {
            // Scroll immediately when element is found
            element.scrollIntoView({ behavior: 'smooth' })
            if (storedHash) {
              sessionStorage.removeItem('scrollToHash')
            }
          } else if (retries < 30) {
            // Retry very quickly (up to 30 attempts, ~150ms total)
            requestAnimationFrame(() => attemptScroll(retries + 1))
          }
        }
        
        // Start immediately on next frame
        requestAnimationFrame(attemptScroll)
      }
    }

    // Try immediately, then also on next tick
    scrollToHash()
    const timeoutId = setTimeout(scrollToHash, 10)

    // Handle hash changes
    window.addEventListener('hashchange', scrollToHash)
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('hashchange', scrollToHash)
    }
  }, [])

  return (
    <main className="min-h-screen">
      <Navigation onBookingClick={() => handleBookingClick()} />
      <HeroSection />
      <ServicesSection />
      <StatesSection />
      <PackagesSection />
      <ReviewsSection />
      <GallerySection />
      <BlogSection />
      <InquiryFormSection />
      <Footer />
      <WhatsAppButton />
      <BookingModal
        isOpen={showBooking}
        onClose={() => {
          setShowBooking(false)
          setBookingPackage(null)
        }}
        packageName={bookingPackage?.name || 'General Inquiry'}
        packageDescription={bookingPackage?.description || 'Interested in a bespoke trip'}
      />
    </main>
  )
}

