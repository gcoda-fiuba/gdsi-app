'use client'

import { createContext, useContext, useState } from 'react';

const SnackbarContext = createContext();

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export const SnackbarProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState('info');

  const showSnackbar = (newMessage, newSeverity = 'info') => {
    setMessage(newMessage);
    setSeverity(newSeverity);
  };

  const closeSnackbar = () => {
    setMessage(null);
  };

  const value = { message, severity, showSnackbar, closeSnackbar };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};
