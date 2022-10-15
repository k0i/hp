/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   swcMinify: false,
   images: {
      domains: ['wakatime.com'],
   },
}

module.exports = nextConfig
