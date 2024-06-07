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
  DialogContentText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useGroupStore from "@/app/store/groups";
import { useSnackbar } from "@/app/context/SnackbarContext";
import EmojiPicker from 'emoji-picker-react';
import Divider from "@mui/material/Divider";
import DivisionInput from './DivisionInput';


export default function AddExpenseSection({ groupId, categories, refreshBills, members }) {
    const { addBill } = useGroupStore();
    const { addCustomCategory } = useGroupStore();
    const { showSnackbar } = useSnackbar();
  
    const [newExpense, setNewExpense] = useState({ bill_amount: 0, category_id: 0, custom_category: '' });
    const [divisionMode, setDivisionMode] = useState("");
    const [percentages, setPercentages] = useState({});
    const [amounts, setAmounts] = useState({});

    const [isCustomCategoryOpen, setIsCustomCategoryOpen] = useState(false);
    const [customCategoryName, setCustomCategoryName] = useState('');
    const [customCategoryEmoji, setCustomCategoryEmoji] = useState('');

    const handleClickOpenCustomCategory = () => {
      setIsCustomCategoryOpen(true);
    }
    const handleCloseCustomCategory = () => {
        setCustomCategoryName('');
        setCustomCategoryEmoji('');
        setIsCustomCategoryOpen(false);
    };

    const handleSubmitCustomCategory = async (event) => {
      try {
        event.preventDefault();
        const params = {
          name: customCategoryName,
          icon: customCategoryEmoji,
          color: ""
        }
        await addCustomCategory(params);
        await refreshBills();
        handleCloseCustomCategory();
      } catch (error) {
        showSnackbar('There was an error', 'error');
      }
    }

    const handleCategoryNameChange = (event) => {
        setCustomCategoryName(event.target.value);
    }

    const handleAddExpense = async () => {
      const divisionDetails = divisionMode === "percentage" ? percentages : amounts;
      const debtsList = Object.keys(divisionDetails).map(memberId => ({
        id: memberId,
        amount: parseInt(divisionDetails[memberId])
      }));

        const params = {
          ...newExpense,
          group_id: groupId,
          mode: divisionMode,
          debts_list: debtsList
        };
        console.log()
        if (parseInt(params.bill_amount) <= 0) {
          showSnackbar('The amount must be greater than 0', 'error');
          return;
        }
        console.log("custom category: " + params.custom_category);
        if (parseInt(params.category_id) <= 0 && parseInt(params.custom_category)<=0) {
          showSnackbar('You must choose a category', 'error');
          return;
        }
        if (params.mode === "") {
          showSnackbar('You must choose a division mode', 'error');
          return;
        }
    
        try {
          await addBill(params);
          setNewExpense({ bill_amount: 0, category_id: 0, custom_category: ''})
          setAmounts({});
          setPercentages({});
          await refreshBills();
          showSnackbar('The expense was added successfully', 'success');
        } catch (error) {
          showSnackbar('there was an error', 'error');
        }
      };

    const handlePercentageChange = (memberId, value) => { 
        setPercentages({ ...percentages, [memberId]: value });
    };

    const handleAmountChange = (memberId, value) => { 
        setAmounts({ ...amounts, [memberId]: value });
    };

  return (
    <>
        <Dialog
          open={isCustomCategoryOpen}
          onClose={handleCloseCustomCategory}
          PaperProps={{
              component: 'form',
              onSubmit: handleSubmitCustomCategory,
          }}
          >
            <DialogTitle color = "secondary">New category:</DialogTitle>
            <Typography variant='subtitle1' style={{ alignSelf: 'center' }}>{customCategoryEmoji} {customCategoryName}</Typography>
            <Divider />
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="groupName"
                    label="Nombre"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleCategoryNameChange}
                    style={{ marginBottom: '2%' }}
                />
                <Accordion>
                  <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                  >
                      {customCategoryEmoji ? `Selected ${customCategoryEmoji}` : 'Select your category emoji'}
                  </AccordionSummary>
                  <AccordionDetails>
                      <EmojiPicker onEmojiClick={(emojiData) => setCustomCategoryEmoji(emojiData.emoji)} previewConfig={{showPreview: false}}/>
                  </AccordionDetails>
                </Accordion>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" color="error" onClick={handleCloseCustomCategory}>Cancel</Button>
              <Button variant="outlined" color="secondary" type="submit">Create</Button>
            </DialogActions>
        </Dialog>


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
                <Button onClick={handleClickOpenCustomCategory} variant="outlined" color="secondary" fullWidth>
                    Create Custom Category
                </Button>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Division Mode</InputLabel>
                    <Select
                        value={divisionMode}
                        onChange={(e) => setDivisionMode(e.target.value)}
                    >
                        <MenuItem value="equitative">Equitative</MenuItem>
                        <MenuItem value="percentage">Percentual</MenuItem>
                        <MenuItem value="fixed">Fixed</MenuItem>
                    </Select>
                </FormControl>

                <DivisionInput
                    members={members}
                    divisionMode={divisionMode}
                    values={divisionMode === "percentage" ? percentages : amounts}
                    handleValueChange={divisionMode === "percentage" ? handlePercentageChange : handleAmountChange}
                />

                <Button onClick={handleAddExpense} variant="outlined" color="secondary" fullWidth>
                    Add Expense
                </Button>
                
            </Box>
          </AccordionDetails>
        </Accordion>
    </>
  );
}
