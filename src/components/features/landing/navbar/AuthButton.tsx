'use client';

import { styled } from '@mui/material/styles';
import CommonButton from '@/components/ui/CommonButton';

interface AuthButtonProps {
  variant: 'login' | 'signup';
  isMobile?: boolean;
  onClick?: () => void;
  themeMode?: 'light' | 'dark';
}

const BaseAuthButton = styled(CommonButton, {
  shouldForwardProp: (prop) => !['isMobile', 'themeMode'].includes(prop as string),
})<{ isMobile?: boolean; themeMode?: 'light' | 'dark' }>({
  '&&': { fontSize: 16 },
});

const LoginButton = styled(BaseAuthButton, {
  shouldForwardProp: (prop) => !['isMobile', 'themeMode'].includes(prop as string),
})<{ isMobile?: boolean; themeMode?: 'light' | 'dark' }>(({ theme, isMobile, themeMode = 'light' }) => ({
  backgroundColor: themeMode === 'dark' ? '#060606' : theme.palette.background.default,
  color: themeMode === 'dark' ? '#ffffff' : theme.palette.text.primary,
  boxShadow: 'none',
  border: 'none',
  '&:hover': { backgroundColor: themeMode === 'dark' ? '#1a1a1a' : theme.palette.background.paper },

  ...(isMobile
    ? {
        padding: theme.spacing(2),
        borderRadius: 12,
        fontWeight: 'bold',
        textTransform: 'none',
      }
    : {
        width: theme.spacing(9.125),
        height: theme.spacing(5),
        margin: '0 -2px',
      }),
}));

const SignupButton = styled(BaseAuthButton, {
  shouldForwardProp: (prop) => !['isMobile', 'themeMode'].includes(prop as string),
})<{ isMobile?: boolean; themeMode?: 'light' | 'dark' }>(({ theme, isMobile, themeMode = 'light' }) => ({
  whiteSpace: 'nowrap',
  backgroundColor: themeMode === 'dark' ? '#ffffff' : '#060606',
  color: themeMode === 'dark' ? '#060606' : '#ffffff',
  '&:hover': { backgroundColor: themeMode === 'dark' ? '#f0f0f0' : '#1a1a1a' },

  ...(isMobile
    ? {
        padding: theme.spacing(2),
        borderRadius: 12,
        fontWeight: 'bold',
        textTransform: 'none',
      }
    : {
        width: theme.spacing(11.125),     
        height: theme.spacing(5),
        marginLeft: theme.spacing(1.5),  
      }),
}));

export function AuthButton({
  variant,
  isMobile = false,
  onClick,
  themeMode = 'light',
}: AuthButtonProps) {
  const isLogin = variant === 'login';
  const Btn = isLogin ? LoginButton : SignupButton;

  return (
    <Btn
      href={`/${variant}`}
      isMobile={isMobile}
      onClick={onClick}
      themeMode={themeMode}
    >
      {isLogin ? 'Login' : 'Sign Up'}
    </Btn>
  );
}
