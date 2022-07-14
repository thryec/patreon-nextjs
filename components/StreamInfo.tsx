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
  return (
    <div className="border-violet-500 px-6 py-4 rounded-md shadow flex place-content-between items-center bg-white">
      <span className="text-slate-600">{shortenAddress(sender)}</span>
      <span>{ethers.utils.formatEther(remainingBalance)} ETH</span>
      <button className="text-sm font-bold rounded-md bg-violet-500 text-white px-4 py-2 hover:bg-violet-600">
        Withdraw
      </button>
    </div>
  )
}

export default StreamInfo
