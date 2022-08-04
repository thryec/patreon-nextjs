import Link from 'next/link'
import { useState } from 'react'
import ContributeModal from './ContributeModal'
import { shortenAddress, shortenDescription } from '../helpers'
import Image from 'next/image'

interface CreatorProps {
  address: string
  name: string
  description: string
  profilePicture: string
}

const CreatorInfo = (creator: CreatorProps) => {
  return (
    <Link href={'/creator/' + creator.address} passHref>
      <div className="border-4 rounded-lg border-violet-300 p-7 space-y-5 cursor-pointer h-80">
        <div className="flex place-content-between items-center">
          <div className="flex items-center space-x-6">
            <Image
              src={creator.profilePicture}
              alt={creator.name}
              className="rounded-full"
              width="80px"
              height="80px"
            />
            <h1 className="text-2xl font-bold inline"> {creator.name}</h1>
          </div>
          <span className="text-slate-500">
            {shortenAddress(creator.address)}
          </span>
        </div>
        <div className="text-lg">{shortenDescription(creator.description)}</div>
      </div>
    </Link>
  )
}

export default CreatorInfo
