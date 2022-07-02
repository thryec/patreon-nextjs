import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'

const Header = () => {
  return (
    <div className="flex place-content-between mt-14 mx-20">
      <Link href="/" passHref>
        <h1 className="ml-48 text-4xl font-extrabold text-transparent bg-clip-text font-bold bg-gradient-to-r from-green-400 to-blue-500 cursor-pointer">
          Decentralised Patreon
        </h1>
      </Link>
      <div className="mr-48">
        <ConnectButton />
      </div>
    </div>
  )
}

export default Header
