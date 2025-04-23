'use client';

import React, { useEffect } from 'react';
import { Button, ButtonProps, SxProps, Theme, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

type ButtonVariant = 'black' | 'green';

interface CommonButtonProps extends Omit<ButtonProps, 'variant'> {
  children: React.ReactNode;
  buttonVariant?: ButtonVariant;
  href?: string;
  endIcon?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'buttonVariant',
})<{ buttonVariant?: ButtonVariant }>(({ theme, buttonVariant = 'black' }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.button.fontSize,
  textTransform: 'none',
  fontWeight: 600,
  backgroundColor: buttonVariant === 'black' ? '#060606' : '#a8f574',
  color: buttonVariant === 'black' ? '#ffffff' : '#060606',
  '&:hover': {
    backgroundColor: buttonVariant === 'black' ? '#060606' : '#a8f574',
    opacity: 0.9,
  },
}));

export default function CommonButton({
  children,
  onClick,
  href,
  endIcon,
  buttonVariant = 'black',
  sx,
  ...rest
}: CommonButtonProps) {
  const theme = useTheme();
  
  useEffect(() => {
    console.log('borderRadius:', theme.shape.borderRadius); // ✅ 检查主题值
  }, [theme.shape.borderRadius]);

  return (
    <StyledButton
      variant="contained"
      onClick={onClick}
      href={href}
      endIcon={endIcon}
      buttonVariant={buttonVariant}
      sx={sx}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

