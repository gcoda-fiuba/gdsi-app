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
  Autocomplete
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { getMembers, addMember, removeMember } from "@/app/services/groups";
import { getUsers } from "@/app/services/user";

export default function GroupModal({ group, open, onClose }) {
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [autocompleteValue, setAutocompleteValue] = useState(null);

  useEffect(() => {
    if (open && group) {
      handleFetchUsers();
      handleFetchMembers();
    }
  }, [open, group]);

  const handleFetchUsers = async () => {
    setUsers(await getUsers());
  };

  const handleFetchMembers = async () => {
    setMembers(await getMembers(group.id));
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

        <Autocomplete
          id="combo-box-users"
          options={users}
          getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
          onChange={(event, value) => {
            setSelectedUser(value ? value.id : null);
            setAutocompleteValue(value);
          }}
          value={autocompleteValue}
          sx={{ width: 250, marginBottom: 2 }}
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
            />
          )}
        />

        <Button onClick={handleAddMember} variant="contained" color="primary">Add member</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
