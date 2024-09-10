import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, ExpandMore as ExpandIcon } from '@mui/icons-material';
import './style.css'; // Import your CSS file for styling
import FormTemplate from '../../componentes/formTemplate';

function Beneficiarios() {
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeneficiarios = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_ben');
        const data = await response.json();
        setBeneficiarios(data);
      } catch (error) {
        console.error('Erro ao carregar beneficiários:', error);
        setError(error.message || 'An error occurred while fetching beneficiarios.');
      }
    };

    fetchBeneficiarios();
  }, []);

  const handleRegisterBeneficiarios = () => {
    navigate("/cadastro");
  };

  const handleEditBeneficiarios = (beneficiariosCpf) => {
    navigate(`/edit_beneficiario/${beneficiariosCpf}`);
  };

  const handleDetalheBeneficiario = (beneficiarioCpf) => {
    navigate(`/detalhe_beneficiario/${beneficiarioCpf}`);
  };

  const handleDeleteBeneficiarios = async (beneficiariosCpf) => {
    if (window.confirm('Tem certeza que deseja deletar este beneficiário?')) {
      try {
        const response = await fetch('http://localhost:5000/delete_beneficiario', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cpf: beneficiariosCpf }),
        });
        if (response.ok) {
          setBeneficiarios((prev) => prev.filter((beneficiario) => beneficiario.cpf !== beneficiariosCpf));
        } else {
          throw new Error('Falha ao deletar beneficiário.');
        }
      } catch (error) {
        console.error('Erro ao deletar beneficiário:', error);
        setError(error.message || 'Ocorreu um erro ao tentar deletar o beneficiário.');
      }
    }
  };

  return (
    <FormTemplate isForm={false}>
      <h1>Beneficiários</h1>
      <div className="container">
        <div className="table-container">
          <div className="table-header">
            <div className="table-actions">
              <button onClick={handleRegisterBeneficiarios}>Registrar</button>
            </div>
          </div>
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Serviço</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {beneficiarios.map((beneficiario) => (
                  <tr key={beneficiario.cpf}>
                    <td>{beneficiario.name_ben}</td>
                    <td>{beneficiario.cpf}</td>
                    <td>{beneficiario.servicos}</td>
                    <td>
                      <Tooltip title="Editar">
                        <IconButton onClick={() => handleEditBeneficiarios(beneficiario.cpf)} color="primary">
                          <EditIcon className="icon" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton onClick={() => handleDeleteBeneficiarios(beneficiario.cpf)} color="error">
                          <DeleteIcon className="icon" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Detalhes">
                        <IconButton onClick={() => handleDetalheBeneficiario(beneficiario.cpf)} color="default">
                          <ExpandIcon className="icon" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </FormTemplate>
  );
}

export default Beneficiarios;
