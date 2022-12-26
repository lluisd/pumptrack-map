const { withPlaiceholder } = require("@plaiceholder/next");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  concurrentFeatures: true,
  images: {
    dangerouslyAllowSVG: true,
    reactStrictMode: true,
    minimumCacheTTL: 60,
    domains: ['localhost', 'pumptrack.azureedge.net'],
    //disableStaticImages: true
  }
}

module.exports = withPlaiceholder(nextConfig)
