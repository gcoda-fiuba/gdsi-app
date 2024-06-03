'use client'

import React, {useEffect, useState} from 'react';
import {Box, Grid, Paper, Typography, List, ListItem, ListItemText, Button, Card} from '@mui/material';
import useNotificationStore from "@/app/store/notification";
import useDebtsStore from "@/app/store/debts";

const Dashboard = () => {
    const [notifications, setNotifications] = useState([]);

    const { getNotifications } = useNotificationStore();
    const { getMyDebts, debts } = useDebtsStore();

    useEffect(() => {
        async function load() {
            setNotifications(await getNotifications());
            await getMyDebts();
        }
        load();
    }, []);

    return (
        <Box sx={{ flexGrow: 1, padding: 2, minHeight: '100vh' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={8}>
                    <Card sx={{ padding: 2, marginBottom: 2 }}>
                        <Typography variant="h6">Latest activities</Typography>
                        <List>
                            {notifications.slice().reverse().slice(0,5).map((notification) => (
                                <ListItem>
                                    <ListItemText
                                        primary={new Date(notification.createdAt).toLocaleString()}
                                        secondary={notification.message}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Card>

                    <Card>
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
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ padding: 2, marginBottom: 2 }}>
                        <Typography variant="h6">Debts</Typography>
                        <List>
                            {debts.slice().reverse().slice(0,5).map((debt) => (
                                <ListItem>
                                    <ListItemText
                                        primary={debt.userToId}
                                        secondary={debt.amount - debt.amountPaid}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Card>

                    <Paper sx={{ padding: 2, marginBottom: 2 }}>
                        <Typography variant="h6">Some information and quick access to reports</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
