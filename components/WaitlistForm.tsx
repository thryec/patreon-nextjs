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
    <div className="text-center h-1/2">
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="type">How will you be using this platform?</label>
          <select onChange={(e) => setType(e.target.value)}>
            <option value="creator">creator</option>
            <option selected value="contributor">
              contributor
            </option>
            <option value="both">both</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-violet-500 py-2 px-3 rounded-lg text-xl text-white font-semibold"
        >
          Join
        </button>
      </form>
    </div>
  )
}

export default WaitlistForm
