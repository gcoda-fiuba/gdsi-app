import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';


export default function MembersList({ members, groupId, refreshMembers }) {

    const handlePayment = () => {}

    return (
        <>
            <List>
                {members.map(member => (
                    <ListItem key={member.id} secondaryAction={
                        <IconButton edge="end" onClick={handlePayment}>
                            <PaymentsOutlinedIcon fontSize="medium" />
                        </IconButton>
                    }>
                        <ListItemText primary={`${member.first_name} ${member.last_name}`} />
                    </ListItem>
                ))}
            </List>
        </>
    );
}

