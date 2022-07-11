import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import { useContractWrite, useAccount } from 'wagmi'
import { TESTNET_ADDRESS, CONTRACT_ABI, KOVAN_CHAIN_ID } from '../constants'

interface SubscribeProps {
  recipientAddress: string
}

type FormData = {
  ethAmount: string
  weeks: string
}

const Subscribe = ({ recipientAddress }: SubscribeProps) => {
  const [depositAmount, setDepositAmount] = useState<any>('0')
  const [startTime, setStartTime] = useState<any>()
  const [endTime, setEndTime] = useState<any>()

  const { address } = useAccount()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({})

  const { write } = useContractWrite({
    addressOrName: TESTNET_ADDRESS,
    chainId: KOVAN_CHAIN_ID,
    contractInterface: CONTRACT_ABI,
    functionName: 'createETHStream',
    args: [recipientAddress, startTime, endTime],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(depositAmount),
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

  const onSubmit = async (data: any) => {
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
      process.env.KOVAN_RPC_URL
    )
    const blockNumber = await provider.getBlockNumber()
    const timestamp = (await provider.getBlock(blockNumber)).timestamp
    return timestamp
  }

  useEffect(() => {
    if (depositAmount !== '0') {
      write()
    }
  }, [depositAmount])

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p>
            I want to subscribe to <code>Creator</code> for
            <input
              type="number"
              step="0.01"
              className="border border-slate-200 rounded-md my-2 mx-3 px-3 py-2"
              {...register('ethAmount', { required: true })}
            />
            {errors.ethAmount && (
              <div className="text-pink-500">
                Please do not leave this field blank
              </div>
            )}
            <span className="text-slate-800 text-lg font-semibold">ETH</span> /
            week, for
            <input
              type="number"
              step="1"
              className="border border-slate-200 rounded-md my-2 mx-3 px-3 py-2"
              placeholder="0"
              {...register('weeks', { required: true })}
            />
            {errors.weeks && (
              <div className="text-pink-500">
                Please do not leave this field blank
              </div>
            )}
            <span className="text-slate-800 text-lg font-semibold">
              Week(s)
            </span>
          </p>
        </div>
        <div className="flex justify-center">
          <button
            className="px-6 py-2 bg-blue-500 rounded-md text-white font-bold block"
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
