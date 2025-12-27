export interface Review {
  id: number
  name: string
  stars: number
  text: string
  city: string
  photo?: string // Deprecated: use photos array instead
  photos?: string[] // Array of photo URLs
  video?: string
  shortText?: string
  date?: string
}

export interface ItineraryItem {
  day: number
  title: string
  desc: string
  image?: string
}

export interface Package {
  id: number
  state: string
  name: string
  cost: string
  days: number
  image: string
  itinerary: ItineraryItem[]
  dates?: string
  gallery?: string[]
  availableDates?: { month: string; dates: number[] }[]
  pdfUrl?: string
}

export const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Anjali M.',
    stars: 5,
    text: 'The Meghalaya trip was flawless! The guide was knowledgeable, and the itinerary felt truly personalized. Northeast Dreamz made my adventure unforgettable.',
    shortText: 'The Meghalaya trip was flawless! The guide was knowledgeable, and the itinerary felt truly personalized...',
    city: 'Mumbai',
    photos: [
      '/Northeast Dreamz Image Bank/all-saints-church-shillong-meghalaya-2-attr-hero.jpg',
      '/Northeast Dreamz Image Bank/Mawlynnong.webp',
      '/Northeast Dreamz Image Bank/mawsmai_cave_5856.jpg',
      '/Northeast Dreamz Image Bank/Reach-dawki-by-road.jpg',
    ],
    date: '2 months ago',
  },
  {
    id: 2,
    name: 'Ravi K.',
    stars: 5,
    text: 'My Assam wildlife tour exceeded all expectations. Seeing the rhino in Kaziranga was a highlight. Premium service from start to finish.',
    shortText: 'My Assam wildlife tour exceeded all expectations. Seeing the rhino in Kaziranga was a highlight...',
    city: 'Delhi',
    photos: [
      '/Northeast Dreamz Image Bank/Shillong cherry blossom meghalaya.jpg',
      '/Northeast Dreamz Image Bank/sukumar-bardoloi-kWjU2ZS53U8-unsplash.jpg',
    ],
    date: '1 month ago',
  },
  {
    id: 3,
    name: 'Priya S.',
    stars: 5,
    text: "Sikkim's beauty is unmatched, and Northeast Dreamz handled all the logistics perfectly. Highly recommend their bespoke package. Worth every penny.",
    shortText: "Sikkim's beauty is unmatched, and Northeast Dreamz handled all the logistics perfectly. Highly recommend...",
    city: 'Bengaluru',
    photos: [
      '/Northeast Dreamz Image Bank/travel-to-mawlynnong-village.jpg',
      '/Northeast Dreamz Image Bank/framesbytanmay-WSpzdB7DMjA-unsplash.jpg',
      '/Northeast Dreamz Image Bank/2a0ee7f6fbe1530c0558c44723bcd9e8.jpg',
    ],
    date: '3 weeks ago',
  },
  {
    id: 4,
    name: 'David L.',
    stars: 4,
    text: 'Arunachal Pradesh was stunning. The monastic trail was challenging but rewarding. Minor hiccup with accommodation one night, but quickly resolved.',
    shortText: 'Arunachal Pradesh was stunning. The monastic trail was challenging but rewarding...',
    city: 'Kolkata',
    photos: [
      '/Northeast Dreamz Image Bank/3903757b0aa237109f58f1216a0cc3f1.jpg',
    ],
    date: '1 week ago',
  },
  {
    id: 5,
    name: 'Sarah T.',
    stars: 5,
    text: 'Absolutely amazing experience! The team at Northeast Dreamz curated the perfect trip for us. Every detail was taken care of, and we felt like VIPs throughout our journey.',
    shortText: 'Absolutely amazing experience! The team at Northeast Dreamz curated the perfect trip for us...',
    city: 'Chennai',
    date: '5 days ago',
  },
  {
    id: 6,
    name: 'Rajesh P.',
    stars: 5,
    text: 'Best travel experience in Northeast India! The local guides were exceptional, and the accommodations were top-notch. Will definitely book again for our next adventure.',
    shortText: 'Best travel experience in Northeast India! The local guides were exceptional...',
    city: 'Pune',
    photos: [
      '/Northeast Dreamz Image Bank/774575a9275321fcf868921a11d02b3e.jpg',
      '/Northeast Dreamz Image Bank/96772b9688ecc97ced4f7742bead5dd0.jpg',
    ],
    date: '3 days ago',
  },
]

export const CUSTOMER_IMAGES: string[] = [
  '/Northeast Dreamz Image Bank/all-saints-church-shillong-meghalaya-2-attr-hero.jpg',
  '/Northeast Dreamz Image Bank/Mawlynnong.webp',
  '/Northeast Dreamz Image Bank/mawsmai_cave_5856.jpg',
  '/Northeast Dreamz Image Bank/Reach-dawki-by-road.jpg',
  '/Northeast Dreamz Image Bank/Shillong cherry blossom meghalaya.jpg',
  '/Northeast Dreamz Image Bank/sukumar-bardoloi-kWjU2ZS53U8-unsplash.jpg',
  '/Northeast Dreamz Image Bank/travel-to-mawlynnong-village.jpg',
  '/Northeast Dreamz Image Bank/framesbytanmay-WSpzdB7DMjA-unsplash.jpg',
  '/Northeast Dreamz Image Bank/2a0ee7f6fbe1530c0558c44723bcd9e8.jpg',
  '/Northeast Dreamz Image Bank/3903757b0aa237109f58f1216a0cc3f1.jpg',
  '/Northeast Dreamz Image Bank/774575a9275321fcf868921a11d02b3e.jpg',
  '/Northeast Dreamz Image Bank/96772b9688ecc97ced4f7742bead5dd0.jpg',
  '/Northeast Dreamz Image Bank/b14b6fe9d5fcd60cd4ac1e4bd70bad9c.jpg',
  '/Northeast Dreamz Image Bank/d6b73400271f9b1a7d7e1e1ebe80c6cf.jpg',
  '/Northeast Dreamz Image Bank/mg2--06057f.jpg',
  '/Northeast Dreamz Image Bank/WhatsApp Image 2025-12-07 at 4.17.22 PM.jpeg',
  '/Northeast Dreamz Image Bank/WhatsApp Image 2025-12-07 at 4.17.23 PM (1).jpeg',
  '/Northeast Dreamz Image Bank/WhatsApp Image 2025-12-07 at 4.17.23 PM (2).jpeg',
  '/Northeast Dreamz Image Bank/WhatsApp Image 2025-12-07 at 4.17.23 PM.jpeg',
  '/Northeast Dreamz Image Bank/WhatsApp Image 2025-12-07 at 4.17.24 PM.jpeg',
]

/**
 * @deprecated This static package data is deprecated.
 * All packages are now managed in Firebase database.
 * This array is kept for reference only and should not be used in the application.
 * To migrate these packages to Firebase, use the migration script:
 * scripts/migrate-packages-to-firebase.js or .ts
 */
export const PACKAGE_DATA: Package[] = [
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
    pdfUrl: 'https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p/view?usp=sharing',
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
    pdfUrl: 'https://drive.google.com/file/d/2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q/view?usp=sharing',
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
    pdfUrl: 'https://drive.google.com/file/d/3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r/view?usp=sharing',
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
    pdfUrl: 'https://drive.google.com/file/d/4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s/view?usp=sharing',
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
    pdfUrl: 'https://drive.google.com/file/d/5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t/view?usp=sharing',
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
    pdfUrl: 'https://drive.google.com/file/d/6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u/view?usp=sharing',
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
    pdfUrl: 'https://drive.google.com/file/d/7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v/view?usp=sharing',
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
    pdfUrl: 'https://drive.google.com/file/d/8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w/view?usp=sharing',
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
    pdfUrl: 'https://drive.google.com/file/d/9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x/view?usp=sharing',
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
    pdfUrl: 'https://drive.google.com/file/d/0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y/view?usp=sharing',
  },
]

export const STATES = [
  {
    name: 'Meghalaya',
    icon: 'cloud-rain',
    description: 'The Abode of Clouds',
  },
  {
    name: 'Assam',
    icon: 'tea-cup',
    description: 'Land of the Rhino & Tea',
  },
  {
    name: 'Arunachal Pradesh',
    icon: 'mountain',
    description: 'The Land of Dawn-Lit Mountains',
  },
  {
    name: 'Sikkim',
    icon: 'snowy-mountain',
    description: 'Himalayan Wonderland',
  },
]

export interface BlogPost {
  id: number
  slug: string
  state: string
  title: string
  description: string
  image: string
  alt: string
  content: string
  date: string
  author: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: '5-days-in-shillong-perfect-itinerary',
    state: 'Meghalaya',
    title: '5 Days in Shillong: A Perfect Itinerary',
    description: 'From crystal clear rivers to the misty cliffs of Laitlum Canyon, plan your trip now.',
    image: '/Northeast Dreamz Image Bank/all-saints-church-shillong-meghalaya-2-attr-hero.jpg',
    alt: 'Misty hills of Meghalaya',
    date: '2024-12-15',
    author: 'Northeast Dreamz Team',
    content: `
      <p class="mb-6 text-gray-700 leading-relaxed">
        Shillong, the capital of Meghalaya, is often called the "Scotland of the East" for its rolling hills, 
        misty weather, and colonial charm. This 5-day itinerary will take you through the best that Shillong 
        and its surrounding areas have to offer.
      </p>
      
      <h2 class="text-2xl font-semibold text-brand-primary mb-4 mt-8">Day 1: Arrival and Local Exploration</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">
        Start your journey by arriving in Shillong and checking into your accommodation. Take a leisurely 
        stroll through the city center, visit the Shillong Peak for panoramic views, and explore the local 
        markets. Don't miss trying the local Khasi cuisine at one of the many restaurants.
      </p>
      
      <h2 class="text-2xl font-semibold text-brand-primary mb-4 mt-8">Day 2: Cherrapunji and Living Root Bridges</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">
        Drive to Cherrapunji, the wettest place on Earth. Visit the famous Nohkalikai Falls, explore the 
        Mawsmai Caves, and witness the incredible living root bridges. These bridges, grown over centuries 
        by the Khasi people, are a testament to sustainable engineering.
      </p>
      
      <h2 class="text-2xl font-semibold text-brand-primary mb-4 mt-8">Day 3: Dawki and Crystal Clear Rivers</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">
        Head to Dawki to see the Umngot River, one of the clearest rivers in India. The water is so clear 
        that boats appear to float in mid-air. Enjoy boating, kayaking, or simply marvel at the natural beauty. 
        Visit the nearby Mawlynnong village, known as Asia's cleanest village.
      </p>
      
      <h2 class="text-2xl font-semibold text-brand-primary mb-4 mt-8">Day 4: Laitlum Canyon and Local Culture</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">
        Experience the breathtaking Laitlum Grand Canyon with its dramatic cliffs and valleys. Later, immerse 
        yourself in the local Khasi culture by visiting traditional villages, learning about their matrilineal 
        society, and enjoying local music and dance performances.
      </p>
      
      <h2 class="text-2xl font-semibold text-brand-primary mb-4 mt-8">Day 5: Departure</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">
        Enjoy a final breakfast in Shillong, do some last-minute shopping for local handicrafts and tea, 
        and then depart with memories that will last a lifetime.
      </p>
      
      <p class="mt-8 text-gray-700 leading-relaxed">
        This itinerary can be customized based on your interests and time constraints. Whether you're a 
        nature lover, adventure seeker, or culture enthusiast, Shillong has something special for everyone.
      </p>
    `,
  },
  {
    id: 2,
    slug: 'kaziranga-magic-one-horned-rhino',
    state: 'Assam',
    title: "Kaziranga's Magic: The One-Horned Rhino",
    description: 'A complete guide to safari bookings and the best time to visit the sanctuary.',
    image: '/Northeast Dreamz Image Bank/Shillong cherry blossom meghalaya.jpg',
    alt: 'Tea gardens of Assam',
    date: '2024-12-10',
    author: 'Northeast Dreamz Team',
    content: `
      <p class="mb-6 text-gray-700 leading-relaxed">
        Kaziranga National Park is a UNESCO World Heritage Site and home to two-thirds of the world's 
        one-horned rhinoceros population. This guide will help you plan the perfect wildlife safari experience.
      </p>
      
      <h2 class="text-2xl font-semibold text-brand-primary mb-4 mt-8">About Kaziranga</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">
        Spread across 430 square kilometers, Kaziranga is one of India's most important wildlife reserves. 
        Besides the one-horned rhino, the park is home to tigers, elephants, wild water buffalo, and over 
        500 species of birds. The park is divided into four zones, each offering unique wildlife viewing opportunities.
      </p>
      
      <h2 class="text-2xl font-semibold text-brand-primary mb-4 mt-8">Best Time to Visit</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">
        The best time to visit Kaziranga is from November to April. The park is closed during the monsoon 
        season (May to October) due to flooding. November to February offers pleasant weather and excellent 
        wildlife sightings, while March to April is warmer but still good for safaris.
      </p>
      
      <h2 class="text-2xl font-semibold text-brand-primary mb-4 mt-8">Safari Options</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">
        <strong>Elephant Safari:</strong> Available in the early morning, this is the best way to get close 
        to rhinos. The elephants can navigate through tall grass where jeeps cannot go.
      </p>
      <p class="mb-4 text-gray-700 leading-relaxed">
        <strong>Jeep Safari:</strong> Available in multiple time slots throughout the day. This allows you 
        to cover more ground and see a variety of wildlife. Bookings can be made online or at the park entrance.
      </p>
      
      <h2 class="text-2xl font-semibold text-brand-primary mb-4 mt-8">What to Expect</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">
        During your safari, you'll likely spot one-horned rhinos, wild elephants, various deer species, 
        and numerous birds. If you're lucky, you might catch a glimpse of the elusive Bengal tiger. The 
        park's grasslands and wetlands create a stunning backdrop for wildlife photography.
      </p>
      
      <h2 class="text-2xl font-semibold text-brand-primary mb-4 mt-8">Tips for Visitors</h2>
      <ul class="list-disc list-inside mb-4 text-gray-700 leading-relaxed space-y-2">
        <li>Book your safaris in advance, especially during peak season</li>
        <li>Carry binoculars and a good camera</li>
        <li>Wear earth-toned clothing to blend with the environment</li>
        <li>Follow all park rules and maintain silence during safaris</li>
        <li>Stay hydrated and carry snacks</li>
      </ul>
    `,
  },
  {
    id: 3,
    slug: 'trekking-roof-of-the-world',
    state: 'Sikkim',
    title: 'Trekking to the Roof of the World',
    description: 'Insider tips for planning your high-altitude Kanchenjunga base camp trek.',
    image: '/Northeast Dreamz Image Bank/framesbytanmay-WSpzdB7DMjA-unsplash.jpg',
    alt: 'Himalayan peaks of Sikkim',
    date: '2024-12-05',
    author: 'Northeast Dreamz Team',
    content: `
      <p class="mb-6 text-gray-700 leading-relaxed">
        Sikkim offers some of the most spectacular trekking experiences in the Himalayas. The Kanchenjunga 
        base camp trek is a challenging but rewarding journey that takes you through pristine landscapes, 
        remote villages, and close to the world's third-highest peak.
      </p>
      
      <h2 class="text-2xl font-semibold text-brand-primary mb-4 mt-8">Trek Overview</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">
        The Kanchenjunga base camp trek typically takes 20-25 days and reaches altitudes of over 5,000 meters. 
        The trek takes you through diverse terrain including dense forests, alpine meadows, and high-altitude 
        deserts. You'll witness stunning views of Kanchenjunga and other Himalayan peaks throughout the journey.
      </p>
      
      <h2 class="text-2xl font-semibold text-brand-primary mb-4 mt-8">Best Time to Trek</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">
        The best months for trekking in Sikkim are March to May (spring) and September to November (autumn). 
        During these periods, the weather is generally clear, and the views are spectacular. Avoid the monsoon 
        season (June to August) due to heavy rainfall and the winter months (December to February) due to 
        extreme cold and snow.
      </p>
      
      <h2 class="text-2xl font-semibold text-brand-primary mb-4 mt-8">Physical Preparation</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">
        This is a challenging trek that requires good physical fitness. Start training at least 2-3 months 
        before your trek. Focus on cardiovascular exercises, strength training, and regular hiking. Acclimatization 
        is crucial, so plan for rest days during the trek.
      </p>
      
      <h2 class="text-2xl font-semibold text-brand-primary mb-4 mt-8">Essential Gear</h2>
      <ul class="list-disc list-inside mb-4 text-gray-700 leading-relaxed space-y-2">
        <li>High-quality trekking boots with good ankle support</li>
        <li>Layered clothing for varying temperatures</li>
        <li>Sleeping bag rated for sub-zero temperatures</li>
        <li>Trekking poles for stability</li>
        <li>Headlamp and extra batteries</li>
        <li>First aid kit and personal medications</li>
        <li>Water purification tablets</li>
      </ul>
      
      <h2 class="text-2xl font-semibold text-brand-primary mb-4 mt-8">Permits and Regulations</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">
        Trekking in Sikkim requires special permits, especially for restricted areas near the border. These 
        permits must be obtained through registered tour operators. It's mandatory to trek with a licensed 
        guide and porters. Make sure to book with a reputable agency that handles all permit formalities.
      </p>
      
      <h2 class="text-2xl font-semibold text-brand-primary mb-4 mt-8">What to Expect</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">
        The trek will take you through remote villages where you can experience local culture and hospitality. 
        You'll camp in beautiful locations with stunning mountain views. The journey is physically demanding 
        but the sense of achievement and the breathtaking scenery make it all worthwhile.
      </p>
      
      <p class="mt-8 text-gray-700 leading-relaxed">
        Remember, safety should always be your top priority. Listen to your guide, stay hydrated, and don't 
        push yourself beyond your limits. The mountains will always be there, but your health comes first.
      </p>
    `,
  },
]

