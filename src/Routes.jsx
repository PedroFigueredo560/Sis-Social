import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Appointments from "./pages/agendamentos";
import Atendimentos from "./pages/atendimentos";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Financial from "./pages/Financial";
import PrivateArea from './layout/PrivateArea';
import LoggedAreaLayout from "./layout/LoggedAreaLayout";
import Funcionarios from "./pages/Funcionarios";
import EditFuncionarios from "./pages/EditFuncionarios";
import RegistrarFuncionarios from "./pages/RegistrarFuncionarios";
import Beneficiarios from "./pages/Beneficiario";
import EditBeneficiarios from "./pages/EditBeneficiario";
import EditAtendimento from "./pages/EditAtendimento";
import Documentos from "./pages/DocumentModel";
import Servicos from "./pages/Serviços";
import EditServicos from "./pages/EditServicos";
import RegistrarServicos from "./pages/RegistrarServicos";
import CadastroAtendimento from "./pages/CadastroAtendimento";
import DocumentosBen from "./pages/DocumentosBen";
import DocumentosBenFunc from "./pages/DocumentosBenFunc";
import DetalheBeneficiario from "./pages/DetalheBeneficiário";
import BeneficiarioDashboard from './pages/Dashboards/beneficiario';
import FuncionarioDashboard from './pages/Dashboards/funcionario';
import Chat from './pages/Chat';

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
            <Route path="atendimentos" element={<Atendimentos />} />
            <Route path="documentos" element={<Documentos />} />
            <Route path="beneficiarios" element={<Beneficiarios />} />
            <Route path="servicos" element={<Servicos />} />
            <Route path="edit_beneficiario/:cpf" element={<EditBeneficiarios />} />
            <Route path="edit_Atendimento/:id" element={<EditAtendimento />} />
            <Route path="documentosben" element={<DocumentosBen />} />
            <Route path="chat" element={<Chat />} />            
          </Route>

          <Route path="/funcionario-dashboard" element={<FuncionarioDashboard />}>
            <Route path="agendamentos" element={<Appointments />} />
            <Route path="atendimentos" element={<Atendimentos />} />
            <Route path="documentos" element={<Documentos />} />
            <Route path="funcionarios" element={<Funcionarios />} />
            <Route path="beneficiarios" element={<Beneficiarios />} />
            <Route path="servicos" element={<Servicos />} />
            <Route path="financeiro" element={<Financial />} />
            <Route path="edit_funcionario/:cpf" element={<EditFuncionarios />} />
            <Route path="registrar_funcionario" element={<RegistrarFuncionarios />} />
            <Route path="registrar_servicos" element={<RegistrarServicos />} />
            <Route path="edit_servicos/:nome" element={<EditServicos />} />
            <Route path="documentosbenFunc" element={<DocumentosBenFunc />} />
            <Route path="chat" element={<Chat />} />    
          </Route>
        </Route>
      </Route>
      <Route path="/funcionarios" element={<Funcionarios />}/>
      <Route path="/edit_funcionario/:cpf" element={<EditFuncionarios />} />
      <Route path="/registrar_funcionario" element={<RegistrarFuncionarios />} />
      <Route path="/beneficiarios" element={<Beneficiarios />} />
      <Route path="/edit_beneficiario/:cpf" element={<EditBeneficiarios />} />
      <Route path="/edit_atendimento/:id" element={<EditAtendimento />} />
      <Route path="chat" element={<Chat />} />    
      <Route path="/servicos" element={<Servicos />} />
      <Route path="/edit_servicos/:nome" element={<EditServicos />} />
      <Route path="/registrar_servicos" element={<RegistrarServicos/>}/>
      <Route path="/cadastro_atendimento" element={<CadastroAtendimento/>}/>
      <Route path="/detalhe_beneficiario/:cpf" element={<DetalheBeneficiario/>}/>
      
    </Routes>
  );
};

export default AppRoutes;
