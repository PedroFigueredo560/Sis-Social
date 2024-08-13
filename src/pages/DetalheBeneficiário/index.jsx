import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';   

import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const DetalheBeneficiario = () => {
  const [beneficiario, setBeneficiario] = useState([]);
  const { cpf } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeneficiarios = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/get_beneficiario/${cpf}`, {method: 'GET'});
        if (!res.ok) {
          throw new Error('Erro ao buscar beneficiário');
        }
        const data = await res.json();
        setBeneficiario(data)
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBeneficiarios();
  }, [cpf]);

  return (
    <div className="beneficiario">
      <ToastContainer />
      <h1>{beneficiario.nome_ben}</h1>
      <div className = 'info_pessoal'>
        Nome: {beneficiario.nome_ben} <br />
        CPF: {beneficiario.cpf} <br />
        Idade: <br />
        Telefone: <br />
        Nascimento: <br />

      </div>
      
    </div>
  );
};

export default DetalheBeneficiario;
