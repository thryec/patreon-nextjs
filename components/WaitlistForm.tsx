import { useState, useEffect } from 'react'
import SmallSpinner from './SmallSpinner'
import axios from 'axios'

const WaitlistForm = () => {
  const [email, setEmail] = useState<string>()
  const [type, setType] = useState<string>()
  const [success, setSucess] = useState<boolean>()
  const [loading, setLoading] = useState<boolean>()

  const googleSheetsApi = `https://sheet.best/api/sheets/18f03c83-b313-48f9-af6c-a744b7bb3e90`

  const submitForm = async (e: any) => {
    setLoading(true)
    e.preventDefault()
    const data = {
      email: email,
      type: type,
    }
    const res = await axios.post(googleSheetsApi, data)
    if (res.status === 200) {
      setSucess(true)
      setLoading(false)
    } else {
      setSucess(false)
      setLoading(false)
    }
  }

  return (
    <div className="text-center h-1/2 text-2xl">
      <form onSubmit={submitForm}>
        <div className="space-y-8">
          <div className="space-x-4">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              className="px-4 py-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-x-4">
            <label htmlFor="type">
              I will primarily use this platform as a:
            </label>
            <select
              onChange={(e) => setType(e.target.value)}
              className="px-4 py-2"
            >
              <option selected value="creator">
                creator
              </option>
              <option value="contributor">contributor</option>
              <option value="both">both</option>
            </select>
          </div>
          <div>
            {success === true ? (
              <span className="text-green-500">
                Yay! You&apos;re on the waitlist
              </span>
            ) : success === false ? (
              <span className="text-red-500">
                Uh oh! Please try again later or drop us a message at{' '}
                <a
                  href="https://twitter.com/circleofliife"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  @circleofliife
                </a>
              </span>
            ) : (
              <span className="opacity-0">placeholder</span>
            )}
          </div>
        </div>
        {loading ? (
          <button
            type="submit"
            className="bg-violet-500 py-2 px-3 mt-14 rounded-lg text-2xl text-white font-semibold items-center opacity-90"
          >
            Submit
            <SmallSpinner />
          </button>
        ) : (
          <button
            type="submit"
            className="bg-violet-500 py-2 px-3 mt-14 rounded-lg text-2xl text-white font-semibold items-center"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  )
}

export default WaitlistForm
