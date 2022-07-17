import type { NextPage } from 'next'
import { useAccount } from 'wagmi'

const Profile: NextPage = () => {
  const { address, isConnected } = useAccount()
  return (
    <div className="flex justify-center h-screen bg-gray-100 ">
      Current User Profile
    </div>
  )
}

export default Profile
