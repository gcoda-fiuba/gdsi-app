import {
    Button,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import useUserStore from "@/app/store/user";
import {useState} from "react";
import {useSnackbar} from "@/app/context/SnackbarContext";

export default function EditProfile() {
    const {showSnackbar} = useSnackbar();

    const {currentUser, editUserInfo} = useUserStore();
    const [isEdited, setIsEdited] = useState(false);
    const [newUserData, setNewUserData] = useState(currentUser);

    const handleFirstNameChange = (event) => {
        setIsEdited(true);
        setNewUserData(prevData => {return {...prevData, first_name: event.target.value}});
    };
    const handleLastNameChange = (event) => {
        setIsEdited(true);
        setNewUserData(prevData => {return {...prevData, last_name: event.target.value}});
    }
    // const handleEmailChange = (event) => {
    //     setIsEdited(true);
    //     setNewUserData(prevData => {return {...prevData, email: event.target.value}});
    // }
    const handlePhoneNumberChange = (event) => {
        setIsEdited(true);
        const phoneNumber = event.target.value[0] === '0' ? event.target.value.slice(1) : event.target.value;
        if (phoneNumber.match(/[^0-9+ ]/)) {
            showSnackbar('Only numbers aloud', 'error');
            return;
        }
        setNewUserData(prevData => {return {...prevData, phone: phoneNumber}});
    }

    const handleSaveChanges = async () => {
        setIsEdited(false);
        // Patch data in DB
        await editUserInfo(newUserData);
        // console.log(newUserData);
    }
    const handleCancelChanges = () => {
        setIsEdited(false);
        setNewUserData(currentUser);
    }

    return (
        <Grid container>
            <Grid item md={6}>
                <Typography variant="subtitle1">
                    Profile Data
                </Typography>
                <AccountCircle fontSize="large"/>
            </Grid>

            <Grid item md={6}>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <Typography variant="subtitle2">First name</Typography>
                        <TextField
                            type="name"
                            margin="normal"
                            variant="outlined"
                            value={newUserData.first_name}
                            onChange={handleFirstNameChange}
                            disabled={false}
                            required
                        />
                    </Grid>
                    <Grid item md={6}>
                        <Typography variant="subtitle2">Last name</Typography>
                        <TextField
                            type="lastName"
                            margin="normal"
                            variant="outlined"
                            value={newUserData.last_name}
                            onChange={handleLastNameChange}
                            disabled={false}
                            required
                        />
                    </Grid>
                </Grid>
                    <Grid item md={12}>
                        <Typography variant="subtitle2">Email</Typography>
                        <TextField
                            type="email"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={newUserData.email}
                            // onChange={handleEmailChange}
                            disabled={true}
                            required
                        />
                    </Grid>
                <Grid item md={12}>
                    <Typography variant="subtitle2">Phone number</Typography>
                    <TextField
                        // type="number"
                        type="tel"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        disabled={false}
                        value={newUserData.phone_number ? newUserData.phone_number : 0}
                        onChange={handlePhoneNumberChange}
                    />
                </Grid>
                { isEdited &&
                    <Grid container spacing={1}>
                        <Grid item md={6}>
                            <Button variant="outlined" color="error" sx={{ width: '100%' }} onClick={handleCancelChanges}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item md={6}>
                            <Button variant="outlined" color="secondary" sx={{ width: '100%' }} onClick={handleSaveChanges}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                }
            </Grid>
        </Grid>
    );
}