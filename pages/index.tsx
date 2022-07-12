import type { NextPage } from 'next'
import { ethers } from 'ethers'
import CreatorInfo from '../components/CreatorInfo'
import { TESTNET_ADDRESS, CONTRACT_ABI } from '../constants'
import Link from 'next/link'
import Landing from '../components/Landing'
import { useState, useEffect } from 'react'
import { useContract, useSigner } from 'wagmi'
import { useRef } from 'react'

const Home: NextPage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [profileData, setProfileData] = useState<any>([])
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  // const { data: signer } = useSigner()

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.KOVAN_RPC_URL
  )

  const contract = useContract({
    addressOrName: TESTNET_ADDRESS,
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
    // if (contract) {
    const fetchData = async () => {
      await fetchAllProfiles()
      setIsLoaded(true)
    }
    fetchData()
    // }
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
    <div className="flex justify-center max-h-screen">
      <div>
        <Landing handleSupporterClick={handleSupporterClick} />
        <div className="bg-gray-100 h-screen pt-20" ref={ref}>
          <div className="grid grid-cols-3 gap-10 px-60">
            {isLoaded && profileCards}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
