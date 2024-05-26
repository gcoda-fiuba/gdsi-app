import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ProfileMenu = ({ anchorEl, setAnchorEl, handleLogOut }) => {
  const isMenuOpen = Boolean(anchorEl);

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
      <MenuItem onClick={handleLogOut}>Log out</MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
