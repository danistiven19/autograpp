import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const MyCollection = () => {
  const [user, setUser] = useState('');

  const handleUserUpdate = () => {
    // Lógica para actualizar el usuario
  };

  return (
    <div>
      <div className='user-header'>
        <TextField type="text" value={user} onChange={(e) => setUser(e.target.value)} />
        <Button variant="contained" onClick={handleUserUpdate}>Actualizar Usuario</Button>
      </div>
      <main>
        <h1>My Collection</h1>
        <div className="grid">
          {/* Tarjetas de información básica de artículos */}
          <div className="card">
            <h2>Título del artículo</h2>
            <img src="imagen_principal.jpg" alt="Imagen principal" />
            <div className="secondary-images">
              <img src="imagen_secundaria1.jpg" alt="Imagen secundaria 1" />
              <img src="imagen_secundaria2.jpg" alt="Imagen secundaria 2" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyCollection;
