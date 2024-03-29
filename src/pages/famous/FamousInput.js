import React, { useCallback, useEffect, useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import SignatureField from '../../components/signature/Signature';
import { createFamous } from '../../api/famous/famous';
import { useNavigate } from 'react-router-dom';

function FamousForm(props) {
  const navigate = useNavigate();
  const [famousName, setFamousName] = useState('');
  const [signature, setSignature] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const { famousNameProp, signatureProp } = props;
    if (famousNameProp) {
      setFamousName(famousNameProp);
    }
    
    if (signatureProp) { 
      setSignature(signatureProp);
    }
  }, [props]);

  const handleNameChange = (event) => {
    if (!event || !event.target || !event.target.value) {
      setErrorMessage('Please provide a name.');
    } else {
      setErrorMessage('');
    }

    setFamousName(event.target.value);
  };

  const handleSignatureChange = useCallback((signatureProp) => {
    if (!signatureProp) {
      setErrorMessage('Please provide a signature.');
    } else {
      setErrorMessage('');
    }

    setSignature(signatureProp);
  }, [setSignature]);

  const storeInformation = async (famous) => {
    try {
      await createFamous(famous);
    } catch(err) {
      console.error('Failed famous creation: ', err.errorMessage);
    }
  };

  const handleSave = () => {
    if (!famousName || !signature) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    storeInformation({name: famousName, autograph: signature });
    setErrorMessage('');
    navigate('/');
  };

  const signaturePreview = signature ? <img src={signature} alt="Sign" /> : null;

  return (
    <div>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <TextField
        id="famousName"
        label="Nombre del famoso"
        value={famousName}
        onChange={handleNameChange}
      />
      <SignatureField storeSignature={handleSignatureChange} />
      {signaturePreview}
      <Button variant="contained" onClick={handleSave}>
        <i className="fa fa-microphone"></i> Guardar
      </Button>
    </div>
  );
}

export default FamousForm;