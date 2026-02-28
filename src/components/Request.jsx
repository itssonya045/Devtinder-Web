import React, { useEffect } from "react";
import axios from "axios";
import { Base_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Request = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const fetchRequest = async () => {
    try {
      const res = await axios.get(
        Base_URL + "/user/requests/received",
        { withCredentials: true }
      );
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };
t
  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        `${Base_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      // Refresh after action
      fetchRequest();
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  // ================= EMPTY STATE =================
  if (!requests || requests.length === 0) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="bg-base-300/80 backdrop-blur-md
          border border-base-100/40
          rounded-xl px-8 py-10
          text-center max-w-md w-full">

          <div className="text-4xl mb-4 opacity-70">📭</div>

          <h2 className="text-xl font-semibold">
            No Requests Yet
          </h2>

          <p className="opacity-60 mt-3 text-sm leading-relaxed">
            You don’t have any connection requests right now.
            When someone sends you a request, it will appear here.
          </p>
        </div>
      </div>
    );
  }

  // ================= MAIN UI =================
  return (
    <div className="min-h-screen bg-base-200 py-16 px-4">

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-tight">
        Connection Requests
      </h1>

      {/* Cards */}
      <div className="max-w-2xl mx-auto space-y-4">
        {requests.map((request) => {
          const {
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
          } = request.fromUserId;

          return (
            <div
              key={request._id}
              className="group flex items-center justify-between
              bg-base-300/80 backdrop-blur-md
              px-5 py-4 rounded-xl
              border border-base-100/40
              hover:border-primary/40
              hover:-translate-y-0.5
              transition-all duration-300"
            >
              {/* Left Section */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={photoUrl}
                    alt="profile"
                    className="w-14 h-14 rounded-full object-cover
                    border border-base-100
                    group-hover:border-primary transition"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-base-300 rounded-full"></span>
                </div>

                <div>
                  <h2 className="text-base font-semibold group-hover:text-primary transition">
                    {firstName} {lastName}
                  </h2>

                  {age && gender && (
                    <p className="text-xs opacity-60">
                      {age} • {gender}
                    </p>
                  )}

                  <p className="text-sm opacity-75 mt-1 line-clamp-2 max-w-xs">
                    {about}
                  </p>
                </div>
              </div>

              {/* Right Section Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    reviewRequest("rejected", request._id)
                  }
                  className="text-sm px-4 py-1.5 rounded-lg
                  bg-red-500/10 text-red-500
                  hover:bg-red-500 hover:text-white
                  transition-all duration-300"
                >
                  Reject
                </button>

                <button
                  onClick={() =>
                    reviewRequest("accepted", request._id)
                  }
                  className="text-sm px-4 py-1.5 rounded-lg
                  bg-primary/10 text-primary
                  hover:bg-primary hover:text-white
                  transition-all duration-300"
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;