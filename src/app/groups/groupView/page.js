'use client';

import {Card, Typography, Grid, Button} from "@mui/material";
import { useEffect, useState } from 'react';
import MembersList from '@/app/components/MembersList';
import AddMemberSection from '@/app/components/AddMemberSection';
import BillsList from '@/app/components/BillsList';
import AddExpenseSection from '@/app/components/AddExpenseSection';
import DebtList from '@/app/components/DebtList';
import useGroupStore from "@/app/store/groups";
import useUserStore from "@/app/store/user";
import {useSearchParams} from "next/navigation";
import Loading from "@/app/groups/loading";

export default function GroupView() {
    const { getMembers, getBills, getCategories, getDebts } = useGroupStore();
    const { getUsers } = useUserStore();
    const searchParams = useSearchParams()
    const groupId = Number(searchParams.get('id'));

    const [members, setMembers] = useState([]);
    const [users, setUsers] = useState([]);
    const [bills, setBills] = useState([]);
    const [categories, setCategories] = useState([]);
    const [debts, setDebts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {

        if (groupId) {
            fetchInitialData();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchInitialData = async () => {
        try {
            const [usersData, membersData, billsData, categoriesData, debtsData] = await Promise.all([
                getUsers(),
                getMembers(groupId),
                getBills(groupId),
                getCategories(),
                getDebts(groupId),
            ]);
            setUsers(usersData);
            setMembers(membersData);
            setBills(billsData);
            setCategories(categoriesData);
            setDebts(debtsData);
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false);
        }
    };

    const errorView =
        <>
            <Grid container alignItems="center" justifyContent="center" style={{height: '100vh'}}>
                <Grid item>
                    <h2>Hubo un error cargando este grupo</h2>
                </Grid>
            </Grid>
        </>
    ;
    return (
            loading ? <Loading /> :
                error ? errorView :
                <Grid container alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
                    <Grid item>
                        <h2>GroupName</h2>
                        <Card variant="outlined" sx={{p: 4}}>

                            <h3>Activities: </h3>

                            <Grid item>
                                <MembersList members={members} groupId={groupId} refreshMembers={fetchInitialData}/>
                            </Grid>
                            <Grid item>
                                <AddMemberSection users={users} groupId={groupId} refreshMembers={fetchInitialData}/>
                            </Grid>
                            <Grid item>
                                <BillsList bills={bills}/>
                            </Grid>
                            <Grid item>
                                <AddExpenseSection groupId={groupId} categories={categories} refreshBills={fetchInitialData}/>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card variant="outlined" sx={{p: 4}}>
                            <h2>My debts:</h2>

                            <Grid item>
                                <DebtList debts={debts} />
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
    );
}
