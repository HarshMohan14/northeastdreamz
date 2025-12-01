export interface Review {
  id: number
  name: string
  stars: number
  text: string
  city: string
}

export interface ItineraryItem {
  day: number
  title: string
  desc: string
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
}

export const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Anjali M.',
    stars: 5,
    text: 'The Meghalaya trip was flawless! The guide was knowledgeable, and the itinerary felt truly personalized. Northeast Dreamz made my adventure unforgettable.',
    city: 'Mumbai',
  },
  {
    id: 2,
    name: 'Ravi K.',
    stars: 5,
    text: 'My Assam wildlife tour exceeded all expectations. Seeing the rhino in Kaziranga was a highlight. Premium service from start to finish.',
    city: 'Delhi',
  },
  {
    id: 3,
    name: 'Priya S.',
    stars: 5,
    text: "Sikkim's beauty is unmatched, and Northeast Dreamz handled all the logistics perfectly. Highly recommend their bespoke package. Worth every penny.",
    city: 'Bengaluru',
  },
  {
    id: 4,
    name: 'David L.',
    stars: 4,
    text: 'Arunachal Pradesh was stunning. The monastic trail was challenging but rewarding. Minor hiccup with accommodation one night, but quickly resolved.',
    city: 'Kolkata',
  },
]

export const CUSTOMER_IMAGES: string[] = [
  'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=400&fit=crop', // Meghalaya
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=400&fit=crop', // Assam Tea
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop', // Mountains
  'https://images.unsplash.com/photo-1464822759844-d150ad6d0e0b?w=400&h=400&fit=crop', // Sikkim
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop', // Northeast Landscape
  'https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=400&fit=crop', // Hills
]

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

