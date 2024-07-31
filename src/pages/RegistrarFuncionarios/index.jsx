import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const RegistrarFuncionarios= () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [job, setJob] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (cpf.length !== 14) {
      setError('CPF inválido.');
      toast.error('CPF inválido.');
      return;
    }

    const data = {
      name_func: nome,
      cpf: cpf,
      job: job,
      user_func: user,
      password_func: password,
    };

    try {
      const res = await fetch('http://127.0.0.1:5000/create_func', {
        method: 'POST',
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
        throw new Error(response.error || 'Erro ao registrar');
      } else {
        toast.success('Usuário registrado com sucesso!', { autoClose: 3000 });
        setTimeout(() => {
          navigate('/funcionarios');
        }, 3000); 
      }
    } catch (err) {
      if (err.message === 'CPF inválido.') {
        setError('CPF inválido.');
        toast.error('CPF inválido.');
      } else if (err.message === 'Erro ao registrar') {
        setError('Ocorreu um erro ao registrar o usuário. Por favor, tente novamente.');
        toast.error('Ocorreu um erro ao registrar o usuário. Por favor, tente novamente.');
      } else {
        setError('Erro inesperado. Por favor, contate o suporte.');
        toast.error('Erro inesperado. Por favor, contate o suporte.');
      }
    }
  };

  return (
    <div className="register">
      <ToastContainer />
      <h1>Cadastro de funcionário</h1>
      <form className='formulario' onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
        <label>Nome completo</label>
        <input 
          type="text" 
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required 
        />
        <label>CPF</label>
        <input 
          type="text" 
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          maxLength="14" 
          required 
        />
        <label>Função</label>
        <select value={job} onChange={(e) => setJob(e.target.value)}>
            <option value="Assistente social">Assistente social</option>
            <option value="Coordenador">Coordenador</option>
            <option value="Administrador">Administrador</option>
        </select>
        <label>Usuário</label>
        <input 
          type="text" 
          placeholder="Usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required 
        />
        <label>Senha</label>
        <input 
          type="password" 
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <div className="buttons-container">
          <button className='button' type="submit">Registrar</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default RegistrarFuncionarios;
