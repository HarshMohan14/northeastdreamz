'use client'

import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, signInAnonymously, Auth } from 'firebase/auth'
import { getFirestore, collection, addDoc, Firestore } from 'firebase/firestore'

let app: FirebaseApp | undefined
let auth: Auth | undefined
let db: Firestore | undefined

// Initialize Firebase (you'll need to add your config)
const firebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_CONFIG
  ? JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)
  : {}

if (typeof window !== 'undefined' && Object.keys(firebaseConfig).length > 0) {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)

    // Sign in anonymously
    signInAnonymously(auth).catch((error) => {
      console.error('Firebase Auth failed:', error)
    })
  } else {
    app = getApps()[0]
    auth = getAuth(app)
    db = getFirestore(app)
  }
}

export interface BookingData {
  name: string
  email: string
  phone: string
  packageName: string
  packageDescription: string
  plannedVisit?: string
  groupType?: string
  needBookingHelp?: boolean
  preferences?: string[]
  timestamp?: string
}

export async function submitBooking(data: BookingData): Promise<void> {
  if (!db) {
    console.warn('Firestore not initialized. Booking data:', data)
    // In development, you might want to just log the data
    return Promise.resolve()
  }

  try {
    const appId = process.env.NEXT_PUBLIC_APP_ID || 'default-app-id'
    const inquiriesCol = collection(db, `artifacts/${appId}/public/data/inquiries`)
    
    await addDoc(inquiriesCol, {
      ...data,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error writing inquiry to Firestore:', error)
    throw error
  }
}

