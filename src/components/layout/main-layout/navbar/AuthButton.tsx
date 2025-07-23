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
        : themeVariant === 'green'
          ? '#f8fff3'
          : '#060606',
    color:
      themeVariant === 'light'
        ? theme.palette.text.primary
        : themeVariant === 'green'
          ? '#060606'
          : '#ffffff',
    boxShadow: 'none',
    border: 'none',
    '&:hover': {
      backgroundColor:
        themeVariant === 'light'
          ? theme.palette.background.paper
          : themeVariant === 'green'
            ? '#e5fcd6'
            : '#060606',
    },
  }),
);

const SignupButton = styled(BaseAuthButton)(({ themeVariant = 'light' }) => ({
  whiteSpace: 'nowrap',
  backgroundColor:
    themeVariant === 'light'
      ? undefined
      : themeVariant === 'green'
        ? '#a8f574'
        : '#ffffff',
  color:
    themeVariant === 'light'
      ? undefined
      : themeVariant === 'green'
        ? '#060606'
        : '#060606',
  '&:hover': {
    backgroundColor:
      themeVariant === 'light'
        ? undefined
        : themeVariant === 'green'
          ? '#9bea5f'
          : '#ffffff',
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
        themeVariant === 'light'
          ? isLogin
            ? undefined
            : 'black'
          : themeVariant === 'green'
            ? isLogin
              ? undefined
              : 'black'
            : undefined
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
