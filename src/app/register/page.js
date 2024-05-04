'use client'
import {
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel, Link,
  OutlinedInput,
  TextField
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function Register() {

  const [originURL, setOriginURL] = useState('');

  useEffect(() => {
    setOriginURL(window.location.origin);
  }, []);

  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleNameChange = (event) => setEmail(event.target.value);
  const handleUserNameChange = (event) => setEmail(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleEmailConfirmationChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handlePasswordConfirmationChange = (event) => setPassword(event.target.value);

  const submit = (event) => {
    event.preventDefault();
    console.log('Name:', name, 'Username:', userName, 'Email:', email, 'Password:', password);
  }

  return (
      <Grid container alignItems="center" justifyContent="center" style={{ height: '100vh' }}>

        <Card variant="outlined" sx={{ p: 4}}>
          <h2>Registrate</h2>
          <form onSubmit={submit}>
            <Grid container spacing={2}>
              {/*Name input*/}
              <Grid item>
                <TextField
                    label="Nombre"
                    type="name"
                    margin="normal"
                    variant="outlined"
                    value={name}
                    onChange={handleNameChange}
                    required
                />
              </Grid>
              {/*Username input*/}
              <Grid item>
                <TextField
                    label="Usuario"
                    type="userName"
                    margin="normal"
                    variant="outlined"
                    value={userName}
                    onChange={handleUserNameChange}
                    required
                />
              </Grid>
            </Grid>


            <Grid container>
              <Grid item xs={10}>
                {/*Email input*/}
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
              </Grid>

              <Grid item xs={10}>
                {/*Email confirmation input*/}
                <TextField
                    label="Confirma tu email"
                    type="email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={emailConfirmation}
                    onChange={handleEmailConfirmationChange}
                    required
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} marginTop={1}>
              <Grid item xs={10}>
                {/*Password input*/}
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                  <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      label="Contraseña"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={10}>
                {/*Repeat password input*/}
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-confirm-password">Confirmar contraseña</InputLabel>
                  <OutlinedInput
                      id="outlined-adornment-confirm-password"
                      type={showPassword ? 'text' : 'password'}
                      value={passwordConfirmation}
                      onChange={handlePasswordConfirmationChange}
                      required
                      label="Confirmar contraseña"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={1} alignSelf="center">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={()=> setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </Grid>
            </Grid>

            <Button type="submit" color="primary" variant="contained" fullWidth style={{ marginTop: 20 }}>
              Registrar
            </Button>
          </form>
          <p style={{ marginTop: 20 }}>¿Ya tienes una cuenta? <Link href={originURL+"/login"}>Login</Link></p>
        </Card>

      </Grid>
  );
}