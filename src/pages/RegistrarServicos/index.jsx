import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const RegistrarServicos= () => {
    const [error, setError] = useState('');
    const [nome, setNome] = useState('');
    const [criterios, setCriterios] = useState('');
    const [horario, setHorario] = useState('');
    const [date, setDate] = useState('');
    const [locais, setLocais] = useState('');
    const navigate = useNavigate();

  const handleRegister = async () => {
    const data = {
      'nome_servicos': nome,
      'criterios': criterios,
      'horario': horario,
      'data': date,
      'locais': locais,
    };

    try {
      const res = await fetch('http://127.0.0.1:5000/create_servicos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const response = await res.json();
        throw new Error(response.error || 'Erro ao registrar');
      } else {
        toast.success('Serviço registrado com sucesso!', { autoClose: 3000 });
        setTimeout(() => {
          navigate('/servicos');
        }, 3000); 
      }
    } catch (err) {
        if (err.message === 'Erro ao registrar') {
            setError('Ocorreu um erro ao registrar o serviço. Por favor, tente novamente.');
            toast.error('Ocorreu um erro ao registrar o serviço. Por favor, tente novamente.');
        } else {
            setError('Erro inesperado. Por favor, contate o suporte.');
            toast.error('Erro inesperado. Por favor, contate o suporte.');
        }
    }
};

  return (
    <div className="register">
      <ToastContainer />
      <h1>Registro de serviços</h1>
      <form className='formulario' onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
        <label>Nome do serviço</label>
        <input 
          type="text" 
          placeholder="Nome do serviço"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required 
        />
        <label>Critérios</label>
        <input 
          type="text" 
          placeholder="Critério"
          value={criterios}
          onChange={(e) => setCriterios(e.target.value)}
          required 
        />
        <label>Horários</label>
        <input 
        type="text"
        placeholder='Horários'
        value={horario}
        onChange={(e) => setHorario(e.target.value)}
        required 
        />
        <label>Data</label>
        <input 
          type="text" 
          placeholder="Data"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required 
        />
        <label>Locais</label>
        <input 
          type="text" 
          placeholder="Locais"
          value={locais}
          onChange={(e) => setLocais(e.target.value)}
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

export default RegistrarServicos;
