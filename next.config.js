/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['picsum.photos']
  },
  i18n: {
    locales: ['default', 'en-sg', 'en-ph', 'en-my'],
    defaultLocale: 'default',
    localeDetection: false
  },
  trailingSlash: true,
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = 'cheap-module-source-map'
    }
    return config
  },
  env: {
    baseURL: process.env.NEXT_PUBLIC_OMH_BASE_URL,
    baseApiUrl: process.env.NEXT_PUBLIC_OMH_API_BASE_URL,
    apiKey: process.env.NEXT_PUBLIC_OMH_API_KEY,
    launchDarklyClient: process.env.NEXT_PUBLIC_LAUNCHDARKLY_SDK_CLIENT_SIDE_ID,
    rudderstackKey: process.env.NEXT_PUBLIC_RUDDERSTACK_KEY,
    rudderstackURL: process.env.NEXT_PUBLIC_RUDDERSTACK_URL
  }
}

module.exports = nextConfig
