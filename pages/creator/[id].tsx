import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { UserCircleIcon } from '@heroicons/react/outline'

const Creator: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className="flex mx-60">
      <div className="w-1/3">
        <UserCircleIcon className="h-20 w-20 mr-3 text-slate-400" />
        <h1 className="text-3xl font-semibold">name</h1>
        <span className="text-sm text-slate-500">0xaddress</span>
        <div>description</div>
      </div>
      <div className="w-2/3">
        <div>
          <h1 className="text-3xl font-semibold">Twitter</h1>
        </div>
        <div>
          <h1 className="text-3xl font-semibold">Instagram</h1>
        </div>
        <div>
          <h1 className="text-3xl font-semibold">YouTube</h1>
        </div>
      </div>
    </div>
  )
}

export default Creator
