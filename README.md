# Northeast Dreamz - Premium Travel Website

A beautiful, SEO-optimized Next.js website for curated travel experiences in Northeast India.

## Features

- 🎨 **Beautiful, Premium Design** - Clean, modern UI with smooth animations
- 🚀 **SEO Optimized** - Comprehensive metadata, structured data, and semantic HTML
- ✨ **Smooth Animations** - Powered by Framer Motion for premium user experience
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🔥 **Firebase Integration** - Form submissions stored in Firestore
- 🎬 **Video Hero Section** - Engaging video background
- 🖼️ **Image Gallery** - Auto-scrolling customer gallery
- 📝 **Blog Section** - Travel guides and stories
- ⭐ **Reviews Carousel** - Customer testimonials with smooth transitions

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Firebase** - Backend for form submissions

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd northeastdreamz
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_CONFIG='{"apiKey":"...","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."}'
NEXT_PUBLIC_APP_ID=your-app-id
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
northeastdreamz/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── Navigation.tsx       # Header navigation
│   ├── HeroSection.tsx      # Hero with video background
│   ├── StatesSection.tsx    # 4 states showcase
│   ├── PackagesSection.tsx  # Travel packages
│   ├── ReviewsSection.tsx   # Customer reviews
│   ├── GallerySection.tsx   # Image gallery
│   ├── BlogSection.tsx      # Blog posts
│   ├── Footer.tsx           # Footer
│   ├── ItineraryModal.tsx   # Package itinerary modal
│   └── BookingModal.tsx     # Booking form modal
├── lib/
│   ├── data.ts              # Mock data (packages, reviews, etc.)
│   └── firebase.ts          # Firebase configuration
└── public/                   # Static assets (images, etc.)
```

## SEO Features

- Comprehensive metadata (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card metadata
- Structured data (JSON-LD) for Travel Agency
- Semantic HTML structure
- Optimized images with Next.js Image component

## Customization

### Colors

Edit `tailwind.config.ts` to customize brand colors:
```typescript
colors: {
  'brand-primary': '#0C4B4D',
  'brand-secondary': '#D4DEDF',
  'brand-accent': '#E8B900',
}
```

### Content

- Packages: Manage via Admin Dashboard or Firebase Console (all packages are in Firebase database)
- Reviews: Edit `lib/data.ts` → `MOCK_REVIEWS`
- Blog posts: Manage via Admin Dashboard or Firebase Console

### Images

Place images in the `public/` directory and reference them as `/image-name.jpg`

## Building for Production

```bash
npm run build
npm start
```

## Deployment

The site is ready to deploy on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any platform supporting Next.js

## Environment Variables

- `NEXT_PUBLIC_FIREBASE_CONFIG` - Firebase configuration JSON string
- `NEXT_PUBLIC_APP_ID` - Your app identifier for Firestore collections

## License

All rights reserved © 2025 Northeast Dreamz

# northeastdreamz
