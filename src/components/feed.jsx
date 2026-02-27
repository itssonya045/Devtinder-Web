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
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Feed