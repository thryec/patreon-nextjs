import { useEffect, useState } from 'react'
import { shortenAddress } from '../helpers'
import { useContractWrite, useAccount, useContractReads } from 'wagmi'
import {
  KOVAN_TESTNET_ADDRESS,
  CONTRACT_ABI,
  KOVAN_CHAIN_ID,
} from '../constants'

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
    addressOrName: KOVAN_TESTNET_ADDRESS,
    chainId: KOVAN_CHAIN_ID,
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
    addressOrName: KOVAN_TESTNET_ADDRESS,
    contractInterface: CONTRACT_ABI,
  }

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...contract,
        functionName: 'currentETHBalanceOf',
        args: [streamId, recipient],
      },
    ],
  })

  const startDate = new Date(startTime * 1000).toLocaleDateString()
  const stopDate = new Date(stopTime * 1000).toLocaleDateString()
  const remainingEther = (JSON.parse(remainingBalance) / 10 ** 18).toPrecision(
    2
  )

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
    <tr className="bg-white text-sm border-4 border-slate-100">
      <td className="px-4 py-2">{shortenAddress(recipient)}</td>
      <td className="px-4 py-2">{startDate}</td>
      <td className="px-4 py-2">{stopDate}</td>
      {isLoaded && <td className="px-4 py-2">{recipientShare} ETH</td>}

      <td className="px-4 py-2">
        {parseInt(remainingEther) - parseInt(recipientShare)} ETH
      </td>
      <td className="px-4 py-2">
        {hasEnded ? (
          <button className="text-sm font-bold rounded-md bg-slate-300 text-white px-4 py-2 ">
            Stream Ended
          </button>
        ) : (
          <button
            onClick={() => write()}
            className="text-sm font-bold rounded-md bg-violet-500 text-white px-4 py-2 hover:bg-violet-600"
          >
            Cancel
          </button>
        )}
      </td>
    </tr>
  )
}

export default StreamInfo
