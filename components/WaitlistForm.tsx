import { useState, useEffect } from 'react'
import axios from 'axios'

const WaitlistForm = () => {
  const [email, setEmail] = useState<string>()
  const [type, setType] = useState<string>()

  const spreadsheetId = '1F0i7bMpy2HFap_dD6bVSyw7vIbLucRWFSkYGRQnLqbM'
  const googleSheetsApi = `https://sheet.best/api/sheets/18f03c83-b313-48f9-af6c-a744b7bb3e90`

  const submitForm = async () => {
    const data = {
      email: 'xxx@gmail.com',
      type: 'contributor',
    }
    const res = await axios.post(googleSheetsApi, data)

    console.log('response: ', res)
  }

  return (
    <div className="text-center">
      <form onSubmit={submitForm}>
        <label htmlFor="email">Email</label>
        <input type="text" />
        <label htmlFor="type">How will you be using this platform?</label>
        <select onChange={(e) => setType(e.target.value)}>
          <option value="creator">creator</option>
          <option selected value="contributor">
            contributor
          </option>
          <option value="both">both</option>
        </select>
      </form>
    </div>
  )
}

export default WaitlistForm
