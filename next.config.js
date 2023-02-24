const { withPlaiceholder } = require("@plaiceholder/next");
const { i18n } = require('./next-i18next.config')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    reactStrictMode: true,
    minimumCacheTTL: 31536000,
    domains: ['localhost', 'pumptrack.azureedge.net'],
    //disableStaticImages: true
  },
  i18n
}

module.exports = withPlaiceholder(nextConfig)
