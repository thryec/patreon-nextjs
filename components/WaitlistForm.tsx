import { useState, useEffect } from 'react'
import axios from 'axios'

const WaitlistForm = () => {
  const [email, setEmail] = useState<string>()
  const [type, setType] = useState<string>()

  const googleSheetsApi = `https://sheet.best/api/sheets/18f03c83-b313-48f9-af6c-a744b7bb3e90`

  const submitForm = async () => {
    const data = {
      email: email,
      type: type,
    }
    const res = await axios.post(googleSheetsApi, data)

    console.log('response: ', res)
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
            <label htmlFor="type">How will you mainly use this platform?</label>
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
        </div>
        <button
          type="submit"
          className="bg-violet-500 py-2 px-3 mt-20 rounded-lg text-2xl text-white font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default WaitlistForm
