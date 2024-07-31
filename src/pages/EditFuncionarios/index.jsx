import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const EditFuncionario = () => {
  const [funcionario, setFuncionario] = useState(null);
  const [error, setError] = useState('');
  const [nome, setNome] = useState('');
  const { cpf } = useParams();
  const [job, setJob] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEditFuncionario = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/get_funcionario/${cpf}`, { method: 'GET' });
        if (!res.ok) {
          throw new Error('Erro ao buscar funcionário');
        }
        const data = await res.json();
        setFuncionario(data);
        setNome(data.name_func);
        setJob(data.job);
        setUser(data.user_func);
        setPassword(data.password_func);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEditFuncionario();
  }, [cpf]);

  const handleEdit = async () => {
    if (cpf.length !== 11) {
      setError('CPF inválido.');
      toast.error('CPF inválido.');
      return;
    }

    const data = {
      'name_func': nome,
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
        throw new Error(response.error || 'Erro ao editar');
      } else {
        toast.success('Funcionário editado com sucesso!', { autoClose: 3000 });
        setTimeout(() => {
          navigate('/funcionarios'); 
        }, 3000);
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  if (!funcionario) return <p>Loading...</p>;

  return (
    <div className="edit">
      <ToastContainer />
      <h1>Editar funcionário</h1>
      <form className='formulario' onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
        <label>Nome completo</label>
        <input 
          type='text'
          placeholder={funcionario.name_func}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required 
        />
        <label>CPF</label>
        <p>{funcionario.cpf}</p>
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
