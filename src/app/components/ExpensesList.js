import {Grid, IconButton, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function ExpensesList({ expenses }) {
  return (
    <>
      {expenses.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          No expenses have been added yet.
        </Typography>
      ) : (
        <>
          <Grid container spacing={1} sx={{ marginTop: 1 }}>
            <Grid item md={2}>
              <Typography variant="subtitle1" fontWeight="bold">Category</Typography>
            </Grid>
            <Grid item md={2}>
              <Typography variant="subtitle1" fontWeight="bold" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                Amount
              </Typography>
            </Grid>
            <Grid item md={3}>
              <Typography variant="subtitle1" fontWeight="bold" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                Made by
              </Typography>
            </Grid>
            {/*<Grid item md={2}>*/}
            {/*  <Typography variant="subtitle1" fontWeight="bold">Paid off</Typography>*/}
            {/*</Grid>*/}
          </Grid>
          {expenses.map(expense => (
            <Grid container key={expense.id}>
              <Grid item md={2} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Typography variant="body1">{expense.category?.icon}</Typography>
                <Typography variant="body1">{expense.category?.name}</Typography>
              </Grid>
              <Grid item md={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1">${expense.amount}</Typography>
              </Grid>
              <Grid item md={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1">{expense.first_name + ' ' + expense.last_name}</Typography>
              </Grid>
              {/*<Grid item md={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>*/}
              {/*  <Typography variant="body1">emoji</Typography>*/}
              {/*</Grid>*/}
              {/*<Grid item md={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>*/}
              {/*  <IconButton><DeleteIcon /></IconButton>*/}
              {/*</Grid>*/}
            </Grid>
          ))}
        </>
      )}
    </>
  );
}
