import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axios';
import "./Register.css"
import registerArt from '../../../Images/registerArt.png'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/Auth/register', {
        name,
        email,
        password,
        phoneNumber,
      });

      if (response.status === 201) {
        // Successful registration, navigate to login page
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <div className="main-layout-register">
        <div className="two-column-layout-register">
          <div className="left-column-register">
           
          </div>
          <div className="right-column-register">
          <div className="register-contaner">
              <h2>Registration</h2><br /><br />
              {error && <div className="error">{error}</div>}
              <form onSubmit={handleRegister}>
                <div>
                  <label>Name:</label><br />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div><br /><br />
                <div>
                  <label>Email:</label><br />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div><br /><br />
                <div>
                  <label>Password:</label><br />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div><br /><br />
                <div>
                  <label>Phone Number:</label><br />
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div><br /><br /><br /><br />
                <button id="registerButton" type="submit">Register</button>
              </form>
              <p>
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default Register;
