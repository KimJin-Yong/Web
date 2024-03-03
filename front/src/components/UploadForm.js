import React, { useState } from 'react';
import axios from 'axios';
import { FaCamera } from "react-icons/fa";
import './UploadForm.css';
import '../App.css';

const UploadForm = () => {
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const [uploadedText, setUploadedText] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedAttribute, setUpAttribute] = useState('');

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
      console.log(formData);
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadedText(response.data.txt);
      setUploadedImage(`data:image/jpeg;base64,${response.data.img}`);
      setUpAttribute(response.data.att)

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
      <div className='horizontal-list'>
        <li>
          <button
            onClick={() => {
              document.getElementById('file').click();
            }} className='btn btn-primary'>
            <FaCamera />
          </button>
        </li>
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />
        <li>
          <textarea className="inputField" id="text" value={text} onChange={handleTextChange} />
        </li>
        <li>
          <form onSubmit={handleSubmit}>
            <button type="submit" className='btn btn-primary' disabled={!text && !selectedFile}>Upload</button>
          </form>
        </li>
      </div>
      {uploadedText && uploadedImage && (
        <div className='response-container'>
          <p>{uploadedText}</p>
          <img src={uploadedImage} className='response-image' alt="Uploaded" />
          <p>{uploadedAttribute}</p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
