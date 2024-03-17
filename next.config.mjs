/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gatsby.vdisain.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
