import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/LoginAndRegister/Login";
import Register from "./pages/LoginAndRegister/Register/Register";
import PrivateRoute from "./components/PrivateRoute"; // Don't destructure
import Toast from "../src/components/ToastComponents/Toast";
import ActionPage from "./pages/Actions/ActionPage";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path ="/actionPage" element ={<ActionPage/>}/>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route 
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
  );
};

export default App;
