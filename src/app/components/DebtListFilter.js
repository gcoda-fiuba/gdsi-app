import {Accordion, AccordionDetails, AccordionSummary, Grid, MenuItem, Select, TextField} from "@mui/material";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";

import useGroupStore from "@/app/store/groups";
import useUserStore from "@/app/store/user";

export default function DebtListFilter({filters, changeFilters}) {

    const { groups } = useGroupStore();
    const { users } = useUserStore()

    const handleGroupChange = (event) => {
        if (event.target.value === 'All groups') {
            changeFilters(prevFilters => {return {...prevFilters, filterGroup: null}});
        } else {
            changeFilters(prevFilters => {return {...prevFilters, filterGroup: event.target.value}});
        }
    }
    const handleUserChange = (event) => {
        if (event.target.value === 'All users') {
            changeFilters(prevFilters => {return {...prevFilters, filterUser: null}});
        } else {
            changeFilters(prevFilters => {return {...prevFilters, filterUser: event.target.value}});
        }
    }
    const handleLessThanChange = (event) => {
        if (event.target.value === '') {
            changeFilters(prevFilters => {return {...prevFilters, filterLessThan: null}});
        } else {
            changeFilters(prevFilters => {return {...prevFilters, filterLessThan: event.target.value}});
        }
    }
    const handleGreaterThanChange = (event) => {
        if (event.target.value === '') {
            changeFilters(prevFilters => {return {...prevFilters, filterGreaterThan: null}});
        } else {
            changeFilters(prevFilters => {return {...prevFilters, filterGreaterThan: event.target.value}});
        }
    }

    return (
        <Accordion disableGutters={true}>
            <AccordionSummary
                expandIcon={<FilterListOutlinedIcon />}
                aria-controls="filters-panel-content"
                id="filters-panel-header"
            >Filter out your debts</AccordionSummary>
            <AccordionDetails>
                <Grid continer spacing={1}>
                    <Grid item md={12}>
                        <Select
                            value={filters.filterGroup ? filters.filterGroup : 'All groups'}
                            onChange={handleGroupChange}
                            sx={{ marginRight: '2%' }}
                        >
                            <MenuItem value='All groups'>All groups</MenuItem>
                            {groups.map((group) => (
                                <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
                            ))}
                        </Select>

                        <Select
                            value={filters.filterUser ? filters.filterUser : 'All users'}
                            onChange={handleUserChange}
                            sx={{ marginRight: '2%' }}
                        >
                            <MenuItem value='All users'>All users</MenuItem>
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>{user.first_name + ' ' + user.last_name}</MenuItem>
                            ))}
                        </Select>

                        <TextField type="number" variant="outlined" label="Less than" onChange={handleLessThanChange} sx={{ marginRight: '2%' }} />

                        <TextField type="number" variant="outlined" label="Greater than" onChange={handleGreaterThanChange} sx={{ marginRight: '2%' }} />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}