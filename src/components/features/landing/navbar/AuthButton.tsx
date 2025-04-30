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
  backgroundColor: theme.palette.button.secondary.background,
  color: theme.palette.button.secondary.text,
  boxShadow: 'none',
  border: 'none',
  '&:hover': { backgroundColor: theme.palette.button.secondary.hover },

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
  backgroundColor: theme.palette.button.primary.background,
  color: theme.palette.button.primary.text,
  '&:hover': { backgroundColor: theme.palette.button.primary.hover },

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
