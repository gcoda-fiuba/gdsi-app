import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {Switch} from "@mui/material";
import {useColorMode} from "@/app/context/ThemeContext";
import cache from "@/app/services/cache";

const ProfileMenu = ({ anchorEl, setAnchorEl, handlePreferences, handleLogOut }) => {
  const isMenuOpen = Boolean(anchorEl);
  const { toggleColorMode } = useColorMode();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      sx={{ mt: '30px' }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id="primary-search-account-menu"
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
        <MenuItem>
            Dark Mode
            <Switch
                onChange={toggleColorMode}
                checked={JSON.parse(cache.get('theme')) === 'dark'}
                inputProps={{ 'aria-label': 'Toggle theme' }}
            />
        </MenuItem>

        <MenuItem onClick={handlePreferences}>
                <SettingsOutlinedIcon style={{ marginRight: '4%' }} />
                Preferences
        </MenuItem>

        <MenuItem onClick={handleLogOut}>
            <PowerSettingsNewOutlinedIcon style={{ marginRight: '4%' }} />
            Log out
        </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
