import React from "react";
import { useState } from "react";

import { useNavigate} from "react-router-dom";
import {toast} from 'react-hot-toast'
import axios from "axios";
;
function LoginForm() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  

const navigate=useNavigate()
 

  // Handle login submission and make POST request to backend
  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = loginData;
     

    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password
      });
     
      if(response.data.error){
        toast.error(response.data.error)
      }else{
        const token=response.data.token
        setLoginData({username:'',password:''})
        localStorage.setItem('token', token);
        navigate('/journal')
      }
      
      
    } catch (error) {
      console.error(error);
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
            }
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            value={loginData.password}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };

export default LoginForm;
