/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  // Remove the experimental section as appDir is now stable
}

module.exports = nextConfig