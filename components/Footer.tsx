import twitter from '../public/twitter.svg'
import github from '../public/github.svg'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className="space-x-10 text-center py-20">
      <a
        href="https://twitter.com/circleofliife"
        target="_blank"
        rel="noreferrer"
      >
        <Image src={twitter} height={35} width={35} alt="twitter logo" />
      </a>
      <a
        href="https://github.com/thryec/patreon-foundry"
        target="_blank"
        rel="noreferrer"
      >
        <Image src={github} height={35} width={35} alt="github logo" />
      </a>
    </div>
  )
}

export default Footer
