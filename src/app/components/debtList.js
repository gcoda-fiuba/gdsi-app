import {List, ListItem, ListItemText, IconButton} from "@mui/material";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import cache from "@/app/services/cache";

export default function DebtList({debts, users, handleOpenPaymentModal}) {
    const findUserById = (userId) => {
        const result = users.find(user => user.id === userId)

        return result.first_name + ' ' + result.last_name
    }

    const handlePayment = (debtToPay) => {
        handleOpenPaymentModal({
            id: debtToPay.debtId,
            user: findUserById(debtToPay.userToId),
            amount: debtToPay.amountDebt
        });
    }

    return (
        <List>
            {debts.map((debtToPay, index) => (
                cache.get('Id') !== `${debtToPay.userToId}` &&
                    <ListItem style={{ gap: '2%' }} key={index} secondaryAction={
                        <IconButton edge="end" onClick={() => handlePayment(debtToPay)}>
                            <PaymentsOutlinedIcon fontSize="medium" />
                        </IconButton>
                    }>
                        <ListItemText primary={`${findUserById(debtToPay.userToId)}`} />
                        <ListItemText primary={`$${debtToPay.amountDebt}`} />
                    </ListItem>
            ))}
        </List>
    );
}

