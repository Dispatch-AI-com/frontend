import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface DropdownOption {
  label: string;
  iconSrc?: string;
  iconAlt?: string;
  href?: string;
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
}: UserProfileMenuProps) {
  return (
    <Box px={3} py={2} mt="auto">
      <Box display="flex" alignItems="center" gap={1.5}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: '#e5fcd5',
            color: '#222',
          }}
        >
          {avatarLetter}
        </Avatar>
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
        <Menu
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
                onClick={handleMenuClose}
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
