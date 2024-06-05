import {IconButton, Card, ListItem, List, ListItemText} from "@mui/material";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import cache from "@/app/services/cache";

export default function DebtList({debts, users, handleOpenPaymentModal, filters}) {
    const {filterGroup, filterUser, filterLessThan, filterGraterThan} = filters;

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
        <List>
            <Card variant="outlined" style={{margin: '2%'}}>
                {debts.map(debt => (
                    filterDebts(debt) &&
                            <ListItem key={debt.id} secondaryAction={
                                <IconButton edge="end" onClick={() => handlePayment(debt)}>
                                    <PaymentsOutlinedIcon fontSize="medium"/>
                                </IconButton>
                            }>
                                <ListItemText primary={`${findUserById(debt.userToId)}`}/>
                                <ListItemText
                                    primary={`$ ${debt.amountDebt ? debt.amountDebt : (debt.amount - debt.amountPaid)}`}/>
                            </ListItem>
                    ))
                }
            </Card>
        </List>
    );
}

