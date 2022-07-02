import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Creator: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  console.log('current creator: ', id)

  return <div>Creator</div>
}

export default Creator
