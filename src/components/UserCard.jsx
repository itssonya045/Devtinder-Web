import axios from "axios";
import React from "react";
import { Base_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  if (!user) return null;
   
  const { _id , firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async(status , userId) => {
    try {
      const res = await axios.post(Base_URL + "/request/send/" + status + "/" + userId , {}, { withCredentials: true });
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error("Error sending request:", error);
    }
  }

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src={photoUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
          alt={`${firstName} ${lastName}`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        {age && gender && <p>{`${age}, ${gender}`}</p>}
        {about && <p>{about}</p>}
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
          <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;