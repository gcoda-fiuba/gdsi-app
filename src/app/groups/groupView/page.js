'use client';

import {Card, Typography, Grid} from "@mui/material";
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
    const { getMembers, getBills, getCategories } = useGroupStore();
    const { getUsers } = useUserStore();
    const searchParams = useSearchParams()

    // const [searchParams.get('id'), setGroupId] = useState();
    const [members, setMembers] = useState([]);
    const [users, setUsers] = useState([]);
    const [bills, setBills] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (searchParams.get('id')) {
            fetchInitialData();
        } else {
            console.log('Else')
            setLoading(false);
        }
    }, []);

    const fetchInitialData = async () => {
        try {
            const [usersData, membersData, billsData, categoriesData] = await Promise.all([
                getUsers(),
                getMembers(searchParams.get('id')),
                getBills(searchParams.get('id')),
                getCategories(),
            ]);
            setUsers(usersData);
            setMembers(membersData);
            setBills(billsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error("Failed to fetch initial data", error);
        } finally {
            setLoading(false);
        }
    };

    return (
            loading ? <Loading></Loading> :
                <Grid container alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
                    <Grid item>
                        <h2>GroupName</h2>
                        <Card variant="outlined" sx={{p: 4}}>

                            <h3>Activities: </h3>

                            <Grid item>
                                <MembersList members={members} groupId={searchParams.get('id')} refreshMembers={fetchInitialData}/>
                            </Grid>
                            <Grid item>
                                <AddMemberSection users={users} groupId={searchParams.get('id')} refreshMembers={fetchInitialData}/>
                            </Grid>
                            <Grid item>
                                <BillsList bills={bills}/>
                            </Grid>
                            <Grid item>
                                <AddExpenseSection groupId={searchParams.get('id')} categories={categories} refreshBills={fetchInitialData}/>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card variant="outlined" sx={{p: 4}}>
                            <h2>My debts:</h2>

                            <Grid item>
                                <DebtList members={members} groupId={searchParams.get('id')} refreshMembers={fetchInitialData}/>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
    );
}
