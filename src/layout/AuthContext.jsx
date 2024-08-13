import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && !role) { 
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role);

        // Redireciona baseado no papel do usuário, apenas se necessário
        if (decodedToken.role === 'funcionario' && window.location.pathname !== '/funcionario-dashboard') {
          navigate('/funcionario-dashboard', { replace: true });
        } else if (decodedToken.role === 'beneficiario' && window.location.pathname !== '/beneficiario-dashboard') {
          navigate('/beneficiario-dashboard', { replace: true });
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        localStorage.removeItem('token');
        setToken('');
        setRole(null);
        navigate('/login', { replace: true });
      }
    }
  }, [token, role, navigate]); // Adiciona `role` como dependência para evitar loops

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken('');
    setRole(null);
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
