// TODO: REFACTOR
import {
    Switch,
} from "@mui/material";
import {useState, useEffect} from "react";
import useUserStore from "@/app/store/user";
import {useSnackbar} from "@/app/context/SnackbarContext";
import cache from "@/app/services/cache";

export default function EditNotifications() {
    const { showSnackbar } = useSnackbar();

    const { modifyUserConfiguration } = useUserStore();
    const { getUserConfiguration } = useUserStore();

    const [inAppChecked, setInAppChecked] = useState(false);
    const [emailChecked, setEmailChecked] = useState(false);

    const userId = parseInt(cache.get("Id"));

    useEffect(() => {
        fetchPreferences();
    }, []);
    
    const fetchPreferences = async () => {
        try{
            const savedPreference = await getUserConfiguration(parseInt(cache.get("Id")));
            setInAppChecked(savedPreference.allowNotifications === 'true');
            setEmailChecked(savedPreference.allowEmailNotifications === 'true');
        }
        catch (error) {
            showSnackbar('error fetch preferences', "error");
        }
    };

    const handleChangeInApp = async (event) => {
        setInAppChecked(event.target.checked);
        const params = {
            allowNotifications: event.target.checked,
            allowEmailNotifications: emailChecked
        };
        try{
            //console.log("envio: ");
            //console.log(params);
            await modifyUserConfiguration(userId ,params);
        }
        catch (error) {
            showSnackbar('Unknown error', "error");
            console.log(error);
        }
    };

    const handleChangeEmail = async (event) => {
        setEmailChecked(event.target.checked);
        const params = {
            allowNotifications: inAppChecked,
            allowEmailNotifications: event.target.checked
        };
        try{
            //console.log("envio: ");
            //console.log(params);
            await modifyUserConfiguration(userId ,params);
        }
        catch (error) {
            showSnackbar('Unknown error', "error");
            console.log(error);
        }
    };

    return (
        <>
            <div>
                <>Email notifications</>
                <Switch
                    checked={emailChecked}
                    onChange={handleChangeEmail}
                    inputProps={{ 'aria-label': 'controlled' }}/>

            </div>
           <div>
                <>In-app notifications</>
                <Switch
                    checked={inAppChecked}
                    onChange={handleChangeInApp}
                    inputProps={{ 'aria-label': 'controlled' }}/>
            </div>
            
        </>
    );
}