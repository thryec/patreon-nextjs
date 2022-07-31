import twitter from '../public/twitter.svg'
import github from '../public/github.svg'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className="text-center pb-20 border-t-4 border-slate-200">
      <h1 className="text-6xl font-extrabold py-14">Connect.</h1>
      <div className="space-x-10">
        <a
          href="https://twitter.com/circleofliife"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={twitter} height={35} width={35} alt="twitter logo" />
        </a>
        <a
          href="https://twitter.com/circleofliife"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={github} height={35} width={35} alt="github logo" />
        </a>
      </div>
    </div>
  )
}

export default Footer
