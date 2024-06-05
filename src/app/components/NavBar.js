'use client';

import { useEffect, useState } from 'react';
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

const pages = [
  {name: 'Groups', path: '/groups' },
  {name: 'Debts', path: '/debts'},
  {name: 'Reports', path: '/reports'}
];

function DrawerAppBar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { getNotifications, readNotification } = useNotificationStore();
  const [isAuth, setIsAuth] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user && !cache.get('token')) {
      return;
    }
    setIsAuth(true);
    async function loadNotifications() {
      setNotifications(await getNotifications());
    }
    loadNotifications();
  }, [user, getNotifications]);

  const handleDrawerToggle = () => {
    setIsMobileOpen((prevState) => !prevState);
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
    setAnchorEl(null);
    setIsAuth(false);
    router.replace('/');
  };

  const handlePreferences = () => {
    router.replace('/preferences')
  }

  return (isAuth &&
    <Box>
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
        handlePreferences={handlePreferences}
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
        mobileOpen={isMobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        pages={pages}
      />
    </Box>
  );
}

export default DrawerAppBar;
