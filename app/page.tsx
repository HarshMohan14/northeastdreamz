'use client'

import { useState } from 'react'
import HeroSection from '@/components/HeroSection'
import Navigation from '@/components/Navigation'
import ServicesSection from '@/components/ServicesSection'
import StatesSection from '@/components/StatesSection'
import PackagesSection from '@/components/PackagesSection'
import ReviewsSection from '@/components/ReviewsSection'
import GallerySection from '@/components/GallerySection'
import BlogSection from '@/components/BlogSection'
import Footer from '@/components/Footer'
import BookingModal from '@/components/BookingModal'

export default function Home() {
  const [showBooking, setShowBooking] = useState(false)
  const [bookingPackage, setBookingPackage] = useState<{ name: string; description: string } | null>(null)

  const handleBookingClick = (pkg?: { name: string; description: string }) => {
    if (pkg) {
      setBookingPackage(pkg)
    }
    setShowBooking(true)
  }

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
      <Footer />
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

