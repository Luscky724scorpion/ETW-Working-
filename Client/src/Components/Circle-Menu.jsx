import React, { useState } from 'react';
import './circle.css';
import axios from "axios"

function CircleMenu() {{
const[message,setMessage]=useState(false)

const handleFeelingsClick=async(feeling)=>{
  try {
    setMessage('')

    const token=localStorage.getItem('token')
    if(!token){
      setMessage('Log in!')
      return
     
      
    }else{const response=await axios.post("/api/feels/log-feels",{
      feelings:feeling
    },{
      headers:{
        'Authorization':`Bearer ${token}`,
        'Content-Type':'application/json'
      }
    }
  )
if (response.status===200){
  setMessage(`${feeling} logged successfully`)
}}
  } catch (error) {
    console.error('Error logging feeling:', error);
    setMessage(error.response?.data?.message || 'Failed to log feeling');
    
  }
}
}
  return (
    <nav className="circle-menu">
      <div className="center" />
      <ul>
      <li id="anger">
    <a href="#" className="icon-gist-secret" onClick={(e)=>{e.preventDefault(); handleFeelingsClick('anger')}}>
      <span className="segment"> Anger</span>
    </a>
  </li>
  <li id="fear">
    <a href="#" className="icon-hubot" onClick={(e)=>{e.preventDefault(); handleFeelingsClick('fear')}}>
      Fear
    </a>
  </li>
  <li id="disgust">
    <a href="#" className="icon-hourglass" onClick={(e)=>{e.preventDefault(); handleFeelingsClick('disgust')}}> 
      Disgust
    </a>
  </li>
  <li id="happy">
    <a href="#" className="icon-light-bulb"onClick={(e)=>{e.preventDefault(); handleFeelingsClick('happy')}}>
      Happy
    </a>
  </li>
  <li id="sad">
    <a href="#" className="icon-squirrel"onClick={(e)=>{e.preventDefault(); handleFeelingsClick('sad')}}>
      <span className="segment">Sad</span>
    </a>
  </li>
  <li id="surprise">
    <a href="#" className="icon-law"onClick={(e)=>{e.preventDefault(); handleFeelingsClick('surprise')}}>
      Surprise
    </a>
  </li>


      </ul>
    </nav>
  );
}

export default CircleMenu;