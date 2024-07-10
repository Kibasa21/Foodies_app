/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    ...nextConfig,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'kaotxhjorcwnojdtcsrl.supabase.co',
          port: '',
          pathname: '/**'
        },
      ],
    },
  };
