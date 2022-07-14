import { useState } from 'react'
import { XIcon } from '@heroicons/react/solid'
import Tip from './Tip'
import Subscribe from './Subscribe'
import { useContract, useSigner, useAccount } from 'wagmi'
import { KOVAN_TESTNET_ADDRESS, CONTRACT_ABI } from '../constants'
import { shortenAddress } from '../helpers'

interface ContributeModalProps {
  setContributeModal: (a: boolean) => void
  creatorAddress: string
  creatorName: string
}

const ContributeModal = ({
  setContributeModal,
  creatorAddress,
  creatorName,
}: ContributeModalProps) => {
  const [recurring, setRecurring] = useState<boolean>(true)

  const { data: signer, isError, isLoading } = useSigner()

  return (
    <div className="fixed left-0 top-0 flex items-center inset-0 z-50 outline-none">
      <div className="absolute bg-black opacity-50 inset-0 z-0" />
      <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
        <div className="flex place-content-between">
          <h1 className="font-bold text-2xl mb-3">
            Contribute to{' '}
            <code className="font-light text-xl">
              {shortenAddress(creatorAddress)}
            </code>
          </h1>
          <XIcon
            className="h-6 w-6 text-slate-500 cursor-pointer hover:text-slate-900"
            onClick={() => setContributeModal(false)}
          />
        </div>
        <div className="flex place-content-center space-x-8 mb-4">
          {recurring ? (
            <button
              className="border-2 border-white bg-slate-100 rounded-lg px-4 py-2 font-bold"
              onClick={() => setRecurring(true)}
            >
              Subscribe
            </button>
          ) : (
            <button
              className="hover:border-2 hover:border-slate-100 border-2 border-white rounded-lg px-4 py-2 font-bold"
              onClick={() => setRecurring(true)}
            >
              Subscribe
            </button>
          )}
          {recurring ? (
            <button
              className="hover:border-2 hover:border-slate-100 border-2 border-white rounded-lg px-4 py-2 font-bold"
              onClick={() => setRecurring(false)}
            >
              Tip
            </button>
          ) : (
            <button
              className="border-2 border-white bg-slate-100 rounded-lg px-4 py-2 font-bold"
              onClick={() => setRecurring(false)}
            >
              Tip
            </button>
          )}
        </div>
        {recurring ? (
          <Subscribe
            recipientAddress={creatorAddress}
            recipientName={creatorName}
          />
        ) : (
          <Tip recipientAddress={creatorAddress} recipientName={creatorName} />
        )}
      </div>
    </div>
  )
}

export default ContributeModal
