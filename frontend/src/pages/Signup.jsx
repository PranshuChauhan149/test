import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../Context/AppContext";
import axios from "axios"; // Don't forget this!
import { toast } from "react-toastify";

const Signup = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { server_Url, setUser } = useMyContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${server_Url}/api/user/signup`,
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      navigate("/login")
      
    } catch (error) {
      console.log("Something is wrong ");
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-200 py-10">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-sm text-gray-600">username</label>
            <input
              type="text"
              name="username" // ✅ Fixed here
              onChange={(e) => setusername(e.target.value)}
              value={username}
              placeholder="Enter your username"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-lg transition"
          >
            Sign Up
          </button>

          <p className="text-sm text-center text-gray-600 mt-3">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-orange-500 cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
