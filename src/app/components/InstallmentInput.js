import React, { useState } from 'react';
import { Box, TextField, FormControlLabel, Checkbox } from '@mui/material';

export default function InstallmentInput({ onInstallmentsChange }) {
  const [isInstallment, setIsInstallment] = useState(false);
  const [installmentCount, setInstallmentCount] = useState(1);

  const handleInstallmentToggle = (event) => {
    const checked = event.target.checked;
    setIsInstallment(checked);
    if (!checked) {
      setInstallmentCount(1);
    }
    onInstallmentsChange(checked, installmentCount);
  };

  const handleInstallmentCountChange = (event) => {
    const value = event.target.value;
    setInstallmentCount(value);
    onInstallmentsChange(isInstallment, value);
  };

  return (
    <Box>
      <FormControlLabel
        control={<Checkbox checked={isInstallment} onChange={handleInstallmentToggle} />}
        label="Pay in Installments"
      />
      {isInstallment && (
        <TextField
          label="Number of Installments"
          value={installmentCount}
          onChange={handleInstallmentCountChange}
          type="number"
          fullWidth
          margin="normal"
        />
      )}
    </Box>
  );
}
