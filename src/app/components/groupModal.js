'use client'

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
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl, Backdrop, CircularProgress
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import { getMembers, addMember, removeMember, getBills, getCategories, addBill } from "@/app/services/groups";
import { getUsers } from "@/app/services/user";
import { useSnackbar } from "@/app/context/SnackbarContext";

export default function GroupModal({ group, open, onClose }) {

  const { showSnackbar } = useSnackbar();

  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [bills, setBills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newBill, setNewBill] = useState({ bill_amount: 0, category_id: 0 });
  const [divisionMode, setDivisionMode] = useState([""]);

  useEffect(() => {
    if (open && group) {
      handleFetchUsers();
      handleFetchMembers();
      handleFetchBills();
      handleFetchCategories();
    }
    setLoading(false)
  }, [open, group]);

  const handleFetchUsers = async () => {
    setUsers(await getUsers());
  };

  const handleFetchMembers = async () => {
    setMembers(await getMembers(group.id));
  };

  const handleFetchBills = async () => {
    setBills(await getBills(group.id));
  };

  const handleFetchCategories = async () => {
    setCategories(await getCategories());
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

  const handleAddExpense = async () => {
    const params = {
      ...newBill,
      group_id: group.id,
      mode: divisionMode
    }

    if(parseInt(params.bill_amount) <= 0){
      showSnackbar('The amount must be greater than 0', 'error');
      return
    }
    if (parseInt(params.category_id) <= 0) {
      showSnackbar('You must choose a category', 'error');
      return
    }
    if (params.mode === ""){
      showSnackbar('You must choose a division mode', 'error');
      return
    }

    try {
      const response = await addBill(params)
      handleFetchBills();
      showSnackbar('The bill was added successfully', 'success');
    }catch(error){
      showSnackbar(error.response.data.message, 'error');
    }
  };

  return (
      <Dialog open={open} onClose={onClose}>
      <DialogTitle>Group: {group?.name}</DialogTitle>
      {!loading && (
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
            Bills
          </DialogContentText>
          {bills.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              No bills have been added yet.
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
              {bills.map(expense => (
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
            <Accordion sx={{ marginTop: 2 }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="add-expense-content"
                id="add-expense-header"
            >
              <DialogContentText>Add bill</DialogContentText>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <TextField
                    label="Amount"
                    value={newBill.bill_amount}
                    onChange={(e) => setNewBill({ ...newBill, bill_amount: e.target.value })}
                    type="number"
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Category</InputLabel>
                  <Select
                      value={newBill.category_id}
                      onChange={(e) => setNewBill({ ...newBill, category_id: e.target.value })}
                  >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>{category.icon + ' ' + category.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <InputLabel>Division Mode</InputLabel>
                  <Select
                      value={divisionMode}
                      onChange={(e) => setDivisionMode(e.target.value)}
                  >
                    <MenuItem value="equitative">Equitative</MenuItem>
                    {/*<MenuItem value="percentage">Percentage</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>*/}
                  </Select>
                </FormControl>
                <Button onClick={handleAddExpense} variant="contained" color="primary" fullWidth>
                  Add Expense
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        </DialogContent>
        )}
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}