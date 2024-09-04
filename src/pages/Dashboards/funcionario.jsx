import React from "react";
import { Box, IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SidebarLogged from "../../componentes/SidebarLogged/SidebarLogged";
import { Outlet,useNavigate } from "react-router-dom";
import "./style.css";
import MainContentWrapper from "../../componentes/MainContentWrapper";



const FuncionarioDashboard = () => {
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate("/funcionario-dashboard/user"); // Certifique-se de que essa rota está configurada corretamente
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <SidebarLogged />
      <Box component="main" sx={{ flexGrow: 1, p: 3, position: "relative" }}>
        <div className="icons">
          <IconButton aria-label="show notifications">
            <Badge badgeContent={2} sx={{ "& .MuiBadge-badge": { backgroundColor: "#e67f7b" } }}>
              <NotificationsIcon sx={{ fontSize: 24 }} />
            </Badge>
          </IconButton>
          <IconButton edge="end" onClick={handleProfileClick} aria-label="account of current user">
            
            <AccountCircleIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </div>
        <MainContentWrapper>
          <Outlet />
        </MainContentWrapper>
      </Box>
    </Box>
  );
};

export default FuncionarioDashboard;
