'use client'

import {Button, Grid} from '@mui/material';
import {verifyAccount} from "@/app/services/auth";
import {useSnackbar} from "@/app/context/SnackbarContext";
import {useState} from "react";

export default function Verify() {
    const { showSnackbar } = useSnackbar();
    const [verifying, setVerifying] = useState(false);

    const handleVerification = async () => {
        setVerifying(true);
        const token = new URLSearchParams(window.location.search).get('token');
        await verifyAccount({token}).then(response => {
            console.log(response);
            showSnackbar('Usuario registrado correctamente', 'success');
            window.location.replace('/groups');
        }).catch(error => {
            console.log(error);
            showSnackbar("Hubo un error al verificar tu cuenta :(", 'error');
            setVerifying(false);
        });
    }

    return (

        <Grid container alignItems="center" justifyContent="center" style={{ flexDirection: 'column', height: '100vh' }}>
            {
            verifying ?
            <h1>Estamos verificando tu cuenta...</h1>
            :
            <Button onClick={handleVerification}>Verificar</Button>
            }
        </Grid>
    );
}