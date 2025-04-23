import "./Login.css";
import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios'; 
import { AuthContext } from '../../context/AuthContext'; 
//import { ToastContext } from "../../context/ToastContext"; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  //const {showToast} = useContext(ToastContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to backend
      const response = await axiosInstance.post('/Auth/login', { email, password });

      // If login is successful, store the token and navigate
      const token = response.data.token;
      login(token); // Save the token in AuthContext and localStorage

      navigate('/actionPage'); // Redirect to home page after successful login
    } catch (error) {
      console.error("Login failed", error);
      //showToast("Login failed. Please try again.");
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <h3>Want to create a Account?</h3> <a href = "/register"> Create Account</a>
    </div>
  );
};

export default Login;
