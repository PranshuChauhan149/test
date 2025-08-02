import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = createContext();


export const MyProvider = ({ children }) => {
  const [User, setUser] = useState(null);

  const server_Url = "https://test-b7a8.onrender.com"; 






  return (
    <AppContext.Provider
      value={{
        setUser,
        User,
        server_Url,
     
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


export const useMyContext = () => useContext(AppContext);


