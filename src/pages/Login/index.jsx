import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../layout/AuthContext";
import "../Register/style.css";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:5000/validate_login_ben", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, password }),
    });

    const data = await response.json();
    if (response.ok) {
      login(data.token);
      console.log("Token armazenado no localStorage:", localStorage.getItem("token"));
      navigate("/home");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="register">
      <h1>Login</h1>
      <form className='formulario' onSubmit={handleSubmit}>

        <label>Usuário</label>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <label>Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="buttons-container">
          <button className='button' type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
