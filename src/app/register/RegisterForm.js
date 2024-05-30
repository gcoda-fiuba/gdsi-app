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
                        phone,
                        password,
                        passwordConfirmation,
                        showPassword,
                        handleNameChange,
                        handleLastNameChange,
                        handleEmailChange,
                        handleEmailConfirmationChange,
                        handlePhoneChange,
                        handlePasswordChange,
                        handlePasswordConfirmationChange,
                        handleClickShowPassword,
                        handleSubmit
                      }) => (
    <Grid container alignItems="center" justifyContent="center" style={{ height: '100vh', margin: '0 auto' }} xs={12} md={8} lg={4}>
      <Card variant="outlined" sx={{ p: 4 }} >
        <h2>Registrate</h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                  label="Nombre"
                  type="name"
                  margin="normal"
                  variant="outlined"
                  value={name}
                  fullWidth
                  onChange={handleNameChange}
                  required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="Apellido"
                  type="lastName"
                  margin="normal"
                  variant="outlined"
                  value={lastName}
                  fullWidth
                  onChange={handleLastNameChange}
                  required
              />
            </Grid>

            <Grid item xs={12}>
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
            <Grid item xs={12}>
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

            <Grid item xs={12}>
              <TextField
                  label="Teléfono"
                  type="phone"
                  margin="normal"
                  variant="outlined"
                  value={phone}
                  fullWidth
                  onChange={handlePhoneChange}
              />
            </Grid>

            <Grid item xs={11}>
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
            <Grid item xs={11}>
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
