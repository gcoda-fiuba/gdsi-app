'use client';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EditProfile from "@/app/components/EditProfile";
import {useEffect, useState} from "react";
import useUserStore from "@/app/store/user";
import cache from "@/app/services/cache";
import {Grid} from "@mui/material";
import Loading from "@/app/preferences/loading";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Preferences() {
    const [value, setValue] = useState(0);

    const {currentUser, getUserById} = useUserStore();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            await getUserById(cache.get('Id')).then(() => setIsLoading(false));
        } catch (error) {
            setHasError(true)
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const errorView =
        (<>
            <Grid container style={{height: '100vh'}}>
                <Grid item>
                    <h2>there was an error loading this page</h2>
                </Grid>
            </Grid>
        </>);

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100vh' }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Profile" {...a11yProps(0)} />
                <Tab label="Notifications" {...a11yProps(1)} />
            </Tabs>
            {
                isLoading ? <Loading /> :
                    hasError ? errorView :
                    <CustomTabPanel value={value} index={0}>
                        <EditProfile />
                    </CustomTabPanel>
            }
            <CustomTabPanel value={value} index={1}>
                Nothing to see here yet
            </CustomTabPanel>
        </Box>
    );
}