import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/Header'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.optimismKovan],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Decentralised Patreon',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Head>
          <title>Circle Of Life</title>
        </Head>
        <div className="bg-gray-100 ">
          <Header />
          <Component {...pageProps} />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
