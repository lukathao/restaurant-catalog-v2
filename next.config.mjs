/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HOST_URL: process.env.NEXT_PUBLIC_HOST_URL
  }
};

export default nextConfig;
