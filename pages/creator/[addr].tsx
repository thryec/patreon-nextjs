import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import StreamInfo from '../../components/StreamInfo'
import Spinner from '../../components/Spinner'
import { shortenAddress } from '../../helpers'
import { useContractReads, useAccount } from 'wagmi'
import Image from 'next/image'
import { KOVAN_TESTNET_ADDRESS, CONTRACT_ABI } from '../../constants'

const Creator: NextPage = () => {
  const [profile, setProfile] = useState<any>()
  const [ipfsHash, setIpfsHash] = useState<any>()
  const [isFetched, setIsFetched] = useState<boolean>()
  const [profileExists, setProfileExists] = useState<boolean>()
  const [receivingStreams, setReceivingStreams] = useState<any>([])
  const { address } = useAccount()

  const router = useRouter()
  const { addr } = router.query

  const contract = {
    addressOrName: KOVAN_TESTNET_ADDRESS,
    contractInterface: CONTRACT_ABI,
  }

  const { data, isError, isLoading, status } = useContractReads({
    contracts: [
      { ...contract, functionName: 'getProfile', args: addr },
      { ...contract, functionName: 'getAllStreamsByRecipient', args: addr },
    ],
  })

  const fetchIpfsInfo = async () => {
    if (!!data) {
      const res = await fetch(ipfsHash)
      const info = await res.json()
      setProfile(info)
    }
  }

  useEffect(() => {
    if (!!profile && !!receivingStreams) {
      setIsFetched(true)
    }
  }, [profile, receivingStreams])

  useEffect(() => {
    if (!!ipfsHash) {
      setProfileExists(true)
      fetchIpfsInfo()
    } else if (ipfsHash === '') {
      setIsFetched(true)
      setProfileExists(false)
    }
  }, [ipfsHash])

  useEffect(() => {
    if (!!data) {
      setIpfsHash(data[0])
      setReceivingStreams(data[1])
    }
  }, [data])

  return (
    <div>
      {isFetched && profileExists ? (
        <div className="flex 2xl:mx-96 xl:mx-72 lg:mx-40 md:mx-20 h-screen">
          <div className="w-1/3">
            <Image
              src={profile.avatar}
              width="150px"
              height="150px"
              alt="avatar"
              className="rounded-full"
            />
            <h1 className="text-3xl font-semibold mt-10">{profile.name}</h1>
            <span className="text-slate-500 mb-4 block">
              {shortenAddress(profile.walletAddress)}
            </span>
            {addr !== address && (
              <Link href={'../contribute/' + addr} passHref>
                <button className="px-4 py-2 bg-violet-500 rounded-md text-white font-bold block">
                  subscribe!
                </button>
              </Link>
            )}

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
          <div className="w-2/3 space-y-10">
            <div className="flex place-content-around">
              <div>
                <h1 className="text-xl text-slate-800 font-semibold">
                  ETH Received
                  {/* get all streams by receiver, sum(deposit - remaining balance) */}
                  {/* how to track tipped ETH? remove tipETH function? */}
                </h1>
                <div className="rounded-md p-8 m-2 font-bold text-xl bg-white">
                  10 ETH
                </div>
              </div>
              <div>
                <h1 className="text-xl text-slate-800 font-semibold">
                  Claimable ETH
                  {/* sum all claimable eth in */}
                </h1>
                <div className="rounded-md p-8 m-2 font-bold text-xl bg-white">
                  10 ETH
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-xl text-slate-800 font-semibold">
                Live Streams
              </h1>
              {/* table  */}
              <table className="table-fixed mt-4">
                <thead className="bg-white border-b-2 border-slate-200">
                  <tr>
                    <th className="rounded-lg px-4 py-2 border-b-2 border-slate-200 text-left font-semibold text-slate-700 uppercase">
                      Contributor
                    </th>
                    <th className="px-4 py-2 border-b-2 border-slate-200 text-left font-semibold text-slate-700 uppercase">
                      Start Time
                    </th>
                    <th className="px-4 py-2 border-b-2 border-slate-200 text-left font-semibold text-slate-700 uppercase">
                      End Time
                    </th>
                    <th className="px-4 py-2 border-b-2 border-slate-200 text-left font-semibold text-slate-700 uppercase">
                      Claimble Amount
                    </th>
                    <th className="px-4 py-2 border-b-2 border-slate-200 text-left font-semibold text-slate-700 uppercase">
                      Remaining Amount
                    </th>
                    <th className="rounded-lg px-4 py-2 border-b-2 border-slate-200 text-left font-semibold text-slate-700 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {receivingStreams &&
                    receivingStreams.map((stream: any, index: any) => (
                      <StreamInfo
                        key={stream.streamId}
                        streamId={stream.streamId}
                        sender={stream.sender}
                        recipient={stream.recipient}
                        isActive={stream.isActive}
                        deposit={stream.deposit}
                        remainingBalance={stream.remainingBalance}
                        startTime={stream.startTime}
                        stopTime={stream.stopTime}
                      />
                    ))}
                </tbody>
              </table>
              {/* table  */}
            </div>
          </div>
        </div>
      ) : isFetched ? (
        <div className="flex justify-center h-screen">
          <div className="text-xl  space-y-4">
            <p className="font-semibold">
              You don&apos;t have a Creator Profile yet :(
            </p>
            <Link href="/register" passHref>
              <p className="underline cursor-pointer text-center">
                Get one here!
              </p>
            </Link>
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
