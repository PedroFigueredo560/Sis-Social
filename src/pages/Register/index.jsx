import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import RegisterImage from '../../assets/register.avif';
import Header from '../../componentes/Header';

const Register = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (cpf.length !== 11) {
      setError('CPF inválido.');
      toast.error('CPF inválido.');
      return;
    }

    const data = {
      name_ben: nome,
      cpf: cpf,
      nascimento: nascimento,
      telefone: telefone,
      endereco: endereco,
      servicos: 'Solicitante',
      user_ben: user,
      password_ben: password,
    };

    try {
      const res = await fetch('http://127.0.0.1:5000/create_ben', {
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
          navigate(-1);
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
    <>
    <Header/>
    <div className="register">
      <ToastContainer />
      <div className="register-container">
      <div className="register-image">
          <img src={RegisterImage} alt="Imagem de registro" />
        </div>
        <div className="formulario-container">
          <h1>Cadastro</h1>
          <form className="for-register" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>

            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              maxLength="11"
              required
            />

            <input
              type="date"
              placeholder="Data de Nascimento"
              value={nascimento}
              onChange={(e) => setNascimento(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              maxLength="11"
            />

            <input
              type="text"
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              maxLength="50"
              required
            />

            <input
              type="text"
              placeholder="Usuário"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="buttons-container">
              <button className="button" type="submit">Registrar</button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
    </>
  );
};


export default Register;
