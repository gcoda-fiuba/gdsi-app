'use client'

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#03615E',
      dark: '#8bb14b',
    },
    secondary: {
      main: '#0D99FF',
      dark: '#156a64',
    },
    tertiary: {
      main: '#A1DA97',
      dark: '#0c6070',
    },
  },
});

export default theme;