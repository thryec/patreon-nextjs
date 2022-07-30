import Link from 'next/link'
import { useState } from 'react'
import ContributeModal from './ContributeModal'
import { shortenAddress } from '../helpers'
import Image from 'next/image'

interface CreatorProps {
  address: string
  name: string
  description: string
  profilePicture: string
}

const CreatorInfo = (creator: CreatorProps) => {
  const [contributeModal, setContributeModal] = useState<boolean>()

  return (
    <Link href={'/creator/' + creator.address} passHref>
      <div className="border-4 rounded-lg border-slate-200 p-5 space-y-5 cursor-pointer">
        {contributeModal && (
          <ContributeModal
            setContributeModal={setContributeModal}
            creatorAddress={creator.address}
            creatorName={creator.name}
          />
        )}
        <div className="flex place-content-between items-center">
          <div className="flex items-center space-x-3">
            <Image
              src={creator.profilePicture}
              alt={creator.name}
              className="rounded-full"
              width="50px"
              height="50px"
            />
            <h1 className="text-xl font-bold inline"> {creator.name}</h1>
          </div>
          <span className="text-sm text-slate-500">
            {shortenAddress(creator.address)}
          </span>
        </div>
        <div>{creator.description}</div>
        <div className="flex justify-center ">
          <button
            className="bg-violet-500 py-2 px-4 rounded-lg text-white font-bold"
            onClick={() => setContributeModal(true)}
          >
            Contribute
          </button>
        </div>
      </div>
    </Link>
  )
}

export default CreatorInfo
