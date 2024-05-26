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
    const { addBill } = useGroupStore();
    const { showSnackbar } = useSnackbar();
  
    const [newExpense, setNewExpense] = useState({ bill_amount: 0, category_id: 0 });
    const [divisionMode, setDivisionMode] = useState("");
  
    const handleAddExpense = async () => {
        const params = {
          ...newExpense,
          group_id: groupId,
          mode: divisionMode,
        };
    
        if (parseInt(params.bill_amount) <= 0) {
          showSnackbar('The amount must be greater than 0', 'error');
          return;
        }
        if (parseInt(params.category_id) <= 0) {
          showSnackbar('You must choose a category', 'error');
          return;
        }
        if (params.mode === "") {
          showSnackbar('You must choose a division mode', 'error');
          return;
        }
    
        try {
          await addBill(params);
          setNewExpense({ bill_amount: 0, category_id: 0 })
          await refreshBills();
          showSnackbar('The expense was added successfully', 'success');
        } catch (error) {
          showSnackbar('Hubo un error', 'error');
        }
      };

  return (
    <Accordion sx={{ marginTop: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="add-expense-content"
        id="add-expense-header"
      >
        <DialogContentText>Add Expense</DialogContentText>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <TextField
            label="Amount"
            value={newExpense.bill_amount}
            onChange={(e) => setNewExpense({ ...newExpense, bill_amount: e.target.value })}
            type="number"
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={newExpense.category_id}
              onChange={(e) => setNewExpense({ ...newExpense, category_id: e.target.value })}
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
          <Button onClick={handleAddExpense} variant="outlined" color="secondary" fullWidth>
            Add Expense
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}