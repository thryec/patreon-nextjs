import Link from 'next/link'
import { useState } from 'react'
import ContributeModal from './ContributeModal'
import { UserCircleIcon } from '@heroicons/react/outline'
import { shortenAddress } from '../helpers'

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
        <div className="flex place-content-between items-center">
          <UserCircleIcon className="h-10 w-10 text-slate-400 inline" />
          <h1 className="text-xl font-bold inline"> {creator.name}</h1>
          <span className="text-sm text-slate-500">
            {shortenAddress(creator.address)}
          </span>
        </div>
        <div>{creator.description}</div>
        <button
          className="bg-gradient-to-r from-pink-500 to-yellow-500  py-2 px-4 rounded-lg text-white font-bold"
          onClick={() => setContributeModal(true)}
        >
          Send ETH
        </button>
        {contributeModal && (
          <ContributeModal setContributeModal={setContributeModal} />
        )}
      </div>
    </Link>
  )
}

export default CreatorInfo
