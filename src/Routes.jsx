//Aqui a gente configura as rotas/EPs
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Appointments from "./pages/agendamentos";
import Login from "./pages/Login";
import Register from "./pages/register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Agendamentos" element={<Appointments/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register/>}/>
    </Routes>
  );
};

export default AppRoutes;
