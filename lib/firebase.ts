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

