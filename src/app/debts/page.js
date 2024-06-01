'use client';

import {Grid} from "@mui/material";
import DebtList from "@/app/components/DebtList";
import PaymentModal from "@/app/components/PaymentModal";

import {useEffect, useState} from "react";
import Loading from "@/app/debts/loading";
import useDebtsStore from "@/app/store/debts";
import useUserStore from "@/app/store/user";
import DebtListFilter from "@/app/components/DebtListFilter";

export default function DebtListView() {
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [debtToPay, setDebtToPay] = useState({});

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const { getMyDebts, debts } = useDebtsStore()
    const { getUsers, users } = useUserStore();

    const [listFilters, setListFilters] = useState({
        group: null,
        user: null,
        lessThan: null,
        graterThan: null,
    });

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
            setHasError(true)
        } finally {
            setIsLoading(false);
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
        isLoading ? <Loading /> :
             hasError ? errorView :
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <DebtListFilter changeFilters={setListFilters} />
                    </Grid>
                    <Grid item md={12}>
                        <DebtList debts={debts} users={users} handleOpenPaymentModal={handleOpenPaymentModal} filters={listFilters} />
                        <PaymentModal debt={debtToPay} open={openPaymentModal} onClose={handleClosePaymentModal} refreshDebts={fetchInitialData} />
                    </Grid>
                </Grid>
    );
}