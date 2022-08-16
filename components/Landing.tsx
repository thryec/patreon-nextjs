import Link from 'next/link'

interface LandingProps {
  handleSupporterClick: () => void
}

const Landing = ({ handleSupporterClick }: LandingProps) => {
  return (
    <div className="flex justify-center space-x-6 pt-12 h-screen px-52 md:px-48">
      <div>
        <div className="text-8xl font-black space-y-6">
          <p className="text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              Circle Of Life
            </span>
          </p>
          <p className="text-center">
            Support your favourite creators with ETH
          </p>
        </div>
        <div className="flex justify-center space-x-10 pt-24">
          <Link href="/register" passHref>
            <button className="bg-violet-500 py-3 px-4 rounded-lg text-2xl text-white font-semibold">
              I&apos;m a Creator
            </button>
          </Link>
          <Link href="/sub" passHref>
            <button
              className="bg-violet-500 py-2 px-3 rounded-lg text-2xl text-white font-semibold"
              // onClick={handleSupporterClick}
            >
              I&apos;m a Contributor
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Landing
