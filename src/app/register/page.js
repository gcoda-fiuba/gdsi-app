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
import useAuthStore from "@/app/store/auth";
import {useSnackbar} from "@/app/context/SnackbarContext";

import React, {useState} from 'react';

export default function Register() {

  const { register } = useAuthStore();
  const { showSnackbar } = useSnackbar();

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

  const [registered, setRegistered] = useState(false);

  function passwordSecurity(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  const submit = async (event)=> {
    event.preventDefault();

    if (email !== emailConfirmation) {
        showSnackbar('Los correos no coinciden', 'error');
    } else if (password !== passwordConfirmation) {
      showSnackbar('Las contraseñas no coinciden', 'error');
    } else if (!passwordSecurity(password)) {
      showSnackbar(
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
        'error'
      );
    } else {

      try {
        await register({
          email: email,
          first_name: name,
          last_name: lastName,
          password: password
        });

        setRegistered(true);
      } catch (error) {
        console.error(error);
        showSnackbar(error.response.data.error, 'error');
      }
    }
  }

  return (
      registered ?
      <Grid container alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
        <Card variant="outlined" style={{ alignItems: 'center', justifyContent: 'center' }} sx={{p: 4}}>
          <h2>¡Registrado!</h2>
          <p>Revisa tu correo para verificar tu cuenta</p>
        </Card>
      </Grid>
      :
      <Grid container alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
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
                    label="Apellido"
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
          <p style={{ marginTop: 20 }}>¿Ya tienes una cuenta? <Link href="/">Login</Link></p>
        </Card>

      </Grid>
  );
}