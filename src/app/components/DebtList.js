import {IconButton, Grid, Typography} from "@mui/material";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import cache from "@/app/services/cache";
import useGroupStore from "@/app/store/groups";

export default function DebtList({debts, users, handleOpenPaymentModal, filters}) {
    const {filterGroup, filterUser, filterLessThan, filterGraterThan} = filters;
    const { groups } = useGroupStore();

    const findUserById = (userId) => {
        const result = users.find(user => user.id === userId)
        return result.first_name + ' ' + result.last_name
    }

    const handlePayment = (debt) => {
        handleOpenPaymentModal({
            id: debt.id,
            user: findUserById(debt.userToId),
            amount: debt.amountDebt ? debt.amountDebt : (debt.amount - debt.amountPaid)
        });
    }

    const filterDebts = (debt) => {
        if (cache.get('Id') === debt.userToId) return false;
        if (debt.amount - debt.amountPaid === 0) return false;
        if (filterGroup && debt.groupId !== filterGroup) return false;
        if (filterUser && debt.userToId !== filterUser) return false;
        if (filterLessThan && debt.amount > filterLessThan) return false;
        return !(filterGraterThan && debt.amount < filterGraterThan);
    }

    return (
        debts.length === 0 ? <Typography variant="subtitle1" fontWeight="bold" sx={{margin: 1}}>You owe no one😎</Typography> :
        <section style={{ padding: '2%' }}>
            {/*HEADERS*/}
            <Grid container spacing={1} sx={{marginTop: 1, borderBottom: 1, borderColor: 'divider' }}>
                <Grid item md={3} sx={{ display: 'flex', alignItems: 'end'}}>
                    <Typography variant="subtitle1" fontWeight="bold">Name</Typography>
                </Grid>
                <Grid item md={2} sx={{ display: 'flex', alignItems: 'end'}}>
                    <Typography variant="subtitle1" fontWeight="bold">Group</Typography>
                </Grid>
                <Grid item md={3}>
                    <Typography variant="subtitle1" fontWeight="bold">Date</Typography>
                    <Typography variant="body1">yyyy-mm-dd</Typography>
                </Grid>
                <Grid item md={2} sx={{ display: 'flex', alignItems: 'end'}}>
                    <Typography variant="subtitle1" fontWeight="bold">Amount</Typography>
                </Grid>
                <Grid item md={2} sx={{ display: 'flex', alignItems: 'end'}}></Grid>
            </Grid>
            {/*BODY*/}
            {debts.map(debt => (
                filterDebts(debt) &&
                <Grid container key={debt.id} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Grid item md={3}>
                        <Typography variant="body1">{findUserById(debt.userToId)}</Typography>
                    </Grid>
                    <Grid item md={2}>
                        <Typography variant="body1">{groups.find(group => group.id === debt.groupId).name}</Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography variant="body1">{`${debt.createdAt.slice(0,9)}`}</Typography>
                    </Grid>
                    <Grid item md={2}>
                        <Typography variant="body1">{`$${debt.amountDebt ? debt.amountDebt : (debt.amount - debt.amountPaid)}`}</Typography>
                    </Grid>
                    <Grid item md={2}>
                        <IconButton edge="end" onClick={() => handlePayment(debt)}>
                            <PaymentsOutlinedIcon fontSize="medium"/>
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
        </section>
    );
}