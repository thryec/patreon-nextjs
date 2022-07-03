import { useAccount } from 'wagmi'
import { shortenAddress } from '../helpers'

const Tip = () => {
  const { data } = useAccount()

  return (
    <div>
      <h2>To: creator address</h2>
      <h2>
        From: <code>{shortenAddress(data?.address)}</code>
      </h2>
      <label htmlFor="amount">Amount to tip: </label>
      <input
        type="text"
        className="border border-slate-200 rounded-md"
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
