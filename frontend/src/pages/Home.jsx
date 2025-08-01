import React from "react";
import { useMyContext } from "../Context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { User, setUser, server_Url } = useMyContext();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const result = await axios.post(
        `${server_Url}/api/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      console.log("Logout response:", result.data);

      // Optionally clear user state
      setUser(null);

      // Navigate to login or home
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div>
      <p> {User?.username}</p>
      <div>{User?.email}</div>
      <div>
        <button
          className="bg-black text-white px-4 rounded-2xl mt-6"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Home;
