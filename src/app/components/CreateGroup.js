'use client'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
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
                Create group
            </Button>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit,
                }}
            >
                <DialogTitle color="secondary">Create new group</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This is going to be your groups name
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="groupName"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleNameChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="outlined" color="secondary" type="submit">Create</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}