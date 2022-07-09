import type { NextPage } from 'next'
import Link from 'next/link'
import CreatorInfo from '../components/CreatorInfo'
import { creators } from '../creators'
import { useEffect } from 'react'
import { useContract, useSigner } from 'wagmi'
import { TESTNET_ADDRESS, CONTRACT_ABI } from '../constants'

const Home: NextPage = () => {
  const { data: signer, isError, isLoading } = useSigner()

  const contract = useContract({
    addressOrName: TESTNET_ADDRESS,
    contractInterface: CONTRACT_ABI,
    signerOrProvider: signer,
  })

  const fetchAllProfiles = async () => {
    const profiles = await contract.getAllProfiles()
    console.log('profiles: ', profiles)
  }

  const creatorCards = creators.map((el) => (
    <CreatorInfo
      key={el.address}
      address={el.address}
      name={el.name}
      description={el.description}
      profilePicture={el.profilePicture}
    />
  ))

  useEffect(() => {
    if (contract && signer) {
      fetchAllProfiles()
    }
  }, [contract, signer])

  return (
    <div className="flex justify-center">
      <div>
        <div className="flex justify-center space-x-6 mb-20">
          <Link href="/register" passHref>
            <button className="bg-pink-400 py-2 px-4 rounded-lg text-white font-bold">
              I&apos;m a Creator
            </button>
          </Link>
          <button className="bg-pink-400 py-2 px-4 rounded-lg text-white font-bold">
            I&apos;m a Suppporter
          </button>
        </div>
        <div className="grid grid-cols-4 gap-6 mx-60">{creatorCards}</div>
      </div>
    </div>
  )
}

export default Home
