import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';   

import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const EditBeneficiarios = () => {
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [error, setError] = useState('');
  const [nome, setNome] = useState('');
  const { cpf } = useParams();
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [service, setService] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEditBeneficiarios = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/get_beneficiario/${cpf}`, {method: 'GET'});
        if (!res.ok) {
          throw new Error('Erro ao buscar beneficiário');
        }
        const data = await res.json();
        setBeneficiarios(data)
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEditBeneficiarios();
  }, [cpf]);

  const handleEdit = async () => {
    if (cpf.length !== 14) {
      setError('CPF inválido.');
      toast.error('CPF inválido.');
      return;
    }

    const data = {
      'nome_ben': nome,
      'cpf': cpf,
      'services': service,
      'user_ben': user,
      'password_ben': password
    }

    try {
      const res = await fetch('http://127.0.0.1:5000/update_beneficiario', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const response = await res.json();
        if (response.error.includes('value too long for type character varying(11)')) {
          throw new Error('CPF inválido.');
        }
        throw new Error(response.error || 'Erro ao editar');
      } else {
        toast.success('Beneficiário editado com sucesso!', { autoClose: 3000 });
        setTimeout(() => {
          navigate('/beneficiarios'); // Assuming route for listing beneficiarioss
        }, 3000);
      }
    } catch (err) {
      if (err.message === 'CPF inválido.') {
        setError('CPF inválido.');
        toast.error('CPF inválido.');
      } else if (err.message === 'Erro ao editar') {
        setError('Ocorreu um erro ao editar o beneficiário. Por favor, tente novamente.');
        toast.error('Ocorreu um erro ao editar o beneficiário. Por favor, tente novamente.');
      } else {
        setError('Erro inesperado. Por favor, contate o suporte.');
        toast.error('Erro inesperado. Por favor, contate o suporte.');
      }
    }
  };

  return (
    <div className="edit">
      <ToastContainer />
      <h1>Editar beneficiário</h1>
      <form className='formulario' onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
        <label>Nome completo</label>
        <input 
          type='text'
          placeholder={beneficiarios.nome_ben}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required 
        />
        <label>telefone</label>
        <input 
          type='text'
          placeholder={beneficiarios.telefone}
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required 
        />
        <label>Endereço</label>
        <input 
          type='text'
          placeholder={beneficiarios.endereco}
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          required 
        />
        <label>CPF</label>
        {beneficiarios.cpf && <p>{beneficiarios.cpf}</p>} {}
        <label>Serviço</label>
        <select value={service} onChange={(e) => setService(e.target.value)}>
          <option value="Beneficiario">Beneficiário</option>
          <option value="Solicitante">Solicitante</option>
        </select>
        <label>Usuário</label>
        <input 
          type="text" 
          placeholder={beneficiarios.user_ben}
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required 
        />
        <label>Senha</label>
        <input 
          type="password" 
          placeholder={beneficiarios.password_ben}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <div className="buttons-container">
          <button className='button' type="submit">Alterar</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default EditBeneficiarios;
