import React, { useState } from 'react';
import axios from 'axios';
import { FaCamera } from "react-icons/fa";
import './UploadForm.css';

const UploadForm = () => {
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('text', text);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
  
      await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setText('');
      setSelectedFile(null);
      alert('Text and image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading text and image:', error);
      alert('Failed to upload text and image.');
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          document.getElementById('file').click();
        }}>
        <FaCamera />
      </button>
      <input
        type="file"
        id="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input"
      />
      <div>
        <textarea className="inputField" id="text" value={text} onChange={handleTextChange} />
      </div>
      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={!text && !selectedFile}>Upload</button>
      </form>
    </div>
  );
};

export default UploadForm;
