import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Spinner from '../components/Spinner'
import { useState, useEffect } from 'react'
import { useContractReads, useAccount } from 'wagmi'
import SenderStreamInfo from '../components/SenderStreamInfo'
import ReceiverStreamInfo from '../components/ReceiverStreamInfo'
import { KOVAN_TESTNET_ADDRESS, CONTRACT_ABI } from '../constants'
import { shortenAddress } from '../helpers'

const Profile: NextPage = () => {
  const { address } = useAccount()
  const [ipfsHash, setIpfsHash] = useState<any>()
  const [profile, setProfile] = useState<any>()
  const [profileFetched, setProfileFetched] = useState<boolean>()
  const [profileExists, setProfileExists] = useState<boolean>()
  const [dataFetched, setDataFetched] = useState<boolean>()
  const [sendingStreams, setSendingStreams] = useState<any>([])
  const [receivingStreams, setReceivingStreams] = useState<any>([])

  const contract = {
    addressOrName: KOVAN_TESTNET_ADDRESS,
    contractInterface: CONTRACT_ABI,
  }

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...contract,
        functionName: 'getAllStreamsBySender',
        args: address,
      },
      {
        ...contract,
        functionName: 'getAllStreamsByRecipient',
        args: address,
      },
      { ...contract, functionName: 'getProfile', args: address },
    ],
    cacheOnBlock: true,
    onSuccess(data) {
      console.log('Success', data)
      setDataFetched(true)
    },
    onError(error) {
      console.log('Error', error)
    },
  })

  const fetchIpfsInfo = async () => {
    if (!!data) {
      const res = await fetch(ipfsHash)
      const info = await res.json()
      setProfile(info)
    }
  }

  useEffect(() => {
    if (!!ipfsHash) {
      setProfileExists(true)
      fetchIpfsInfo()
    } else if (ipfsHash === '') {
      setProfileExists(false)
      setProfileFetched(true)
    }
  }, [ipfsHash])

  useEffect(() => {
    if (!!profile) {
      setProfileFetched(true)
    }
  }, [profile])

  useEffect(() => {
    if (!!data) {
      setSendingStreams(data[0])
      setReceivingStreams(data[1])
      setIpfsHash(data[2])
    }
  }, [data])

  if (!address) {
    return (
      <div className="flex justify-center h-screen">
        Please connect your wallet first!
      </div>
    )
  }

  return (
    <div>
      {dataFetched ? (
        <div className="flex justify-center h-screen">
          <div className="w-1/6 mr-8 space-y-8">
            {profileFetched && profileExists ? (
              <div>
                <Image
                  src={profile.avatar}
                  width="150px"
                  height="150px"
                  alt="avatar"
                  className="rounded-full"
                />
                <h1 className="text-4xl font-bold mt-10">{profile.name}</h1>
                <span className="text-lg text-slate-500 block">
                  {shortenAddress(profile.walletAddress)}
                </span>
                <span className="text-md text-slate-500 cursor-pointer hover:underline hover:underline-offset-4">
                  [edit]{' '}
                </span>
                <span className="text-md text-slate-500 cursor-pointer hover:underline hover:underline-offset-4">
                  [delete]
                </span>
                <div className="space-y-4 mt-6 text-lg">
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
            ) : profileFetched ? (
              <div className="w-1/3">Spruce up your profile! </div>
            ) : (
              <div className="space-y-8">
                <h1 className="text-3xl font-semibold uppercase">My Stats</h1>
                <div className="text-xl space-y-4">
                  <h2>ETH Contributed</h2>
                  <h2>ETH Received</h2>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-10">
            <div className="flex place-content-around">
              <div>
                <h1 className="text-2xl font-semibold">
                  ETH Received
                  {/* get all streams by receiver, sum(deposit - remaining balance) */}
                  {/* how to track tipped ETH? remove tipETH function? */}
                </h1>
                <div className="rounded-md p-8 m-2 font-bold text-2xl bg-white">
                  10 ETH
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-semibold">
                  ETH Sent
                  {/* sum all claimable eth in */}
                </h1>
                <div className="rounded-md p-8 m-2 font-bold text-2xl bg-white">
                  10 ETH
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-semibold uppercase">Sending</h1>
              <table className="table-fixed mt-4">
                <thead className="border-b-2 border-slate-400 bg-white">
                  <tr>
                    <th className="rounded-lg px-4 py-2 border-b-2 border-slate-200 text-left font-semibold uppercase">
                      Recipient
                    </th>
                    <th className="px-4 py-2 border-b-2 border-slate-200 text-left font-semibold uppercase">
                      Start Date
                    </th>
                    <th className="px-4 py-2 border-b-2 border-slate-200 text-left font-semibold uppercase">
                      End Date
                    </th>
                    <th className="px-4 py-2 border-b-2 border-slate-200 text-left font-semibold uppercase">
                      Initial Deposit
                    </th>
                    <th className="px-4 py-2 border-b-2 border-slate-200 text-left font-semibold uppercase">
                      Sent
                    </th>
                    <th className="rounded-lg px-4 py-2 border-b-2 border-slate-200 text-left font-semibold uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sendingStreams &&
                    sendingStreams.map((stream: any) => (
                      <SenderStreamInfo
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
            </div>
            <div>
              <h1 className="text-3xl font-semibold uppercase">Receiving</h1>
              <table className="table-fixed mt-4">
                <thead className="border-b-2 bg-white border-slate-400">
                  <tr>
                    <th className="rounded-lg px-4 py-2 border-b-2 border-slate-200 text-left font-semibold uppercase">
                      Recipient
                    </th>
                    <th className="px-4 py-2 border-b-2 border-slate-200 text-left font-semibold uppercase">
                      Start Date
                    </th>
                    <th className="px-4 py-2 border-b-2 border-slate-200 text-left font-semibold uppercase">
                      End Date
                    </th>
                    <th className="px-4 py-2 border-b-2 border-slate-200 text-left font-semibold uppercase">
                      Initial Deposit
                    </th>
                    <th className="px-4 py-2 border-b-2 border-slate-200 text-left font-semibold uppercase">
                      Sent
                    </th>
                    <th className="rounded-lg px-4 py-2 border-b-2 border-slate-200 text-left font-semibold uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {receivingStreams &&
                    receivingStreams.map((stream: any) => (
                      <ReceiverStreamInfo
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

export default Profile
