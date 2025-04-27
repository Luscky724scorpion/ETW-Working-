import { createContext, useEffect, useState } from "react";
import axiosInstance from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("authUser");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("failed to parse user data");
      localStorage.removeItem("authUser");
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");
    if (storedToken) {
      setToken(storedToken);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedToken}`;
      console.log("Authprovier:token founds, setting state with axios header");
      try {
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("AuthProvider:failed to Parse stored user");
      }
    } else {
      console.log("AuthProvider:no token found");
    }setIsLoading(false)
  },[]);
  //login action will go here -
  //singup context
  //logout 
  //lastly use these context values accross your routes and export em out 

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
