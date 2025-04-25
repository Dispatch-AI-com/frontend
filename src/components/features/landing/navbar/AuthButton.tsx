'use client';

import CommonButton from '@/components/ui/CommonButton';
import { SxProps, Theme } from '@mui/material';
import theme from '@/theme';

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

  const fixedFontSize: SxProps<Theme> = {
    fontSize: 16,
    [theme.breakpoints.up('sm')]: { fontSize: 16 },
    [theme.breakpoints.up('md')]: { fontSize: 16 },
    [theme.breakpoints.up('lg')]: { fontSize: 16 },
    [theme.breakpoints.up('xl')]: { fontSize: 16 },
  };

  const baseMobileStyles: SxProps<Theme> = {
    px: 2,
    py: 1,
    borderRadius: '12px',
    fontWeight: 'bold',
    textTransform: 'none',
    ...fixedFontSize,
  };

  const loginSx: SxProps<Theme> = {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    boxShadow: 'none', 
    border: 'none',    
    '&:hover': { backgroundColor: theme.palette.background.paper },
    ...(isMobile ? baseMobileStyles : {
      width: 73,
      height: 40,
      margin: '0 -2px',
      ...fixedFontSize,
    }),
  };

  const signupSx: SxProps<Theme> = {
    ...(isMobile ? baseMobileStyles : {
      width: 89,
      height: 40,
      marginLeft: '12px',
      whiteSpace: 'nowrap',
      ...fixedFontSize,
    }),
  };

  return (
    <CommonButton
      buttonVariant={isLogin ? undefined : 'black'} 
      href={`/${variant}`}
      onClick={onClick}
      sx={isLogin ? loginSx : signupSx}
    >
      {isLogin ? 'Login' : 'Sign Up'}
    </CommonButton>
  );
}