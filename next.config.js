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
    minimumCacheTTL: 60,
    domains: ['localhost', 'cdn-pump.311312.xyz'],
    //disableStaticImages: true
  },
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es'
  }
}

module.exports = withPlaiceholder(nextConfig)
