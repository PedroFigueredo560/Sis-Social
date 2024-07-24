import React from "react";
import "./style.css";
import '../service/service'


const Register = () => {
    return (
      <div className="register">
        <div className="content">
          {
            <><h1>
                Cadastro
            </h1>
            <h2>
                Nome completo: <input type="text" id="nome_ben" required/>
                <br />
                CPF: <input type="text" id="cpf" name="cpf" maxLength="14" />
                <br />
                Usuário: <input type="text" id="user_ben" required />
                <br />
                Senha: <input type="password" id="password_ben" required />
                <br />
                <button className="register-button" onclick = 'register_ben()'>Cadastrar</button>
            </h2></>
          }
        </div>
      </div>
    );
  };

export default Register;



// funcionando

// import React, { useState } from 'react';

// function App() {
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);

//   const handleRegister = async () => {
//     // Dados mockados
//     const mockData = {
//       "name_ben": "Joa Silva",
//       "cpf": "1254334401",
//       "services": "Serviço B",
//       "user_ben": "joaosilva",
//       "password_ben": "senha23"
//   };
  

//     try {
//       console.log('Registrando...');
//       console.log('Data being sent:', mockData);

//       const res = await fetch('http://127.0.0.1:5000/create_ben', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(mockData)
//       });

//       if (!res.ok) {
//         throw new Error('Erro ao registrar');
//       }

//       const result = await res.json();
//       setResponse(result);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleRegister}>Registrar Beneficiário</button>
//       {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// }

// export default App;
