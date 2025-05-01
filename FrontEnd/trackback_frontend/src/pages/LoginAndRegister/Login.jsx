import "./Login.css";
import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios.js'; 
import { AuthContext } from '../../context/AuthContext.js'; 
import CustomBackground from './CustomBackgound.jsx';
//import { ToastContext } from "../../context/ToastContext"; 
import image from '../../Images/waves.png';
import loginArt from '../../Images/LoginArt.png'

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
      const userId = response.data.userId;
      console.log('user' + userId);
      login(token); // Save the token in AuthContext and localStorage
      localStorage.setItem('userId', userId); // save user id in local storage

      navigate('/actionPage'); // Redirect to home page after successful login
    } catch (error) {
      console.error("Login failed", error);
      //showToast("Login failed. Please try again.");
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="main-layout">
      <div className="two-column-layout">
        <div id = "login-column" className="left-column">
        <img className="LoginArt" src={loginArt} alt="Login Art" />
        <p className = "login-intro"> Let' s Get You Back <br /> On Track <span id="sub-Intro">Sign in to find or report items</span></p>
        </div>
        <div className="right-column">
        <div className="login-page">
        {/* //<img className = "waveImage"src={image} alt="Logo" /> */}
      
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label className="login-labl">Email:</label><br />
              <input 
                 id="login-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div><br /><br />
            <div>
              <label className="login-labl">Password:</label><br />
              <input
                id="login-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div><br /><br /><br /><br /><br />
            <button id="loginButton" type="submit">Login</button>
          </form>
          <h3>Want to create a Account?</h3> <a href = "/register"> Create Account</a>
        </div>
      </div>
        </div>
      </div>

     
    </div>
  );
};

export default Login;
