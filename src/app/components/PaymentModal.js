'use client';

import {Dialog, DialogContent, DialogActions, Button, Typography, DialogTitle} from "@mui/material";
import useGroupStore from "@/app/store/groups";
import {useSnackbar} from "@/app/context/SnackbarContext";

export default function PaymentModal({ debt, open, onClose }) {
    const { patchBill } = useGroupStore();
    const { showSnackbar } = useSnackbar();

    const handlePayBill = async (debt) => {
        try {
            const response = await patchBill(debt.id, {amount: debt.amount})
            showSnackbar('Payment registered');
            onClose();
        } catch (error) {
            showSnackbar('There was an error on the payment', 'error');
            onClose();
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Pay debt</DialogTitle>

                <DialogContent>
                    <Typography variant="subtitle1">Pay to</Typography>
                    <Typography>{debt.user}</Typography>
                    <Typography variant="subtitle1">Amount</Typography>
                    <Typography>${debt.amount}</Typography>
                </DialogContent>

            <DialogActions>
                <Button variant="outlined" color="error" onClick={onClose}>Cancel</Button>
                <Button variant="outlined" color="secondary" onClick={() => handlePayBill(debt)}>Pay</Button>
            </DialogActions>
        </Dialog>
    );
}
