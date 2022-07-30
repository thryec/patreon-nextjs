import Link from 'next/link'

interface LandingProps {
  handleSupporterClick: () => void
}

const Landing = ({ handleSupporterClick }: LandingProps) => {
  return (
    <div className="flex justify-center space-x-6 md:pt-10 lg:pt-14 h-screen lg:px-48 px-52 md:px-48">
      <div>
        <div className="text-7xl font-extrabold cursor-pointer space-y-6">
          <p className="text-center">
            Support your favourite creators with ETH.
          </p>
          <p className="text-center">
            This is{' '}
            <span className="text-transparent bg-clip-text font-bold bg-gradient-to-r from-green-400 to-blue-500">
              Circle Of Life.
            </span>
          </p>
        </div>
        <div className="flex justify-center space-x-10 pt-24">
          <Link href="/register" passHref>
            <button className="bg-violet-500 py-3 px-4 rounded-lg text-xl text-white font-bold">
              I&apos;m a Creator
            </button>
          </Link>
          <button
            className="bg-violet-500 py-2 px-3 rounded-lg text-xl text-white font-bold"
            onClick={handleSupporterClick}
          >
            I&apos;m a Contributor
          </button>
        </div>
      </div>
    </div>
  )
}

export default Landing
