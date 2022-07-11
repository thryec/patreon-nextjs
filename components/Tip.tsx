import { useState } from 'react'
import { ethers } from 'ethers'
import { useContractWrite, useAccount } from 'wagmi'
import { TESTNET_ADDRESS, CONTRACT_ABI, KOVAN_CHAIN_ID } from '../constants'

interface TipProps {
  recipientAddress: string
}

const Tip = ({ recipientAddress }: TipProps) => {
  const [ethAmount, setEthAmount] = useState<any>('0.0')
  const { address } = useAccount()

  const { data, isError, isLoading, write } = useContractWrite({
    addressOrName: TESTNET_ADDRESS,
    chainId: KOVAN_CHAIN_ID,
    contractInterface: CONTRACT_ABI,
    functionName: 'tipETH',
    args: [recipientAddress],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(ethAmount),
    },
  })

  const handleChange = (e: any) => {
    setEthAmount(e.target.value)
  }

  return (
    <div className="flex justify-center">
      <div>
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          name="amount"
          value={ethAmount}
          onChange={handleChange}
          className="border border-slate-200 rounded-md my-4 mr-3 px-3 py-2"
        />
        <span className="text-slate-800 text-lg font-semibold">ETH</span>
        <div className="flex justify-center">
          <button
            className="px-6 py-2 bg-blue-500 rounded-md text-white font-bold block"
            // onClick={submitTxn}
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
