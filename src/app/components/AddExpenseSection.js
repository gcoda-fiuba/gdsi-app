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
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fragment
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useGroupStore from "@/app/store/groups";
import { useSnackbar } from "@/app/context/SnackbarContext";


export default function AddExpenseSection({ groupId, categories, refreshBills }) {
    const { addBill } = useGroupStore();
    const { addCustomCategory } = useGroupStore();
    const { showSnackbar } = useSnackbar();
  
    const [newExpense, setNewExpense] = useState({ bill_amount: 0, category_id: 0, custom_category: '' });
    const [divisionMode, setDivisionMode] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [customCategoryName, setCustomCategoryName] = useState('');

    const handleClickOpen = (event) => {
      setIsOpen(true);
    }
    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = async (event) => {
      try {
        event.preventDefault();
        const params = {
          name: customCategoryName,
          icon: "",
          color: ""
        }
        //console.log("hola2");
        await addCustomCategory(params);
        //console.log("hola");
        await refreshBills();
        handleClose();
      } catch (error) {
        console.log("error desconocido")
        //showSnackbar(error.response.data.error, 'error');
      }
    }


    const handleCategoryNameChange = (event) => setCustomCategoryName(event.target.value);

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
          await refreshBills();
          showSnackbar('The expense was added successfully', 'success');
        } catch (error) {
          showSnackbar(error.response.data.error, 'error');
          //showSnackbar('Hubo un error', 'error');
        }
      };

  return (
    <>
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
      }}
      >
      <DialogTitle color = "secondary">Crea un nuevo grupo</DialogTitle>
      <DialogContent>
          <DialogContentText>
              Elije el nombre de tu categoría personalizada
          </DialogContentText>
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
          />
      </DialogContent>
      <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="outlined" color="secondary" type="submit">Crear</Button>
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
      <Button variant="outlined" color="secondary" onClick={handleClickOpen} /*style={{margin: '2%'}}*/>
                Create Custom Category
            </Button>
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
    </>
  );
}



/*
      <Dialog
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
            component: 'form',
            onSubmit: handleSubmit,
        }}
      >
        <DialogTitle color = "secondary">Crea un nuevo grupo</DialogTitle>
        <DialogContent>
            <DialogContentText>
                ¡Se creativo! Este va a ser el nombre del grupo.
            </DialogContentText>
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
                onChange={handleNameChange}
            />
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" color="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="outlined" color="secondary" type="submit">Crear</Button>
        </DialogActions>
      </Dialog> */