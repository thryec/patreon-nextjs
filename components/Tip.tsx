import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useContractWrite, useAccount, useSigner } from 'wagmi'
import Loading from './LoadingModal'
import TxnSuccess from './TxnSucessModal'
import Error from './ErrorModal'
import { useForm } from 'react-hook-form'
import { POLYGON_ADDRESS, CONTRACT_ABI, POLYGON_CHAIN_ID } from '../constants'

interface TipProps {
  recipientAddress: any
  recipientName: any
}

type FormData = {
  ethAmount: string
}

const Tip = ({ recipientAddress, recipientName }: TipProps) => {
  const [ethAmount, setEthAmount] = useState<any>('0')
  const [loadingModal, setLoadingModal] = useState<boolean>()
  const [errorModal, setErrorModal] = useState<boolean>()
  const [txnSuccessModal, setTxnSuccessModal] = useState<boolean>()
  const [errorMessage, setErrorMessage] = useState<any>()
  const [txHash, setTxHash] = useState<string>()

  const { address } = useAccount()
  const { data: signer } = useSigner()

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({})

  const { write } = useContractWrite({
    addressOrName: POLYGON_ADDRESS,
    chainId: POLYGON_CHAIN_ID,
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

  const onSubmit = async () => {
    const eth = getValues('ethAmount')
    setEthAmount(eth)
  }

  useEffect(() => {
    if (ethAmount !== '0') {
      write()
    }
  }, [ethAmount])

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
          {...register('ethAmount', { required: true })}
          className="border border-slate-200 rounded-md my-4 mr-3 px-3 py-2"
        />
        <span className="text-slate-800 font-semibold">ETH</span>
        {errors.ethAmount && (
          <div className="text-pink-500">
            Please do not leave this field blank
          </div>
        )}
        <div className="flex justify-center">
          <button
            className="px-6 py-2 bg-violet-500 rounded-md text-white font-bold block"
            onClick={handleSubmit(onSubmit)}
          >
            Tip
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tip
