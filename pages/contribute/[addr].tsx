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
        <div className="w-full max-w-lg relative mx-auto my-auto h-screen">
          <h1 className="font-bold text-5xl mb-14 text-center">
            Contribute to {profile && <span>{profile.name}</span>}
          </h1>

          <div className="flex place-content-center space-x-12 mb-4 text-xl">
            {recurring ? (
              <button
                className="bg-slate-200 rounded-lg px-4 py-2 font-semibold"
                onClick={() => setRecurring(true)}
              >
                Subscribe
              </button>
            ) : (
              <button
                className="rounded-lg px-4 py-2 font-semibold"
                onClick={() => setRecurring(true)}
              >
                Subscribe
              </button>
            )}
            {recurring ? (
              <button
                className=" rounded-lg px-4 py-2 font-semibold"
                onClick={() => setRecurring(false)}
              >
                Tip
              </button>
            ) : (
              <button
                className="bg-slate-200  rounded-lg px-4 py-2 font-semibold"
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
