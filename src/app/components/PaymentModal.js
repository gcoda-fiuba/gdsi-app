'use client';

import {Dialog, DialogContent, DialogActions, Button, Typography, DialogTitle, Slider} from "@mui/material";
import useGroupStore from "@/app/store/groups";
import {useSnackbar} from "@/app/context/SnackbarContext";
import {useState} from "react";

export default function PaymentModal({ debt, open, onClose, refreshDebts }) {
    const { patchBill } = useGroupStore();
    const { showSnackbar } = useSnackbar();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      
    const handlePayBill = async (debt, amount) => {
        try {
            await patchBill(debt.id, {amount: amount});
            showSnackbar('Payment registered');
            refreshDebts();
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
                    <Typography variant="subtitle2">Pay to</Typography>
                    <Typography>{debt.user}</Typography>
                    <Typography variant="subtitle2">Amount</Typography>
                    <Typography>${debt.amount}</Typography>
                    <Typography variant="subtitle2">Or make a partial payment instead</Typography>
                    <Slider
                        value={value}
                        onChange={handleChange}
                        aria-label="Partial pay"
                        valueLabelDisplay="auto"
                        step={1}
                        min={0}
                        max={debt.amount}
                    />
                </DialogContent>

            <DialogActions>
                <Button variant="outlined" color="error" onClick={onClose}>Cancel</Button>
                <Button variant="outlined" color="secondary" onClick={() => handlePayBill(debt, debt.amount)}>Pay</Button>
                <Button variant="outlined" color="secondary" onClick={() => handlePayBill(debt, value)}>Partial Pay</Button>
            </DialogActions>
        </Dialog>
    );
}
