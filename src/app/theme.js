'use client'

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#bef264',
      dark: '#8bb14b',
    },
    secondary: {
      main: '#134e4a',
      dark: '#156a64',
    },
    tertiary: {
      main: '#08444F',
      dark: '#0c6070',
    }
  },
});

export default theme;