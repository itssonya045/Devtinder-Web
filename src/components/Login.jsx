import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../utils/constant";

const Login = () => {
  const [Email, setEmail] = useState("swati123@gmail.com");
  const [Password, setPassword] = useState("Swati@1234");
  const [Error , setError] = useState("")
   const dispatch = useDispatch()
   const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(Base_URL+"/login", {
        emailId: Email,
        password: Password,
      },{
        withCredentials : true
      });
      dispatch(addUser(res.data))
      return navigate("/")
      
    } catch (error) {
      setError(error?.response?.data)
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              className="input"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
             <p className="text-red-400">{Error}</p>
          <div className="card-actions justify-center">
            
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

