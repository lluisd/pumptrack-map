const { withPlaiceholder } = require("@plaiceholder/next");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'pumptrack.azureedge.net'],
    //disableStaticImages: true
  }
}

module.exports = withPlaiceholder(nextConfig)
