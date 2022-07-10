/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    KOVAN_RPC_URL: process.env.KOVAN_RPC_URL,
  },
  images: {
    domains: ['ipfs.infura.io'],
  },
}

module.exports = nextConfig
