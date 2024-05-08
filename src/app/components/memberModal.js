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
  TextField
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import {getMembers, addMember, removeMember} from "@/app/services/groups";

export default function GroupModal({ group, open, onClose }) {
  const [members, setMembers] = useState([]);
  const [newMemberEmail, setNewMemberEmail] = useState("");

  useEffect(() => {
    if (open && group) {
      handleFetchMembers();
    }
  }, [open, group]);

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
    if (newMemberEmail) {
      await addMember({
        id: group.id,
        email: newMemberEmail
      });
      setNewMemberEmail("");
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
        <TextField
          label="New member email"
          type="email"
          fullWidth
          value={newMemberEmail}
          onChange={(e) => setNewMemberEmail(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <Button onClick={handleAddMember} variant="contained" color="primary">Add member</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
