import {
    Box,
    Button,
    Paper,
    Skeleton,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

export default function Loading() {

    const headers = ['ID', 'Nombre'];
    const groups = Array.from({ length: 5 });

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
            <Button variant="outlined" color="secondary" style={{margin: '2%'}}>
                Create Group
            </Button>

            <TableContainer component={Paper} sx={{ maxWidth: 800, mt: 2, mb: 2 }}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table" className="MuiTable-root">

                    <TableHead>
                        <TableRow>
                            {headers.map((header) => <TableCell key={header}>{header}</TableCell>)}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {groups.map((g, index) =>
                            <TableRow key={index} hover sx={{ cursor: 'pointer' }}>
                                <TableCell component="th" scope="row" width="150">
                                    <Skeleton variant="text" width={20}/>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Skeleton variant="text" width={50} />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </TableContainer>
        </Box>
    );
}