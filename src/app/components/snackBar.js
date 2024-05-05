'use client'

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useEffect, useState} from "react";

export default function SnackBar({info, severity}) {

    const [open, setOpen] = useState(false);

    const openSnackBar = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        openSnackBar();
    }, []);

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {info}
                </Alert>
            </Snackbar>
        </div>
    );
}