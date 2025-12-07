import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-semibold text-brand-primary mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Blog post not found</p>
          <Link
            href="/#blog"
            className="inline-flex items-center space-x-2 text-brand-primary hover:text-brand-accent transition-colors font-light"
          >
            <span>Back to Traveler's Journal</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
