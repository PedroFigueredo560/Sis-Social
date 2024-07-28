// import React, { createContext, useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     setToken(storedToken);
//   }, []);

//   const login = (newToken) => {
//     localStorage.setItem('token', newToken);
//     setToken(newToken);
//   };


//   const logout = () => {
//     setToken("");
//     localStorage.removeItem("token");
//     navigate("/"); 
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/"); 
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

