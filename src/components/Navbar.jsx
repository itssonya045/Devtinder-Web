import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((store) => store.user);
  
  const handlelogout = async()=>{
    axios.post("http://localhost:7777/logout",{},{withCredentials : true})
      dispatch(removeUser(user))
      return navigate("/login")
  }

return (
  <div className="navbar bg-base-300 border-b border-base-100/40 px-6">
    
    {/* Left Section */}
    <div className="flex-1">
      <Link
        to="/"
        className="text-xl font-semibold tracking-tight hover:text-primary transition"
      >
        👩‍💻 DevTinder
      </Link>
    </div>

    {user && (
      <div className="flex-none flex items-center gap-6">

        {/* Welcome Text */}
        <div className="text-sm opacity-70">
          Welcome, <span className="font-medium">{user.firstName}</span>
        </div>

        {/* Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="w-10 h-10 rounded-full overflow-hidden
            border border-base-100/40
            hover:border-primary
            transition cursor-pointer"
          >
            <img
              alt="user"
              src={user.photoUrl}
              className="w-full h-full object-cover"
            />
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content
            bg-base-200
            rounded-xl
            z-[1] mt-3 w-52 p-2
            shadow-lg border border-base-100/40"
          >
            <li>
              <Link to="/profile" className="hover:bg-base-300 rounded-lg">
                Profile
              </Link>
            </li>

             <li>
              <Link to="/" className="hover:bg-base-300 rounded-lg">
                Discover
              </Link>
            </li>

            <li>
              <Link to="/connections" className="hover:bg-base-300 rounded-lg">
                Connections
              </Link>
            </li>

            <li>
              <Link to="/requests" className="hover:bg-base-300 rounded-lg">
                Requests
              </Link>
            </li>

            <li>
              <button
                onClick={handlelogout}
                className="hover:bg-red-500 hover:text-white rounded-lg"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    )}
  </div>
);
};
export default NavBar;