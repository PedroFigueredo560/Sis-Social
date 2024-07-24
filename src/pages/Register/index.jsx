import React from "react";
import "./style.css";

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
                CPF: <input type="text" id="cpf" required/>
                <br />
                Usuário: <input type="text" id="user_ben" required />
                <br />
                Senha: <input type="password" id="password_ben" required />
                <br />
                <button className="register-button">Cadastrar</button>
            </h2></>
          }
        </div>
      </div>
    );
  };

export default Register;