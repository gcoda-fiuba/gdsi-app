'use client'

import { Grid } from '@mui/material';
import { useSnackbar } from "@/app/context/SnackbarContext";
import { useEffect, useState, Suspense } from "react";
import useAuthStore from "@/app/store/auth";
import { useRouter, useSearchParams } from 'next/navigation'

function VerifyContent() {
    const {verifyAccount} = useAuthStore()
    const router = useRouter();
    const searchParams = useSearchParams()
    const { showSnackbar } = useSnackbar();

    const [verifying, setVerifying] = useState(true);

    useEffect(() => {
        async function verify() {
            const token = searchParams.get('token')

            try {
                await verifyAccount({ token });
                showSnackbar('Usuario registrado correctamente', 'success');
                router.replace('/groups');
            } catch (error) {
                setVerifying(false);
                showSnackbar("Hubo un error al verificar tu cuenta :(", 'error');
                setTimeout(() => {
                    router.replace('/');
                }, 2000);
            }
        }

        verify();
    }, [router, searchParams, showSnackbar, verifyAccount]);

    return (
        <Grid container alignItems="center" justifyContent="center" style={{ flexDirection: 'column', height: '100vh' }}>
            {verifying && <h1>Estamos verificando tu cuenta...</h1>}
        </Grid>
    );
}

export default function Verify() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <VerifyContent />
        </Suspense>
    );
}
