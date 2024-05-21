'use client';

import {Dialog, DialogContent, DialogActions, Button, Typography, DialogTitle} from "@mui/material";
import useGroupStore from "@/app/store/groups";
import {useSnackbar} from "@/app/context/SnackbarContext";
import {useState} from "react";

export default function PaymentModal({ debt, open, onClose }) {
    const { patchBill } = useGroupStore();
    const { showSnackbar } = useSnackbar();

    const [amount, setAmount] = useState(0);
    const [debtId, setDebtId] = useState(0);

    const handlePayBill = async (debt) => {
        console.log('debt ', debt);
        setAmount(debt.amountDebt);
        setDebtId(debt.debtId);
        try {
            console.log('debtID', debt.debtId)
            console.log('amount ', debt.amount)

            const response = await patchBill(debtId, {amount})
            showSnackbar('Payment registered');
            console.log('Payment registered ', response);
            onClose();
        } catch (error) {
            showSnackbar(error.response.data.error, 'error');
            console.error('Error paying bill', error);
            onClose();
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Pay debt</DialogTitle>

                <DialogContent>
                    <Typography variant="subtitle1">Pay to</Typography>
                    <Typography>{debt.userToId}</Typography>
                    <Typography variant="subtitle1">Amount</Typography>
                    <Typography>${amount}</Typography>
                </DialogContent>

            <DialogActions>
                <Button variant="outlined" color="error" onClick={onClose}>Cancel</Button>
                <Button variant="outlined" color="secondary" onClick={() => handlePayBill(debt)}>Pay</Button>
            </DialogActions>
        </Dialog>
    );
}
