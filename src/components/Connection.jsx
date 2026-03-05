import axios from "axios";
import React, { useEffect } from "react";
import { Base_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link, useNavigate } from "react-router-dom";

export const Connection = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        Base_URL + "/user/connections",
        { withCredentials: true }
      );
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return (
      <div className="flex items-center justify-center mt-20">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg px-10 py-8 text-center max-w-md w-full">
          <div className="text-5xl mb-4">🤝</div>
          <h2 className="text-2xl font-semibold text-white">
            No Connections Yet
          </h2>
          <p className="text-gray-400 mt-3 text-sm">
            You haven't connected with anyone yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-tight">
        Your Connections
      </h1>

      <div className="max-w-2xl mx-auto space-y-4">
        {connections.map((connection) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
          } = connection;

          return (
            <div
              key={_id}
              className="group flex items-center justify-between
              bg-base-300/80 backdrop-blur-md
              px-5 py-4 rounded-xl
              border border-base-100/40
              hover:border-primary/40
              hover:-translate-y-0.5
              transition-all duration-300"
            >
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
                  <h2 className="text-base font-semibold leading-tight group-hover:text-primary transition">
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

             <Link Link to={`/chat/${_id}`}>
              <button
                className="px-4 py-2 text-sm font-medium
                bg-primary text-white
                rounded-lg
                hover:bg-primary-focus
                active:scale-95
                transition-all duration-200"
              >
                💬 Chat
              </button></Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};