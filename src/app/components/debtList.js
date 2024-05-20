import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';


export default function MembersList({ debts }) {

    const handlePayment = () => {}

    const getUserById = (id) => {
        return 'Nombre y apellido';
    }

    return (
        <>
            <List>
                {debts.map(userIOwe => (
                    <ListItem key={userIOwe.id} secondaryAction={
                        <IconButton edge="end" onClick={handlePayment}>
                            <PaymentsOutlinedIcon fontSize="medium" />
                        </IconButton>
                    }>
                        <ListItemText primary={`${getUserById(userIOwe.id)}`} />
                        <ListItemText primary={`$${userIOwe.amountDebt}`} />
                    </ListItem>
                ))}
            </List>
        </>
    );
}

