import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { useContractReads, useAccount } from 'wagmi'
import SenderStreamInfo from '../components/SenderStreamInfo'
import { KOVAN_TESTNET_ADDRESS, CONTRACT_ABI } from '../constants'

const Profile: NextPage = () => {
  const { address } = useAccount()
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
      {
        ...contract,
        functionName: 'getAllStreamsByRecipient',
        args: address,
      },
    ],
    cacheOnBlock: true,
    onSuccess(data) {
      console.log('Success', data)
    },
    onError(error) {
      console.log('Error', error)
    },
  })

  useEffect(() => {
    if (!!data) {
      console.log('data: ', data[0])
      setSendingStreams(data[0])
    }
  }, [data])

  if (!address) {
    return (
      <div className="flex justify-center h-screen bg-gray-100">
        Please connect your wallet first!
      </div>
    )
  }

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="w-1/6 mr-8">
        <h1 className="text-2xl text-slate-800 font-semibold uppercase">
          My Stats
        </h1>
        <div>
          <h2>ETH Contributed</h2>
          <h2>ETH Received</h2>
        </div>
      </div>
      <div className="space-y-10">
        <div>
          <h1 className="text-2xl text-slate-800 font-semibold uppercase">
            Streams I'm sending
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
        <div>
          <h1 className="text-2xl text-slate-800 font-semibold uppercase">
            Streams I'm Receiving
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
    </div>
  )
}

export default Profile
