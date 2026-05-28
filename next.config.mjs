/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sc02.alicdn.com',
      },
    ],
  },
  // Allow dev server connections from local network IP
  allowedDevOrigins: ['192.168.1.33'],
};

export default nextConfig;
