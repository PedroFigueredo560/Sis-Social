import React, { useState, useEffect } from "react";
import { Badge, Box, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BuildIcon from "@mui/icons-material/Build";
import SidebarLogged from "../../componentes/SidebarLogged/SidebarLogged";
import { Outlet, useNavigate } from "react-router-dom";
import "./style.css";
import MainContentWrapper from "../../componentes/MainContentWrapper";
import Chat from "../Chat";
import axios from 'axios';

const BeneficiarioDashboard = () => {
  const [numServicos, setNumServicos] = useState(0);
  const [numAgendamentos, setNumAgendamentos] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicosRes, agendamentosRes] = await Promise.all([
          axios.get('http://localhost:5000/get_servicos'),
          axios.get('http://localhost:5000/agendamentos')
        ]);

        setNumServicos(servicosRes.data.length);
        setNumAgendamentos(agendamentosRes.data.length);
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
              <section className="Container">
                <div className="card-containers-grid">
                  <div className="card-container">
                    <BuildIcon sx={{ fontSize: 28, color: "#c7853a" }} />
                    <div className="card-container-header">
                      <h2>{numServicos}</h2>
                      <h3>Serviços</h3>
                    </div>
                    <div className="card-body">
                      <p>Serviços disponíveis para os beneficiários.</p>
                    </div>
                  </div>

                  <div className="card-container">
                    <ScheduleIcon sx={{ fontSize: 28, color: "#c7853a" }} />
                    <div className="card-container-header">
                      <h2>{numAgendamentos}</h2>
                      <h3>Agendamentos</h3>
                    </div>
                    <div className="card-body">
                      <p>Agendamentos marcados no sistema.</p>
                    </div>
                  </div>
                </div>
              </section>
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
