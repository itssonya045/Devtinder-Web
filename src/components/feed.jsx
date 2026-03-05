import axios from "axios";
import React, { useEffect } from "react";
import { Base_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feedData = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  // Fetch Feed Users
  const getFeed = async () => {
    try {
      const res = await axios.get(Base_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(setFeed(res.data.data));
    } catch (err) {
      console.log("FETCH USER ERROR:", err);
    }
  };

  useEffect(() => {
    if (!feedData || feedData.length === 0) {
      getFeed();
    }
  }, []);

  return (
    <div className="min-h-screen bg-base-200 py-10 px-2">
      
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-white mb-10">
        Discover Developers
      </h1>

      {/* Content */}
      <div className="flex justify-center">
        {feedData && feedData.length > 0 ? (
          <UserCard user={feedData[0]} />
        ) : (
          <div className="bg-slate-900 border border-slate-800 px-10 py-8 rounded-2xl shadow-xl text-center max-w-md w-full">
            <p className="text-xl font-semibold text-white">
              🚀 No more users to show
            </p>
            <p className="text-sm text-slate-400 mt-3">
              Please check back later for new connections.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;