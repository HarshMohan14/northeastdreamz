'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

interface NavigationProps {
  onBookingClick?: () => void
}

export default function Navigation({ onBookingClick }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '#states', label: 'Destinations' },
    { href: '#packages', label: 'Packages' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#blog', label: 'Blog' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-md border-b border-gray-100 shadow-sm' 
          : 'bg-transparent'
      }`}>
        <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative h-12 w-auto">
              <Image
                src={isScrolled ? '/Logo - green.png' : '/lol white.png'}
                alt="Northeast Dreamz Logo"
                width={150}
                height={48}
                className="h-12 w-auto object-contain"
                unoptimized={true}
                priority
              />
            </div>
          </div>

          <div className="hidden md:flex space-x-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className={`transition-colors duration-200 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-brand-primary' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={onBookingClick}
            className={`hidden md:block px-6 py-2.5 text-sm font-semibold rounded-full premium-button transition-all ${
              isScrolled
                ? 'bg-brand-accent text-white'
                : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
            }`}
          >
            Get Started
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden transition-colors ${
              isScrolled ? 'text-brand-primary' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="p-6 h-full bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="relative h-10 w-auto">
                  <Image
                    src="/Logo - green.png"
                    alt="Northeast Dreamz Logo"
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain"
                    unoptimized={true}
                  />
                </div>
                <button
                  className="text-brand-primary"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col space-y-5 text-lg font-medium">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className="text-gray-800 hover:text-brand-primary transition-colors duration-200 border-b border-gray-100 pb-3"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={() => {
                    onBookingClick?.()
                    setMobileMenuOpen(false)
                  }}
                  className="mt-6 px-6 py-3 bg-brand-accent text-white text-sm font-semibold rounded-lg premium-button"
                >
                  Plan Your Dream Trip
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

