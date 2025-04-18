import React, { useRef, useState } from "react";
import "./App.css";
import "./index.css";

import NavBar from "./Components/NavBar";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Wheel from "./pages/wheel";
import Feelings from "./pages/Feelings";

import Logs from "./pages/Logs";
import Board from "./pages/Board";
import Journal from "./pages/Journal";
import Register from "./pages/Register";
import Home from "./pages/home";
import LoginForm from "./pages/login";
;
import axios from "axios";
import Access from "./pages/access";
axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
    <NavBar />
     
      <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/wheel" element={<Wheel />} />

        <Route path="/Journal" element={<Journal />} />
        <Route path="/Feelings" element={<Feelings />} />

        <Route path="/Logs" element={<Logs />} />
        <Route path="/Board" element={<Board />} />
        <Route path="/Access" element={<Access />} />
      </Routes>
   </div>
    
  );
}

export default App;
