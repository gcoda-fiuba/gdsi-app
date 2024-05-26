'use client'

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {Fragment, useState} from "react";
import useGroupStore from "@/app/store/groups";

export default function CreateGroup({fetchData}) {

    const {create} = useGroupStore()

    const [groupName, setGroupName] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleClickOpen = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
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
            </Dialog>
        </Fragment>
    );
}