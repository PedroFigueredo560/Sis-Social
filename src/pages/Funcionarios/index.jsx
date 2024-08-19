import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import './style.css'; 
import { ToastContainer } from 'react-toastify';
import FormTemplate from '../../componentes/formTemplate';

function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_func');
        const data = await response.json();
        setFuncionarios(data);
      } catch (error) {
        console.error('Erro ao carregar funcionários:', error);
        setError(error.message || 'An error occurred while fetching funcionarios.');
      }
    };

    fetchFuncionarios();
  }, []);

  const handleRegisterFuncionario = () => {
    navigate("/registrar_funcionario");
  };

  const handleEditFuncionario = (funcionarioCpf) => {
    navigate(`/edit_funcionario/${funcionarioCpf}`);
  };

  const handleDeleteFuncionario = async (funcionarioCpf) => {
    if (window.confirm('Tem certeza que deseja deletar este funcionário?')) {
      try {
        const response = await fetch('http://localhost:5000/delete_funcionario', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cpf: funcionarioCpf }),
        });
        if (response.ok) {
          setFuncionarios((prev) => prev.filter((funcionario) => funcionario.cpf !== funcionarioCpf));
        } else {
          throw new Error('Falha ao deletar o funcionário.');
        }
      } catch (error) {
        console.error('Erro ao deletar funcionário:', error);
        setError(error.message || 'Ocorreu um erro ao tentar deletar o funcionário.');
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <FormTemplate isForm={false}>
          <h1>Funcionários</h1>
          <section className="container">
          <div className="table-container">
            <div className="table-header">
              <div className="table-actions">
                <button onClick={handleRegisterFuncionario}>Novo Funcionário</button>
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
                    <th>Cargo</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {funcionarios.map((funcionario) => (
                    <tr key={funcionario.cpf}>
                      <td>{funcionario.name_func}</td>
                      <td>{funcionario.cpf}</td>
                      <td>{funcionario.job}</td>
                      <td>
                        <Tooltip title="Editar">
                          <IconButton onClick={() => handleEditFuncionario(funcionario.cpf)} color="primary">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                          <IconButton onClick={() => handleDeleteFuncionario(funcionario.cpf)} color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </FormTemplate>
    </>
  );
}  
export default Funcionarios;
