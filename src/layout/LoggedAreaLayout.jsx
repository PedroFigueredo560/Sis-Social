import React from 'react';
import { Outlet } from 'react-router-dom';
import './style.css';
import SidebarLogged from '../componentes/SidebarLogged/SidebarLogged';

const LoggedAreaLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SidebarLogged />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Outlet /> 
      </div>
    </div>
  );
};

export default LoggedAreaLayout;

