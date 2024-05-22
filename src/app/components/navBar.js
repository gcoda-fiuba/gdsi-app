'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import AppBarComponent from './AppBarComponent';
import DrawerComponent from './DrawerComponent';
import MobileMenu from './MobileMenu';
import ProfileMenu from './ProfileMenu';
import NotificationMenu from './NotificationMenu';
import useAuthStore from "@/app/store/auth";
import useNotificationStore from "@/app/store/notification";
import cache from "@/app/services/cache";
import { useRouter } from 'next/navigation';

const pages = [{ name: 'Groups', path: '/groups' }];

function DrawerAppBar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { getNotifications, readNotification } = useNotificationStore();
  const [auth, setAuth] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user && !cache.get('token')) {
      return;
    }
    setAuth(true);
    async function loadNotifications() {
      setNotifications(await getNotifications());
    }
    loadNotifications();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleLogOut = async () => {
    await logout();
    router.replace('/');
  };

  return ((user || cache.get('token')) &&
    <Box sx={{ display: 'flex' }}>
      <AppBarComponent
        pages={pages}
        handleDrawerToggle={handleDrawerToggle}
        handleProfileMenuOpen={handleProfileMenuOpen}
        handleMobileMenuOpen={handleMobileMenuOpen}
        handleNotificationsMenuOpen={handleNotificationsMenuOpen}
        notifications={notifications}
      />
      <ProfileMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        handleLogOut={handleLogOut}
      />
      <MobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        setMobileMoreAnchorEl={setMobileMoreAnchorEl}
        handleProfileMenuOpen={handleProfileMenuOpen}
      />
      <NotificationMenu
        notifications={notifications}
        setNotifications={setNotifications}
        notificationAnchorEl={notificationAnchorEl}
        setNotificationAnchorEl={setNotificationAnchorEl}
        readNotification={readNotification}
      />
      <DrawerComponent
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        pages={pages}
      />
    </Box>
  );
}

export default DrawerAppBar;
