import { useState } from 'react'
import { XIcon } from '@heroicons/react/solid'
import Tip from './Tip'
import Subscribe from './Subscribe'

interface ContributeModalProps {
  setContributeModal: (a: boolean) => void
}

const ContributeModal = (props: ContributeModalProps) => {
  const [recurring, setRecurring] = useState<boolean>()

  return (
    <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
      <div className="absolute bg-black opacity-50 inset-0 z-0" />
      <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
        <div className="flex place-content-between">
          <h1 className="font-bold text-2xl">Contribute to creator</h1>
          <XIcon
            className="h-6 w-6 text-slate-500 cursor-pointer hover:text-slate-800"
            onClick={() => props.setContributeModal(false)}
          />
        </div>
        <div className="flex place-content-center space-x-8">
          {recurring ? (
            <button
              className="border-2 border-slate-100 rounded-lg px-4 py-2 font-bold"
              onClick={() => setRecurring(false)}
            >
              Tip
            </button>
          ) : (
            <button
              className="border-2 border-white  bg-slate-100 rounded-lg px-4 py-2 font-bold"
              onClick={() => setRecurring(false)}
            >
              Tip
            </button>
          )}
          {recurring ? (
            <button
              className="border-2 border-white  bg-slate-100 rounded-lg px-4 py-2 font-bold"
              onClick={() => setRecurring(true)}
            >
              Subscribe
            </button>
          ) : (
            <button
              className="border-2 border-slate-100 rounded-lg px-4 py-2 font-bold"
              onClick={() => setRecurring(true)}
            >
              Subscribe
            </button>
          )}
        </div>
        {recurring ? <Subscribe /> : <Tip />}
      </div>
    </div>
  )
}

export default ContributeModal
