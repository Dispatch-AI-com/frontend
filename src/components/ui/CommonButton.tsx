'use client';

import { Button, ButtonProps, SxProps, Theme} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

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
  fontWeight: theme.typography.button.fontWeight,
  whiteSpace: 'nowrap',
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

