import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./stile.css";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [filteredFiles, setFilteredFiles] = useState({});
  const [cpf, setCpf] = useState('');
  const [searchCpf, setSearchCpf] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    <div className="file-upload-container">
      <div className="upload-section">
        <input
          type="text"
          placeholder="Enter CPF"
          value={cpf}
          onChange={handleCpfChange}
        />
        <input 
          type="file" 
          id="inp" 
          onChange={handleFileChange} 
        />
        <button onClick={handleUpload}>Upload File</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
      <div className="search-section">
        <input
          type="text"
          placeholder="Digite o CPF para busca"
          value={searchCpf}
          onChange={handleSearchCpfChange}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <div className="uploaded-files">
        {Object.keys(filteredFiles).map((cpf) => (
          <div key={cpf} className="cpf-section">
            <h3>Resultado da busca:</h3>
            <ul className="two-column-list">
              {filteredFiles[cpf].map((file) => (
                <li key={file.name} className="pdf-box">
                  <a href="#" onClick={() => handleDownload(cpf, file.name)}>
                    <i className="fa fa-file-pdf-o"></i> {file.name}
                  </a>
                  <div className="download-overlay" onClick={() => handleDownload(cpf, file.name)} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;