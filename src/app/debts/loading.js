import {Box, Card, Grid, IconButton, List, ListItem, ListItemText, Skeleton, Typography} from "@mui/material";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

export default function Loading() {
    const debts = Array.from({ length: 5 });
    return (
        <section id='SECTION' style={{padding: '2%'}}>
            {/*HEADERS*/}
            <Grid container spacing={1} sx={{marginTop: 1}}>
                <Grid item md={3}>
                    <Typography variant="subtitle1" fontWeight="bold">Name</Typography>
                </Grid>
                <Grid item md={3}>
                    <Typography variant="subtitle1" fontWeight="bold">Group</Typography>
                </Grid>
                <Grid item md={2}>
                    <Typography variant="subtitle1" fontWeight="bold">Amount</Typography>
                </Grid>
                <Grid item md={2}></Grid>
            </Grid>
            {/*BODY*/}
            {debts.map((debt, index) => (
                <Grid container key={index} sx={{display: 'flex', alignItems: 'center'}}>
                    <Grid item md={3}>
                        <Typography variant="body1"><Skeleton width={50}/></Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography variant="body1"><Skeleton width={50}/></Typography>
                    </Grid>
                    <Grid item md={2}>
                        <Typography
                            variant="body1"><Skeleton width={35}/></Typography>
                    </Grid>
                    <Grid item md={2}>
                        <IconButton edge="end">
                            <PaymentsOutlinedIcon fontSize="medium"/>
                        </IconButton>
                    </Grid>
                </Grid>
            ))
            }
        </section>
    );
}