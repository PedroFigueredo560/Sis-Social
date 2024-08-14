import React, { useState, useEffect } from 'react';
import "./style.css";
import FormTemplate from '../../componentes/formTemplate';

function DownloadPage() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Lógica para buscar os documentos na pasta e setar no estado
    const fetchDocuments = () => {
      // Ajustar o caminho relativo para a sua estrutura de arquivos
      const documents = [
        { name: 'Regulação Médica', url: './documents/modelo 1.docx' },
        { name: 'Doação de Cesta Básica', url: './documents/modelo 2.docx' },
        { name: 'Ajuda Humanitária', url: './documents/modelo 3.docx' },
        { name: 'Lista Mais Importante', url: './documents/modelo 4.docx' }
      ];
      setDocuments(documents);
    };
    fetchDocuments();
  }, []);

  return (
    // <div className="box">
       <FormTemplate isForm={false}>
       <h1>Documentos</h1>
      <div className="download-container">
        {documents.map((document, index) => (
          <div className="document-box" key={index}>
            <span className="document-name">{document.name}</span>
            <a href={document.url} download className="download-button">
              Baixar
            </a>
          </div>
        ))}
      </div>
      </FormTemplate>
    // </div>
  );
}

export default DownloadPage;
