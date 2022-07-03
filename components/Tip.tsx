import { useAccount } from 'wagmi'
import { shortenAddress } from '../helpers'

const Tip = () => {
  const { data } = useAccount()

  return (
    <div className="space-y-4">
      <label htmlFor="amount block">Amount to tip: </label>
      <input
        type="text"
        className="border border-slate-200 rounded-md block"
        placeholder="0.00"
      />{' '}
      ETH
      <button className="px-4 py-2 bg-blue-500 rounded-md text-white font-bold block">
        Tip
      </button>
    </div>
  )
}

export default Tip
