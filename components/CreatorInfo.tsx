import Link from 'next/link'
import Image from 'next/image'
import { shortenAddress, shortenDescription } from '../helpers'

interface CreatorProps {
  address: string
  name: string
  description: string
  profilePicture: string
}

const CreatorInfo = (creator: CreatorProps) => {
  return (
    <Link href={'/creator/' + creator.address} passHref>
      <div className="rounded-xl border-violet-200 border-4 p-7 space-y-5 cursor-pointer h-80 hover:shadow-xl hover:shadow-violet-200/70 transition ease-in-out">
        <div className="flex place-content-between items-center">
          <div className="flex items-center space-x-6">
            <Image
              src={creator.profilePicture}
              alt={creator.name}
              className="rounded-full"
              width="100px"
              height="100px"
            />
            <h1 className="text-2xl font-bold inline"> {creator.name}</h1>
          </div>
          <span className="text-slate-500">
            {shortenAddress(creator.address)}
          </span>
        </div>
        <div className="text-lg text-slate-700">
          {shortenDescription(creator.description)}
        </div>
      </div>
    </Link>
  )
}

export default CreatorInfo
