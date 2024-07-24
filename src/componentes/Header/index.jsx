import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import "./style.css";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <AppBar position="static" className="header">
      <Toolbar className="Toolbar">
        <Typography className="logo">
          <Link to="/" className="logo-link">
            Logo aqui
          </Link>
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
              id="menu-btn"
            >
              <MenuIcon />
            </IconButton>
            <nav className={`navbar ${menuActive ? "active" : ""}`}>
              <Link to="/" className="nav-link" onClick={toggleMenu}>
                Início
              </Link>
              <Link
                to="/Agendamentos"
                className="nav-link"
                onClick={toggleMenu}
              >
                Agendamentos
              </Link>
              <Link to="/financeiro" className="nav-link" onClick={toggleMenu}>
                Financeiro
              </Link>
            </nav>
          </>
        ) : (
          <div className="nav-buttons">
            <Button>
              <Link to="/" className="nav-link">
                Início
              </Link>
            </Button>
            <Button>
              <Link to="/Agendamentos" className="nav-link">
                Agendamentos
              </Link>
            </Button>
            <Button>
              <Link to="/financeiro" className="nav-link">
                Financeiro
              </Link>
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
