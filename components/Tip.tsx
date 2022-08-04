import { useState } from 'react'
import { ethers } from 'ethers'
import { useContractWrite, useAccount, useSigner } from 'wagmi'
import Loading from './LoadingModal'
import TxnSuccess from './TxnSucessModal'
import Error from './ErrorModal'
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
  const [loadingModal, setLoadingModal] = useState<boolean>()
  const [errorModal, setErrorModal] = useState<boolean>()
  const [txnSuccessModal, setTxnSuccessModal] = useState<boolean>()
  const [errorMessage, setErrorMessage] = useState<any>()
  const [txHash, setTxHash] = useState<string>()

  const { address } = useAccount()
  const { data: signer } = useSigner()

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
    onMutate() {
      if (!signer) {
        alert('Connect your wallet first!')
        return
      }
      setLoadingModal(true)
    },
    onError(error) {
      console.log('Error', error)
      setLoadingModal(false)
      setErrorMessage(error.message)
      setErrorModal(true)
    },
    onSuccess(data) {
      console.log('Success', data)
      setTxHash(data.hash)
      setLoadingModal(false)
      setTxnSuccessModal(true)
    },
  })

  const handleChange = (e: any) => {
    setEthAmount(e.target.value)
  }

  return (
    <div className="flex justify-center">
      {loadingModal && <Loading setLoadingModal={setLoadingModal} />}
      {txnSuccessModal && (
        <TxnSuccess setTxnSuccessModal={setTxnSuccessModal} txHash={txHash} />
      )}
      {errorModal && (
        <Error setErrorModal={setErrorModal} errorMessage={errorMessage} />
      )}
      <div className="text-2xl space-y-10 inline-block align-middle">
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          name="amount"
          value={ethAmount}
          onChange={handleChange}
          className="border border-slate-200 rounded-md my-4 mr-3 px-3 py-2"
        />
        <span className="text-slate-800 font-semibold">ETH</span>
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
