import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import Logo from '../components/Logo'

const Header = () => {
  return (
    <div className="flex place-content-between items-center py-12 px-32">
      <Link href="/" passHref>
        <span className="cursor-pointer">
          <Logo />
        </span>
      </Link>

      <div>
        <ConnectButton showBalance={false} />
      </div>
    </div>
  )
}

export default Header
