import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import StreamInfo from '../../components/StreamInfo'
import Spinner from '../../components/Spinner'
import { shortenAddress } from '../../helpers'
import { useContractRead } from 'wagmi'
import Image from 'next/image'
import { KOVAN_TESTNET_ADDRESS, CONTRACT_ABI } from '../../constants'

const Creator: NextPage = () => {
  const [profile, setProfile] = useState<any>()
  const [ipfsHash, setIpfsHash] = useState<any>()
  const [isFetched, setIsFetched] = useState<boolean>()

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
      // console.log('profile info: ', info)
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
        <div className="flex mx-72 h-screen">
          <div className="w-1/3">
            <Image
              src={profile.avatar}
              width="150px"
              height="150px"
              alt="avatar"
              className="rounded-full"
            />
            <h1 className="text-3xl font-semibold mt-10">{profile.name}</h1>
            <span className="text-sm text-slate-500 mb-4 block">
              {shortenAddress(profile.walletAddress)}
            </span>
            <Link href={'../contribute/' + addr} passHref>
              <button className="px-4 py-2 bg-violet-500 rounded-md text-white font-bold block">
                subscribe!
              </button>
            </Link>
            <div className="space-y-4 mt-6">
              {!!profile.twitter && (
                <div className="space-y-2">
                  <h5 className="text-slate-500">Twitter</h5>
                  <a
                    href={profile.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    @{profile.twitter.substring(20)}
                  </a>
                </div>
              )}
              {!!profile.instagram && (
                <div className="space-y-2">
                  <h5 className="text-slate-500">Instagram</h5>
                  <a
                    href={profile.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    @
                    {profile.instagram.substring(
                      26,
                      profile.instagram.length - 1
                    )}
                  </a>
                </div>
              )}
              {!!profile.github && (
                <div className="space-y-2">
                  <h5 className="text-slate-500">GitHub</h5>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    @{profile.github.substring(19, profile.github.length)}
                  </a>
                </div>
              )}
              {!!profile.youtube && (
                <div className="space-y-2">
                  <h5 className="text-slate-500">Youtube</h5>
                  <a
                    href={profile.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    @{profile.youtube.substring(26, profile.youtube.length)}
                  </a>
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
                Receiving
              </h1>
              <div className="space-y-4 mt-4">
                <StreamInfo />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center h-screen">
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default Creator
