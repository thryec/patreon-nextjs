import { useAccount } from 'wagmi'
import { shortenAddress } from '../helpers'

const Subscribe = () => {
  // once a month "subscription"
  const { data } = useAccount()

  return (
    <div>
      <h2>
        To: <code>creator address</code>
      </h2>
      <h2>
        From: <code>{shortenAddress(data?.address)}</code>
      </h2>
      <div>
        <label htmlFor="amount">Amount per month:</label>
        <input
          type="text"
          className="border border-slate-200 rounded-md"
          placeholder="0.00"
        />{' '}
        ETH
      </div>
      <div>
        <label htmlFor="duration">Duration:</label>
        <input
          type="text"
          className="border border-slate-200 rounded-md"
          placeholder="0"
        />{' '}
        Months
      </div>
      <button className="px-4 py-2 bg-blue-500 rounded-md text-white font-bold block">
        Subscribe
      </button>
    </div>
  )
}

export default Subscribe
