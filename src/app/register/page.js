'use client'

import {
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputLabel, Link,
  OutlinedInput,
  TextField
} from '@mui/material';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {register} from "@/app/services/auth"

import SnackBar from "@/app/components/snackBar";

import React, {useEffect, useState} from 'react';

export default function Register() {

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleNameChange = (event) => setName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleEmailConfirmationChange = (event) => setEmailConfirmation(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handlePasswordConfirmationChange = (event) => setPasswordConfirmation(event.target.value);

  const [snackBar, setSnackBar] = useState(false);
  const [responseInfo, setResponseInfo] = useState('');
  const [severity, setSeverity] = useState('');

  useEffect(() => {
    if(snackBar) {
      setTimeout(() => {
        setSnackBar(false);
      }, 6000);
    }
  }, [snackBar]);

  function passwordSecurity(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  const submit = async (event)=> {
    event.preventDefault();

    if (email !== emailConfirmation) {
        setResponseInfo('Los correos no coinciden');
        setSeverity('error');
        setSnackBar(true);
    } else if (password !== passwordConfirmation) {
        setResponseInfo('Las contraseñas no coinciden');
        setSeverity('error');
        setSnackBar(true);
    } else if (!passwordSecurity(password)) {
        setResponseInfo('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');
        setSeverity('error');
        setSnackBar(true);
    } else {
        await register({
          email: email,
          first_name: name,
          last_name: lastName,
          password: password
        })
          .then(response => {
            setResponseInfo('Usuario registrado correctamente');
            setSeverity('success');
            setSnackBar(true);
            // This redirect method is not recommended, it errors in console REPLACE
            window.location.replace('/groups');
        })
          .catch(error => {
            console.log(error)
            setResponseInfo("Error al registrar usuario ): ");
            setSeverity('error');
            setSnackBar(true);
      });
    }

  }

  return (
      <Grid container alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
        {snackBar ? <SnackBar info={responseInfo} severity={severity}/> : null}
        <Card variant="outlined" sx={{p: 4}}>
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
                    type="lastName"
                    margin="normal"
                    variant="outlined"
                    value={lastName}
                    onChange={handleLastNameChange}
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
          <p style={{ marginTop: 20 }}>¿Ya tienes una cuenta? <Link href="/login">Login</Link></p>
        </Card>

      </Grid>
  );
}