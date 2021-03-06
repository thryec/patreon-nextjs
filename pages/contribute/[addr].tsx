import type { NextPage } from 'next'
import Tip from '../../components/Tip'
import Subscribe from '../../components/Subscribe'
import { shortenAddress } from '../../helpers'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Spinner from '../../components/Spinner'
import { useContractRead } from 'wagmi'

import {
  KOVAN_TESTNET_ADDRESS,
  CONTRACT_ABI,
  KOVAN_CHAIN_ID,
} from '../../constants'

const Contribute: NextPage = () => {
  const [profile, setProfile] = useState<any>()
  const [ipfsHash, setIpfsHash] = useState<any>()
  const [isFetched, setIsFetched] = useState<boolean>()
  const [recurring, setRecurring] = useState<boolean>(true)
  const router = useRouter()
  const { addr } = router.query

  const { data, isError, isLoading } = useContractRead({
    addressOrName: KOVAN_TESTNET_ADDRESS,
    contractInterface: CONTRACT_ABI,
    functionName: 'getProfile',
    args: addr,
  })

  const fetchIpfsInfo = async () => {
    if (!!data) {
      const res = await fetch(ipfsHash)
      const info = await res.json()
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
        <div className="w-full max-w-lg p-5 relative mx-auto my-auto h-screen">
          <div className="flex justify-center ">
            <h1 className="font-bold text-4xl mb-3 text-center">
              Contribute to {profile && <span>{profile.name}</span>}!
            </h1>
          </div>
          <div className="flex place-content-center space-x-8 mb-4">
            {recurring ? (
              <button
                className="border-2 border-white bg-slate-100 rounded-lg px-4 py-2 font-bold"
                onClick={() => setRecurring(true)}
              >
                Subscribe
              </button>
            ) : (
              <button
                className="hover:border-2 hover:border-slate-100 border-2 border-white rounded-lg px-4 py-2 font-bold"
                onClick={() => setRecurring(true)}
              >
                Subscribe
              </button>
            )}
            {recurring ? (
              <button
                className="hover:border-2 hover:border-slate-100 border-2 border-white rounded-lg px-4 py-2 font-bold"
                onClick={() => setRecurring(false)}
              >
                Tip
              </button>
            ) : (
              <button
                className="border-2 border-white bg-slate-100 rounded-lg px-4 py-2 font-bold"
                onClick={() => setRecurring(false)}
              >
                Tip
              </button>
            )}
          </div>
          {recurring && profile ? (
            <Subscribe recipientAddress={addr} recipientName={profile.name} />
          ) : (
            profile && (
              <Tip recipientAddress={addr} recipientName={profile.name} />
            )
          )}
        </div>
      ) : (
        <div className="flex justify-center h-screen">
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default Contribute
