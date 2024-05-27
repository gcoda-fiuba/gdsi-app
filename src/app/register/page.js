'use client';

import { useState } from 'react';
import { Grid, Card } from '@mui/material';
import RegisterForm from './RegisterForm';
import passwordSecurity from './passwordSecurity';
import useAuthStore from '@/app/store/auth';
import { useSnackbar } from '@/app/context/SnackbarContext';

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
  const [isRegistered, setIsRegistered] = useState(false);

  const handleNameChange = (event) => setName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleEmailConfirmationChange = (event) => setEmailConfirmation(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handlePasswordConfirmationChange = (event) => setPasswordConfirmation(event.target.value);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (event) => {
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
        
        setIsRegistered(true);
      } catch (error) {
        console.error(error);
        showSnackbar(error.response.data.error, 'error');
      }
    }
  };

  return (
    isRegistered ?
      <Grid container alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
        <Card variant="outlined" style={{ alignItems: 'center', justifyContent: 'center' }} sx={{ p: 4 }}>
          <h2>¡Registrado!</h2>
          <p>Revisa tu correo para verificar tu cuenta</p>
        </Card>
      </Grid>
      :
      <RegisterForm
        name={name}
        lastName={lastName}
        email={email}
        emailConfirmation={emailConfirmation}
        password={password}
        passwordConfirmation={passwordConfirmation}
        showPassword={showPassword}
        handleNameChange={handleNameChange}
        handleLastNameChange={handleLastNameChange}
        handleEmailChange={handleEmailChange}
        handleEmailConfirmationChange={handleEmailConfirmationChange}
        handlePasswordChange={handlePasswordChange}
        handlePasswordConfirmationChange={handlePasswordConfirmationChange}
        handleClickShowPassword={handleClickShowPassword}
        handleSubmit={handleSubmit}
      />
  );
}
