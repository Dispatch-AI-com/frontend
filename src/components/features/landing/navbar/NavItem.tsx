'use client';

import NextLink from 'next/link';
import { Box, Typography } from '@mui/material';
import theme from '@/theme';

export interface NavItemProps {
  href: string;
  text: string;
  width: number;
  textWidth: number;
  handleDrawerToggle?: () => void;
}

export const NavItem = ({
  href,
  text,
  width,
  textWidth,
  handleDrawerToggle,
}: NavItemProps) => (
  <Box
    component={NextLink}
    href={href}
    onClick={() => handleDrawerToggle?.()}
    sx={{
      width: width,
      height: 36,
      px: 2,
      py: 1,
      borderRadius: '12px',
      mr: 1,
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease, transform 0.1s ease',
      '&:hover': {
        backgroundColor: theme.palette.background.paper,
      },
      '&:active': {
        transform: 'scale(0.97)',
      },
    }}
  >
    <Typography
      variant="body2"
      sx={{
        width: textWidth,
        height: 20,
        fontFamily: theme.typography.fontFamily,
        fontSize: 16,
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.25,
        letterSpacing: 'normal',
        color: theme.palette.text.primary,
      }}
    >
      {text}
    </Typography>
  </Box>
);
