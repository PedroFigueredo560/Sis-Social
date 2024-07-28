//Aqui a gente configura as rotas/EPs
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Appointments from "./pages/agendamentos";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Financial from "./pages/Financial";
import Funcionarios from "./pages/Funcionarios";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Agendamentos" element={<Appointments/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />}/>
      <Route path="/financeiro" element={<Financial/>}/>
      <Route path="/funcionarios" element={<Funcionarios/>}/>
    </Routes>
  );
};

export default AppRoutes;
