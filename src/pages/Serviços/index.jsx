import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Import your CSS file for styling

function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [error, setError] = useState(null);
  const [editServicosCpf, setEditServicosCpf] = useState(null);
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

  const handleEditServicos = (servicosNome) => {
    navigate(`/edit_servicos/${servicosNome}`);
  };

  const handleDeleteServicos = async (servicosNome) => {
    if (window.confirm('Tem certeza que deseja deletar este serviço?')) {
      const data = servicosNome;
      try {
        const response = await fetch('http://localhost:5000/delete_servico', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const updatedServicos = servicos.filter((servicos) => servicos.nome_servicos !== servicosNome);
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
    <div className="servicos">
      <div className="content">
        <h1>Funcionários</h1>
        <h2>
          <button onClick={handleRegisterServicos}>Registrar</button>
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Critérios</th>
                  <th>Horarios</th>
                  <th>Data</th>
                  <th>Locais</th>
                </tr>
              </thead>
              <tbody>
                {servicos.map((servicos) => (
                  <tr key={servicos.nome_servicos}>
                    <td>{servicos.nome_servicos}</td>
                    <td>{servicos.criterios}</td>
                    <td>{servicos.horarios}</td>
                    <td>{servicos.data}</td>
                    <td>{servicos.locais}</td>
                    <td>
                      <button onClick={() => handleEditServicos(servicos.nome_servicos)}>Editar</button>
                      <button onClick={() => handleDeleteServicos(servicos.nome_servicos)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </h2>
      </div>
    </div>
  )
};

export default Servicos;