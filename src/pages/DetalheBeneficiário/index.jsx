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
  const [selectedFile, setSelectedFile] = useState(null);
  const [filteredFiles, setFilteredFiles] = useState({});
  const [searchCpf, setSearchCpf] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
  const handleDocument = (cpf) => {
    
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCpfChange = (event) => {
    setCpf(event.target.value);
  };

  const handleSearchCpfChange = (event) => {
    setSearchCpf(event.target.value);
  };

  const handleUpload = async () => {
    if (!cpf) {
      setErrorMessage('Por favor, digite um CPF antes de enviar um arquivo.');
      return;
    }
    
    setErrorMessage(''); // Limpar a mensagem de erro, se houver

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('cpf', cpf);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('File uploaded successfully:', response.data);
      setSelectedFile(null);
      fetchUploadedFiles();
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/uploaded-files');
      if (response.status === 200) {
        setUploadedFiles(response.data.files_by_cpf);
        // Apply the filter initially with an empty searchCpf
        applyFilter('', response.data.files_by_cpf);
      } else {
        console.error('Error fetching files:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const applyFilter = (filterCpf, files) => {
    if (!filterCpf) {
      setFilteredFiles({});
      return;
    }
    const filtered = {};
    Object.keys(files).forEach(cpf => {
      if (cpf.includes(filterCpf)) {
        filtered[cpf] = files[cpf];
      }
    });
    setFilteredFiles(filtered);
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const handleSearch = () => {
    applyFilter(searchCpf, uploadedFiles);
  };

  const handleDownload = (cpf, fileName) => {
    const downloadUrl = `http://localhost:5000/download/${cpf}/${fileName}`;
    window.location.href = downloadUrl;
  };
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
