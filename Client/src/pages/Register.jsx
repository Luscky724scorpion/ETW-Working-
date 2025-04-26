import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register(){
  const Navigate=useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email:'',
    password: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    const{username,email,password}=formData
    try {
      // Use your environment URL for flexibility
      const response= await axios.post("/api/auth/register",formData);
      if(response.data.error){
        setError(response.data.error)
        console.log(response.data.error);
        
      }else{
        setFormData({
          username:'',
          email:'',
          password:''
        }),
        setMessage('success')
        console.log("success");
        Navigate('/login')
        
      }

    } catch (error) {
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          "Registration failed. Please try again.";
      setError(errorMessage);
      console.error("Registration error:", errorMessage);
    }
  };


return (
  <div>
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="name"
        value={formData.username}
        onChange={(e)=>setFormData({...formData,username:e.target.value})}
        required
      />
      <label>Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email@gmail.com"
        value={formData.email}
        onChange={(e)=>setFormData({...formData,email:e.target.value})}
        required
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="password"
        name="password"
        value={formData.password}
        onChange={(e)=>setFormData({...formData,password:e.target.value})}
        required
      />
      <button type="submit" >
        Submit
      </button>
    </form>
  </div>
);
}
export default Register
