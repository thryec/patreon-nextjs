import { ethers } from 'ethers'
import { shortenAddress } from '../helpers'
import { useContractWrite, useAccount } from 'wagmi'
import {
  KOVAN_TESTNET_ADDRESS,
  CONTRACT_ABI,
  KOVAN_CHAIN_ID,
} from '../constants'

interface StreamInfoProps {
  streamId: number
  sender: string
  recipient: string
  isActive: boolean
  deposit: number
  remainingBalance: any
  startTime: number
  stopTime: number
}

const StreamInfo = ({
  streamId,
  sender,
  deposit,
  remainingBalance,
  startTime,
  stopTime,
}: StreamInfoProps) => {
  const { address } = useAccount()

  const { write } = useContractWrite({
    addressOrName: KOVAN_TESTNET_ADDRESS,
    chainId: KOVAN_CHAIN_ID,
    contractInterface: CONTRACT_ABI,
    functionName: 'recipientWithdrawFromStream',
    args: [streamId],
    overrides: {
      from: address,
    },
    onMutate({ args, overrides }) {
      console.log('Mutate', { args, overrides })
    },
    onError(error) {
      console.log('Error', error)
    },
    onSuccess(data) {
      console.log('Success', data)
    },
  })

  const startDate = new Date(startTime * 1000).toLocaleDateString()
  const stopDate = new Date(stopTime * 1000).toLocaleDateString()
  const remainingEther = (JSON.parse(remainingBalance) / 10 ** 18).toPrecision(
    2
  )
  console.log('remaining ether: ', remainingEther)

  return (
    <tr className="bg-white text-sm border-4 border-slate-100">
      <td className="px-4 py-2">{shortenAddress(sender)}</td>
      <td className="px-4 py-2">{startDate}</td>
      <td className="px-4 py-2">{stopDate}</td>
      <td className="px-4 py-2">{deposit - remainingBalance}</td>
      <td className="px-4 py-2">{remainingEther} ETH</td>
      <td className="px-4 py-2">
        <button className="text-sm font-bold rounded-md bg-violet-500 text-white px-4 py-2 hover:bg-violet-600">
          Withdraw
        </button>
      </td>
    </tr>
  )
}

export default StreamInfo
