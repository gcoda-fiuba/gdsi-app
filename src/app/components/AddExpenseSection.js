
import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  DialogContentText
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useGroupStore from "@/app/store/groups";
import { useSnackbar } from "@/app/context/SnackbarContext";


export default function AddExpenseSection({ groupId, categories, refreshBills }) {
    const { addBill, getBills } = useGroupStore();
    const { showSnackbar } = useSnackbar();
  
    const [newBill, setNewBill] = useState({ billAmount: 0, categoryId: 0 });
    const [divisionMode, setDivisionMode] = useState("");
  
    const handleAddExpense = async () => {
        const params = {
          ...newBill,
          groupId: groupId,
          mode: divisionMode,
        };
    
        if (parseInt(params.billAmount) <= 0) {
          showSnackbar('The amount must be greater than 0', 'error');
          return;
        }
        if (parseInt(params.categoryId) <= 0) {
          showSnackbar('You must choose a category', 'error');
          return;
        }
        if (params.mode === "") {
          showSnackbar('You must choose a division mode', 'error');
          return;
        }
    
        try {
          await addBill(params);
          await refreshBills();
          showSnackbar('The bill was added successfully', 'success');
        } catch (error) {
          showSnackbar(error.response.data.message, 'error');
        }
      };

  return (
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
            value={newBill.billAmount}
            onChange={(e) => setNewBill({ ...newBill, billAmount: e.target.value })}
            type="number"
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={newBill.categoryId}
              onChange={(e) => setNewBill({ ...newBill, categoryId: e.target.value })}
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
            </Select>
          </FormControl>
          <Button onClick={handleAddExpense} variant="contained" color="primary" fullWidth>
            Add Expense
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}