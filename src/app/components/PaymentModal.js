'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useEffect, useState } from 'react';
import MembersList from './MembersList';
import AddMemberSection from './AddMemberSection';
import BillsList from './BillsList';
import AddExpenseSection from './AddExpenseSection';
import useGroupStore from "@/app/store/groups";
import useUserStore from "@/app/store/user";

export default function PaymentModal({ debt, open, onClose }) {
    const { patchBill } = useGroupStore();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Titulo</DialogTitle>

                <DialogContent>
                    Contenido
                </DialogContent>

            <DialogActions>
                Acciones
            </DialogActions>
        </Dialog>
    );
}
