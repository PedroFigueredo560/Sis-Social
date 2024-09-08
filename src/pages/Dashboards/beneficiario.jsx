import React, { useState, useEffect } from "react";
import { Badge, Box, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from 'axios';
import SidebarLogged from "../../componentes/SidebarLogged/SidebarLogged";
import { Outlet, useNavigate } from "react-router-dom";
import "./style.css";
import MainContentWrapper from "../../componentes/MainContentWrapper";
import Chat from "../Chat";

const BeneficiarioDashboard = () => {
  const [numBeneficiarios, setNumBeneficiarios] = useState(0);
  const [numFuncionarios, setNumFuncionarios] = useState(0);
  const [numAtendimentos, setNumAtendimentos] = useState(0);
  const [numServicos, setNumServicos] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bensRes, funcsRes, atendimentosRes, servicosRes] = await Promise.all([
          axios.get('http://localhost:5000/get_ben'),
          axios.get('http://localhost:5000/get_func'),
          axios.get('http://localhost:5000/get_atendimentos'),
          axios.get('http://localhost:5000/get_servicos')
        ]);

        setNumBeneficiarios(bensRes.data.length);
        setNumFuncionarios(funcsRes.data.length);
        setNumAtendimentos(atendimentosRes.data.length);
        setNumServicos(servicosRes.data.length);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleProfileClick = () => {
    navigate("/beneficiario-dashboard/userBen");
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
        {location.pathname === "/beneficiario-dashboard" && (
            <>
              <h2 className="transparency-title">Transparência</h2>
              <div className="transparency-box">
                <div className="counter-item">Beneficiários: {numBeneficiarios}</div>
                <div className="counter-item">Funcionários: {numFuncionarios}</div>
                <div className="counter-item">Atendimentos Marcados: {numAtendimentos}</div>
                <div className="counter-item">Serviços: {numServicos}</div>
              </div>
            </>
          )}
          <Outlet />
        </MainContentWrapper>
        <Chat />
      </Box>
    </Box>
  );
};

export default BeneficiarioDashboard;