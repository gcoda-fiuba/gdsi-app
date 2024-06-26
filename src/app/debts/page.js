'use client';

import {Box, Grid} from "@mui/material";
import DebtList from "@/app/components/DebtList";
import PaymentModal from "@/app/components/PaymentModal";
import {useEffect, useState} from "react";
import Loading from "@/app/debts/loading";
import useDebtsStore from "@/app/store/debts";
import useUserStore from "@/app/store/user";
import DebtListFilter from "@/app/components/DebtListFilter";
import useGroupStore from "@/app/store/groups";
import withAuth from "@/app/hoc/withAuth";

const DebtListView = () => {
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [debtToPay, setDebtToPay] = useState({});

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const { getMyDebts, debts } = useDebtsStore()
    const { getUsers, users } = useUserStore();
    const { fetch } = useGroupStore()

    const [listFilters, setListFilters] = useState({
        filterGroup: null,
        filterUser: null,
        filterLessThan: null,
        filterGraterThan: null,
    });

    useEffect(() => {
        fetchInitialData()
    }, []);

    const fetchInitialData = async () => {
        try {
            await getMyDebts();
            await fetch();
            await getUsers();

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
                    <h2>There was an error loading your debts</h2>
                </Grid>
            </Grid>
        </>);

    return (
        <Grid container spacing={2}>
            <Grid item md={12}>
                <DebtListFilter filters={listFilters} changeFilters={setListFilters} />
            </Grid>
            <Grid item md={12}>
            {
                isLoading ?
                    <Loading />
                    : hasError ?
                        errorView
                        :
                        <>
                            <DebtList debts={debts} users={users} handleOpenPaymentModal={handleOpenPaymentModal} filters={listFilters} />
                            <PaymentModal debt={debtToPay} open={openPaymentModal} onClose={handleClosePaymentModal} refreshDebts={fetchInitialData} />
                        </>
            }
            </Grid>
        </Grid>
    );
}

export default withAuth(DebtListView);