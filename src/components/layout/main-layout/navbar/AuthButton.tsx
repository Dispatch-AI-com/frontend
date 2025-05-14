'use client';

import { styled } from '@mui/material/styles';

import CommonButton from '@/components/ui/CommonButton';

interface AuthButtonProps {
  variant: 'login' | 'signup';
  isMobile?: boolean;
  onClick?: () => void;
  themeVariant?: 'light' | 'dark';
}

const BaseAuthButton = styled(CommonButton, {
  shouldForwardProp: (prop) => !['isMobile', 'themeVariant'].includes(prop as string),
})<{ isMobile?: boolean; themeVariant?: 'light' | 'dark' }>(
  ({ isMobile }) => ({
    ...(isMobile ? { fontSize: 20, fontWeight: 'bold', padding: '12px 24px' } : {}),
  })
);

const LoginButton = styled(BaseAuthButton)(({ theme, themeVariant = 'light' }) => ({
  backgroundColor: themeVariant === 'light' ? theme.palette.background.default : '#060606',
  color: themeVariant === 'light' ? theme.palette.text.primary : '#ffffff',
  boxShadow: 'none',
  border: 'none',
  '&:hover': { 
    backgroundColor: themeVariant === 'light' ? theme.palette.background.paper : '#060606',
  },
}));

const SignupButton = styled(BaseAuthButton)(({ themeVariant = 'light' }) => ({
  whiteSpace: 'nowrap',
  backgroundColor: themeVariant === 'light' ? undefined : '#ffffff',
  color: themeVariant === 'light' ? undefined : '#060606',
  '&:hover': {
    backgroundColor: themeVariant === 'light' ? undefined : '#ffffff',
  },
}));

export function AuthButton({
  variant,
  isMobile = false,
  onClick,
  themeVariant = 'light',
}: AuthButtonProps) {
  const isLogin = variant === 'login';
  const Btn = isLogin ? LoginButton : SignupButton;
  
  return (
    <Btn
      buttonVariant={themeVariant === 'light' ? (isLogin ? undefined : 'black') : undefined}
      href={`/${variant}`}
      isMobile={isMobile}
      onClick={onClick}
      themeVariant={themeVariant}
    >
      {isLogin ? 'Login' : 'Sign Up'}
    </Btn>
  );
}
