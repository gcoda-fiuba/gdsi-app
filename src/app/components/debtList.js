import {List, ListItem, ListItemText, IconButton, Grid} from "@mui/material";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import cache from "@/app/services/cache";

export default function MembersList({debts, userToNames, handleOpenPaymentModal}) {

    const handlePayment = (debtToPay) => {
        handleOpenPaymentModal({debtId: debtToPay.debtId, userToId: debtToPay.userToId, amountDebt: debtToPay.amountDebt});
    }

    return (
        <>
            <List>
                {debts.map((debtToPay, index) => (
                    cache.get('Id') === `${debtToPay.userFromId}` ? null :
                        <ListItem style={{ gap: '2%' }} key={index} secondaryAction={
                            <IconButton edge="end" onClick={() => handlePayment(debtToPay)}>
                                <PaymentsOutlinedIcon fontSize="medium" />
                            </IconButton>
                        }>
                            <ListItemText primary={`${userToNames[index]}`} />
                            <ListItemText primary={`$${debtToPay.amountDebt}`} />
                        </ListItem>
                ))}
            </List>
        </>
    );
}

