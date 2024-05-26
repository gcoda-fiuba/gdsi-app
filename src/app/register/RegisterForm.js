import {
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  Link
} from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";

const RegisterForm = ({
  name,
  lastName,
  email,
  emailConfirmation,
  password,
  passwordConfirmation,
  showPassword,
  handleNameChange,
  handleLastNameChange,
  handleEmailChange,
  handleEmailConfirmationChange,
  handlePasswordChange,
  handlePasswordConfirmationChange,
  handleClickShowPassword,
  handleSubmit
}) => (
  <Grid container alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
    <Card variant="outlined" sx={{ p: 4 }} >
      <h2>Registrate</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
              onClick={handleClickShowPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </Grid>
        </Grid>
        <Button type="submit" color="secondary" variant="outlined" fullWidth style={{ marginTop: 20 }}>
          Registrar
        </Button>
      </form>
      <p style={{ marginTop: 20 }}>¿Ya tienes una cuenta? <Link color = 'secondary' href="/">Login</Link></p>
    </Card>
  </Grid>
);

export default RegisterForm;
