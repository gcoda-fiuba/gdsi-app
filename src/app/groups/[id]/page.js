'use client';

import {Card, Grid} from "@mui/material";
import { useEffect, useState } from 'react';
import MembersList from '@/app/components/membersList';
import AddMemberSection from '@/app/components/addMemberSection';
import ExpensesList from '@/app/components/expensesList';
import AddExpenseSection from '@/app/components/addExpenseSection';
import DebtList from '@/app/components/debtList';
import useGroupStore from "@/app/store/groups";
import useUserStore from "@/app/store/user";
import Loading from "@/app/groups/loading";
import Divider from "@mui/material/Divider";
import PaymentModal from "@/app/components/paymentModal";

export default function GroupView({ params: {id} }) {

    const groupId = id;

    const {
        getGroupById,
        getMembers,
        getBills,
        getCategories,
        current,
        members,
        expenses,
        categories
    } = useGroupStore();

    const { getUsers, users } = useUserStore();

    const [loading, setLoading] = useState(true);
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
                getGroupById(groupId),
                getUsers(),
                getMembers(groupId),
                getBills(groupId),
                getCategories(),
            ]);
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false);
        }
    };

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
                <Grid container alignItems="start" justifyContent="center" style={{ height: '100vh', marginTop: 20 }}>
                    <Grid item style={{ width: '100vh' }}>
                        <h2>{current.name}</h2>
                        <Card variant="outlined" sx={{p: 4}}>
                            <h3>Activities: </h3>

                            <Grid item>
                                <ExpensesList expenses={expenses}/>
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
                </Grid>
    );
}
