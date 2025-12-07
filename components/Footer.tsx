'use client'

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer 
      className="py-16 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(34, 139, 34, 0.15) 0%, rgba(12, 75, 77, 0.25) 50%, rgba(46, 125, 50, 0.15) 100%)',
      }}
    >
      <div className="absolute inset-0 backdrop-blur-md" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12">
          <div>
            <h4 className="text-xl font-light mb-5 section-title text-brand-primary">Northeast Dreamz</h4>
            <p className="text-sm text-gray-700 leading-relaxed font-light">
              Curating the finest bespoke travel experiences in India's hidden gems.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-light mb-5 text-brand-primary">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#states"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('#states')
                  }}
                  className="text-gray-600 hover:text-brand-primary transition-colors font-light"
                >
                  Destinations
                </a>
              </li>
              <li>
                <a
                  href="#packages"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('#packages')
                  }}
                  className="text-gray-600 hover:text-brand-primary transition-colors font-light"
                >
                  Packages
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('#reviews')
                  }}
                  className="text-gray-600 hover:text-brand-primary transition-colors font-light"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('#blog')
                  }}
                  className="text-gray-600 hover:text-brand-primary transition-colors font-light"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-brand-primary transition-colors font-light"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-light mb-5 text-brand-primary">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-primary transition-colors font-light">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-primary transition-colors font-light">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-primary transition-colors font-light">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-light mb-5 text-brand-primary">Contact</h4>
            <p className="text-sm text-gray-700 mb-2 font-light">Email: info@northeastdreamz.com</p>
            <p className="text-sm text-gray-700 mb-5 font-light">Phone: +91 99000 00000</p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-brand-primary transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-brand-primary transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-brand-primary transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600 mt-12 border-t border-brand-primary/20 pt-8 font-light">
          &copy; 2025 Northeast Dreamz. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}

