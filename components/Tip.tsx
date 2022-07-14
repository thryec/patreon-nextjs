import { useState } from 'react'
import { ethers } from 'ethers'
import { useContractWrite, useAccount } from 'wagmi'
import {
  KOVAN_TESTNET_ADDRESS,
  CONTRACT_ABI,
  KOVAN_CHAIN_ID,
} from '../constants'

interface TipProps {
  recipientAddress: any
  recipientName: any
}

const Tip = ({ recipientAddress, recipientName }: TipProps) => {
  const [ethAmount, setEthAmount] = useState<any>('0.0')
  const { address } = useAccount()

  const { write } = useContractWrite({
    addressOrName: KOVAN_TESTNET_ADDRESS,
    chainId: KOVAN_CHAIN_ID,
    contractInterface: CONTRACT_ABI,
    functionName: 'tipETH',
    args: [recipientAddress],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(ethAmount),
    },
    onError(error) {
      console.log('Error', error)
    },
    onSuccess(data) {
      console.log('Success', data)
    },
  })

  const handleChange = (e: any) => {
    setEthAmount(e.target.value)
  }

  return (
    <div className="flex justify-center">
      <div>
        I want to tip{' '}
        <code className="font-semibold underline">{recipientName}</code>{' '}
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          name="amount"
          value={ethAmount}
          onChange={handleChange}
          className="border border-slate-200 rounded-md my-4 mr-3 px-3 py-2"
        />
        <span className="text-slate-800 text-lg font-semibold">ETH!</span>
        <div className="flex justify-center">
          <button
            className="px-6 py-2 bg-violet-500 rounded-md text-white font-bold block"
            onClick={() => write()}
          >
            Tip
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tip
