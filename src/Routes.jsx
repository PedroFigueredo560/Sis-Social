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
import RegistrarFuncionarios from "./pages/RegistrarFuncionarios";
import Beneficiarios from "./pages/Beneficiario";
import EditBeneficiarios from "./pages/EditBeneficiario";
import Documentos from "./pages/DocumentModel";
import Servicos from "./pages/Serviços";
import EditServicos from "./pages/EditServicos";
import RegistrarServicos from "./pages/RegistrarServicos";
import DocumentosBen from "./pages/DocumentosBen";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home  />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route element={<PrivateArea />}>
        <Route element={<LoggedAreaLayout />}>
          <Route path="/beneficiario-dashboard" element={<BeneficiarioDashboard />}>
            <Route path="agendamentos" element={<Appointments />} />
            <Route path="documentos" element={<Documentos />} />
            <Route path="beneficiarios" element={<Beneficiarios />} />
            <Route path="servicos" element={<Servicos />} />
            <Route path="edit_beneficiario/:cpf" element={<EditBeneficiarios />} />
          </Route>

          <Route path="/funcionario-dashboard" element={<FuncionarioDashboard />}>
            <Route path="agendamentos" element={<Appointments />} />
            <Route path="documentos" element={<Documentos />} />
            <Route path="funcionarios" element={<Funcionarios />} />
            <Route path="beneficiarios" element={<Beneficiarios />} />
            <Route path="servicos" element={<Servicos />} />
            <Route path="financeiro" element={<Financial />} />
            <Route path="edit_funcionario/:cpf" element={<EditFuncionarios />} />
            <Route path="registrar_funcionario" element={<RegistrarFuncionarios />} />
            <Route path="registrar_servicos" element={<RegistrarServicos />} />
            <Route path="edit_servicos/:nome" element={<EditServicos />} />
            <Route path="documentosben" element={<DocumentosBen />} />
          </Route>
        </Route>
      </Route>
      <Route path="/funcionarios" element={<Funcionarios />}/>
      <Route path="/edit_funcionario/:cpf" element={<EditFuncionarios />} />
      <Route path="/registrar_funcionario" element={<RegistrarFuncionarios />} />
      <Route path="/beneficiarios" element={<Beneficiarios />} />
      <Route path="/edit_beneficiario/:cpf" element={<EditBeneficiarios />} />
      <Route path="/servicos" element={<Servicos />} />
      <Route path="/edit_servicos/:nome" element={<EditServicos />} />
      <Route path="registrar_servicos" element={<RegistrarServicos/>}/>
      
    </Routes>
  );
};

export default AppRoutes;
