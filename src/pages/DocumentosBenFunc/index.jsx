import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./style.css";
import FormTemplate from '../../componentes/formTemplate';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [cpf, setCpf] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCpfChange = (event) => {
    setCpf(event.target.value);
  };

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/uploaded-files');
      if (response.status === 200) {
        setUploadedFiles(response.data.files_by_cpf);
      } else {
        console.error('Error fetching files:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const handleDownload = (cpf, fileName) => {
    const downloadUrl = `http://localhost:5000/download/${cpf}/${fileName}`;
    window.location.href = downloadUrl;
  };

  return (
    <FormTemplate isForm={false}>
       <h1>Documentos</h1>

        {Object.keys(uploadedFiles).map((cpf) => (
          <div key={cpf} >
            <h2 className="title">Documentos por CPF: {cpf}</h2>
            <div className="download-container">
              {uploadedFiles[cpf].map((file) => (
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
        ))}

    </FormTemplate>
  );
};

export default FileUpload;