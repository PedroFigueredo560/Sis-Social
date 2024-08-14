import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const RegistrarAtendimento = () => {
  const [cpfFunc, setCpfFunc] = useState('');
  const [cpfBen, setCpfBen] = useState('');
  const [assunto, setAssunto] = useState('');
  const [data, setData] = useState('');
  const [duracao, setDuracao] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    const cleanedCpfFunc = cpfFunc.replace(/\D/g, '');
    const cleanedCpfBen = cpfBen.replace(/\D/g, '');
    if (cleanedCpfFunc.length !== 11 || cleanedCpfBen.length !== 11) {
      setError('CPF inválido.');
      toast.error('CPF inválido.');
      return;
    }

    const dataObj = {
      cpfFunc: cleanedCpfFunc,
      cpfBen: cleanedCpfBen,
      assunto: assunto,
      data: new Date(data).toISOString(),
      duracao: parseInt(duracao, 10)
    };

    try {
      const res = await fetch('http://127.0.0.1:5000/create_atendimento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObj),
      });

      if (!res.ok) {
        const response = await res.json();
        throw new Error(response.error || 'Erro ao registrar atendimento');
      } else {
        toast.success('Atendimento registrado com sucesso!', { autoClose: 3000 });
        setTimeout(() => {
          navigate('/beneficiario-dashboard/atendimentos');
        }, 3000);
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Erro inesperado. Por favor, contate o suporte.');
    }
  };

  return (
    <div className="register">
      <ToastContainer />
      
      <form className='formulario' onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
      <h1>Registro de Atendimento</h1>
        <label>CPF do Funcionário</label>
        <input 
          type="text" 
          placeholder="CPF do Funcionário"
          value={cpfFunc}
          onChange={(e) => setCpfFunc(e.target.value)}
          maxLength="14"
          required 
        />
        <label>CPF do Beneficiário</label>
        <input 
          type="text" 
          placeholder="CPF do Beneficiário"
          value={cpfBen}
          onChange={(e) => setCpfBen(e.target.value)}
          maxLength="14"
          required 
        />
        <label>Assunto</label>
        <textarea 
          placeholder="Assunto"
          value={assunto}
          onChange={(e) => setAssunto(e.target.value)}
          required 
        />
        <label>Data</label>
        <input 
          type="datetime-local" 
          value={data}
          onChange={(e) => setData(e.target.value)}
          required 
        />
        <label>Duração (em minutos)</label>
        <input 
          type="number" 
          placeholder="Duração"
          value={duracao}
          onChange={(e) => setDuracao(e.target.value)}
          required 
        />
        <div className="buttons-container">
          <button className='button' type="submit">Registrar</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default RegistrarAtendimento;