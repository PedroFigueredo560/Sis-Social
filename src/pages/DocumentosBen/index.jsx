import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./style.css";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]); // State to hold uploaded files

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);   


    try {
      const token = localStorage.getItem('token'); // Retrieve token from storage
      const response = await axios.post(
        'http://localhost:5000/upload', // Replace with your backend URL
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include authorization header
            'Content-Type': 'multipart/form-data', // Set content type for multipart form data
          },
        }
      );

      console.log('File uploaded successfully:', response.data);
      setSelectedFile(null); // Clear selected file state for next upload
      fetchUploadedFiles();
    } catch (error) {
      console.error('Upload error:', error);
     
    }
  };

  // Function to fetch uploaded file list from backend
  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/uploaded-files');
      if (response.status === 200) {
        setUploadedFiles(response.data.files);
      } else {
        console.error('Error fetching files:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  // Call fetchUploadedFiles on component mount and after successful upload
  useEffect(() => {
    fetchUploadedFiles();
  }, []); // Empty dependency array for initial fetch

  useEffect(() => {
    // Re-render when uploadedFiles state changes
    fetchUploadedFiles();
  }, [uploadedFiles]);

  const handleDownload = (fileName) => {
    // Replace with your backend URL for downloading the file
    const downloadUrl = `http://localhost:5000/download/${fileName}`;
    window.location.href = downloadUrl;
  };

  return (
    <div className="file-upload-container">
      <div className="upload-section">
        <input type="file" id="inp" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload File</button>
      </div>
      <div className="uploaded-files">
        {uploadedFiles.length > 0 && (
          <ul className="two-column-list">
            {uploadedFiles.map((file) => (
              <li key={file.name} className="pdf-box">
                <a href="#" onClick={() => handleDownload(file.name)}>
                  <i className="fa fa-file-pdf-o"></i> {file.name}
                </a>
                {/* Wrap the entire file box content in a clickable element */}
                <div className="download-overlay" onClick={() => handleDownload(file.name)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};


export default FileUpload;