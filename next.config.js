/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static export for GoDaddy hosting
  trailingSlash: true, // Better for static hosting
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.mixkit.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    unoptimized: true, // Required for static export
  },
  // Optimize for SEO
  compress: true,
  poweredByHeader: false, // Remove X-Powered-By header for security
}

module.exports = nextConfig

