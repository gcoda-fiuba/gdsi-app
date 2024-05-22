'use client';

import {Card, Grid} from "@mui/material";
import { useEffect, useState } from 'react';
import MembersList from '@/app/components/MembersList';
import AddMemberSection from '@/app/components/AddMemberSection';
import BillsList from '@/app/components/BillsList';
import AddExpenseSection from '@/app/components/AddExpenseSection';
import DebtList from '@/app/components/debtList';
import useGroupStore from "@/app/store/groups";
import useUserStore from "@/app/store/user";
import Loading from "@/app/groups/loading";
import Divider from "@mui/material/Divider";
import PaymentModal from "@/app/components/PaymentModal";

export default function GroupView({ params: {id} }) {

    const groupId = id;

    const {
        getMembers,
        getBills,
        getCategories,
        getDebts,
        members,
        bills,
        categories,
        debts
    } = useGroupStore();

    const { getUsers, users } = useUserStore();

    const [loading, setLoading] = useState(true);
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [debtToPay, setDebtToPay] = useState({});

    const [error, setError] = useState(false);

    useEffect(() => {
        if (groupId) {
            fetchInitialData();
        } else {
            setLoading(false);
        }
    }, [loading]);

    const fetchInitialData = async () => {
        try {
            await Promise.all([
                getUsers(),
                getMembers(groupId),
                getBills(groupId),
                getCategories(),
                getDebts(groupId)
            ]);

            // Provisorio hasta que arreglen el back
            /*debts.map((debt, index) => debt['debtId'] = index)

            debts.map(async debt => {
                await getUserById(debt.userToId).then(user => {
                    setUsersToNames(prevState => [...prevState, user.first_name + ' ' + user.last_name]);
                });
            });*/

        } catch (error) {
            setError(true)
        } finally {
            setLoading(false);
        }
    };

    const handleClosePaymentModal = () => {
        setOpenPaymentModal(false);
    }
    const handleOpenPaymentModal = (debt) => {
        setDebtToPay(debt);
        setOpenPaymentModal(true);
    }

    const errorView =
        (<>
            <Grid container alignItems="center" justifyContent="center" style={{height: '100vh'}}>
                <Grid item>
                    <h2>Hubo un error cargando este grupo</h2>
                </Grid>
            </Grid>
        </>);

    return (
        loading ? <Loading /> :
            error ? errorView :
                <Grid container alignItems="start" justifyContent="center" style={{ height: '100vh', gap: '2%' }}>
                    <Grid item>
                        <h2>My debts:</h2>
                        <Card variant="outlined" alignItems="start" justifyContent="center" sx={{p: 4}}>
                            <Grid item>
                                <DebtList debts={debts} users={users} handleOpenPaymentModal={handleOpenPaymentModal} />
                            </Grid>
                        </Card>
                    </Grid>

                    <Grid item>
                        <h2>GroupName</h2>
                        <Card variant="outlined" sx={{p: 4}}>
                            <h3>Activities: </h3>

                            <Grid item>
                                <BillsList bills={bills}/>
                            </Grid>
                            <Grid item>
                                <AddExpenseSection groupId={groupId} categories={categories} refreshBills={fetchInitialData}/>
                            </Grid>
                            <Divider  style={{ marginTop: '2%', marginBottom: '2%' }} />
                            <Grid item>
                                <AddMemberSection users={users} groupId={groupId} refreshMembers={fetchInitialData}/>
                            </Grid>
                            <Grid item>
                                <MembersList members={members} groupId={groupId} refreshMembers={fetchInitialData}/>
                            </Grid>
                        </Card>
                    </Grid>
                    <PaymentModal debt={debtToPay} open={openPaymentModal} onClose={handleClosePaymentModal} />
                </Grid>
    );
}
