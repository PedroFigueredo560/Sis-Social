
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Import your CSS file for styling
import FormTemplate from '../../componentes/formTemplate';

function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_servicos'); // Use fetch for wider browser compatibility
        const data = await response.json();
        setServicos(data);
      } catch (error) {
        console.error('Erro ao carregar serviços:', error);
        setError(error.message || 'An error occurred while fetching services.');
      }
    };

    fetchServicos();
  }, []);

  const handleRegisterServicos = async () => {
    navigate("/registrar_servicos");
  };

  const handleEditServicos = (servicoNome) => {
    navigate(`/edit_servicos/${servicoNome}`);
  };

  const handleDeleteServicos = async (servicoNome) => {
    if (window.confirm('Tem certeza que deseja deletar este serviço?')) {
      const data = { nome_servicos: servicoNome };
      try {
        const response = await fetch('http://localhost:5000/delete_servico', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const updatedServicos = servicos.filter((servico) => servico.nome_servicos !== servicoNome);
          setServicos(updatedServicos);
        } else {
          throw new Error('Failed to delete servicos.');
        }
      } catch (error) {
        console.error('Erro ao deletar serviço:', error);
        setError(error.message || 'Ocorreu um erro ao tentar deletar o serviço.');
      }
    }
  };

  return (
    <FormTemplate isForm={false}>
      <h1>Serviços</h1>
      <div className="container">
        <div className="table-container">
          <div className="table-header">
            <div className="table-actions">
              <button onClick={handleRegisterServicos}>Registrar</button>
            </div>
          </div>
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Critérios</th>
                  <th>Horários</th>
                  <th>Data</th>
                  <th>Locais</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {servicos.map((servico) => (
                  <tr key={servico.nome_servicos}>
                    <td>{servico.nome_servicos}</td>
                    <td>{servico.criterios}</td>
                    <td>{servico.horarios}</td>
                    <td>{servico.data}</td>
                    <td>{servico.locais}</td>
                    <td>
                      <button onClick={() => handleEditServicos(servico.nome_servicos)}>Editar</button>
                      <button onClick={() => handleDeleteServicos(servico.nome_servicos)}>Excluir</button>
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

export default Servicos;
