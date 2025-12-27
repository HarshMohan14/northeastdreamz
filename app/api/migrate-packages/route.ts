import { NextRequest, NextResponse } from 'next/server'
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore'
import { PACKAGE_DATA } from '@/lib/data'

// Debug: Log PACKAGE_DATA on import
if (typeof PACKAGE_DATA !== 'undefined') {
  console.log('📦 API Route: PACKAGE_DATA imported, length:', PACKAGE_DATA?.length || 0)
} else {
  console.error('❌ API Route: PACKAGE_DATA is undefined on import!')
}

export async function POST(request: NextRequest) {
  try {
    // Debug: Check PACKAGE_DATA at runtime
    console.log('🔍 POST Migration - PACKAGE_DATA check:', {
      exists: !!PACKAGE_DATA,
      length: PACKAGE_DATA?.length || 0,
      type: typeof PACKAGE_DATA,
      isArray: Array.isArray(PACKAGE_DATA)
    })

    // Check if PACKAGE_DATA is available
    if (!PACKAGE_DATA || PACKAGE_DATA.length === 0) {
      console.error('❌ PACKAGE_DATA is empty or not available')
      return NextResponse.json(
        { 
          error: 'No packages to migrate',
          message: 'PACKAGE_DATA is empty. Check lib/data.ts',
          packageCount: PACKAGE_DATA?.length || 0,
          debug: {
            exists: !!PACKAGE_DATA,
            isArray: Array.isArray(PACKAGE_DATA)
          }
        },
        { status: 500 }
      )
    }

    console.log(`📦 Found ${PACKAGE_DATA.length} packages to migrate`)

    // Get Firebase config from environment
    const firebaseConfigString = process.env.NEXT_PUBLIC_FIREBASE_CONFIG
    if (!firebaseConfigString) {
      return NextResponse.json(
        { error: 'NEXT_PUBLIC_FIREBASE_CONFIG environment variable is not set' },
        { status: 500 }
      )
    }

    const firebaseConfig = JSON.parse(firebaseConfigString)
    
    // Initialize Firebase (server-side)
    let app
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig)
    } else {
      app = getApps()[0]
    }
    
    const db = getFirestore(app)
    const appId = process.env.NEXT_PUBLIC_APP_ID || 'default-app-id'
    const packagesCol = collection(db, `artifacts/${appId}/public/data/packages`)

    // Check if packages already exist
    const existingPackages = await getDocs(packagesCol)
    const existingCount = existingPackages.size

    console.log(`🔍 Found ${existingCount} existing packages in database`)

    if (existingCount > 0) {
      return NextResponse.json({
        warning: `Found ${existingCount} existing packages in database. Migration will add ${PACKAGE_DATA.length} more packages (may create duplicates).`,
        existingCount,
        toMigrate: PACKAGE_DATA.length,
        proceed: false,
      })
    }

    // Migrate packages
    const results = {
      success: [] as string[],
      errors: [] as { name: string; error: string }[],
    }

    console.log(`🚀 Starting migration of ${PACKAGE_DATA.length} packages...`)

    for (const pkg of PACKAGE_DATA) {
      try {
        // Build package data and remove undefined values (Firestore doesn't allow undefined)
        const packageData: any = {
          state: pkg.state,
          name: pkg.name,
          cost: pkg.cost,
          days: pkg.days,
          image: pkg.image,
          itinerary: pkg.itinerary,
          timestamp: new Date().toISOString(),
        }

        // Only add optional fields if they have values
        if (pkg.dates !== undefined && pkg.dates !== null) {
          packageData.dates = pkg.dates
        }
        if (pkg.gallery !== undefined && pkg.gallery !== null && pkg.gallery.length > 0) {
          packageData.gallery = pkg.gallery
        }
        if (pkg.availableDates !== undefined && pkg.availableDates !== null && pkg.availableDates.length > 0) {
          packageData.availableDates = pkg.availableDates
        }
        if (pkg.pdfUrl !== undefined && pkg.pdfUrl !== null && pkg.pdfUrl.trim() !== '') {
          packageData.pdfUrl = pkg.pdfUrl
        }

        await addDoc(packagesCol, packageData)
        results.success.push(pkg.name)
        console.log(`✅ Migrated: ${pkg.name}`)
      } catch (error: any) {
        console.error(`❌ Error migrating ${pkg.name}:`, error)
        results.errors.push({
          name: pkg.name,
          error: error?.message || 'Unknown error',
        })
      }
    }

    console.log(`✨ Migration complete: ${results.success.length} success, ${results.errors.length} errors`)

    return NextResponse.json({
      success: true,
      message: `Successfully migrated ${results.success.length} packages`,
      results,
      total: PACKAGE_DATA.length,
      succeeded: results.success.length,
      failed: results.errors.length,
    })
  } catch (error: any) {
    console.error('Migration error:', error)
    return NextResponse.json(
      {
        error: 'Migration failed',
        message: error?.message || 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Force migration (ignores existing packages)
export async function PUT(request: NextRequest) {
  try {
    // Check if PACKAGE_DATA is available
    if (!PACKAGE_DATA || PACKAGE_DATA.length === 0) {
      console.error('PACKAGE_DATA is empty or not available')
      return NextResponse.json(
        { 
          error: 'No packages to migrate',
          message: 'PACKAGE_DATA is empty. Check lib/data.ts',
          packageCount: PACKAGE_DATA?.length || 0
        },
        { status: 500 }
      )
    }

    console.log(`📦 Force migration: Found ${PACKAGE_DATA.length} packages to migrate`)

    const firebaseConfigString = process.env.NEXT_PUBLIC_FIREBASE_CONFIG
    if (!firebaseConfigString) {
      return NextResponse.json(
        { error: 'NEXT_PUBLIC_FIREBASE_CONFIG environment variable is not set' },
        { status: 500 }
      )
    }

    const firebaseConfig = JSON.parse(firebaseConfigString)
    
    let app
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig)
    } else {
      app = getApps()[0]
    }
    
    const db = getFirestore(app)
    const appId = process.env.NEXT_PUBLIC_APP_ID || 'default-app-id'
    const packagesCol = collection(db, `artifacts/${appId}/public/data/packages`)

    const results = {
      success: [] as string[],
      errors: [] as { name: string; error: string }[],
    }

    console.log(`🚀 Starting force migration of ${PACKAGE_DATA.length} packages...`)

    for (const pkg of PACKAGE_DATA) {
      try {
        // Build package data and remove undefined values (Firestore doesn't allow undefined)
        const packageData: any = {
          state: pkg.state,
          name: pkg.name,
          cost: pkg.cost,
          days: pkg.days,
          image: pkg.image,
          itinerary: pkg.itinerary,
          timestamp: new Date().toISOString(),
        }

        // Only add optional fields if they have values
        if (pkg.dates !== undefined && pkg.dates !== null) {
          packageData.dates = pkg.dates
        }
        if (pkg.gallery !== undefined && pkg.gallery !== null && pkg.gallery.length > 0) {
          packageData.gallery = pkg.gallery
        }
        if (pkg.availableDates !== undefined && pkg.availableDates !== null && pkg.availableDates.length > 0) {
          packageData.availableDates = pkg.availableDates
        }
        if (pkg.pdfUrl !== undefined && pkg.pdfUrl !== null && pkg.pdfUrl.trim() !== '') {
          packageData.pdfUrl = pkg.pdfUrl
        }

        await addDoc(packagesCol, packageData)
        results.success.push(pkg.name)
      } catch (error: any) {
        results.errors.push({
          name: pkg.name,
          error: error?.message || 'Unknown error',
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully migrated ${results.success.length} packages`,
      results,
    })
  } catch (error: any) {
    console.error('Migration error:', error)
    return NextResponse.json(
      {
        error: 'Migration failed',
        message: error?.message || 'Unknown error',
      },
      { status: 500 }
    )
  }
}
