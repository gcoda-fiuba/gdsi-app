import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import Badge from '@mui/material/Badge';
import Link from 'next/link';

const AppBarComponent = ({ pages, handleDrawerToggle, handleProfileMenuOpen, handleMobileMenuOpen, handleNotificationsMenuOpen, notifications }) => {
  const countUnreadNotifications = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  return (
    <AppBar component="nav" position="static" color="primary">
      <Toolbar sx={{ minHeight: 'auto' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((item) => (
            <Link key={item.name} href={item.path}>
              <Button sx={{ color: '#fff' }}>
                {item.name}
              </Button>
            </Link>
          ))}
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          size="large"
          aria-label="show notifications"
          color="inherit"
          onClick={handleNotificationsMenuOpen}
        >
          <Badge badgeContent={countUnreadNotifications()} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls="account-menu-mobile"
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
