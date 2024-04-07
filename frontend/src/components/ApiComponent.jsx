import React, { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApiComponent = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      // Mostrar un toast de error si no se selecciona un archivo
      toast.error('Por favor, selecciona un archivo antes de subirlo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://127.0.0.1:8000/videos/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Video uploaded:', data);
        // Mostrar un toast de éxito
        toast.success('¡Video subido correctamente!');
      })
      .catch((error) => {
        console.error('Error uploading video:', error);
        // Mostrar un toast de error en caso de fallo
        toast.error('Error al subir el video. Por favor, inténtalo de nuevo.');
      });
  };

return (
  <Container>
    <div style={{ display: 'flex', marginTop: '10px' }}>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Seleccionar Archivo
        </Button>
      </label>
      {file && (
        <Typography variant="body1" >
          Archivo Seleccionado: {file.name}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        style={{ marginLeft: '10px' }}
      >
        Subir
      </Button>
    </div>
    <ToastContainer />
  </Container>
);
};

export default ApiComponent;
