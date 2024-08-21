import React, { useState } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import './style.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        className="Box"
        sx={{
          flexGrow: 1,
          position: 'fixed', 
          top: 0,
          width: '100%',
          backgroundColor: '#333',
          color: theme.palette.common.white, 
          zIndex: 9999, 
        }}
      >
        <AppBar position="static" color="transparent" elevation={0} className="appbar">
          <Toolbar>
            <Typography className="logo">
              <Link to="/" className="logo-link">
                <img className="logo" src="src/assets/sis-social-high-resolution-logo-transparent (1).png" alt="Logo_sis_social" />
              </Link>
            </Typography>
            <span className="desktop">
              <Typography>
                <a href="/">Início</a>
              </Typography>
              <Typography>
                <a href="#sobre">Sobre</a>
              </Typography>
              <Typography>
                <a href="#servicos">Serviços</a>
              </Typography>
              <Typography>
                <a href="#contato">Contato</a>
              </Typography>
              <Typography>
                <Link to="/login">Login</Link>
              </Typography>
              <Typography>
                <Link to="/cadastro" className="button-cadastro">Cadastro</Link>
              </Typography>
            </span>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: -2, color: 'white' }}
              onClick={toggleSidebar}
              className="mobile-links"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Sidebar open={open} toggleSidebar={toggleSidebar} />
    </>
  );
}
