import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
function FamousForm() {
  const [famousName, setFamousName] = useState('');
  const [information, setInformation] = useState('');

  const handleNameChange = (event) => {
    setFamousName(event.target.value);
  };

  const handleInformationChange = (event) => {
    setInformation(event.target.value);
  };

  const handleSave = () => {
    // Aquí puedes guardar la información en la forma que desees
    console.log(`Nombre del famoso: ${famousName}`);
    console.log(`Información: ${information}`);
  };

  return (
    <div>
      <TextField
        id="famousName"
        label="Nombre del famoso"
        value={famousName}
        onChange={handleNameChange}
      />

      <TextField
        id="information"
        label="Información"
        multiline
        rows={10}
        value={information}
        onChange={handleInformationChange}
      />

      <Button variant="contained" onClick={handleSave}>
        <i className="fa fa-microphone"></i> Guardar
      </Button>
    </div>
  );
}

export default FamousForm;