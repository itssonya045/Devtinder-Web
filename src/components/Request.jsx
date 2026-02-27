import React, { use, useEffect } from 'react'
import axios from 'axios'
import { Base_URL } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'
const Request = () => {
   
   const requests = useSelector((store) => store.request) 
   console.log(requests)
   const dispatch = useDispatch()

  const fetchRequest = async () => {
    try {
       const res = await axios.get(Base_URL + "/user/requests/received", { withCredentials: true })
       dispatch(addRequest(res.data.data))    
    } catch (err) {
      console.error("Error fetching requests:", err)
    } 
  }

  useEffect(() => {
    fetchRequest()
  }, [])


    if (!requests || requests.length === 0) {
    return <h1 className="text-white text-center mt-10">No Requets found ...!</h1>
    }


  return (
    <div className="text-center">
      <h1 className="text-white text-3xl font-bold mt-4">Connection Requests</h1>



      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId

        return (
          <div
            key={_id}
            className="flex items-center p-4 rounded-lg bg-gray-800 w-1/2 mx-auto mt-7"
          >
            <img
              alt="photo"
              className="w-20 h-20 rounded-full object-cover"
              src={photoUrl}
            />
            <div className="ml-4 text-left">
              <h2 className="font-bold text-xl">{firstName} {lastName}</h2>
              {age && gender && <p>{age}, {gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Request