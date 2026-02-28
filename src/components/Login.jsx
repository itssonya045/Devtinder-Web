import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../utils/constant";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const url = isLogin ? "/login" : "/signup";

      const payload = isLogin
        ? { emailId: Email, password: Password }
        : { firstName, lastName, emailId: Email, password: Password };

      const res = await axios.post(Base_URL + url, payload, {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data);
    }
  };

 return (
  <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
    <div className="w-full max-w-md bg-base-300 backdrop-blur-lg shadow-2xl rounded-2xl p-8 transition-all duration-300">

      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6">
        {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
      </h2>

      {/* Signup Fields */}
      {!isLogin && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">First Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-base-200 border border-transparent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Last Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-base-200 border border-transparent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
            />
          </div>
        </div>
      )}

      {/* Email */}
      <div className="mt-4">
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 rounded-lg bg-base-200 border border-transparent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>

      {/* Password */}
      <div className="mt-4">
        <label className="block text-sm mb-1">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 rounded-lg bg-base-200 border border-transparent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>

      {/* Error */}
      {Error && (
        <p className="text-red-400 text-sm text-center mt-3">{Error}</p>
      )}

      {/* Button */}
      <button
        className="w-full mt-6 py-2.5 rounded-lg bg-primary text-white font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
        onClick={handleSubmit}
      >
        {isLogin ? "Login" : "Signup"}
      </button>

      {/* Toggle */}
      <p className="text-center mt-6 text-sm opacity-80">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span
          className="ml-2 text-primary font-medium cursor-pointer hover:underline"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
        >
          {isLogin ? "Signup" : "Login"}
        </span>
      </p>
    </div>
  </div>
);
};

export default Auth;