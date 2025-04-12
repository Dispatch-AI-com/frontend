/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: 'http://localhost:4000/auth/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
