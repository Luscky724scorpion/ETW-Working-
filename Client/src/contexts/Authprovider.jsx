import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import axiosInstance from "./AxiosInstance";

import AuthService from "./AuthService";


const AuthContext = createContext(null);

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
  //login action will go here -remember to adjust your functonality accordingly 
  const loginAction= async(credentials)=>{
    //see how this will work with your functionalities because you are keeping it consistentby usining loginData
    try{
    const data=await AuthService.login(credentials)
    if(data&&data.token && data.user){
        setToken(data.token);
        setUser(data.user)
        localStorage.setItem('authToken',data.token)
        localStorage.setItem('authUser',JSON.stringify(data.user))

     
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

        console.log("AuthProvider: Login successful, state, storage, and headers updated.");
        return true;
    }}catch(error){
        console.error("error loggin in at the cotext")
    }

    }

    //signup context 
    const signupAction=async(userData)=>{
      setIsLoading(true)
      try {
        const data= await AuthService.singup(userData)

        console.log("Auth:SIGNUP API CALL SUCCESS",data)
        if(data &&data.token &&data.user){
          console.log("Authprovicder sign up siccessful")
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('authToken',data.token)
          localStorage.setItem('authUser',JSON.stringify(data.user))
          axiosInstance.defaults.headers.common['Authorization']=`Bearer ${data.token}`
          return{success:true,autoLogin:true}
        }else{
          console.log("AuthProvider:Signup success, user needs to log in")
        }
      } catch (error) {
        console.log("AuthProvider:signup failed",error)
        throw error
      }finally{
        setIsLoading(false)
      }
    }
    const value = useMemo(
        () => ({
          token,
          user,
          signupAction, 
          
          loginAction, // Include the login action function
        
        }))
  //singup context
  //logout 
  //lastly use these context values accross your routes and export em out 

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

}
  

export const useAuth = () => {
    const context = useContext(AuthContext);
    // Ensure the hook is used within an AuthProvider
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
export default AuthContext;
