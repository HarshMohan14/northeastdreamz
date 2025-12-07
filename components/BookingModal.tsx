'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { submitBooking } from '@/lib/firebase'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  packageName: string
  packageDescription: string
}

export default function BookingModal({ isOpen, onClose, packageName, packageDescription }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plannedVisit: '',
    groupType: '',
    needBookingHelp: false,
    preferences: [] as string[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showError, setShowError] = useState(false)

  const groupTypes = ['Solo Traveler', 'Couple', 'Family', 'Friends Group', 'Corporate Group', 'Other']
  const preferences = ['Adventure', 'Hiking', 'Nature & Wildlife', 'Culture & Heritage', 'Food & Cuisine', 'Photography', 'Relaxation', 'Festivals & Events']

  const handlePreferenceToggle = (pref: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter(p => p !== pref)
        : [...prev.preferences, pref]
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await submitBooking({
        ...formData,
        packageName,
        packageDescription,
      })

      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        plannedVisit: '', 
        groupType: '', 
        needBookingHelp: false, 
        preferences: [] 
      })
      setShowSuccessDialog(true)
    } catch (error) {
      setShowError(true)
      setTimeout(() => setShowError(false), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto premium-shadow-lg relative p-8"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-brand-primary p-2 rounded-full bg-white transition"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-3xl font-bold text-brand-primary mb-2 section-title">
                {packageName.includes(':') ? `Book: ${packageName.split(': ')[1]}` : 'Plan Your Dream Trip'}
              </h3>
              <p className="text-gray-600 mb-6">We'll reach out to finalize your bespoke journey.</p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary transition"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary transition"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number (For call-back)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary transition"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="plannedVisit" className="block text-sm font-medium text-gray-700 mb-1">
                    When do you plan to visit?
                  </label>
                  <input
                    type="month"
                    id="plannedVisit"
                    name="plannedVisit"
                    value={formData.plannedVisit}
                    onChange={(e) => setFormData({ ...formData, plannedVisit: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary transition"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="groupType" className="block text-sm font-medium text-gray-700 mb-1">
                    Travel Group Type
                  </label>
                  <select
                    id="groupType"
                    name="groupType"
                    value={formData.groupType}
                    onChange={(e) => setFormData({ ...formData, groupType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary transition"
                  >
                    <option value="">Select group type</option>
                    {groupTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.needBookingHelp}
                      onChange={(e) => setFormData({ ...formData, needBookingHelp: e.target.checked })}
                      className="w-5 h-5 text-brand-primary border-gray-300 rounded focus:ring-brand-primary"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Would you like us to help make bookings?
                    </span>
                  </label>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What interests you most? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {preferences.map(pref => (
                      <label
                        key={pref}
                        className={`flex items-center space-x-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.preferences.includes(pref)
                            ? 'border-brand-primary bg-brand-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.preferences.includes(pref)}
                          onChange={() => handlePreferenceToggle(pref)}
                          className="w-4 h-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary"
                        />
                        <span className="text-sm text-gray-700">{pref}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-brand-accent text-white font-bold text-lg rounded-xl premium-button hover:bg-opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit & Request Call'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccessDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={() => {
              setShowSuccessDialog(false)
              onClose()
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ 
                duration: 0.4, 
                type: "spring", 
                stiffness: 300, 
                damping: 25 
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-md premium-shadow-2xl relative p-8"
            >
              <div className="text-center">
                <div className="mb-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                    }}
                    transition={{ 
                      delay: 0.2,
                      type: "spring", 
                      stiffness: 200, 
                      damping: 15 
                    }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-primary/10 flex items-center justify-center relative"
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-brand-primary/20"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: 0.4,
                        type: "spring", 
                        stiffness: 200, 
                        damping: 15 
                      }}
                    >
                      <svg 
                        className="w-8 h-8 text-brand-primary" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <motion.path 
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ 
                            delay: 0.6,
                            duration: 0.5,
                            ease: "easeInOut"
                          }}
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={3} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                    </motion.div>
                  </motion.div>
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="text-2xl font-bold text-brand-primary mb-3 section-title"
                  >
                    Thank you for submitting your enquiry,
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.4 }}
                    className="text-gray-700 text-lg leading-relaxed"
                  >
                    We will be contacting you to plan your dream trip
                  </motion.p>
                </div>
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowSuccessDialog(false)
                    onClose()
                  }}
                  className="w-full py-3 bg-brand-accent text-white font-bold text-lg rounded-xl premium-button hover:bg-opacity-90 transition-all"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 bg-red-600 text-white px-6 py-4 rounded-xl premium-shadow-lg z-[80]"
          >
            <div className="flex items-center space-x-2">
              <span>Error: Failed to save booking. Please try again.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

