import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { useContractReads, useAccount } from 'wagmi'
import SenderStreamInfo from '../components/SenderStreamInfo'
import { KOVAN_TESTNET_ADDRESS, CONTRACT_ABI } from '../constants'

const Profile: NextPage = () => {
  const { address, isConnected } = useAccount()
  const [sendingStreams, setSendingStreams] = useState<any>([])

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
    ],
  })

  useEffect(() => {
    if (!!data) {
      console.log('data: ', data[0])
      setSendingStreams(data[0])
    }
  }, [data])

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div>
        <h1 className="text-2xl text-slate-800 font-semibold uppercase">
          Sending Streams
        </h1>
        <table className="table-fixed mt-4">
          <thead className="border-b-2 border-slate-400">
            <tr>
              <th className="rounded-lg px-4 py-2 border-b-2 border-slate-200 text-left text-sm font-semibold text-slate-800 uppercase">
                Recipient
              </th>
              <th className="px-4 py-2 border-b-2 border-slate-200 text-left text-sm font-semibold text-slate-800 uppercase">
                Start Date
              </th>
              <th className="px-4 py-2 border-b-2 border-slate-200 text-left text-sm font-semibold text-slate-800 uppercase">
                End Date
              </th>
              <th className="px-4 py-2 border-b-2 border-slate-200 text-left text-sm font-semibold text-slate-800 uppercase">
                Initial Deposit
              </th>
              <th className="px-4 py-2 border-b-2 border-slate-200 text-left text-sm font-semibold text-slate-800 uppercase">
                Sent
              </th>
              <th className="rounded-lg px-4 py-2 border-b-2 border-slate-200 text-left text-sm font-semibold text-slate-800 uppercase">
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
    </div>
  )
}

export default Profile
