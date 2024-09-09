import React, { useState, useEffect } from "react";
import { Box, IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ScheduleIcon from "@mui/icons-material/Schedule";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import BuildIcon from "@mui/icons-material/Build";
import SidebarLogged from "../../componentes/SidebarLogged/SidebarLogged";
import { Outlet, useNavigate } from "react-router-dom";
import "./style.css";
import MainContentWrapper from "../../componentes/MainContentWrapper";
import Chat from "../Chat";
import axios from 'axios';
import { HiMenuAlt3 } from "react-icons/hi";

const FuncionarioDashboard = () => {
  const navigate = useNavigate();
  const [numBeneficiarios, setNumBeneficiarios] = useState(0);
  const [numFuncionarios, setNumFuncionarios] = useState(0);
  const [numAtendimentos, setNumAtendimentos] = useState(0);
  const [numServicos, setNumServicos] = useState(0);

  const handleProfileClick = () => {
    navigate("/funcionario-dashboard/user");
  };

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
          {location.pathname === "/funcionario-dashboard" && (
            <>
              <h2 className="transparency-title">Transparencia</h2>
              <section className="Container">
                <div className="card-containers-grid">
                  <div className="card-container">
                  <PeopleAltIcon sx={{ fontSize: 28, color: "#c7853a" }} />
                    <div className="card-container-header">
                     
                      <h2>{numBeneficiarios}</h2>
                      <h3>Beneficiários</h3>
                    </div>
                    <div className="card-body">
                      <p>Total de beneficiários registrados no sistema.</p>
                    </div>
                  </div>

                  <div className="card-container">
                  <GroupAddIcon sx={{ fontSize: 28, color: "#c7853a" }} />
                    <div className="card-container-header">
      
                      <h2>{numFuncionarios}</h2>
                      <h3>Funcionários</h3>
                    </div>
                    <div className="card-body">
                      <p>Total de funcionários ativos.</p>
                    </div>
                  </div>

                  <div className="card-container">
                  <ScheduleIcon sx={{ fontSize: 28, color: "#c7853a" }} />
                    <div className="card-container-header">
          
                      <h2>{numAtendimentos}</h2>
                      <h3>Atendimentos</h3>
                    </div>
                    <div className="card-body">
                      <p>Atendimentos marcados no sistema.</p>
                    </div>
                  </div>

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

export default FuncionarioDashboard;
