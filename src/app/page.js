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
  IconButton, FormControl, Box
} from '@mui/material';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {login} from "@/app/services/auth"
import {useSnackbar} from "@/app/context/SnackbarContext";
import cache from "@/app/services/cache";
import {LoadingButton} from "@mui/lab";

export default function Home() {

  const { showSnackbar } = useSnackbar();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(cache.get('token')){
      window.location.replace('/groups');
    }
  }, []);

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
    setLoading(true)

    try{
      await login({
        email,
        password
      })

      window.location.replace('/groups');
    } catch (error) {
      showSnackbar(error.response.data.error, 'error');
    }
  };

  return (
    <Grid container alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
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
            <Box display="flex" justifyContent="center" marginTop={2} marginBottom={2}>
              <LoadingButton
                size="large"
                loading={loading}
                variant="contained"
                color="primary"
                type="submit"
              >
                <span>Iniciar sesión</span>
              </LoadingButton>
            </Box>
          </form>
          <hr />
          <p style={{ marginTop: 20 }}>¿Aún no tienes una cuenta? <Link href="/register">Registrarse</Link></p>
        </Card>
      </Grid>
    </Grid>
  );
}