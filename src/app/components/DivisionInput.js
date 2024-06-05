import React from 'react';
import { TextField, Typography, Box } from "@mui/material";

const DivisionInput = ({ members, divisionMode, values, handleValueChange }) => {
  return (
    <Box>
      {(divisionMode === "percentage" || divisionMode === "fixed") && members.map(member => (
        <Box key={member.id} display="flex" alignItems="center" marginBottom={2}>
          <Typography variant="body1" marginRight={2}>
            {member.first_name} {member.last_name} ({divisionMode === "percentage" ? "%" : "amount"})
          </Typography>
          <TextField
            value={values[member.id] || ''}
            onChange={(e) => handleValueChange(member.id, e.target.value)}
            type="number"
            fullWidth
          />
        </Box>
      ))}
    </Box>
  );
};

export default DivisionInput;
