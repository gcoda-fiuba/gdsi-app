'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Grid,
  Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import { getMembers, addMember, removeMember, getExpenses } from "@/app/services/groups";
import { getUsers } from "@/app/services/user";
import {useSnackbar} from "@/app/context/SnackbarContext";

export default function GroupModal({ group, open, onClose }) {

  const { showSnackbar } = useSnackbar();

  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '' });

  useEffect(() => {
    if (open && group) {
      handleFetchUsers();
      handleFetchMembers();
      handleFetchExpenses();
    }
  }, [open, group]);

  const handleFetchUsers = async () => {
    setUsers(await getUsers());
  };

  const handleFetchMembers = async () => {
    setMembers(await getMembers(group.id));
  };

  const handleFetchExpenses = async () => {
    setExpenses(await getExpenses(group.id));
  };

  const handleRemoveMember = async (memberEmail) => {
    await removeMember({
      id: group.id,
      email: memberEmail
    });
    handleFetchMembers();
  };

  const handleAddMember = async () => {
    if (selectedUser) {
      await addMember({
        id: group.id,
        userId: selectedUser
      });
      setSelectedUser(null);
      setAutocompleteValue(null);
      handleFetchMembers();
    }
  };

  const handleAddExpense = () => {
    if(newExpense.amount <= 0){
      showSnackbar('El gasto debe ser mayor a $0', 'error');
    }

    if (newExpense.description && newExpense.amount) {
      const newExpensesList = [
        ...expenses,
        { ...newExpense, id: expenses.length + 1 }
      ];
      setExpenses(newExpensesList);
      setNewExpense({ description: '', amount: '' });
      showSnackbar('El gasto se agrego correctamente', 'success');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Group: {group?.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Members
        </DialogContentText>
        <List>
          {members.map(member => (
            <ListItem key={member.id} secondaryAction={
              <IconButton edge="end" onClick={() => handleRemoveMember(member.email)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={`${member.first_name} ${member.last_name}`} />
            </ListItem>
          ))}
        </List>

        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
          <Grid item xs={8}>
            <Autocomplete
              id="combo-box-users"
              options={users}
              getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
              onChange={(event, value) => {
                setSelectedUser(value ? value.id : null);
                setAutocompleteValue(value);
              }}
              value={autocompleteValue}
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  {option.first_name} {option.last_name}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="User"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password',
                  }}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Button onClick={handleAddMember} variant="contained" color="primary" fullWidth>Add member</Button>
          </Grid>
        </Grid>

        <DialogContentText>
          Expenses
        </DialogContentText>
        {expenses.length === 0 ? (
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
            No expenses have been added yet.
          </Typography>
        ) : (
          <List>
            {expenses.map(expense => (
              <ListItem key={expense.id}>
                <ListItemText primary={`${expense.description}: $${expense.amount}`} />
              </ListItem>
            ))}
          </List>
        )}

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="add-expense-content"
            id="add-expense-header"
          >
            <DialogContentText>Add New Expense</DialogContentText>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <TextField
                label="Description"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Amount"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                type="number"
                fullWidth
                margin="normal"
              />
              <Button onClick={handleAddExpense} variant="contained" color="primary" fullWidth>
                Add Expense
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
