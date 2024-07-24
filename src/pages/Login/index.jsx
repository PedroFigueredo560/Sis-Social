import React from "react";
import "./style.css";

function App() {
  const [response] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    // Dados mockados
    var data={
      "user": document.getElementById('user').value,
      'password': document.getElementById('password').value
    }

    try {
      console.log('Logando');
      console.log('Data being sent:', data);

      const res = await fetch('http://127.0.0.1:5000/get_user_ben', {
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
    <div className="login">
      <div className="content">
        {
            <><h1>
                Login
            </h1>
            <h2>
                Usuário: <input type="text" id="user" required />
                <br />
                Senha: <input type="password" id="password" required />
                <br />
                <button className='login-button' onClick={handleLogin}>Login</button>
                {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </h2></>
        }
      </div>
    </div>
  );
};

export default App;