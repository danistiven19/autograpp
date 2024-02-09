import React, { useEffect, useState } from 'react';
import { TextField, Button, CardHeader, Card, CardMedia, Grid, Avatar } from '@mui/material';
import { getAllFamous } from './../../api/famous';
import placeholderIcon from './../../assets/images/placeholder.png';
import addIcon from './../../assets/images/add-circle-outline.png';
import avatarIcon from './../../assets/images/avatar.png';

const MyCollection = () => {
  const [user, setUser] = useState('');
  const [famousList, setFamousList] = useState([]);

  const handleUserUpdate = () => {
    // Lógica para actualizar el usuario
  };

  const loadAllFamous = async () => {
    const famous = await getAllFamous();
    setFamousList(famous);
  };

  useEffect(() => {
    loadAllFamous();
  }, []);

  const printFamousList = () => {
    const emptyItem = { _id: "-1.1", name: 'New', signature: addIcon };
    const printableList = [emptyItem, ...famousList];

    return printableList.map((famous) => {
      let { name, signature, _id } = famous;
      signature = signature || placeholderIcon;
      return (
        <Grid item key={_id}>
          <Card variant='outlined'>
            <CardHeader sx={{ backgroundColor: "lightgray"}} title={name} avatar={<Avatar src={avatarIcon}></Avatar>} />
            <CardMedia component="img" height="150" image={signature} />
          </Card>
        </Grid>
      );
    });
  };

  return (
    <div>
      <div className='user-header'>
        <TextField type="text" value={user} onChange={(e) => setUser(e.target.value)} />
        <Button variant="contained" onClick={handleUserUpdate}>Actualizar Usuario</Button>
      </div>
      <main>
        <h1>My Collection</h1>
        <Grid container spacing={2}>
          {printFamousList()}
        </Grid>

      </main>
    </div>
  );
};

export default MyCollection;
