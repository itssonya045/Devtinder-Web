import axios from 'axios'
import React, { useEffect } from 'react'
import { Base_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const feedData = useSelector((state) => state.feed) 
  const dispatch = useDispatch()

  const getFeed = async () => {
    if (feedData.length > 0) return 

    try {
      const res = await axios.get(Base_URL + "/feed", {
        withCredentials: true,
      })
      console.log(res.data) 
      dispatch(setFeed(res.data.data))
    } catch (err) {
      console.log("FETCH USER ERROR:", err)
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  return (
    <div className='flex justify-center mt-10'>
      {feedData.length > 0 ? (
        <UserCard user={feedData[0]} />
      ) : (
        <div className="flex items-center justify-center mt-16">
  <div className="bg-gray-800 text-gray-300 px-8 py-6 rounded-2xl shadow-lg border border-gray-700 text-center">
    <p className="text-xl font-semibold tracking-wide">
      🚀 No more users to show
    </p>
    <p className="text-sm text-gray-400 mt-2">
      Please check back later for new connections.
    </p>
  </div>
</div>
      )}
    </div>
  )
}

export default Feed