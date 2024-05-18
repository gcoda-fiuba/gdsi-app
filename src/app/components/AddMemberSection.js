import { Grid, Button, TextField, Autocomplete } from "@mui/material";
import { useState } from 'react';
import useGroupStore from "@/app/store/groups";
import { useSnackbar } from "@/app/context/SnackbarContext";


export default function AddMemberSection({ users, groupId, refreshMembers }) {
    const { addMember } = useGroupStore();
    const { showSnackbar } = useSnackbar();
  
    const [autocompleteValue, setAutocompleteValue] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
  
    const handleAddMember = async () => {
        if (selectedUser) {
          try {
            await addMember({ id: groupId, userId: selectedUser });
            setSelectedUser(null);
            setAutocompleteValue(null);
            await refreshMembers();
            showSnackbar('Member added successfully', 'success');
          } catch (error) {
            showSnackbar('Failed to add member', 'error');
          }
        }
      };

  return (
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
  );
}
