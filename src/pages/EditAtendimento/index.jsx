import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const EditAtendimento = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cpfFunc, setCpfFunc] = useState('');
  const [cpfBen, setCpfBen] = useState('');
  const [assunto, setAssunto] = useState('');
  const [data, setData] = useState('');
  const [duracao, setDuracao] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAtendimento = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/get_atendimento/${id}`);
        if (!res.ok) throw new Error('Erro ao buscar atendimento');
        const atendimento = await res.json();

        setCpfFunc(atendimento.cpfFunc);
        setCpfBen(atendimento.cpfBen);
        setAssunto(atendimento.assunto);
        setData(new Date(atendimento.data).toISOString().slice(0, 16));
        setDuracao(atendimento.duracao);
      } catch (err) {
        setError('Erro ao carregar os dados do atendimento.');
        toast.error(err.message || 'Erro ao carregar os dados do atendimento.');
      }
    };

    fetchAtendimento();
  }, [id]);

  const handleUpdate = async () => {
    const dataFormatted = new Date(data).toISOString();
    const updatedData = {
      cpfFunc,
      cpfBen,
      assunto,
      data: dataFormatted,
      duracao: parseInt(duracao, 10),
    };

    try {
      const res = await fetch(`http://127.0.0.1:5000/update_atendimento/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        const response = await res.json();
        throw new Error(response.error || 'Erro ao atualizar atendimento');
      }

      toast.success('Atendimento atualizado com sucesso!', { autoClose: 2000 });
      setTimeout(() => {
        navigate('/beneficiario-dashboard/atendimentos');
      }, 3000);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Erro ao atualizar atendimento.');
    }
  };

  return (
    <div className="register">
      <ToastContainer />
     
      <form className='formulario' onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
      <h1>Editar Atendimento</h1>
        <label>CPF do Funcionário</label>
        <input 
          type="text" 
          placeholder="CPF do Funcionário"
          value={cpfFunc}
          onChange={(e) => setCpfFunc(e.target.value)}
          required 
        />
        <label>CPF do Beneficiário</label>
        <input 
          type="text" 
          placeholder="CPF do Beneficiário"
          value={cpfBen}
          onChange={(e) => setCpfBen(e.target.value)}
          required 
        />
        <label>Assunto</label>
        <textarea 
          placeholder="Assunto do atendimento"
          value={assunto}
          onChange={(e) => setAssunto(e.target.value)}
          required 
        />
        <label>Data e Hora</label>
        <input 
          type="datetime-local" 
          value={data}
          onChange={(e) => setData(e.target.value)}
          required 
        />
        <label>Duração (minutos)</label>
        <input 
          type="number" 
          placeholder="Duração em minutos"
          value={duracao}
          onChange={(e) => setDuracao(e.target.value)}
          required 
        />
        <div className="buttons-container">
          <button className='button' type="submit">Atualizar</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default EditAtendimento;