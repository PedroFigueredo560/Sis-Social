import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import axios from 'axios';  

import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const DetalheBeneficiario = () => {
  const [beneficiario, setBeneficiario] = useState([]);
  const [idade, setIdade] = useState();
  const nasc = new Date(beneficiario.nascimento);
  const date = `${nasc.getDate() + 1}/${nasc.getMonth()+1}/${nasc.getFullYear()}`;
  const [uploadedFiles, setUploadedFiles] = useState({});
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

  useEffect(() => {
    const calculoIdade = async () => {
      const hoje = new Date();
      const nasc = new Date(beneficiario.nascimento);
      let idade = hoje.getFullYear() - nasc.getFullYear();
      const mes = hoje.getMonth() - nasc.getMonth();
  
      if(mes<0 || (mes === 0 && hoje.getDate() < nasc.getDate())) {
        idade--;
      }
  
      setIdade(idade);
    }

    const fetchUploadedFiles = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/uploaded_files_by_cpf/${cpf}`, {method: 'GET'});
        if (res.ok) {
          const data = await res.json();
          setUploadedFiles(data);
        } else {
          console.error('Error fetching files:', res.data.error);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchUploadedFiles();
    calculoIdade();
  })

  const handleDownload = (cpf, fileName) => {
    const downloadUrl = `http://localhost:5000/download/${cpf}/${fileName}`;
    window.location.href = downloadUrl;
  };

  const handleDocument = (cpf) => {
    
  }

  return (
    <div className="beneficiario">
      <ToastContainer />
      <div className = 'info_pessoal'>
        <h1>Informações Pessoais</h1><br />
        <img className = 'profile_photo' src="/src/assets/profile.png" alt="profile_photo" /> <br />
        Nome: {beneficiario.nome_ben} <br />
        CPF: {beneficiario.cpf} <br />
        Idade: {idade} <br />
        Nascimento: {date} <br />
        Telefone: {beneficiario.telefone}<br />
        Endereço: {beneficiario.endereco} <br />
      </div>

      <div className = 'documentos'>
        <h1>Documentos</h1>
        {uploadedFiles[cpf]?.map((file) => (
          <div key={file.name} className="document-box">
            <span className="document-name">{file.name}</span>
            <a
              href="#"
              onClick={() => handleDownload(cpf, file.name)}
              className="download-button"
            >
              Baixar
            </a>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default DetalheBeneficiario;
