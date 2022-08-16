import type { NextPage } from 'next'
import CreatorInfo from '../components/CreatorInfo'
import { KOVAN_TESTNET_ADDRESS, CONTRACT_ABI } from '../constants'
import Landing from '../components/Landing'
import Footer from '../components/Footer'
import WaitlistForm from '../components/WaitlistForm'
import { useState, useEffect, useRef } from 'react'
import { useContractReads, chain } from 'wagmi'

const Home: NextPage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [profileData, setProfileData] = useState<any>([])

  const contract = {
    addressOrName: KOVAN_TESTNET_ADDRESS,
    contractInterface: CONTRACT_ABI,
  }

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...contract,
        functionName: 'getAllProfiles',
        chainId: chain.optimismKovan.id,
      },
    ],
    onSuccess(data) {
      console.log('Success', data[0])
    },
    onError(error) {
      console.log('Error', error)
    },
  })

  useEffect(() => {
    if (!!data) {
      const result: any = []
      data[0].map(async (el: string) => {
        const data = await fetch(el)
        const res = await data.json()
        result.push(res)
        setProfileData(result)
      })
    }
  }, [data])

  useEffect(() => {
    console.log('profile data:', profileData)
  }, [profileData])

  const handleSupporterClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth', inline: 'center' })
  }
  const profileCards = profileData.map((el: any, key: any) => {
    return (
      <CreatorInfo
        key={key}
        address={el.walletAddress}
        name={el.name}
        description={el.description}
        profilePicture={el.avatar}
      />
    )
  })

  return (
    <div className="flex justify-center h-screen">
      <div>
        <Landing handleSupporterClick={handleSupporterClick} />
        <div
          className="h-screen w-screen pt-16 border-t-4 border-slate-200"
          ref={ref}
        >
          <h1 className="text-center text-6xl font-extrabold pb-20">
            Discover Creators
          </h1>
          <div className="grid grid-cols-3 gap-12 px-60">{profileCards}</div>
        </div>
        <div className="h-screen w-screen pt-16 border-t-4 border-slate-200">
          <h1 className="text-center text-6xl font-extrabold pb-20">
            Join the waitlist
          </h1>
          <WaitlistForm />
          <h1 className="text-center text-6xl font-extrabold py-14">Connect</h1>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Home
