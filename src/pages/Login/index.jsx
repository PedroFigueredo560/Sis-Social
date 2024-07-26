import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./style.css";

function App() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = {
      user: document.getElementById('user').value,
      password: document.getElementById('password').value
    };

    try {
      console.log('Logando');
      console.log('Data being sent:', data);

      const res = await fetch('http://127.0.0.1:5000/validate_login_ben', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error('Erro ao logar');
      }

      //if logated
      navigate('/');
    } catch (err) {
      if (err.message === 'Erro ao logar') {
        setError('Ocorreu um erro ao logar. Por favor, tente novamente.');
      } else {
        setError('Erro inesperado. Por favor, contate o suporte.');
      }
    }
  };

  return (
    <div className="login">
      <div className="content">
        <h1>Login</h1>
        <h2>
          Usuário: <input type="text" id="user" required />
          <br />
          Senha: <input type="password" id="password" required />
          <br />
          <button className='login-button' onClick={handleLogin}>Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </h2>
      </div>
    </div>
  );
}

export default App;