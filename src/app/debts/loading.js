import {Box, Card, IconButton, List, ListItem, ListItemText, Skeleton} from "@mui/material";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

export default function Loading() {
    const debts = Array.from({ length: 5 });
    return (
        <List>
            <Card variant="outlined" style={{ margin: '2%' }}>
                {debts.map((v, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'spaceAround' }}>
                        <ListItem key={index} secondaryAction={
                            <IconButton edge="end">
                                <PaymentsOutlinedIcon fontSize="medium" />
                            </IconButton>
                        }>
                            <ListItemText primary={<Skeleton variant="text" width={100} />} />
                            <ListItemText primary={<Skeleton variant="text" width={30} />} />
                        </ListItem>
                    </Box>
                ))}
            </Card>
        </List>
    );
}