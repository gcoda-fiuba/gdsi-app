'use client'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {Fragment, useState} from "react";
import useGroupStore from "@/app/store/groups";

export default function CreateGroup({fetchData}) {

    const {create} = useGroupStore()

    const [groupName, setGroupName] = useState('');
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        await create({name: groupName});
        handleClose();
        fetchData();
    }
    const handleNameChange = (event) => setGroupName(event.target.value);

    return (
        <Fragment>
            <Button variant="outlined" color="secondary" onClick={handleClickOpen} style={{margin: '2%'}}>
                Create Group
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit,
                }}
            >
                <DialogTitle>Crea un nuevo grupo</DialogTitle>
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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Crear</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}