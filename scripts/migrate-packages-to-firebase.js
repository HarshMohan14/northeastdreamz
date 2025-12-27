/**
 * Migration Script: Migrate Static Packages to Firebase
 * 
 * This script migrates all static packages from PACKAGE_DATA to Firebase.
 * Run this script once to move all packages to the database.
 * 
 * Usage (Node.js):
 *   node scripts/migrate-packages-to-firebase.js
 * 
 * Make sure to set NEXT_PUBLIC_FIREBASE_CONFIG and NEXT_PUBLIC_APP_ID environment variables
 */

// This is a simplified version that can be run with Node.js
// For full TypeScript support, use the .ts version with ts-node or tsx

const { initializeApp } = require('firebase/app')
const { getFirestore, collection, addDoc } = require('firebase/firestore')

// Static packages data - copy from lib/data.ts
const PACKAGE_DATA = [
  {
    id: 1,
    state: 'Meghalaya',
    name: 'Living Roots & Waterfalls',
    cost: '₹45,000',
    days: 6,
    image: '774575a9275321fcf868921a11d02b3e.jpg',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Guwahati & Transfer to Shillong',
        desc: 'Scenic drive to Shillong, The Scotland of the East.',
      },
      {
        day: 2,
        title: 'Cherrapunji: The Wettest Place on Earth',
        desc: 'Visit the dramatic Nohkalikai Falls and the Mawsmai Caves.',
      },
      {
        day: 3,
        title: 'Double Decker Living Root Bridge Trek',
        desc: 'A challenging but rewarding trek to the famous double-decker bridge.',
      },
      {
        day: 6,
        title: 'Departure',
        desc: 'Transfer back to Guwahati Airport.',
      },
    ],
    gallery: [
      '/Northeast Dreamz Image Bank/all-saints-church-shillong-meghalaya-2-attr-hero.jpg',
      '/Northeast Dreamz Image Bank/Mawlynnong.webp',
      '/Northeast Dreamz Image Bank/mawsmai_cave_5856.jpg',
      '/Northeast Dreamz Image Bank/Reach-dawki-by-road.jpg',
    ],
    availableDates: [
      { month: 'January 2025', dates: [5, 12, 19, 26] },
      { month: 'February 2025', dates: [2, 9, 16, 23] },
      { month: 'March 2025', dates: [1, 8, 15, 22, 29] },
      { month: 'April 2025', dates: [5, 12, 19, 26] },
    ],
  },
  {
    id: 2,
    state: 'Meghalaya',
    name: 'Adventure Caves & Clear Rivers',
    cost: '₹52,000',
    days: 8,
    image: '846b1c56c5b0078b59647d3215c8b9e2.jpg',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Shillong',
        desc: 'Check-in to a boutique heritage stay and explore local markets.',
      },
      {
        day: 4,
        title: 'Dawki River & India-Bangladesh Border',
        desc: 'Boating on the crystal clear waters of Umngot River.',
      },
      {
        day: 5,
        title: 'Krem Mawmluh Expedition',
        desc: 'Caving expedition with a professional speleologist guide.',
      },
      {
        day: 8,
        title: 'Departure',
        desc: 'Transfer to Guwahati.',
      },
    ],
    gallery: [
      '/Northeast Dreamz Image Bank/Shillong cherry blossom meghalaya.jpg',
      '/Northeast Dreamz Image Bank/sukumar-bardoloi-kWjU2ZS53U8-unsplash.jpg',
      '/Northeast Dreamz Image Bank/travel-to-mawlynnong-village.jpg',
      '/Northeast Dreamz Image Bank/framesbytanmay-WSpzdB7DMjA-unsplash.jpg',
    ],
    availableDates: [
      { month: 'January 2025', dates: [10, 17, 24, 31] },
      { month: 'February 2025', dates: [7, 14, 21, 28] },
      { month: 'March 2025', dates: [7, 14, 21, 28] },
      { month: 'April 2025', dates: [4, 11, 18, 25] },
    ],
  },
  {
    id: 3,
    state: 'Meghalaya',
    name: 'Misty Shillong & Local Culture',
    cost: '₹35,000',
    days: 5,
    image: 'all-saints-church-shillong-meghalaya-2-attr-hero.jpg',
    itinerary: [
      {
        day: 1,
        title: 'Shillong Arrival',
        desc: 'Sightseeing, including All Saints Church (featured on the package).',
      },
      {
        day: 2,
        title: 'Laitlum Canyon & Elephant Falls',
        desc: 'Witness a breathtaking sunrise view at Laitlum Canyon.',
      },
      {
        day: 5,
        title: 'Departure',
        desc: 'Transfer to airport.',
      },
    ],
    gallery: [
      '/Northeast Dreamz Image Bank/2a0ee7f6fbe1530c0558c44723bcd9e8.jpg',
      '/Northeast Dreamz Image Bank/3903757b0aa237109f58f1216a0cc3f1.jpg',
      '/Northeast Dreamz Image Bank/774575a9275321fcf868921a11d02b3e.jpg',
    ],
    availableDates: [
      { month: 'January 2025', dates: [3, 10, 17, 24, 31] },
      { month: 'February 2025', dates: [7, 14, 21, 28] },
      { month: 'March 2025', dates: [7, 14, 21, 28] },
    ],
  },
  {
    id: 4,
    state: 'Assam',
    name: 'Rhino & River Cruise',
    cost: '₹32,500',
    days: 8,
    image: 'https://placehold.co/800x600/4D8F39/C9DCDD?text=One+Horned+Rhino+Kaziranga+Sunset',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Guwahati & River Brahmaputra',
        desc: 'Check into a luxury cruise ship hotel and enjoy an evening Brahmaputra cruise.',
      },
      {
        day: 2,
        title: 'Kaziranga National Park - Eastern Range',
        desc: 'Morning Elephant Safari for up-close viewing of the One-Horned Rhino.',
      },
      {
        day: 3,
        title: 'Kaziranga National Park - Western Range',
        desc: 'Afternoon Jeep Safari to spot tigers and various bird species.',
      },
      {
        day: 8,
        title: 'Departure',
        desc: 'Transfer to Jorhat airport.',
      },
    ],
    gallery: [
      '/Northeast Dreamz Image Bank/96772b9688ecc97ced4f7742bead5dd0.jpg',
      '/Northeast Dreamz Image Bank/b14b6fe9d5fcd60cd4ac1e4bd70bad9c.jpg',
      '/Northeast Dreamz Image Bank/d6b73400271f9b1a7d7e1e1ebe80c6cf.jpg',
      '/Northeast Dreamz Image Bank/mg2--06057f.jpg',
    ],
    availableDates: [
      { month: 'January 2025', dates: [8, 15, 22, 29] },
      { month: 'February 2025', dates: [5, 12, 19, 26] },
      { month: 'March 2025', dates: [5, 12, 19, 26] },
      { month: 'April 2025', dates: [2, 9, 16, 23, 30] },
    ],
  },
  {
    id: 5,
    state: 'Assam',
    name: 'Majuli Island Cultural Retreat',
    cost: '₹28,900',
    days: 5,
    image: '34375365711_bcedb321eb_b.jpg',
    itinerary: [
      {
        day: 1,
        title: 'Jorhat Arrival & Ferry to Majuli',
        desc: 'Check into a traditional Mishing chang ghar (stilt house).',
      },
      {
        day: 2,
        title: 'Majuli Satras & Monasteries',
        desc: 'Visit ancient Monastic centers (Satras) and witness masked dance.',
      },
      {
        day: 5,
        title: 'Departure',
        desc: 'Ferry and transfer out.',
      },
    ],
  },
  {
    id: 6,
    state: 'Assam',
    name: 'Tea Trails & Ahom History',
    cost: '₹38,000',
    days: 7,
    image: 'https://placehold.co/800x600/877953/C9DCDD?text=Jorhat+Tea+Estate+Colonial+Bungalow',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Dibrugarh',
        desc: 'Stay in a colonial tea bungalow with personalized service.',
      },
      {
        day: 3,
        title: 'Tea Tasting Experience',
        desc: 'Guided tour of a working estate with a master tea taster.',
      },
      {
        day: 5,
        title: 'Sivasagar Historical Ruins',
        desc: 'Explore the capital of the Ahom kingdom, including Talatal Ghar.',
      },
      {
        day: 7,
        title: 'Departure',
        desc: 'Transfer to Dibrugarh airport.',
      },
    ],
  },
  {
    id: 7,
    state: 'Arunachal Pradesh',
    name: 'Monastic Himalayan Trail',
    cost: '₹58,000',
    days: 10,
    image: 'https://placehold.co/800x600/1E3A8A/C9DCDD?text=Tawang+Monastery+Snow+Dramatic+Sky',
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Drive to Bhalukpong',
        desc: 'Start Inner Line Permit formalities and drive to the picturesque foothills.',
      },
      {
        day: 4,
        title: 'Sela Pass & Tawang',
        desc: 'Traverse the breathtaking Sela Pass and reach Tawang.',
      },
      {
        day: 5,
        title: 'Tawang Monastery & Local Sightseeing',
        desc: 'Full day exploring the second largest monastery in Asia and War Memorial.',
      },
      {
        day: 10,
        title: 'Departure',
        desc: 'Transfer from Tezpur to Guwahati Airport.',
      },
    ],
  },
  {
    id: 8,
    state: 'Arunachal Pradesh',
    name: 'Ziro Valley Festival Special',
    cost: '₹42,000',
    days: 7,
    image: 'https://placehold.co/800x600/536787/C9DCDD?text=Apatani+Tribe+Ziro+Valley+Bamboo',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Itanagar',
        desc: 'Meet local team and transfer to Ziro Valley.',
      },
      {
        day: 3,
        title: 'Apatani Culture & Village Tour',
        desc: 'Deep dive into the unique Apatani culture, famous for face tattoos and nose plugs.',
      },
      {
        day: 7,
        title: 'Departure',
        desc: 'Transfer out.',
      },
    ],
  },
  {
    id: 9,
    state: 'Sikkim',
    name: 'North Sikkim Alpine Loop',
    cost: '₹65,000',
    days: 9,
    image: 'https://placehold.co/800x600/3A5D9C/C9DCDD?text=North+Sikkim+Lachung+Valley+Snowcapped',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Gangtok',
        desc: 'Initial acclimatization day in the capital, explore MG Marg.',
      },
      {
        day: 3,
        title: 'Lachung & Yumthang Valley',
        desc: 'Explore the stunning Yumthang Valley of Flowers.',
      },
      {
        day: 5,
        title: 'Gurudongmar Lake Expedition',
        desc: 'Visit one of the highest altitude lakes in the world.',
      },
      {
        day: 9,
        title: 'Departure',
        desc: 'Transfer to Bagdogra Airport (IXB).',
      },
    ],
    gallery: [
      '/Northeast Dreamz Image Bank/WhatsApp Image 2025-12-07 at 4.17.22 PM.jpeg',
      '/Northeast Dreamz Image Bank/WhatsApp Image 2025-12-07 at 4.17.23 PM (1).jpeg',
      '/Northeast Dreamz Image Bank/WhatsApp Image 2025-12-07 at 4.17.23 PM (2).jpeg',
      '/Northeast Dreamz Image Bank/WhatsApp Image 2025-12-07 at 4.17.23 PM.jpeg',
    ],
    availableDates: [
      { month: 'January 2025', dates: [6, 13, 20, 27] },
      { month: 'February 2025', dates: [3, 10, 17, 24] },
      { month: 'March 2025', dates: [3, 10, 17, 24, 31] },
      { month: 'April 2025', dates: [7, 14, 21, 28] },
    ],
  },
  {
    id: 10,
    state: 'Sikkim',
    name: 'West Sikkim Heritage & Views',
    cost: '₹48,000',
    days: 7,
    image: '_ab95a98e-2fc4-11eb-9f6e-b84f2c2b8c49.avif',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Pelling',
        desc: 'Scenic transfer to the heart of West Sikkim.',
      },
      {
        day: 3,
        title: 'Pemayangtse Monastery & Rabdentse Ruins',
        desc: "Explore Sikkim's rich history and monastic centers.",
      },
      {
        day: 7,
        title: 'Departure',
        desc: 'Transfer to Bagdogra Airport (IXB).',
      },
    ],
  },
]

async function migratePackages() {
  // Get Firebase config from environment
  const firebaseConfigString = process.env.NEXT_PUBLIC_FIREBASE_CONFIG
  if (!firebaseConfigString) {
    console.error('❌ NEXT_PUBLIC_FIREBASE_CONFIG environment variable is not set')
    process.exit(1)
  }

  const firebaseConfig = JSON.parse(firebaseConfigString)
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const appId = process.env.NEXT_PUBLIC_APP_ID || 'default-app-id'

  console.log('🚀 Starting package migration to Firebase...')
  console.log(`📦 Found ${PACKAGE_DATA.length} packages to migrate\n`)

  let successCount = 0
  let errorCount = 0

  for (const pkg of PACKAGE_DATA) {
    try {
      // Convert Package to PackageData format (remove id as Firebase will generate it)
      const packageData = {
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
        timestamp: new Date().toISOString(),
      }

      const packagesCol = collection(db, `artifacts/${appId}/public/data/packages`)
      await addDoc(packagesCol, packageData)
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
