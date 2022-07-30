import type { NextPage } from 'next'
import { ethers } from 'ethers'
import CreatorInfo from '../components/CreatorInfo'
import { KOVAN_TESTNET_ADDRESS, CONTRACT_ABI } from '../constants'
import Link from 'next/link'
import Landing from '../components/Landing'
import { useState, useEffect, useRef } from 'react'
import { useContract } from 'wagmi'

const Home: NextPage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [profileData, setProfileData] = useState<any>([])
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.KOVAN_RPC_URL
  )

  const contract = useContract({
    addressOrName: KOVAN_TESTNET_ADDRESS,
    contractInterface: CONTRACT_ABI,
    signerOrProvider: provider,
  })

  const fetchAllProfiles = async () => {
    const profiles = await contract.getAllProfiles()
    console.log('all profiles:', profiles)
    const result: any = []
    profiles.map(async (el: string) => {
      const data = await fetch(el)
      const res = await data.json()
      result.push(res)
      setProfileData(result)
    })
  }

  const handleSupporterClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth', inline: 'center' })
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllProfiles()
      setIsLoaded(true)
    }
    fetchData()
  }, [])

  const profileCards = profileData.map((el: any) => {
    return (
      <CreatorInfo
        key={el.walletAddress}
        address={el.walletAddress}
        name={el.name}
        description={el.description}
        profilePicture={el.avatar}
      />
    )
  })

  return (
    <div className="flex justify-center h-screen">
      <div className="">
        <Landing handleSupporterClick={handleSupporterClick} />
        <div
          className="bg-gray-100 h-screen w-screen pt-16 border-t-2 border-slate-200"
          ref={ref}
        >
          <h1 className="text-center text-5xl font-extrabold pb-20">
            Discover Creators.
          </h1>
          <div className="grid grid-cols-3 gap-10 px-60">
            {isLoaded && profileCards}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
