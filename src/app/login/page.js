'use client'

import React, {useEffect, useState} from 'react';
import {
  Button,
  TextField,
  Grid,
  Link,
  Card,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton, FormControl
} from '@mui/material';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {login} from "@/app/services/auth"
import SnackBar from "@/app/components/snackBar";

export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await login({
      email,
      password
    }).then(response => {
      setResponseInfo('Inicio de sesión exitoso!');
      setSeverity('success');
      setSnackBar(true);
      // This redirect method is not recommended, it errors in console REPLACE
      window.location.replace('/groups');
    })
        .catch(error => {
            setResponseInfo(error.response.data);
              setSeverity('error');
              setSnackBar(true);
        });

  };

  return (
    <Grid container alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
      {snackBar ? <SnackBar info={responseInfo} severity={severity}/> : null}
      <Grid item xs={12} sm={6} md={4}>
        <Card variant="outlined" sx={{ p: 4}}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
              />
            </FormControl>
            <Button type="submit" color="primary" variant="contained" fullWidth style={{ marginTop: 20 }}>
              Iniciar sesión
            </Button>
          </form>
          <p style={{ marginTop: 20 }}>¿Aún no tienes una cuenta? <Link href="/register">Registrarse</Link></p>
        </Card>
      </Grid>
    </Grid>
  );
}