import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Signin from "./pages/Signin.jsx";
import Login from "./pages/Login.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
