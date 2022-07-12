import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'

const Header = () => {
  return (
    <div className="flex place-content-end pt-14 px-20 pb-16 bg-gray-100">
      <div className="mr-48">
        <ConnectButton />
      </div>
    </div>
  )
}

export default Header
