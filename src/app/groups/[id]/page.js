'use client';

import {Box, Card, Grid, Tab, Tabs, Typography} from "@mui/material";
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
import {embedDashboard} from "@preset-sdk/embedded";
import cache from "@/app/services/cache";

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
        getReportsDashboardToken,
        reportsDashboardToken,
    } = useGroupStore();

    const { getUsers, users } = useUserStore();

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
                getReportsDashboardToken(),
            ]);
        } catch (error) {
            setHasError(true)
        } finally {
            setIsLoading(false);
        }
    };

    const errorView =
        (<>
            <Grid container alignItems="center" justifyContent="center" style={{ marginTop: 20 }}>
                <Grid item>
                    <h2>There was an error loading this group</h2>
                </Grid>
            </Grid>
        </>);

    embedDashboard({
        id: "c0f8a3e9-c671-4ac3-9570-c8083e9c803e", // from the Embedded dialog
        supersetDomain: "https://4e8cd7f4.us1a.app.preset.io", // from the Embedded dialog
        mountPoint: document.getElementById("reports-dashboard-box"), // any HTML element that can contain an iframe
        fetchGuestToken: () => reportsDashboardToken, // function responsible to return a guest_token
        dashboardUiConfig: {
            // reports UI config: hideTitle, hideChartControls, filters.expanded (optional)
            hideTitle: true, // change it to `true` to hide the reports title
            hideChartControls: true, // change it to `true` to hide the chart controls (ellipses menu)
            filters: {
                expanded: false, // change it to `false` so that reports filters are collapsed (for vertical filter bar only)
            },
            urlParams: { // URL parameters to be used with the ``{{url_param()}}`` Jinja macro
                user_id: cache.get('Id'),
            }, // reports UI configuration. Options: hideTitle, hideChartControls, filters.expanded, urlParams (all optional)
        },
    });

    return (
        isLoading ? <Loading /> :
            hasError ? errorView :
            <Grid container alignItems="start" justifyContent="center" style={{ marginTop: 20 }}>
                <Grid item style={{width: '100vh'}}>
                    <h2>{current.name}</h2>

                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={tab} onChange={handleChangeTab} aria-label="basic tabs example">
                            <Tab label="Expenses" {...a11yProps(0)} />
                            <Tab label="Members" {...a11yProps(1)} />
                            <Tab label="Group reports" {...a11yProps(2)} />
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
                    <CustomTabPanel index={tab} value={2}>
                        <div id="reports-dashboard-box" style={{ width: '100vh', height: '100vh', overflow: 'hidden'}}></div>
                    </CustomTabPanel>
                </Grid>
            </Grid>
    );
}

export default withAuth(GroupView);