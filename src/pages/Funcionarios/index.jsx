import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Import your CSS file for styling

function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [error, setError] = useState(null);
  const [editFuncionarioId, setEditFuncionarioId] = useState(null);
  const [editFuncionarioData, setEditFuncionarioData] = useState({ name: '', cpf: '', jobTitle: '' });

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_func'); // Use fetch for wider browser compatibility
        const data = await response.json();
        setFuncionarios(data);
      } catch (error) {
        console.error('Erro ao carregar funcionários:', error);
        setError(error.message || 'An error occurred while fetching funcionarios.');
      }
    };

    fetchFuncionarios();
  }, []);

  const handleEditFuncionario = (funcionarioId) => {
    setEditFuncionarioId(funcionarioId);
    const funcionarioToEdit = funcionarios.find((funcionario) => funcionario.id === funcionarioId);
    setEditFuncionarioData({ name: funcionarioToEdit.name, cpf: funcionarioToEdit.cpf, jobTitle: funcionarioToEdit.jobTitle });
  };

  const handleDeleteFuncionario = async (funcionarioId) => {
    if (window.confirm('Are you sure you want to delete this funcionario?')) {
      try {
        const response = await fetch(`http://localhost:5000/delete_funcionario/${funcionarioId}`, { method: 'DELETE' });
        if (response.ok) {
          const updatedFuncionarios = funcionarios.filter((funcionario) => funcionario.id !== funcionarioId);
          setFuncionarios(updatedFuncionarios);
        } else {
          throw new Error('Failed to delete funcionario.');
        }
      } catch (error) {
        console.error('Erro ao deletar funcionário:', error);
        setError(error.message || 'An error occurred while deleting funcionario.');
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editFuncionarioId) {
      console.error('Edit function called without a funcionario ID');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/update_funcionario/${editFuncionarioId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFuncionarioData),
      });
      if (response.ok) {
        const updatedFuncionario = await response.json();
        const updatedFuncionarios = funcionarios.map((funcionario) =>
          funcionario.id === updatedFuncionario.id ? updatedFuncionario : funcionario
        );
        setFuncionarios(updatedFuncionarios);
        setEditFuncionarioId(null);
        setEditFuncionarioData({ name: '', cpf: '', jobTitle: '' });
      } else {
        throw new Error('Failed to update funcionario.');
      }
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error);
      setError(error.message || 'An error occurred while updating funcionario.');
    }
  };

  const handleEditChange = (e) => {
    setEditFuncionarioData({ ...editFuncionarioData, [e.target.name]: e.target.value });
  };

  const handleCloseEditPopup = () => {
    setEditFuncionarioId(null);
    setEditFuncionarioData({ name: '', cpf: '', jobTitle: '' });
  };

  return (
    <div className="funcionarios">
      <div className="content">
        <h1>Funcionários</h1>
        <h2>
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
                  <tr key={funcionario.id}>
                    <td>{funcionario.name}</td>
                    <td>{funcionario.cpf}</td>
                    <td>{funcionario.jobTitle}</td>
                    <td>
                      <button onClick={() => handleEditFuncionario(funcionario.id)}>Editar</button>
                      <button onClick={() => handleDeleteFuncionario(funcionario.id)}>Excluir</button>
                    </td>
                    {/* Edit Popup (conditionally rendered) */}
                    {editFuncionarioId === funcionario.id && (
                      <EditFuncionarioPopup
                        funcionarioData={editFuncionarioData}
                        onSubmit={handleEditSubmit}
                        onChange={handleEditChange}
                        onClose={handleCloseEditPopup}
                      />
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </h2>
        {/* Register button can be placed here or elsewhere in your application */}
        {/* <button onClick={() => navigate('/register-funcionario')}>Cadastrar Funcionário</button> */}
      </div>
    </div>
  )
};

export default Funcionarios;