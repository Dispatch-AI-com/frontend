import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { logout } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';

interface DropdownOption {
  label: string;
  iconSrc?: string;
  iconAlt?: string;
  action?: string;
}

interface UserProfileMenuProps {
  name: string;
  plan: string;
  avatarLetter: string;
  dropdownOptions: DropdownOption[];
  anchorEl: null | HTMLElement;
  open: boolean;
  arrowUp: boolean;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  ICON_SIZE?: number;
  isCollapsed?: boolean;
}

export default function UserProfileMenu({
  name,
  plan,
  avatarLetter,
  dropdownOptions,
  anchorEl,
  open,
  arrowUp,
  handleMenuOpen,
  handleMenuClose,
  ICON_SIZE = 16,
  isCollapsed = false,
}: UserProfileMenuProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleMenuItemClick = (option: DropdownOption) => {
    if (option.action === 'logout') {
      dispatch(logout());
      router.push('/login');
    } else if (option.action === 'home') {
      router.push('/');
    }
    handleMenuClose();
  };
  return (
    <Box px={3} py={2} mt="auto">
      <Box
        display="flex"
        alignItems="center"
        gap={1.5}
        justifyContent={isCollapsed ? 'center' : 'flex-start'}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: '#e5fcd5',
            color: '#222',
            cursor: isCollapsed ? 'pointer' : 'default',
          }}
          onClick={
            isCollapsed
              ? arrowUp
                ? handleMenuClose
                : handleMenuOpen
              : undefined
          }
        >
          {avatarLetter}
        </Avatar>
        {!isCollapsed && (
          <>
            <Box flex="1">
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {name}
              </Typography>
              <Typography variant="body2">{plan}</Typography>
            </Box>
            <IconButton
              size="small"
              sx={{ ml: 1 }}
              onClick={arrowUp ? handleMenuClose : handleMenuOpen}
            >
              <Image
                src={
                  arrowUp
                    ? '/dashboard/sidebar/detail-arrow-up.svg'
                    : '/dashboard/sidebar/detail-arrow-right.svg'
                }
                width={12}
                height={12}
                alt="Profile Details"
              />
            </IconButton>
          </>
        )}
        <Menu
          disableScrollLock
          anchorReference="anchorPosition"
          anchorPosition={
            anchorEl
              ? {
                  top: anchorEl.getBoundingClientRect().bottom - 40,
                  left: anchorEl.getBoundingClientRect().right - 200,
                }
              : undefined
          }
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          slotProps={{
            paper: {
              elevation: 4,
              sx: {
                minWidth: 200,
                borderRadius: 1,
                boxShadow: '0px 4px 16px rgba(0,0,0,0.08)',
                p: 1,
              },
            },
          }}
        >
          {dropdownOptions
            .filter(option => option.label !== 'View Profile')
            .map(option => (
              <MenuItem
                key={option.label}
                onClick={() => {
                  void handleMenuItemClick(option);
                }}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  fontWeight: 500,
                  '&:last-child': { mb: 0 },
                  gap: 1,
                }}
              >
                {option.iconSrc && (
                  <Image
                    src={option.iconSrc}
                    alt={option.iconAlt ?? option.label}
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    style={{ marginRight: 8 }}
                  />
                )}
                {option.label}
              </MenuItem>
            ))}
        </Menu>
      </Box>
    </Box>
  );
}
