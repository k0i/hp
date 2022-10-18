/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   swcMinify: false,
   images: {
      domains: ['wakatime.com', 'images.unsplash.com'],
   },
}

module.exports = nextConfig
