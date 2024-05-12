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
import {getMembers, addMember, removeMember} from "@/app/services/groups";
import {fetchUsers} from "@/app/services/users";

export default function GroupModal({ group, open, onClose }) {
  const [members, setMembers] = useState([]);
  const [newMemberId, setNewMemberId] = useState("");

  const [users, setUsers] = useState([]);
  const [usersFetched, setUsersFetched] = useState(false);

  useEffect(() => {
    if (open && group) handleFetchMembers();
    if (!usersFetched) handleFetchUsers();
  }, [open, group]);

  const handleFetchMembers = async () => {
    setMembers(await getMembers(group.id));
  };
  const handleFetchUsers = async () => {
    const fetchUsersResponse = await fetchUsers().then(response => {
      response.map(userData => {
        console.log({name: `${userData.first_name} ${userData.last_name}`});
        setUsers([...users, `${userData.id} - ${userData.first_name} ${userData.last_name}`]);
      });
      console.log(response);
      console.log(users);
    });

    setUsersFetched(true);
  }

  const handleRemoveMember = async (memberEmail) => {
    await removeMember({
      id: group.id,
      email: memberEmail
    });
    handleFetchMembers();
  };

  const handleAddMember = async () => {
    if (newMemberId) {
      await addMember({
        id: group.id,
        email: newMemberId
      });
      setNewMemberId("");
      handleFetchMembers();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Grupo {group?.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Details of group {group?.name}
        </DialogContentText>
        <List>
          {members.map(member => (
            <ListItem key={member.id} secondaryAction={
              <IconButton edge="end" onClick={() => handleRemoveMember(member.email)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={member.first_name + ' ' + member.last_name} />
            </ListItem>
          ))}
        </List>

        <Autocomplete
            style={{ width: '300px' }}
            id="free-solo-demo"
            freeSolo
            options={[users.map(user => user)]}
            renderInput={(params) => <TextField {...params} label="freeSolo" />}
        />

        {/*<TextField*/}
        {/*  label="New member email"*/}
        {/*  type="email"*/}
        {/*  fullWidth*/}
        {/*  value={newMemberEmail}*/}
        {/*  onChange={(e) => setNewMemberEmail(e.target.value)}*/}
        {/*  variant="outlined"*/}
        {/*  margin="normal"*/}
        {/*/>*/}
        <Button onClick={handleAddMember} variant="contained" color="primary" style={{ marginTop: '2%' }}>Add member</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
