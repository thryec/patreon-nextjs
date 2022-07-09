import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { UserCircleIcon } from '@heroicons/react/outline'

const Creator: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  console.log('id', id)

  return (
    <div className="flex mx-72">
      <div className="w-1/3">
        <UserCircleIcon className="h-20 w-20 mr-3 text-slate-400" />
        <h1 className="text-3xl font-semibold">name</h1>
        <span className="text-sm text-slate-500">0xaddress</span>
        <div>description</div>
      </div>
      <div className="w-2/3 space-y-16">
        <div>
          <h1 className="text-3xl text-slate-800 font-semibold underline underline-offset-4">
            Twitter
          </h1>
        </div>
        <div>
          <h1 className="text-3xl text-slate-800 font-semibold underline underline-offset-4">
            Instagram
          </h1>
        </div>
        <div>
          <h1 className="text-3xl text-slate-800 font-semibold underline underline-offset-4">
            YouTube
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Creator
