import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/LoginAndRegister/Login";
import Register from "./pages/LoginAndRegister/Register";

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/login" element={<Login />} />
          <PrivateRoute path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
