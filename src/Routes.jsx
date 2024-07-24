//Aqui a gente configura as rotas/EPs
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Financial from "./pages/Financial";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register/>}/>
      <Route path="/financeiro" element={<Financial/>}/>
    </Routes>
  );
};

export default AppRoutes;
