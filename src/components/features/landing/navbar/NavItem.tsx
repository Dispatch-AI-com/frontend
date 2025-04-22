'use client';

import NextLink from 'next/link';
import { Box, Typography } from '@mui/material';

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
      padding: '8px 16px',
      borderRadius: '12px',
      marginRight: '8px',
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease, transform 0.1s ease',
      '&:hover': {
        backgroundColor: '#F5F5F5',
      },
      '&:active': {
        transform: 'scale(0.97)',
      },
    }}
  >
    <Typography
      sx={{
        width: textWidth,
        height: 20,
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.25,
        letterSpacing: 'normal',
        color: '#060606',
      }}
    >
      {text}
    </Typography>
  </Box>
);