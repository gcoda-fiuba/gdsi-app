'use client';

import {Card, Grid} from "@mui/material";
import DebtList from "@/app/components/debtList";
import PaymentModal from "@/app/components/PaymentModal";

import {useEffect, useState} from "react";
import useGroupStore from "@/app/store/groups";
import Loading from "@/app/debts/loading";
import useUserStore from "@/app/store/user";

export default function Debt() {
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [debtToPay, setDebtToPay] = useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { getDebts, debts, getMembers, members, fetch, groups } = useGroupStore();
    const { getUsers, users } = useUserStore();

    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        fetchInitialData()
    }, [groups]);

    const getGroupsData = async () => {
        groups.map(async group => await Promise.all([getDebts(group.id),getMembers(group.id)]));
    }

    const fetchInitialData = async () => {
        try {
            if (!initialized) {
                await fetch();
                await getUsers();
                setInitialized(true);
            }
            if (groups !== null) {
                await getGroupsData();
                setLoading(false);
            }
        } catch (error) {
            setError(true)
        } finally {
            if (groups !== null && debts !== null) {
                console.log('DEBTS', debts)
                setLoading(false)
            }
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

    return ((loading || debts)? <Loading /> : error ? errorView :
        <Card variant="outlined" sx={{p: 4}}>
            <h3>Debts: </h3>
            <Grid item>
                <h2>My debts:</h2>
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