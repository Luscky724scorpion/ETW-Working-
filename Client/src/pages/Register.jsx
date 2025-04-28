import React from "react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/Authprovider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function Register(){
  const Navigate=useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email:'',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting,setIsSubmitting]=useState(false)
  const [message, setMessage] = useState('');

 const {signupAction}=useAuth()
//trying out unified handler
 const handleChange=(e)=>{
  const{name,value}=e.target

    setFormData(prevState=>({
      ...prevState,
      [name]:value
    }))

 }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
   setIsSubmitting(true)
    //client side validation adjustments
    if(!formData.username||!formData.email||!formData.password){
      setError('please fill all required fields')
      setIsSubmitting(false)
      return
    }
    //initial signupAction testing
    if (typeof signupAction !== 'function') {
      console.error("Register Component Error: signupAction is not available or not a function.");
      setError("Registration service is unavailable. Please try again later.");
      toast.error("Registration service is unavailable.");
      setIsSubmitting(false);
      return;
  }
    try {
      // Use your environment URL for flexibility
      const result=await signupAction(formData)

      if(result.success){
        console.log("Registration success")
        setFormData({username:'',email:'',password:''})
        Navigate('/login')
        
      }

    } catch (error) {
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          "Registration form page failed. Please try again.";
      setError(errorMessage);
      console.error("Registration page component error:", errorMessage);
    }finally{
      setIsSubmitting(false)
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
        onChange={handleChange}
        required
      />
      <label>Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email@gmail.com"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
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
