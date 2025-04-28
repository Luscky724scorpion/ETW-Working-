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
import ProtectedRoute from "./contexts/ProtectedRoute";
import axios from "axios";



function App() {
  return (
    <div>
    <NavBar />
     
      <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/wheel" element={<Wheel />} />

        <Route path="/Journal" element={<ProtectedRoute><Journal /></ProtectedRoute>} />
        <Route path="/Feelings" element={<ProtectedRoute><Feelings /></ProtectedRoute>} />

        <Route path="/Logs" element={<ProtectedRoute><Logs /></ProtectedRoute>} />
        <Route path="/Board" element={<ProtectedRoute><Board /></ProtectedRoute>} />
        
      </Routes>
   </div>
    
  );
}

export default App;
