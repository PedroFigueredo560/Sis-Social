import React from "react";
import { Box } from "@mui/material";
import SidebarLogged from "../../componentes/SidebarLogged/SidebarLogged";
import { Outlet } from "react-router-dom";
import "./style.css";
import MainContentWrapper from "../../componentes/MainContentWrapper";

const FuncionarioDashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <SidebarLogged />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <h1>Dashboard Funcionario</h1> */}
        <MainContentWrapper>
          <Outlet />
        </MainContentWrapper>
      </Box>
    </Box>
  );
};

export default FuncionarioDashboard;

