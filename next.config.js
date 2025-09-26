/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    loader: 'custom',
    loaderFile: './lib/imageLoader.js'
  },
  experimental: {
    esmExternals: false,
  },
};

module.exports = nextConfig;
