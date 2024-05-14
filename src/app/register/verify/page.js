'use client'

import { Grid } from '@mui/material';
import { verifyAccount } from "@/app/services/auth";
import { useSnackbar } from "@/app/context/SnackbarContext";
import { useEffect, useState } from "react";

export default function Verify() {
    const { showSnackbar } = useSnackbar();
    const [verifying, setVerifying] = useState(true);

    useEffect(() => {
        async function verify() {
            const token = new URLSearchParams(window.location.search).get('token');

            try {
                await verifyAccount({ token });
                showSnackbar('Usuario registrado correctamente', 'success');
                window.location.replace('/groups');
            } catch (error) {
                setVerifying(false);
                showSnackbar("Hubo un error al verificar tu cuenta :(", 'error');
                window.location.replace('/');
            }
        }

        verify();
    }, []);

    return (
      <Grid container alignItems="center" justifyContent="center" style={{ flexDirection: 'column', height: '100vh' }}>
          {verifying && <h1>Estamos verificando tu cuenta...</h1>}
      </Grid>
    );
}
