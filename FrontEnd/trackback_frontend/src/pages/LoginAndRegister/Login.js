import React from 'react';
import "./Login.css";
import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to backend
      const response = await axiosInstance.post('/auth/login', { email, password });

      // If login is successful, store the token and navigate
      const token = response.data.token;
      login(token); // Save the token in AuthContext and localStorage

      navigate('/home'); // Redirect to home page after successful login
    } catch (error) {
      console.error("Login failed", error);
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
    </div>
  );
};

export default Login;
