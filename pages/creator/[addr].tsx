import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Spinner from '../../components/Spinner'
import { shortenAddress } from '../../helpers'
import { useContractRead } from 'wagmi'
import Image from 'next/image'
import { TESTNET_ADDRESS, CONTRACT_ABI, KOVAN_CHAIN_ID } from '../../constants'

const Creator: NextPage = () => {
  const [profile, setProfile] = useState<any>()
  const [ipfsHash, setIpfsHash] = useState<any>()
  const [isFetched, setIsFetched] = useState<boolean>()

  const router = useRouter()
  const { addr } = router.query

  const { data, isError, isLoading } = useContractRead({
    addressOrName: TESTNET_ADDRESS,
    contractInterface: CONTRACT_ABI,
    functionName: 'getProfile',
    args: addr,
  })

  const fetchIpfsInfo = async () => {
    if (!!data) {
      const res = await fetch(ipfsHash)
      const info = await res.json()
      console.log('profile info: ', info)
      setProfile(info)
    }
  }

  useEffect(() => {
    if (!!profile) {
      setIsFetched(true)
    }
  }, [profile])

  useEffect(() => {
    if (!!ipfsHash) {
      fetchIpfsInfo()
    }
  }, [ipfsHash])

  useEffect(() => {
    if (!!data) {
      setIpfsHash(data)
    }
  }, [data])

  return (
    <div>
      {isFetched ? (
        <div className="flex mx-72">
          <div className="w-1/3">
            <Image
              src={profile.avatar}
              width="150px"
              height="150px"
              alt="avatar"
              className="rounded-full"
            />
            <h1 className="text-3xl font-semibold">{profile.name}</h1>
            <span className="text-sm text-slate-500">
              {shortenAddress(profile.walletAddress)}
            </span>
            <div>
              {!!profile.twitter && (
                <div>
                  <h5>Twitter</h5>
                  <span>Twitter Link</span>
                </div>
              )}
            </div>
          </div>
          <div className="w-2/3 space-y-16">
            <div className="flex place-content-between">
              <div>
                <h1 className="text-xl text-slate-800 font-semibold">
                  Earned ETH
                </h1>
              </div>
              <div>
                <h1 className="text-xl text-slate-800 font-semibold">
                  Claimable ETH
                </h1>
              </div>
            </div>
            <div>
              <h1 className="text-xl text-slate-800 font-semibold">
                Live Streams
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default Creator
