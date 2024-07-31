import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';   

import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const EditFuncionario = () => {
  const [funcionario, setFuncionario] = useState([]);
  const [error, setError] = useState('');
  const [nome, setNome] = useState('');
  const {cpf} = useParams();
  const [job, setJob] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEditFuncionario = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/get_funcionario/${cpf}`, {method: 'GET'});
        if (!res.ok) {
          throw new Error('Erro ao buscar funcionário');
        }
        const data = await res.json();
        setFuncionario(data)
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEditFuncionario();
  }, [cpf]);

  const handleEdit = async () => {
    if (cpf.length !== 14) {
      setError('CPF inválido.');
      toast.error('CPF inválido.');
      return;
    }

    const data = {
      'nome_func': nome,
      'cpf': cpf,
      'job': job,
      'user_func': user,
      'password_func': password
    }

    try {
      const res = await fetch('http://127.0.0.1:5000/update_funcionario', {
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
        toast.success('Funcionário editado com sucesso!', { autoClose: 3000 });
        setTimeout(() => {
          navigate('/funcionarios'); // Assuming route for listing funcionarios
        }, 3000);
      }
    } catch (err) {
      if (err.message === 'CPF inválido.') {
        setError('CPF inválido.');
        toast.error('CPF inválido.');
      } else if (err.message === 'Erro ao editar') {
        setError('Ocorreu um erro ao editar o funcionário. Por favor, tente novamente.');
        toast.error('Ocorreu um erro ao editar o funcionário. Por favor, tente novamente.');
      } else {
        setError('Erro inesperado. Por favor, contate o suporte.');
        toast.error('Erro inesperado. Por favor, contate o suporte.');
      }
    }
  };

  return (
    <div className="edit">
      <ToastContainer />
      <h1>Editar funcionário</h1>
      <form className='formulario' onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
        <label>Nome completo</label>
        <input 
          type='text'
          placeholder={funcionario.nome_func}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required 
        />
        <label>CPF</label>
        {funcionario.cpf && <p>{funcionario.cpf}</p>} {}
        <label>Função</label>
        <select value={job} onChange={(e) => setJob(e.target.value)}>
          <option value="Assistente social">Assistente social</option>
          <option value="Coordenador">Coordenador</option>
          <option value="Administrador">Administrador</option>
        </select>
        <label>Usuário</label>
        <input 
          type="text" 
          placeholder={funcionario.user_func}
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required 
        />
        <label>Senha</label>
        <input 
          type="password" 
          placeholder={funcionario.password_func}
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

export default EditFuncionario;
