'use client';

import { Button, Typography } from '@mui/material';
import NextLink from 'next/link';

interface AuthButtonProps {
  variant: 'login' | 'signup';
  isMobile?: boolean;
  onClick?: () => void;
}

export function AuthButton({
  variant,
  isMobile = false,
  onClick,
}: AuthButtonProps) {
  const isLogin = variant === 'login';

  const desktopStyles = {
    login: {
      wrapper: {
        width: 73,
        height: 40,
        padding: '10px 16px',
        borderRadius: '12px',
        backgroundColor: '#fff',
        marginRight: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': { backgroundColor: '#F5F5F5' },
      },
      text: {
        width: 41,
        height: 20,
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 1.25,
        color: '#060606',
      },
    },
    signup: {
      wrapper: {
        width: 89,
        height: 40,
        padding: '10px 16px',
        borderRadius: '12px',
        backgroundColor: '#060606',
        marginLeft: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': { backgroundColor: '#333' },
      },
      text: {
        maxWidth: 57,
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 1.25,
        color: '#fff',
      },
    },
  };

  const mobileWrapper = {
    px: 2,
    py: 1,
    borderRadius: '12px',
    backgroundColor: isLogin ? '#fff' : '#060606',
    color: isLogin ? '#060606' : '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'none',
  };

  return (
    <Button
      component={NextLink}
      href={`/${variant}`}
      disableRipple
      onClick={onClick}
      sx={{
        ...(isMobile ? mobileWrapper : desktopStyles[variant].wrapper),
        textTransform: 'none',
      }}
    >
      {isMobile ? (
        isLogin ? 'Login' : 'Sign Up'
      ) : (
        <Typography sx={desktopStyles[variant].text}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>
      )}
    </Button>
  );
}