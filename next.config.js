/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    KOVAN_RPC_URL: process.env.KOVAN_RPC_URL,
    GOERLI_RPC_URL: process.env.GOERLI_RPC_URL,
    MAINNET_RPC_URL: process.env.MAINNET_RPC_URL,
    MUMBAI_RPC_URL: process.env.MUMBAI_RPC_URL,
    POLYGON_RPC_URL: process.env.POLYGON_RPC_URL,
    INFURA_PROJECTID: process.env.INFURA_PROJECTID,
    INFURA_PROJECTSECRET: process.env.INFURA_PROJECTSECRET,
  },
  images: {
    domains: ['ipfs.infura.io', 'ipfs.w3s.link', 'ipfs.io'],
  },
}

module.exports = nextConfig
