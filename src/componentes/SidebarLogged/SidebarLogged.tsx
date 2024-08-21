import React from 'react';
import { List, ListItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../layout/AuthContext';
import {
  Dashboard,
  People,
  Assignment,
  DocumentScanner,
  AttachMoney,
  Settings
} from '@mui/icons-material';
import './style.css';

const SidebarLogged = () => {
  const { role, logout } = useAuth();

  if (!role) {
    return null;
  }

  const menuItems = getMenuItemsByRole(role);

  return (
    <div className="sidebar-fixed">
      <List className="sidebar-list">
        {menuItems.map((item) => (
          <ListItem button key={item.text} className="sidebar-item">
            {React.cloneElement(item.icon, { fontSize: 'small', color: 'black' })}
            <Typography>
              <Link to={item.link} className="sidebar-link">
                {item.text}
              </Link>
            </Typography>
          </ListItem>
        ))}
      </List>
      <div className="logout-container">
        <button className="logout-button" onClick={logout}>
          Sair
        </button>
      </div>
    </div>
  );
};

const getMenuItemsByRole = (role) => {
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
        { text: 'Documentos', link: '/funcionario-dashboard/documentosbenFunc', icon: <DocumentScanner /> }
      ];
    case 'beneficiario':
      return [
        { text: 'Dashboard', link: '/beneficiario-dashboard', icon: <Dashboard /> },
        { text: 'Agendamentos', link: '/beneficiario-dashboard/agendamentos', icon: <Assignment /> },
        { text: 'Serviços', link: '/beneficiario-dashboard/servicos', icon: <Settings /> },
        { text: 'Modelos', link: '/beneficiario-dashboard/documentos', icon: <DocumentScanner /> },
        { text: 'Documentos', link: '/beneficiario-dashboard/documentosben', icon: <DocumentScanner /> }
      ];
    default:
      return [];
  }
};

export default SidebarLogged;
