import { useAccount } from 'wagmi'
import { shortenAddress } from '../helpers'

const Subscribe = () => {
  const { data: account } = useAccount()

  return (
    <div>
      <div>
        <p>
          I want to subscribe to <code>Creator</code> for
          <input
            type="number"
            step="0.01"
            name="amount"
            className="border border-slate-200 rounded-md my-2 mx-3 px-3 py-2"
          />
          <span className="text-slate-800 text-lg font-semibold">ETH</span> /
          month, for
          <input
            type="number"
            step="1"
            className="border border-slate-200 rounded-md my-2 mx-3 px-3 py-2"
            placeholder="0"
          />
          <span className="text-slate-800 text-lg font-semibold">Months</span>
        </p>
      </div>
      <div className="flex justify-center">
        <button className="px-6 py-2 bg-blue-500 rounded-md text-white font-bold block">
          Subscribe
        </button>
      </div>
    </div>
  )
}

export default Subscribe
