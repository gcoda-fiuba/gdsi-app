import {CircularProgress, Grid} from "@mui/material";

export default function Loading() {
    return (
        <Grid container style={{ justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Grid item>
                <CircularProgress />
            </Grid>
        </Grid>
    )
}