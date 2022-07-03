import { useAccount } from 'wagmi'
import { shortenAddress } from '../helpers'

const Tip = () => {
  const { data } = useAccount()

  return (
    <div className="flex justify-center">
      <div>
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          name="amount"
          className="border border-slate-200 rounded-md my-4 mr-3 px-3 py-2"
        />
        <span className="text-slate-800 text-lg font-semibold">ETH</span>
        <div className="flex justify-center">
          <button className="px-6 py-2 bg-blue-500 rounded-md text-white font-bold block">
            Tip
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tip
