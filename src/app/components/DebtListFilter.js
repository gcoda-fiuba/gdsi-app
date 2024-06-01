import {Accordion, Button, Grid, TextField} from "@mui/material";

export default function DebtListFilter({changeFilters}) {
    const handleGroupChange = (event) => {
        if (event.target.value === '') {
            changeFilters({group: null});
        } else {
            changeFilters({group: event.target.value});
        }
    }
    const handleLessThanChange = (event) => {
        if (event.target.value === '') {
            changeFilters({lessThan: null});
        } else {
            changeFilters({lessThan: event.target.value});
        }
    }
    const handleGraterThanChange = (event) => {
        if (event.target.value === '') {
            changeFilters({graterThan: null});
        } else {
            changeFilters({graterThan: event.target.value});
        }
    }
    const handleUserChange = (event) => {
        if (event.target.value === '') {
            changeFilters({user: null});
        } else {
            changeFilters({user: event.target.value});
        }
    }
    return (
        <Grid continer spacing={1} sx={{ padding: '2%' }}>
            <Grid item md={12}>
                <TextField type="text" variant="outlined" label="Group" onChange={handleGroupChange} sx={{ marginRight: '2%' }} />

                <TextField type="number" variant="outlined" label="Less than" onChange={handleLessThanChange} sx={{ marginRight: '2%' }} />

                <TextField type="number" variant="outlined" label="Grater than" onChange={handleGraterThanChange} sx={{ marginRight: '2%' }} />

                <TextField type="text" variant="outlined" label="User" onChange={handleUserChange} sx={{ marginRight: '2%' }} />
            </Grid>
        </Grid>
    );
}