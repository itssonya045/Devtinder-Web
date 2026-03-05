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
  <div
    className="group bg-base-300/80 backdrop-blur-md
    w-full max-w-sm rounded-2xl overflow-hidden
    border border-base-100/40
    hover:border-primary/40
    hover:-translate-y-1
    transition-all duration-300"
  >
    {/* Image Section */}
    <div className="relative w-full overflow-hidden">
      <img
        src={
          photoUrl ||
          "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        }
        alt={`${firstName} ${lastName}`}
        className="w-full h-full object-cover object-center
        group-hover:scale-105 transition duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
    </div>

    {/* Content */}
    <div className="p-6">
      <h2 className="text-xl font-semibold group-hover:text-primary transition">
        {firstName} {lastName}
      </h2>

      {age && gender && (
        <p className="text-sm opacity-60 mt-1">
          {age} • {gender}
        </p>
      )}

      {about && (
        <p className="text-sm opacity-75 mt-3 leading-relaxed line-clamp-3">
          {about}
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => handleSendRequest("ignored", _id)}
          className="flex-1 py-2 rounded-lg text-sm
          bg-red-500/10 text-red-500
          hover:bg-red-500 hover:text-white
          transition-all duration-300"
        >
          Ignore
        </button>

        <button
          onClick={() => handleSendRequest("interested", _id)}
          className="flex-1 py-2 rounded-lg text-sm
          bg-primary/10 text-primary
          hover:bg-primary hover:text-white
          transition-all duration-300"
        >
          Interested
        </button>
      </div>
    </div>
  </div>
);
};

export default UserCard;