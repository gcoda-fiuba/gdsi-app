'use client'

import {Button, Grid} from '@mui/material';
import {verifyAccount} from "@/app/services/auth";
import {useSnackbar} from "@/app/context/SnackbarContext";

export default function Verify() {
    const { showSnackbar } = useSnackbar();

    const handleVerification = async () => {
        const token = new URLSearchParams(window.location.search).get('token');
        await verifyAccount({token}).then(response => {
            console.log(response);
            showSnackbar('Usuario registrado correctamente', 'success');
            window.location.replace('/groups');
        }).catch(error => {
            console.log(error);
            showSnackbar("Hubo un error al verificar tu cuenta :(", 'error');
        });
    }

    return (
        <Grid container alignItems="center" justifyContent="center" style={{ flexDirection: 'column', height: '100vh' }}>
            <h1>Estamos verificando tu cuenta...</h1>
            {/*<p>Token: {token}</p>*/}
            <Button onClick={handleVerification}>Verificar</Button>
        </Grid>
    );
}