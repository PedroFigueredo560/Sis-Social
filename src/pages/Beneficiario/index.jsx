import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Import your CSS file for styling

function Beneficiarios() {
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [error, setError] = useState(null);
  const [editBeneficiariosCpf, setEditBeneficiariosCpf] = useState(null);
  const [editBeneficiariosData, setEditBeneficiariosData] = useState({ name: '', cpf: '', jobTitle: '' });
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchBeneficiarios = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_ben'); // Use fetch for wider browser compatibility
        const data = await response.json();
        setBeneficiarios(data);
      } catch (error) {
        console.error('Erro ao carregar beneficiários:', error);
        setError(error.message || 'An error occurred while fetching beneficiarios.');
      }
    };

    fetchBeneficiarios();
  }, []);

  const handleRegisterBeneficiarios = async () => {
    navigate("/cadastro");
  };

  const handleEditBeneficiarios = (beneficiariosCpf) => {
    setEditBeneficiariosCpf(beneficiariosCpf); // Set the clicked cpf for editing
    navigate(`/edit_beneficiario/${beneficiariosCpf}`);
  };
  
  const handleDetalheBeneficiario = (beneficiarioCpf) => {
    navigate(`/detalhe_beneficiario/${beneficiarioCpf}`);
  };

  const handleDeleteBeneficiarios = async (beneficiariosCpf) => {
    if (window.confirm('Are you sure you want to delete this beneficiarios?')) {
      const data = beneficiariosCpf;
      try {
        const response = await fetch('http://localhost:5000/delete_beneficiario', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const updatedBeneficiarios = beneficiarios.filter((beneficiarios) => beneficiarios.cpf !== beneficiariosCpf);
          setBeneficiarios(updatedBeneficiarios);
        } else {
          throw new Error('Failed to delete beneficiarios.');
        }
      } catch (error) {
        console.error('Erro ao deletar beneficiario:', error);
        setError(error.message || 'Ocorreu um erro ao tentar deletar o beneficiarios.');
      }
    }
  };

  return (
    <div className="beneficiarios">
      <div className="content">
        <h1>Beneficiários</h1>
        <h2>
          <button onClick={handleRegisterBeneficiarios}>Registrar</button>
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
                {beneficiarios.map((beneficiarios) => (
                  <tr key={beneficiarios.cpf}>
                    <td>{beneficiarios.name_ben}</td>
                    <td>{beneficiarios.cpf}</td>
                    <td>{beneficiarios.servicos}</td>
                    <td>
                      <button onClick={() => handleEditBeneficiarios(beneficiarios.cpf)}>Editar</button>
                      <button onClick={() => handleDeleteBeneficiarios(beneficiarios.cpf)}>Excluir</button>
                      <button onClick={() => handleDetalheBeneficiario(beneficiarios.cpf)}>Expandir</button>
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

export default Beneficiarios;