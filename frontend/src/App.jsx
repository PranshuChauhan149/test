import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import { useMyContext } from './Context/AppContext';
import Home from './pages/Home';
import axios from 'axios';

const App = () => {
  const { User, server_Url,setUser} = useMyContext();

<<<<<<< HEAD
const getCurrentUser = async () => {
  try {
    const result = await axios.get(`${server_Url}/api/user/current`, {
      withCredentials: true,
    });

    console.log("Current User:", result.data);

    if (result.data.success) {
      setUser(result.data.user);  // ✔️ Save user in context
    } else {
      setUser(null);              // ❌ Not logged in
=======
    const getAllMessage = async () => {
    try {
      const res = await axios.get("https://test-b7a8.onrender.com/api/create/all", {
        withCredentials: true,
      });
      if (res.data.ress && res.data.ress) {
        setAll(res.data.ress); // assuming your backend sends { messages: [...] }
        console.log(res.data.ress);
      }
    } catch (error) {
      console.log("error in getAllMessage", error);
>>>>>>> 24fe686b063eecf5508ad2b6bae93ba64355dd5b
    }

  } catch (error) {
    console.error("Error fetching current user:", error);
    setUser(null);
  }
}

<<<<<<< HEAD
useEffect(() => {
  getCurrentUser();
}, []);


  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={!User ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!User ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={User ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
=======
export default App
>>>>>>> 24fe686b063eecf5508ad2b6bae93ba64355dd5b
