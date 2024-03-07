import React, { useEffect, useState } from 'react';
import { CardHeader, Card, CardMedia, Grid, Avatar } from '@mui/material';
import { getAllFamous } from '../../api/famous/famous';
import placeholderIcon from './../../assets/images/placeholder.png';
import addIcon from './../../assets/images/add-circle-outline.png';
import avatarIcon from './../../assets/images/avatar.png';

const MyCollection = () => {
  const [famousList, setFamousList] = useState([]);

  const loadAllFamous = async () => {
    const famous = await getAllFamous();
    setFamousList(famous);
  };

  useEffect(() => {
    loadAllFamous();
  }, []);

  const printFamousList = () => {
    const emptyItem = { _id: "-1.1", name: 'New', autograph: addIcon };
    const printableList = [emptyItem, ...famousList];

    return printableList.map((famous) => {
      let { name, autograph, _id } = famous;
      autograph = autograph || placeholderIcon;
      return (
        <Grid item key={_id}>
          <Card variant='outlined'>
            <CardHeader sx={{ backgroundColor: "lightgray"}} title={name} avatar={<Avatar src={avatarIcon}></Avatar>} />
            <CardMedia component="img" height="150" image={autograph} />
          </Card>
        </Grid>
      );
    });
  };

  return (
    <div>
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
