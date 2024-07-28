import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Register() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    const data = {
      "name_ben": document.getElementById('nome').value,
      "cpf": document.getElementById('cpf').value,
      "services": 'Solicitante',
      "user_ben": document.getElementById('user').value,
      "password_ben": document.getElementById('password').value
    };

    try {
      console.log('Registrando...');
      console.log('Data being sent:', data);

      const res = await fetch('http://127.0.0.1:5000/create_ben', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error('Erro ao registrar');
      }

      // Successful registration, redirect to login page
      navigate('/login');
    } catch (err) {
      if (err.message === 'Erro ao registrar') {
        setError('Ocorreu um erro ao registrar o usuário. Por favor, tente novamente.');
      } else {
        setError('Erro inesperado. Por favor, contate o suporte.');
      }
    }
  };


  return (
    <div className="register">
      <div className="content">
        {
          <><h1>
              Cadastro
          </h1>
          <h2>
              Nome completo: <input type="text" id="nome" required/>
              <br />
              CPF: <input type="text" id="cpf" name="cpf" maxLength="14" />
              <br />
              Usuário: <input type="text" id="user" required />
              <br />
              Senha: <input type="password" id="password" required />
              <br />
              <button className='register-button' onClick={handleRegister}>Registrar</button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
          </h2></>
        }
      </div>
    </div>
  );
}

export default Register;
