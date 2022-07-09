import type { NextPage } from 'next'
import Link from 'next/link'
import path from 'path'
import { promises as fs } from 'fs'
import CreatorInfo from '../components/CreatorInfo'
import { creators } from '../creators'
import { useState, useEffect } from 'react'
import { useContract, useSigner } from 'wagmi'

const Home: NextPage = ({ CONTRACT_ABI, TESTNET_ADDRESS }: any) => {
  const [profiles, setProfiles] = useState()
  const { data: signer, isError, isLoading } = useSigner()

  const contract = useContract({
    addressOrName: TESTNET_ADDRESS,
    contractInterface: CONTRACT_ABI,
    signerOrProvider: signer,
  })

  const fetchAllProfiles = async () => {
    const profiles = await contract.getAllProfiles()
    console.log('profiles: ', profiles)
    profiles.map(async (el: string) => {
      const data = await fetch(el)
      const res = await data.json()
      console.log('data: ', res)
    })
  }

  useEffect(() => {
    if (contract && signer) {
      fetchAllProfiles()
    }
  }, [contract, signer])

  const creatorCards = creators.map((el) => (
    <CreatorInfo
      key={el.address}
      address={el.address}
      name={el.name}
      description={el.description}
      profilePicture={el.profilePicture}
    />
  ))

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

export const getStaticProps = async () => {
  let TESTNET_ADDRESS
  let CONTRACT_ABI
  let props = {}

  const abiDirectory = path.join(
    process.cwd(),
    '../patreon-foundry/out/Patreon.sol'
  )
  const abiFile = path.join(abiDirectory, 'Patreon.json')
  const abiDetails = await fs.readFile(abiFile, 'utf8')
  CONTRACT_ABI = JSON.parse(abiDetails.toString())

  const addressDirectory = path.join(
    process.cwd(),
    '../patreon-foundry/broadcast/Patreon.s.sol/69'
  )
  const addressFile = path.join(addressDirectory, 'run-latest.json')
  const addressDetails = await fs.readFile(addressFile, 'utf8')
  TESTNET_ADDRESS = JSON.parse(addressDetails.toString())

  props = {
    ...props,
    CONTRACT_ABI: CONTRACT_ABI.abi,
    TESTNET_ADDRESS: TESTNET_ADDRESS.transactions[0].contractAddress,
  }

  return {
    props,
  }
}
