import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAndSetUser();
  }, []);

  const checkAndSetUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userInfo = decodeToken(token);
        setUser(userInfo);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, checkAndSetUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const decodeToken = (token) => {
  return JSON.parse(atob(token.split('.')[1]));
};