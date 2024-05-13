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
import {useSnackbar} from "@/app/context/SnackbarContext";

export default function GroupModal({ group, open, onClose }) {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const {showSnackbar} = useSnackbar();

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
      setUsers(response.map(user => user));
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
    const newUser = document.getElementById('auto-complete-users').value;
    setNewMember(newUser);

    const newUserId = parseInt(newMember.split(' ')[0]);
    const newUserEmail = users.find(user => user.id === newUserId)?.email
    console.log(`newUserId: ${newUserId}, newUserEmail: ${newUserEmail}, groupId: ${group.id}`);

    if (newUserId && newUserEmail !== undefined) {
      await addMember({
        groupId: group.id,
        email: newUserEmail,
        userId: newUserId
      }).then( () => {
        setNewMember("");
        handleFetchMembers();
        showSnackbar('Listo, nuevo miembrao agregado', 'success')
      }).catch( error => {
        console.log(error);
        showSnackbar(error.response.data.error, 'error')
      });
    } else {
      showSnackbar('Hubo un error agregando este usuario', 'error')
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
            id="auto-complete-users"
            freeSolo
            options={users.map(user => `${user.id} - ${user.first_name} ${user.last_name}`)}
            renderInput={(params) => <TextField {...params} label="Nombre y apellido" value={newMember} />}
        />

        <Button onClick={handleAddMember} variant="contained" color="primary" style={{ marginTop: '2%' }}>Add member</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
