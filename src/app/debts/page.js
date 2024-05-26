'use client';

import {Card, Grid} from "@mui/material";
import DebtList from "@/app/components/debtList";
import PaymentModal from "@/app/components/PaymentModal";

import {useEffect, useState} from "react";
import Loading from "@/app/debts/loading";
import useDebtsStore from "@/app/store/debts";
import useUserStore from "@/app/store/user";

export default function Debt() {
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [debtToPay, setDebtToPay] = useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { getMyDebts, debts } = useDebtsStore()
    const { getUsers, users } = useUserStore();

    useEffect(() => {
        fetchInitialData()
    }, []);

    const fetchInitialData = async () => {
        try {
            await getMyDebts();

            if(!users){
                await getUsers();
            }
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false);
        }
    }

    const handleClosePaymentModal = () => {
        setOpenPaymentModal(false);
    }
    const handleOpenPaymentModal = (debt) => {
        setDebtToPay(debt);
        setOpenPaymentModal(true);
    }

    const errorView =
        (<>
            <Grid container style={{height: '100vh'}}>
                <Grid item>
                    <h2>Hubo un error cargando este grupo</h2>
                </Grid>
            </Grid>
        </>);

    return (
        loading ? <Loading /> : error ? errorView :
        <Card variant="outlined" sx={{p: 4}}>
            <h3>My debts: </h3>
            <Grid item>
                <Card variant="outlined" sx={{p: 4}}>
                    <Grid item>
                        <DebtList debts={debts} users={users} handleOpenPaymentModal={handleOpenPaymentModal} />
                    </Grid>
                </Card>
            </Grid>
            <PaymentModal debt={debtToPay} open={openPaymentModal} onClose={handleClosePaymentModal} refreshDebts={fetchInitialData} />
        </Card>
    );
}