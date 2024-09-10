
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Description as ReportIcon } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './style.css'; 
import FormTemplate from '../../componentes/formTemplate';

function Atendimentos() {
  const [atendimentos, setAtendimentos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAtendimentos = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_atendimentos');
        const data = await response.json();
        setAtendimentos(data);
      } catch (error) {
        console.error('Erro ao carregar atendimentos:', error);
        setError(error.message || 'Ocorreu um erro ao tentar buscar os atendimentos.');
      }
    };

    fetchAtendimentos();
  }, []);

  const handleRegisterAtendimento = () => {
    navigate("/cadastro_atendimento");
  };

  const handleEditAtendimento = (atendimentoId) => {
    navigate(`/edit_atendimento/${atendimentoId}`);
  };

  const handleDeleteAtendimento = async (atendimentoId) => {
    if (window.confirm('Tem certeza que deseja deletar este atendimento?')) {
      try {
        const response = await fetch('http://localhost:5000/delete_atendimento', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: atendimentoId }),
        });
        if (response.ok) {
          setAtendimentos(prev => prev.filter(atendimento => atendimento.id !== atendimentoId));
        } else {
          throw new Error('Falha ao deletar atendimento.');
        }
      } catch (error) {
        console.error('Erro ao deletar atendimento:', error);
        setError(error.message || 'Ocorreu um erro ao tentar deletar o atendimento.');
      }
    }
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    // Title
    doc.text('Relatório de Atendimentos', 14, 16);

    // Add all atendimentos table
    const atendimentosData = atendimentos.map(atendimento => [
      atendimento.cpfFunc,
      atendimento.cpfBen,
      atendimento.assunto,
      new Date(atendimento.data).toLocaleString(),
      `${atendimento.duracao} min`
    ]);

    doc.autoTable({
      head: [['CPF do Funcionário', 'CPF do Beneficiário', 'Assunto', 'Data', 'Duração']],
      body: atendimentosData,
      startY: 22,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
      margin: { left: 14, right: 14 },
    });

    // Add space after the first table
    let currentY = doc.autoTable.previous.finalY + 10;

    // Aggregate time spent per employee
    const employeeTimes = atendimentos.reduce((acc, atendimento) => {
      if (!acc[atendimento.cpfFunc]) {
        acc[atendimento.cpfFunc] = { total: 0, atendimentos: [] };
      }
      acc[atendimento.cpfFunc].total += atendimento.duracao;
      acc[atendimento.cpfFunc].atendimentos.push(atendimento);
      return acc;
    }, {});

    // Add employee details section
    Object.keys(employeeTimes).forEach((cpf, index) => {
      if (index > 0) {
        doc.addPage(); // Add a new page for each employee
        currentY = 16; // Reset position for new page
      }
      doc.text(`Atendimentos do Funcionário: ${cpf}`, 14, currentY);
      currentY += 10;

      const employeeData = employeeTimes[cpf].atendimentos.map(atendimento => [
        atendimento.cpfBen,
        atendimento.assunto,
        new Date(atendimento.data).toLocaleString(),
        `${atendimento.duracao} min`
      ]);

      doc.autoTable({
        head: [['CPF do Beneficiário', 'Assunto', 'Data', 'Duração']],
        body: employeeData,
        startY: currentY,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [22, 160, 133] },
        margin: { left: 14, right: 14 }
      });

      // Add space after each employee's table
      currentY = doc.autoTable.previous.finalY + 10;
      doc.text(`Total de Minutos: ${employeeTimes[cpf].total} min`, 14, currentY);
      currentY += 20; // Add additional space before the next section
    });

    // Save the PDF
    doc.save('relatorio_atendimentos.pdf');
  };

  return (
    <FormTemplate isForm={false}>
      <h1>Atendimentos</h1>
    <div className="container">
        <div className="table-header">
          <div className="table-actions">
            <button onClick={handleRegisterAtendimento}>Registrar Novo Atendimento</button>
            <button className="report-button" onClick={generatePDFReport}>
              <ReportIcon className="icon" /> Gerar Relatório
            </button>
          </div>
        </div>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>CPF do Funcionário</th>
                  <th>CPF do Beneficiário</th>
                  <th>Assunto</th>
                  <th>Data</th>
                  <th>Duração</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {atendimentos.map((atendimento) => (
                  <tr key={atendimento.id}>
                    <td>{atendimento.cpfFunc}</td>
                    <td>{atendimento.cpfBen}</td>
                    <td>{atendimento.assunto}</td>
                    <td>{new Date(atendimento.data).toLocaleString()}</td>
                    <td>{atendimento.duracao} min</td>
                    <td>
                      <Tooltip title="Editar">
                        <IconButton onClick={() => handleEditAtendimento(atendimento.id)} color="primary">
                          <EditIcon className="icon" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton onClick={() => handleDeleteAtendimento(atendimento.id)} color="error">
                          <DeleteIcon className="icon" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </FormTemplate>
  );
}

export default Atendimentos;

