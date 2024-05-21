import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import cache from "@/app/services/cache";

export default function MembersList({debts, userToNames}) {

    const handlePayment = (debt) => {

    }

    return (
        <>
            <List>
                {debts.map((debt, index) => (
                    cache.get('Id') === `${debt.userFromId}` ? null :
                    <ListItem key={index} secondaryAction={
                        <IconButton edge="end" onClick={() => handlePayment(debt)}>
                            <PaymentsOutlinedIcon fontSize="medium" />
                        </IconButton>
                    }>
                        <ListItemText primary={`${userToNames[index]}`} />
                        <ListItemText primary=" $" />
                        <ListItemText primary={`${debt.amountDebt}`} />
                    </ListItem>
                ))}
            </List>
        </>
    );
}

