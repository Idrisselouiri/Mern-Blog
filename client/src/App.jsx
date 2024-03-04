import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//layout
import NavBar from "./components/layout/NavBar.jsx";
//pages
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Signin from "./pages/Signin.jsx";
import Login from "./pages/Login.jsx";
const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/log-in" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
