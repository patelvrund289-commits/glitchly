/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for edge runtime
  images: {
    // Use Cloudflare Images or unoptimized for static export
    unoptimized: true,
  },
  // Ensure proper handling of client-side features
  transpilePackages: ['@cloudflare/next-on-pages'],
}

module.exports = nextConfig
