//import React from "react";
//import "./style.css";
//import register_ben from '../service/service';


//const Register = () => {
//    return (
//      <div className="register">
//        <div className="content">
//          {
//            <><h1>
//                Cadastro
//            </h1>
//            <h2>
//                Nome completo: <input type="text" id="nome_ben" required/>
//                <br />
//                CPF: <input type="text" id="cpf" name="cpf" maxLength="14" />
//                <br />
//                Usuário: <input type="text" id="user_ben" required />
//                <br />
//                Senha: <input type="password" id="password_ben" required />
//                <br />
//                <button className="register-button" onClick = {register_ben} >Cadastrar</button>
//            </h2></>
//          }
//        </div>
//      </div>
//    );
//  };

//export default Register;



//funcionando

import React, { useState } from 'react';
import "./style.css";

function App() {
  const [response] = useState(null);
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    // Dados mockados
    var data={
      "name_ben": document.getElementById('nome').value,
      "cpf": document.getElementById('cpf').value,
      "services": 'Solicitante',
      "user_ben": document.getElementById('user').value,
      "password_ben": document.getElementById('password').value
    }

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

      const result = await res.json();
      throw new MessageEvent(result);
    } catch (err) {
      setError(err.message);
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
              {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
              {error && <p style={{ color: 'red' }}>{error}</p>}
          </h2></>
        }
      </div>
    </div>
  );
}

export default App;
