import React, { createContext, useState } from 'react';
import API from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  );

  const login = async (email, password) => {
    const { data } = await API.post('/users/login', { email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUserInfo(data);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await API.post('/users/register', { name, email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUserInfo(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
