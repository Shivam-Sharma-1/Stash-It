/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'gateway.pinata.cloud',
      },
    ],
  },
};

export default nextConfig;
