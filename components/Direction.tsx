import Link from 'next/link'
import { useRef } from 'react'

interface DirectionProps {
  ref: object
}

const Direction = ({ ref }: DirectionProps) => {
  return (
    <div className="flex justify-center space-x-6 mt-40 mb-40">
      <Link href="/register" passHref>
        <button className="bg-pink-400 py-2 px-4 rounded-lg text-white font-bold">
          I&apos;m a Creator
        </button>
      </Link>
      <button className="bg-pink-400 py-2 px-4 rounded-lg text-white font-bold">
        I&apos;m a Suppporter
      </button>
    </div>
  )
}

export default Direction
