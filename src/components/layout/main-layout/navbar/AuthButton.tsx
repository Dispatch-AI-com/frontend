'use client';

import { styled } from '@mui/material/styles';

import CommonButton from '@/components/ui/CommonButton';

interface AuthButtonProps {
  variant: 'login' | 'signup';
  isMobile?: boolean;
  onClick?: () => void;
  themeVariant?: 'light' | 'dark' | 'green';
}

const BaseAuthButton = styled(CommonButton, {
  shouldForwardProp: prop =>
    !['isMobile', 'themeVariant'].includes(prop as string),
})<{ isMobile?: boolean; themeVariant?: 'light' | 'dark' | 'green' }>(
  ({ isMobile }) => ({
    ...(isMobile
      ? { fontSize: 20, fontWeight: 'bold', padding: '12px 24px' }
      : {}),
  }),
);

const LoginButton = styled(BaseAuthButton)(
  ({ theme, themeVariant = 'light' }) => ({
    backgroundColor:
      themeVariant === 'light'
        ? theme.palette.background.default
        : themeVariant === 'dark'
          ? '#060606'
          : '#f8fff3',
    color: themeVariant === 'dark' ? '#ffffff' : theme.palette.text.primary,
    boxShadow: 'none',
    border: 'none',
    '&:hover': {
      backgroundColor:
        themeVariant === 'light'
          ? theme.palette.background.paper
          : themeVariant === 'dark'
            ? '#060606'
            : '#f8fff3',
    },
  }),
);

const SignupButton = styled(BaseAuthButton)(({ themeVariant = 'light' }) => ({
  whiteSpace: 'nowrap',
  backgroundColor: themeVariant === 'dark' ? '#ffffff' : undefined,
  color: themeVariant === 'dark' ? '#060606' : undefined,
  '&:hover': {
    backgroundColor: themeVariant === 'dark' ? '#ffffff' : undefined,
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
      buttonVariant={
        themeVariant === 'light' ? (isLogin ? undefined : 'black') : undefined
      }
      href={`/${variant}`}
      isMobile={isMobile}
      onClick={onClick}
      themeVariant={themeVariant}
    >
      {isLogin ? 'Login' : 'Sign Up'}
    </Btn>
  );
}
