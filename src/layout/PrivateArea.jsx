import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateArea = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;

    if (!role) {
      return <Navigate to="/login" />;
    }

    return <Outlet />;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return <Navigate to="/login" />;
  }
};

export default PrivateArea;