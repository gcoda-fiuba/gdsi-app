'use client';

import {Box, Card, Grid, IconButton, Tab, Tabs, Typography} from "@mui/material";
import { useEffect, useState } from 'react';
import MembersList from '@/app/components/MembersList';
import AddMemberSection from '@/app/components/AddMemberSection';
import ExpensesList from '@/app/components/ExpensesList';
import AddExpenseSection from '@/app/components/AddExpenseSection';
import Loading from "@/app/groups/[id]/loading";
import useGroupStore from "@/app/store/groups";
import useUserStore from "@/app/store/user";
import PropTypes from "prop-types";
import withAuth from "@/app/hoc/withAuth";
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import {useSnackbar} from "@/app/context/SnackbarContext";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </Typography>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const fabExpenseStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};

const GroupView = ({ params: {id} }) => {

    const groupId = id;

    const {
        getGroupById,
        getMembers,
        getBills,
        getCategories,
        current,
        members,
        expenses,
        categories,
        fetchFavorites,
        favGroups,
        setFavorite
    } = useGroupStore();

    const { getUsers, users } = useUserStore();

    const { showSnackbar } = useSnackbar();

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const [tab, setTab] = useState(0);

    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        if (groupId) {
            fetchInitialData();
        } else {
            setIsLoading(false);
        }
    }, [isLoading]);

    const fetchInitialData = async () => {
        try {
            await Promise.all([
                getGroupById(groupId),
                getUsers(),
                getMembers(groupId),
                getBills(groupId),
                getCategories(),
                fetchFavorites(),
            ]);
        } catch (error) {
            setHasError(true)
        } finally {
            setIsLoading(false);
        }
    };

    const handleFavorite = async () => {
        try {
            await setFavorite(groupId).then(() => fetchFavorites());
        } catch (error) {
            showSnackbar('There was an error', 'error');
        }
    }

    const errorView =
        (<>
            <Grid container alignItems="center" justifyContent="center" style={{ marginTop: 20 }}>
                <Grid item>
                    <h2>There was an error loading this group</h2>
                </Grid>
            </Grid>
        </>);

    return (
        isLoading ? <Loading /> :
            hasError ? errorView :
            <Grid container alignItems="start" justifyContent="center" style={{ marginTop: 20 }}>
                <Grid item style={{width: '100vh'}}>
                    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <h2>{current.name}</h2>
                        <IconButton edge="end" onClick={handleFavorite}>
                            {favGroups.find(group => group.id === current.id ) ? <StarOutlinedIcon /> : <StarOutlineOutlinedIcon />}
                        </IconButton>
                    </Box>

                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={tab} onChange={handleChangeTab} aria-label="basic tabs example">
                            <Tab label="Expenses" {...a11yProps(0)} />
                            <Tab label="Members" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={tab} index={0}>
                        <Card variant="outlined" sx={{p: 2}}>
                            <Grid item>
                                <AddExpenseSection groupId={groupId} categories={categories} refreshBills={fetchInitialData} members={members}/>
                            </Grid>

                            <Grid item>
                                <ExpensesList expenses={expenses}/>
                            </Grid>
                        </Card>
                    </CustomTabPanel>
                    <CustomTabPanel value={tab} index={1}>
                        <Card variant="outlined" sx={{p: 2}}>
                            <Grid item>
                                <AddMemberSection users={users} groupId={groupId} refreshMembers={fetchInitialData}/>
                            </Grid>
                            <Grid item>
                                <MembersList members={members} groupId={groupId} refreshMembers={fetchInitialData}/>
                            </Grid>
                        </Card>
                    </CustomTabPanel>
                </Grid>
            </Grid>
    );
}

export default withAuth(GroupView);