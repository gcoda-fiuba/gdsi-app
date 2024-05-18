import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import useGroupStore from "@/app/store/groups";
import { useSnackbar } from "@/app/context/SnackbarContext";


export default function MembersList({ members, groupId, refreshMembers }) {
    const { removeMember } = useGroupStore();
    const { showSnackbar } = useSnackbar();
  
    const handleRemoveMember = async (memberEmail) => {
      try {
        await removeMember({ id: groupId, email: memberEmail });
        await refreshMembers();
        showSnackbar('Member removed successfully', 'success');
      } catch (error) {
        showSnackbar('Failed to remove member', 'error');
      }
    };

  return (
    <>
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
    </>
  );
}

