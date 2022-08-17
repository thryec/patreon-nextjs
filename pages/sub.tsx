import type { NextPage } from 'next'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Loading from '../components/LoadingModal'
import TxnSuccess from '../components/TxnSucessModal'
import Error from '../components/ErrorModal'
import { useContractWrite, useAccount, useSigner, useEnsAddress } from 'wagmi'
import { POLYGON_ADDRESS, CONTRACT_ABI, POLYGON_CHAIN_ID } from '../constants'

type FormData = {
  recipient: string
  ethAmount: string
  weeks: string
}

const Subscribe: NextPage = () => {
  const [depositAmount, setDepositAmount] = useState<any>('0')
  const [recipient, setRecipient] = useState<any>()
  const [startTime, setStartTime] = useState<any>()
  const [endTime, setEndTime] = useState<any>()
  const [loadingModal, setLoadingModal] = useState<boolean>()
  const [errorModal, setErrorModal] = useState<boolean>()
  const [errorMessage, setErrorMessage] = useState<any>()
  const [txnSuccessModal, setTxnSuccessModal] = useState<boolean>()
  const [txHash, setTxHash] = useState<string>()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({})

  const { address } = useAccount()
  const { data: signer } = useSigner()

  const { write } = useContractWrite({
    addressOrName: POLYGON_ADDRESS,
    chainId: POLYGON_CHAIN_ID,
    contractInterface: CONTRACT_ABI,
    functionName: 'createETHStream',
    args: [recipient, startTime, endTime],
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
    const recipient = getValues('recipient')
    console.log('recipient: ', recipient)
    setRecipient(recipient)
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
      process.env.KOVAN_RPC_URL
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
    <div className="flex justify-center h-screen w-full">
      <div>
        {loadingModal && <Loading setLoadingModal={setLoadingModal} />}
        {txnSuccessModal && (
          <TxnSuccess setTxnSuccessModal={setTxnSuccessModal} txHash={txHash} />
        )}
        {errorModal && (
          <Error setErrorModal={setErrorModal} errorMessage={errorMessage} />
        )}
        <h1 className="text-5xl font-extrabold text-center mb-14">
          Subscribe To A Creator
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <div className="text-xl flex justify-center">
            <div className="space-y-4">
              <div>
                <input
                  type="string"
                  placeholder="wagmi.ens"
                  className="border border-slate-200 rounded-md my-2 mx-3 px-2 py-2"
                  {...register('recipient', { required: true })}
                />
                <span className="text-slate-800 font-semibold"> Receiver!</span>
                {errors.ethAmount && (
                  <div className="text-pink-500">
                    Please do not leave this field blank
                  </div>
                )}
              </div>
              <div>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="border border-slate-200 rounded-md my-2 mx-3 px-2 py-2"
                  {...register('ethAmount', { required: true })}
                />
                <span className="text-slate-800 font-semibold">
                  {' '}
                  ETH / week
                </span>
                {errors.ethAmount && (
                  <div className="text-pink-500">
                    Please do not leave this field blank
                  </div>
                )}
              </div>
              <div>
                <input
                  type="number"
                  step="1"
                  className="border border-slate-200 rounded-md my-2 mx-3 px-2 py-2"
                  placeholder="0"
                  {...register('weeks', { required: true })}
                />
                <span className="text-slate-800 font-semibold">Week(s)</span>
                {errors.weeks && (
                  <div className="text-pink-500">
                    Please do not leave this field blank
                  </div>
                )}
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
    </div>
  )
}

export default Subscribe
