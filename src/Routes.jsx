//Aqui a gente configura as rotas/EPs
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Appointments from "./pages/agendamentos";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Agendamentos" element={<Appointments/>} />
    </Routes>
  );
};

export default AppRoutes;
