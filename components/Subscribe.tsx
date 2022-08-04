import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import { useContractWrite, useAccount, useSigner } from 'wagmi'
import Loading from './LoadingModal'
import TxnSuccess from './TxnSucessModal'
import Error from './ErrorModal'
import {
  KOVAN_TESTNET_ADDRESS,
  CONTRACT_ABI,
  KOVAN_CHAIN_ID,
} from '../constants'

interface SubscribeProps {
  recipientAddress: any
  recipientName: any
}

type FormData = {
  ethAmount: string
  weeks: string
}

const Subscribe = ({ recipientAddress, recipientName }: SubscribeProps) => {
  const [depositAmount, setDepositAmount] = useState<any>('0')
  const [startTime, setStartTime] = useState<any>()
  const [endTime, setEndTime] = useState<any>()
  const [loadingModal, setLoadingModal] = useState<boolean>()
  const [errorModal, setErrorModal] = useState<boolean>()
  const [errorMessage, setErrorMessage] = useState<any>()
  const [txnSuccessModal, setTxnSuccessModal] = useState<boolean>()
  const [txHash, setTxHash] = useState<string>()
  const { address } = useAccount()
  const { data: signer } = useSigner()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({})

  const { write } = useContractWrite({
    addressOrName: KOVAN_TESTNET_ADDRESS,
    chainId: KOVAN_CHAIN_ID,
    contractInterface: CONTRACT_ABI,
    functionName: 'createETHStream',
    args: [recipientAddress, startTime, endTime],
    overrides: {
      from: address,
      value: depositAmount,
    },
    onMutate({ args, overrides }) {
      console.log('Mutate', { args, overrides })
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

  const onSubmit = async (data: any) => {
    if (!signer) {
      alert('Connect your wallet first!')
      return
    }
    const timeDelta = data.weeks * 7 * 24 * 60 * 60
    const currentBlocktime = await getCurrentBlockTimestamp()
    const endBlocktime = currentBlocktime + timeDelta
    setStartTime(currentBlocktime)
    setEndTime(endBlocktime)
    const totalAmount = (data.ethAmount * data.weeks).toString()
    const amountInWei = ethers.utils.parseUnits(totalAmount, 'ether')
    const remainder = amountInWei.mod(timeDelta)
    if (remainder.toNumber() !== 0) {
      const roundedAmount = amountInWei.sub(remainder)
      setDepositAmount(roundedAmount.toString())
    } else {
      setDepositAmount(totalAmount.toString())
    }
  }

  const getCurrentBlockTimestamp = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.GOERLI_RPC_URL
    )
    const blockNumber = await provider.getBlockNumber()
    const timestamp = (await provider.getBlock(blockNumber)).timestamp
    return timestamp + 60
  }

  useEffect(() => {
    if (depositAmount !== '0') {
      write()
    }
  }, [depositAmount])

  return (
    <div>
      {loadingModal && <Loading setLoadingModal={setLoadingModal} />}
      {txnSuccessModal && (
        <TxnSuccess setTxnSuccessModal={setTxnSuccessModal} txHash={txHash} />
      )}
      {errorModal && (
        <Error setErrorModal={setErrorModal} errorMessage={errorMessage} />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div className="text-2xl flex justify-center">
          <div className="space-y-4">
            <div>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                className="border border-slate-200 rounded-md my-2 mx-3 px-2 py-2"
                {...register('ethAmount', { required: true })}
              />
              {errors.ethAmount && (
                <div className="text-pink-500">
                  Please do not leave this field blank
                </div>
              )}
              <span className="text-slate-800 font-semibold"> ETH / week</span>
            </div>
            <div>
              <input
                type="number"
                step="1"
                className="border border-slate-200 rounded-md my-2 mx-3 px-2 py-2"
                placeholder="0"
                {...register('weeks', { required: true })}
              />
              {errors.weeks && (
                <div className="text-pink-500">
                  Please do not leave this field blank
                </div>
              )}
              <span className="text-slate-800 font-semibold">Week(s)</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center text-2xl">
          <button
            className="px-6 py-2 bg-violet-500 rounded-md text-white font-bold block"
            type="submit"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  )
}

export default Subscribe
