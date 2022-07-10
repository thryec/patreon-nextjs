import type { NextPage } from 'next'
import path from 'path'
import { promises as fs } from 'fs'
import CreatorInfo from '../components/CreatorInfo'
import Direction from '../components/Direction'
import { useState, useEffect } from 'react'
import { useContract, useSigner } from 'wagmi'

const Home: NextPage = ({ CONTRACT_ABI, TESTNET_ADDRESS }: any) => {
  const [profileData, setProfileData] = useState<any>([])
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const { data: signer } = useSigner()

  const contract = useContract({
    addressOrName: TESTNET_ADDRESS,
    contractInterface: CONTRACT_ABI,
    signerOrProvider: signer,
  })

  const fetchAllProfiles = async () => {
    const profiles = await contract.getAllProfiles()
    // console.log('profiles: ', profiles)
    profiles.map(async (el: string) => {
      const data = await fetch(el)
      const res = await data.json()
      setProfileData((profileData: any) => [...profileData, res])
    })
    setIsLoaded(true)
  }

  useEffect(() => {
    if (contract && signer) {
      fetchAllProfiles()
    }
  }, [contract, signer])

  const profileCards = profileData.map((el: any) => {
    console.log('element: ', el)
    return (
      <CreatorInfo
        key={el.walletAddress}
        address={el.walletAddress}
        name={el.name}
        description={el.description}
        profilePicture={el.profilePicture}
      />
    )
  })

  return (
    <div className="flex justify-center">
      <div>
        <Direction />
        <div className="grid grid-cols-4 gap-6 mx-60">
          {isLoaded && profileCards}
        </div>
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
