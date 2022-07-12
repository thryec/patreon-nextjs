import type { NextPage } from 'next'
import Tip from '../../components/Tip'
import Subscribe from '../../components/Subscribe'
import { shortenAddress } from '../../helpers'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Contribute: NextPage = () => {
  const [recurring, setRecurring] = useState<boolean>(true)
  const router = useRouter()
  const { addr } = router.query

  console.log('address: ', addr)

  return (
    <div className="w-full max-w-lg p-5 relative mx-auto my-auto h-screen">
      <div className="flex place-content-between">
        <h1 className="font-bold text-2xl mb-3">
          Contribute to{' '}
          {addr && (
            <code className="font-light text-xl">{shortenAddress(addr)}</code>
          )}
        </h1>
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
        <Subscribe recipientAddress={addr} />
      ) : (
        <Tip recipientAddress={addr} />
      )}
    </div>
  )
}

export default Contribute
