import {
    Box,
    Card,
    Grid,
    List,
    ListItem,
    ListItemText,
    Skeleton,
    Tab,
    Tabs,
    Typography
} from "@mui/material";



export default function Loading() {
    const expenses = Array.from({ length: 5 });

    return (
        <Grid container alignItems="start" justifyContent="center" style={{ display: 'flex', justifyContent: 'center', marginTop: 20, padding: 20 }}>
            <Grid item style={{width: '100%'}}>
                <Skeleton variant="text" width={100} height={30} />

                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Tabs value={0}>
                        <Tab sx={{ display: 'flex', alignItems: 'start' }} label={<Skeleton variant="text" width={80} height={25} />} />
                        <Tab sx={{ display: 'flex', alignItems: 'start' }} label={<Skeleton variant="text" width={80} height={25} />} />
                        <Tab sx={{ display: 'flex', alignItems: 'start' }} label={<Skeleton variant="text" width={80} height={25} />} />
                    </Tabs>
                </Box>

                <Box sx={{ p: 3 }}>
                    <Card variant="outlined" sx={{p: 2}}>
                        <Skeleton variant="rectangular" width="100%" height={40} />

                        <List>
                            <Grid container spacing={1} sx={{ marginTop: 1 }}>
                                {expenses.map((v, index) => (
                                    <Grid item key={index} md={2} >
                                        <Typography variant="subtitle1">
                                            <Skeleton variant="text" />
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                            {expenses.map((v, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={<Skeleton variant="text" />} />
                                </ListItem>
                            ))}
                        </List>
                    </Card>
                </Box>

            </Grid>
        </Grid>
    );
}