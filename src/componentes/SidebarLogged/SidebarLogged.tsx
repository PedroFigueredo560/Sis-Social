import React, { useState, useRef, useEffect } from 'react';
import { List, ListItem, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../layout/AuthContext';
import {
  Dashboard,
  People,
  Assignment,
  DocumentScanner,
  AttachMoney,
  Settings,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import './style.css';

const SidebarLogged: React.FC = () => {
  const { role, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!role) {
    return null;
  }

  const menuItems = getMenuItemsByRole(role);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={`sidebar-fixed ${!isMenuOpen ? 'collapsed' : ''}`} ref={sidebarRef}>
      <div className="sidebar-header">
        <IconButton className="menu-button" onClick={toggleMenu}>
          {isMenuOpen ? <ChevronLeftIcon sx={{ fontSize: 20, color: 'white' }} /> : <MenuIcon sx={{ fontSize: 30, color: 'white' }}/>}
        </IconButton>
      </div>
      <div className="sidebar-content">
        <List className="sidebar-list">
          {menuItems.map((item) => (
            <ListItem button key={item.text} className="sidebar-item">
              {React.cloneElement(item.icon, { sx: { fontSize: 30, color: 'white' } })}
              {isMenuOpen && (
                <Typography>
                  <Link to={item.link} className="sidebar-link">
                    {item.text}
                  </Link>
                </Typography>
              )}
            </ListItem>
          ))}
        </List>
      </div>
      <div className="logout-container">
        <button className="logout-button" onClick={logout}>
          Sair
        </button>
      </div>
    </div>
  );
};

const getMenuItemsByRole = (role: string) => {
  switch (role) {
    case 'funcionario':
      return [
        { text: 'Dashboard', link: '/funcionario-dashboard', icon: <Dashboard /> },
        { text: 'Funcionários', link: '/funcionario-dashboard/funcionarios', icon: <People /> },
        { text: 'Beneficiários', link: '/funcionario-dashboard/beneficiarios', icon: <Assignment /> },
        { text: 'Atendimentos', link: '/funcionario-dashboard/atendimentos', icon: <Assignment /> },
        { text: 'Serviços', link: '/funcionario-dashboard/servicos', icon: <Settings /> },
        { text: 'Financeiro', link: '/funcionario-dashboard/financeiro', icon: <AttachMoney /> },
        { text: 'Modelos', link: '/funcionario-dashboard/documentos', icon: <DocumentScanner /> },
        { text: 'Documentos', link: '/funcionario-dashboard/documentosbenFunc', icon: <DocumentScanner /> },
      ];
    case 'beneficiario':
      return [
        { text: 'Dashboard', link: '/beneficiario-dashboard', icon: <Dashboard /> },
        { text: 'Agendamentos', link: '/beneficiario-dashboard/agendamentos', icon: <Assignment /> },
        { text: 'Serviços', link: '/beneficiario-dashboard/servicos', icon: <Settings /> },
        { text: 'Modelos', link: '/beneficiario-dashboard/documentos', icon: <DocumentScanner /> },
        { text: 'Documentos', link: '/beneficiario-dashboard/documentosben', icon: <DocumentScanner /> },
      ];
    default:
      return [];
  }
};

export default SidebarLogged;
