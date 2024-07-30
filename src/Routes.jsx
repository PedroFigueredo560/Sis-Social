import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Appointments from "./pages/agendamentos";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Financial from "./pages/Financial";
import { PrivateArea } from "./layout/PrivateArea";
import LoggedAreaLayout from "./layout/LoggedAreaLayout";
import Funcionarios from "./pages/Funcionarios";
import EditFuncionarios from "./pages/EditFuncionarios";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route element={<PrivateArea />}>
        <Route element={<LoggedAreaLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/agendamentos" element={<Appointments />} />
          <Route path="/financeiro" element={<Financial />} />
        </Route>
      </Route>
      <Route path="/funcionarios" element={<Funcionarios />}/>
      <Route path="/edit_funcionario/:cpf" element={<EditFuncionarios />} />
    </Routes>
  );
};

export default AppRoutes;
