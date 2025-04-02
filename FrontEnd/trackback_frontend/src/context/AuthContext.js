import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('token', token); // Store the token in localStorage
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('token'); // Remove the token from localStorage
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
