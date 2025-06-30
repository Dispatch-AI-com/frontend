'use client';

import type { ButtonProps, SxProps, Theme } from '@mui/material';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

type ButtonVariant = 'black' | 'green' | 'disabled';

interface CommonButtonProps extends Omit<ButtonProps, 'variant'> {
  children: React.ReactNode;
  buttonVariant?: ButtonVariant;
  href?: string;
  endIcon?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const StyledButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'buttonVariant',
})<{ buttonVariant?: ButtonVariant }>(({ theme, buttonVariant = 'black' }) => {
  const baseStyle = {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 2),
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.button.fontSize,
    textTransform: 'none' as const,
    fontWeight: theme.typography.button.fontWeight,
    whiteSpace: 'nowrap' as const,
  };

  if (buttonVariant === 'disabled') {
    return {
      ...baseStyle,
      backgroundColor: '#d5d5d5',
      color: '#fff',
      cursor: 'default',
      pointerEvents: 'none',
    };
  }

  const isBlack = buttonVariant === 'black';

  return {
    ...baseStyle,
    backgroundColor: isBlack ? '#060606' : '#a8f574',
    color: isBlack ? '#ffffff' : '#060606',
    '&:hover': {
      backgroundColor: isBlack ? '#060606' : '#a8f574',
      opacity: 0.9,
    },
  };
});

export default function CommonButton({
  children,
  onClick,
  href,
  endIcon,
  buttonVariant = 'black',
  sx,
  ...rest
}: CommonButtonProps) {
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
