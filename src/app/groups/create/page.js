'use client'

import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Card } from '@mui/material';

function CreateGroup() {
  const [groupName, setGroupName] = useState('');

  const handleNameChange = (event) => setGroupName(event.target.value);

  const Submit = (event) => {
    event.preventDefault();
    console.log('Name:', groupName);
  };


  return (
    <Grid container alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
        <Card variant="outlined" sx={{ p: 4}}>
        <Typography variant="h6" component="h2" gutterBottom>
          Nuevo Grupo
        </Typography>
        <form onSubmit={Submit}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={groupName}
            onChange={handleNameChange}
          />
        
          <Button type="submit" variant="contained" color="primary">
            Crear Grupo
          </Button>

        </form>
        </Card>
      </Grid>
  );
}

export default CreateGroup;
