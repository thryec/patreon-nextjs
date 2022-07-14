import { ethers } from 'ethers'
import { shortenAddress } from '../helpers'

interface StreamInfoProps {
  sender: string
  recipient: string
  isActive: boolean
  deposit: number
  remainingBalance: number
  startTime: number
  stopTime: number
}

const StreamInfo = ({
  sender,
  recipient,
  isActive,
  deposit,
  remainingBalance,
  startTime,
  stopTime,
}: StreamInfoProps) => {
  console.log('current unix timestamp: ', Date.now())
  const startDate = new Date(startTime * 1000).toLocaleDateString()
  const stopDate = new Date(stopTime * 1000).toLocaleDateString()

  return (
    <tr className="bg-white text-sm border-4 border-slate-100">
      <td className="px-4 py-2 rounded-md">{shortenAddress(sender)}</td>
      <td className="px-4 py-2 rounded-md">{startDate}</td>
      <td className="px-4 py-2 rounded-md">{stopDate}</td>
      <td className="px-4 py-2 rounded-md">{deposit - remainingBalance}</td>
      <td className="px-4 py-2 rounded-md">
        {ethers.utils.formatEther(remainingBalance)} ETH
      </td>
      <td className="px-4 py-2 rounded-md">
        <button className="text-sm font-bold rounded-md bg-violet-500 text-white px-4 py-2 hover:bg-violet-600">
          Withdraw
        </button>
      </td>
    </tr>
  )
}

export default StreamInfo
