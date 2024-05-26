import {IconButton, Card, Typography, ListItem, List, ListItemText} from "@mui/material";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import cache from "@/app/services/cache";

export default function DebtList({debts, users, handleOpenPaymentModal}) {
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

    return (
        <List>
            <Card variant="outlined" style={{ margin: '2%' }}>
            {debts.map(debt => (
                (cache.get('Id') !== `${debt.userToId}` && (debt.amount - debt.amountPaid) !== 0) &&
                        <ListItem key={debt.id} secondaryAction={
                            <IconButton edge="end" onClick={() => handlePayment(debt)}>
                                <PaymentsOutlinedIcon fontSize="medium" />
                            </IconButton>
                        }>
                            <ListItemText primary={`${findUserById(debt.userToId)}`} />
                            <ListItemText primary={`$ ${debt.amountDebt ? debt.amountDebt : (debt.amount - debt.amountPaid)}`} />
                        </ListItem>
            ))}
            </Card>
        </List>
    );
}

