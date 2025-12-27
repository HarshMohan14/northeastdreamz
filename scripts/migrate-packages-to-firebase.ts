/**
 * Migration Script: Migrate Static Packages to Firebase
 * 
 * This script migrates all static packages from PACKAGE_DATA to Firebase.
 * Run this script once to move all packages to the database.
 * 
 * Usage:
 *   npx tsx scripts/migrate-packages-to-firebase.ts
 * 
 * Or if you have ts-node:
 *   ts-node scripts/migrate-packages-to-firebase.ts
 */

import { PACKAGE_DATA } from '../lib/data'
import { savePackage, PackageData } from '../lib/firebase'

async function migratePackages() {
  console.log('🚀 Starting package migration to Firebase...')
  console.log(`📦 Found ${PACKAGE_DATA.length} packages to migrate\n`)

  let successCount = 0
  let errorCount = 0

  for (const pkg of PACKAGE_DATA) {
    try {
      // Convert Package to PackageData format (remove id as Firebase will generate it)
      const packageData: PackageData = {
        state: pkg.state,
        name: pkg.name,
        cost: pkg.cost,
        days: pkg.days,
        image: pkg.image,
        itinerary: pkg.itinerary,
        dates: pkg.dates,
        gallery: pkg.gallery,
        availableDates: pkg.availableDates,
        pdfUrl: pkg.pdfUrl,
      }

      await savePackage(packageData)
      successCount++
      console.log(`✅ Migrated: ${pkg.name} (${pkg.state})`)
    } catch (error) {
      errorCount++
      console.error(`❌ Error migrating ${pkg.name}:`, error)
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log(`✅ Successfully migrated: ${successCount} packages`)
  if (errorCount > 0) {
    console.log(`❌ Failed to migrate: ${errorCount} packages`)
  }
  console.log('='.repeat(50))
  console.log('\n✨ Migration complete!')
  console.log('💡 You can now update your code to load packages only from Firebase.')
}

// Run migration
migratePackages()
  .then(() => {
    console.log('\n🎉 All done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Migration failed:', error)
    process.exit(1)
  })
