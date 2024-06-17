'use client';

import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    DialogTitle,
    OutlinedInput,
    FormControl, InputLabel
} from "@mui/material";
import useGroupStore from "@/app/store/groups";
import {useSnackbar} from "@/app/context/SnackbarContext";
import {useEffect, useState} from "react";

export default function PaymentModal({ debt, open, onClose, refreshDebts }) {
    const { patchBill } = useGroupStore();
    const { showSnackbar } = useSnackbar();
    const [amountToPay, setAmountToPay] = useState(debt.amount);

    useEffect(() => {
        setAmountToPay(debt.amount);
    }, [debt]);

    const handleChangeAmountToPay = (event) => {
        setAmountToPay(event.target.value)
      };
      
    const handlePayBill = async (debt) => {
        if (!amountToPay || amountToPay <= 0 || amountToPay > debt.amount) {
            showSnackbar('Invalid amount', 'error');
            return;
        }
        try {
            await patchBill(debt.id, {amount: amountToPay});
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
                    {/*<Typography variant="subtitle2">{`${amountToPay}`}</Typography>*/}
                    <FormControl fullWidth variant="outlined" style={{ marginTop: 15 }}>
                        <InputLabel htmlFor="outlined-adornment-number">Amount to pay</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-number"
                            type="number"
                            value={amountToPay}
                            onChange={handleChangeAmountToPay}
                            label="Amount to pay"
                        />
                    </FormControl>
                </DialogContent>

            <DialogActions>
                <Button variant="outlined" color="error" onClick={onClose}>Cancel</Button>
                <Button variant="outlined" color="secondary" onClick={() => handlePayBill(debt, debt.amount)}>Pay</Button>
            </DialogActions>
        </Dialog>
    );
}
