import {
    Switch,
} from "@mui/material";
import {useState, useEffect} from "react";

export default function EditProfile() {
    const [checked, setChecked] = useState(false);
    
    useEffect(() => {
        const savedPreference = localStorage.getItem('notificationsDisabled');
        if (savedPreference !== null) {
            setChecked(JSON.parse(savedPreference));
        }
      }, []);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        localStorage.setItem('notificationsDisabled', JSON.stringify(event.target.checked));
    };
    return (
        <>
            <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}/>
            <>Disable in-app notifications</>
        </>
    );
}