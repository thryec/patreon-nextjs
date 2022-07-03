import type { NextPage } from 'next'
import CreatorInfo from '../components/CreatorInfo'
import { creators } from '../creators'

const Home: NextPage = () => {
  const creatorCards = creators.map((el) => (
    <CreatorInfo
      key={el.address}
      address={el.address}
      name={el.name}
      description={el.description}
      profilePicture={el.profilePicture}
    />
  ))

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-4 gap-6 mx-60">{creatorCards}</div>
    </div>
  )
}

export default Home
