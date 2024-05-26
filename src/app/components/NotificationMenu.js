import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';

const NotificationMenu = ({ notifications, setNotifications, notificationAnchorEl, setNotificationAnchorEl, readNotification }) => {
  const handleReadNotification = () => {
    setNotificationAnchorEl(null);
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    notifications.forEach(notification => readNotification({ id: notification.id }));
  };

  return (notifications.length > 0 &&
    <Menu
      sx={{ mt: '30px' }}
      anchorEl={notificationAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id="notification-menu"
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(notificationAnchorEl)}
      onClose={handleReadNotification}
    >
      {notifications.slice().reverse().map((notification) => (
        <MenuItem key={notification.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, backgroundColor: notification.read ? null : '#c8c8c8' }}>
          <Avatar>
            <AccountCircle />
          </Avatar>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="body1">{notification.message}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', fontStyle: 'italic', color: 'text.secondary' }}>
              {new Date(notification.createdAt).toLocaleString()}
            </Typography>
          </div>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default NotificationMenu;
