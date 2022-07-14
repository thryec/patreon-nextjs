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
        {/* <ConnectButton chainStatus="none" showBalance={false} /> */}
        <ConnectButton chainStatus="none" />
      </div>
    </div>
  )
}

export default Header
