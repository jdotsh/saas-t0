/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: false
  },
  typescript: {
    ignoreBuildErrors: false
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: ''
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '64321'
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: ''
      }
    ]
  }
};

export default config;
