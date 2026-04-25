import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  experimental: {
    viewTransition: true,
  },
  reactCompiler: true,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
}

export default nextConfig
