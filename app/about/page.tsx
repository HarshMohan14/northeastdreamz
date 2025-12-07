'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { Heart, MapPin, Users, Award, Compass, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const values = [
    {
      icon: Heart,
      title: 'Authentic Experiences',
      description: 'We believe in connecting you with the real Northeast - its people, culture, and untouched natural beauty.',
    },
    {
      icon: MapPin,
      title: 'Local Expertise',
      description: 'Our deep-rooted knowledge of the region ensures you discover hidden gems and authentic experiences.',
    },
    {
      icon: Users,
      title: 'Personalized Service',
      description: 'Every journey is tailored to your preferences, ensuring a truly bespoke travel experience.',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We curate only the finest accommodations, experiences, and services for our travelers.',
    },
  ]

  const stats = [
    { number: '500+', label: 'Happy Travelers' },
    { number: '8', label: 'States Covered' },
    { number: '50+', label: 'Curated Packages' },
    { number: '98%', label: 'Satisfaction Rate' },
  ]

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-brand-primary via-brand-primary to-brand-primary/90 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
            alt="Northeast India Landscape"
            fill
            className="object-cover"
            unoptimized={true}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 section-title"
          >
            About Northeast Dreamz
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Crafting unforgettable journeys through India's most enchanting region
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 section-title">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Northeast Dreamz was born from a deep passion for the unexplored beauty and rich cultural heritage of Northeast India. 
                  What started as a personal journey through the misty hills of Meghalaya, the tea gardens of Assam, the pristine mountains 
                  of Arunachal Pradesh, and the spiritual valleys of Sikkim, evolved into a mission to share these hidden treasures with 
                  the world.
                </p>
                <p>
                  We recognized that while the Northeast is home to some of India's most breathtaking landscapes and vibrant cultures, 
                  it remained largely undiscovered by mainstream travelers. This inspired us to create a travel company that would not 
                  just organize trips, but craft immersive experiences that connect travelers with the authentic soul of the region.
                </p>
                <p>
                  Today, Northeast Dreamz stands as a trusted partner for travelers seeking bespoke, meaningful journeys. We combine 
                  local expertise, personalized service, and a commitment to sustainable tourism to create experiences that leave lasting 
                  impressions and create lifelong memories.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden premium-shadow-lg"
            >
              <Image
                src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop"
                alt="Northeast India Landscape"
                fill
                className="object-cover"
                unoptimized={true}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 md:p-10 rounded-3xl premium-shadow-lg border border-brand-primary/10"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center">
                  <Compass className="w-8 h-8 text-brand-primary" />
                </div>
                <h3 className="text-3xl font-bold text-brand-primary section-title">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                To unlock the hidden treasures of Northeast India for travelers worldwide, creating authentic, 
                immersive experiences that celebrate the region's natural beauty, rich cultures, and warm hospitality. 
                We strive to be the bridge between curious travelers and the magical world of the Northeast.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 md:p-10 rounded-3xl premium-shadow-lg border border-brand-primary/10"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-brand-primary" />
                </div>
                <h3 className="text-3xl font-bold text-brand-primary section-title">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                To become the most trusted and sought-after travel partner for Northeast India, known for our 
                commitment to excellence, authenticity, and creating transformative travel experiences. We envision 
                a future where the Northeast's beauty and culture are celebrated and preserved through responsible tourism.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 section-title">
              What We Stand For
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our core values guide everything we do, ensuring every journey is meaningful and memorable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-brand-primary/5 to-brand-secondary/10 border border-brand-primary/10 hover:border-brand-primary/30 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-brand-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-primary mb-3 section-title">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={sectionRef}
        className="py-20 md:py-28 bg-gradient-to-b from-brand-primary via-brand-primary to-brand-primary/90 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1464822759844-d150ad6d0e0b?w=1920&h=1080&fit=crop"
            alt="Northeast India"
            fill
            className="object-cover"
            unoptimized={true}
          />
        </div>
        <motion.div 
          style={{ y, opacity }}
          className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 section-title text-white">
              Our Journey in Numbers
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold mb-2 text-white">
                  {stat.number}
                </div>
                <div className="text-white/90 text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 section-title">
              Why Choose Northeast Dreamz?
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We go beyond traditional travel planning to create experiences that touch your heart and soul.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Local Expertise',
                description: 'Our team has deep roots in the Northeast, giving you insider access to the best experiences and hidden gems.',
              },
              {
                title: 'Bespoke Itineraries',
                description: 'Every trip is custom-designed to match your interests, pace, and preferences. No cookie-cutter tours here.',
              },
              {
                title: 'Premium Accommodations',
                description: 'We carefully select homestays, boutique lodges, and unique properties that offer comfort and authentic local charm.',
              },
              {
                title: '24/7 Support',
                description: 'Our team is with you throughout your journey, ensuring everything runs smoothly and you feel supported at every step.',
              },
              {
                title: 'Sustainable Tourism',
                description: "We're committed to responsible travel that benefits local communities and preserves the region's natural beauty.",
              },
              {
                title: 'Cultural Immersion',
                description: 'Experience the Northeast through local interactions, traditional meals, cultural performances, and authentic experiences.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-brand-primary/5 to-transparent border border-brand-primary/10 hover:border-brand-primary/30 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-brand-primary mb-3 section-title">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer showCTA={true} />
      <WhatsAppButton />
    </main>
  )
}
