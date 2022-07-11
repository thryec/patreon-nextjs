import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useContractWrite, useAccount } from 'wagmi'
import { TESTNET_ADDRESS, CONTRACT_ABI, KOVAN_CHAIN_ID } from '../constants'

interface SubscribeProps {
  recipientAddress: string
}

const Subscribe = ({ recipientAddress }: SubscribeProps) => {
  const [ethMonthlyAmount, setEthMonthlyAmount] = useState<any>('0.0')
  const [ethTotalAmount, setEthTotalAmount] = useState<any>('0.0')
  const [currentTime, setCurrentTime] = useState<any>()
  const [endTime, setEndTime] = useState<any>()

  const { address } = useAccount()

  const getCurrentBlockTimestamp = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.KOVAN_RPC_URL
    )
    const blockNumber = await provider.getBlockNumber()
    console.log(' blocknum:', blockNumber)
    const timestamp = (await provider.getBlock(blockNumber)).timestamp
    console.log(' current timestamp:', timestamp)
    setCurrentTime(timestamp)
  }

  const { write } = useContractWrite({
    addressOrName: TESTNET_ADDRESS,
    chainId: KOVAN_CHAIN_ID,
    contractInterface: CONTRACT_ABI,
    functionName: 'createETHStream',
    args: [recipientAddress],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(ethTotalAmount),
    },
    onError(error) {
      console.log('Error', error)
    },
    onSuccess(data) {
      console.log('Success', data)
    },
  })

  useEffect(() => {
    getCurrentBlockTimestamp()
  }, [])

  return (
    <div>
      <div>
        <p>
          I want to subscribe to <code>Creator</code> for
          <input
            type="number"
            step="0.01"
            name="amount"
            className="border border-slate-200 rounded-md my-2 mx-3 px-3 py-2"
          />
          <span className="text-slate-800 text-lg font-semibold">ETH</span> /
          month, for
          <input
            type="number"
            step="1"
            className="border border-slate-200 rounded-md my-2 mx-3 px-3 py-2"
            placeholder="0"
          />
          <span className="text-slate-800 text-lg font-semibold">Months</span>
        </p>
      </div>
      <div className="flex justify-center">
        <button className="px-6 py-2 bg-blue-500 rounded-md text-white font-bold block">
          Subscribe
        </button>
      </div>
    </div>
  )
}

export default Subscribe
