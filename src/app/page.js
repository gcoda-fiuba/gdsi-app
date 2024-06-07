'use client'

import React, {useEffect, useState} from 'react';
import {Box, Grid, Paper, Typography, List, ListItem, ListItemText, Button, Card, Skeleton} from '@mui/material';
import useNotificationStore from "@/app/store/notification";
import useDebtsStore from "@/app/store/debts";
import useUserStore from "@/app/store/user";
import withAuth from "@/app/hoc/withAuth";

const Dashboard = () => {
    const [notifications, setNotifications] = useState([]);

    const { getNotifications } = useNotificationStore();
    const { getMyDebts, debts } = useDebtsStore();
    const {users, getUsers } = useUserStore();

    useEffect(() => {
        async function load() {
            setNotifications(await getNotifications());
            await getMyDebts();
            await getUsers();
        }
        load();
    }, [getMyDebts, getNotifications, getUsers]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} width="full">
            <Grid container spacing={4} sx={{ flexGrow: 1, minHeight: '100vh', padding: 10 }}>

                <Grid item sx={{ padding: 2 }} xs={12} sm={4} md={4}>
                    <Card variant="outlined" sx={{ padding: 2 }}>
                        <Typography variant="h6">Favorites</Typography>
                        <List>
                            <ListItem>
                                <Button variant="contained" fullWidth>
                                    Group a
                                </Button>
                            </ListItem>
                            <ListItem>
                                <Button variant="contained" fullWidth>
                                    Group b
                                </Button>
                            </ListItem>
                            <ListItem>
                                <Button variant="contained" fullWidth>
                                    Group c
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>

                <Grid item sx={{ padding: 2 }} xs={12} sm={4} md={8}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="h6">Some information and quick access to reports</Typography>
                    </Paper>
                </Grid>

                <Grid item sx={{ padding: 2 }} xs={12} sm={6} md={6}>
                    <Card variant="outlined" sx={{ padding: 2 }}>
                        <Typography variant="h6">Latest activities</Typography>
                        <List>
                            {notifications.slice().reverse().slice(0,5).map((notification) => (
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
                            {debts.slice().reverse().slice(0,6).map((debt) => (
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