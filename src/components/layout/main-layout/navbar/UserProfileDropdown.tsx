'use client';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  styled,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { logout } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import type { UserInfo } from '@/types/user.d';

const UserProfileButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'themeVariant',
})<{ themeVariant?: 'light' | 'dark' | 'green' }>(
  ({ themeVariant = 'light' }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: '12px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'inherit',
    textTransform: 'none',
    '&:hover': {
      backgroundColor:
        themeVariant === 'dark'
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.04)',
    },
  }),
);

const UserAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  fontSize: '14px',
  fontWeight: 'bold',
});

const UserName = styled(Typography)({
  fontSize: '14px',
  fontWeight: 500,
  color: 'inherit',
});

const DropdownArrow = styled(ArrowDropDownIcon)({
  fontSize: '20px',
  color: 'inherit',
});

interface UserProfileDropdownProps {
  user: UserInfo;
  themeVariant?: 'light' | 'dark' | 'green';
}

export function UserProfileDropdown({
  user,
  themeVariant = 'light',
}: UserProfileDropdownProps) {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdminClick = () => {
    handleClose();
    window.location.href = '/admin/overview';
  };

  const handleSignOut = () => {
    handleClose();
    dispatch(logout());
    window.location.href = '/';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box>
      <UserProfileButton
        onClick={handleClick}
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        themeVariant={themeVariant}
      >
        <UserAvatar>{getInitials(user.firstName ?? 'User')}</UserAvatar>
        <UserName>{user.firstName ?? 'User'}</UserName>
        <DropdownArrow />
      </UserProfileButton>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 120,
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            },
          },
        }}
      >
        <MenuItem onClick={handleAdminClick}>
          <Typography sx={{ fontSize: '14px' }}>Admin Page</Typography>
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <Typography sx={{ fontSize: '14px' }}>Sign Out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
