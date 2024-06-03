'use client';

import {AppBar, Box, IconButton, Button, Toolbar, Badge, Skeleton} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';

import Link from 'next/link';
import useUserStore from "@/app/store/user";
import {useEffect, useState} from "react";
import cache from "@/app/services/cache";

const AppBarComponent = ({ pages, handleDrawerToggle, handleProfileMenuOpen, handleMobileMenuOpen, handleNotificationsMenuOpen, notifications }) => {

  const { getUserById, currentUser} = useUserStore();
  const [isCurrentUserSetted, setIsCurrentUserSetted] = useState(false);

  const countUnreadNotifications = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  const getCurrentUserData = async () => await getUserById(cache.get('Id'));

  useEffect(() => {
    if (currentUser === null){
      getCurrentUserData();
    }else{
      setIsCurrentUserSetted(true);
    }
  }, [currentUser]);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
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
        <span style={{marginLeft: 10}}>{isCurrentUserSetted ? `${currentUser.first_name} ${currentUser.last_name}` : <Skeleton variant="text" width={80} />}</span>
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
