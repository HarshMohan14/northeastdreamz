'use client'

import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, query, orderBy, doc, updateDoc, deleteDoc, Firestore } from 'firebase/firestore'

let app: FirebaseApp | undefined
let db: Firestore | undefined

export { db }

// Initialize Firebase from environment variables
let firebaseConfig: Record<string, any> = {}

try {
  const configString = process.env.NEXT_PUBLIC_FIREBASE_CONFIG
  if (configString) {
    // Handle both stringified JSON and plain JSON
    firebaseConfig = typeof configString === 'string' 
      ? JSON.parse(configString) 
      : configString
  }
} catch (error) {
  console.error('❌ Error parsing Firebase config:', error)
  if (typeof window !== 'undefined') {
    console.error('Firebase config value:', process.env.NEXT_PUBLIC_FIREBASE_CONFIG)
  }
}

// Validate Firebase config has required fields
const hasValidConfig = firebaseConfig && 
  typeof firebaseConfig === 'object' &&
  firebaseConfig.apiKey &&
  firebaseConfig.projectId

// Initialize Firebase (client-side only)
if (typeof window !== 'undefined') {
  if (hasValidConfig) {
    try {
      if (getApps().length === 0) {
        app = initializeApp(firebaseConfig)
        db = getFirestore(app)
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Firebase initialized successfully')
        }
      } else {
        app = getApps()[0]
        db = getFirestore(app)
      }
    } catch (error) {
      console.error('❌ Firebase initialization error:', error)
      console.error('Firebase config:', {
        hasApiKey: !!firebaseConfig.apiKey,
        hasProjectId: !!firebaseConfig.projectId,
        hasAuthDomain: !!firebaseConfig.authDomain,
      })
    }
  } else {
    console.warn('⚠️ Firebase config is missing or invalid. Required fields: apiKey, projectId')
    if (process.env.NODE_ENV === 'development') {
      console.warn('Check your environment variables: NEXT_PUBLIC_FIREBASE_CONFIG')
    }
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

export interface InquiryData {
  name: string
  email: string
  phone: string
  destination?: string
  travelDate?: string
  travelers?: string
  message?: string
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

export async function submitInquiry(data: InquiryData): Promise<void> {
  if (!db) {
    console.warn('Firestore not initialized. Inquiry data:', data)
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

export interface BlogPostData {
  id?: number
  slug: string
  state: string
  title: string
  description: string
  image: string
  alt: string
  content: string
  date: string
  author: string
  timestamp?: string
}

export interface PackageData {
  id?: number
  state: string
  name: string
  cost: string
  days: number
  image: string
  itinerary: Array<{ day: number; title: string; desc: string; image?: string }>
  dates?: string
  gallery?: string[]
  availableDates?: Array<{ month: string; dates: number[] }>
  pdfUrl?: string
  timestamp?: string
}

export async function saveBlog(data: BlogPostData): Promise<void> {
  if (!db) {
    console.warn('Firestore not initialized. Blog data:', data)
    return Promise.resolve()
  }

  try {
    const appId = process.env.NEXT_PUBLIC_APP_ID || 'default-app-id'
    const blogsCol = collection(db, `artifacts/${appId}/public/data/blogs`)
    
    await addDoc(blogsCol, {
      ...data,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error writing blog to Firestore:', error)
    throw error
  }
}

export async function getBlogs(): Promise<(BlogPostData & { firebaseId?: string })[]> {
  if (!db) {
    console.warn('Firestore not initialized')
    return []
  }

  try {
    const appId = process.env.NEXT_PUBLIC_APP_ID || 'default-app-id'
    const blogsCol = collection(db, `artifacts/${appId}/public/data/blogs`)
    const q = query(blogsCol, orderBy('timestamp', 'desc'))
    const querySnapshot = await getDocs(q)
    
    const blogsData: (BlogPostData & { firebaseId?: string })[] = []
    querySnapshot.forEach((docSnapshot) => {
      blogsData.push({
        firebaseId: docSnapshot.id, // Store Firebase document ID for updates/deletes
        id: blogsData.length + 1,
        ...docSnapshot.data(),
      } as BlogPostData & { firebaseId?: string })
    })
    
    return blogsData
  } catch (error) {
    console.error('Error fetching blogs from Firestore:', error)
    return []
  }
}

export async function updateBlog(firebaseId: string, data: BlogPostData): Promise<void> {
  if (!db) {
    console.warn('Firestore not initialized')
    return Promise.resolve()
  }

  try {
    const appId = process.env.NEXT_PUBLIC_APP_ID || 'default-app-id'
    const blogDoc = doc(db, `artifacts/${appId}/public/data/blogs/${firebaseId}`)
    
    await updateDoc(blogDoc, {
      ...data,
      timestamp: new Date().toISOString(), // Update timestamp
    })
  } catch (error) {
    console.error('Error updating blog in Firestore:', error)
    throw error
  }
}

export async function deleteBlog(firebaseId: string): Promise<void> {
  if (!db) {
    console.warn('Firestore not initialized')
    return Promise.resolve()
  }

  try {
    const appId = process.env.NEXT_PUBLIC_APP_ID || 'default-app-id'
    const blogDoc = doc(db, `artifacts/${appId}/public/data/blogs/${firebaseId}`)
    
    await deleteDoc(blogDoc)
  } catch (error) {
    console.error('Error deleting blog from Firestore:', error)
    throw error
  }
}

// Package Management Functions
export async function savePackage(data: PackageData): Promise<void> {
  if (!db) {
    console.warn('Firestore not initialized. Package data:', data)
    return Promise.resolve()
  }

  try {
    const appId = process.env.NEXT_PUBLIC_APP_ID || 'default-app-id'
    const packagesCol = collection(db, `artifacts/${appId}/public/data/packages`)
    
    await addDoc(packagesCol, {
      ...data,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error writing package to Firestore:', error)
    throw error
  }
}

export async function getPackages(): Promise<(PackageData & { firebaseId?: string })[]> {
  if (!db) {
    console.warn('⚠️ Firestore not initialized - cannot fetch packages')
    return []
  }

  try {
    const appId = process.env.NEXT_PUBLIC_APP_ID || 'default-app-id'
    const collectionPath = `artifacts/${appId}/public/data/packages`
    console.log(`🔍 Fetching packages from: ${collectionPath}`)
    
    const packagesCol = collection(db, collectionPath)
    
    // Try to order by timestamp, but fallback to getting all packages if timestamp doesn't exist
    let querySnapshot
    try {
      const q = query(packagesCol, orderBy('timestamp', 'desc'))
      querySnapshot = await getDocs(q)
      console.log(`✅ Successfully queried packages with timestamp ordering`)
    } catch (timestampError: any) {
      // If timestamp ordering fails, get all packages without ordering
      console.warn('⚠️ Timestamp ordering failed, fetching all packages without order:', timestampError?.message || timestampError)
      querySnapshot = await getDocs(packagesCol)
      console.log(`✅ Successfully fetched packages without ordering`)
    }
    
    const packagesData: (PackageData & { firebaseId?: string })[] = []
    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data()
      if (!data) {
        console.warn(`⚠️ Package document ${docSnapshot.id} has no data`)
        return
      }
      
      packagesData.push({
        firebaseId: docSnapshot.id,
        id: packagesData.length + 1,
        ...data,
      } as PackageData & { firebaseId?: string })
    })
    
    // Sort manually by timestamp if available, otherwise keep original order
    packagesData.sort((a, b) => {
      const aTime = a.timestamp || ''
      const bTime = b.timestamp || ''
      return bTime.localeCompare(aTime) // Descending order
    })
    
    console.log(`✅ Fetched ${packagesData.length} packages from Firebase`)
    if (packagesData.length > 0) {
      console.log('📦 Sample package:', {
        id: packagesData[0].id,
        name: packagesData[0].name,
        state: packagesData[0].state,
        firebaseId: packagesData[0].firebaseId,
      })
    }
    
    return packagesData
  } catch (error: any) {
    console.error('❌ Error fetching packages from Firestore:', error)
    console.error('Error details:', {
      message: error?.message,
      code: error?.code,
      stack: error?.stack,
    })
    return []
  }
}

export async function updatePackage(firebaseId: string, data: PackageData): Promise<void> {
  if (!db) {
    console.warn('Firestore not initialized')
    return Promise.resolve()
  }

  try {
    const appId = process.env.NEXT_PUBLIC_APP_ID || 'default-app-id'
    const packageDoc = doc(db, `artifacts/${appId}/public/data/packages/${firebaseId}`)
    
    await updateDoc(packageDoc, {
      ...data,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error updating package in Firestore:', error)
    throw error
  }
}

export async function deletePackage(firebaseId: string): Promise<void> {
  if (!db) {
    console.warn('Firestore not initialized')
    return Promise.resolve()
  }

  try {
    const appId = process.env.NEXT_PUBLIC_APP_ID || 'default-app-id'
    const packageDoc = doc(db, `artifacts/${appId}/public/data/packages/${firebaseId}`)
    
    await deleteDoc(packageDoc)
  } catch (error) {
    console.error('Error deleting package from Firestore:', error)
    throw error
  }
}

