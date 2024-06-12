import React, { useState } from 'react';
import { TextField, Box, Checkbox, FormControlLabel, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

export default function RecurrenceInput({ onRecurrenceChange }) {
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceFrequency, setRecurrenceFrequency] = useState('daily');
  const [recurrenceCount, setRecurrenceCount] = useState(1);

  const handleRecurrenceToggle = (event) => {
    const checked = event.target.checked;
    setIsRecurring(checked);
    if (!checked) {
      setRecurrenceFrequency('daily');
      setRecurrenceCount(1);
    }
    onRecurrenceChange(checked, recurrenceFrequency, recurrenceCount);
  };

  const handleRecurrenceFrequencyChange = (event) => {
    const value = event.target.value;
    setRecurrenceFrequency(value);
    onRecurrenceChange(isRecurring, value, recurrenceCount);
  };

  const handleRecurrenceCountChange = (event) => {
    const value = event.target.value;
    setRecurrenceCount(value);
    onRecurrenceChange(isRecurring, recurrenceFrequency, value);
  };

  return (
    <Box>
      <FormControlLabel
        control={<Checkbox checked={isRecurring} onChange={handleRecurrenceToggle} />}
        label="Recurring Expense"
      />
      {isRecurring && (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel>Frequency</InputLabel>
            <Select
              value={recurrenceFrequency}
              onChange={handleRecurrenceFrequencyChange}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Number of Recurrences"
            value={recurrenceCount}
            onChange={handleRecurrenceCountChange}
            type="number"
            fullWidth
            margin="normal"
          />
        </>
      )}
    </Box>
  );
}
