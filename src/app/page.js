'use client';

import React, {useEffect, useState} from 'react';
import {
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
import useAuthStore from "@/app/store/auth";
import {useSnackbar} from "@/app/context/SnackbarContext";
import cache from "@/app/services/cache";
import {LoadingButton} from "@mui/lab";
import { useRouter } from 'next/navigation'

export default function Home() {

  const { showSnackbar } = useSnackbar();
  const { login } = useAuthStore();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cache.get('token')) {
      router.replace('/groups');
    }
  }, [router]);

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
      });

      await router.push('/groups');
    } catch (error) {
      showSnackbar(error.response.data.error, 'error');
      setLoading(false);
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
                variant="outlined"
                color="secondary"
                type="submit"
              >
                <span>Iniciar sesión</span>
              </LoadingButton>
            </Box>
          </form>
          <hr />
          <p style={{ marginTop: 20 }}>¿Aún no tienes una cuenta? <Link color = "secondary" href="/register">Registrarse</Link></p>
        </Card>
      </Grid>
    </Grid>
  );
}