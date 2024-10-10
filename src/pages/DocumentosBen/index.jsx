import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 
import './stile.css';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [cpf, setCpf] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserCpf = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          setCpf(decodedToken.user);
        } else {
          setErrorMessage('Token não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        setErrorMessage('Erro ao obter CPF do token.');
      }
    };

    fetchUserCpf();
  }, []);

  useEffect(() => {
    if (cpf) {
      fetchUploadedFiles(); 
    }
  }, [cpf]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!cpf || !selectedFile) {
      setErrorMessage('Por favor, selecione um arquivo antes de enviar.');
      return;
    }

    setErrorMessage(''); // Limpar a mensagem de erro, se houver

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('cpf', cpf);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSelectedFile(null);
      fetchUploadedFiles(); // Atualiza a lista de arquivos após o upload
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      setErrorMessage('Erro ao fazer upload do arquivo.');
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/uploaded-files', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const files = response.data.files_by_cpf;
        setUploadedFiles(files[cpf] || []); // Defina arquivos com base no CPF do usuário logado
      } else {
        console.error('Erro ao buscar arquivos:', response.data.error);
      }
    } catch (error) {
      console.error('Erro ao buscar arquivos:', error);
    }
  };

  const handleDownload = (fileName) => {
    const downloadUrl = `http://localhost:5000/download/${cpf}/${fileName}`;
    window.location.href = downloadUrl;
  };

  return (
    <div className="file-upload-container">
      <div className="upload-section">
        <input
          type="file"
          id="inp"
          onChange={handleFileChange}
        />
        <button onClick={handleUpload}>Upload File</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>

      <div className="uploaded-files">
        {uploadedFiles.length > 0 ? (
          <div className="cpf-section">
            <h3>Documentos:</h3>
            <ul className="two-column-list">
              {uploadedFiles.map((file) => (
                <li key={file.name} className="pdf-box">
                  <a href="#" onClick={() => handleDownload(file.name)}>
                    <i className="fa fa-file-pdf-o"></i> {file.name}
                  </a>
                  <div className="download-overlay" onClick={() => handleDownload(file.name)} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Nenhum documento encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;