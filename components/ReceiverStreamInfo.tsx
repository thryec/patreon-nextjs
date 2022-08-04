import { useEffect, useState } from 'react'
import { shortenAddress } from '../helpers'
import { useContractWrite, useAccount, useContractReads } from 'wagmi'
import Loading from './LoadingModal'
import TxnSuccess from './TxnSucessModal'
import Error from './ErrorModal'
import {
  KOVAN_TESTNET_ADDRESS,
  CONTRACT_ABI,
  KOVAN_CHAIN_ID,
} from '../constants'

interface ReceiverStreamInfoProps {
  streamId: number
  sender: string
  recipient: string
  isActive: boolean
  deposit: number
  remainingBalance: any
  startTime: number
  stopTime: number
}

const ReceiverStreamInfo = ({
  streamId,
  sender,
  recipient,
  deposit,
  remainingBalance,
  startTime,
  stopTime,
}: ReceiverStreamInfoProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [withdrawableEther, setWithdrawableEther] = useState<string>()
  const [withdrawableWei, setWithdrawableWei] = useState<string>()
  const [loadingModal, setLoadingModal] = useState<boolean>()
  const [errorModal, setErrorModal] = useState<boolean>()
  const [txnSuccessModal, setTxnSuccessModal] = useState<boolean>()
  const [errorMessage, setErrorMessage] = useState<any>()
  const [txHash, setTxHash] = useState<string>()
  const { address } = useAccount()

  const { write } = useContractWrite({
    addressOrName: KOVAN_TESTNET_ADDRESS,
    chainId: KOVAN_CHAIN_ID,
    contractInterface: CONTRACT_ABI,
    functionName: 'recipientWithdrawFromStream',
    args: [streamId, withdrawableWei],
    overrides: {
      from: address,
    },
    onMutate({ args, overrides }) {
      console.log('Mutate', { args, overrides })
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
    if (!!data) {
      const ether = (parseInt(data.toString()) / 10 ** 18).toPrecision(2)
      setWithdrawableEther(ether)
      setWithdrawableWei(data.toString())
      setIsLoaded(true)
    }
  }, [data])

  return (
    <tr className="bg-white border-4 border-slate-100">
      {loadingModal && <Loading setLoadingModal={setLoadingModal} />}
      {txnSuccessModal && (
        <TxnSuccess setTxnSuccessModal={setTxnSuccessModal} txHash={txHash} />
      )}
      {errorModal && (
        <Error setErrorModal={setErrorModal} errorMessage={errorMessage} />
      )}
      <td className="px-4 py-2">{shortenAddress(sender)}</td>
      <td className="px-4 py-2">{startDate}</td>
      <td className="px-4 py-2">{stopDate}</td>
      {isLoaded && <td className="px-4 py-2">{withdrawableEther} ETH</td>}

      <td className="px-4 py-2">{remainingEther} ETH</td>
      <td className="px-4 py-2">
        {address === recipient ? (
          <button
            onClick={() => write()}
            className="font-bold rounded-md bg-violet-500 text-white px-4 py-2 hover:bg-violet-600"
          >
            Withdraw
          </button>
        ) : (
          <button className="font-bold rounded-md bg-slate-300 text-white px-4 py-2">
            Withdraw
          </button>
        )}
      </td>
    </tr>
  )
}

export default ReceiverStreamInfo
