
import React from 'react';
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Display from './components/Display';
import Update from './components/Update';

// import Navigation from "./components/Navigation";
//import { Router, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login')
    window.location.reload()
  }

  return (
    <>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/display" element={<Display/>} />
        <Route path="/update" element={<Update/>} />
      </Routes>

      <h1>TO-DO-LIST</h1>
      <br></br>
			<br></br>
			<button onClick={handleLogin} className="button">Go to the sign in page</button> <br />
    </>

  );
}

export default App;
