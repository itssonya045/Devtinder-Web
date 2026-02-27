import axios from 'axios'
import React, { useEffect } from 'react'
import { Base_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

export const Connection = () => {
  const connections = useSelector((store) => store.connection) // renamed
  const dispatch = useDispatch()

  const fetchConnections = async () => {
    try {
      const res = await axios.get(Base_URL + "/user/connections", { withCredentials: true })
      dispatch(addConnections(res.data.data))
    } catch (err) {
      console.error("Error fetching connections:", err)
    }
  }

  useEffect(() => {
    fetchConnections()
  }, [])

  if (!connections || connections.length === 0) {
    return <h1 className="text-white text-center mt-10">No connections found ...!</h1>
  }

  return (
    <div className="text-center">
      <h1 className="text-white text-3xl font-bold mb-6">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } = connection

        return (
          <div
            key={_id}
            className="flex items-center p-4 rounded-lg bg-gray-800 w-1/2 mx-auto mb-4"
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