import React from "react";
import { useState } from "react";

import { useLocation, useNavigate} from "react-router-dom";
import {toast} from 'react-hot-toast'
import axios from "axios";
import { useAuth } from "../contexts/Authprovider";

function LoginForm() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  
  const [error, setError] = useState('');

const navigate=useNavigate()
const location=useLocation()

const{loginAction}=useAuth()
const form=location.state?.form || '/journal'


 

  // Handle login submission and make POST request to backend
  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = loginData;
     

    try {
     const loginSuccessful= await loginAction({username,password})
      
     
      if(loginSuccessful){
        setLoginData({username:'',password:''})
        console.log("Login form success:going to journal")
        navigate('/journal')
      
      }
      
      
    } catch (error) {
      console.error('Login form failed',error);
      const errorMessage= error.response?.data?.message // Check for backend error message
      || error.message  
      setError(errorMessage)        
      toast.error('failed try again')
    }
  }
    return (
      <div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            id="username"
            placeholder="Sid456"
            value={loginData.username}
            onChange={(e) =>
              setLoginData({ ...loginData, username: e.target.value })
            }required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            required
            value={loginData.password}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };

export default LoginForm;
