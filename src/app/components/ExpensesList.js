import { Grid, Typography } from "@mui/material";

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
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight="bold">Category</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight="bold">Amount</Typography>
            </Grid>
          </Grid>
          {expenses.map(expense => (
            <Grid container key={expense.id}>
              <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant="body1">{expense.category?.icon}</Typography>
                <Typography variant="body1">{expense.category?.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">${expense.amount}</Typography>
              </Grid>
            </Grid>
          ))}
        </>
      )}
    </>
  );
}
