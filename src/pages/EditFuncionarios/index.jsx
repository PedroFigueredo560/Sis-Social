import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';   

import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const EditFuncionario = ({ cpf }) => {
  const [nome, setNome] = useState('');
  const [job, setJob] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState(''); // Consider security implications of pre-filling password
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [jobType, setJobType] = useState('');
  const [cpfValue, setCpfValue] = useState(cpf);

  const { id } = useParams(); // Assuming the URL uses "/edit/:id" format (might not be used)

  useEffect(() => {
    const fetchFuncionario = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/get_funcionario/${cpf}`);
        if (!res.ok) {
          throw new Error('Erro ao buscar funcionário');
        }
        const data = await res.json();
        setNome(data.name_func); // Assuming data.name_func exists
        setCpfValue(data.cpf);
        setJob(data.job);
        setUser(data.user_func);
        setPassword(data.password_func); // Consider security implications
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFuncionario();
  }, [cpf]);

  const handleCpfChange = (e) => {
    setCpfValue(e.target.value);
}

  const handleEdit = async () => {
    if (cpf.length !== 11) {
      setError('CPF inválido.');
      toast.error('CPF inválido.');
      return;
    }

    const data = {
      name_func: nome, // Assuming data.name_func is used in the API
      cpf, // Use the cpf prop directly
      job,
      user_func: user, // Assuming data.user_func is used in the API
      password_func: password, // Consider security implications
    };

    try {
      const res = await fetch(`http://127.0.0.1:5000/update_funcionario/${cpf}`, {
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
          navigate('/funcionario'); // Assuming route for listing funcionarios
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
      <div className="card">
        <div className="card-header">
          <h2>Dados originais</h2>
        </div>
        <div className="card-body">
          {nome && <p>Nome: {nome}</p>} {}
          {job && <p>Cargo: {job}</p>} {}
          {cpfValue && <p>CPF: {cpfValue}</p>} {}
          {user && <p>Usuário: {user}</p>} {}
          {password && <p>Senha: {password}</p>} {}
        </div>
      </div>
      <h1>Editar funcionário</h1>
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
          value={cpfValue}  // Use the state variable
          onChange={handleCpfChange}
          maxLength="11" 
          required 
        />
        <label>Função</label>
        <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
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

export default EditFuncionario;
