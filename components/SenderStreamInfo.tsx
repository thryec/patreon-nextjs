import { useEffect, useState } from 'react'
import { shortenAddress } from '../helpers'
import { useContractWrite, useAccount, useContractReads, chain } from 'wagmi'
import { POLYGON_ADDRESS, CONTRACT_ABI, POLYGON_CHAIN_ID } from '../constants'

interface StreamInfoProps {
  streamId: number
  sender: string
  recipient: string
  isActive: boolean
  deposit: number
  remainingBalance: any
  startTime: number
  stopTime: number
}

const StreamInfo = ({
  streamId,
  sender,
  recipient,
  deposit,
  isActive,
  remainingBalance,
  startTime,
  stopTime,
}: StreamInfoProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [recipientShare, setRecipientShare] = useState<any>()
  const [withdrawableWei, setWithdrawableWei] = useState<string>()
  const [hasEnded, setHasEnded] = useState<boolean>(false)
  const { address } = useAccount()

  const { write } = useContractWrite({
    addressOrName: POLYGON_ADDRESS,
    chainId: POLYGON_CHAIN_ID,
    contractInterface: CONTRACT_ABI,
    functionName: 'senderCancelStream',
    args: [streamId],
    overrides: {
      from: address,
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

  const contract = {
    addressOrName: POLYGON_ADDRESS,
    contractInterface: CONTRACT_ABI,
  }

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...contract,
        functionName: 'currentETHBalanceOf',
        args: [streamId, recipient],
        chainId: POLYGON_CHAIN_ID,
      },
    ],
  })

  const startDate = new Date(startTime * 1000).toLocaleDateString()
  const stopDate = new Date(stopTime * 1000).toLocaleDateString()
  const initialDeposit = (
    JSON.parse(deposit.toString()) /
    10 ** 18
  ).toPrecision(2)

  useEffect(() => {
    const todaysDate = new Date(Date.now())
    if (todaysDate > new Date(stopTime * 1000)) {
      setHasEnded(true)
    }
  }, [])

  useEffect(() => {
    if (!!data) {
      const ether = (parseInt(data.toString()) / 10 ** 18).toPrecision(2)
      setRecipientShare(ether)
      setWithdrawableWei(data.toString())
      setIsLoaded(true)
    }
  }, [data])

  return (
    <tr className="bg-white border-4 border-slate-100">
      <td className="px-4 py-2">{shortenAddress(recipient)}</td>
      <td className="px-4 py-2">{startDate}</td>
      <td className="px-4 py-2">{stopDate}</td>
      <td className="px-4 py-2">{initialDeposit} ETH</td>
      <td className="px-4 py-2">{isLoaded && recipientShare} ETH</td>

      <td className="px-4 py-2">
        {hasEnded || !isActive ? (
          <button className="font-bold rounded-md bg-slate-300 text-white px-4 py-2 ">
            Stream Ended
          </button>
        ) : (
          <button
            onClick={() => write()}
            className="font-bold rounded-md bg-violet-500 text-white px-4 py-2 hover:bg-violet-600"
          >
            Cancel
          </button>
        )}
      </td>
    </tr>
  )
}

export default StreamInfo
