import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import Logo from '../components/Logo'
import { useAccount } from 'wagmi'

const Header = () => {
  const { isConnected } = useAccount()

  return (
    <div className="flex place-content-between items-center pt-10 pb-12 px-32">
      <Link href="/" passHref>
        <span className="cursor-pointer">
          <Logo />
        </span>
      </Link>
      <div className="flex items-center">
        <div className="mr-4">
          <ConnectButton showBalance={false} accountStatus="address" />
        </div>
        {isConnected && (
          <Link href="/profile" passHref>
            <button className="cursor-pointer underline underline-offset-2">
              My Profile
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
