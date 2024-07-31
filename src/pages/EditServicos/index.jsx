import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';   

import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const EditServicos = () => {
  const [servicos, setServicos] = useState([]);
  const [error, setError] = useState('');
  const { nome } = useParams();
  const [criterios, setCriterios] = useState('');
  const [horario, setHorario] = useState('');
  const [date, setDate] = useState('');
  const [locais, setLocais] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEditServicos = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/get_servico/${nome}`, { method: 'GET' });
        if (!res.ok) {
          throw new Error('Erro ao buscar serviço');
        }
        const data = await res.json();
        setServicos(data);  // Update state with service object
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEditServicos();
  }, [nome]);

  const handleEdit = async () => {
    const data = {
      nome_servicos: nome,
      criterios: criterios,
      horario: horario,
      data: date,
      locais: locais
    }

    try {
      const res = await fetch('http://127.0.0.1:5000/update_servico', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const response = await res.json();
        throw new Error(response.error || 'Erro ao editar');
      } else {
        toast.success('Beneficiário editado com sucesso!', { autoClose: 3000 });
        setTimeout(() => {
          navigate('/servicos');
        }, 3000);
      }
    } catch (err) {
      if (err.message === 'Erro ao editar') {
        setError('Ocorreu um erro ao editar o serviço. Por favor, tente novamente.');
        toast.error('Ocorreu um erro ao editar o serviço. Por favor, tente novamente.');
      } else {
        setError('Erro inesperado. Por favor, contate o suporte.');
        toast.error('Erro inesperado. Por favor, contate o suporte.');
      }
    }
  };

  return (
    <div className="edit">
      <ToastContainer />
      <h1>Editar Serviço</h1>
      <form className='formulario' onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
        <label>Nome do serviço</label>
        <label>{servicos.nome_servicos}</label>
        <label>Critérios</label>
        <input 
        type="text"
        placeholder={servicos.criterios}
        value={criterios}
        onChange={(e) => setCriterios(e.target.value)}
        required 
        />
        <label>Horarios</label>
        <input 
        type="text"
        placeholder={servicos.horario}
        value={horario}
        onChange={(e) => setHorario(e.target.value)}
        />
        <label>Data</label>
        <input 
          type="text" 
          placeholder={servicos.data}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required 
        />
        <label>Locais</label>
        <input 
          type="text" 
          placeholder={servicos.locais}
          value={locais}
          onChange={(e) => setLocais(e.target.value)}
          required 
        />
        <div className="buttons-container">
          <button className='button' type="submit">Alterar</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default EditServicos;
