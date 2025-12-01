import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Northeast Dreamz - Bespoke Travel Experiences in Northeast India',
  description: 'Northeast Dreamz - Curated, bespoke travel experiences in the mystical lands of Northeast India. Explore Meghalaya, Assam, Arunachal Pradesh, and Sikkim with premium, personalized itineraries.',
  keywords: 'Northeast Dreamz, Northeast India travel, Meghalaya tours, Assam travel, Arunachal Pradesh, Sikkim packages, bespoke travel, curated experiences, luxury travel Northeast India',
  authors: [{ name: 'Northeast Dreamz' }],
  openGraph: {
    title: 'Northeast Dreamz - Bespoke Travel Experiences',
    description: 'Curated, bespoke travel experiences in the mystical lands of Northeast India',
    type: 'website',
    locale: 'en_US',
    siteName: 'Northeast Dreamz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Northeast Dreamz - Bespoke Travel Experiences',
    description: 'Curated, bespoke travel experiences in the mystical lands of Northeast India',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://northeastdreamz.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              name: 'Northeast Dreamz',
              description: 'Curated, bespoke travel experiences in Northeast India',
              url: 'https://northeastdreamz.com',
              logo: 'https://northeastdreamz.com/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-99000-00000',
                contactType: 'Customer Service',
                email: 'info@northeastdreamz.com',
              },
              areaServed: {
                '@type': 'State',
                name: ['Meghalaya', 'Assam', 'Arunachal Pradesh', 'Sikkim'],
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}

