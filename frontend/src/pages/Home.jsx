import React from 'react'
import { useMyContext } from '../Context/AppContext'

const Home = () => {
  const {User} = useMyContext()
  return (
    <div>
    <p>  {
    User?.username}</p>
    <div>
        {
    User?.email}
    </div>
    <div>
    <button className='bg-black text-white px-4 rounded-2xl mt-6'>logout</button>
    </div>
    </div>
  )
}

export default Home
