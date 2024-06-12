'use client'

import React, {useEffect, useState} from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    Card,
    Skeleton,
    CircularProgress
} from '@mui/material';
import useNotificationStore from "@/app/store/notification";
import useDebtsStore from "@/app/store/debts";
import useUserStore from "@/app/store/user";
import useGroupStore from "@/app/store/groups";
import withAuth from "@/app/hoc/withAuth";
import { useRouter } from 'next/navigation';
import {embedDashboard} from "@preset-sdk/embedded";
import cache from "@/app/services/cache";

const Dashboard = () => {
    const router = useRouter();

    const [notifications, setNotifications] = useState([]);

    const { getNotifications } = useNotificationStore();
    const { getMyDebts, debts } = useDebtsStore();
    const {users, getUsers, getReportsDashboardTokenSlim, reportsDashboardTokenSlim } = useUserStore();

    const {favGroups, fetchFavorites} = useGroupStore();

    const [isFavGroupsLoading, setIsFavGroupsLoading] = useState(true);

    useEffect(() => {
        async function load() {
            setNotifications(await getNotifications());
            await getMyDebts();
            await getUsers();
            await fetchFavorites().then(() => setIsFavGroupsLoading(false))
            await getReportsDashboardTokenSlim();
        }
        load();
    }, [getMyDebts, getNotifications, getUsers]);

    embedDashboard({
        id: "a31da8a0-9cef-43c7-8515-85169511ade6", // from the Embedded dialog
        supersetDomain: "https://4e8cd7f4.us1a.app.preset.io", // from the Embedded dialog
        mountPoint: document.getElementById("reports-dashboard-box"), // any HTML element that can contain an iframe
        fetchGuestToken: () => reportsDashboardTokenSlim, // function responsible to return a guest_token
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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} width="full">
            <Grid container spacing={4} sx={{ flexGrow: 1, minHeight: '100vh', padding: 10 }}>

                <Grid item sx={{ padding: 2 }} xs={12} sm={4} md={4}>
                    <Card variant="outlined" sx={{ padding: 2 }}>
                        <Typography variant="h6">Favorites</Typography>
                        <List>
                            {
                                isFavGroupsLoading ?
                                    <Box>
                                        <ListItem>
                                            <Skeleton variant="rectangular" width={200} height={40} />
                                        </ListItem>
                                        <ListItem>
                                            <Skeleton variant="rectangular" width={200} height={40} />
                                        </ListItem>
                                        <ListItem>
                                            <Skeleton variant="rectangular" width={200} height={40} />
                                        </ListItem>
                                    </Box>
                                    :
                                    favGroups.length === 0 ? <ListItem><ListItemText primary="There are no favorite groups to show"/></ListItem> :
                                    favGroups.map((group) => (
                                    <ListItem key={group.id}>
                                        <Button variant="contained" onClick={() => router.replace(`/groups/${group.id}`)} fullWidth>
                                            <ListItemText primary={group.name} />
                                        </Button>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Card>
                </Grid>

                <Grid item sx={{ padding: 2 }} xs={12} sm={4} md={8}>
                    <div id="reports-dashboard-box" style={{ height: '100%', overflow: 'hidden' }}></div>
                </Grid>

                <Grid item sx={{ padding: 2 }} xs={12} sm={6} md={6}>
                    <Card variant="outlined" sx={{ padding: 2 }}>
                        <Typography variant="h6">Latest activities</Typography>
                        <List>
                            {notifications.length === 0 ? <ListItem><ListItemText primary="There are no notifications to show"/></ListItem> :
                                notifications.slice().reverse().slice(0,5).map((notification) => (
                                <ListItem key={notification.id}>
                                    <ListItemText
                                        primary={new Date(notification.createdAt).toLocaleString()}
                                        secondary={notification.message}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Card>
                </Grid>

                <Grid item sx={{ padding: 2 }} xs={12} sm={4} md={6}>
                    <Card variant="outlined" sx={{ padding: 2 }}>
                        <Typography variant="h6">Debts</Typography>
                        <List>
                            {debts.length === 0 ? <ListItem><ListItemText primary="There are no debts to show"/></ListItem> :
                                debts.slice().reverse().slice(0,6).map((debt) => (
                                (debt.amount - debt.amountPaid) !== 0 &&
                                <ListItem key={debt.id}>
                                    <ListItemText
                                        primary={
                                            users.find(user => user.id === debt.userToId)
                                                ? `${users.find(user => user.id === debt.userToId)?.first_name} ${users.find(user => user.id === debt.userToId)?.last_name}`
                                                : <Skeleton width={30} />
                                        }
                                        secondary={`$${debt.amount - debt.amountPaid}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Card>
                </Grid>

            </Grid>
        </Box>
    );
};

export default withAuth(Dashboard);