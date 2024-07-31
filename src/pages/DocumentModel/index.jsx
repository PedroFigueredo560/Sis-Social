import React, { useState, useEffect } from 'react';
import "./style.css";

function DownloadPage() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Lógica para buscar os documentos na pasta e setar no estado
    const fetchDocuments = () => {
      // Ajustar o caminho relativo para a sua estrutura de arquivos
      const documents = [
        { name: 'Regulação Medica', url: './documents/modelo 1.docx' },
        { name: 'Doação de cesta basica', url: './documents/modelo 2.docx' },
        { name: 'ajuda humanitaria', url: './documents/modelo 3.docx' },
        { name: 'Lista mais importante', url: './documents/modelo 4.docx' }
      ];
      setDocuments(documents);
    };
    fetchDocuments();
  }, []);

  return (
    <div className="box">
      <div className="download-container">
        {documents.map((document, index) => (
          <a href={document.url} download key={index} className="document-box">
            {document.name}
          </a>
        ))}
      </div>
    </div>
  );
}


export default DownloadPage;