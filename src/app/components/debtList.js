import {List, ListItem, ListItemText, IconButton} from "@mui/material";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import cache from "@/app/services/cache";

export default function DebtList({debts, users, handleOpenPaymentModal}) {
    const findUserById = (userId) => {
        const result = users.find(user => user.id === userId)
        return result.first_name + ' ' + result.last_name
    }

    const handlePayment = (debt) => {
        handleOpenPaymentModal({
            id: debt.debtId,
            user: findUserById(debt.userToId),
            amount: debt.amountDebt ? debt.amountDebt : (debt.amount - debt.amountPaid)
        });
    }

    return (
        <List>
            {debts.map((debt, index) => (
                // cache.get('Id') !== `${debtToPay.userToId}` &&
                    <ListItem style={{ gap: '2%' }} key={index} secondaryAction={
                        <IconButton edge="end" onClick={() => handlePayment(debt)}>
                            <PaymentsOutlinedIcon fontSize="medium" />
                        </IconButton>
                    }>
                        <ListItemText primary={`${findUserById(debt.userToId)}`} />
                        <ListItemText primary={`$ ${debt.amountDebt ? debt.amountDebt : (debt.amount - debt.amountPaid)}`} />
                    </ListItem>
            ))}
        </List>
    );
}

